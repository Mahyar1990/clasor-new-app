"use client";
import { useRef, useState } from "react";
import { SlidersHorizontal, ArrowDownUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/text-field";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { DocumentList } from "../clasor-dashboard-documents";
import { applyDocumentChange } from "./tree";
import { DocumentActionDialog } from "../document-dialogs/dialog";
import { useLibrary } from "./store";
import { LibraryShell } from "./shell";
import { FilterDialog, SortDialog } from "./filters";
import { CreationDialog, type CreationKind } from "./create";
import { defaultSort, emptyFilters, queryDocuments, sortFields } from "./query";
import type { DialogSelection } from "../repository-dialogs/dialog";
export function DocumentsPage({ shared = false }: { shared?: boolean }) {
  const { documents, setDocuments } = useLibrary();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState(defaultSort);
  const [path, setPath] = useState<string[]>([]);
  const [modal, setModal] = useState<{ kind: string; trigger: HTMLElement | null } | null>(null);
  const [selection, setSelection] = useState<(DialogSelection & { recordId: string }) | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLDivElement>(null);
  const parentId = path.at(-1);
  const visible = queryDocuments(documents, shared, parentId, query, filters, sort);
  const active = Object.entries(filters).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(emptyFilters[key as keyof typeof emptyFilters]));
  const valueLabels: Record<string, string> = { document: "سند", folder: "دسته‌بندی", classic: "کلاسور", excel: "اکسل", file: "فایل", form: "فرم" };
  const selected = documents.find(item => item.id === selection?.recordId);
  return <LibraryShell page={shared ? "shared-documents" : "my-documents"} title={shared ? "سندهای اشتراکی" : "سندهای من"}>
    <div data-test-id="library-document-toolbar" ref={heading} tabIndex={-1} className="space-y-3">
      <nav data-test-id="library-folder-breadcrumb" aria-label="مسیر اسناد" className="flex flex-wrap items-center gap-1 text-xs">
        <Button data-test-id="library-folder-root" variant="plain" size="sm" onClick={() => setPath([])}>همه اسناد</Button>
        {path.map((id, i) => <Button data-test-id={`library-folder-ancestor-${id}`} key={id} variant="plain" size="sm" onClick={() => setPath(path.slice(0, i + 1))}>‹ {documents.find(item => item.id === id)?.title}</Button>)}
      </nav>
      <div data-test-id="library-document-controls" className="flex flex-wrap items-end gap-2">
        <div data-test-id="library-search-wrap" className="min-w-40 flex-1"><SearchField data-test-id="library-search" label={filters.searchMode === "content" ? "جستجو در محتوای سندها" : "جستجو در عنوان"} value={query} onValueChange={setQuery} /></div>
        <Button data-test-id="library-filter-open" variant="outline" size="sm" onClick={event => setModal({ kind: "filter", trigger: event.currentTarget })}><SlidersHorizontal aria-hidden="true" />فیلتر{active.length ? ` (${active.length})` : ""}</Button>
        <Button data-test-id="library-sort-open" variant="outline" size="sm" onClick={event => setModal({ kind: "sort", trigger: event.currentTarget })}><ArrowDownUp aria-hidden="true" />مرتب‌سازی</Button>
        {!shared && <GlassOptionsMenu testId="library-create-menu" title="ایجاد" description="در دسته‌بندی فعلی" trigger={<Button data-test-id="library-create-menu" size="sm"><Plus aria-hidden="true" />ایجاد</Button>} items={[{ id: "document", label: "سند" }, { id: "folder", label: "دسته‌بندی" }, { id: "template", label: "نمونه سند (تمپلت)" }]} onAction={(kind, _label, trigger) => setModal({ kind, trigger: trigger ?? null })} />}
      </div>
      <div data-test-id="library-applied-controls" className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span data-test-id="library-result-count" role="status">{visible.length} مورد</span>
        <span data-test-id="library-sort-summary">{sort.length ? sort.map((rule, i) => `${i + 1}. ${sortFields.find(field => field.value === rule.field)?.label} ${rule.direction === "asc" ? "↑" : "↓"}`).join(" · ") : "ترتیب اصلی"}</span>
        {active.map(([key, value]) => <Button data-test-id={`library-filter-chip-${key}`} key={key} variant="plain" size="sm" aria-label={`حذف فیلتر ${key}`} onClick={() => setFilters(current => ({ ...current, [key]: emptyFilters[key as keyof typeof emptyFilters] }))}>{{ kind: "نوع", contentType: "نوع محتوا", tags: "تگ‌ها", template: "نمونه سند", bookmarked: "نشان‌شده", searchMode: "جستجوی محتوا", scope: "همه دسته‌بندی‌ها" }[key]}{Array.isArray(value) ? `: ${value.join("، ")}` : typeof value === "string" && valueLabels[value] ? `: ${valueLabels[value]}` : ""}<X aria-hidden="true" /></Button>)}
        {(active.length > 0 || query) && <Button data-test-id="library-clear" variant="ghost" size="sm" onClick={() => { setFilters(emptyFilters); setQuery(""); }}>پاک‌کردن جستجو و فیلتر<X aria-hidden="true" /></Button>}
      </div>
    </div>
    <p data-test-id="library-document-status" role="status" className="sr-only">{message}</p>
    <div data-test-id="library-document-results" className="mt-3 flex h-[calc(100dvh-21rem)] min-h-80 flex-col">
      <DocumentList key={JSON.stringify([query, filters, sort, path])} documents={visible} onAction={setSelection} onFolder={id => { setPath(current => [...current, id]); setQuery(""); setFilters(current => ({ ...current, scope: "current" })); }} />
    </div>
    {modal?.kind === "filter" && <FilterDialog value={filters} onApply={setFilters} close={() => setModal(null)} trigger={modal.trigger} tags={[...new Set(documents.flatMap(item => item.tags))]} />}
    {modal?.kind === "sort" && <SortDialog value={sort} onApply={setSort} close={() => setModal(null)} trigger={modal.trigger} />}
    {modal && ["document", "folder", "template"].includes(modal.kind) && <CreationDialog kind={modal.kind as CreationKind} parentId={parentId} close={() => setModal(null)} trigger={modal.trigger} />}
    {selection && selected && <DocumentActionDialog key={`${selection.recordId}-${selection.id}`} document={selected} selection={selection} onChange={update => setDocuments(current => applyDocumentChange(current, selected.id, update))} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />}
  </LibraryShell>;
}
