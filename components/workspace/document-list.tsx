"use client";

import { FileImage, FileText, Info } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/ui/icon-button";
import { ApprovalBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDocumentDate, kindLabels } from "@/lib/workspace/documents";
import { folders, repositories } from "@/lib/workspace/fixtures";
import type { IDocument } from "@/interface/document";

export function DocumentSymbol({ kind }: { kind: IDocument["kind"] }) {
  const Icon = kind === "image" ? FileImage : FileText;
  return <span data-test-id="document-list-span-1" className="ws-fileSymbol" data-kind={kind}><Icon size={21} aria-hidden="true" /><span data-test-id="document-list-span-2">{kindLabels[kind]}</span></span>;
}

export default function DocumentList({ rows, selectedIds, onSelectionChange, onOpen, documentHref, selectionScopeId, shared = false }: {
  rows: IDocument[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onOpen: (document: IDocument, trigger: HTMLButtonElement) => void;
  documentHref: (document: IDocument) => string;
  shared?: boolean;
  selectionScopeId: string;
}) {
  const mobileSelectId = useId();
  function toggle(documentId: string, checked: boolean) {
    onSelectionChange(checked ? [...new Set([...selectedIds, documentId])] : selectedIds.filter(id => id !== documentId));
  }
  const location = (document: IDocument) => shared ? `${document.share?.by.name} · دسترسی ${document.share?.access}` : document.folderId ? folders.find(folder => folder.id === document.folderId)?.name : repositories.find(repository => repository.id === document.repositoryId)?.name;
  const name = (document: IDocument) => <Link data-test-id="document-list-link-3" data-load-more-item className="ws-documentName" href={documentHref(document)}><DocumentSymbol kind={document.kind} /><span data-test-id="document-list-span-4"><strong data-test-id="document-list-strong-5">{document.title}</strong><span data-test-id="document-list-span-6">{kindLabels[document.kind]}<i data-test-id="document-list-i-7">·</i>{location(document)}</span></span></Link>;
  const info = (document: IDocument) => <IconButton data-test-id="document-list-iconbutton-8" variant="ghost" aria-label={`اطلاعات ${document.title}`} onClick={event => onOpen(document, event.currentTarget)}><Info size={19} aria-hidden="true" /></IconButton>;

  return <>
    <div data-test-id="document-list-div-9" className="ws-desktopList"><Table aria-describedby={selectionScopeId} containerProps={{ className: "ws-tableContainer" }}>
      <TableCaption className="sr-only">فهرست اسناد؛ انتخاب همه فقط در موارد نمایش‌داده‌شده</TableCaption>
      <TableHeader><TableRow>
        <TableHead scope="col" className="ws-selectionCell"><Checkbox data-test-id="document-list-checkbox-10" aria-label="انتخاب همه اسناد نمایش‌داده‌شده" checked={rows.length > 0 && selectedIds.length === rows.length} indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length} onCheckedChange={checked => onSelectionChange(checked ? rows.map(document => document.id) : [])} /></TableHead>
        <TableHead scope="col">نام سند</TableHead><TableHead scope="col">وضعیت محتوا</TableHead><TableHead scope="col">آخرین تغییر</TableHead><TableHead scope="col" className="ws-infoCell"><span data-test-id="document-list-span-11" className="sr-only">اطلاعات</span></TableHead>
      </TableRow></TableHeader><TableBody>{rows.map(document => <TableRow key={document.id} data-state={selectedIds.includes(document.id) ? "selected" : undefined}>
        <TableCell className="ws-selectionCell"><Checkbox data-test-id={`document-list-checkbox-12-${String(document.id)}`} aria-label={`انتخاب ${document.title}`} checked={selectedIds.includes(document.id)} onCheckedChange={checked => toggle(document.id, checked)} /></TableCell>
        <TableCell className="ws-nameCell">{name(document)}</TableCell><TableCell><ApprovalBadge status={document.approval} /></TableCell><TableCell className="ws-dateCell"><time data-test-id={`document-list-time-13-${String(document.id)}`} dateTime={document.updatedAt}>{formatDocumentDate(document.updatedAt)}</time></TableCell><TableCell className="ws-infoCell">{info(document)}</TableCell>
      </TableRow>)}</TableBody>
    </Table></div>
    <div data-test-id="document-list-div-14" className="ws-mobileList"><div data-test-id="document-list-div-15" className="ws-mobileSelect"><Checkbox data-test-id="document-list-checkbox-16" id={mobileSelectId} aria-label="انتخاب همه اسناد نمایش‌داده‌شده" checked={rows.length > 0 && selectedIds.length === rows.length} indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length} onCheckedChange={checked => onSelectionChange(checked ? rows.map(document => document.id) : [])} /><label data-test-id="document-list-label-17" htmlFor={mobileSelectId}>انتخاب همه موارد نمایان</label></div>
      <ul data-test-id="document-list-ul-18" aria-label="فهرست اسناد">{rows.map(document => <li data-test-id={`document-list-li-19-${String(document.id)}`} key={document.id} data-selected={selectedIds.includes(document.id)}><div data-test-id={`document-list-div-20-${String(document.id)}`} className="ws-cardMain"><Checkbox data-test-id={`document-list-checkbox-21-${String(document.id)}`} aria-label={`انتخاب ${document.title}`} checked={selectedIds.includes(document.id)} onCheckedChange={checked => toggle(document.id, checked)} />{name(document)}{info(document)}</div><div data-test-id={`document-list-div-22-${String(document.id)}`} className="ws-cardMeta"><ApprovalBadge status={document.approval} /><time data-test-id={`document-list-time-23-${String(document.id)}`} dateTime={document.updatedAt}>{formatDocumentDate(document.updatedAt)}</time></div></li>)}</ul>
    </div>
  </>;
}
