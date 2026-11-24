"use client";

import { createThemePreference, ThemePreference, useDocumentTheme, useThemePreference } from "@/components/ui/theme-preference";

// Keep the preference already saved by earlier versions of the publish pages.
const clasorTheme = createThemePreference("clasor.publish.theme");

export function ClasorDocumentTheme() {
  const preference = useThemePreference(clasorTheme);
  useDocumentTheme(preference);
  return null;
}

export function ClasorThemePreference({ testId }: { testId: string }) {
  const preference = useThemePreference(clasorTheme);
  return <ThemePreference preference={preference} onChange={clasorTheme.setPreference} testId={testId} />;
}
