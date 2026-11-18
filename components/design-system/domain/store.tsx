"use client";
import { createContext, useContext, useState, useMemo, useSyncExternalStore, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { DomainState, DomainSettings } from "./model";
import { initialDomainState } from "./fixtures";
import { PanelTheme } from "./panel-theme";
import { defaultPaletteSnapshot, getPaletteSnapshot, subscribePalette, savePalette } from "./theme-state";
const Context = createContext<{ state: DomainState; setState: Dispatch<SetStateAction<DomainState>>; settingsDraft: DomainSettings; setSettingsDraft: Dispatch<SetStateAction<DomainSettings>>; saveSettings: (settings: DomainSettings) => void } | null>(null);
const noSubscribe = () => () => {};
const serverSnapshot = () => defaultPaletteSnapshot;
export function DomainProvider({ children, persistTheme = false }: { children: ReactNode; persistTheme?: boolean }) {
  const [localState, setState] = useState(initialDomainState);
  const [draft, setDraft] = useState<DomainSettings | null>(null);
  const snapshot = useSyncExternalStore(persistTheme ? subscribePalette : noSubscribe, persistTheme ? getPaletteSnapshot : serverSnapshot, serverSnapshot);
  const colors = useMemo<Record<string, string>>(() => JSON.parse(snapshot), [snapshot]);
  const state = persistTheme ? { ...localState, settings: { ...localState.settings, colors } } : localState;
  const setSettingsDraft: Dispatch<SetStateAction<DomainSettings>> = update => setDraft(current => typeof update === "function" ? update(current ?? state.settings) : update);
  function saveSettings(settings: DomainSettings) {
    setState(current => ({ ...current, settings }));
    if (persistTheme) savePalette(settings.colors);
    setDraft(null);
  }
  return <Context.Provider value={{ state, setState, settingsDraft: draft ?? state.settings, setSettingsDraft, saveSettings }}>{persistTheme && <PanelTheme colors={colors} />}{children}</Context.Provider>;
}
export function useDomain() { const value = useContext(Context); if (!value) throw new Error("DomainProvider is required"); return value; }
