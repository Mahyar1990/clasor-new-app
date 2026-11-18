"use client";
import { useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { ReviewActions } from "@/components/ui/ReviewActions";
import { Button } from "@/components/ui/button";
import { DomainCollection, useDomainQuery } from "./collection";
import { DomainPerson, DomainDate, useDomainRepositories, useRepositoryFilter } from "./shared";
import { useDomain } from "./store";
import { matchesDomainQuery } from "./queries";
import { decisionOptions, type DomainReview } from "./model";
export function DomainModeration({ kind }: { kind: "comment" | "question" }) {
  const { state, setState } = useDomain();
  const repositories = useDomainRepositories();
  const repositoryFilter = useRepositoryFilter();
  const [query, setQuery] = useDomainQuery([{ id: "status", label: "وضعیت", options: decisionOptions, initial: "pending" }]);
  const [view, setView] = useState<{ item: DomainReview; trigger: HTMLElement } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const noun = kind === "comment" ? "نظر" : "سوال";
  const repoName = (id: string) => repositories.find(repo => repo.id === id)?.name ?? "مخزن در دسترس نیست";
  const items = state.reviews.filter(item => item.kind === kind && matchesDomainQuery(query, [item.user.name, item.user.username, item.document, repoName(item.repositoryId), item.body, item.createdAt], { status: item.status, repositoryId: item.repositoryId, createdAt: item.createdAt }));
  const currentView = view && state.reviews.find(item => item.id === view.item.id);
  function decide(id: string, status: "approved" | "rejected") {
    if (!view) heading.current?.focus({ preventScroll: true });
    setState(current => ({ ...current, reviews: current.reviews.map(item => item.id === id && item.status === "pending" ? { ...item, status } : item) }));
  }
  return <div data-test-id={`domain-${kind}-host`} ref={root} tabIndex={-1}>
    <DomainCollection testId={`domain-${kind}`} title={kind === "comment" ? "نظرات اسناد" : "سوالات اسناد"} wide headingRef={heading} query={query} onQueryChange={setQuery} items={items} filters={[repositoryFilter, { id: "status", label: "وضعیت", options: decisionOptions }, { id: "fromDate", label: "از تاریخ", type: "date" }, { id: "toDate", label: "تا تاریخ", type: "date" }]} columns={[
      { id: "body", label: `متن ${noun}`, render: row => <Button data-test-id={`domain-review-open-${row.id}`} variant="plain" className="h-auto max-w-full whitespace-normal px-0 text-start text-xs leading-6" onClick={event => setView({ item: row, trigger: event.currentTarget })}>{row.body}</Button> },
      { id: "document", label: "نام سند / مخزن", width: 200, render: row => <span data-test-id={`domain-review-location-${row.id}`} className="flex flex-col gap-1"><span data-test-id={`domain-review-document-${row.id}`}>{row.document}</span><span data-test-id={`domain-review-repository-${row.id}`} className="text-[10px] text-muted-foreground">{repoName(row.repositoryId)}</span></span> },
      { id: "user", label: "ثبت‌کننده", width: 150, render: row => <DomainPerson user={row.user} /> },
      { id: "date", label: "تاریخ ثبت", width: 128, render: row => <DomainDate value={row.createdAt} testId={`domain-review-date-${row.id}`} /> },
      { id: "actions", label: "عملیات", kind: "actions", width: 156, render: row => <ReviewActions testId={`domain-review-actions-${row.id}`} status={row.status} label={`${noun} ${row.user.name}`} onDecision={status => decide(row.id, status)} /> },
    ]} />
    {view && currentView && <GlassModal testId="domain-review-dialog" themeAnchorRef={root} title={`بررسی ${noun}`} description={`${view.item.document} · ${repoName(view.item.repositoryId)}`} open compact surface="liquid" onOpenChange={open => { if (!open) setView(null); }} finalFocus={() => view.trigger.isConnected ? view.trigger : heading.current ?? true} footer={<ReviewActions testId="domain-review-dialog-actions" status={currentView.status} label={`${noun} ${currentView.user.name}`} onDecision={status => decide(currentView.id, status)} />}>
      <div data-test-id="domain-review-detail-meta" className="mb-3 flex flex-wrap justify-between gap-2"><DomainPerson user={view.item.user} /><DomainDate value={view.item.createdAt} testId="domain-review-detail-date" /></div><p data-test-id="domain-review-detail-body" className="whitespace-pre-wrap text-xs leading-7">{view.item.body}</p>
    </GlassModal>}
  </div>;
}
