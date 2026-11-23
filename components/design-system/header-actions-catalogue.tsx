"use client";
import { useState } from "react";
import { ClasorDashboardHeaderActions } from "./clasor-dashboard-header-actions";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { CheckboxField } from "@/components/ui/choice-field";
import { ThemePreference, type ThemeMode } from "@/components/ui/theme-preference";
import { CataloguePreviewTheme } from "./catalogue-preview-theme";
export function HeaderActionsCatalogue() {
  const [empty, setEmpty] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("system");
  return <GlassPreviewFrame title="ابزارهای هدر؛ دعوت‌ها، بازخورد و حساب" testId="header-actions-catalogue">
    <div data-test-id="header-actions-preview" className={`flex flex-wrap items-center justify-between gap-3 rounded-lg p-3 ${theme === "dark" ? "dark bg-background text-foreground" : ""}`}>
      <CataloguePreviewTheme forceDark={theme === "dark"}>
      <p data-test-id="header-actions-preview-title" className="text-xs font-medium">کلاسور · هدر جمع‌وجور</p>
      <ClasorDashboardHeaderActions key={String(empty)} initialInvitations={empty ? [] : undefined} appearance={<ThemePreference preference={theme} onChange={setTheme} testId="catalogue-dashboard-theme" />} />
      </CataloguePreviewTheme>
    </div>
    <CheckboxField data-test-id="header-actions-empty" label="نمایش فهرست خالی دعوت‌ها" checked={empty} onCheckedChange={setEmpty} />
    <p data-test-id="header-actions-description" className="text-xs text-muted-foreground">دعوت‌ها با نقش و تأیید/رد، فرم بازخورد با متن و پیوست، و منوی حساب. پنل ادمین، پیش‌نمایش محلی پنل را در تب جدید باز می‌کند و در سایدبار محصول تکرار نمی‌شود؛ ثبت و تصمیم‌های این نمونه محلی‌اند.</p>
  </GlassPreviewFrame>;
}
