import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
import { editDraft, changeVersion, versionKey } from "../document-dialogs/version-state";
export function editorKind(document: Pick<DocumentPreview, "contentType" | "extension">) {
  const type = document.contentType ?? "classic";
  if (["flowchart", "diagram", "drawio"].includes(type)) return "flowchart";
  if (type === "office") {
    if (/^(xlsx?|csv|ods)$/i.test(document.extension ?? "")) return "excel";
    return /^(docx?|txt|odt)$/i.test(document.extension ?? "doc") ? "word" : "office";
  }
  return type;
}
export function editorCapabilities(document: Pick<DocumentPreview, "contentType" | "extension">) {
  const kind = editorKind(document);
  return { kind, drawer: kind === "classic", autosave: ["classic", "word", "excel", "flowchart"].includes(kind), pdf: kind === "classic" };
}
export function editableVersion(versions: DocumentVersion[], version: DocumentVersion) {
  return versions.find(item => item.approval === "draft" && versionKey(item.name) === versionKey(version.name)) ?? version;
}
export function saveEditorDraft(document: DocumentPreview, version: DocumentVersion, content: string) {
  const versions = editDraft(document.versions, version.id, content);
  const draft = editableVersion(versions, version);
  const updatedAt = new Date().toISOString();
  const editHistory = content === version.content ? document.editHistory : [{ id: crypto.randomUUID(), versionName: version.name, content, editedAt: updatedAt, creator: "شما" }, ...(document.editHistory ?? [])];
  return { document: { ...document, versions, content, updatedAt, editHistory }, version: draft };
}
export function approveEditorDraft(document: DocumentPreview, version: DocumentVersion, content: string, published: boolean) {
  const saved = saveEditorDraft(document, version, content);
  const versions = changeVersion(saved.document.versions, saved.version.id, published ? "confirm-public" : "confirm");
  const approved = versions.find(item => item.approval === "approved" && versionKey(item.name) === versionKey(version.name));
  return { document: { ...saved.document, versions }, version: approved ?? saved.version };
}

export function versionActions(version: DocumentVersion | undefined, canEdit: boolean) {
  return { approveDraft: canEdit && version?.approval === "draft", publishVersion: canEdit && version?.approval === "approved" && !version.published };
}
export function publishEditorVersion(document: DocumentPreview, version: DocumentVersion) {
  return { ...document, versions: changeVersion(document.versions, version.id, "publish"), updatedAt: new Date().toISOString() };
}
