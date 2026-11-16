import type { DashboardDocument } from "../clasor-dashboard-data";

export interface DocumentRecipient { id: string; name: string; role: string }
export interface DocumentVersion { id: string; name: string; content: string; approval: "draft" | "approved"; published: boolean }
export interface DocumentActivity { id: string; name: string; body: string; kind: "comments" | "questions"; state: "approved" | "pending" | "rejected"; answer?: string }
export interface DocumentPreview extends DashboardDocument {
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
    versions: [1, 2, 3].map((number, i) => ({ id: `${document.id}-version-${number}`, name: `نسخهٔ ${3 - i}`, content: i === 0 ? document.content : `محتوای نسخهٔ پیشین ${3 - i} از «${document.title}»`, approval: i === 0 ? "draft" : "approved", published: false })),
    activities: Array.from({ length: 36 }, (_, i) => ({ id: `${document.id}-activity-${i}`, name: `همکار نمونه ${i + 1}`, body: i % 2 ? "آیا این راهنما شامل نسخهٔ تازهٔ محصول هم می‌شود؟" : "پیشنهاد می‌کنم نمونه‌های بیشتری به این راهنما اضافه شود.", kind: i % 2 ? "questions" : "comments", state: i % 3 === 0 ? "pending" : "approved" })),
  };
}
