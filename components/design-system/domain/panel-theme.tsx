"use client";
import { useLayoutEffect } from "react";
import { panelPaletteStyles } from "@/lib/design-system/panel-palette";
/** Root scope includes portalled dialogs; cleanup keeps independent catalogues isolated. */
export function PanelTheme({ colors }: { colors: Record<string, string> }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const styles = panelPaletteStyles(colors);
    const previous = Object.keys(styles).map(key => [key, root.style.getPropertyValue(key), root.style.getPropertyPriority(key)]);
    const attribute = root.getAttribute("data-panel-theme");
    if (Object.keys(styles).length) root.setAttribute("data-panel-theme", "custom");
    Object.entries(styles).forEach(([key, value]) => root.style.setProperty(key, value));
    return () => {
      previous.forEach(([key, value, priority]) => value ? root.style.setProperty(key, value, priority) : root.style.removeProperty(key));
      if (attribute === null) root.removeAttribute("data-panel-theme"); else root.setAttribute("data-panel-theme", attribute);
    };
  }, [colors]);
  return null;
}
