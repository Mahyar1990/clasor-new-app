"use client";
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { OrganizationState } from "./model";
import { initialOrganizationState } from "./fixtures";
const Context = createContext<{ state: OrganizationState; setState: Dispatch<SetStateAction<OrganizationState>> } | null>(null);
export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialOrganizationState);
  return <Context.Provider value={{ state, setState }}>{children}</Context.Provider>;
}
export function useOrganization() { const value = useContext(Context); if (!value) throw new Error("OrganizationProvider is required"); return value; }
