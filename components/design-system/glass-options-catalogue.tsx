"use client";
import { CataloguePreviewTheme, previewDarkLabel } from "./catalogue-preview-theme";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { FileText, FolderOpen } from "lucide-react";
import { documentOptions } from "@/components/design-system/clasor-document-options";
import { repositoryOptions } from "@/components/design-system/clasor-repository-options";
import { GlassRecordMenuExample } from "./glass-record-menu-example";

export function GlassOptionsCatalogue() {
  const [dark, setDark] = useState(false);
  const [busyBackground, setBusyBackground] = useState(false);
  const examples = [
    { id: "document", name: "راهنمای همکاری تیم", description: "گزینه‌های سند", icon: <FileText />, items: documentOptions() },
    { id: "shared-document", name: "گزارش اشتراکی نمونه", description: "گزینه‌های سند اشتراکی", icon: <FileText />, items: documentOptions(true) },
    { id: "owner", name: "مستندات محصول", description: "گزینه‌های مخزن · مالک", icon: <FolderOpen />, items: repositoryOptions("مالک", true) },
    { id: "member", name: "دانش تیم طراحی", description: "گزینه‌های مخزن · ویرایشگر", icon: <FolderOpen />, items: repositoryOptions("ویرایشگر") },
  ];
  return <section data-test-id="glass-options-catalogue" aria-labelledby="glass-options-title" className="space-y-4">
    <h3 data-test-id="glass-options-title" id="glass-options-title" className="text-lg font-bold">گزینه‌های شیشه‌ای سند و مخزن</h3>
    <p data-test-id="glass-options-description" className="text-sm text-muted-foreground">ته‌رنگ ۱۵٪ با محوشدگی ۱۰ پیکسل و لایهٔ ملایم زیر نوشته‌ها؛ رنگ پس‌زمینه حفظ می‌شود و متن‌های پشت کمتر مزاحم خواندن گزینه‌ها می‌شوند.</p>
    <p data-test-id="glass-options-motion" className="text-sm text-muted-foreground">منو و زیرمنو بدون لغزش یا زوم ظاهر و محو می‌شوند. با کلیدهای جهت‌دار بین گزینه‌ها حرکت کنید و با Escape ببندید. در حالت کاهش حرکت، منو بدون گذار باز و بسته می‌شود.</p>
    <label data-test-id="glass-options-dark-label" className="flex min-h-11 items-center gap-2 text-sm">
      <Checkbox data-test-id="glass-options-dark-toggle" aria-label={previewDarkLabel} checked={dark} onCheckedChange={checked => setDark(checked)} />{previewDarkLabel}
    </label>
    <label data-test-id="glass-options-busy-label" className="flex min-h-11 items-center gap-2 text-sm">
      <Checkbox data-test-id="glass-options-busy-toggle" aria-label="زمینهٔ پرنوشته برای بررسی خوانایی" checked={busyBackground} onCheckedChange={checked => setBusyBackground(checked)} />زمینهٔ پرنوشته برای بررسی خوانایی
    </label>
    <div data-test-id="glass-options-examples" className={`${dark ? "dark scheme-dark bg-slate-950/80" : ""} ${busyBackground ? "min-h-[30rem]" : ""} relative isolate grid content-start gap-3 rounded-xl bg-[linear-gradient(125deg,rgba(96,165,250,0.22),transparent_40%,rgba(167,139,250,0.22))] p-4 text-foreground sm:grid-cols-2`}>
      {busyBackground && <div data-test-id="glass-options-busy-background" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-evenly overflow-hidden rounded-xl px-4 text-lg font-bold text-slate-950/75 dark:text-slate-100/75">
        {Array.from({ length: 10 }, (_, index) => <p data-test-id={`glass-options-busy-line-${index}`} key={index} className="whitespace-nowrap">متن نمونه برای بررسی خوانایی منوی شیشه‌ای روی نوشته‌های پشت آن</p>)}
      </div>}
      <CataloguePreviewTheme forceDark={dark}>
        {examples.map(example => <GlassRecordMenuExample key={example.id} id={example.id} name={example.name} description={example.description} icon={example.icon} />)}
      </CataloguePreviewTheme>
    </div>
  </section>;
}
