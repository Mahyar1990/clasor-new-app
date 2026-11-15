"use client";

import { DashboardTabs } from "@/components/design-system/clasor-dashboard-tabs";
import { useRef, useState } from "react";
import { FolderOpen, Ellipsis, Clock3 } from "lucide-react";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassModal } from "@/components/ui/GlassModal";
import { glass } from "@/lib/design-system/classes";
import { formatDocumentDate, getLoadedItems } from "@/lib/workspace/documents";
import LoadMore from "@/components/workspace/load-more";
import type { DashboardRepository } from "@/components/design-system/clasor-dashboard-data";

function RepositoryList({ repositories }: { repositories: DashboardRepository[] }) {
  const [count, setCount] = useState(10);
  const [opened, setOpened] = useState<DashboardRepository | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(repositories, count);
  return <>
    <GlassScrollArea data-test-id="dashboard-repositories-scroll" label="فهرست مخزن‌ها">
    <div data-test-id="dashboard-repositories-grid" ref={listRef} className="grid grid-cols-1 gap-2">
      {result.rows.map(repository => <button key={repository.id} data-test-id={`dashboard-repository-${repository.id}`} data-load-more-item onClick={() => setOpened(repository)} className={`${glass.nativeButton} flex w-full min-w-0 items-center gap-2 px-4 py-2.5 text-start`}>
        <GlassEmblem data-test-id={`dashboard-repository-icon-${repository.id}`} className="size-8"><FolderOpen aria-hidden="true" className="size-5" /></GlassEmblem>
        <span data-test-id={`dashboard-repository-top-${repository.id}`} className="min-w-0 flex-1 space-y-1">
          <span data-test-id={`dashboard-repository-name-${repository.id}`} className="block break-words text-sm font-bold">{repository.name}</span>
          <span data-test-id={`dashboard-repository-footer-${repository.id}`} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-muted-foreground">
            <span data-test-id={`dashboard-repository-date-${repository.id}`} className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" className="size-2.5" />{formatDocumentDate(repository.updatedAt)}</span>
            <span data-test-id={`dashboard-repository-role-${repository.id}`}>{repository.role}</span>
            <span data-test-id={`dashboard-repository-status-${repository.id}`} className="text-success">فعال</span>
          </span>
        </span>
        <GlassEmblem data-test-id={`dashboard-repository-action-${repository.id}`} className="size-7"><Ellipsis aria-hidden="true" className="size-4" /></GlassEmblem>
      </button>)}
    </div>
    {!repositories.length && <p data-test-id="dashboard-repositories-empty" className="py-8 text-center text-sm text-muted-foreground">مخزنی با این نام پیدا نشد.</p>}
    <LoadMore noun="مخزن" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>
    <GlassModal testId="dashboard-repository-modal" open={!!opened} onOpenChange={open => { if (!open) setOpened(null); }} title={opened?.name ?? "مشاهده مخزن"} description="جزئیات مخزن ساختگی در پیش‌نمایش">
      <p data-test-id="dashboard-repository-description" className="text-sm leading-body">نقش شما: {opened?.role} · وضعیت: فعال. محتوای این مخزن در نمونه‌های بعدی طراحی می‌شود.</p>
    </GlassModal>
  </>;
}

export function ClasorDashboardRepositories({ repositories }: { repositories: DashboardRepository[] }) {
  return <GlassCard data-test-id="dashboard-repositories-panel" className="flex h-[36rem] min-h-0 flex-col overflow-hidden p-3 xl:h-full" aria-labelledby="dashboard-repositories-heading">
    <h3 data-test-id="dashboard-repositories-heading" id="dashboard-repositories-heading" className="mb-2 flex items-center gap-2 text-lg font-bold"><FolderOpen aria-hidden="true" className="size-5 text-primary" />مخزن‌ها</h3>
    <DashboardTabs label="نمایش مخزن‌ها" defaultValue="all" items={[
      { value: "all", label: "همه‌ی مخزن‌ها", content: <RepositoryList key="all" repositories={repositories} /> },
      { value: "mine", label: "مخزن‌های من", content: <RepositoryList key="mine" repositories={repositories.filter(item => !item.shared)} /> },
      { value: "shared", label: "مخزن‌های اشتراکی", content: <RepositoryList key="shared" repositories={repositories.filter(item => item.shared)} /> },
    ]} />
  </GlassCard>;
}
