"use client";
import { OptionsButton } from "@/components/ui/OptionsButton";
import { useRef } from "react";
import { FileText, FolderOpen, Bookmark } from "lucide-react";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { documentOptions } from "../clasor-document-options";
import type { DocumentPreview } from "../document-dialogs/model";
import type { DialogSelection } from "../repository-dialogs/dialog";
export interface DocumentSelection { ids: string[]; onToggle: (id: string, checked: boolean) => void }
export type DocumentAction = (selection: DialogSelection & { recordId: string }) => void;
export function DocumentChoice({ document, selection }: { document: DocumentPreview; selection: DocumentSelection }) {
  const checked = selection.ids.includes(document.id);
  return <Checkbox data-test-id={`document-select-${document.id}`} aria-label={`انتخاب ${document.title}`} checked={checked} disabled={!checked && selection.ids.length >= 10} onCheckedChange={checked => selection.onToggle(document.id, !!checked)} />;
}
export function DocumentName({ document, onOpen }: { document: DocumentPreview; onOpen: () => void }) {
  return <button data-test-id={`dashboard-document-open-${document.id}`} type="button" className="flex min-h-9 max-w-full items-center gap-2 rounded-md px-2 text-start text-xs focus-visible:outline-2 focus-visible:outline-ring md:min-h-7" onClick={onOpen}>
    <GlassEmblem data-test-id={`dashboard-document-icon-${document.id}`} className="size-6 shrink-0">{document.kind === "folder" ? <FolderOpen aria-hidden="true" className="size-3.5" /> : <FileText aria-hidden="true" className="size-3.5" />}</GlassEmblem>
    <span data-test-id={`dashboard-document-title-${document.id}`} className="wrap-anywhere">{document.title}</span>{document.bookmarked && <Bookmark data-test-id={`dashboard-document-bookmarked-${document.id}`} aria-label="نشان‌شده" className="size-3 shrink-0" />}
  </button>;
}
export function DocumentActions({ document, onAction, editable, publicationControls = false }: { document: DocumentPreview; onAction: DocumentAction; editable?: boolean; publicationControls?: boolean }) {
  const trigger = useRef<HTMLButtonElement>(null);
  return <GlassOptionsMenu testId={`dashboard-document-menu-${document.id}`} title={document.title} description={document.kind === "folder" ? "گزینه‌های دسته‌بندی" : "گزینه‌های سند"} icon={document.kind === "folder" ? <FolderOpen /> : <FileText />} triggerRef={node => { trigger.current = node; }}
    trigger={<OptionsButton data-test-id={`dashboard-document-menu-${document.id}`} aria-label={`عملیات ${document.title}`} />}
    items={document.kind === "folder" ? [{ id: "edit-document", label: "ویرایش دسته‌بندی" }, { id: "move", label: "انتقال دسته‌بندی" }, { id: "delete", label: "حذف دسته‌بندی", destructive: true }] : documentOptions(editable === undefined ? document.shared : !editable, { bookmarked: document.bookmarked, publicationControls })} onAction={(id, label) => onAction({ recordId: document.id, id, label, trigger: trigger.current })} />;
}
