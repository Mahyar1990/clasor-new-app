"use client";
import { useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { useRepositoryPreview, type PreviewRecord } from "./context";
export function downloadFile(item: PreviewRecord) {
  const url = item.file ? URL.createObjectURL(item.file) : "/sample-content/research-report.pdf";
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = item.name;
  anchor.click();
  if (item.file) setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function FileActionPage({ item, action }: { item: PreviewRecord; action: string }) {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const [name, setName] = useState(item.name);
  const labels: Record<string, string> = { edit: "ذخیره نام فایل", publish: "عمومی کردن فایل", delete: "حذف فایل" };
  return <form data-test-id="repo-file-action" className="space-y-3" onSubmit={event => {
    event.preventDefault();
    setRepo(current => ({ ...current, files: action === "delete" ? current.files.filter(file => file.id !== item.id) : current.files.map(file => file.id === item.id ? { ...file, ...(action === "edit" ? { name: name.trim() } : { published: true }) } : file) }));
    back();
  }}>
    {action === "edit" ? <TextField data-test-id="repo-file-edit-name" label="نام فایل" value={name} onValueChange={setName} required maxLength={250} /> : <p data-test-id="repo-file-action-target" className="text-xs wrap-anywhere">{action === "delete" ? "آیا از حذف این فایل مطمئن هستید؟" : "این فایل در پیش‌نمایش عمومی شود؟"} {item.name}</p>}
    <Button data-test-id="repo-file-action-submit" type="submit" variant={action === "delete" ? "destructive" : "default"} disabled={action === "edit" && !name.trim()}>{labels[action]}</Button>
  </form>;
}
