"use client";

import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { DashboardTabs } from "./clasor-dashboard-tabs";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { GlassCard } from "@/components/ui/GlassCard";
import { SolidDataTable } from "@/components/ui/SolidDataTable";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { applyDocumentChange } from "./library/tree";
import { DocumentActionDialog } from "./document-dialogs/dialog";
import { useLibrary } from "./library/store";
import { type DocumentPreview } from "./document-dialogs/model";
import type { DialogSelection } from "./repository-dialogs/dialog";

import { DocumentName, DocumentActions, DocumentChoice, type DocumentSelection } from "./library/document-controls";

type Selection = DialogSelection & { recordId: string };
export function DocumentList({ documents, onAction, onFolder, selection, editable, publicationControls }: { editable?: boolean; publicationControls?: boolean; selection?: DocumentSelection; onFolder?: (id: string) => void; documents: DocumentPreview[]; onAction: (selection: Selection) => void }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(documents, count);
  return <>
    <GlassScrollArea data-test-id="dashboard-documents-scroll" label="فهرست سندها">
      <div data-test-id="dashboard-documents-list" ref={listRef} className="[&_table]:min-w-[24rem]">
        <SolidDataTable layout="fixed" appearance="glass" testId="dashboard-documents-table" hideCaption caption="فهرست سندها" rows={result.rows} getRowId={row => row.id} emptyMessage="سندی برای نمایش وجود ندارد." columns={[

          { id: "name", label: "نام سند", render: row => <div data-test-id={`document-name-cell-${row.id}`} className="flex min-w-0 items-center gap-1">{selection && <DocumentChoice document={row} selection={selection} />}<DocumentName document={row} onOpen={() => row.kind === "folder" && onFolder?.(row.id)} /></div> },
          { id: "creator", label: "نام سازنده", kind: "metadata", render: row => row.creator },
          { id: "actions", label: "عملیات", kind: "actions", render: row => <DocumentActions document={row} onAction={onAction} editable={editable} publicationControls={publicationControls} /> },
        ]} />
      </div>
      <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </GlassScrollArea>

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
