"use client";
import { normalizePanelPalette, panelPaletteDefaults } from "@/lib/design-system/panel-palette";
export const paletteStorageKey = "clasor-domain-palette-v1";
export const defaultPaletteSnapshot = JSON.stringify(panelPaletteDefaults);
let snapshot = defaultPaletteSnapshot;
const listeners = new Set<() => void>();
function parse(value: string | null) {
  try { return JSON.stringify(normalizePanelPalette(value ? JSON.parse(value) : null)); }
  catch { return defaultPaletteSnapshot; }
}
export function getPaletteSnapshot() {
  if (typeof window !== "undefined") {
    try { snapshot = parse(localStorage.getItem(paletteStorageKey)); } catch { /* Memory fallback when browser storage is blocked. */ }
  }
  return snapshot;
}
export function subscribePalette(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== paletteStorageKey && event.key !== null) return;
    snapshot = parse(event.newValue); listeners.forEach(notify => notify());
  };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
export function savePalette(colors: Record<string, string>) {
  snapshot = JSON.stringify(normalizePanelPalette(colors));
  try { localStorage.setItem(paletteStorageKey, snapshot); } catch { /* Keep the saved theme active for this session. */ }
  listeners.forEach(notify => notify());
}
