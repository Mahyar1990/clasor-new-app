"use client";
import { useState } from "react";
import { ClasorDashboardHeaderActions } from "./clasor-dashboard-header-actions";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { CheckboxField } from "@/components/ui/choice-field";
export function HeaderActionsCatalogue() {
  const [empty, setEmpty] = useState(false);
  return <GlassPreviewFrame title="ابزارهای هدر؛ دعوت‌ها، بازخورد و حساب" testId="header-actions-catalogue">
    <div data-test-id="header-actions-preview" className="flex flex-wrap items-center justify-between gap-3">
      <p data-test-id="header-actions-preview-title" className="text-xs font-medium">کلاسور · هدر جمع‌وجور</p>
      <ClasorDashboardHeaderActions key={String(empty)} initialInvitations={empty ? [] : undefined} />
    </div>
    <CheckboxField data-test-id="header-actions-empty" label="نمایش فهرست خالی دعوت‌ها" checked={empty} onCheckedChange={setEmpty} />
    <p data-test-id="header-actions-description" className="text-xs text-muted-foreground">دعوت‌ها با نقش و تأیید/رد، فرم بازخورد با متن و پیوست، و منوی حساب. پنل ادمین، پیش‌نمایش محلی پنل را در تب جدید باز می‌کند و در سایدبار محصول تکرار نمی‌شود؛ ثبت و تصمیم‌های این نمونه محلی‌اند.</p>
  </GlassPreviewFrame>;
}
