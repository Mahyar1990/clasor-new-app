"use client";

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
export type PreviewRole = "مالک" | "مدیر" | "ویرایشگر";
export interface PreviewRecord { id: string; name: string; role?: string; detail?: string; kind?: string; status?: string; value?: string; uploadedAt?: string; file?: File; published?: boolean; avatarUrl?: string; description?: string; memberIds?: string[]; settings?: Record<string, boolean>; editedAt?: string; version?: string; content?: string }
export interface RepositoryPreview {
  id: string;
  imageType?: string;
  tags?: string[];
  name: string; description: string; image: string; role: PreviewRole; bookmarked: boolean; archived: boolean; deleted: boolean; left: boolean; published: boolean;
  pendingMembers?: PreviewRecord[];
  members: PreviewRecord[]; groups: PreviewRecord[]; files: PreviewRecord[]; keys: PreviewRecord[]; requests: PreviewRecord[];
  joinLinks: { id: string; role: string; url: string; password: string; expiresAt: string }[];
  notifications: Record<string, boolean>;
}
export function initialRepository(): RepositoryPreview {
  return {
    id: "repository-sample", name: "مستندات محصول", description: "راهنماها، تصمیم‌های طراحی و دانش مشترک تیم محصول", tags: ["راهنما", "محصول", "طراحی", "آموزش"], image: "purple", role: "مالک", bookmarked: false, archived: false, deleted: false, left: false, published: true,
    members: Array.from({ length: 12 }, (_, i) => ({ id: `person-${i}`, name: `همکار نمونه ${i + 1}`, role: i === 0 ? "مالک" : "ویرایشگر", detail: `person${i + 1}@example.com` })),
    pendingMembers: Array.from({ length: 3 }, (_, i) => ({ id: `invitation-${i}`, name: `کاربر دعوت‌شده ${i + 1}`, role: "بیننده", detail: `pending${i + 1}@example.com` })),
    groups: [{ id: "design", name: "تیم طراحی", role: "ویرایشگر", detail: "۴ عضو", memberIds: ["person-1", "person-2", "person-3", "person-4"] }, { id: "product", name: "تیم محصول", role: "بیننده", detail: "۶ عضو", memberIds: ["person-2", "person-3", "person-4", "person-5", "person-6", "person-7"] }],
    files: Array.from({ length: 12 }, (_, i) => ({ id: `file-${i}`, name: `راهنمای محصول ${i + 1}.pdf`, detail: "PDF · ۲۴۰ کیلوبایت", uploadedAt: "۱۴۰۵/۰۸/۲۴ · ۱۰:۳۰", published: false })),
    keys: [{ id: "key-1", name: "کلید ابزار نمونه", value: "DEMO-PUBLIC-KEY-LOCAL-ONLY", detail: "کلید نمایشی؛ قابل استفاده در سرویس نیست" }],
    requests: Array.from({ length: 16 }, (_, i) => ({ id: `request-${i}`, name: `سند نمونه ${i + 1}`, detail: `همکار نمونه ${i + 1}`, kind: ["draft", "version", "access", "question"][i % 4], status: "pending", editedAt: "۱۴۰۵/۰۸/۲۴ · ۱۰:۳۰", version: String(i + 1), content: `محتوای نسخهٔ مورد درخواست از سند نمونه ${i + 1}` })),
    joinLinks: [],
    notifications: { "نسخهٔ جدید سند": true, "درخواست تأیید نسخه": true, "درخواست دسترسی": true, "پرسش جدید": true, "نظر جدید": false, "تغییر اعضای مخزن": false },
  };
}
const Context = createContext<{ repo: RepositoryPreview; setRepo: Dispatch<SetStateAction<RepositoryPreview>> } | null>(null);
export function RepositoryPreviewProvider({ children, value, onChange }: { children: ReactNode; value?: RepositoryPreview; onChange?: Dispatch<SetStateAction<RepositoryPreview>> }) {
  const [repo, setRepo] = useState(initialRepository);
  return <Context.Provider value={{ repo: value ?? repo, setRepo: onChange ?? setRepo }}>{children}</Context.Provider>;
}
export function useRepositoryPreview() {
  const value = useContext(Context);
  if (!value) throw new Error("Repository preview requires its provider");
  return value;
}
