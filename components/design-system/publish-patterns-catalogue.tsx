"use client";
import { useRef, useState } from "react";
import { Copy, Info } from "lucide-react";
import { OutlineNavigation, type OutlineItem } from "@/components/ui/OutlineNavigation";
import { FloatingOptions } from "@/components/ui/FloatingOptions";
import { ReadingSurface } from "@/components/ui/ReadingSurface";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { publishPatternDemoLayout } from "./catalogue-layout";
const items: OutlineItem[] = [{ id: "intro", label: "معرفی", href: "#publish-patterns-catalogue" }, { id: "guides", label: "شروع به کار", children: [{ id: "account", label: "ساخت حساب کاربری", href: "#publish-patterns-catalogue" }, { id: "advanced", label: "تنظیمات پیشرفته", children: [{ id: "access", label: "کنترل دسترسی", href: "#publish-patterns-catalogue" }] }] }];
export function PublishPatternsCatalogue() {
  const anchor = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState("intro");
  const [expanded, setExpanded] = useState(new Set(["guides"]));
  const [compact, setCompact] = useState(true);
  const [long, setLong] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  return <GlassPreviewFrame testId="publish-patterns-catalogue" title="مطالعهٔ مستندات؛ درخت ناوبری و گزینه‌های شناور">
    <div data-test-id="publish-pattern-controls" className="flex flex-wrap gap-4"><label data-test-id="publish-pattern-empty-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-pattern-empty" checked={empty} onCheckedChange={value => setEmpty(!!value)} />درخت خالی</label><label data-test-id="publish-pattern-disabled-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-pattern-disabled" checked={disabled} onCheckedChange={value => setDisabled(!!value)} />عملیات غیرفعال</label><label data-test-id="publish-pattern-long-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-pattern-long" checked={long} onCheckedChange={value => setLong(!!value)} />فهرست بلند و بارگذاری تدریجی</label></div>
    <label data-test-id="publish-pattern-compact-label" className="flex min-h-9 items-center gap-2 text-xs"><Checkbox data-test-id="publish-pattern-compact" checked={compact} onCheckedChange={value => setCompact(!!value)} />نمای فشرده</label>
    <div data-test-id="publish-pattern-stage" className={publishPatternDemoLayout}>
      <OutlineNavigation density={compact ? "compact" : "comfortable"} key={`${empty}:${long}`} testId="publish-pattern-outline" label="درخت اسناد نمونه" items={empty ? [] : long ? Array.from({ length: 25 }, (_, i) => ({ id: `long-${i}`, label: `سند نمونه ${i + 1}`, href: "#publish-patterns-catalogue" })) : items} selectedId={selected} expanded={expanded} onExpandedChange={id => setExpanded(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; })} onSelect={setSelected} />
      <div data-test-id="publish-pattern-content" className="relative min-w-0 pb-16"><ReadingSurface testId="publish-pattern-article" title={selected === "intro" ? "معرفی" : selected === "account" ? "ساخت حساب کاربری" : "کنترل دسترسی"} metadata="راهنمای محصول · نسخهٔ ۱"><p data-test-id="publish-pattern-paragraph">محتوا روی یک سطح آرام و خوانا قرار می‌گیرد؛ ناوبری و عملیات شیشه‌ای از متن جدا هستند.</p><p data-test-id="publish-pattern-keyboard" className="text-xs text-muted-foreground">با Tab میان سندها و دسته‌ها حرکت کنید؛ Enter سند را انتخاب می‌کند و Space دسته را باز یا بسته می‌کند.</p></ReadingSurface><div ref={anchor} data-test-id="publish-pattern-floating" className="absolute inset-x-2 bottom-0 flex justify-center"><FloatingOptions testId="publish-pattern-options" title="گزینه‌های سند" disabled={disabled} items={[{ id: "info", label: "اطلاعات سند", icon: <Info /> }, { id: "copy", label: "کپی لینک نمونه", icon: <Copy /> }]} onAction={id => { if (id === "info") setOpen(true); else setNotice("نمونهٔ بازخورد کپی لینک"); }} /></div></div>
    </div>
    <p data-test-id="publish-pattern-notice" role="status" className="text-xs">{notice}</p>
    <GlassModal themeAnchorRef={anchor} finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-pattern-options"]') ?? true} testId="publish-pattern-dialog" title="اطلاعات سند نمونه" description="نمونهٔ انتقال از منوی شناور به دیالوگ" open={open} onOpenChange={setOpen} compact surface="liquid" size="sm" footer={<Button data-test-id="publish-pattern-dismiss" variant="outline" onClick={() => setOpen(false)}>بستن</Button>}><p data-test-id="publish-pattern-dialog-copy" className="text-xs">این دیالوگ تم محلی، فوکوس و بستن با Escape را از اجزای مشترک دریافت می‌کند.</p></GlassModal>
  </GlassPreviewFrame>;
}
