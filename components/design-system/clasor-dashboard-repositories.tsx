"use client";

import { useRef, useState } from "react";
import { FolderOpen, Ellipsis, Clock3, Bookmark } from "lucide-react";
import { DashboardTabs } from "./clasor-dashboard-tabs";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { Button } from "@/components/ui/button";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassCard } from "@/components/ui/GlassCard";
import { glass } from "@/lib/design-system/classes";
import { formatDocumentDate, getLoadedItems } from "@/lib/workspace/documents";
import LoadMore from "@/components/workspace/load-more";
import { repositoryActionItems } from "./repository-dialogs/options";
import { initialRepository, RepositoryPreviewProvider, type RepositoryPreview, type PreviewRole } from "./repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "./repository-dialogs/dialog";
import type { DashboardRepository } from "./clasor-dashboard-data";

type Selection = DialogSelection & { recordId: string };
type RepositoryRow = DashboardRepository & { preview: RepositoryPreview };
function RepositoryList({ repositories, onAction }: { repositories: RepositoryRow[]; onAction: (selection: Selection) => void }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const result = getLoadedItems(repositories, count);
  return <GlassScrollArea data-test-id="dashboard-repositories-scroll" label="فهرست مخزن‌ها">
    <div data-test-id="dashboard-repositories-grid" ref={listRef} className="grid grid-cols-1 gap-2">
      {result.rows.map(repository => <GlassCard as="div" key={repository.id} data-test-id={`dashboard-repository-card-${repository.id}`} data-load-more-item className="flex w-full min-w-0 items-center gap-2 pe-4">
        <button data-test-id={`dashboard-repository-${repository.id}`} onClick={event => onAction({ recordId: repository.id, id: "info", label: "اطلاعات مخزن", trigger: event.currentTarget })} className={`${glass.interaction} flex min-w-0 flex-1 items-center gap-2 rounded-lg py-2.5 ps-4 pe-2 text-start hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring`}>
          <GlassEmblem data-test-id={`dashboard-repository-icon-${repository.id}`} className="size-8"><FolderOpen aria-hidden="true" className={`size-5 ${repository.preview.image === "blue" ? "text-blue-500" : repository.preview.image === "green" ? "text-green-500" : "text-primary"}`} /></GlassEmblem>
          <span data-test-id={`dashboard-repository-top-${repository.id}`} className="min-w-0 flex-1 space-y-1">
            <span data-test-id={`dashboard-repository-name-${repository.id}`} className="block wrap-anywhere text-sm font-bold">{repository.name}</span>
            <span data-test-id={`dashboard-repository-footer-${repository.id}`} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-muted-foreground">
              <span data-test-id={`dashboard-repository-date-${repository.id}`} className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" className="size-2.5" />{formatDocumentDate(repository.updatedAt)}</span>
              <span data-test-id={`dashboard-repository-role-${repository.id}`}>{repository.role}</span>
              <span data-test-id={`dashboard-repository-status-${repository.id}`} className="text-success">فعال</span>
              {repository.preview.bookmarked && <Bookmark data-test-id={`dashboard-repository-bookmarked-${repository.id}`} aria-label="نشان‌شده" className="size-3 text-primary" />}
            </span>
          </span>
        </button>
        <GlassOptionsMenu testId={`dashboard-repository-action-${repository.id}`} title={repository.name} description={`گزینه‌های مخزن · ${repository.role}`} icon={<FolderOpen />} triggerRef={node => { if (node) triggers.current.set(repository.id, node); else triggers.current.delete(repository.id); }}
          trigger={<Button data-test-id={`dashboard-repository-action-${repository.id}`} variant="glass" size="icon" aria-label={`عملیات مخزن ${repository.name}`}><Ellipsis aria-hidden="true" /></Button>}
          items={repositoryActionItems(repository.preview)}
          onAction={(id, label) => onAction({ recordId: repository.id, id, label, trigger: triggers.current.get(repository.id) ?? null })} />
      </GlassCard>)}
    </div>
    {!repositories.length && <p data-test-id="dashboard-repositories-empty" className="py-8 text-center text-sm text-muted-foreground">مخزنی برای نمایش وجود ندارد.</p>}
    <LoadMore noun="مخزن" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </GlassScrollArea>;
}

export function ClasorDashboardRepositories({ repositories }: { repositories: DashboardRepository[] }) {
  const [records, setRecords] = useState<Record<string, RepositoryPreview>>(() => Object.fromEntries(repositories.map(item => [item.id, { ...initialRepository(), id: item.id, name: item.name, role: item.role as PreviewRole, published: item.published }])));
  const [selection, setSelection] = useState<Selection | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const visible = repositories.filter(item => !records[item.id].deleted && !records[item.id].archived && !records[item.id].left).map(item => ({ ...item, name: records[item.id].name, role: records[item.id].role, published: records[item.id].published, preview: records[item.id] }));
  return <GlassCard data-test-id="dashboard-repositories-panel" className="flex h-[36rem] min-h-0 flex-col overflow-hidden p-3 xl:h-full" aria-labelledby="dashboard-repositories-heading">
    <h3 ref={heading} tabIndex={-1} data-test-id="dashboard-repositories-heading" id="dashboard-repositories-heading" className="mb-2 flex items-center gap-2 text-lg font-bold"><FolderOpen aria-hidden="true" className="size-5 text-primary" />مخزن‌ها</h3>
    <p data-test-id="dashboard-repository-action-status" role="status" className="sr-only">{message}</p>
    <DashboardTabs label="نمایش مخزن‌ها" defaultValue="all" items={[
      { value: "all", label: "همه‌ی مخزن‌ها", content: <RepositoryList key="all" repositories={visible} onAction={setSelection} /> },
      { value: "mine", label: "مخزن‌های من", content: <RepositoryList key="mine" repositories={visible.filter(item => !item.shared)} onAction={setSelection} /> },
      { value: "shared", label: "مخزن‌های اشتراکی", content: <RepositoryList key="shared" repositories={visible.filter(item => item.shared)} onAction={setSelection} /> },
    ]} />
    {selection && <RepositoryPreviewProvider key={selection.recordId} value={records[selection.recordId]} onChange={update => setRecords(current => ({ ...current, [selection.recordId]: typeof update === "function" ? update(current[selection.recordId]) : update }))}>
      <RepositoryActionDialog key={selection.id} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />
    </RepositoryPreviewProvider>}
  </GlassCard>;
}
