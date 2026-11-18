/** Fictional administrative totals and messages; never copied from a source account. */
export const adminTotals = {
  repositories: { total: 128, super: 8 },
  storage: { used: 18.5, remaining: 45.5, total: 64 },
  users: { active: 96, inactive: 24, total: 120 },
  documents: { public: 244, draft: 46, total: 420 },
};
const messages = ["لطفاً راهنمای استفاده از مخزن‌ها را کامل‌تر کنید.", "نمایش اسناد در صفحه کوچک بهتر شده است.", "پیشنهاد می‌کنم نمونه‌های آموزشی بیشتری اضافه شود.", "برای ساخت نسخه جدید به توضیح بیشتری نیاز دارم."];
export const adminFeedback = Array.from({ length: 24 }, (_, index) => ({ id: String(2000 + index), entityId: String(800 + index % 5), description: messages[index % messages.length] }));
export type AdminFeedback = typeof adminFeedback[number];
