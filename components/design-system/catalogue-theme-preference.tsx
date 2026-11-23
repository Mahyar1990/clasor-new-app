"use client";

import { createThemePreference, ThemePreference } from "@/components/ui/theme-preference";

const catalogueTheme = createThemePreference("clasor.catalogue.theme");

export function CatalogueThemePreference() {
  return <ThemePreference store={catalogueTheme} testId="catalogue-theme" />;
}
