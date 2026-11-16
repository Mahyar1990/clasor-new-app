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

export const SELECTION_LIMIT = 10;
export function changeSelection(ids: string[], id: string, checked: boolean): string[] {
  if (!checked) return ids.filter(item => item !== id);
  if (ids.includes(id)) return ids;
  if (ids.length >= SELECTION_LIMIT) throw new Error("حداکثر ۱۰ آیتم را می‌توانید انتخاب کنید.");
  return [...ids, id];
}
export function bulkDocuments(items: DocumentPreview[], ids: string[], action: "delete" | "move", target?: { repositoryId: string; parentId?: string; shared: boolean; tags: string[] }, now = new Date().toISOString()): DocumentPreview[] {
  const selected = [...new Set(ids)];
  if (!selected.length || selected.length > SELECTION_LIMIT) throw new Error("تعداد انتخاب باید بین ۱ تا ۱۰ باشد.");
  if (selected.some(id => !items.some(item => item.id === id && !item.deleted))) throw new Error("برخی آیتم‌ها دیگر در دسترس نیستند.");
  const roots = selected.filter(id => !selected.some(other => other !== id && descendants(items, other).has(id)));
  const affected = new Set(roots.flatMap(id => [...descendants(items, id)]));
  if (action === "delete") return items.map(item => affected.has(item.id) ? { ...item, deleted: true, updatedAt: now } : item);
  if (!target || target.parentId && (!items.some(item => item.id === target.parentId && item.kind === "folder" && !item.deleted && item.repositoryId === target.repositoryId) || affected.has(target.parentId))) throw new Error("مسیر مقصد معتبر نیست.");
  const moved = items.map(item => affected.has(item.id) ? { ...item, parentId: roots.includes(item.id) ? target.parentId : item.parentId, repositoryId: target.repositoryId, shared: target.shared, tags: item.tags.filter(tag => target.tags.includes(tag)), updatedAt: now } : item);
  return moved.map(item => affected.has(item.id) ? { ...item, categoryPath: folderPath(moved, item.parentId), category: ["ریشهٔ مخزن", ...folderPath(moved, item.parentId).map(id => moved.find(row => row.id === id)?.title)].join(" / ") } : item);
}

export function outlineRows(items: DocumentPreview[], matches: DocumentPreview[], expanded: Set<string>, parentId?: string) {
  const allowed = new Set(matches.flatMap(item => [item.id, ...folderPath(items, item.parentId)]));
  const ranks = new Map(matches.map((item, index) => [item.id, index]));
  const rows: { document: DocumentPreview; depth: number; context: boolean }[] = [];
  const seen = new Set<string>();
  function level(parent: string | undefined, depth: number) {
    items.filter(item => !item.deleted && item.parentId === parent && allowed.has(item.id)).sort((a, b) => (ranks.get(a.id) ?? -1) - (ranks.get(b.id) ?? -1)).forEach(item => {
      if (seen.has(item.id)) return;
      seen.add(item.id); rows.push({ document: item, depth, context: !ranks.has(item.id) });
      if (item.kind === "folder" && expanded.has(item.id)) level(item.id, depth + 1);
    });
  }
  level(parentId, 0);
  return rows;
}
