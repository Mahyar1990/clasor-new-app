import type { IDocument, IDocumentVersion, DocumentKind } from "@/interface/document";
import type { IFolder, IRepository } from "@/interface/repository";

export const sampleUser = { id: "user-niloufar", name: "نیلوفر احمدی" };
export const samplePeople = [
  { id: "user-sara", name: "سارا کریمی", role: "admin" as const },
  { id: "user-reza", name: "رضا موسوی", role: "viewer" as const },
  { id: "user-leila", name: "لیلا رضایی", role: "editor" as const },
];
export const personalRepositoryId = "repo-personal";

export const repositories: IRepository[] = [
  { id: personalRepositoryId, name: "فضای شخصی", ownerId: sampleUser.id, ownerName: sampleUser.name, role: "مالک", bookmarked: false, archived: false },
  { id: "repo-product", name: "تیم محصول", ownerId: "user-sara", ownerName: "سارا کریمی", role: "ویرایشگر", bookmarked: true, archived: false },
  { id: "repo-research", name: "پژوهش تازه", ownerId: sampleUser.id, ownerName: sampleUser.name, role: "مالک", bookmarked: false, archived: false },
  { id: "repo-archive", name: "پروژه‌های پیشین", ownerId: sampleUser.id, ownerName: sampleUser.name, role: "مالک", bookmarked: false, archived: true },
];

export const folders: IFolder[] = [
  { id: "folder-notes", repositoryId: personalRepositoryId, parentId: null, name: "یادداشت‌ها" },
  { id: "folder-projects", repositoryId: personalRepositoryId, parentId: null, name: "پروژه‌ها" },
  { id: "folder-autumn", repositoryId: personalRepositoryId, parentId: "folder-projects", name: "پاییز" },
  { id: "folder-resources", repositoryId: personalRepositoryId, parentId: null, name: "مرجع‌ها" },
  { id: "folder-planning", repositoryId: "repo-product", parentId: null, name: "برنامه‌ریزی" },
  { id: "folder-quarter", repositoryId: "repo-product", parentId: "folder-planning", name: "فصل پاییز" },
];

const titles = [
  "راهنمای شروع یک پروژه تازه", "یادداشت‌های پژوهش کاربران", "گزارش پاییز — Research.pdf", "طرح اولیه فضای کار",
  "صورت‌جلسه هماهنگی هفته اول", "برنامه مطالعه آبان", "چک‌لیست تحویل طراحی", "ایده‌های یک تجربه ساده‌تر",
  "گزارش پاییز — نسخه تکمیلی.pdf", "طرح صفحه جزئیات سند", "واژه‌نامه تجربه کاربری", "مرور تصمیم‌های محصول",
  "برنامه هفتگی تیم", "راهنمای نوشتن مستندات", "User Journey — مسیر کاربر", "طرح ناوبری موبایل",
  "خلاصه کتاب طراحی روزمره", "یادداشت‌های جلسه با تیم پژوهش", "راهنمای همکاری با تیم محتوا", "طرح سازمان‌دهی پوشه‌ها",
  "گزارش ارزیابی کاربردپذیری.pdf", "پرسش‌های مصاحبه کاربران", "برنامه فصل آینده", "طرح نمودار جریان سند",
  "یادداشت یک ایده کوچک", "اصول نام‌گذاری اسناد", "خلاصه بازخورد کاربران", "نمونه چیدمان کتابخانه",
  "گزارش ماهانه — October.pdf", "راهنمای نگهداری نسخه‌های قبلی و ثبت تصمیم‌های مشترک در پروژه‌های بلندمدت",
  "يادداشت كتابخانه شخصي", "Project Notes 2026",
];
const personalFolders = [null, "folder-notes", "folder-resources", "folder-autumn"];
const approvalStates = ["draft", "approved", "pending", "rejected"] as const;

export const sampleDocuments: IDocument[] = titles.map<IDocument>((title, index) => {
  const kind: DocumentKind = title.endsWith(".pdf") ? "pdf" : title.startsWith("طرح") || title.startsWith("نمونه") ? "image" : "text";
  return {
    id: `doc-personal-${String(index + 1).padStart(2, "0")}`,
    repositoryId: personalRepositoryId,
    folderId: personalFolders[index % personalFolders.length],
    title,
    kind,
    approval: approvalStates[index % approvalStates.length],
    creator: index === 29 ? null : sampleUser,
    createdAt: new Date(Date.UTC(2026, 8, 1 + index)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 9, 30, 8, 30) - index * 21 * 60 * 60 * 1000).toISOString(),
    description: `این سند نمونه برای مرور ${kind === "text" ? "یادداشت‌ها و تصمیم‌ها" : kind === "pdf" ? "گزارش‌ها و مرجع‌ها" : "طرح‌ها و ایده‌های بصری"} ساخته شده است.`,
  };
}).concat([
  { id: "doc-team-01", repositoryId: "repo-product", folderId: "folder-quarter", title: "نقشه راه پاییز", kind: "text", approval: "pending", creator: { id: "user-sara", name: "سارا کریمی" }, createdAt: "2026-10-01T08:00:00.000Z", updatedAt: "2026-10-30T09:00:00.000Z", description: "اولویت‌ها و مسیر تیم محصول در این فصل.", share: { by: { id: "user-sara", name: "سارا کریمی" }, access: "ویرایش" } },
  { id: "doc-team-02", repositoryId: "repo-product", folderId: "folder-planning", title: "اصول همکاری تیم", kind: "text", approval: "approved", creator: sampleUser, createdAt: "2026-10-02T08:00:00.000Z", updatedAt: "2026-10-29T09:00:00.000Z", description: "توافق‌های کوچک برای نگهداری دانسته‌ها و همکاری در تیم.", share: { by: { id: "user-sara", name: "سارا کریمی" }, access: "مشاهده" } },
  { id: "doc-archive-01", repositoryId: "repo-archive", folderId: null, title: "جمع‌بندی پروژه پیشین", kind: "pdf", approval: "approved", creator: sampleUser, createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-30T09:00:00.000Z", description: "گزارش نمونه در مخزن بایگانی‌شده." },
]).map((document, index) => {
  if (index !== 0) {
    if (document.repositoryId !== personalRepositoryId || (document.approval !== "pending" && document.approval !== "rejected")) return document;
    const version: IDocumentVersion = { id: `${document.id}-v1`, number: 1, basedOn: null, title: document.title, ...(document.kind === "text" ? { content: document.description } : {}), at: document.updatedAt, by: document.creator, approval: document.approval };
    const reviewer = { id: samplePeople[0].id, name: samplePeople[0].name };
    return { ...document, ...(document.kind === "text" ? { content: document.description } : {}), versions: [{ ...version, review: { by: document.creator ?? sampleUser, reviewer, requestedAt: document.updatedAt, ...(document.approval === "rejected" ? { decision: { by: reviewer, at: document.updatedAt, outcome: "rejected" as const, reason: "زمینه و قدم بعدی سند را روشن‌تر کنید. این تصمیم ساختگی است." } } : {}) } }] };
  }
  const contents = ["هدف: ثبت دانسته‌ها و تصمیم‌های پروژه.", "هدف: ثبت دانسته‌ها و تصمیم‌های پروژه.\nقدم بعدی: مرور نیازهای کاربران.", "هدف: ثبت دانسته‌ها و تصمیم‌های پروژه.\nقدم بعدی: مرور نیازهای کاربران.\nآخرین یادداشت: جست‌وجو ساده و فیلترها بازشونده باشند."];
  const versions: IDocumentVersion[] = contents.map((content, index) => ({ id: `${document.id}-v${index + 1}`, number: index + 1, basedOn: index ? `${document.id}-v${index}` : null, title: document.title, content, at: index === 2 ? document.updatedAt : `2026-10-${27 + index}T08:00:00.000Z`, by: sampleUser, approval: index === 1 ? "approved" : "draft", ...(index === 1 ? { review: { by: sampleUser, reviewer: { id: samplePeople[0].id, name: samplePeople[0].name }, requestedAt: "2026-10-28T08:05:00.000Z", decision: { by: { id: samplePeople[0].id, name: samplePeople[0].name }, at: "2026-10-28T09:00:00.000Z", outcome: "approved" as const } } } : {}) }));
  return { ...document, content: contents[2], versions };
});
