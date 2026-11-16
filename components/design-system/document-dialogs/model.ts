import type { DashboardDocument } from "../clasor-dashboard-data";

export interface DocumentRecipient { id: string; name: string; role: string }
export interface DocumentVersion { id: string; name: string; content: string; approval: "draft" | "approved"; published: boolean; pending?: boolean; latest?: boolean; creator?: string; editedAt?: string }
export interface DocumentActivity { id: string; name: string; body: string; kind: "comments" | "questions"; state: "approved" | "pending" | "rejected"; answer?: string }
export interface DocumentPreview extends DashboardDocument {
  kind?: "document" | "folder" | "template";
  contentType?: string;
  extension?: string;
  createdAt?: string;
  updatedAt?: string;
  parentId?: string;
  keyId?: string;
  formType?: string;
  formDisplay?: string;
  categoryPath?: string[];
  description: string;
  order: number;
  tags: string[];
  bookmarked: boolean;
  deleted: boolean;
  hidden: boolean;
  password: string;
  publishLink: string;
  expiresAt: string;
  audienceMode: string;
  audience: string[];
  blocked: string[];
  recipients: DocumentRecipient[];
  versions: DocumentVersion[];
  activities: DocumentActivity[];
}
export const documentTags = ["راهنما", "محصول", "طراحی", "توسعه", "آموزش", "داخلی", "پژوهش", "کیفیت"];
export function initialDocument(document: DashboardDocument): DocumentPreview {
  return {
    ...document, description: "توضیحات نمایشی سند", order: 1, tags: ["راهنما"], bookmarked: false, deleted: false, hidden: false,
    password: "", publishLink: "", expiresAt: "", audienceMode: "white-list", audience: [], blocked: [],
    recipients: [{ id: `${document.id}-recipient-1`, name: "همکار نمونه", role: "بیننده" }],
    versions: [
      { id: `${document.id}-version-1`, name: "نسخهٔ ۳", content: document.content, approval: "draft", published: false, creator: "همکار نمونه", editedAt: "۱۴۰۵/۰۸/۲۴ · ۱۰:۳۰" },
      { id: `${document.id}-version-3-approved`, name: "نسخهٔ ۳", content: `محتوای تأییدشدهٔ نسخهٔ ۳ از «${document.title}»؛ مستقل از تغییرات پیش‌نویس`, approval: "approved", published: true, latest: true, creator: "مدیر نمونه", editedAt: "۱۴۰۵/۰۸/۲۳ · ۰۹:۱۵" },
      { id: `${document.id}-version-2`, name: "نسخهٔ ۲", content: `محتوای تأییدشدهٔ نسخهٔ ۲ از «${document.title}»`, approval: "approved", published: false, creator: "همکار نمونه", editedAt: "۱۴۰۵/۰۸/۲۰ · ۱۲:۰۰" },
      { id: `${document.id}-version-1-pending`, name: "نسخهٔ ۱", content: "محتوای پیش‌نویس در انتظار تأیید", approval: "draft", published: false, pending: true, creator: "نویسنده نمونه", editedAt: "۱۴۰۵/۰۸/۱۹ · ۱۱:۰۰" },
    ],
    activities: Array.from({ length: 36 }, (_, i) => ({ id: `${document.id}-activity-${i}`, name: `همکار نمونه ${i + 1}`, body: i % 2 ? "آیا این راهنما شامل نسخهٔ تازهٔ محصول هم می‌شود؟" : "پیشنهاد می‌کنم نمونه‌های بیشتری به این راهنما اضافه شود.", kind: i % 2 ? "questions" : "comments", state: i % 3 === 0 ? "pending" : "approved" })),
  };
}
