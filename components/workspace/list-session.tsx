"use client";

import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react";
import { defaultFilters } from "@/lib/workspace/documents";
import type { IDocumentFilters, ListScenario } from "@/interface/workspace";

type ListState = { filters: IDocumentFilters; selectedIds: string[]; scenario: ListScenario };
type ListSessions = Record<string, ListState>;
const initial: ListState = { filters: defaultFilters, selectedIds: [], scenario: "ready" };
const Context = createContext<{ sessions: ListSessions; update: (key: string, patch: (state: ListState) => ListState) => void } | null>(null);

export function ListSessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ListSessions>({});
  function update(key: string, patch: (state: ListState) => ListState) {
    setSessions(previous => ({ ...previous, [key]: patch(previous[key] ?? initial) }));
  }
  return <Context.Provider value={{ sessions, update }}>{children}</Context.Provider>;
}

export function useListSession(key: string) {
  const context = useContext(Context);
  if (!context) throw new Error("ListSessionProvider is required");
  const state = context.sessions[key] ?? initial;
  function setter<K extends keyof ListState>(field: K) {
    return (value: SetStateAction<ListState[K]>) => context!.update(key, previous => ({ ...previous, [field]: typeof value === "function" ? (value as (old: ListState[K]) => ListState[K])(previous[field]) : value }));
  }
  return { ...state, setFilters: setter("filters"), setSelectedIds: setter("selectedIds"), setScenario: setter("scenario") };
}

export function useClearListSelections() {
  const context = useContext(Context);
  if (!context) throw new Error("ListSessionProvider is required");
  return () => Object.keys(context.sessions).forEach(key => context.update(key, state => ({ ...state, selectedIds: [] })));
}
