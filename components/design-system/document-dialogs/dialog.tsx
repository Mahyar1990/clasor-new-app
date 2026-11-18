"use client";

import { useId, useRef, type RefObject } from "react";
import { FileText } from "lucide-react";
import { NavigableGlassModal } from "@/components/ui/DialogNavigation";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { Button } from "@/components/ui/button";
import { CopyField } from "@/components/ui/CopyField";
import { readerFolderPath, type ReaderFolder } from "../reader/reader-path";
import { DocumentPreviewProvider, useDocumentPreview, type DocumentSetter } from "./context";
import { DocumentEdit } from "./edit";
import { PanelAccess } from "./panel-access";
import { useOptionalLibrary } from "../library/store";
import { initialRepository, type RepositoryPreview } from "../repository-dialogs/context";
import { DocumentAccess } from "./access";
import { DocumentConfirm, DocumentPublication } from "./publication";
import { DocumentVersions } from "./versions";
import { DocumentActivities } from "./activity";
import type { DocumentPreview } from "./model";
import type { DialogSelection } from "../repository-dialogs/dialog";

function Content({ selection, close, announce, fallbackFocusRef }: { selection: DialogSelection; close: () => void; announce: (message: string) => void; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const { document } = useDocumentPreview();
  const formId = useId();
  const action = selection.id;
  const focusFallback = useRef(false);
  const edits = ["edit-content", "edit-document", "tags", "move"];
  const confirms = ["bookmark", "delete", "publish-version", "hide", "delete-password", "delete-link"];
  const publications = ["audience", "password", "publish-link"];
  const hasForm = [...edits, ...confirms, ...publications].includes(action);
  const destructive = ["delete", "delete-link", "delete-password"].includes(action);
  const labels: Record<string, string> = { delete: "حذف سند نمونه", bookmark: document.bookmarked ? "برداشتن نشان" : "نشان کردن", "publish-version": "عمومی‌سازی نسخه نمونه", hide: document.hidden ? "نمایش در انتشار" : "مخفی‌سازی", "delete-link": "حذف لینک نمونه", "delete-password": "حذف رمز نمونه" };
  function done() { focusFallback.current = ["delete", "delete-link", "delete-password"].includes(action); announce(`${selection.label} برای «${document.title}» در پیش‌نمایش اعمال شد.`); close(); }
  return <NavigableGlassModal testId={`document-dialog-${action}`} open onOpenChange={open => { if (!open) close(); }} title={selection.label} description={document.title} compact surface="liquid" size={action === "edit-content" ? "viewport" : ["versions", "questions", "comments", "edit-content"].includes(action) ? "lg" : confirms.includes(action) ? "sm" : "md"}
    finalFocus={() => focusFallback.current && fallbackFocusRef?.current ? fallbackFocusRef.current : selection.trigger?.isConnected ? selection.trigger : fallbackFocusRef?.current ?? true}
    icon={<GlassEmblem data-test-id="document-dialog-icon" className="size-8"><FileText aria-hidden="true" className="size-4" /></GlassEmblem>}
    footer={<><Button data-test-id="document-dialog-cancel" variant="outline" onClick={close}>{hasForm ? "انصراف" : "بستن"}</Button>{hasForm && <Button data-test-id="document-dialog-submit" type="submit" form={formId} variant={destructive ? "destructive" : "default"}>{labels[action] ?? "ذخیره تغییرات"}</Button>}</>}>
    {edits.includes(action) && <DocumentEdit action={action} formId={formId} done={done} />}
    {confirms.includes(action) && <DocumentConfirm action={action} formId={formId} done={done} />}
    {publications.includes(action) && <DocumentPublication action={action} formId={formId} done={done} />}
    {action === "direct-access" && <DocumentAccess />}
    {action === "panel-access" && <PanelAccess />}
    {action === "versions" && <DocumentVersions />}
    {(action === "questions" || action === "comments") && <DocumentActivities kind={action} />}
    {action === "publish-link" && !document.publishLink && <p data-test-id="doc-link-local-only" className="mt-3 text-xs text-muted-foreground">لینک به دادهٔ واقعی متصل نیست.</p>}
    {action === "view-link" && <CopyField testId="doc-share-link" label="لینک انتشار نمونه" value={document.publishLink} />}
  </NavigableGlassModal>;
}
export function DocumentActionDialog({ document, onChange, repository, folders, onCommit, ...props }: { folders?: ReaderFolder[]; onCommit?: (next: DocumentPreview) => boolean; document: DocumentPreview; repository?: RepositoryPreview; onChange: DocumentSetter; selection: DialogSelection; close: () => void; announce: (message: string) => void; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const library = useOptionalLibrary();
  const repo = repository ?? library?.repositories.find(item => item.id === document.repositoryId) ?? (!library ? initialRepository() : undefined);
  return <DocumentPreviewProvider folders={folders ?? readerFolderPath(document, library?.documents ?? [])} onCommit={onCommit} repository={repo} document={document} setDocument={onChange}><Content {...props} /></DocumentPreviewProvider>;
}
