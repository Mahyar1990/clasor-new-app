import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL(process.env.TEMP + '/clasor-design-qa/node_modules/playwright/index.mjs').href);
const reference = JSON.parse(fs.readFileSync('clasor-design-system/components.json', 'utf8'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.QA_URL ?? 'http://localhost:3101', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('[data-catalogue-navigation] a').count(), 13);
  for (const component of reference.components) {
    const detail = page.locator(`#contract-${component.id}`); assert.equal(await detail.count(), 1);
    assert.equal(await page.locator(component.previewAnchor).count(), 1);
    await detail.locator('summary').click();
    const paths = await detail.locator('dd').first().innerText();
    for (const path of paths.split(' · ')) assert(fs.existsSync(path));
    for (const state of component.states) assert((await detail.innerText()).includes(state));
    for (const ref of component.auditIssueRefs) assert((await detail.innerText()).includes(ref));
  }
  const widths = [];
  for (const width of [360, 639, 640, 641, 699, 700, 701, 1023, 1024, 1025, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    widths.push(await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth })));
  }
  assert(widths.every(value => value.width === value.scroll));
  await page.setViewportSize({ width: 720, height: 900 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const zoom = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(zoom.width, zoom.scroll);
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const ids = await page.evaluate(() => {
    const all = [...document.querySelectorAll('[id]')].map(el => el.id);
    return { count: all.length, unique: new Set(all).size, missing: [...document.querySelectorAll('[aria-describedby]')].flatMap(el => el.getAttribute('aria-describedby').split(/\s+/).filter(id => !document.getElementById(id))) };
  });
  assert.equal(ids.count, ids.unique); assert.deepEqual(ids.missing, []);
  await page.addScriptTag({ path: process.env.TEMP + '/clasor-design-qa/node_modules/axe-core/axe.min.js' });
  const audit = await page.evaluate(async () => await axe.run('.clasor', { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
  const violations = audit.violations.map(value => ({ id: value.id, impact: value.impact, nodes: value.nodes.map(node => ({ html: node.html, failureSummary: node.failureSummary })) }));
  fs.writeFileSync('.codex/qa-stage-f/axe.json', JSON.stringify({ violations, passes: audit.passes.length, incomplete: audit.incomplete.map(item => ({ id: item.id, nodes: item.nodes.length })) }, null, 2));
  assert.deepEqual(violations, []);
  await page.evaluate(() => document.querySelectorAll('details').forEach(el => el.open = false));
  await page.locator('[data-catalogue-navigation] a[href="#inputs"]').click();
  await page.waitForFunction(() => document.querySelector('[data-catalogue-navigation] a[aria-current=location]')?.getAttribute('href') === '#inputs');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const motion = await page.locator('[data-slot=skeleton]').first().evaluate(el => getComputedStyle(el).animationDuration);
  assert(parseFloat(motion) <= 0.001);
  const overlayAudits = [];
  for (const name of ['تأیید نمونه', 'حذف در نمونه', 'جزئیات سند نمونه']) {
    await page.getByRole('button', { name, exact: true }).click();
    const selector = name === 'حذف در نمونه' ? '[role=alertdialog]' : '[role=dialog]';
    await page.locator(selector).waitFor();
    await page.locator(selector).evaluate(async el => { await Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => {}))); });
    const result = await page.evaluate(async selector => {
      const result = await axe.run(selector, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
      return result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.failureSummary) }));
    }, selector);
    overlayAudits.push({ name, violations: result }); assert.deepEqual(result, []);
    await page.keyboard.press('Escape'); await page.locator(selector).waitFor({ state: 'hidden' });
  }
  await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__copiedColor = value; } } }); });
  await page.locator('.palette .swatch').first().click();
  assert.equal(await page.evaluate(() => window.__copiedColor), '#F7F3FC');
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw Error('unavailable'); }; });
  await page.locator('.palette .swatch').first().click();
  assert((await page.locator('.palette-footer [role=status]').innerText()).includes('کپی خودکار در دسترس نیست'));
  await page.getByRole('button', { name: 'Default', exact: true }).click();
  await page.mouse.move(0, 0);
  await page.getByRole('button', { name: 'بستن پیام', exact: true }).waitFor({ state: 'hidden', timeout: 9000 });
  fs.writeFileSync('.codex/qa-stage-f/overlays.json', JSON.stringify({ overlayAudits, clipboardSuccessAndFallback: true, toastAutoDismiss6500: true }, null, 2));
  await page.locator('#handoff').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-f/handoff-desktop.png' });
  await page.locator('#data').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-f/table-desktop.png' });
  await page.setViewportSize({ width: 360, height: 900 }); await page.locator('#patterns').scrollIntoViewIfNeeded(); await page.screenshot({ path: '.codex/qa-stage-f/patterns-mobile.png' });
  assert.deepEqual(errors, []);
  fs.writeFileSync('.codex/qa-stage-f/report.json', JSON.stringify({ contracts: reference.components.length, sections: 13, expandedContractsFit: true, widths, textZoom200: zoom, ids, axeViolations: 0, axePasses: audit.passes.length, reducedMotion: motion, screenReaderHumanTest: 'not-performed', errors }, null, 2));
  console.log('Stage F: 22 contracts, 13 sections, expanded docs, 11 widths, 200% text, ids and axe checks passed.');
} finally { await browser.close(); }
