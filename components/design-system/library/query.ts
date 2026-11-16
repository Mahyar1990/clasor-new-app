import type { DocumentPreview } from "../document-dialogs/model";
import type { SortRule } from "../../ui/MultiSortEditor";
export const sortFields = [{ value: "kind", label: "نوع" }, { value: "title", label: "نام" }, { value: "order", label: "اولویت" }, { value: "createdAt", label: "تاریخ ایجاد" }, { value: "updatedAt", label: "تاریخ ویرایش" }];
export const defaultSort: SortRule[] = [{ field: "kind", direction: "asc" }, { field: "order", direction: "asc" }, { field: "title", direction: "asc" }];
export const emptyFilters = { kind: "all", contentType: "all", tags: [] as string[], template: false, bookmarked: false, searchMode: "title", scope: "current" };
export type LibraryFilters = typeof emptyFilters;
export function normalized(value: string) { return value.normalize("NFKC").replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))).replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\s]+/g, " ").trim().toLocaleLowerCase("fa"); }
export function queryDocuments(documents: DocumentPreview[], shared: boolean, parentId: string | undefined, query: string, filters: LibraryFilters, sort: SortRule[]) {
  const collator = new Intl.Collator("fa", { numeric: true, sensitivity: "base" });
  return documents.filter(item => !item.deleted && item.shared === shared && (filters.scope === "all" || item.parentId === parentId) &&
    (filters.kind === "all" || (filters.kind === "document" ? item.kind !== "folder" : item.kind === filters.kind)) && (filters.contentType === "all" || (item.contentType === filters.contentType || filters.contentType === "excel" && item.contentType === "office" && item.extension === "xlsx" || filters.contentType === "file" && item.contentType === "office" && item.extension !== "xlsx")) &&
    (!filters.tags.length || filters.tags.every(tag => item.tags.includes(tag))) && (!filters.template || item.kind === "template") && (!filters.bookmarked || item.bookmarked) &&
    normalized(filters.searchMode === "content" ? item.content : item.title).includes(normalized(query)))
    .map((item, index) => ({ item, index })).sort((a, b) => {
      for (const rule of sort) {
        const av = rule.field === "kind" ? a.item.kind === "folder" ? 0 : 1 : a.item[rule.field as keyof DocumentPreview];
        const bv = rule.field === "kind" ? b.item.kind === "folder" ? 0 : 1 : b.item[rule.field as keyof DocumentPreview];
        const result = typeof av === "number" && typeof bv === "number" ? av - bv : collator.compare(normalized(String(av ?? "")), normalized(String(bv ?? "")));
        if (result) return rule.direction === "asc" ? result : -result;
      }
      return a.index - b.index;
    }).map(row => row.item);
}

export function queryRepositories<T extends { name: string; deleted: boolean; left: boolean; archived: boolean; shared: boolean; bookmarked: boolean; published: boolean }>(items: T[], scope: string, query: string): T[] {
  return items.filter(item => !item.deleted && !item.left && (scope === "archived-repositories" ? item.archived && !item.shared : !item.archived) &&
    (scope === "my-repositories" ? !item.shared : scope === "shared-repositories" ? item.shared : scope === "bookmarked-repositories" ? item.bookmarked : scope === "published-repositories" ? item.published && !item.shared : true) && normalized(item.name).includes(normalized(query)));
}
