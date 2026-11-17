"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { EditorFrame } from "@/components/ui/EditorFrame";
import { DocumentEditorToolbar } from "@/components/ui/DocumentEditorToolbar";
import { DocumentFlags } from "@/components/ui/DocumentFlags";
import { VersionBadges } from "@/components/ui/VersionBadges";
import { DocumentActionDialog } from "../document-dialogs/dialog";
import { DocumentPreviewProvider, type DocumentSetter } from "../document-dialogs/context";
import type { DocumentPreview } from "../document-dialogs/model";
import type { RepositoryPreview } from "../repository-dialogs/context";
import type { DialogSelection } from "../repository-dialogs/dialog";
import { documentFlags } from "../library/document-state";
import { useEditorSession } from "./use-editor-session";
import { versionActions } from "./editor-state";
import { ReaderDrawer } from "./reader-drawer";
export function EditorWorkspace({ document, repository, onChange, onCommit }: { onCommit?: (next: DocumentPreview) => boolean; document: DocumentPreview; repository?: RepositoryPreview; onChange: DocumentSetter }) {
  const editor = useEditorSession(document, onChange, onCommit);
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [printRequest, setPrintRequest] = useState(0);
  const [approval, setApproval] = useState<"confirm" | "confirm-public" | "publish" | null>(null);
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const navigationFocus = useRef("reader-mode");
  const canEdit = !document.shared || ["مالک", "مدیر", "ویرایشگر"].includes(repository?.role ?? "");
  const actions = versionActions(editor.version, canEdit);
  function download() {
    if (editor.capabilities.pdf) { setPrintRequest(current => current + 1); setNotice("برای دریافت PDF، در پنجرهٔ چاپ گزینهٔ ذخیره به‌صورت PDF را انتخاب کنید."); return; }
    const url = URL.createObjectURL(new Blob([editor.version?.content ?? document.content], { type: "text/plain;charset=utf-8" }));
    const link = window.document.createElement("a"); link.href = url; link.download = `${document.title.replace(/[\\/:*?"<>|]/g, "-")}.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <DocumentPreviewProvider document={document} repository={repository} setDocument={onChange}>
    <main data-test-id="document-reader-page" dir="rtl" className="flex h-full min-h-0 flex-1 flex-col gap-2 bg-[image:var(--material-canvas)] p-2 text-foreground">
      <GlassCard data-test-id="reader-heading-panel" className="shrink-0 space-y-2 p-2.5">
        <div data-test-id="reader-title-row" className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <div data-test-id="reader-heading-copy" className="flex min-w-0 flex-1 items-center gap-2"><Link data-test-id="reader-repository-link" href={document.repositoryId ? `/clasor-pages/repositories/${document.repositoryId}` : "/clasor-pages/my-documents"} className="shrink-0 text-[10px] text-primary">{repository?.name ?? "سندها"}</Link><span data-test-id="reader-title-divider" aria-hidden="true" className="text-muted-foreground">‹</span><h1 data-test-id="reader-title" ref={heading} tabIndex={-1} className="min-w-0 truncate text-xs font-bold" title={document.title}>{document.title}</h1></div>
          <DocumentFlags testId="reader-flags" state={documentFlags(document)} />
          {editor.version && <VersionBadges testId="reader-version-badges" approval={editor.version.approval} pending={editor.version.pending} published={editor.version.published} latest={editor.version.latest} />}
        </div>
        <div data-test-id="reader-toolbar-anchor" ref={anchor}><DocumentEditorToolbar data-test-id="reader-document-toolbar" editing={editor.editing} canEdit={canEdit} versionId={editor.version?.id ?? ""} versions={document.versions.map(item => ({ id: item.id, label: `${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}` }))} onVersionChange={versionId => { navigationFocus.current = "reader-version-select"; setNotice(""); editor.navigate({ versionId }); }} onVersions={trigger => setSelection({ id: "versions", label: "نسخه‌های سند", trigger })} onModeChange={() => { navigationFocus.current = "reader-mode"; setNotice(""); editor.navigate({ editing: !editor.editing }); }} onDownload={download} onSave={() => { setNotice(""); editor.save(); }} onApprove={published => { setNotice(""); setApproval(published ? "confirm-public" : "confirm"); }} onPublish={() => setApproval("publish")} approveDraft={actions.approveDraft} publishVersion={actions.publishVersion} dirty={editor.dirty} autoSave={editor.autoSave} onAutoSaveChange={editor.setAutoSave} showAutoSave={editor.capabilities.autosave} showDrawer={editor.capabilities.drawer} drawerId="reader-drawer" drawerOpen={drawerOpen} onDrawerChange={() => setDrawerOpen(current => !current)} pdf={editor.capabilities.pdf} /></div>
      </GlassCard>
      {editor.error && !editor.pending && approval === null && <p data-test-id="reader-save-error" role="alert" className="text-xs text-danger">{editor.error}</p>}
      <p data-test-id="reader-action-message" role="status" className="sr-only">{notice || (editor.dirty ? "تغییرات ذخیره نشده" : editor.message)}</p>
      <div data-test-id="reader-body" className="flex min-h-0 min-w-0 flex-1 gap-2">
        {editor.capabilities.drawer && <ReaderDrawer open={drawerOpen} onOpenChange={setDrawerOpen} editing={editor.editing} canEdit={canEdit} anchor={anchor} />}
      <EditorFrame testId="document-editor" title={`${document.title} · ${editor.version?.name ?? ""}`} value={editor.editing ? editor.value : editor.version?.content ?? document.content} readOnly={!editor.editing || !canEdit} onValueChange={editor.changeContent} printRequest={printRequest} minimal />
      </div>
      {selection && <DocumentActionDialog key={selection.id} document={document} repository={repository} onChange={onChange} selection={selection} close={() => setSelection(null)} announce={setNotice} fallbackFocusRef={heading} />}
      <GlassModal testId="reader-unsaved-dialog" finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>(`[data-test-id="${navigationFocus.current}"]`) ?? true} open={!!editor.pending} onOpenChange={open => { if (!open) editor.setPending(null); }} title="تغییرات ذخیره نشده" description="پیش از تغییر حالت یا نسخه، دربارهٔ تغییرات تصمیم بگیرید." compact surface="liquid" size="sm" footer={<><Button data-test-id="reader-unsaved-cancel" variant="outline" onClick={() => editor.setPending(null)}>بازگشت</Button><Button data-test-id="reader-unsaved-discard" variant="outline" onClick={() => editor.leave(false)}>ذخیره نشود</Button><Button data-test-id="reader-unsaved-save" onClick={() => editor.leave(true)}>ذخیره و ادامه</Button></>}>{editor.error && <p data-test-id="reader-unsaved-error" role="alert" className="text-xs text-danger">{editor.error}</p>}</GlassModal>
      <GlassModal testId="reader-approval-dialog" finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="reader-actions"]') ?? true} open={approval !== null} onOpenChange={open => { if (!open) setApproval(null); }} title={approval === "publish" ? "عمومی‌سازی نسخه" : approval === "confirm-public" ? "تأیید و عمومی‌سازی" : "تأیید پیش‌نویس"} description={editor.version?.name} compact surface="liquid" size="sm" footer={<><Button data-test-id="reader-approval-cancel" variant="outline" onClick={() => setApproval(null)}>انصراف</Button><Button data-test-id="reader-approval-submit" onClick={() => { if (approval === "publish" ? editor.publish() : editor.approve(approval === "confirm-public")) setApproval(null); }}>تأیید</Button></>}><p data-test-id="reader-approval-description" className="text-xs leading-loose">{approval === "publish" ? "نسخهٔ تأییدشده برای نمایش عمومی علامت می‌خورد؛ پیش‌نویس مستقل آن حفظ می‌شود." : <>محتوای پیش‌نویس جایگزین نسخهٔ تأییدشدهٔ هم‌شماره می‌شود.{approval === "confirm-public" ? " نسخه برای نمایش عمومی نیز علامت می‌خورد." : ""}</>}</p>{editor.error && <p data-test-id="reader-approval-error" role="alert" className="text-xs text-danger">{editor.error}</p>}</GlassModal>
    </main>
  </DocumentPreviewProvider>;
}
