import type { DocumentKind, IDocument } from "@/interface/document";
import type { ApprovalStatus } from "@/lib/design-system/models";

export type DocumentSort = "updated-desc" | "updated-asc" | "title-asc" | "title-desc";
export type ListScenario = "ready" | "empty" | "loading" | "error";

export interface IDocumentFilters {
  query: string;
  kind: DocumentKind | "all";
  approval: ApprovalStatus | "all";
  sort: DocumentSort;
  visibleCount: number;
}

export interface ILoadMoreResult<T> {
  rows: T[];
  total: number;
  shown: number;
  hasMore: boolean;
  nextCount: number;
}

export type IDocumentResults = ILoadMoreResult<IDocument>;
