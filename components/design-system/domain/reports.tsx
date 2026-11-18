"use client";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";
import { glass } from "@/lib/design-system/classes";
import { DomainCollection, useDomainQuery } from "./collection";
import { DomainPerson, DomainDate, useDomainRepositories, useRepositoryFilter } from "./shared";
import { reportLabels, type DomainReport } from "./model";
import { useDomain } from "./store";
import { matchesDomainQuery } from "./queries";
export function DomainReports() {
  const { state } = useDomain();
  const repositories = useDomainRepositories();
  const repositoryFilter = useRepositoryFilter();
  const [query, setQuery] = useDomainQuery();
  const [view, setView] = useState<{ item: DomainReport; trigger: HTMLElement } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const repoName = (id: string) => repositories.find(repo => repo.id === id)?.name ?? "مخزن در دسترس نیست";
  const items = state.reports.filter(item => matchesDomainQuery(query, [reportLabels[item.target], item.targetTitle, item.document, repoName(item.repositoryId), item.user.name, item.reason, item.body], { target: item.target, repositoryId: item.repositoryId, createdAt: item.createdAt, reason: item.reason }));
  return <div data-test-id="domain-reports-host" ref={root}>
    <DomainCollection testId="domain-reports" title="گزارش‌های تخلف" wide items={items} query={query} onQueryChange={setQuery} filters={[
      { id: "target", label: "نوع مورد گزارش‌شده", options: [{ value: "all", label: "همه موارد" }, ...Object.entries(reportLabels).map(([value, label]) => ({ value, label }))] }, repositoryFilter,
      { id: "reason", label: "علت گزارش", options: [{ value: "all", label: "همه علت‌ها" }, ...[...new Set(state.reports.map(item => item.reason))].map(value => ({ value, label: value }))] },
      { id: "fromDate", label: "از تاریخ", type: "date" }, { id: "toDate", label: "تا تاریخ", type: "date" },
    ]} columns={[
      { id: "target", label: "نوع", width: 88, render: row => <Badge data-test-id={`domain-report-type-${row.id}`} className={glass.statusInfo}>{reportLabels[row.target]}</Badge> },
      { id: "title", label: "مورد گزارش‌شده", render: row => <span data-test-id={`domain-report-target-${row.id}`} className="block leading-6">{row.targetTitle}</span> },
      { id: "context", label: "سند / مخزن", width: 166, render: row => <span data-test-id={`domain-report-context-${row.id}`} className="flex flex-col gap-1"><span data-test-id={`domain-report-document-${row.id}`}>{row.document ?? "—"}</span><span data-test-id={`domain-report-repository-${row.id}`} className="text-[10px] text-muted-foreground">{repoName(row.repositoryId)}</span></span> },
      { id: "user", label: "گزارش‌دهنده", width: 144, render: row => <DomainPerson user={row.user} /> },
      { id: "reason", label: "علت", width: 116, render: row => row.reason },
      { id: "date", label: "تاریخ ثبت", width: 124, render: row => <DomainDate value={row.createdAt} testId={`domain-report-date-${row.id}`} /> },
      { id: "actions", label: "عملیات", kind: "actions", width: 88, render: row => <Button data-test-id={`domain-report-open-${row.id}`} size="sm" variant="outline" onClick={event => setView({ item: row, trigger: event.currentTarget })}>مشاهده</Button> },
    ]} />
    {view && <GlassModal testId="domain-report-dialog" themeAnchorRef={root} title={`گزارش تخلف · ${reportLabels[view.item.target]}`} description={view.item.targetTitle} open compact surface="liquid" onOpenChange={open => { if (!open) setView(null); }} finalFocus={() => view.trigger.isConnected ? view.trigger : true}>
      <div data-test-id="domain-report-detail" className="space-y-3 text-xs leading-6"><DomainPerson user={view.item.user} /><p data-test-id="domain-report-detail-context">مخزن: {repoName(view.item.repositoryId)}{view.item.document ? ` · سند: ${view.item.document}` : ""}</p><p data-test-id="domain-report-detail-reason" className="font-semibold">{view.item.reason}</p><p data-test-id="domain-report-detail-body">{view.item.body}</p><DomainDate value={view.item.createdAt} testId="domain-report-detail-date" /></div>
    </GlassModal>}
  </div>;
}
