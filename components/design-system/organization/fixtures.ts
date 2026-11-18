import type { OrganizationState } from "./model";
/** Fictional organization, users and job positions; no live branch data is copied. */
export function initialOrganizationState(): OrganizationState {
  return {
    branches: [
      { id: "head-office", name: "دفتر مرکزی" },
      { id: "product", name: "معاونت محصول", parentId: "head-office" },
      { id: "design", name: "تیم طراحی", parentId: "product" },
      { id: "research", name: "پژوهش کاربران", parentId: "design" },
      { id: "engineering", name: "تیم توسعه", parentId: "product" },
      { id: "operations", name: "معاونت عملیات", parentId: "head-office" },
      { id: "support", name: "پشتیبانی", parentId: "operations" },
      { id: "regional", name: "شعبه منطقه‌ای" },
      { id: "education", name: "مرکز آموزش", parentId: "regional" },
      ...Array.from({ length: 12 }, (_, i) => ({ id: `regional-unit-${i}`, name: `واحد منطقه‌ای ${i + 1}`, parentId: "regional" })),
    ],
    positions: [
      { id: "head-manager", branchId: "head-office", name: "مدیر شعبه" },
      { id: "head-expert", branchId: "head-office", name: "کارشناس" },
      { id: "product-manager", branchId: "product", name: "مدیر محصول" },
      { id: "design-lead", branchId: "design", name: "راهبر طراحی" },
      { id: "designer", branchId: "design", name: "طراح محصول" },
      { id: "researcher", branchId: "research", name: "پژوهشگر" },
    ],
    members: [
      ...Array.from({ length: 13 }, (_, i) => ({ id: `head-member-${i}`, branchId: "head-office", user: { id: `org-user-${i}`, name: `همکار نمونه ${i + 1}`, username: `colleague.${i + 1}`, avatar: i === 0 ? "/avatars/preview-user.svg" : undefined }, positionId: i === 0 ? "head-manager" : "head-expert" })),
      { id: "product-member", branchId: "product", user: { id: "product-user", name: "نگار نمونه", username: "negar.sample" }, positionId: "product-manager" },
      { id: "design-member", branchId: "design", user: { id: "design-user", name: "آرمان نمونه", username: "arman.sample" }, positionId: "design-lead" },
    ],
  };
}
