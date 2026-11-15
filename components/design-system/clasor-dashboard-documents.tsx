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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import type { DashboardDocument } from "@/components/design-system/clasor-dashboard-data";

function DocumentList({ documents }: { documents: DashboardDocument[] }) {
  const [count, setCount] = useState(10);
  const [opened, setOpened] = useState<DashboardDocument | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(documents, count);
  return <>
    <GlassScrollArea data-test-id="dashboard-documents-scroll" label="فهرست سندها">
    <div data-test-id="dashboard-documents-list" ref={listRef} className="[&_table]:min-w-[24rem] [&_th]:px-3 [&_td]:px-3 [&_th:last-child]:px-1 [&_td:last-child]:px-1 [&_th:last-child]:text-end">
      <SolidDataTable layout="fixed" appearance="glass" testId="dashboard-documents-table" caption="آخرین سندها" rows={result.rows} getRowId={row => row.id} emptyMessage="سندی با این نام پیدا نشد." columns={[
        { id: "name", label: "نام دسته", render: row => <Button data-test-id={`dashboard-document-open-${row.id}`} variant="ghost" className="h-auto min-h-11 px-2 md:min-h-7 max-w-full justify-start whitespace-normal text-start" onClick={() => setOpened(row)}><GlassEmblem data-test-id={`dashboard-document-icon-${row.id}`} className="size-6"><FileText aria-hidden="true" className="size-3.5" /></GlassEmblem>{row.title}</Button> },
        { id: "creator", label: "نام سازنده", width: 112, render: row => row.creator },
        { id: "actions", label: "عملیات", width: 52, render: row => <div data-test-id={`dashboard-document-actions-${row.id}`} className="flex items-center justify-end">
          <DropdownMenu><DropdownMenuTrigger data-test-id={`dashboard-document-menu-${row.id}`} render={<Button data-test-id={`dashboard-document-menu-${row.id}`} variant="glass" size="icon" aria-label={`عملیات ${row.title}`} />}><Ellipsis aria-hidden="true" /></DropdownMenuTrigger>
            <DropdownMenuContent dir="rtl"><DropdownMenuItem data-test-id={`dashboard-document-details-${row.id}`} onClick={() => setOpened(row)}>مشاهده جزئیات</DropdownMenuItem></DropdownMenuContent>
          </DropdownMenu>
        </div> },
      ]} />
    </div>
    <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>
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
