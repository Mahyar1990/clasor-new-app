"use client";
import { useRef, useState } from "react";
import { DockedPanel } from "@/components/ui/DockedPanel";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { GlassPreviewFrame } from "./glass-preview-frame";
export function DockedPanelCatalogue() {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  return <GlassPreviewFrame title="پنل کوچکِ کنار محتوا؛ بدون هم‌پوشانی" testId="docked-panel-catalogue">
    <Button data-test-id="catalogue-docked-toggle" ref={toggle} size="sm" variant="outline" aria-expanded={open} aria-controls="catalogue-docked-panel" onClick={() => setOpen(current => !current)}>ابزارهای کناری</Button>
    <div data-test-id="catalogue-docked-layout" dir="rtl" className="flex h-64 min-w-0 gap-2"><DockedPanel testId="catalogue-docked-panel" title="ابزارها" open={open} onClose={() => { setOpen(false); toggle.current?.focus(); }}><ClasorTabs label="نمونهٔ پنل کنار محتوا" defaultValue="tags" items={[{ value: "tags", label: "تگ‌ها", content: <TextField data-test-id="catalogue-docked-field" label="متن نمونه" value={text} onValueChange={setText} /> }, { value: "notes", label: "دیدگاه‌ها", content: <p data-test-id="catalogue-docked-empty">هنوز دیدگاهی ثبت نشده است.</p> }]} /></DockedPanel><div data-test-id="catalogue-docked-editor" className="min-w-0 flex-1 rounded-lg border border-white/30 bg-white/20 p-2 text-xs wrap-anywhere">ناحیهٔ محتوا با باز و بسته‌شدن پنل تغییر عرض می‌دهد و قابل تعامل می‌ماند.<Button data-test-id="catalogue-docked-content-action" size="sm" variant="outline" onClick={() => setText("محتوا همچنان فعال است")}>اجرا</Button></div></div>
  </GlassPreviewFrame>;
}
