import type { AdminFeedback } from "./model";
export type { AdminFeedback } from "./model";
/** Fictional administrative totals and messages; never copied from a source account. */
export const adminTotals = {
  repositories: { total: 128, super: 8 },
  storage: { used: 18.5, remaining: 45.5, total: 64 },
  users: { active: 96, inactive: 24, total: 120 },
  documents: { public: 244, draft: 46, total: 420 },
};
const messages = ["لطفاً راهنمای استفاده از مخزن‌ها را کامل‌تر کنید.", "نمایش اسناد در صفحه کوچک بهتر شده است.", "پیشنهاد می‌کنم نمونه‌های آموزشی بیشتری اضافه شود.", "برای ساخت نسخه جدید به توضیح بیشتری نیاز دارم."];
const attachedNote = "شرح تکمیلی بازخورد نمونه برای بررسی فایل دانلودشده.";
const attachmentSamples = [
  { id: "note", name: "توضیحات تکمیلی.txt", size: new TextEncoder().encode(attachedNote).length, url: "data:text/plain;charset=utf-8," + encodeURIComponent(attachedNote) },
  { id: "report", name: "گزارش نمونه.pdf", size: 2288, url: "/sample-content/research-report.pdf" },
  { id: "screenshot", name: "تصویر نمونه.png", size: 64623, url: "/sample-content/research-report.png" },
];
export const adminFeedback: AdminFeedback[] = Array.from({ length: 24 }, (_, index) => ({ id: String(2000 + index), entityId: String(800 + index % 5), description: messages[index % messages.length] + (index === 23 ? "\n\n" + "این متن کامل برای نمایش جزئیات بازخورد و بررسی پیوست‌های ارسال‌شده است. ".repeat(12) : ""), attachments: index % 3 ? attachmentSamples : [] }));
