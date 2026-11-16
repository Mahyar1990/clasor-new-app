"use client";

import { useRef, useState } from "react";
import { FileText, Ellipsis, Bookmark, FolderOpen } from "lucide-react";
import { DashboardTabs } from "./clasor-dashboard-tabs";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassCard } from "@/components/ui/GlassCard";
import { SolidDataTable } from "@/components/ui/SolidDataTable";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { documentOptions } from "./clasor-document-options";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { applyDocumentChange } from "./library/tree";
import { DocumentActionDialog } from "./document-dialogs/dialog";
import { useLibrary } from "./library/store";
import { type DocumentPreview } from "./document-dialogs/model";
import type { DialogSelection } from "./repository-dialogs/dialog";

type Selection = DialogSelection & { recordId: string };
export function DocumentList({ documents, onAction, onFolder }: { onFolder?: (id: string) => void; documents: DocumentPreview[]; onAction: (selection: Selection) => void }) {
  const [count, setCount] = useState(10);
  const [opened, setOpened] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const result = getLoadedItems(documents, count);
  const selected = documents.find(item => item.id === opened);
  return <>
    <GlassScrollArea data-test-id="dashboard-documents-scroll" label="فهرست سندها">
      <div data-test-id="dashboard-documents-list" ref={listRef} className="[&_table]:min-w-[24rem]">
        <SolidDataTable layout="fixed" appearance="glass" testId="dashboard-documents-table" hideCaption caption="فهرست سندها" rows={result.rows} getRowId={row => row.id} emptyMessage="سندی برای نمایش وجود ندارد." columns={[
          { id: "name", label: "نام سند", render: row => <Button data-test-id={`dashboard-document-open-${row.id}`} variant="plain" className="h-auto min-h-11 max-w-full justify-start whitespace-normal px-2 text-start md:min-h-7" onClick={() => row.kind === "folder" && onFolder ? onFolder(row.id) : setOpened(row.id)}><GlassEmblem data-test-id={`dashboard-document-icon-${row.id}`} className="size-6">{row.kind === "folder" ? <FolderOpen aria-hidden="true" className="size-3.5" /> : <FileText aria-hidden="true" className="size-3.5" />}</GlassEmblem><span data-test-id={`dashboard-document-title-${row.id}`} className="wrap-anywhere">{row.title}</span>{row.bookmarked && <Bookmark data-test-id={`dashboard-document-bookmarked-${row.id}`} aria-label="نشان‌شده" className="size-3" />}</Button> },
          { id: "creator", label: "نام سازنده", kind: "metadata", render: row => row.creator },
          { id: "actions", label: "عملیات", kind: "actions", render: row => <div data-test-id={`dashboard-document-actions-${row.id}`} className="flex items-center justify-end">
            <GlassOptionsMenu testId={`dashboard-document-menu-${row.id}`} title={row.title} description={row.shared ? "گزینه‌های سند اشتراکی" : "گزینه‌های سند"} icon={<FileText />} triggerRef={node => { if (node) triggers.current.set(row.id, node); else triggers.current.delete(row.id); }}
              trigger={<Button data-test-id={`dashboard-document-menu-${row.id}`} variant="glass" size="icon" aria-label={`عملیات ${row.title}`}><Ellipsis aria-hidden="true" /></Button>}
              items={row.kind === "folder" ? [{ id: "edit-document", label: "ویرایش دسته‌بندی" }, { id: "delete", label: "حذف دسته‌بندی", destructive: true }] : documentOptions(row.shared, { bookmarked: row.bookmarked })} onAction={(id, label) => onAction({ recordId: row.id, id, label, trigger: triggers.current.get(row.id) ?? null })} />
          </div> },
        ]} />
      </div>
      <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>
    <GlassModal testId="dashboard-document-modal" open={!!selected} onOpenChange={open => { if (!open) setOpened(null); }} title={selected?.title ?? "مشاهده سند"} description="سند نمونه؛ بدون اتصال به حساب کلاسور">
      <p data-test-id="dashboard-document-body" className="whitespace-pre-wrap text-sm leading-body">{selected?.content}</p>
    </GlassModal>
  </>;
}

export function ClasorDashboardDocuments() {
  const { documents, setDocuments } = useLibrary();
  const records = Object.fromEntries(documents.map(item => [item.id, item]));

  const [selection, setSelection] = useState<Selection | null>(null);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const visible = documents.map(item => records[item.id]).filter(item => !item.deleted && (item.kind ?? "document") === "document");
  return <GlassCard data-test-id="dashboard-documents-panel" className="flex h-[36rem] min-h-0 flex-col overflow-hidden p-3 xl:h-full" aria-labelledby="dashboard-documents-heading">
    <h3 ref={heading} tabIndex={-1} data-test-id="dashboard-documents-heading" id="dashboard-documents-heading" className="mb-2 flex items-center gap-2 text-lg font-bold"><FileText aria-hidden="true" className="size-5 text-primary" />سندها</h3>
    <p data-test-id="dashboard-document-action-status" role="status" className="sr-only">{message}</p>
    <DashboardTabs label="نمایش سندها" defaultValue="mine" items={[
      { value: "mine", label: "سندهای من", content: <DocumentList key="mine" documents={visible.filter(item => !item.shared)} onAction={setSelection} /> },
      { value: "shared", label: "سندهای اشتراکی", content: <DocumentList key="shared" documents={visible.filter(item => item.shared)} onAction={setSelection} /> },
    ]} />
    {selection && <DocumentActionDialog key={`${selection.recordId}-${selection.id}`} document={records[selection.recordId]} selection={selection} onChange={update => setDocuments(current => applyDocumentChange(current, selection.recordId, update))} close={() => setSelection(null)} announce={setMessage} fallbackFocusRef={heading} />}
  </GlassCard>;
}
