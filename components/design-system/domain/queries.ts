export function normalizeDomainText(value: string) {
  return value.normalize("NFKC").replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))).replace(/[\u200c\s]+/g, " ").trim().toLocaleLowerCase("fa");
}
const calendarDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" });
function localDate(value?: string) { return value && Number.isFinite(Date.parse(value)) ? calendarDate.format(new Date(value)) : ""; }
export type { CollectionQuery as DomainQuery } from "@/lib/design-system/collection-query";
import type { CollectionQuery as DomainQuery } from "@/lib/design-system/collection-query";
export function matchesDomainQuery(query: DomainQuery, searchable: (string | undefined)[], facets: Record<string, string>) {
  const needle = normalizeDomainText(query.text);
  return (!needle || searchable.some(value => normalizeDomainText(value ?? "").includes(needle))) && Object.entries(query.filters).every(([key, value]) => {
    if (!value || value === "all") return true;
    if (key === "fromDate") return !!facets.createdAt && localDate(facets.createdAt) >= value;
    if (key === "toDate") return !!facets.createdAt && localDate(facets.createdAt) <= value;
    return facets[key] === value;
  });
}
export function validateNews(draft: { title: string; body: string; link: string; repositoryId?: string }, privateNews: boolean) {
  if (!draft.title.trim() || !draft.body.trim()) return "عنوان و متن خبرنامه را وارد کنید.";
  if (privateNews && !draft.repositoryId) return "مخزن خبرنامه را انتخاب کنید.";
  if (draft.link.trim()) {
    try { const url = new URL(draft.link.trim()); if (!["https:", "http:"].includes(url.protocol)) return "لینک باید با http یا https شروع شود."; }
    catch { return "آدرس لینک معتبر نیست."; }
  }
  return "";
}
export function validPriority(value: string) { return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) >= 1; }
export function uniqueUsername(username: string, existing: string[]) {
  const name = username.trim().replace(/^@/, "");
  return /^[a-z0-9_.-]{2,64}$/i.test(name) && !existing.some(item => item.toLowerCase() === name.toLowerCase());
}
