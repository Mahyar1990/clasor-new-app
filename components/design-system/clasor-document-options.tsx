import { FilePenLine, FileText, Pencil, Tags, Bookmark, MoveLeft, History, Globe, LockKeyhole, Users, Link2, Shield, EyeOff, KeyRound, MessageSquare, CircleHelp, Activity, Trash2 } from "lucide-react";
import type { GlassOption } from "@/components/ui/GlassOptionsMenu";

/** Source-aligned dashboard fixtures; these disabled states are not an authorization model. */
export function documentOptions(shared = false): GlassOption[] {
  return [
    { id: "edit", label: "ویرایش", icon: <Pencil />, children: [
      { id: "edit-content", label: "ویرایش محتوا", icon: <FilePenLine />, disabled: shared },
      { id: "edit-document", label: "ویرایش سند", icon: <FileText />, disabled: shared },
      { id: "tags", label: "تگ های سند", icon: <Tags /> },
    ] },
    { id: "bookmark", label: "بوکمارک کردن", icon: <Bookmark />, disabled: shared },
    { id: "move", label: "انتقال", icon: <MoveLeft />, disabled: shared },
    { id: "versions", label: "نسخه های سند", icon: <History />, separatorBefore: true },
    { id: "publish-version", label: "عمومی سازی آخرین نسخه", icon: <Globe />, disabled: shared },
    { id: "direct-access", label: "دسترسی مستقیم به سند", icon: <LockKeyhole /> },
    { id: "panel-access", label: "محدودیت دسترسی در پنل", icon: <Users />, disabled: true },
    { id: "publish-link", label: "ایجاد لینک انتشار", icon: <Link2 />, disabled: true },
    { id: "publication", label: "محدودیت در انتشار", icon: <Shield />, children: [
      { id: "hide", label: "مخفی سازی", icon: <EyeOff />, disabled: true },
      { id: "audience", label: "محدودیت کاربران", icon: <Users />, disabled: true },
      { id: "password", label: "اعمال رمز عبور", icon: <KeyRound />, disabled: true },
    ] },
    { id: "activity", label: "فعالیت های سند", icon: <Activity />, separatorBefore: true, children: [
      { id: "questions", label: "پرسش و پاسخ روی سند", icon: <CircleHelp /> },
      { id: "comments", label: "نظرات روی سند", icon: <MessageSquare /> },
    ] },
    { id: "delete", label: "حذف سند", icon: <Trash2 />, destructive: true, disabled: shared, separatorBefore: true },
  ];
}
