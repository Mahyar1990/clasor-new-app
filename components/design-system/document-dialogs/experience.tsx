"use client";
import { OptionsButton } from "@/components/ui/OptionsButton";

import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassOptionsMenu, type GlassOption } from "@/components/ui/GlassOptionsMenu";
import { SelectField } from "@/components/ui/select-field";
import { documentOptions } from "../clasor-document-options";
import { dashboardDocuments } from "../clasor-dashboard-data";
import type { DialogSelection } from "../repository-dialogs/dialog";
import { DocumentActionDialog } from "./dialog";
import { initialDocument } from "./model";

function leaves(items: GlassOption[]): GlassOption[] { return items.flatMap(item => item.children ? leaves(item.children) : [item]); }
export function DocumentOptionsExperience() {
  const [document, setDocument] = useState(() => initialDocument({ ...dashboardDocuments[1], id: "catalogue-document", title: "راهنمای طراحی نمونه" }));
  const [scope, setScope] = useState("repository");
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [message, setMessage] = useState("");
  const menu = useRef<HTMLButtonElement>(null);
  const reset = useRef<HTMLButtonElement>(null);
  const items = documentOptions(document.shared, { bookmarked: document.bookmarked, hidden: document.hidden, hasPassword: !!document.password, hasLink: !!document.publishLink, publicationControls: scope === "repository" });
  const extra = leaves(documentOptions(document.shared, { hasPassword: true, hasLink: true, publicationControls: scope === "repository" }));
  return <section data-test-id="document-options-experience" className="space-y-4">
    <div data-test-id="document-options-toolbar" className="flex flex-wrap items-end justify-between gap-3">
      <div data-test-id="document-options-context" className="w-52"><SelectField data-test-id="document-options-scope" label="زمینهٔ نمونه" value={scope} options={[{ value: "dashboard", label: "داشبورد · سند شخصی" }, { value: "repository", label: "داخل مخزن · مالک" }, { value: "shared", label: "داشبورد · سند اشتراکی" }]} onValueChange={value => { setScope(value); setDocument(current => ({ ...current, shared: value === "shared" })); }} /></div>
      <Button data-test-id="document-options-reset" ref={reset} size="sm" variant="outline" onClick={() => { setDocument(initialDocument({ ...dashboardDocuments[1], id: "catalogue-document", title: "راهنمای طراحی نمونه" })); setScope("repository"); setMessage(""); }}>بازنشانی نمونه</Button>
    </div>
    <p data-test-id="document-options-scope-note" className="text-xs leading-relaxed text-muted-foreground">کنترل‌های انتشار در داشبورد اصلی مانند منبع غیرفعال‌اند؛ زمینهٔ «داخل مخزن · مالک» نمونهٔ همان دیالوگ‌ها را نمایش می‌دهد.</p>
    <GlassCard data-test-id="document-options-summary" className="flex items-center justify-between gap-3 p-3">
      <div data-test-id="document-options-copy" className="min-w-0 space-y-1"><h4 data-test-id="document-options-name" className="wrap-anywhere text-sm font-semibold">{document.title}</h4><p data-test-id="document-options-state" className="text-xs text-muted-foreground">{document.deleted ? "حذف‌شده در نمونه" : document.category} · {document.bookmarked ? "نشان‌شده" : "بدون نشان"}</p></div>
      <GlassOptionsMenu testId="document-options-menu" triggerRef={menu} title={document.title} description="گزینه‌های سند نمونه" icon={<FileText />} items={items} trigger={<OptionsButton data-test-id="document-options-menu" disabled={document.deleted} aria-label="عملیات سند نمونه" />} onAction={(id, label) => setSelection({ id, label, trigger: menu.current })} />
    </GlassCard>
    <p data-test-id="document-options-status" role="status" className="text-xs text-success">{message}</p>
    <div data-test-id="document-options-gallery" className="grid gap-2 sm:grid-cols-2">
      {extra.map(option => <Button data-test-id={`document-option-open-${option.id}`} key={option.id} variant="outline" className="h-auto min-h-11 justify-start whitespace-normal py-2 text-xs" disabled={document.deleted || option.disabled || (["delete-password"].includes(option.id) && !document.password) || (["view-link", "delete-link"].includes(option.id) && !document.publishLink)} onClick={event => setSelection({ id: option.id, label: option.label, trigger: event.currentTarget })}>{option.icon}{option.label}</Button>)}
    </div>
    {selection && <DocumentActionDialog key={selection.id} selection={selection} document={document} onChange={setDocument} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={reset} />}
  </section>;
}
