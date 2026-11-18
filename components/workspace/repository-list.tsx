"use client";

import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, Archive, Layers, Search, Star } from "lucide-react";
import { SearchField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { repositories, sampleUser } from "@/lib/workspace/fixtures";
import { useDocumentStore } from "@/components/workspace/document-store";
import { getLoadedItems, LIST_BATCH_SIZE, normalizeSearch } from "@/lib/workspace/documents";
import LoadMore from "@/components/workspace/load-more";
import { repositoryHref } from "@/lib/workspace/navigation";

const views = [{ id: "all", label: "همه" }, { id: "mine", label: "مخزن‌های من" }, { id: "shared", label: "اشتراکی" }, { id: "bookmarked", label: "نشان‌شده" }, { id: "archived", label: "بایگانی" }];
export default function RepositoryList() {
  const { documents: sampleDocuments } = useDocumentStore();
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(LIST_BATCH_SIZE);
  const listRef = useRef<HTMLDivElement>(null);
  const visible = repositories.filter(repository => normalizeSearch(repository.name).includes(normalizeSearch(query)) && (view === "archived" ? repository.archived : !repository.archived && (view === "mine" ? repository.ownerId === sampleUser.id : view === "shared" ? repository.ownerId !== sampleUser.id : view === "bookmarked" ? repository.bookmarked : true)));
  const result = getLoadedItems(visible, visibleCount);
  return <>
    <div data-test-id="repository-list-div-1" className="ws-pageHeading"><div data-test-id="repository-list-div-2"><p data-test-id="repository-list-p-3" className="ws-eyebrow">نظم مشترک</p><h1 data-test-id="repository-list-h1-4">مخزن‌ها</h1><p data-test-id="repository-list-p-5" className="ws-subtitle">هر پروژه، یک فضای مشخص برای نگهداری و همکاری.</p></div></div>
    <div data-test-id="repository-list-div-6" className={cn("ws-controls", glass.contentSurface)}><div data-test-id="repository-list-div-7" className="ws-searchRow"><div data-test-id="repository-list-div-8" className="ws-search"><SearchField data-test-id="repository-list-searchfield-9" label="جست‌وجوی مخزن" placeholder="نام مخزن را بنویسید…" value={query} onValueChange={value => { setQuery(value); setVisibleCount(LIST_BATCH_SIZE); }} /><Search size={19} aria-hidden="true" /></div></div></div>
    <div data-test-id="repository-list-div-10" className="ws-repositoryFilters" role="group" aria-label="فیلتر مخزن‌ها">{views.map(item => <Button data-test-id={`repository-list-button-11-${String(item.id)}`} key={item.id} size="sm" variant={item.id === view ? "secondary" : "ghost"} aria-pressed={item.id === view} onClick={() => { setView(item.id); setVisibleCount(LIST_BATCH_SIZE); }}>{item.label}</Button>)}</div>
    <p data-test-id="repository-list-p-12" className="ws-count" role="status">{new Intl.NumberFormat("fa").format(visible.length)} مخزن</p>
    <div data-test-id="repository-list-div-13" ref={listRef} className="ws-repositoryGrid">{result.rows.map(repository => <Link data-test-id={`repository-list-link-14-${String(repository.id)}`} data-load-more-item className={cn("ws-repositoryCard", glass.contentSurface)} key={repository.id} href={repositoryHref(repository.id)}><div data-test-id={`repository-list-div-15-${String(repository.id)}`} className="ws-repositoryCardTop"><span data-test-id={`repository-list-span-16-${String(repository.id)}`} className="ws-repoSymbol"><Layers size={25} aria-hidden="true" /></span><span data-test-id={`repository-list-span-17-${String(repository.id)}`}>{repository.archived ? <Archive size={17} aria-label="بایگانی" /> : repository.bookmarked ? <Star size={17} aria-label="نشان‌شده" /> : null}{repository.role}</span></div><h2 data-test-id={`repository-list-h2-18-${String(repository.id)}`}>{repository.name}</h2><p data-test-id={`repository-list-p-19-${String(repository.id)}`}>مالک: {repository.ownerName}</p><div data-test-id={`repository-list-div-20-${String(repository.id)}`} className="ws-repositoryCardBottom"><span data-test-id={`repository-list-span-21-${String(repository.id)}`}>{new Intl.NumberFormat("fa").format(sampleDocuments.filter(document => document.repositoryId === repository.id).length)} سند</span><ArrowLeft size={19} aria-hidden="true" /></div></Link>)}</div>
    <LoadMore key={JSON.stringify([view, query])} noun="مخزن" listRef={listRef} result={result} onLoadMore={() => setVisibleCount(result.nextCount)} />
    {!visible.length && <div data-test-id="repository-list-div-22" className={cn("ws-empty", glass.contentSurface)}><Layers size={32} aria-hidden="true" /><h2 data-test-id="repository-list-h2-23">مخزنی با این مشخصات پیدا نشد</h2><p data-test-id="repository-list-p-24">فیلتر یا عبارت جست‌وجو را تغییر دهید.</p><Button data-test-id="repository-list-button-25" variant="outline" onClick={() => { setView("all"); setQuery(""); setVisibleCount(LIST_BATCH_SIZE); }}>نمایش همه مخزن‌های فعال</Button></div>}
  </>;
}
