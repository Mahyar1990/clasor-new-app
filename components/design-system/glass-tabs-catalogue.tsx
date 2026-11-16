"use client";

import { useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { Checkbox } from "@/components/ui/checkbox";

export function GlassTabsCatalogue() {
  const [selected, setSelected] = useState<string | number | null>("overview");
  const [disabled, setDisabled] = useState(true);
  const [longLabels, setLongLabels] = useState(false);
  return <div data-test-id="glass-tabs-catalogue" className="space-y-5">
    <GlassPreviewFrame title="تب‌های پیش‌فرض؛ سطح و انتخاب شیشه‌ای" testId="glass-default-tabs">
      <ClasorTabs label="نمونه تب‌های پیش‌فرض" value={selected} onValueChange={setSelected} testIds={{
        root: "glass-default-tabs-root",
        list: "glass-default-tabs-list",
        tab: value => `glass-default-tab-${value}`,
        panel: value => `glass-default-panel-${value}`,
      }} items={[
        { value: "overview", label: longLabels ? "نمای کلی سندهای گروه طراحی" : "نمای کلی", content: "نمای کلی نمونه" },
        { value: "activity", label: longLabels ? "فعالیت‌های سندهای گروه طراحی" : "فعالیت‌ها", content: "فعالیت‌های نمونه" },
        { value: "disabled", label: disabled ? "غیرفعال" : "نسخه‌ها", content: "نسخه‌های نمونه", disabled },
      ]} />
      <div data-test-id="glass-tabs-state-controls" className="flex flex-wrap gap-4">
        <label data-test-id="glass-tabs-disabled-label" className="flex min-h-11 items-center gap-2 text-xs">
          <Checkbox data-test-id="glass-tabs-disabled" aria-label="غیرفعال بودن تب آخر" checked={disabled} onCheckedChange={value => { setDisabled(value); if (value && selected === "disabled") setSelected("overview"); }} />غیرفعال بودن تب آخر
        </label>
        <label data-test-id="glass-tabs-long-label" className="flex min-h-11 items-center gap-2 text-xs">
          <Checkbox data-test-id="glass-tabs-long-toggle" aria-label="نمایش عنوان بلند" checked={longLabels} onCheckedChange={setLongLabels} />نمایش عنوان بلند
        </label>
      </div>
      <p data-test-id="glass-tabs-description" className="text-xs leading-relaxed text-muted-foreground">یک ظاهر مشترک برای دیزاین سیستم، داشبورد و دیالوگ‌ها؛ با کلیدهای جهت، Home و End جابه‌جا شوید. در عرض کم، عنوان‌ها کامل می‌مانند و نوار افقی پیمایش می‌شود.</p>
    </GlassPreviewFrame>
  </div>;
}
