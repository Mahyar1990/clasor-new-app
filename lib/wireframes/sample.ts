// Small, entirely fictional fixtures for layout review; not product permission models.
export const repositories = [
  { id: "personal", name: "فضای شخصی", description: "یادداشت‌ها و اسنادی که برای خودتان نگه می‌دارید.", owner: "شما", count: 4, role: "مالک", initials: "ش" },
  { id: "team", name: "تیم محصول", description: "یک جای مشترک برای تصمیم‌ها و مستندات تیم.", owner: "سارا کریمی", count: 3, role: "ویرایشگر", initials: "ت" },
  { id: "research", name: "پژوهش و ایده‌ها", description: "فضایی تازه برای شروع پژوهش بعدی.", owner: "شما", count: 0, role: "مالک", initials: "پ" },
];

export const folders = [
  { id: "notes", repoId: "personal", parentId: null, name: "یادداشت‌ها", description: "از اولین ایده تا تصمیم نهایی" },
  { id: "planning", repoId: "team", parentId: null, name: "برنامه‌ریزی", description: "مسیر و اولویت‌های تیم" },
  { id: "quarter", repoId: "team", parentId: "planning", name: "فصل پاییز", description: "برنامه‌های این فصل" },
];

export const documents = [
  { id: "guide", repoId: "personal", folderId: null, title: "راهنمای شروع یک پروژه تازه", type: "متن", owner: "شما", updated: "امروز، ۱۰:۳۰", status: "draft", shared: false, excerpt: "چطور ایده‌ها را به یک مسیر روشن و قابل پیگیری تبدیل کنیم؟" },
  { id: "ideas", repoId: "personal", folderId: "notes", title: "یادداشت‌های پراکنده، ایده‌های ماندگار", type: "متن", owner: "شما", updated: "دیروز، ۱۶:۴۵", status: "draft", shared: false, excerpt: "جایی برای ثبت ایده‌ها، پیش از آنکه فراموش شوند." },
  { id: "report", repoId: "personal", folderId: null, title: "گزارش پژوهش کاربران — Research.pdf", type: "PDF", owner: "شما", updated: "۶ آبان، ۰۹:۱۵", status: "approved", shared: false, excerpt: "خلاصه یافته‌های پژوهش و فرصت‌های بهبود تجربه کاربر." },
  { id: "sketch", repoId: "personal", folderId: null, title: "طرح اولیه فضای کار", type: "تصویر", owner: "شما", updated: "۴ آبان، ۱۴:۲۰", status: "draft", shared: false, excerpt: "طرح مفهومی برای یک فضای کار ساده و منظم." },
  { id: "roadmap", repoId: "team", folderId: "quarter", title: "نقشه راه پاییز", type: "متن", owner: "سارا کریمی", updated: "امروز، ۰۹:۴۰", status: "pending", shared: true, excerpt: "تمرکز این فصل: پیدا کردن سریع‌تر اسناد و همکاری روشن‌تر." },
  { id: "principles", repoId: "team", folderId: "planning", title: "اصول همکاری و نگهداری مستندات تیم محصول", type: "متن", owner: "سارا کریمی", updated: "دیروز، ۱۱:۰۰", status: "approved", shared: true, excerpt: "توافق‌های کوچک برای ساختن یک حافظه مشترک در تیم." },
  { id: "meeting", repoId: "team", folderId: null, title: "جمع‌بندی جلسه طراحی", type: "متن", owner: "آرمان رضایی", updated: "۵ آبان، ۱۳:۱۰", status: "draft", shared: true, excerpt: "تصمیم‌ها، پرسش‌های باز و قدم بعدی تیم طراحی." },
] as const;

export type SampleDocument = (typeof documents)[number];
export type WireframeView = "documents" | "shared" | "repositories" | "repository" | "document";

export function normalizeSearch(value: string) {
  return value.replace(/ي/g, "ی").replace(/ك/g, "ک").trim().toLocaleLowerCase("fa");
}
