import { initialDocument, type DocumentPreview } from "../document-dialogs/model";
export const publicationFeedback: Record<string, { likes: number; dislikes: number }> = { "publish-guide": { likes: 12, dislikes: 1 } };
export function publicationGuide(): DocumentPreview {
  const content = `این راهنما مسیر مطالعهٔ مستندات و کار با مخزن را توضیح می‌دهد.

## شروع به کار
از درخت سمت راست، دستهٔ موردنظر را باز کنید و سند را انتخاب کنید. مسیر انتخاب‌شده در بالای محتوا و روی شاخه‌های درخت مشخص است.

### انتخاب مخزن
در صفحهٔ اصلی داکس، نام مخزن را جستجو کنید و روی کارت آن بزنید. مستندات عمومی آن مخزن در اختیار شما قرار می‌گیرد.

### مطالعهٔ سند
این صفحه نسخهٔ تأییدشده و عمومی سند را نمایش می‌دهد. پیش‌نویس‌ها به‌صورت مستقل در پنل نگهداری می‌شوند.

## جستجو در مستندات
برای پیدا کردن یک عبارت در متن اسناد، جستجو در محتوا را انتخاب کنید. برای محدود کردن نتیجه‌ها می‌توانید از عنوان، نام سازنده و تگ استفاده کنید.

## فایل‌های پیوست
فهرست فایل‌های ضمیمه در نوار شناور سند در دسترس است. پیش از دانلود، نام و اندازهٔ فایل را بررسی کنید.

## فهرست سند
از گزینهٔ فهرست سند برای حرکت سریع بین سرفصل‌ها استفاده کنید. این پنل بین ساختار مخزن و محتوای سند قرار می‌گیرد.

## بازخورد
با پسندیدن یا نپسندیدن سند، بازخورد خود را ثبت کنید. می‌توانید انتخاب خود را تغییر دهید یا دوباره روی آن بزنید تا برداشته شود.`;
  const document = initialDocument({ id: "publish-guide", title: "راهنمای شروع به کار", shared: false, creator: "کاربر نمونه", category: "راهنما", content });
  return { ...document, repositoryId: "dashboard-repository-1", parentId: "library-folder-0", kind: "document", contentType: "classic", tags: ["راهنما", "آموزش"], createdAt: "2026-11-17", updatedAt: "2026-11-17", attachments: [{ id: "guide-text", name: "راهنمای مطالعه.txt", size: new TextEncoder().encode("راهنمای نمونهٔ مطالعهٔ مستندات کلاسور").length, dataUrl: "data:text/plain;charset=utf-8," + encodeURIComponent("راهنمای نمونهٔ مطالعهٔ مستندات کلاسور") }, { id: "guide-diagram", name: "نقشهٔ مستندات.svg", size: 728, dataUrl: "/repositories/default.svg" }], versions: document.versions.map(version => version.approval === "approved" && version.published ? { ...version, content } : version) };
}
