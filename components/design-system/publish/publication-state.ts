import type { DocumentPreview } from "../document-dialogs/model";
import type { OutlineItem } from "@/components/ui/OutlineNavigation";
export function publicVersion(document: DocumentPreview) {
  return document.versions.find(item => item.approval === "approved" && item.published && item.latest)
    ?? document.versions.find(item => item.approval === "approved" && item.published);
}
/** Public preview only exposes unrestricted approved/public snapshots, never the draft buffer. */
export function publicDocuments(documents: DocumentPreview[], repositoryId: string) {
  const candidates = documents.filter(item => item.repositoryId === repositoryId);
  const byId = new Map(candidates.map(item => [item.id, item]));
  const scoped = candidates.filter(item => {
    const seen = new Set<string>();
    let node: DocumentPreview | undefined = item;
    while (node) {
      if (node.deleted || node.hidden || seen.has(node.id)) return false;
      seen.add(node.id);
      if (!node.parentId) return true;
      node = byId.get(node.parentId);
      if (node?.kind !== "folder") return false;
    }
    return false;
  });
  const leaves = scoped.filter(item => item.kind !== "folder" && item.kind !== "template" && !item.password && !item.expiresAt && !item.audience.length && !item.blocked.length && publicVersion(item));
  const allowed = new Set(leaves.map(item => item.id));
  for (const item of leaves) {
    let parent = item.parentId;
    const seen = new Set<string>();
    while (parent && !seen.has(parent)) {
      seen.add(parent);
      const folder = scoped.find(node => node.id === parent && node.kind === "folder");
      if (!folder) break;
      allowed.add(folder.id); parent = folder.parentId;
    }
  }
  return scoped.filter(item => allowed.has(item.id));
}
export function publicationHref(repositoryId: string, documentId?: string) {
  return `/clasor-pages/publish/${encodeURIComponent(repositoryId)}${documentId ? `/${encodeURIComponent(documentId)}` : ""}`;
}
export function publicationOutline(documents: DocumentPreview[], repositoryId: string): OutlineItem[] {
  const ids = new Set(documents.map(item => item.id));
  function branch(parentId?: string, seen = new Set<string>()): OutlineItem[] {
    return documents.filter(item => parentId ? item.parentId === parentId : !item.parentId || !ids.has(item.parentId)).filter(item => !seen.has(item.id)).map(item => ({
      id: item.id, label: item.title,
      ...(item.kind === "folder" ? { children: branch(item.id, new Set([...seen, item.id])) } : { href: publicationHref(repositoryId, item.id) }),
    }));
  }
  return branch();
}
