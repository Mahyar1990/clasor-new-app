"use client";

import { useSyncExternalStore } from "react";

function subscribe(notify: () => void) {
  document.addEventListener("focusin", notify);
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => { observer.disconnect(); document.removeEventListener("focusin", notify); };
}

/** Preserve a local dark preview when Base UI renders its popup in document.body. */
export function usePortalTheme() {
  return useSyncExternalStore(subscribe, () => document.activeElement?.closest(".dark") || document.documentElement.classList.contains("dark") ? "dark" : undefined, () => undefined);
}
