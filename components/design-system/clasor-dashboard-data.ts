/** Fictional preview records; no account names or source document contents are copied. */
const titles = ["راهنمای شروع همکاری", "صورت‌جلسه طراحی", "برنامه انتشار محصول", "گزارش پژوهش کاربران", "چک‌لیست کنترل کیفیت", "راهنمای پشتیبانی", "معماری سامانه", "فرایند بررسی محتوا", "برنامه آموزش تیم", "گزارش ماهانه", "راهنمای امنیت", "یادداشت‌های پروژه"];
export const dashboardDocuments = titles.map((title, index) => ({
  id: `dashboard-document-${index + 1}`, title, shared: index % 3 === 0,
  category: ["راهنما", "جلسات", "محصول", "پژوهش"][index % 4],
  creator: ["کاربر نمونه", "تیم طراحی", "تیم محصول"][index % 3],
  content: `محتوای نمایشی «${title}». این سند ساختگی است و به حساب یا سرویس کلاسور متصل نیست.`,
}));
export type DashboardDocument = typeof dashboardDocuments[number];
const names = ["مستندات محصول", "دانش تیم طراحی", "راهنمای توسعه", "پژوهش و تجربه کاربری", "پشتیبانی مشتریان", "آموزش همکاران", "زیرساخت و عملیات", "برنامه‌ریزی پروژه‌ها"];
export const dashboardRepositories = Array.from({ length: 24 }, (_, index) => ({
  id: `dashboard-repository-${index + 1}`,
  name: `${names[index % names.length]}${index >= names.length ? ` · ${new Intl.NumberFormat("fa").format(Math.floor(index / names.length) + 1)}` : ""}`,
  shared: index % 2 !== 0,
  published: index % 4 === 0,
  role: ["مالک", "مدیر", "ویرایشگر"][index % 3],
  updatedAt: `2026-11-${String(14 - index % 12).padStart(2, "0")}T08:30:00Z`,
}));
export type DashboardRepository = typeof dashboardRepositories[number];
