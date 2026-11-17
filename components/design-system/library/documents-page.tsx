"use client";
import { useId, useRef, useState } from "react";
import { Search, SlidersHorizontal, ArrowDownUp, Plus, X, List, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompactSearch } from "@/components/ui/CompactSearch";
import { BatchActions } from "@/components/ui/BatchActions";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { DocumentList } from "../clasor-dashboard-documents";
import { applyDocumentChange } from "./tree";
import { DocumentActionDialog } from "../document-dialogs/dialog";
import { useLibrary } from "./store";
import { LibraryShell } from "./shell";
import { FilterDialog, SortDialog } from "./filters";
import { CreationDialog, type CreationKind } from "./create";
import { defaultSort, emptyFilters, queryDocuments, sortFields } from "./query";
import { DocumentTree } from "./document-tree";
import { BulkDialog } from "./bulk-dialog";
import { changeSelection } from "./tree";
import { RepositoryHeader } from "./repository-header";
import type { DialogSelection } from "../repository-dialogs/dialog";
export function DocumentsPage({ shared = false, repositoryId }: { shared?: boolean; repositoryId?: string }) {
  const { repositories } = useLibrary();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const repo = repositories.find(item => item.id === repositoryId && !item.deleted && !item.left);
  return <LibraryShell titleRef={titleRef} page={repo ? repo.shared ? "shared-repositories" : "my-repositories" : shared ? "shared-documents" : "my-documents"} title={repositoryId ? repo?.name ?? "مخزن در دسترس نیست" : shared ? "سندهای اشتراکی" : "سندهای من"}>
    {repo && <RepositoryHeader repository={repo} fallbackFocusRef={titleRef} />}
    {(!repositoryId || repo) && <DocumentBrowser key={repositoryId ?? String(shared)} repositoryId={repositoryId} shared={repo?.shared ?? shared} writable={!repo?.archived} />}
    {repositoryId && !repo && <p data-test-id="repository-not-found" className="text-sm">مخزن حذف شده یا دیگر به آن دسترسی ندارید. از منوی کناری یک مخزن دیگر انتخاب کنید.</p>}
  </LibraryShell>;
}
export function DocumentBrowser({ shared, repositoryId, writable = true }: { shared: boolean; repositoryId?: string; writable?: boolean }) {
  const { documents, repositories, setDocuments } = useLibrary();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchPanelId = useId();
  const searchToggle = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [draftMode, setDraftMode] = useState("title");
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState(defaultSort);
  const [path, setPath] = useState<string[]>([]);
  const [view, setView] = useState("table");
  const [selecting, setSelecting] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [modal, setModal] = useState<{ kind: string; trigger: HTMLElement | null } | null>(null);
  const [selection, setSelection] = useState<(DialogSelection & { recordId: string }) | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLDivElement>(null);
  const parentId = path.at(-1);
  const creationRepositoryId = repositoryId ?? documents.find(item => item.id === parentId)?.repositoryId ?? "dashboard-repository-1";
  const canEdit = writable && (!shared || !!repositoryId);
  const canPublish = writable && (!shared || !!repositoryId && ["مالک", "مدیر"].includes(repositories.find(repo => repo.id === repositoryId)?.role ?? ""));
  const source = documents.filter(item => repositoryId ? item.repositoryId === repositoryId : item.shared === shared);
  const visible = queryDocuments(source, shared, parentId, query, view === "tree" ? { ...filters, scope: "all" } : filters, sort);
  const active = Object.entries(filters).filter(([key, value]) => key !== "searchMode" && JSON.stringify(value) !== JSON.stringify(emptyFilters[key as keyof typeof emptyFilters]));
  const chosen = ids.filter(id => source.some(item => item.id === id && !item.deleted));
  const selected = documents.find(item => item.id === selection?.recordId);
  const tags = [...new Set(repositories.filter(repo => repositoryId ? repo.id === repositoryId : repo.shared === shared).flatMap(repo => repo.tags ?? []))];
  const selectionProps = selecting ? { ids: chosen, onToggle: (id: string, checked: boolean) => { try { setIds(changeSelection(chosen, id, checked)); } catch (error) { setMessage(String(error)); } } } : undefined;
  const listKey = JSON.stringify([query, filters, sort, path]);
  function closeSearch() { setSearchOpen(false); setFilters(emptyFilters); setQuery(""); setDraftQuery(""); setDraftMode("title"); searchToggle.current?.focus(); }
  function created(kind: string, trigger?: HTMLElement | null) { setModal({ kind, trigger: trigger ?? null }); }
  return <>
    <div data-test-id="library-document-toolbar" ref={heading} tabIndex={-1} className="shrink-0 space-y-3">
      <div data-test-id="library-breadcrumb-actions" className="flex items-start justify-between gap-3">
        <nav data-test-id="library-folder-breadcrumb" aria-label="مسیر اسناد" className="flex flex-wrap items-center gap-1 text-xs">
          <Button data-test-id="library-folder-root" variant="plain" size="sm" onClick={() => setPath([])}>همه اسناد</Button>
          {path.map((id, i) => <Button data-test-id={`library-folder-ancestor-${id}`} key={id} variant="plain" size="sm" onClick={() => setPath(path.slice(0, i + 1))}>‹ {documents.find(item => item.id === id)?.title}</Button>)}
        </nav>
        {writable && (!shared || repositoryId) && <GlassOptionsMenu testId="library-create-menu" title="ایجاد" description="در دسته‌بندی فعلی" trigger={<Button data-test-id="library-create-menu" size="sm"><Plus aria-hidden="true" />ایجاد</Button>} items={[{ id: "document", label: "سند" }, { id: "folder", label: "دسته‌بندی" }, { id: "template", label: "نمونه سند (تمپلت)" }]} onAction={(kind, _label, trigger) => created(kind, trigger)} />}
      </div>
      <div data-test-id="library-document-actions" className="flex flex-wrap items-center gap-2 border-t border-white/25 pt-2">
        <Button ref={searchToggle} data-test-id="library-search-toggle" variant="outline" size="sm" aria-controls={searchPanelId} aria-expanded={searchOpen} onClick={() => { if (searchOpen) closeSearch(); else setSearchOpen(true); }}><Search aria-hidden="true" />جستجو و فیلتر</Button>
        {canEdit && <BatchActions active={selecting} count={chosen.length} onActiveChange={active => { setSelecting(active); if (!active) setIds([]); }} onMove={trigger => created("bulk-move", trigger)} onDelete={trigger => created("bulk-delete", trigger)} />}
        <div data-test-id="document-view-switch" role="group" aria-label="نمایش اسناد" className="ms-auto flex gap-1"><Button data-test-id="document-view-table" variant={view === "table" ? "outline" : "plain"} size="sm" aria-pressed={view === "table"} onClick={() => setView("table")}><List aria-hidden="true" />جدولی</Button><Button data-test-id="document-view-tree" variant={view === "tree" ? "outline" : "plain"} size="sm" aria-pressed={view === "tree"} onClick={() => setView("tree")}><Network aria-hidden="true" />درختی</Button></div>
      </div>
      <div data-test-id="library-applied-controls" className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span data-test-id="library-result-count" role="status">{visible.length} مورد{query ? ` · ${filters.searchMode === "content" ? "محتوا" : "نام"}: ${query}` : ""}</span>
        <span data-test-id="library-sort-summary">{sort.length ? sort.map((rule, i) => `${i + 1}. ${sortFields.find(field => field.value === rule.field)?.label} ${rule.direction === "asc" ? "↑" : "↓"}`).join(" · ") : "ترتیب اصلی"}</span>
        {active.map(([key, value]) => <Button data-test-id={`library-filter-chip-${key}`} key={key} variant="plain" size="sm" aria-label={`حذف فیلتر ${key}`} onClick={() => setFilters(current => ({ ...current, [key]: emptyFilters[key as keyof typeof emptyFilters] }))}>{{ kind: "نوع", contentType: "نوع محتوا", tags: "تگ‌ها", template: "نمونه سند", bookmarked: "نشان‌شده", scope: "همه دسته‌بندی‌ها" }[key]}{Array.isArray(value) ? `: ${value.join("، ")}` : typeof value === "string" ? `: ${{ document: "سند", folder: "دسته‌بندی", classic: "کلاسور", excel: "اکسل", file: "فایل", form: "فرم" }[value] ?? "همه"}` : ""}<X aria-hidden="true" /></Button>)}
        {(active.length > 0 || query) && <Button data-test-id="library-clear" variant="ghost" size="sm" onClick={() => { setFilters(emptyFilters); setQuery(""); setDraftQuery(""); setDraftMode("title"); }}>پاک‌کردن جستجو و فیلتر<X aria-hidden="true" /></Button>}
      </div>
    </div>
    <p data-test-id="library-document-status" role="status" className="sr-only">{message}</p>
    <div data-test-id="library-document-results" className="mt-3 flex h-[calc(100dvh-24rem)] min-h-80 flex-col xl:h-auto xl:min-h-0 xl:flex-1">
      {searchOpen && <section data-test-id="library-search-panel" id={searchPanelId} aria-label="جستجو و فیلتر اسناد" className="mb-2 flex shrink-0 flex-wrap items-center gap-2">
        <div data-test-id="library-document-controls" className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <CompactSearch autoFocus testId="library-search" label="جستجوی سند" value={draftQuery} onValueChange={setDraftQuery} mode={draftMode} onModeChange={setDraftMode} onApply={() => { setQuery(draftQuery); setFilters(current => ({ ...current, searchMode: draftMode })); }} />
          <div data-test-id="library-search-actions" className="flex items-center gap-1.5">
            <Button data-test-id="library-filter-open" variant="outline" size="sm" onClick={event => created("filter", event.currentTarget)}><SlidersHorizontal aria-hidden="true" />فیلتر{active.length ? ` (${active.length})` : ""}</Button>
            <Button data-test-id="library-sort-open" variant="outline" size="sm" onClick={event => created("sort", event.currentTarget)}><ArrowDownUp aria-hidden="true" />مرتب‌سازی</Button>
            <Button data-test-id="library-search-close" variant="ghost" size="icon-sm" aria-label="بستن و پاک‌کردن جستجو و فیلتر" onClick={closeSearch}><X aria-hidden="true" /></Button>
          </div>
        </div>
      </section>}
      {view === "table" ? <DocumentList key={listKey} documents={visible} editable={canEdit} publicationControls={canPublish} selection={selectionProps} onAction={setSelection} onFolder={id => { setPath(current => [...current, id]); setQuery(""); setDraftQuery(""); setFilters(current => ({ ...current, scope: "current" })); }} /> : <DocumentTree key={listKey} documents={source} editable={canEdit} publicationControls={canPublish} matches={visible} onAction={setSelection} selection={selectionProps} parentId={filters.scope === "all" ? undefined : parentId} filtered={!!query || !!active.length} />}
    </div>
    {modal?.kind === "filter" && <FilterDialog value={filters} onApply={setFilters} close={() => setModal(null)} trigger={modal.trigger} tags={tags} />}
    {modal?.kind === "sort" && <SortDialog value={sort} onApply={setSort} close={() => setModal(null)} trigger={modal.trigger} />}
    {modal && ["document", "folder", "template"].includes(modal.kind) && <CreationDialog kind={modal.kind as CreationKind} repositoryId={creationRepositoryId} parentId={parentId} close={() => setModal(null)} trigger={modal.trigger} />}
    {modal?.kind.startsWith("bulk-") && <BulkDialog ids={chosen} action={modal.kind === "bulk-move" ? "move" : "delete"} trigger={modal.trigger} close={() => setModal(null)} fallback={() => heading.current} done={() => { setIds([]); setSelecting(false); setModal(null); setMessage("عملیات گروهی انجام شد."); }} />}
    {selection && selected && <DocumentActionDialog key={`${selection.recordId}-${selection.id}`} document={selected} selection={selection} onChange={update => setDocuments(current => applyDocumentChange(current, selected.id, update))} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />}
  </>;
}
