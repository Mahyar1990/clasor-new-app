"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CompactSearch } from "@/components/ui/CompactSearch";
import { RepositoryImage } from "@/components/ui/RepositoryImage";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { glass } from "@/lib/design-system/classes";
import { useLibrary, type LibraryRepository } from "../library/store";
import { normalized } from "../library/query";
import { PublishShell } from "./shell";
import { publicationHref } from "./publication-state";
function PublishedRepositories({ repositories }: { repositories: LibraryRepository[] }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(repositories, count);
  return <GlassScrollArea data-test-id="publish-repositories-scroll" label="مخزن‌های منتشرشده" contentClassName={glass.boundedScrollContent}>
    <div data-test-id="publish-repository-grid" ref={listRef} className={glass.repositoryGrid}>
      {result.rows.map(item => <Link data-load-more-item data-test-id={`publish-repository-${item.id}`} key={item.id} href={publicationHref(item.id)} className={`${glass.repositoryTile} flex min-h-36 items-center gap-4 p-4 focus-visible:outline-2 focus-visible:outline-ring`}>
        <RepositoryImage testId={`publish-cover-${item.id}`} image={item.image} name={item.name} className="size-20 shrink-0" />
        <div data-test-id={`publish-copy-${item.id}`} className="min-w-0 flex-1 space-y-2"><h2 data-test-id={`publish-name-${item.id}`} className="text-sm font-semibold wrap-anywhere">{item.name}</h2><p data-test-id={`publish-description-${item.id}`} className="line-clamp-2 text-[11px] leading-5 text-muted-foreground">{item.description}</p><span data-test-id={`publish-enter-${item.id}`} className="flex items-center gap-1 text-[10px] text-primary">مشاهدهٔ مستندات<ArrowLeft aria-hidden="true" className="size-3" /></span></div>
      </Link>)}
    </div>
    {!repositories.length && <p data-test-id="publish-home-empty" className="py-12 text-center text-sm text-muted-foreground">مخزن منتشرشده‌ای پیدا نشد.</p>}
    <LoadMore noun="مخزن" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </GlassScrollArea>;
}
export function PublishHome() {
  const { repositories } = useLibrary();
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const visible = repositories.filter(item => item.published && !item.deleted && !item.archived && !item.left && normalized(`${item.name} ${item.description}`).includes(normalized(query)));
  return <PublishShell><main data-test-id="publish-home-main" id="publish-main" tabIndex={-1} className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-7 px-1 pb-6 sm:px-4">
    <section data-test-id="publish-hero" className="flex flex-col items-center gap-3 py-8 text-center sm:py-12"><span data-test-id="publish-eyebrow" className="text-xs text-primary">مستندات منتشرشده</span><h1 data-test-id="publish-home-title" className="text-3xl font-bold sm:text-4xl">داکس</h1><p data-test-id="publish-home-description" className="text-sm text-muted-foreground">سیستم مدیریت اسناد</p><div data-test-id="publish-home-search-region" className="mt-3 w-full max-w-xs"><CompactSearch testId="publish-search" label="جستجوی مخزن" value={draft} onValueChange={setDraft} onApply={() => setQuery(draft)} /></div></section>
    <div data-test-id="publish-results-heading" className="flex items-center justify-between gap-2"><h2 data-test-id="publish-results-title" className="text-sm font-semibold">مخزن‌ها</h2><span data-test-id="publish-results-count" role="status" className="text-[10px] text-muted-foreground">{new Intl.NumberFormat("fa").format(visible.length)} مخزن</span></div>
    <div data-test-id="publish-results" className="flex min-h-64 flex-1 flex-col"><PublishedRepositories key={query} repositories={visible} /></div>
  </main><footer data-test-id="publish-home-footer" className="py-3 text-center text-[10px] text-muted-foreground">قدرت‌گرفته از کلاسور</footer></PublishShell>;
}
