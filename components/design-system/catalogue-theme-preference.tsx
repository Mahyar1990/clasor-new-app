"use client";

import { createThemePreference, ThemePreference, useDocumentTheme, useThemePreference } from "@/components/ui/theme-preference";

const catalogueTheme = createThemePreference("clasor.catalogue.theme");

export function CatalogueThemePreference() {
  const preference = useThemePreference(catalogueTheme);
  useDocumentTheme(preference);
  return <ThemePreference preference={preference} onChange={catalogueTheme.setPreference} testId="catalogue-theme" />;
}
