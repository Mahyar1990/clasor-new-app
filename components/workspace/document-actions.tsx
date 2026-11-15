"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, FolderInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { useDocumentStore } from "@/components/workspace/document-store";
import { canManageDocument } from "@/lib/workspace/mutations";
import { folderPath } from "@/lib/workspace/navigation";
import { folders, repositories, sampleUser } from "@/lib/workspace/fixtures";
import type { IDocument } from "@/interface/document";

export default function DocumentActions({ document, back }: { document: IDocument; back: string }) {
  const { mutate } = useDocumentStore();
  const router = useRouter();
  const [renameOpen, setRenameOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [title, setTitle] = useState(document.title);
  const [folder, setFolder] = useState(document.folderId ?? "root");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const renamedTitle = title.trim();
  const canRename = Boolean(renamedTitle) && renamedTitle !== document.title;
  const canMove = folder !== (document.folderId ?? "root");
  const destination = folder === "root" ? "ریشه مخزن" : (folderPath(folders, document.repositoryId, folder) ?? []).map(item => item.name).join(" / ");
  if (!canManageDocument(document, repositories, sampleUser.id)) return <p data-test-id="document-actions-p-1" className="ws-formHint">این سند در نسخه نمونه فقط برای مطالعه در دسترس است.</p>;
  function perform(type: "rename" | "move") {
    if (type === "rename" ? !canRename : !canMove) return;
    try {
      const at = new Date().toISOString();
      mutate(type === "rename" ? { type, id: document.id, title, at } : { type, id: document.id, folderId: folder === "root" ? null : folder, at });
      setMessage(type === "rename" ? `نام سند به «${renamedTitle}» تغییر کرد.` : `سند به «${destination}» منتقل شد.`);
      setError(""); if (type === "rename") setRenameOpen(false); else setMoveOpen(false);
    } catch (cause) { setError((cause as Error).message); }
  }
  return <><div data-test-id="document-actions-div-2" className="ws-documentActions">
    <Dialog open={renameOpen} onOpenChange={setRenameOpen}><DialogTrigger data-test-id="document-actions-dialogtrigger-3" render={<Button data-test-id="document-actions-dialogtrigger-3" variant="outline" onClick={() => { setTitle(document.title); setError(""); setMessage(""); }} />}><Pencil aria-hidden="true" />تغییر نام</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog"><DialogTitle>تغییر نام سند</DialogTitle><DialogDescription>عنوان تازه را برای «{document.title}» وارد کنید.</DialogDescription><form data-test-id="document-actions-form-5" className="ws-formFields" onSubmit={event => { event.preventDefault(); perform("rename"); }}><TextField data-test-id="document-actions-textfield-6" label="عنوان جدید" required value={title} onValueChange={value => { setTitle(value); setError(""); }} maxLength={160} error={error || undefined} /><div data-test-id="document-actions-div-7" className="ws-formButtons"><DialogClose data-test-id="document-actions-dialogclose-8" render={<Button data-test-id="document-actions-dialogclose-8" type="button" variant="outline" />}>انصراف</DialogClose><Button data-test-id="document-actions-button-10" type="submit" disabled={!canRename}>ذخیره نام</Button></div><p data-test-id="document-actions-p-11" className="ws-formHint" role="status">{!renamedTitle ? "عنوان سند را وارد کنید." : !canRename ? "برای ذخیره، عنوان تازه‌ای وارد کنید." : ""}</p></form></DialogContent></Dialog>
    <Dialog open={moveOpen} onOpenChange={setMoveOpen}><DialogTrigger data-test-id="document-actions-dialogtrigger-12" render={<Button data-test-id="document-actions-dialogtrigger-12" variant="outline" onClick={() => { setFolder(document.folderId ?? "root"); setError(""); setMessage(""); }} />}><FolderInput data-test-id="document-actions-folderinput-14" aria-hidden="true" />جابه‌جایی</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog"><DialogTitle>جابه‌جایی سند</DialogTitle><DialogDescription>«{document.title}» به پوشه دیگری در همین مخزن منتقل می‌شود.</DialogDescription><form data-test-id="document-actions-form-15" className="ws-formFields" onSubmit={event => { event.preventDefault(); perform("move"); }}><SelectField data-test-id="document-actions-selectfield-16" label="پوشه مقصد" value={folder} onValueChange={value => { setFolder(value); setError(""); }} options={[{ value: "root", label: "ریشه مخزن" }, ...folders.filter(item => item.repositoryId === document.repositoryId).map(item => ({ value: item.id, label: (folderPath(folders, document.repositoryId, item.id) ?? []).map(parent => parent.name).join(" / ") }))]} error={error || undefined} /><div data-test-id="document-actions-div-17" className="ws-formButtons"><DialogClose data-test-id="document-actions-dialogclose-18" render={<Button data-test-id="document-actions-dialogclose-18" type="button" variant="outline" />}>انصراف</DialogClose><Button data-test-id="document-actions-button-20" type="submit" disabled={!canMove}>انتقال به مقصد</Button></div><p data-test-id="document-actions-p-21" className="ws-formHint" role="status">{!canMove ? "این محل فعلی سند است؛ پوشه دیگری انتخاب کنید." : `مقصد انتخاب‌شده: ${destination}`}</p></form></DialogContent></Dialog>
    <DestructiveDialog contentClassName="ws-confirmDialog" trigger={<Button data-test-id="document-actions-button-22" variant="destructive-outline">حذف سند</Button>} title="حذف این سند از فهرست؟" description="سند در همین نشست قابل برگرداندن است. فایل یا داده‌ای در سرویس خارجی حذف نمی‌شود." targetName={document.title} confirmLabel="حذف سند" onConfirm={() => { mutate({ type: "delete", id: document.id }); router.push(back); }} />
  </div><p data-test-id="document-actions-p-23" className="ws-actionFeedback" role="status" aria-atomic="true">{message}</p></>;
}
