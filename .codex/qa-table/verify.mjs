import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL(process.env.TEMP + '/clasor-design-qa/node_modules/playwright/index.mjs').href);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3101', { waitUntil: 'networkidle' });
  const sample = page.locator('[data-example=searchable-table]');
  const viewport = sample.locator('[data-slot=table-container]');
  const header = sample.locator('thead'); const body = sample.locator('tbody tr').first();
  const search = sample.getByRole('searchbox', { name: 'جست‌وجو در جدول نمونه', exact: true });
  const searchButton = sample.getByRole('button', { name: 'اجرای جست‌وجوی جدول', exact: true });
  const searchGroup = sample.locator('[data-slot=button-group]');
  assert.equal(await searchGroup.count(), 1);
  assert.equal(await search.getAttribute('aria-controls'), await sample.locator('table').getAttribute('id'));
  assert.equal(await searchButton.getAttribute('aria-controls'), await sample.locator('table').getAttribute('id'));
  assert.equal(await sample.locator('[data-slot=table-toolbar]').getByRole('searchbox').count(), 1);
  const inputBox = await search.boundingBox(); const buttonBox = await searchButton.boundingBox();
  assert(Math.abs(inputBox.height - buttonBox.height) < 1);
  assert(Math.min(Math.abs(inputBox.x - buttonBox.x - buttonBox.width), Math.abs(inputBox.x + inputBox.width - buttonBox.x)) < 1);
  await viewport.scrollIntoViewIfNeeded();
  assert.equal(await sample.locator('tbody tr').count(), 18);
  const appearance = await sample.locator('table').evaluate(table => ({
    headerFont: parseFloat(getComputedStyle(table.querySelector('thead th:nth-child(2)')).fontSize),
    recordFont: parseFloat(getComputedStyle(table.querySelector('tbody td:nth-child(2)')).fontSize),
    actionWidth: table.querySelector('thead th:last-child').getBoundingClientRect().width,
    bodyActionWidth: table.querySelector('tbody td:last-child').getBoundingClientRect().width,
  }));
  assert(appearance.recordFont < appearance.headerFont);
  assert(appearance.actionWidth <= 129 && appearance.bodyActionWidth <= 129);
  assert.equal(await page.getByText('حذف: این فهرست نمایشی است و حذف داده ندارد.', { exact: true }).count(), 0);
  const headerBefore = await header.boundingBox(); const bodyBefore = await body.boundingBox();
  const pageY = await page.evaluate(() => scrollY);
  await viewport.evaluate(el => { el.scrollTop = 180; });
  await page.waitForFunction(el => el.scrollTop >= 179, await viewport.elementHandle());
  const headerAfter = await header.boundingBox(); const bodyAfter = await body.boundingBox();
  assert(Math.abs(headerBefore.y - headerAfter.y) < 1);
  assert(bodyBefore.y - bodyAfter.y >= 179);
  assert.equal(await page.evaluate(() => scrollY), pageY);
  await viewport.focus(); await page.keyboard.press('ArrowDown');
  await page.waitForFunction(el => el.scrollTop > 180, await viewport.elementHandle());
  await search.fill('SAMPLE-001'); assert.equal(await sample.locator('tbody tr').count(), 1);
  await searchButton.click();
  assert((await sample.innerText()).includes('نتایج جست‌وجوی «SAMPLE-001»'));
  await search.fill('sample-002'); await search.press('Enter');
  assert((await sample.innerText()).includes('نتایج جست‌وجوی «sample-002»'));
  assert.equal(await sample.locator('tbody tr').count(), 1);
  await search.fill('SAMPLE-001');
  assert.equal(await sample.locator('tbody').getByText('sample-001', { exact: true }).count(), 0);
  await search.fill('zz-no-matching-document');
  assert(await sample.getByText('نتیجه‌ای برای این جست‌وجو پیدا نشد؛ نام یا شناسه دیگری وارد کنید.', { exact: true }).count());
  assert(await sample.getByRole('checkbox').first().isDisabled());
  await search.fill('sample-001'); await sample.getByRole('checkbox').nth(1).click();
  await sample.getByRole('button', { name: /^حذف ردیف / }).click();
  assert(await sample.getByRole('checkbox').first().isDisabled());
  await page.waitForFunction(el => document.activeElement === el, await search.elementHandle(), { timeout: 3000 });
  await search.fill('sample-002');
  await sample.getByRole('button', { name: /^اقدام‌های/ }).click();
  await page.getByRole('menuitem', { name: 'مشاهده مشخصات نمونه', exact: true }).click();
  assert((await sample.innerText()).includes('مشخصات نمونه: گزارش فصلی'));
  await sample.getByRole('button', { name: /^اقدام‌های/ }).click();
  await page.getByRole('menuitem', { name: 'حذف ردیف نمونه', exact: true }).click();
  await page.getByRole('menu').waitFor({ state: 'hidden' });
  await page.waitForFunction(el => document.activeElement === el, await search.elementHandle(), { timeout: 3000 });
  assert(await sample.getByRole('checkbox').first().isDisabled());
  await sample.getByRole('button', { name: 'بازنشانی نمونه جدول', exact: true }).click();
  assert.equal(await sample.locator('tbody tr').count(), 18);
  assert.equal(await search.inputValue(), '');
  await viewport.scrollIntoViewIfNeeded(); await viewport.evaluate(el => { el.scrollTop = 180; });
  await page.screenshot({ path: '.codex/qa-table/desktop.png' });
  const widths = [];
  for (const width of [360, 640, 1024, 1440]) { await page.setViewportSize({ width, height: 1000 }); widths.push(await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }))); }
  assert(widths.every(item => item.width === item.scroll));
  await page.setViewportSize({ width: 360, height: 900 }); await viewport.scrollIntoViewIfNeeded();
  await viewport.evaluate(el => { el.scrollTop = 180; }); await page.screenshot({ path: '.codex/qa-table/mobile.png' });
  assert.deepEqual(errors, []);
  fs.writeFileSync('.codex/qa-table/report.json', JSON.stringify({ attachedSearchGroup: true, searchButtonAndEnter: true, appearance, fixedHeaderDelta: headerAfter.y - headerBefore.y, bodyScrollDelta: bodyBefore.y - bodyAfter.y, keyboardScroll: true, search: true, noResults: true, directDelete: true, menuActions: true, reset: true, widths, errors }, null, 2));
  console.log('Table: fixed header, scrollable rows, keyboard scroll, search, actions, delete, reset and responsive checks passed.');
} finally { await browser.close(); }
