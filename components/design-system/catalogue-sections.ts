export const catalogueSections = [
  { id: "colors", title: "رنگ و هویت" },
  { id: "typography", title: "تایپوگرافی و نوشتار" },
  { id: "geometry", title: "فاصله و هندسه" },
  { id: "layout", title: "چیدمان و کنترل‌های شیشه‌ای" },
  { id: "buttons", title: "دکمه و اقدام" },
  { id: "inputs", title: "ورودی و انتخاب" },
  { id: "status", title: "وضعیت و هویت" },
  { id: "navigation", title: "ناوبری" },
  { id: "data", title: "داده و جدول" },
  { id: "feedback", title: "بازخورد" },
  { id: "overlays", title: "لایه و پیام" },
  { id: "patterns", title: "الگوهای ترکیبی" },
  { id: "accessibility", title: "دسترس‌پذیری" },
  { id: "handoff", title: "تحویل طراحی" },
] as const;

export type CatalogueSection = typeof catalogueSections[number]["id"];
export function catalogueHref(section: CatalogueSection) {
  return section === "colors" ? "/" : `/design-system/${section}`;
}
