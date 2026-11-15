import { chooseSelect } from "../qa/select-option.mjs";
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(process.env.TEMP + '/clasor-design-qa/node_modules/playwright/index.mjs').href);
import assert from 'node:assert/strict';
import fs from 'node:fs';

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [], mutations = [], checks = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.method() !== 'GET') mutations.push(request.url()); });
  await page.goto(process.env.QA_URL ?? 'http://localhost:3100', { waitUntil: 'networkidle' });
  const controls = page.locator('[data-catalogue=controls]');
  await controls.waitFor({ state: 'attached' });
  const title = page.locator('#demo-document-title');
  await page.getByRole('button', { name: 'بررسی عنوان', exact: true }).click();
  assert.equal(await title.getAttribute('aria-invalid'), 'true');
  assert.equal(await title.evaluate(el => document.activeElement === el), true);
  await title.fill('   ');
  await page.getByRole('button', { name: 'بررسی عنوان', exact: true }).click();
  assert.equal(await title.inputValue(), '   ');
  await title.fill('راهنمای همکاری');
  await page.getByRole('button', { name: 'بررسی عنوان', exact: true }).click();
  assert.notEqual(await title.getAttribute('aria-invalid'), 'true');
  assert.equal(await title.inputValue(), 'راهنمای همکاری');
  assert(await controls.getByText('هیچ ذخیره‌سازی انجام نشد.', { exact: false }).count());
  checks.push('empty/whitespace validation, focus, retained input and local success');

  await chooseSelect(page, page.getByRole('combobox', { name: 'نقش نمایشی', exact: true }), 'editor');
  const checkbox = page.getByRole('checkbox', { name: 'انتخاب این سند', exact: true });
  await checkbox.focus(); await page.keyboard.press('Space');
  assert.equal(await checkbox.getAttribute('aria-checked'), 'true');
  const mixed = page.getByRole('checkbox', { name: 'بخشی از سندها انتخاب شده‌اند', exact: true });
  assert.equal(await mixed.getAttribute('aria-checked'), 'mixed');
  assert.notEqual(await mixed.locator('svg.lucide-minus').evaluate(el => getComputedStyle(el).display), 'none');
  const notification = page.getByRole('switch', { name: 'اعلان تغییرات', exact: true });
  await notification.focus(); await page.keyboard.press('Space');
  assert.equal(await notification.getAttribute('aria-checked'), 'false');
  const privateRadio = page.getByRole('radio', { name: 'خصوصی', exact: true });
  await privateRadio.focus(); await page.keyboard.press('ArrowLeft');
  assert.equal(await page.getByRole('radio', { name: 'با پیوند', exact: true }).getAttribute('aria-checked'), 'true');
  const serialized = await controls.evaluate(root => {
    const form = document.createElement('form'); form.id = 'qa-native-form'; document.body.append(form);
    for (const el of root.querySelectorAll('[name=role], input[name=selected], input[name=notifications], input[name=demo-visibility]')) el.setAttribute('form', form.id);
    return Object.fromEntries(new FormData(form));
  });
  assert.equal(serialized.role, 'editor');
  assert.equal(serialized.selected, 'on');
  assert.equal(serialized['demo-visibility'], 'link');
  assert(!('notifications' in serialized));
  checks.push('Base UI select, RTL radio arrows, Space checkbox/switch, indeterminate and native FormData');

  const create = page.getByRole('button', { name: 'ایجاد سند', exact: true });
  await create.click();
  assert.equal(await create.isDisabled(), true);
  assert.equal(await create.getAttribute('aria-busy'), 'true');
  assert.equal(await create.textContent(), 'ایجاد سند');
  await create.evaluate(el => el.click());
  await page.waitForFunction(() => !document.querySelector('[aria-busy=true]:not([disabled])') && [...document.querySelectorAll('button')].find(el => el.textContent === 'ایجاد سند')?.disabled === false);
  assert(await controls.getByText('شمار اجرای محلی: ۱', { exact: false }).count());
  checks.push('loading retains label, announces busy and prevents a duplicate click');

  const file = page.locator('input[type=file][name=attachment]');
  assert.equal(await file.evaluate(el => { el.required = true; return el.reportValidity(); }), false);
  assert.equal(await page.getByRole('button', { name: 'فایل نمونه', exact: true }).first().evaluate(el => document.activeElement === el), true);
  await file.evaluate(el => { el.required = false; });
  await file.setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('local sample') });
  assert.notEqual(await file.getAttribute('aria-invalid'), 'true');
  await page.getByRole('button', { name: 'پاک‌کردن فایل notes.txt', exact: true }).click();
  assert.equal(await file.evaluate(el => el.files.length), 0);
  assert.equal(await page.getByRole('button', { name: 'فایل نمونه', exact: true }).first().evaluate(el => document.activeElement === el), true);
  await file.setInputFiles({ name: 'wrong.png', mimeType: 'image/png', buffer: Buffer.from('bad') });
  assert.equal(await file.getAttribute('aria-invalid'), 'true');
  assert.equal(await file.evaluate(el => el.validity.valid), false);
  await file.setInputFiles({ name: 'large.txt', mimeType: 'text/plain', buffer: Buffer.alloc(1024 * 1024 + 1) });
  assert.equal(await file.getAttribute('aria-invalid'), 'true');
  await page.getByRole('button', { name: 'پاک‌کردن فایل large.txt', exact: true }).click();
  assert.notEqual(await file.getAttribute('aria-invalid'), 'true');
  checks.push('local file selection, type and size rejection, clearing and focus restoration');

  const ids = await page.evaluate(() => {
    const elements = [...document.querySelectorAll('[id]')];
    return { count: elements.length, unique: new Set(elements.map(el => el.id)).size,
      missing: [...document.querySelectorAll('[aria-describedby]')].flatMap(el => el.getAttribute('aria-describedby').split(/\s+/).filter(id => !document.getElementById(id))) };
  });
  assert.equal(ids.count, ids.unique); assert.deepEqual(ids.missing, []);
  assert(await page.getByRole('textbox', { name: 'شناسه سند', exact: true }).getAttribute('readonly') !== null);
  assert(await page.getByRole('textbox', { name: 'نام بایگانی', exact: true }).isDisabled());
  checks.push('unique ids, existing descriptions, readonly vs disabled');
  const sizes = await Promise.all(['کوچک', 'متوسط', 'بزرگ'].map(name => page.getByRole('button', { name, exact: true }).evaluate(el => el.getBoundingClientRect().height)));
  assert.deepEqual(sizes, [32, 40, 48]);
  await create.hover(); await page.waitForFunction(el => getComputedStyle(el).backgroundColor === 'rgb(96, 54, 149)', await create.elementHandle()); const hover = await create.evaluate(el => getComputedStyle(el).backgroundColor);
  await page.mouse.down(); await page.waitForFunction(el => getComputedStyle(el).backgroundColor === 'rgb(77, 43, 120)', await create.elementHandle()); const pressed = await create.evaluate(el => getComputedStyle(el).backgroundColor); await page.mouse.up();
  checks.push('32/40/48 desktop control heights');
  const widths = [];
  for (const width of [360, 640, 700, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    widths.push(await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth })));
  }
  assert(widths.every(item => item.width === item.scroll));
  checks.push('no document overflow at 360/640/700/1024/1440');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('#buttons').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-c/buttons-desktop.png' });
  await page.locator('#inputs').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-c/inputs-desktop.png' });
  await page.locator('#status').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-c/status-desktop.png' });
  const mobile = await browser.newPage({ viewport: { width: 360, height: 900 }, isMobile: true, hasTouch: true });
  await mobile.goto(process.env.QA_URL ?? 'http://localhost:3100', { waitUntil: 'networkidle' });
  await mobile.locator('#inputs').scrollIntoViewIfNeeded(); await mobile.screenshot({ path: '.codex/qa-stage-c/inputs-mobile.png' });
  assert((await mobile.getByRole('button', { name: 'کوچک', exact: true }).boundingBox()).height >= 44);
  checks.push('44px coarse pointer Button');
  assert.deepEqual(errors, []); assert.deepEqual(mutations, []);
  fs.writeFileSync('.codex/qa-stage-c/report.json', JSON.stringify({ checks, widths, sizes, hover, pressed, errors, mutations }, null, 2));
  console.log(JSON.stringify({ checks, widths, sizes, errors, mutations }, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1) });
