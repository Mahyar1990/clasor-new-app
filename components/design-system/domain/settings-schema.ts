import { panelPaletteDefaults } from "@/lib/design-system/panel-palette";
export const baseFields = [
  { id: "name", label: "نام دامنه", value: "مستندات کلاسور", group: "پایه" },
  { id: "description", label: "توضیحات دامنه", value: "مرجع مستندات و راهنمای محصولات", group: "پایه" },
  { id: "logo", label: "لوگو", value: "/repositories/default.svg", group: "پایه" },
  { id: "podlytics", label: "شناسه پروژه در podlytics", value: "sample-analytics", group: "سرویس‌ها" },
  { id: "blogBox", label: "شناسه پروژه در blogBox", value: "sample-blog", group: "سرویس‌ها" },
  { id: "notificationAppId", label: "شناسه notificationAppId", value: "sample-app", group: "سرویس‌ها" },
  { id: "notificationSystemAppId", label: "شناسه notificationSystemAppId", value: "sample-system", group: "سرویس‌ها" },
];
export const advancedFlags = [
  { id: "domainTags", label: "استفاده از مدیریت تگ دامنه در مخزن‌ها" },
  { id: "createRepository", label: "دسترسی ایجاد مخزن" },
  { id: "landing", label: "نمایش مخزن‌های منتشرشده در صفحه landing" },
  { id: "privateNews", label: "نمایش خبرنامه خصوصی" },
  { id: "reactions", label: "قابلیت نمایش لایک / دیسلایک" },
  { id: "comments", label: "نمایش قسمت نظرات" },
  { id: "approveComments", label: "تأیید ادمین برای نظرات" },
  { id: "questions", label: "نمایش قسمت سوالات" },
  { id: "approveQuestions", label: "تأیید ادمین برای سوالات" },
  { id: "answers", label: "امکان پاسخ به سوال" },
  { id: "personal", label: "فعال‌سازی مستندات شخصی" },
  { id: "defaultFont", label: "استفاده از فونت پیش‌فرض" },
  { id: "branches", label: "فعال‌سازی شعبات" },
];
export const colorFields = [
  {
    "id": "color-0",
    "label": "رنگ اصلی",
    "group": "رنگ‌های اصلی",
    "description": "استفاده در: دکمه‌های فرم‌ها، چک باکس‌ها، نوار منوی انتخاب شده، عناصر تعاملی"
  },
  {
    "id": "color-1",
    "label": "رنگ اصلی روشن",
    "group": "رنگ‌های اصلی",
    "description": "استفاده در: پس‌زمینه عناصر، حالت‌های هاور، بج‌ها"
  },
  {
    "id": "color-2",
    "label": "پس‌زمینه اصلی",
    "group": "رنگ‌های پس‌زمینه",
    "description": "استفاده در: پس‌زمینه اصلی صفحات"
  },
  {
    "id": "color-3",
    "label": "پس‌زمینه ثانویه",
    "group": "رنگ‌های پس‌زمینه",
    "description": "استفاده در: پس‌زمینه بخش‌های ثانویه"
  },
  {
    "id": "color-4",
    "label": "پس‌زمینه ثانویه روشن",
    "group": "رنگ‌های پس‌زمینه",
    "description": "استفاده در: پس‌زمینه عناصر ثانویه با تن روشن‌تر"
  },
  {
    "id": "color-5",
    "label": "پس‌زمینه سوم",
    "group": "رنگ‌های پس‌زمینه",
    "description": "استفاده در: پس‌زمینه عناصر تکمیلی"
  },
  {
    "id": "color-6",
    "label": "پس‌زمینه کارت",
    "group": "رنگ‌های پس‌زمینه",
    "description": "استفاده در: پس‌زمینه کارت‌ها، پنل‌ها، کادرهای محتوا"
  },
  {
    "id": "color-7",
    "label": "رنگ خطا",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: پیام‌های خطا، حالت‌های ناموفق"
  },
  {
    "id": "color-8",
    "label": "رنگ هشدار",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: هشدارهای بحرانی، اخطارهای مهم"
  },
  {
    "id": "color-9",
    "label": "رنگ موفقیت",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: پیام‌های موفقیت، وضعیت‌های تایید شده"
  },
  {
    "id": "color-10",
    "label": "رنگ موفقیت روشن",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: پس‌زمینه پیام‌های موفقیت"
  },
  {
    "id": "color-11",
    "label": "رنگ اطلاعات",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: پیام‌های اطلاع‌رسانی، راهنما"
  },
  {
    "id": "color-12",
    "label": "رنگ اطلاعات روشن",
    "group": "رنگ‌های وضعیت",
    "description": "استفاده در: پس‌زمینه پیام‌های اطلاع‌رسانی"
  },
  {
    "id": "color-13",
    "label": "متن اصلی",
    "group": "رنگ‌های متن",
    "description": "استفاده در: متن‌های اصلی، عناوین"
  },
  {
    "id": "color-14",
    "label": "متن ثانویه",
    "group": "رنگ‌های متن",
    "description": "استفاده در: توضیحات، زیرمتن‌ها"
  },
  {
    "id": "color-15",
    "label": "متن راهنما",
    "group": "رنگ‌های متن",
    "description": "استفاده در: متن‌های راهنما و توضیحات اضافی"
  },
  {
    "id": "color-16",
    "label": "متن پیش‌فرض",
    "group": "رنگ‌های متن",
    "description": "استفاده در: متن پیش‌فرض فیلدهای ورودی"
  },
  {
    "id": "color-17",
    "label": "متن غیرفعال",
    "group": "رنگ‌های متن",
    "description": "استفاده در: متن‌های غیرفعال"
  },
  {
    "id": "color-18",
    "label": "متن اصلی نرمال",
    "group": "رنگ‌های متن",
    "description": "استفاده در: متن‌های اصلی با وزن معمولی"
  },
  {
    "id": "color-19",
    "label": "متن لینک",
    "group": "رنگ‌های متن",
    "description": "استفاده در: لینک‌ها و عناصر قابل کلیک"
  },
  {
    "id": "color-20",
    "label": "آیکون فعال",
    "group": "رنگ‌های آیکون",
    "description": "استفاده در: آیکون‌های فعال، نمادهای منوی انتخاب شده"
  },
  {
    "id": "color-21",
    "label": "آیکون هاور",
    "group": "رنگ‌های آیکون",
    "description": "استفاده در: حالت هاور آیکون‌ها"
  },
  {
    "id": "color-22",
    "label": "خاکستری 50",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: پس‌زمینه لغو"
  },
  {
    "id": "color-23",
    "label": "خاکستری 100",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: پس‌زمینه‌های روشن"
  },
  {
    "id": "color-24",
    "label": "خاکستری 200",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: حاشیه‌ها، منوی فعال"
  },
  {
    "id": "color-25",
    "label": "خاکستری 300",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: جداکننده‌ها"
  },
  {
    "id": "color-26",
    "label": "خاکستری 400",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: متن راهنما، آیکون عادی"
  },
  {
    "id": "color-27",
    "label": "خاکستری 500",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: متن ثانویه، آیکون هاور"
  },
  {
    "id": "color-28",
    "label": "خاکستری 700",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: متن‌های تیره"
  },
  {
    "id": "color-29",
    "label": "خاکستری 800",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: آیکون فعال"
  },
  {
    "id": "color-30",
    "label": "خاکستری 900",
    "group": "رنگ‌های خاکستری",
    "description": "استفاده در: متن اصلی"
  },
  {
    "id": "color-31",
    "label": "نارنجی 100",
    "group": "رنگ‌های اضافی",
    "description": "استفاده در: عناصر نارنجی روشن"
  },
  {
    "id": "color-32",
    "label": "آبی-سبز",
    "group": "رنگ‌های اضافی",
    "description": "استفاده در: عناصر با رنگ آبی-سبز"
  },
  {
    "id": "color-33",
    "label": "حاشیه معمولی",
    "group": "رنگ‌های حاشیه",
    "description": "استفاده در: حاشیه کارت‌ها، جداکننده‌ها، فیلدهای ورودی"
  }
].map(field => ({ ...field, value: panelPaletteDefaults[field.id] }));
