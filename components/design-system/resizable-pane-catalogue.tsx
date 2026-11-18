"use client";
import { useState } from "react";
import { ResizablePane } from "@/components/ui/ResizablePane";
import { GlassCard } from "@/components/ui/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import { OutlineNavigation } from "@/components/ui/OutlineNavigation";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { resizablePaneDemoLayout } from "./catalogue-layout";
const items = [{ id: "resize-folder", label: "راهنما", children: [{ id: "resize-sub", label: "شروع", children: [{ id: "resize-document", label: "سند", href: "#resize-demo-content" }] }] }];
export function ResizablePaneCatalogue() {
  const [ltr, setLtr] = useState(false);
  const [expanded, setExpanded] = useState(new Set(["resize-folder", "resize-sub"]));
  return <GlassPreviewFrame testId="resizable-pane-catalogue" title="عرض قابل تنظیم؛ کشیدن مرز و کنترل با صفحه‌کلید">
    <label data-test-id="resize-demo-direction-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="resize-demo-direction" checked={ltr} onCheckedChange={value => setLtr(!!value)} />بررسی جهت چپ به راست</label>
    <p data-test-id="resize-demo-help" className="text-[11px] leading-6 text-muted-foreground">مرز را بکشید یا با Tab روی آن بروید و کلیدهای چپ و راست را بزنید. Home و End عرض را به کمترین و بیشترین مقدار می‌برند. دوبار کلیک عرض اولیه را برمی‌گرداند.</p>
    <div data-test-id="resize-demo-stage" className={resizablePaneDemoLayout} dir={ltr ? "ltr" : "rtl"}>
      <ResizablePane testId="resize-demo-pane" label="عرض فهرست نمونه" defaultWidth={180} minWidth={112} maxWidth={320} minRemainingWidth={112} direction={ltr ? "ltr" : "rtl"}>
        <GlassCard data-test-id="resize-demo-sidebar" className="h-full overflow-auto p-2"><OutlineNavigation testId="resize-demo-outline" label="ساختار نمونه" density="compact" items={items} selectedId="resize-document" expanded={expanded} onExpandedChange={id => setExpanded(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; })} onSelect={() => {}} /></GlassCard>
      </ResizablePane>
      <GlassCard data-test-id="resize-demo-content" id="resize-demo-content" className="min-w-0 flex-1 p-3"><h4 data-test-id="resize-demo-content-title" className="text-xs font-semibold">محتوا</h4><p data-test-id="resize-demo-content-copy" className="mt-2 text-[11px] leading-6">عرض این بخش همراه با تغییر اندازهٔ فهرست تنظیم می‌شود.</p></GlassCard>
    </div>
  </GlassPreviewFrame>;
}
