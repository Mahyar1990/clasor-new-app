"use client";

import { useId, useLayoutEffect, useSyncExternalStore } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const options = [
  { value: "system", label: "مطابق سیستم" },
  { value: "light", label: "روشن" },
  { value: "dark", label: "تاریک" },
] as const;
export type ThemeMode = (typeof options)[number]["value"];
const defaultPreference = () => "system" as const;

export function createThemePreference(storageKey: string) {
  let sessionPreference: ThemeMode | undefined;
  const listeners = new Set<() => void>();

  function getPreference(): ThemeMode {
    if (sessionPreference) return sessionPreference;
    try {
      const value = localStorage.getItem(storageKey);
      return options.find(option => option.value === value)?.value ?? defaultPreference();
    } catch {
      return defaultPreference();
    }
  }

  function subscribe(listener: () => void) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) listener();
    };
    window.addEventListener("storage", onStorage);
    listeners.add(listener);
    return () => {
      window.removeEventListener("storage", onStorage);
      listeners.delete(listener);
    };
  }

  function setPreference(value: ThemeMode) {
    try {
      localStorage.setItem(storageKey, value);
      sessionPreference = undefined;
    } catch {
      sessionPreference = value;
    }
    listeners.forEach(listener => listener());
  }

  return { getPreference, subscribe, setPreference };
}

export function useThemePreference(store: ReturnType<typeof createThemePreference>) {
  return useSyncExternalStore(store.subscribe, store.getPreference, defaultPreference);
}

export function useDocumentTheme(preference: ThemeMode | undefined) {
  useLayoutEffect(() => {
    if (!preference) return;
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => root.classList.toggle("dark", preference === "dark" || (preference === "system" && media.matches));
    apply();
    if (preference === "system") media.addEventListener("change", apply);
    return () => {
      if (preference === "system") media.removeEventListener("change", apply);
      root.classList.toggle("dark", wasDark);
    };
  }, [preference]);
}

export function ThemePreference({ preference, onChange, testId }: { preference: ThemeMode; onChange: (value: ThemeMode) => void; testId: string }) {
  const id = useId();
  return <div data-test-id={`${testId}-preference`} className="inline-flex min-w-0 items-center gap-2 text-xs">
    <label data-test-id={`${testId}-label`} htmlFor={id}>تم</label>
    <Select items={options} value={preference} onValueChange={value => {
      if (value) onChange(value);
    }}>
      <SelectTrigger id={id} data-test-id={`${testId}-trigger`} className="w-29">
        <SelectValue />
      </SelectTrigger>
      <SelectContent dir="rtl" align="end" alignItemWithTrigger={false} data-test-id={`${testId}-options`}>
        {options.map(option => <SelectItem key={option.value} value={option.value} data-test-id={`${testId}-${option.value}`}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>;
}
