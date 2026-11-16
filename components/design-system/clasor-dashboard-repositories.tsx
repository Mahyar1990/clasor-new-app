"use client";

import { useRef, useState } from "react";
import { FolderOpen, Ellipsis, Bookmark } from "lucide-react";
import { DashboardTabs } from "./clasor-dashboard-tabs";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDocumentDate, getLoadedItems } from "@/lib/workspace/documents";
import LoadMore from "@/components/workspace/load-more";
import { repositoryActionItems } from "./repository-dialogs/options";
import { updateRepositoryRecords } from "./library/repository-state";
import { useLibrary } from "./library/store";
import { RepositorySkeletons } from "./library/repository-skeletons";
import { GlassTile } from "@/components/ui/GlassTile";
import { RepositoryPreviewProvider, type RepositoryPreview } from "./repository-dialogs/context";
import { RepositoryActionDialog, type DialogSelection } from "./repository-dialogs/dialog";
import type { DashboardRepository } from "./clasor-dashboard-data";

type Selection = DialogSelection & { recordId: string };
export type RepositoryRow = DashboardRepository & { preview: RepositoryPreview };
export function RepositoryList({ repositories, onAction }: { repositories: RepositoryRow[]; onAction: (selection: Selection) => void }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const result = getLoadedItems(repositories, count);
  return <GlassScrollArea data-test-id="dashboard-repositories-scroll" label="فهرست مخزن‌ها">
    <div data-test-id="dashboard-repositories-grid" ref={listRef} className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
      {result.rows.map(repository => <div data-test-id={`repository-tile-wrap-${repository.id}`} data-load-more-item key={repository.id}>
        <GlassTile testId={`dashboard-repository-card-${repository.id}`} title={repository.name} icon={<FolderOpen />} onOpen={trigger => onAction({ recordId: repository.id, id: "info", label: "اطلاعات مخزن", trigger })} metadata={<><span data-test-id={`dashboard-repository-role-${repository.id}`}>{repository.role}</span><span data-test-id={`dashboard-repository-date-${repository.id}`}>{formatDocumentDate(repository.updatedAt)}</span>{repository.preview.bookmarked && <Bookmark data-test-id={`dashboard-repository-bookmarked-${repository.id}`} aria-label="نشان‌شده" className="size-3 text-primary" />}</>} actions={
        <GlassOptionsMenu testId={`dashboard-repository-action-${repository.id}`} title={repository.name} description={`گزینه‌های مخزن · ${repository.role}`} icon={<FolderOpen />} triggerRef={node => { if (node) triggers.current.set(repository.id, node); else triggers.current.delete(repository.id); }}
          trigger={<Button data-test-id={`dashboard-repository-action-${repository.id}`} variant="glass" size="icon" aria-label={`عملیات مخزن ${repository.name}`}><Ellipsis aria-hidden="true" /></Button>}
          items={repositoryActionItems(repository.preview)}
          onAction={(id, label) => onAction({ recordId: repository.id, id, label, trigger: triggers.current.get(repository.id) ?? null })} />} />
      </div>)}
    </div>
    {!repositories.length && <p data-test-id="dashboard-repositories-empty" className="py-8 text-center text-sm text-muted-foreground">مخزنی برای نمایش وجود ندارد.</p>}
    <LoadMore skeleton={<RepositorySkeletons />} noun="مخزن" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </GlassScrollArea>;
}

export function ClasorDashboardRepositories() {
  const { repositories, setRepositories } = useLibrary();
  const records = Object.fromEntries(repositories.map(item => [item.id, item]));

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
    {selection && <RepositoryPreviewProvider key={selection.recordId} value={records[selection.recordId]} onChange={update => setRepositories(current => updateRepositoryRecords(current, selection.recordId, update))}>
      <RepositoryActionDialog key={selection.id} selection={selection} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />
    </RepositoryPreviewProvider>}
  </GlassCard>;
}
