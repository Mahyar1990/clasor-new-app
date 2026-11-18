"use client";
import { useId, useRef, useState, type RefObject } from "react";
import { FolderOpen } from "lucide-react";
import { NavigableGlassModal } from "@/components/ui/DialogNavigation";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { Button } from "@/components/ui/button";
import { RepositoryTags } from "./tags";
import { EditRepository } from "./edit";
import { ConfirmRepository } from "./confirm";
import { RepositoryNotifications } from "./notifications";
import { RepositoryFiles, RepositoryKeys } from "./management";
import { RepositoryRequests } from "./requests";
import { RepositorySharing } from "./sharing";
import { CopyField } from "@/components/ui/CopyField";
import { RepositoryInfo } from "./metadata";
import { useRepositoryPreview } from "./context";
export interface DialogSelection { id: string; label: string; trigger: HTMLElement | null }
export function RepositoryActionDialog({ selection, close, announce, fallbackFocusRef }: { selection: DialogSelection; close: () => void; announce: (text: string) => void; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const { repo } = useRepositoryPreview();
  const formId = useId();
  const [confirmation, setConfirmation] = useState("");
  const action = selection.id;
  const focusFallback = useRef(false);
  const forms = ["edit", "notifications", "bookmark", "archive", "restore", "delete", "leave"];
  const confirm = ["bookmark", "archive", "restore", "delete", "leave"].includes(action);
  const titles: Record<string, string> = { edit: "ویرایش مخزن", share: "اشتراک‌گذاری مخزن", files: "مدیریت فایل‌های مخزن", requests: "درخواست‌های تأیید نسخه", archive: "بایگانی مخزن", delete: "حذف مخزن" };
  const labels: Record<string, string> = { edit: "ذخیره تغییرات", notifications: "ذخیره تنظیمات", bookmark: repo.bookmarked ? "برداشتن نشان" : "نشان کردن", archive: "بایگانی مخزن نمونه", restore: "بازگردانی مخزن نمونه", delete: "حذف مخزن نمونه", leave: "ترک مخزن نمونه" };
  function done() { focusFallback.current = ["delete", "archive", "leave", "restore"].includes(action); announce(`${selection.label} در پیش‌نمایش اعمال شد.`); close(); }
  return <NavigableGlassModal testId={`repository-dialog-${action}`} open onOpenChange={open => { if (!open) close(); }} title={titles[action] ?? selection.label} description={`${repo.name} · ${repo.role}`} compact surface="liquid" size={["share", "files", "requests"].includes(action) ? "lg" : confirm ? "sm" : "md"}
    finalFocus={() => focusFallback.current && fallbackFocusRef?.current ? fallbackFocusRef.current : selection.trigger?.isConnected ? selection.trigger : fallbackFocusRef?.current ?? true}
    icon={<GlassEmblem data-test-id="repository-dialog-icon" className="size-8"><FolderOpen aria-hidden="true" className="size-4" /></GlassEmblem>}
    footer={<><Button data-test-id="repository-dialog-cancel" variant="outline" onClick={close}>{forms.includes(action) ? "انصراف" : "بستن"}</Button>{forms.includes(action) && <Button data-test-id="repository-dialog-submit" type="submit" form={formId} variant={action === "delete" || action === "leave" ? "destructive" : "default"} disabled={action === "delete" && confirmation !== repo.name}>{labels[action]}</Button>}</>}>
    {action === "tags" && <RepositoryTags />}
    {action === "info" && <RepositoryInfo />}
    {action === "edit" && <EditRepository formId={formId} done={done} />}
    {action === "share" && <RepositorySharing />}
    {action === "published" && <CopyField testId="repo-published-link" label="نشانی صفحهٔ منتشرشدهٔ نمونه" value={`https://example.com/publish/${encodeURIComponent(repo.id)}`} />}
    {action === "notifications" && <RepositoryNotifications formId={formId} done={done} />}
    {action === "keys" && <RepositoryKeys />}
    {action === "files" && <RepositoryFiles />}
    {["requests", "document-requests", "questions"].includes(action) && <RepositoryRequests action={action} />}
    {confirm && <ConfirmRepository action={action} formId={formId} confirmation={confirmation} onConfirmation={setConfirmation} done={done} />}
  </NavigableGlassModal>;
}
