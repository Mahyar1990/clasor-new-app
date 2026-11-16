"use client";

import { useCallback, useSyncExternalStore, type RefObject } from "react";

function subscribe(notify: () => void, source?: RefObject<HTMLElement | null>) {
  document.addEventListener("focusin", notify);
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"], subtree: !!source });
  return () => { observer.disconnect(); document.removeEventListener("focusin", notify); };
}

/** Preserve a local dark preview when Base UI renders its popup in document.body. */
export function usePortalTheme(source?: RefObject<HTMLElement | null>) {
  const subscribeTheme = useCallback((notify: () => void) => subscribe(notify, source), [source]);
  return useSyncExternalStore(subscribeTheme, () => (source?.current ?? document.activeElement)?.closest(".dark") || document.documentElement.classList.contains("dark") ? "dark" : undefined, () => undefined);
}
