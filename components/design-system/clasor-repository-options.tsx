import { Pencil, Tags, Files, Inbox, Bookmark, Share2, Bell, KeyRound, LockKeyhole, Archive, Trash2, CircleHelp, LogOut, FolderOpen, Globe } from "lucide-react";
import type { GlassOption } from "@/components/ui/GlassOptionsMenu";

/** Dashboard menu fixtures based on the source's owner/admin/member distinctions. */
export function repositoryOptions(role: string, published = false): GlassOption[] {
  const owner = role === "مالک";
  const manage = owner || role === "مدیر";
  return [
    { id: "info", label: "اطلاعات مخزن", icon: <FolderOpen /> },
    ...(manage ? [
      { id: "edit", label: "ویرایش", icon: <Pencil /> },
      { id: "tags", label: "مدیریت تگ‌های مخزن", icon: <Tags /> },
      { id: "files", label: "مدیریت فایل", icon: <Files /> },
      { id: "requests", label: "درخواست‌ها", icon: <Inbox /> },
    ] : []),
    { id: "bookmark", label: "بوکمارک کردن", icon: <Bookmark />, separatorBefore: manage },
    { id: "share", label: "اشتراک گذاری", icon: <Share2 /> },
    { id: "notifications", label: "اعلانات من", icon: <Bell /> },
    { id: "keys", label: "کلید های مخزن", icon: <KeyRound /> },
    ...(published ? [{ id: "published", label: "مخزن منتشرشده", icon: <Globe /> }] : []),
    ...(owner ? [
      { id: "document-requests", label: "درخواست‌های دسترسی سند", icon: <LockKeyhole />, separatorBefore: true },
      { id: "questions", label: "پرسش‌های مخزن", icon: <CircleHelp /> },
      { id: "archive", label: "بایگانی", icon: <Archive />, separatorBefore: true },
      { id: "delete", label: "حذف", icon: <Trash2 />, destructive: true },
    ] : [{ id: "leave", label: "ترک مخزن", icon: <LogOut />, destructive: true, separatorBefore: true }]),
  ];
}
