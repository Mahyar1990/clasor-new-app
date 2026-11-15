import type { IDocument } from "@/interface/document";
import type { IDocumentFilters, IDocumentResults, ILoadMoreResult } from "@/interface/workspace";

export const LIST_BATCH_SIZE = 10;
export const defaultFilters: IDocumentFilters = { query: "", kind: "all", approval: "all", sort: "updated-desc", visibleCount: LIST_BATCH_SIZE };
export const kindLabels = { text: "متن", pdf: "PDF", image: "تصویر" };

export function normalizeSearch(value: string) {
  return value.normalize("NFKC").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, " ").replace(/\s+/g, " ").trim().toLocaleLowerCase("fa");
}

export function getLoadedItems<T>(items: readonly T[], visibleCount = LIST_BATCH_SIZE): ILoadMoreResult<T> {
  const total = items.length;
  const requested = Number.isFinite(visibleCount) ? Math.floor(visibleCount) : LIST_BATCH_SIZE;
  const shown = Math.min(total, Math.max(LIST_BATCH_SIZE, requested));
  return { rows: items.slice(0, shown), total, shown, hasMore: shown < total, nextCount: Math.min(total, shown + LIST_BATCH_SIZE) };
}

export function getDocumentResults(documents: readonly IDocument[], repositoryId: string | null, filters: IDocumentFilters): IDocumentResults {
  const query = normalizeSearch(filters.query);
  const filtered = documents.filter(document => (repositoryId === null || document.repositoryId === repositoryId)
    && (!query || normalizeSearch(document.title).includes(query))
    && (filters.kind === "all" || document.kind === filters.kind)
    && (filters.approval === "all" || document.approval === filters.approval));
  const collator = new Intl.Collator("fa", { numeric: true, sensitivity: "base" });
  filtered.sort((a, b) => {
    const comparison = filters.sort.startsWith("title")
      ? collator.compare(a.title, b.title)
      : Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
    const direction = filters.sort.endsWith("desc") ? -1 : 1;
    return comparison * direction || a.id.localeCompare(b.id);
  });
  return getLoadedItems(filtered, filters.visibleCount);
}

export function formatDocumentDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { timeZone: "Asia/Tehran", day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}
