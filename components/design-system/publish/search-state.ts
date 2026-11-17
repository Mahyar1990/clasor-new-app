import type { DocumentPreview } from "../document-dialogs/model";
import type { LibraryRepository } from "../library/store";
import { publicDocuments, publicVersion } from "./publication-state";
export interface PublishSearch { mode: "content" | "advanced"; text: string; title: string; creator: string; tag: string; sort: string }
export const emptyPublishSearch: PublishSearch = { mode: "content", text: "", title: "", creator: "", tag: "", sort: "createdAt" };
function normalized(value: string) { return value.normalize("NFKC").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\s]+/g, " ").trim().toLocaleLowerCase("fa"); }
export function publishedSearchRecords(documents: DocumentPreview[], repositories: LibraryRepository[]) {
  return repositories.filter(item => item.published && !item.deleted && !item.archived && !item.left).flatMap(repository => publicDocuments(documents, repository.id).filter(item => item.kind !== "folder").map(document => ({ id: document.id, document, repository, version: publicVersion(document)! })));
}
export function searchPublishedDocuments(records: ReturnType<typeof publishedSearchRecords>, query: PublishSearch) {
  return records.filter(({ document, version }) => query.mode === "content"
    ? normalized(query.text).length > 0 && normalized(version.content).includes(normalized(query.text))
    : normalized(document.title).includes(normalized(query.title)) && normalized(document.creator).includes(normalized(query.creator)) && (!query.tag || document.tags.includes(query.tag)))
    .sort((a, b) => query.sort === "title" ? a.document.title.localeCompare(b.document.title, "fa", { numeric: true }) : (b.document[query.sort === "updatedAt" ? "updatedAt" : "createdAt"] ?? "").localeCompare(a.document[query.sort === "updatedAt" ? "updatedAt" : "createdAt"] ?? ""));
}
