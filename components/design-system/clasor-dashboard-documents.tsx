"use client";

import { DashboardTabs } from "@/components/design-system/clasor-dashboard-tabs";
import { useRef, useState } from "react";
import { FileText, Ellipsis } from "lucide-react";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassCard } from "@/components/ui/GlassCard";
import { SolidDataTable } from "@/components/ui/SolidDataTable";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { documentOptions } from "@/components/design-system/clasor-document-options";
import { ClasorOptionPreview, type ClasorOptionSelection } from "@/components/design-system/clasor-option-preview";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import type { DashboardDocument } from "@/components/design-system/clasor-dashboard-data";

function DocumentList({ documents }: { documents: DashboardDocument[] }) {
  const [count, setCount] = useState(10);
  const [selection, setSelection] = useState<ClasorOptionSelection | null>(null);
  const [opened, setOpened] = useState<DashboardDocument | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(documents, count);
  return <>
    <GlassScrollArea data-test-id="dashboard-documents-scroll" label="فهرست سندها">
    <div data-test-id="dashboard-documents-list" ref={listRef} className="[&_table]:min-w-[24rem]">
      <SolidDataTable layout="fixed" appearance="glass" testId="dashboard-documents-table" hideCaption caption="فهرست سندها" rows={result.rows} getRowId={row => row.id} emptyMessage="سندی با این نام پیدا نشد." columns={[
        { id: "name", label: "نام سند", render: row => <Button data-test-id={`dashboard-document-open-${row.id}`} variant="ghost" className="h-auto min-h-11 px-2 md:min-h-7 max-w-full justify-start whitespace-normal text-start" onClick={() => setOpened(row)}><GlassEmblem data-test-id={`dashboard-document-icon-${row.id}`} className="size-6"><FileText aria-hidden="true" className="size-3.5" /></GlassEmblem>{row.title}</Button> },
        { id: "creator", label: "نام سازنده", kind: "metadata", render: row => row.creator },
        { id: "actions", label: "عملیات", kind: "actions", render: row => <div data-test-id={`dashboard-document-actions-${row.id}`} className="flex items-center justify-end">
          <GlassOptionsMenu testId={`dashboard-document-menu-${row.id}`} title={row.title} description={row.shared ? "گزینه‌های سند اشتراکی" : "گزینه‌های سند"} icon={<FileText />}
            trigger={<Button data-test-id={`dashboard-document-menu-${row.id}`} variant="glass" size="icon" aria-label={`عملیات ${row.title}`}><Ellipsis aria-hidden="true" /></Button>}
            items={documentOptions(row.shared)} onAction={(id, label) => setSelection({ id, label, name: row.title })} />
        </div> },
      ]} />
    </div>
    <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>
    <ClasorOptionPreview selection={selection} onClose={() => setSelection(null)} testId="dashboard-document-option-preview" />
    <GlassModal testId="dashboard-document-modal" open={!!opened} onOpenChange={open => { if (!open) setOpened(null); }} title={opened?.title ?? "مشاهده سند"} description="سند نمونه؛ بدون اتصال به حساب کلاسور">
      <p data-test-id="dashboard-document-modal-content" className="whitespace-pre-wrap text-sm leading-body">{opened?.content}</p>
    </GlassModal>
  </>;
}

export function ClasorDashboardDocuments({ documents }: { documents: DashboardDocument[] }) {
  return <GlassCard data-test-id="dashboard-documents-panel" className="flex h-[36rem] min-h-0 flex-col overflow-hidden p-3 xl:h-full" aria-labelledby="dashboard-documents-heading">
    <h3 data-test-id="dashboard-documents-heading" id="dashboard-documents-heading" className="mb-2 flex items-center gap-2 text-lg font-bold"><FileText aria-hidden="true" className="size-5 text-primary" />سندها</h3>
    <DashboardTabs label="نمایش سندها" defaultValue="mine" items={[
      { value: "mine", label: "سندهای من", content: <DocumentList key="mine" documents={documents.filter(item => !item.shared)} /> },
      { value: "shared", label: "سندهای اشتراکی", content: <DocumentList key="shared" documents={documents.filter(item => item.shared)} /> },
    ]} />
  </GlassCard>;
}
