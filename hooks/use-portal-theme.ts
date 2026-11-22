"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type RefObject } from "react";

export const PortalThemeContext = createContext<"dark" | "document" | undefined>(undefined);

export function isDarkPortalSource(source: Element | null) {
  return Boolean(source?.closest(".dark") || document.documentElement.classList.contains("dark"));
}

function subscribe(notify: () => void, trackFocus: boolean, trackAncestors: boolean) {
  if (trackFocus) document.addEventListener("focusin", notify);
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"], subtree: trackAncestors });
  return () => { observer.disconnect(); if (trackFocus) document.removeEventListener("focusin", notify); };
}

/** Preserve a local dark preview when Base UI renders its popup in document.body. */
export function usePortalTheme(source?: RefObject<HTMLElement | null>) {
  const scope = useContext(PortalThemeContext);
  const trackFocus = !source && !scope;
  const subscribeTheme = useCallback((notify: () => void) => subscribe(notify, trackFocus, !!source && !scope), [source, scope, trackFocus]);
  return useSyncExternalStore(subscribeTheme, () => scope === "dark" || isDarkPortalSource(source?.current ?? (trackFocus ? document.activeElement : null)) ? "dark" : undefined, () => undefined);
}
