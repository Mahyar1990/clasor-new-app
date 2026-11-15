import type { IFolder } from "@/interface/repository";
import type { IDocument } from "@/interface/document";

export function folderPath(folders: readonly IFolder[], repositoryId: string, folderId: string | null): IFolder[] | null {
  const path: IFolder[] = [];
  const visited = new Set<string>();
  let id = folderId;
  while (id) {
    const folder = folders.find(item => item.id === id && item.repositoryId === repositoryId);
    if (!folder || visited.has(id)) return null;
    visited.add(id); path.unshift(folder); id = folder.parentId;
  }
  return path;
}

export function getSharedDocuments(documents: readonly IDocument[]) {
  return documents.filter(document => Boolean(document.share));
}

export function repositoryHref(repositoryId: string, folderId: string | null = null) {
  return `/workspace/repositories/${encodeURIComponent(repositoryId)}${folderId ? `?folder=${encodeURIComponent(folderId)}` : ""}`;
}

/** Return destinations are local list routes only, never arbitrary URLs. */
export function safeReturnHref(value: string | null) {
  if (!value) return "/workspace/documents";
  if (value === "/workspace/documents" || value === "/workspace/shared") return value;
  if (/^\/workspace\/repositories\/[a-zA-Z0-9-]+(?:\?folder=[a-zA-Z0-9-]+)?$/.test(value)) return value;
  return "/workspace/documents";
}
