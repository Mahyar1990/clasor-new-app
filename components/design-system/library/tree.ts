import type { DocumentPreview } from "../document-dialogs/model";
import type { PathNode } from "../../ui/PathPicker";
export function descendants(items: DocumentPreview[], id: string) {
  const result = new Set([id]);
  let changed = true;
  while (changed) { changed = false; for (const item of items) if (item.parentId && result.has(item.parentId) && !result.has(item.id)) { result.add(item.id); changed = true; } }
  return result;
}
export function folderPath(items: DocumentPreview[], id?: string) {
  const ids: string[] = [];
  while (id && !ids.includes(id)) { const item = items.find(item => item.id === id && !item.deleted && item.kind === "folder"); if (!item) break; ids.unshift(id); id = item.parentId; }
  return ids;
}
export function folderTree(items: DocumentPreview[], excluded?: string): PathNode[] {
  const banned = excluded ? descendants(items, excluded) : new Set<string>();
  const folders = items.filter(item => item.kind === "folder" && !item.deleted && !item.shared && !banned.has(item.id));
  function level(parentId?: string, seen: string[] = []): PathNode[] { return folders.filter(item => item.parentId === parentId && !seen.includes(item.id)).map(item => ({ id: item.id, name: item.title, children: level(item.id, [...seen, item.id]) })); }
  return level();
}
export function applyDocumentChange(items: DocumentPreview[], id: string, update: DocumentPreview | ((item: DocumentPreview) => DocumentPreview)) {
  const original = items.find(item => item.id === id);
  if (!original) return items;
  const changed = typeof update === "function" ? update(original) : update;
  const removed = changed.deleted && original.kind === "folder" ? descendants(items, id) : new Set<string>();
  return items.map(item => item.id === id ? changed : removed.has(item.id) ? { ...item, deleted: true } : item);
}
