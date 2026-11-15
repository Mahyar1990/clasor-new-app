"use client";

import { useState } from "react";
import { Ellipsis, FileText, FolderOpen } from "lucide-react";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { documentOptions } from "@/components/design-system/clasor-document-options";
import { repositoryOptions } from "@/components/design-system/clasor-repository-options";
import { ClasorOptionPreview, type ClasorOptionSelection } from "@/components/design-system/clasor-option-preview";

export function GlassOptionsCatalogue() {
  const [dark, setDark] = useState(false);
  const [selection, setSelection] = useState<ClasorOptionSelection | null>(null);
  const examples = [
    { id: "document", name: "راهنمای همکاری تیم", description: "گزینه‌های سند", icon: <FileText />, items: documentOptions() },
    { id: "shared-document", name: "گزارش اشتراکی نمونه", description: "گزینه‌های سند اشتراکی", icon: <FileText />, items: documentOptions(true) },
    { id: "owner", name: "مستندات محصول", description: "گزینه‌های مخزن · مالک", icon: <FolderOpen />, items: repositoryOptions("مالک", true) },
    { id: "member", name: "دانش تیم طراحی", description: "گزینه‌های مخزن · ویرایشگر", icon: <FolderOpen />, items: repositoryOptions("ویرایشگر") },
  ];
  return <section data-test-id="glass-options-catalogue" aria-labelledby="glass-options-title" className="space-y-4">
    <h3 data-test-id="glass-options-title" id="glass-options-title" className="text-lg font-bold">گزینه‌های شیشه‌ای سند و مخزن</h3>
    <p data-test-id="glass-options-description" className="text-sm text-muted-foreground">پس‌زمینهٔ شفاف با ته‌رنگ ۱۵٪ و محوشدگی ملایم ۶ پیکسل؛ رنگ و شکل‌های پشت منو دیده می‌شوند. منوی اصلی ۲۰۸ و زیرمنو ۱۶۰ پیکسل است.</p>
    <label data-test-id="glass-options-dark-label" className="flex min-h-11 items-center gap-2 text-sm">
      <input data-test-id="glass-options-dark-toggle" type="checkbox" checked={dark} onChange={event => setDark(event.target.checked)} className="size-4 accent-primary" />پیش‌نمایش تاریک منوها
    </label>
    <div data-test-id="glass-options-examples" className={`${dark ? "dark scheme-dark bg-slate-950/80" : "scheme-light"} grid gap-3 rounded-xl bg-[linear-gradient(125deg,rgba(96,165,250,0.22),transparent_40%,rgba(167,139,250,0.22))] p-4 text-foreground sm:grid-cols-2`}>
      {examples.map(example => <GlassCard data-test-id={`glass-options-example-${example.id}`} key={example.id} className="flex min-w-0 items-center justify-between gap-3 p-4">
        <div data-test-id={`glass-options-copy-${example.id}`} className="min-w-0"><p data-test-id={`glass-options-type-${example.id}`} className="text-xs text-muted-foreground">{example.description}</p><p data-test-id={`glass-options-name-${example.id}`} className="mt-1 text-sm font-medium">{example.name}</p></div>
        <GlassOptionsMenu testId={`catalogue-options-${example.id}`} title={example.name} description={example.description} icon={example.icon} items={example.items}
          trigger={<Button data-test-id={`catalogue-options-${example.id}`} variant="glass" size="icon" aria-label={`نمایش ${example.description}`}><Ellipsis aria-hidden="true" /></Button>}
          onAction={(id, label) => setSelection({ id, label, name: example.name })} />
      </GlassCard>)}
      <ClasorOptionPreview selection={selection} onClose={() => setSelection(null)} testId="catalogue-options-preview" />
    </div>
  </section>;
}
