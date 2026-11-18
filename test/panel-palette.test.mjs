import test from 'node:test';
import assert from 'node:assert/strict';
import { panelPaletteDefaults, normalizePanelPalette, panelPaletteStyles } from '../lib/design-system/panel-palette.ts';
test('unchanged domain defaults preserve the implemented material and all 34 roles have bindings', () => {
  assert.equal(Object.keys(panelPaletteDefaults).length, 34);
  assert.deepEqual(panelPaletteStyles(panelPaletteDefaults), {});
  for (const key of Object.keys(panelPaletteDefaults)) {
    const styles = panelPaletteStyles({ ...panelPaletteDefaults, [key]: '#123456' });
    assert.ok(Object.values(styles).includes('#123456'), key);
    assert.ok(Object.keys(styles).every(name => name.startsWith('--')));
  }
});
test('saved palettes reject unknown fields, malformed storage and CSS injection', () => {
  for (const value of [null, [], 'bad', { 'color-0': 'red;display:none', 'color-1': '#abc', unknown: '#123456' }]) assert.deepEqual(normalizePanelPalette(value), panelPaletteDefaults);
  assert.equal(normalizePanelPalette({ 'color-0': '#aabbcc' })['color-0'], '#AABBCC');
});
test('primary, surfaces, texts, statuses and borders map to the actual shared contracts', () => {
  const colors = { ...panelPaletteDefaults, 'color-0': '#123456', 'color-6': '#234567', 'color-7': '#345678', 'color-18': '#456789', 'color-33': '#56789A' };
  const styles = panelPaletteStyles(colors);
  assert.equal(styles['--color-purple-600'], '#123456');
  assert.equal(styles['--glass-tint'], '#234567');
  assert.equal(styles['--glass-error'], '#345678');
  assert.equal(styles['--panel-body-text'], '#456789');
  assert.equal(styles['--panel-field-border'], '#56789A');
});
