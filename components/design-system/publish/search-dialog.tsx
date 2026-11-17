"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Search, FileText } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "../preview-list";
import { useLibrary } from "../library/store";
import { publicationHref } from "./publication-state";
import { emptyPublishSearch, publishedSearchRecords, searchPublishedDocuments, type PublishSearch } from "./search-state";
export function PublishSearchDialog({ trigger, close }: { trigger: HTMLElement; close: () => void }) {
  const anchor = useRef(trigger);
  const { documents, repositories } = useLibrary();
  const records = publishedSearchRecords(documents, repositories);
  const tags = [...new Set(records.flatMap(item => item.document.tags))];
  const [draft, setDraft] = useState(emptyPublishSearch);
  const [applied, setApplied] = useState<PublishSearch | null>(null);
  const results = applied ? searchPublishedDocuments(records, applied) : [];
  function set<K extends keyof PublishSearch>(key: K, value: PublishSearch[K]) { setDraft(current => ({ ...current, [key]: value })); }
  function form(advanced: boolean) {
    return <form data-test-id={advanced ? "publish-search-advanced-form" : "publish-search-content-form"} className="space-y-3" onSubmit={event => { event.preventDefault(); setApplied({ ...draft }); }}>
      {advanced ? <><div data-test-id="publish-search-sort-field" className="max-w-48"><SelectField data-test-id="publish-search-sort" label="مرتب‌سازی" value={draft.sort} onValueChange={value => set("sort", value)} options={[{ value: "createdAt", label: "تاریخ ایجاد" }, { value: "updatedAt", label: "تاریخ ویرایش" }, { value: "title", label: "عنوان" }]} /></div><div data-test-id="publish-search-fields" className="grid items-end gap-2 sm:grid-cols-3"><TextField data-test-id="publish-search-title" label="عنوان" value={draft.title} onValueChange={value => set("title", value)} /><TextField data-test-id="publish-search-creator" label="نام سازنده" placeholder="نام کاربری" value={draft.creator} onValueChange={value => set("creator", value)} /><SelectField data-test-id="publish-search-tag" label="انتخاب تگ" value={draft.tag} onValueChange={value => set("tag", value)} options={[{ value: "", label: "همهٔ تگ‌ها" }, ...tags.map(tag => ({ value: tag, label: tag }))]} /></div></> : <TextField data-test-id="publish-search-content" label="متن جستجو" type="search" value={draft.text} onValueChange={value => set("text", value)} placeholder="جستجو در محتوای تمام اسناد داکس" />}
      <Button data-test-id="publish-search-submit" type="submit" size="sm" disabled={!advanced && !draft.text.trim()}><Search aria-hidden="true" />جستجو</Button>
    </form>;
  }
  return <GlassModal testId="publish-search-dialog" title="جستجو" description="جستجو در اسناد منتشرشدهٔ داکس" open onOpenChange={open => { if (!open) close(); }} themeAnchorRef={anchor} finalFocus={() => trigger.isConnected ? trigger : true} compact surface="liquid" size="lg">
    <ClasorTabs label="نوع جستجو" value={draft.mode} onValueChange={value => { set("mode", value as PublishSearch["mode"]); setApplied(null); }} testIds={{ tab: value => `publish-search-tab-${value}`, panel: value => `publish-search-panel-${value}` }} items={[{ value: "content", label: "جستجو در محتوا", content: form(false) }, { value: "advanced", label: "جستجوی پیشرفته", content: form(true) }]} />
    {applied && <section data-test-id="publish-search-results" className="mt-2 space-y-2 border-t border-white/30 pt-3"><p data-test-id="publish-search-result-count" role="status" className="text-[11px] text-muted-foreground">{new Intl.NumberFormat("fa").format(results.length)} سند پیدا شد</p><PreviewList key={JSON.stringify(applied)} items={results} noun="سند" testId="publish-search-result-list" render={({ document, repository, version }) => <Link data-test-id={`publish-search-result-${document.id}`} href={publicationHref(repository.id, document.id)} onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) close(); }} className={`${glass.navigation} block space-y-1 px-2 py-2`}><span data-test-id={`publish-search-result-title-${document.id}`} className="flex items-center gap-2 text-xs font-medium"><FileText aria-hidden="true" className="size-3.5 shrink-0" />{document.title}</span><span data-test-id={`publish-search-result-meta-${document.id}`} className="block text-[10px] text-muted-foreground">{repository.name} · {document.creator}</span><span data-test-id={`publish-search-result-excerpt-${document.id}`} className="line-clamp-2 block text-[11px] leading-5 text-muted-foreground">{version.content.replace(/^#{1,6}\s/gm, "").slice(0, 200)}</span></Link>} /></section>}
  </GlassModal>;
}
