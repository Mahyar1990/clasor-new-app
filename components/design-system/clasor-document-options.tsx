import { FilePenLine, FileText, Pencil, Tags, Bookmark, MoveLeft, History, Globe, LockKeyhole, Users, Link2, Shield, EyeOff, KeyRound, MessageSquare, CircleHelp, Activity, Trash2 } from "lucide-react";
import type { GlassOption } from "@/components/ui/GlassOptionsMenu";

interface DocumentMenuState {
  bookmarked?: boolean;
  hidden?: boolean;
  hasPassword?: boolean;
  hasLink?: boolean;
  publicationControls?: boolean;
}
/** Dashboard publication controls stay disabled, as in the source; repository-owner catalogue fixtures can enable them. */
export function documentOptions(shared = false, state: DocumentMenuState = {}): GlassOption[] {
  const publicationDisabled = shared || !state.publicationControls;
  return [
    { id: "edit", label: "ویرایش", icon: <Pencil />, children: [
      { id: "edit-content", label: "ویرایش محتوا", icon: <FilePenLine />, disabled: shared },
      { id: "edit-document", label: "ویرایش سند", icon: <FileText />, disabled: shared },
      { id: "tags", label: "تگ های سند", icon: <Tags /> },
    ] },
    { id: "bookmark", label: state.bookmarked ? "حذف بوکمارک" : "بوکمارک کردن", icon: <Bookmark />, disabled: shared },
    { id: "move", label: "انتقال", icon: <MoveLeft />, disabled: shared },
    { id: "versions", label: "نسخه های سند", icon: <History />, separatorBefore: true },
    { id: "publish-version", label: "عمومی سازی آخرین نسخه", icon: <Globe />, disabled: shared },
    { id: "direct-access", label: "دسترسی مستقیم به سند", icon: <LockKeyhole /> },
    { id: "panel-access", label: "محدودیت دسترسی در پنل", icon: <Users />, disabled: publicationDisabled },
    { id: "publish-link", label: "ایجاد لینک انتشار", icon: <Link2 />, disabled: publicationDisabled },
    ...(state.hasLink ? [
      { id: "view-link", label: "لینک انتشار", icon: <Link2 /> },
      { id: "delete-link", label: "حذف لینک انتشار", icon: <Trash2 />, disabled: publicationDisabled },
    ] : []),
    { id: "publication", label: "محدودیت در انتشار", icon: <Shield />, children: [
      { id: "hide", label: state.hidden ? "عدم مخفی سازی" : "مخفی سازی", icon: <EyeOff />, disabled: publicationDisabled },
      { id: "audience", label: "محدودیت کاربران", icon: <Users />, disabled: publicationDisabled },
      { id: "password", label: state.hasPassword ? "ویرایش رمز عبور" : "اعمال رمز عبور", icon: <KeyRound />, disabled: publicationDisabled },
      ...(state.hasPassword ? [{ id: "delete-password", label: "حذف رمز عبور", icon: <KeyRound />, disabled: publicationDisabled }] : []),
    ] },
    { id: "activity", label: "فعالیت های سند", icon: <Activity />, separatorBefore: true, children: [
      { id: "questions", label: "پرسش و پاسخ روی سند", icon: <CircleHelp /> },
      { id: "comments", label: "نظرات روی سند", icon: <MessageSquare /> },
    ] },
    { id: "delete", label: "حذف سند", icon: <Trash2 />, destructive: true, disabled: shared, separatorBefore: true },
  ];
}
