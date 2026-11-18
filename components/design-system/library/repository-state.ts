import type { LibraryRepository } from "./store";
import type { RepositoryPreview } from "../repository-dialogs/context";
export function updateRepositoryRecords(items: LibraryRepository[], id: string, update: RepositoryPreview | ((item: RepositoryPreview) => RepositoryPreview), now = new Date().toISOString()): LibraryRepository[] {
  return items.map(item => {
    if (item.id !== id) return item;
    const next = typeof update === "function" ? update(item) : update;
    const edited = next.name !== item.name || next.description !== item.description || next.image !== item.image;
    return { ...item, ...next, shared: next.role !== "مالک", updatedAt: edited ? now : item.updatedAt };
  });
}

export function resolveRepositoryDocuments<T extends { repositoryId?: string; shared: boolean }>(documents: T[], repositories: { id: string; shared: boolean; deleted: boolean; left: boolean }[]): T[] {
  return documents.flatMap(document => { const repo = repositories.find(item => item.id === document.repositoryId); return repo && !repo.deleted && !repo.left ? [{ ...document, shared: repo.shared }] : []; });
}
