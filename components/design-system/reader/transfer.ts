import type { DocumentPreview } from "../document-dialogs/model";
import type { RepositoryPreview } from "../repository-dialogs/context";
export const readerPrefix = "clasor-preview-reader:v1:";
export const readerChange = "clasor-preview-reader-change";
export interface ReaderSnapshot { document: DocumentPreview; repository?: RepositoryPreview; storedAt: number }
export function parseReaderSnapshot(raw: string | null, id?: string, now = Date.now()): ReaderSnapshot | null {
  try { if (raw && raw.length > 2_000_000) return null; const item = raw ? JSON.parse(raw) : null; return item && typeof item.storedAt === "number" && now - item.storedAt < 86_400_000 && item.storedAt <= now && typeof item.document?.id === "string" && (!id || item.document.id === id) && typeof item.document.title === "string" && typeof item.document.content === "string" && ["versions", "tags", "audience", "blocked", "recipients", "activities"].every(key => Array.isArray(item.document[key])) && ["bookmarked", "hidden", "deleted", "shared"].every(key => typeof item.document[key] === "boolean") ? item : null; } catch { return null; }
}
export function saveReaderSnapshot(document: DocumentPreview, repository?: RepositoryPreview) {
  try {
    const raw = JSON.stringify({ document, repository: repository ? { ...repository, image: repository.image.startsWith("data:") ? "purple" : repository.image, files: [], keys: [], requests: [], joinLinks: [] } : undefined, storedAt: Date.now() });
    if (raw.length > 2_000_000) return false;
    for (let i = localStorage.length - 1; i >= 0; i--) { const key = localStorage.key(i); if (key?.startsWith(readerPrefix) && !parseReaderSnapshot(localStorage.getItem(key))) localStorage.removeItem(key); }
    localStorage.setItem(`${readerPrefix}${document.id}`, raw); window.dispatchEvent(new Event(readerChange)); return true;
  } catch { return false; }
}
export function readReaderSnapshot(id: string) { try { return localStorage.getItem(`${readerPrefix}${id}`); } catch { return null; } }
export function subscribeReader(listener: () => void) {
  window.addEventListener("storage", listener); window.addEventListener(readerChange, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(readerChange, listener); };
}
