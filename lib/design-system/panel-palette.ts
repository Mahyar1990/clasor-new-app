/** Saved domain colors bind to shared semantic roles; unchanged defaults preserve the glass contract. */
const defaults = ['#8056CB','#F0E9FD','#F8F8F8','#FFFFFF','#B294ED','#345F94','#FFFFFF','#AC3349','#80561C','#236746','#EFF9F4','#345F94','#F0F6FE','#1D1C22','#5D5B65','#5D5B65','#5D5B65','#A1A1AA','#1F2937','#8056CB','#8056CB','#8056CB','#F8F8F8','#F1F1F3','#EBECF0','#DBDCE1','#A1A1AA','#73717C','#44424C','#2D2B33','#1D1C22','#FFEDD5','#CCFBF1','#FFFFFF'];
export const panelPaletteDefaults: Record<string, string> = Object.fromEntries(defaults.map((value, index) => [`color-${index}`, value]));
const roles = [
  ['primary','ring','brand-display','clasor-color-action-primary','color-purple-500','color-purple-600','color-purple-700'],
  ['accent','color-purple-50','color-purple-100','color-purple-200','clasor-color-brand-100'],
  ['background','clasor-color-surface-canvas'], ['panel-secondary','secondary'],
  ['clasor-color-brand-300','clasor-color-brand-400','color-purple-300'], ['panel-tertiary'],
  ['card','popover','glass-tint','glass-fallback'], ['destructive','danger','glass-error','clasor-color-semantic-danger-text'],
  ['warning','warning-border'], ['success','success-border'], ['success-surface'], ['info','info-border'], ['info-surface'],
  ['foreground','glass-text','card-foreground','popover-foreground'], ['muted-foreground'], ['panel-help-text'],
  ['panel-placeholder'], ['panel-disabled-text'], ['panel-body-text','glass-field-text'], ['panel-link'], ['panel-icon'], ['panel-icon-hover'],
  ...[50,100,200,300,400,500,700,800,900].map(level => [`color-gray-${level}`,`clasor-color-neutral-${level}`]),
  ['color-orange-100'], ['color-teal-50','color-teal-100'], ['border','input','sidebar-border','panel-border','panel-field-border'],
];
export function normalizePanelPalette(input: unknown): Record<string, string> {
  const source = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  return Object.fromEntries(Object.entries(panelPaletteDefaults).map(([key, fallback]) => [key, typeof source[key] === 'string' && /^#[\da-f]{6}$/i.test(source[key]) ? source[key].toUpperCase() : fallback]));
}
export function panelPaletteStyles(input: unknown): Record<string, string> {
  const colors = normalizePanelPalette(input);
  const styles: Record<string, string> = {};
  roles.forEach((names, index) => {
    const color = colors[`color-${index}`];
    if (color === defaults[index]) return;
    names.forEach(name => { styles[`--${name}`] = color; });
  });
  if (styles['--primary']) {
    styles['--primary-hover'] = `color-mix(in srgb, ${styles['--primary']}, black 12%)`;
    styles['--primary-pressed'] = `color-mix(in srgb, ${styles['--primary']}, black 22%)`;
  }
  return styles;
}
