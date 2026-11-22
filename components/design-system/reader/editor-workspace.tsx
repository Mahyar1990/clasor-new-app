"use client";
import { useRef, useState } from "react";
import { PanelRight } from "lucide-react";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { readerBreadcrumbs, type ReaderFolder } from "./reader-path";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { EditorWithContents } from "@/components/ui/EditorWithContents";
import { DocumentEditorToolbar } from "@/components/ui/DocumentEditorToolbar";
import { DocumentFlags } from "@/components/ui/DocumentFlags";
import { DocumentActionDialog } from "../document-dialogs/dialog";
import { DocumentPreviewProvider, type DocumentSetter } from "../document-dialogs/context";
import type { DocumentPreview } from "../document-dialogs/model";
import type { RepositoryPreview } from "../repository-dialogs/context";
import type { DialogSelection } from "../repository-dialogs/dialog";
import { documentFlags } from "../library/document-state";
import { useEditorSession } from "./use-editor-session";
import { versionActions } from "./editor-state";
import { useDecisionHost, type DecisionHost } from "./workspace-decisions";
import { ReaderDrawer } from "./reader-drawer";
export function EditorWorkspace({ document, repository, onChange, onCommit, folders = [], initialVersionId, initialEditing, embedded = false, onEscape, onVersions, decisionHost }: { initialVersionId?: string; initialEditing?: boolean; embedded?: boolean; onEscape?: () => void; onVersions?: (trigger: HTMLElement) => void; decisionHost?: DecisionHost; folders?: ReaderFolder[]; onCommit?: (next: DocumentPreview) => boolean; document: DocumentPreview; repository?: RepositoryPreview; onChange: DocumentSetter }) {
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [printRequest, setPrintRequest] = useState(0);
  const [approval, setApproval] = useState<"confirm" | "confirm-public" | "publish" | null>(null);
  const editor = useEditorSession(document, onChange, onCommit, { initialVersionId, initialEditing, pauseAutosave: approval !== null });
  const Root = embedded ? "section" : "main";
  const Title = embedded ? "h4" : "h1";
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const toolsAnchor = useRef<HTMLDivElement>(null);
  const navigationFocus = useRef("reader-mode");
  const canEdit = !document.shared || ["مالک", "مدیر", "ویرایشگر"].includes(repository?.role ?? "");
  const actions = versionActions(editor.version, canEdit);
  const approvalTitle = approval === "publish" ? "عمومی‌سازی نسخه" : approval === "confirm-public" ? "تأیید و عمومی‌سازی" : "تأیید پیش‌نویس";
  const approvalDescription = approval === "publish" ? "نسخهٔ تأییدشده عمومی می‌شود؛ پیش‌نویس مستقل آن حفظ می‌شود." : "محتوای پیش‌نویس جایگزین نسخهٔ تأییدشدهٔ هم‌شماره می‌شود." + (approval === "confirm-public" ? " نسخه برای نمایش عمومی نیز علامت می‌خورد." : "");
  function confirmApproval() { const result = approval === "publish" ? editor.publish() : editor.approve(approval === "confirm-public"); if (result) setApproval(null); return result; }
  useDecisionHost(decisionHost, editor.pending, { title: "تغییرات ذخیره نشده", origin: () => anchor.current?.querySelector<HTMLElement>(`[data-test-id="${navigationFocus.current}"]`) ?? null, description: "پیش از تغییر حالت یا نسخه، دربارهٔ تغییرات تصمیم بگیرید.", commit: () => editor.leave(true), cancel: () => editor.setPending(null), discard: () => { editor.leave(false); }, confirmLabel: "ذخیره و ادامه" });
  useDecisionHost(decisionHost, approval, { title: approvalTitle, origin: () => anchor.current?.querySelector<HTMLElement>('[data-test-id="reader-actions"]') ?? null, description: `${editor.version?.name ?? ""} · ${approvalDescription}`, commit: confirmApproval, cancel: () => setApproval(null), confirmLabel: "تأیید" });
  function download() {
    if (editor.capabilities.pdf) { setPrintRequest(current => current + 1); setNotice("برای دریافت PDF، در پنجرهٔ چاپ گزینهٔ ذخیره به‌صورت PDF را انتخاب کنید."); return; }
    const url = URL.createObjectURL(new Blob([editor.version?.content ?? document.content], { type: "text/plain;charset=utf-8" }));
    const link = window.document.createElement("a"); link.href = url; link.download = `${document.title.replace(/[\\/:*?"<>|]/g, "-")}.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <DocumentPreviewProvider document={document} repository={repository} folders={folders} onCommit={onCommit} setDocument={onChange}>
    <Root data-test-id="document-reader-page" dir="rtl" className="flex h-full min-h-0 flex-1 flex-col gap-2 bg-[image:var(--material-canvas)] p-2 text-foreground">
      <GlassCard data-test-id="reader-heading-panel" className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 p-2.5">
        <div data-test-id="reader-title-row" ref={toolsAnchor} className="flex min-w-[min(100%,18rem)] flex-1 basis-72 items-center gap-2">
          {editor.capabilities.drawer && <Button data-test-id="reader-drawer-toggle" size="icon-sm" variant="outline" className="shrink-0" aria-label="ابزارهای سند" aria-expanded={drawerOpen} aria-controls="reader-drawer" onClick={() => setDrawerOpen(current => !current)}><PanelRight aria-hidden="true" /></Button>}
          <div data-test-id="reader-heading-copy" className="min-w-0 flex-1"><Title data-test-id="reader-title" ref={heading} tabIndex={-1} className="sr-only">{document.title}</Title><ClasorBreadcrumb className="[&_[data-slot=breadcrumb-list]]:gap-1 [&_[data-slot=breadcrumb-list]]:text-[10px] [&_[data-slot=breadcrumb-list]]:leading-5 [&_svg]:size-3 [&_li]:wrap-anywhere" items={readerBreadcrumbs(document, repository, folders, editor.version)} /></div>
          <DocumentFlags testId="reader-flags" state={documentFlags(document)} />
        </div>
        <div data-test-id="reader-toolbar-anchor" ref={anchor} className="min-w-0 max-w-full shrink-0"><DocumentEditorToolbar data-test-id="reader-document-toolbar" editing={editor.editing} canEdit={canEdit} versionId={editor.version?.id ?? ""} versions={document.versions.map(item => ({ id: item.id, label: `${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}` }))} onVersionChange={versionId => { navigationFocus.current = "reader-actions"; setNotice(""); editor.navigate({ versionId }); }} onVersions={trigger => { if (onVersions) onVersions(trigger); else setSelection({ id: "versions", label: "نسخه‌های سند", trigger }); }} onModeChange={() => { navigationFocus.current = "reader-mode"; setNotice(""); editor.navigate({ editing: !editor.editing }); }} onDownload={download} onSave={() => { setNotice(""); editor.save(); }} onApprove={published => { setNotice(""); setApproval(published ? "confirm-public" : "confirm"); }} onPublish={() => setApproval("publish")} approveDraft={actions.approveDraft} publishVersion={actions.publishVersion} dirty={editor.dirty} autoSave={editor.autoSave} onAutoSaveChange={editor.setAutoSave} showAutoSave={editor.capabilities.autosave} pdf={editor.capabilities.pdf} /></div>
      </GlassCard>
      {editor.error && !editor.pending && approval === null && <p data-test-id="reader-save-error" role="alert" className="text-xs text-danger">{editor.error}</p>}
      <p data-test-id="reader-action-message" role="status" className="sr-only">{notice || (editor.dirty ? "تغییرات ذخیره نشده" : editor.message)}</p>
      <div data-test-id="reader-body" className="flex min-h-0 min-w-0 flex-1 gap-2">
        {editor.capabilities.drawer && <ReaderDrawer open={drawerOpen} onOpenChange={setDrawerOpen} editing={editor.editing} canEdit={canEdit} anchor={toolsAnchor} />}
      <EditorWithContents testId="document-editor" title={`${document.title} · ${editor.version?.name ?? ""}`} value={editor.editing ? editor.value : editor.version?.content ?? document.content} readOnly={!editor.editing || !canEdit} onValueChange={editor.changeContent} printRequest={printRequest} onEscape={onEscape} minimal />
      </div>
      {selection && <DocumentActionDialog key={selection.id} document={document} repository={repository} folders={folders} onCommit={onCommit} onChange={onChange} selection={selection} close={() => setSelection(null)} announce={setNotice} fallbackFocusRef={heading} />}
      <GlassModal testId="reader-unsaved-dialog" finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>(`[data-test-id="${navigationFocus.current}"]`) ?? true} open={!decisionHost && !!editor.pending} onOpenChange={open => { if (!open) editor.setPending(null); }} title="تغییرات ذخیره نشده" description="پیش از تغییر حالت یا نسخه، دربارهٔ تغییرات تصمیم بگیرید." compact surface="liquid" size="sm" footer={<><Button data-test-id="reader-unsaved-cancel" variant="outline" onClick={() => editor.setPending(null)}>بازگشت</Button><Button data-test-id="reader-unsaved-discard" variant="outline" onClick={() => editor.leave(false)}>ذخیره نشود</Button><Button data-test-id="reader-unsaved-save" onClick={() => editor.leave(true)}>ذخیره و ادامه</Button></>}>{editor.error && <p data-test-id="reader-unsaved-error" role="alert" className="text-xs text-danger">{editor.error}</p>}</GlassModal>
      <GlassModal testId="reader-approval-dialog" finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="reader-actions"]') ?? true} open={!decisionHost && approval !== null} onOpenChange={open => { if (!open) setApproval(null); }} title={approval === "publish" ? "عمومی‌سازی نسخه" : approval === "confirm-public" ? "تأیید و عمومی‌سازی" : "تأیید پیش‌نویس"} description={editor.version?.name} compact surface="liquid" size="sm" footer={<><Button data-test-id="reader-approval-cancel" variant="outline" onClick={() => setApproval(null)}>انصراف</Button><Button data-test-id="reader-approval-submit" onClick={() => { confirmApproval(); }}>تأیید</Button></>}><p data-test-id="reader-approval-description" className="text-xs leading-loose">{approvalDescription}</p>{editor.error && <p data-test-id="reader-approval-error" role="alert" className="text-xs text-danger">{editor.error}</p>}</GlassModal>
    </Root>
  </DocumentPreviewProvider>;
}
