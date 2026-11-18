export interface FeedbackRecord { id: string; entityId: string; description: string }
export type FeedbackSort = { field: "id" | "entityId"; direction: "asc" | "desc" };
export function sortFeedback<T extends FeedbackRecord>(records: T[], sort: FeedbackSort) {
  const sign = sort.direction === "asc" ? 1 : -1;
  return [...records].sort((a, b) => a[sort.field].localeCompare(b[sort.field], "en", { numeric: true }) * sign);
}
