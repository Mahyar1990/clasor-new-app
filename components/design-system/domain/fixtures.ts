import { advancedFlags, baseFields, colorFields } from "./settings-schema";
import type { DomainState, DomainUser, ReportTarget } from "./model";
/** Fictional records only: no source accounts, requests or content are copied. */
const people: DomainUser[] = [
  { id: "pod-1001", name: "نگار نمونه", username: "negar.sample", avatar: "/avatars/preview-user.svg" },
  { id: "pod-1002", name: "آرمان نمونه", username: "arman.sample" },
  { id: "pod-1003", name: "سارا نمونه", username: "sara.sample" },
];
const date = (i: number) => `2026-11-${String(1 + i % 17).padStart(2, "0")}T08:00:00Z`;
const repoId = (i: number) => `dashboard-repository-${1 + (i % 6) * 4}`;
export function initialDomainState(): DomainState {
  return {
    users: people,
    settings: {
      fields: Object.fromEntries(baseFields.map(field => [field.id, field.value])),
      colors: Object.fromEntries(colorFields.map(field => [field.id, field.value])),
      flags: Object.fromEntries(advancedFlags.map(field => [field.id, !["branches", "domainTags"].includes(field.id)])),
    },
    priorities: {}, tags: ["راهنما", "توسعه", "محصول"],
    news: Array.from({ length: 24 }, (_, i) => ({ id: `domain-news-${i}`, title: `${i % 2 ? "به‌روزرسانی مستندات" : "راهنمای شروع همکاری"} ${i + 1}`, body: "توضیحات و راهنماهای تازه به مستندات نمونه اضافه شده‌اند. برای مطالعه جزئیات، مستندات مربوط را ببینید.", link: i % 3 ? "https://example.com/guide" : "", image: ["purple", "blue", "green", "orange"][i % 4], repositoryId: i < 12 ? undefined : repoId(i), createdAt: date(i) })),
    requests: Array.from({ length: 22 }, (_, i) => ({ id: `news-request-${i}`, user: people[i % 3], repositoryId: repoId(i), status: "pending", createdAt: date(i) })),
    reviews: Array.from({ length: 28 }, (_, i) => ({ id: `domain-review-${i}`, kind: i % 2 ? "question" : "comment", user: people[i % 3], repositoryId: repoId(i), documentId: `dashboard-document-${1 + i % 12}`, document: ["راهنمای شروع همکاری", "برنامه انتشار محصول", "معماری سامانه"][i % 3], body: i % 2 ? "چطور می‌توانم نسخه جدید مستندات را دریافت کنم؟" : "توضیحات این بخش روشن است؛ لطفاً مثال بیشتری اضافه کنید.", createdAt: date(i), status: "pending" })),
    reports: Array.from({ length: 16 }, (_, i) => ({ id: `domain-report-${i}`, target: (["document", "repository", "comment", "question", "answer"] as ReportTarget[])[i % 5], targetTitle: ["راهنمای شروع همکاری", "مستندات محصول", "نظر درباره راهنمای شروع", "سوال درباره نسخه جدید", "پاسخ به سوال نصب"][i % 5], document: i % 5 === 1 ? undefined : "راهنمای شروع همکاری", repositoryId: repoId(i), user: people[i % 3], reason: i % 2 ? "محتوای نامناسب" : "اطلاعات نادرست", body: "این یک گزارش ساختگی برای نمایش جزئیات مورد گزارش‌شده و زمینه آن است.", createdAt: date(i) })),
  };
}
