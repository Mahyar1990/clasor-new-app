"use client";
import { useState } from "react";
import { EditorFrame } from "@/components/ui/EditorFrame";
import { DocumentCanvas } from "../reader/document-canvas";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { CopyField } from "@/components/ui/CopyField";
import { SelectField } from "@/components/ui/select-field";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { useDocumentPreview } from "./context";
import { newDraft, editDraft, changeVersion, versionKey, type VersionAction } from "./version-state";
import type { DocumentVersion } from "./model";
export function VersionEditor({ version, clone = false }: { version?: DocumentVersion; clone?: boolean }) {
  const { document, setDocument } = useDocumentPreview();
  const { back } = useDialogNavigation();
  const [number, setNumber] = useState(version && !clone ? version.name.replace("نسخهٔ ", "") : "");
  const [content, setContent] = useState(version?.content ?? "");
  const [error, setError] = useState("");
  const creating = !version || clone;
  return <form data-test-id="doc-version-editor" className={creating ? "space-y-3" : "flex h-full min-h-0 flex-1 flex-col gap-3"} onSubmit={event => {
    event.preventDefault();
    const name = `نسخهٔ ${number.trim()}`;
    if (creating && document.versions.some(item => versionKey(item.name) === versionKey(name) && item.approval === "draft")) { setError("پیش‌نویسی با این شماره وجود دارد؛ آن را ویرایش کنید."); return; }
    setDocument(current => { const versions = creating ? newDraft(current.versions, name, version?.content ?? "", crypto.randomUUID()) : editDraft(current.versions, version.id, content); return { ...current, updatedAt: new Date().toISOString(), versions, content: creating ? current.content : versions.find(item => item.approval === "draft")?.content ?? current.content }; }); back();
  }}>
    {creating && <TextField data-test-id="doc-version-number" label="شماره نسخه" value={number} onValueChange={setNumber} error={error} maxLength={40} required />}
    {version?.approval === "approved" && !clone && <p data-test-id="doc-version-edit-note" className="text-xs text-muted-foreground">تغییرات در پیش‌نویس هم‌شماره ذخیره می‌شوند؛ محتوای تأییدشده حفظ می‌شود.</p>}
    {!creating && <EditorFrame testId="doc-version-edit-content" title={`${document.title} · ${version?.name}`} value={content} onValueChange={setContent} readOnly={false} onEscape={back} />}
    {creating && <p data-test-id="doc-version-create-note" className="text-xs text-muted-foreground">پس از ساخت نسخه، محتوا را از گزینهٔ ویرایش در دیالوگ جداگانه تغییر دهید.</p>}
    <Button data-test-id="doc-version-editor-save" type="submit">{creating ? "ایجاد نسخه جدید" : "ذخیره پیش‌نویس"}</Button>
  </form>;
}
export function VersionViewer({ version }: { version: DocumentVersion }) {
  const { document } = useDocumentPreview();
  const current = document.versions.find(item => item.id === version.id) ?? version;
  const { back } = useDialogNavigation();
  return <div data-test-id="doc-version-viewer" className="flex h-full min-h-0 flex-1 flex-col"><DocumentCanvas document={document} version={current} onEscape={back} /></div>;
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
