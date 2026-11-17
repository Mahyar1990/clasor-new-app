"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { glass } from "@/lib/design-system/classes";
import { DocumentName, DocumentActions, DocumentChoice, type DocumentSelection, type DocumentAction } from "./document-controls";
import { outlineRows } from "./tree";
import { folderPath } from "./tree";
import type { DocumentPreview } from "../document-dialogs/model";
export function DocumentTree({ documents, matches, onAction, selection, parentId, filtered, editable, publicationControls }: { editable?: boolean; publicationControls?: boolean; documents: DocumentPreview[]; matches: DocumentPreview[]; onAction: DocumentAction; selection?: DocumentSelection; parentId?: string; filtered: boolean }) {
  const [expanded, setExpanded] = useState(() => new Set(filtered ? matches.flatMap(item => folderPath(documents, item.parentId)) : []));
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);
  const rows = outlineRows(documents, matches, expanded, parentId);
  const result = getLoadedItems(rows, count);
  return <><GlassScrollArea data-test-id="document-tree-scroll" label="نمایش درختی اسناد">
    <div data-test-id="document-tree" ref={listRef} className="space-y-0.5">
      {result.rows.map(({ document, depth, context }) => <div data-test-id={`document-tree-row-${document.id}`} data-load-more-item key={document.id} className={`${glass.tableRow} flex min-h-10 items-center gap-1 rounded-md pe-2`} style={{ paddingInlineStart: `${Math.min(depth, 8) * 16 + 4}px` }}>
        {selection && <DocumentChoice document={document} selection={selection} />}
        {document.kind === "folder" ? <Button data-test-id={`document-tree-toggle-${document.id}`} variant="plain" size="icon-sm" aria-expanded={expanded.has(document.id)} aria-label={`${expanded.has(document.id) ? "بستن" : "بازکردن"} ${document.title}`} onClick={() => { setExpanded(current => { const next = new Set(current); if (next.has(document.id)) next.delete(document.id); else next.add(document.id); return next; }); }}>{expanded.has(document.id) ? <ChevronDown aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}</Button> : <span data-test-id={`document-tree-indent-${document.id}`} className="w-8 shrink-0" />}
        <div data-test-id={`document-tree-label-${document.id}`} className="min-w-0 flex-1"><DocumentName document={document} onOpen={() => document.kind === "folder" ? setExpanded(current => { const next = new Set(current); if (next.has(document.id)) next.delete(document.id); else next.add(document.id); return next; }) : undefined} /></div>
        {context && <span data-test-id={`document-tree-context-${document.id}`} className="sr-only">دستهٔ حاوی نتیجهٔ جستجو</span>}
        <DocumentActions document={document} onAction={onAction} editable={editable} publicationControls={publicationControls} />
      </div>)}
      {!rows.length && <p data-test-id="document-tree-empty" className="p-6 text-center text-xs">سندی برای نمایش وجود ندارد.</p>}
    </div>
    <LoadMore noun="آیتم" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </GlassScrollArea></>;
}
