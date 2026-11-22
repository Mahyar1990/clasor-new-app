"use client";
import { useState } from "react";
import { HierarchyList, type HierarchyNode } from "@/components/ui/HierarchyList";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { Identity } from "@/components/ui/identity";
import { GlassCard } from "@/components/ui/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Sample } from "./sample";
import { hierarchyPath } from "@/lib/design-system/hierarchy";
const hierarchy: HierarchyNode[] = [
  { id: "central", label: "دفتر مرکزی", children: [
    { id: "product", label: "معاونت محصول", children: [{ id: "design", label: "تیم طراحی", children: [{ id: "research", label: "پژوهش کاربران" }] }] },
    { id: "support", label: "پشتیبانی" },
    { id: "restricted", label: "واحد غیرفعال نمونه", disabled: true },
  ] },
];
export function HierarchyCatalogue() {
  const [selected, setSelected] = useState("design");
  const [expanded, setExpanded] = useState(new Set(["central", "product", "design"]));
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("");
  function toggle(id: string) { setExpanded(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }
  return <Sample title="ساختار انتخاب‌پذیر و پنل اطلاعات" description="هر سطح می‌تواند انتخاب شود؛ بازوبسته‌کردن زیرمجموعه و عملیات مستقل از انتخاب‌اند. Tab و Enter/Space کنترل‌های بومی را فعال می‌کنند؛ این الگو نقش ARIA tree و کلیدهای اختصاصی درخت را ادعا نمی‌کند.">
    <p data-test-id="catalogue-hierarchy-motion" className="text-xs text-muted-foreground">فلش کوتاه می‌چرخد، اما شاخه همان لحظه باز یا بسته می‌شود. در حالت کاهش حرکت، تغییر فلش هم فوری است.</p>
    <label data-test-id="catalogue-hierarchy-dark-label" className="mb-3 flex items-center gap-2 text-xs"><Checkbox data-test-id="catalogue-hierarchy-dark" checked={dark} onCheckedChange={value => setDark(!!value)} />تم تیره محلی</label>
    <div data-test-id="catalogue-hierarchy-layout" className={`${dark ? "dark" : ""} grid gap-3 lg:grid-cols-2`}>
      <GlassCard data-test-id="catalogue-hierarchy-panel" className="p-3"><HierarchyList testId="catalogue-hierarchy" label="ساختار نمونه" items={hierarchy} selectedId={selected} expanded={expanded} onExpandedChange={toggle} onSelectionChange={setSelected} renderActions={item => <RowActionMenu rowLabel={item.label} items={[{ id: "inspect", label: "عملیات مستقل نمونه", onSelect: () => setMessage(`عملیات ${item.label} اجرا شد؛ انتخاب فعلی تغییر نکرد.`) }]} />} /></GlassCard>
      <GlassCard data-test-id="catalogue-hierarchy-detail" className="space-y-3 p-3"><h3 data-test-id="catalogue-hierarchy-detail-title" className="text-sm font-semibold">شناسه انتخاب‌شده: {selected}</h3><p data-test-id="catalogue-hierarchy-path" className="text-xs text-muted-foreground">{hierarchyPath(hierarchy, selected).join(" ← ")}</p><Identity density="compact" identity={{ kind: "known", id: "hierarchy-user", name: "همکار نمونه" }} /><Identity density="compact" identity={{ kind: "unknown", label: "نام ثبت نشده" }} /><p data-test-id="catalogue-hierarchy-status" role="status" className="text-xs">{message}</p></GlassCard>
    </div>
  </Sample>;
}
