"use client";
import { useState } from "react";
import { EditorWorkspace } from "../reader/editor-workspace";
import { WorkspaceDecisionPage, type DecisionHost } from "../reader/workspace-decisions";
import { readerFolderPath } from "../reader/reader-path";
import { useOptionalLibrary } from "../library/store";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { CopyField } from "@/components/ui/CopyField";
import { SelectField } from "@/components/ui/select-field";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { useDocumentPreview } from "./context";
import { newDraft, changeVersion, versionKey, type VersionAction } from "./version-state";
import type { DocumentVersion } from "./model";
function VersionWorkspace({ version, editing = false }: { version: DocumentVersion; editing?: boolean }) {
  const { document, setDocument, repository, folders, onCommit } = useDocumentPreview();
  const library = useOptionalLibrary();
  const { back, push } = useDialogNavigation();
  const host: DecisionHost = request => push(request.title, <WorkspaceDecisionPage request={request} />, request.origin?.());
  return <div data-test-id={editing ? "doc-version-editor-workspace" : "doc-version-viewer"} className="flex h-full min-h-0 flex-1 flex-col"><EditorWorkspace document={document} repository={repository} folders={folders ?? readerFolderPath(document, library?.documents ?? [])} onChange={setDocument} onCommit={onCommit} initialVersionId={version.id} initialEditing={editing} embedded onEscape={back} onVersions={back} decisionHost={host} /></div>;
}
export function VersionEditor({ version, clone = false }: { version?: DocumentVersion; clone?: boolean }) {
  return version && !clone ? <VersionWorkspace version={version} editing /> : <VersionCreation version={version} />;
}
function VersionCreation({ version }: { version?: DocumentVersion }) {
  const { document, setDocument } = useDocumentPreview();
  const { back } = useDialogNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  return <form data-test-id="doc-version-editor" className="space-y-3" onSubmit={event => {
    event.preventDefault();
    const name = `نسخهٔ ${number.trim()}`;
    if (document.versions.some(item => versionKey(item.name) === versionKey(name) && item.approval === "draft")) { setError("پیش‌نویسی با این شماره وجود دارد؛ آن را ویرایش کنید."); return; }
    setDocument(current => ({ ...current, updatedAt: new Date().toISOString(), versions: newDraft(current.versions, name, version?.content ?? "", crypto.randomUUID()) })); back();
  }}>
    <TextField data-test-id="doc-version-number" label="شماره نسخه" value={number} onValueChange={setNumber} error={error} maxLength={40} required />
    <p data-test-id="doc-version-create-note" className="text-xs text-muted-foreground">پس از ساخت نسخه، محتوا را از گزینهٔ ویرایش در دیالوگ جداگانه تغییر دهید.</p>
    <Button data-test-id="doc-version-editor-save" type="submit">ایجاد نسخه جدید</Button>
  </form>;
}
export function VersionViewer({ version }: { version: DocumentVersion }) {
  return <VersionWorkspace version={version} />;
}
export function VersionConfirmation({ version, action, label }: { version: DocumentVersion; action: VersionAction; label: string }) {
  const { document, setDocument } = useDocumentPreview();
  const { back } = useDialogNavigation();
  const replacement = ["confirm", "confirm-public"].includes(action) && document.versions.some(item => versionKey(item.name) === versionKey(version.name) && item.approval === "approved");
  return <div data-test-id="doc-version-confirm" className="space-y-3"><p data-test-id="doc-version-confirm-target" className="text-xs">{label} · {version.name} · {version.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}</p>{replacement && <p data-test-id="doc-version-replacement-warning" className="text-xs leading-relaxed text-warning">محتوای تأییدشدهٔ همین شماره با این پیش‌نویس جایگزین می‌شود و پیش‌نویس بسته می‌شود.</p>}<Button data-test-id="doc-version-confirm-submit" variant={action === "delete" ? "destructive" : "default"} onClick={() => { setDocument(current => ({ ...current, versions: changeVersion(current.versions, version.id, action) })); back(); }}>{label}</Button></div>;
}
export function VersionLink({ version }: { version: DocumentVersion }) {
  const { document } = useDocumentPreview();
  return <CopyField testId="doc-version-share-link" label="نشانی نسخه نمونه" value={`https://example.com/document/${encodeURIComponent(document.id)}?versionId=${encodeURIComponent(version.id)}&versionState=${version.approval}`} />;
}
export function VersionCompare({ version }: { version: DocumentVersion }) {
  const { document } = useDocumentPreview();
  const candidates = document.versions.filter(item => item.id !== version.id);
  const [target, setTarget] = useState(candidates[0]?.id ?? "");
  const selected = candidates.find(item => item.id === target);
  return <div data-test-id="doc-version-comparison" className="space-y-3"><SelectField data-test-id="doc-version-compare-target" label="مقایسه با نسخه" value={target} onValueChange={setTarget} options={candidates.map(item => ({ value: item.id, label: `${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}` }))} /><div data-test-id="doc-version-comparison-columns" className="grid gap-3 sm:grid-cols-2"><TextareaField data-test-id="doc-version-compare-source" label={`${version.name} · نسخه انتخاب‌شده`} value={version.content} readOnly rows={7} /><TextareaField data-test-id="doc-version-compare-other" label={`${selected?.name ?? "بدون نسخه"} · نسخه مقابل`} value={selected?.content ?? ""} readOnly rows={7} /></div></div>;
}
