"use client";
import { useCallback, useEffect, useState } from "react";
import { approveEditorDraft, editableVersion, editorCapabilities, saveEditorDraft } from "./editor-state";
import type { DocumentPreview } from "../document-dialogs/model";
import type { DocumentSetter } from "../document-dialogs/context";
function persist(next: DocumentPreview, onChange: DocumentSetter, onCommit?: (next: DocumentPreview) => boolean) {
  if (onCommit) return onCommit(next);
  onChange(next); return true;
}
export function useEditorSession(document: DocumentPreview, onChange: DocumentSetter, onCommit?: (next: DocumentPreview) => boolean) {
  const [editing, setEditing] = useState(false);
  const [versionId, setVersionId] = useState("");
  const [autoSave, setAutoSave] = useState(true);
  const [buffers, setBuffers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<{ versionId?: string; editing?: boolean } | null>(null);
  const capabilities = editorCapabilities(document);
  const version = document.versions.find(item => item.id === versionId) ?? document.versions.find(item => item.latest && item.approval === "approved") ?? document.versions[0];
  const value = version ? buffers[version.id] ?? version.content : document.content;
  const dirty = !!version && value !== version.content;
  const save = useCallback(() => {
    if (!version) return false;
    const result = saveEditorDraft(document, version, value);
    if (!persist(result.document, onChange, onCommit)) { setError("ذخیره انجام نشد؛ تغییرات شما حفظ شده است. دوباره تلاش کنید."); return false; }
    setError(""); setVersionId(result.version.id);
    setBuffers(current => { const next = { ...current }; delete next[version.id]; return next; });
    setMessage("تغییرات ذخیره شد."); return true;
  }, [document, version, value, onChange, onCommit]);
  useEffect(() => {
    if (!editing || !capabilities.autosave || !autoSave || !dirty || pending) return;
    const timer = setTimeout(save, 700);
    return () => clearTimeout(timer);
  }, [editing, capabilities.autosave, autoSave, dirty, pending, save]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function navigate(target: { versionId?: string; editing?: boolean }) {
    if (dirty) { setPending(target); return; }
    applyNavigation(target);
  }
  function applyNavigation(target: { versionId?: string; editing?: boolean }) {
    if (target.versionId) setVersionId(target.versionId);
    if (target.editing !== undefined) {
      if (target.editing && version) setVersionId(editableVersion(document.versions, version).id);
      setEditing(target.editing);
    }
    setPending(null); setMessage(""); setError("");
  }
  function leave(saveChanges: boolean) {
    if (!pending) return;
    if (saveChanges && !save()) return;
    if (!saveChanges && version) setBuffers(current => { const next = { ...current }; delete next[version.id]; return next; });
    applyNavigation(pending);
  }
  function approve(published: boolean) {
    if (!version) return false;
    const result = approveEditorDraft(document, version, value, published);
    if (!persist(result.document, onChange, onCommit)) { setError("ذخیره انجام نشد؛ تغییرات شما حفظ شده است. دوباره تلاش کنید."); return false; }
    setError(""); setVersionId(result.version.id); setEditing(false); setBuffers({});
    setMessage(published ? "نسخه تأیید و عمومی شد." : "پیش‌نویس تأیید شد."); return true;
  }
  return { capabilities, editing, version, value, dirty, autoSave, setAutoSave, save, approve, message, error, pending, setPending, leave, navigate,
    changeContent: (text: string) => { if (version) setBuffers(current => ({ ...current, [version.id]: text })); },
  };
}
