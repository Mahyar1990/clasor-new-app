"use client";

import { useContext, type ReactNode } from "react";
import { PortalThemeContext } from "@/hooks/use-portal-theme";

export const previewDarkLabel = "تم تاریک فقط برای این نمونه";

export function CataloguePreviewTheme({ forceDark, children }: { forceDark: boolean; children: ReactNode }) {
  const parent = useContext(PortalThemeContext);
  return <PortalThemeContext.Provider value={forceDark ? "dark" : parent ?? "document"}>{children}</PortalThemeContext.Provider>;
}
