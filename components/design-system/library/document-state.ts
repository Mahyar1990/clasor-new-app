import type { DocumentPreview } from "../document-dialogs/model";
import type { RepositoryPreview } from "../repository-dialogs/context";
export function documentFlags(document: DocumentPreview) {
  return { bookmarked: document.bookmarked, hidden: document.hidden, restricted: !!(document.audience.length || document.password || document.expiresAt), blocked: document.blocked.length > 0 };
}

export function panelRecipientOptions(repository?: Pick<RepositoryPreview, "members" | "groups">) {
  return [...(repository?.members ?? []).map(item => ({ id: `user:${item.id}`, name: item.name, kind: "user" as const, detail: item.role })), ...(repository?.groups ?? []).map(item => ({ id: `group:${item.id}`, name: item.name, kind: "group" as const, detail: item.role }))];
}
export function prunePanelRecipients(ids: string[], repository?: Pick<RepositoryPreview, "members" | "groups">) {
  const allowed = new Set(panelRecipientOptions(repository).map(item => item.id));
  return [...new Set(ids)].filter(id => allowed.has(id));
}
