import type { DocumentVersion } from "./model";
export type VersionAction = "confirm" | "confirm-public" | "publish" | "unpublish" | "request" | "cancel-request" | "reject" | "last" | "delete";
export function versionKey(name: string) {
  return name.trim().replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}
export function changeVersion(versions: DocumentVersion[], id: string, action: VersionAction): DocumentVersion[] {
  const item = versions.find(version => version.id === id);
  if (!item) return versions;
  if (action === "delete") return versions.filter(version => version.id !== id);
  if (action === "last") return item.approval === "approved" ? versions.map(version => ({ ...version, latest: version.id === id })) : versions;
  if (action === "confirm" || action === "confirm-public") {
    if (item.approval !== "draft") return versions;
    const existing = versions.find(version => versionKey(version.name) === versionKey(item.name) && version.approval === "approved");
    const approved: DocumentVersion = { ...item, id: existing?.id ?? `${item.id}-approved`, approval: "approved", pending: false, published: action === "confirm-public" || !!existing?.published, latest: existing?.latest ?? false };
    return versions.filter(version => version.id !== id && version.id !== existing?.id).concat(approved);
  }
  return versions.map(version => version.id !== id ? version : {
    ...version,
    published: action === "publish" && version.approval === "approved" ? true : action === "unpublish" ? false : version.published,
    pending: action === "request" ? true : ["cancel-request", "reject", "publish"].includes(action) ? false : version.pending,
  });
}
export function newDraft(versions: DocumentVersion[], name: string, content: string, id: string): DocumentVersion[] {
  if (!name.trim() || versions.some(version => versionKey(version.name) === versionKey(name) && version.approval === "draft")) return versions;
  return [{ id, name: name.trim(), content, approval: "draft", published: false, pending: false, creator: "شما", editedAt: "هم‌اکنون" }, ...versions];
}
export function editDraft(versions: DocumentVersion[], id: string, content: string): DocumentVersion[] {
  const version = versions.find(item => item.id === id);
  if (!version) return versions;
  if (version.approval === "approved") {
    const existing = versions.find(item => versionKey(item.name) === versionKey(version.name) && item.approval === "draft");
    return existing ? editDraft(versions, existing.id, content) : newDraft(versions, version.name, content, `${id}-draft`);
  }
  return versions.map(item => item.id === id ? { ...item, content, editedAt: "هم‌اکنون", pending: false } : item);
}
