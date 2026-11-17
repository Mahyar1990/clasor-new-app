import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
export interface ReaderFolder { id: string; label: string }
export function readerFolderPath(document: DocumentPreview, documents: DocumentPreview[]): ReaderFolder[] {
  const path: ReaderFolder[] = [];
  const seen = new Set<string>();
  let id = document.parentId;
  while (id && !seen.has(id)) {
    seen.add(id);
    const folder = documents.find(item => item.id === id && item.kind === "folder" && !item.deleted && item.repositoryId === document.repositoryId);
    if (!folder) break;
    path.unshift({ id: folder.id, label: folder.title }); id = folder.parentId;
  }
  if (path.length) return path;
  return (document.category ?? "").split(/\s*\/\s*/u).filter(label => label.trim() && !/^ریشه[ٔ‌\s]*مخزن$/u.test(label.trim())).map((label, i) => ({ id: `category-${i}`, label: label.trim() }));
}
export function readerBreadcrumbs(document: DocumentPreview, repository: { id: string; name: string } | undefined, folders: ReaderFolder[], version?: Pick<DocumentVersion, "name" | "approval" | "published">) {
  return [
    { id: "repository", label: repository?.name ?? "سندها", href: repository ? `/clasor-pages/repositories/${repository.id}` : "/clasor-pages/my-documents" },
    ...folders.map(folder => ({ id: `folder-${folder.id}`, label: folder.label })),
    { id: "document", label: document.title, emphasis: true },
    ...(version ? [{ id: "version", label: `${version.name} (${version.approval === "draft" ? "پیش‌نویس" : version.published ? "تأییدشده عمومی" : "تأییدشده"})` }] : []),
  ];
}
