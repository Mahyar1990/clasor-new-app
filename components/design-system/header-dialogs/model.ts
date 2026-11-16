export interface HeaderInvitation { id: string; repoId: string; repoName: string; role: string; state: "pending" | "accepted" | "rejected" }
export function initialHeaderInvitations(): HeaderInvitation[] {
  return Array.from({ length: 14 }, (_, i) => ({ id: `invite-${i}`, repoId: `demo-repository-${i}`, repoName: ["دانش تیم محصول", "راهنمای همکاران", "مستندات طراحی", "پروژهٔ پژوهشی"][i % 4] + (i > 3 ? ` ${i + 1}` : ""), role: ["ویرایشگر", "بیننده", "نویسنده", "مدیر"][i % 4], state: "pending" }));
}
export const feedbackAccept = ".jpg,.jpeg,.png,.webp,.pdf,.txt,.mpeg,.mp4";
