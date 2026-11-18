"use client";
import { useRef, useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { ReviewActions } from "@/components/ui/ReviewActions";
import { Button } from "@/components/ui/button";
import { DomainCollection, DomainTools, useDomainQuery } from "./collection";
import { DomainPerson, useDomainRepositories, useRepositoryFilter } from "./shared";
import { NewsletterRepositoryCards } from "./repository-cards";
import { DomainNewsList } from "./news-list";
import { NewsForm } from "./news-form";
import { matchesDomainQuery } from "./queries";
import { useDomain } from "./store";
import { decisionOptions } from "./model";
function NewsRequests() {
  const { state, setState } = useDomain();
  const repositories = useDomainRepositories();
  const repositoryFilter = useRepositoryFilter();
  const [query, setQuery] = useDomainQuery([{ id: "status", label: "وضعیت", options: decisionOptions, initial: "pending" }]);
  const ref = useRef<HTMLDivElement>(null);
  const repoName = (id: string) => repositories.find(repo => repo.id === id)?.name ?? "مخزن در دسترس نیست";
  const items = state.requests.filter(item => matchesDomainQuery(query, [item.user.name, item.user.username, repoName(item.repositoryId)], { status: item.status, repositoryId: item.repositoryId }));
  return <div data-test-id="domain-news-requests-host" ref={ref} tabIndex={-1}><DomainCollection testId="domain-news-requests" title="درخواست‌های مشاهده خبرنامه خصوصی" items={items} query={query} onQueryChange={setQuery} filters={[repositoryFilter, { id: "status", label: "وضعیت", options: decisionOptions }]} columns={[
    { id: "user", label: "درخواست‌دهنده", render: row => <DomainPerson user={row.user} /> },
    { id: "repository", label: "نام مخزن", render: row => repoName(row.repositoryId) },
    { id: "actions", label: "عملیات", kind: "actions", width: 156, render: row => <ReviewActions testId={`domain-request-${row.id}`} status={row.status} label={`درخواست ${row.user.name}`} onDecision={status => { ref.current?.focus({ preventScroll: true }); setState(current => ({ ...current, requests: current.requests.map(item => item.id === row.id && item.status === "pending" ? { ...item, status } : item) })); }} /> },
  ]} /></div>;
}
function PrivateRepositories() {
  const { state } = useDomain();
  const repos = useDomainRepositories();
  const [selected, setSelected] = useState<string | null>(null);
  const [create, setCreate] = useState<HTMLElement | null>(null);
  const [query, setQuery] = useDomainQuery();
  const count = (id: string) => state.news.filter(item => item.repositoryId === id).length;
  const items = repos.filter(repo => matchesDomainQuery(query, [repo.name, repo.creator], { news: count(repo.id) ? "with" : "without" }));
  const root = useRef<HTMLDivElement>(null);
  const selectedRepo = repos.find(repo => repo.id === selected);
  return <div data-test-id="domain-private-repositories-host" ref={root} tabIndex={-1} className="space-y-3">
    {selectedRepo ? <>
      <nav data-test-id="domain-private-breadcrumb" aria-label="مسیر خبرنامه خصوصی" className="flex items-center gap-1 text-xs"><Button data-test-id="domain-private-back" variant="ghost" size="sm" onClick={() => { setSelected(null); root.current?.focus(); }}>مخزن‌ها</Button><ChevronLeft aria-hidden="true" className="size-3" /><span data-test-id="domain-private-current" aria-current="page" className="font-semibold">{selectedRepo.name}</span></nav>
      <DomainNewsList key={selectedRepo.id} privateNews repositoryId={selectedRepo.id} />
    </> : <section data-test-id="domain-private-repositories" className="space-y-3">
      <div data-test-id="domain-private-repositories-heading" className="flex items-center justify-between gap-2"><h2 data-test-id="domain-private-repositories-title" className="text-sm font-bold">مخزن‌های خبرنامه خصوصی</h2><Button data-test-id="domain-create-private-news" size="sm" onClick={event => setCreate(event.currentTarget)}><Plus aria-hidden="true" className="size-3!" />ایجاد خبرنامه</Button></div>
      <DomainTools testId="domain-private-repositories" query={query} onChange={setQuery} count={items.length} filters={[{ id: "news", label: "خبرنامه", options: [{ value: "all", label: "همه مخزن‌ها" }, { value: "with", label: "دارای خبرنامه" }, { value: "without", label: "بدون خبرنامه" }] }]} />
      <NewsletterRepositoryCards key={JSON.stringify(query)} repositories={items.map(repo => ({ ...repo, newsCount: count(repo.id) }))} onOpen={id => { setSelected(id); root.current?.focus(); }} onCreate={id => { setSelected(id); setCreate(root.current); }} />
    </section>}
    {create && <NewsForm privateNews repositoryId={selected ?? undefined} trigger={create} anchorRef={root} close={() => setCreate(null)} />}
  </div>;
}
export function DomainPrivateNews() {
  return <ClasorTabs label="بخش‌های خبرنامه خصوصی" defaultValue="requests" testIds={{ tab: value => `domain-private-tab-${value}` }} items={[{ value: "requests", label: "درخواست‌ها", content: <NewsRequests /> }, { value: "repositories", label: "خبرنامه مخزن‌ها", content: <PrivateRepositories /> }]} />;
}
