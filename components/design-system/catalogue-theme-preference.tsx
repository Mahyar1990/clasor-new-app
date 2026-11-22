"use client";

import { useId, useLayoutEffect, useSyncExternalStore } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const storageKey = "clasor.catalogue.theme";
const options = [
  { value: "system", label: "مطابق سیستم" },
  { value: "light", label: "روشن" },
  { value: "dark", label: "تاریک" },
] as const;
type Preference = (typeof options)[number]["value"];

let sessionPreference: Preference | undefined;
const listeners = new Set<() => void>();

function getPreference(): Preference {
  if (sessionPreference) return sessionPreference;
  try {
    const value = localStorage.getItem(storageKey);
    return options.find(option => option.value === value)?.value ?? "system";
  } catch {
    return "system";
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

function setPreference(value: Preference) {
  try {
    localStorage.setItem(storageKey, value);
    sessionPreference = undefined;
  } catch {
    sessionPreference = value;
  }
  listeners.forEach(listener => listener());
}

export function CatalogueThemePreference() {
  const id = useId();
  const preference = useSyncExternalStore(subscribe, getPreference, () => "system" as const);

  useLayoutEffect(() => {
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

  return <div data-test-id="catalogue-theme-preference" className="inline-flex min-w-0 items-center gap-2 text-xs">
    <label data-test-id="catalogue-theme-label" htmlFor={id}>تم</label>
    <Select items={options} value={preference} onValueChange={value => {
      if (value) setPreference(value);
    }}>
      <SelectTrigger id={id} data-test-id="catalogue-theme-trigger" className="w-29">
        <SelectValue />
      </SelectTrigger>
      <SelectContent dir="rtl" align="end" alignItemWithTrigger={false} data-test-id="catalogue-theme-options">
        {options.map(option => <SelectItem key={option.value} value={option.value} data-test-id={`catalogue-theme-${option.value}`}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>;
}
