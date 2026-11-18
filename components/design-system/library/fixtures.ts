import { dashboardDocuments, dashboardRepositories } from "../clasor-dashboard-data";
import { initialDocument, type DocumentPreview } from "../document-dialogs/model";
import { publicationGuide, publicationFolder } from "../publish/fixtures";
export function libraryDocuments(): DocumentPreview[] {
  const records: DocumentPreview[] = [
    publicationGuide(),
    publicationFolder(),
    ...Array.from({ length: 36 }, (_, i) => {
      const base = dashboardDocuments[i % 12];
      return { ...initialDocument({ ...base, id: i < 12 ? base.id : `library-document-${i}`, title: base.title + (i >= 12 ? ` ${i + 1}` : "") }), repositoryId: base.shared ? "dashboard-repository-2" : "dashboard-repository-1", kind: "document" as const, contentType: ["classic", "excel", "file"][i % 3], createdAt: `2026-10-${String(1 + i % 28).padStart(2, "0")}`, updatedAt: `2026-11-${String(1 + i % 14).padStart(2, "0")}`, order: i % 7 + 1 };
    }),
    { ...initialDocument({ id: "library-template", title: "الگوی صورت‌جلسه", shared: false, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: "عنوان جلسه:\nحاضران:\nتصمیم‌ها:" }), repositoryId: "dashboard-repository-1", kind: "template", contentType: "classic", createdAt: "2026-10-01", updatedAt: "2026-11-01" },
    ...["راهنما", "محصول", "آموزش"].map((title, i) => ({ ...initialDocument({ id: `library-folder-${i}`, title, shared: false, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: "" }), repositoryId: "dashboard-repository-1", kind: "folder" as const, createdAt: "2026-10-01", updatedAt: "2026-11-01" })),
    { ...initialDocument({ id: "library-nested", title: "راهنمای استفاده", shared: false, category: "راهنما", creator: "کاربر نمونه", content: "مستندات داخل دسته‌بندی" }), repositoryId: "dashboard-repository-1", parentId: "library-folder-0", kind: "document" },
    ...dashboardRepositories.slice(2).flatMap(repo => [
      { ...initialDocument({ id: `${repo.id}-guide`, title: "راهنمای مخزن", shared: repo.shared, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: `راهنمای ${repo.name}` }), repositoryId: repo.id, kind: "document" as const },
      { ...initialDocument({ id: `${repo.id}-folder`, title: "مستندات تیم", shared: repo.shared, category: "ریشهٔ مخزن", creator: "کاربر نمونه", content: "" }), repositoryId: repo.id, kind: "folder" as const },
      { ...initialDocument({ id: `${repo.id}-nested`, title: "شروع همکاری", shared: repo.shared, category: "مستندات تیم", creator: "کاربر نمونه", content: "راهنمای همکاری اعضا" }), repositoryId: repo.id, parentId: `${repo.id}-folder`, kind: "document" as const },
    ]),
  ];
  return records.map((item, index) => ({ ...item, createdAt: item.createdAt ?? `2026-10-${String(index % 28 + 1).padStart(2, "0")}`, updatedAt: item.updatedAt ?? `2026-11-${String(index % 14 + 1).padStart(2, "0")}` }));
}
