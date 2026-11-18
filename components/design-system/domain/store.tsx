"use client";
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { DomainState, DomainSettings } from "./model";
import { initialDomainState } from "./fixtures";
const Context = createContext<{ state: DomainState; setState: Dispatch<SetStateAction<DomainState>>; settingsDraft: DomainSettings; setSettingsDraft: Dispatch<SetStateAction<DomainSettings>> } | null>(null);
export function DomainProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialDomainState);
  const [settingsDraft, setSettingsDraft] = useState(() => initialDomainState().settings);
  return <Context.Provider value={{ state, setState, settingsDraft, setSettingsDraft }}>{children}</Context.Provider>;
}
export function useDomain() { const value = useContext(Context); if (!value) throw new Error("DomainProvider is required"); return value; }
