"use client";

import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TextareaField } from "@/components/ui/text-field";
import { useDocumentStore } from "@/components/workspace/document-store";
import { documentText } from "@/lib/workspace/mutations";
import type { IDocument } from "@/interface/document";

export default function TextEditor({ document }: { document: IDocument }) {
  const store = useDocumentStore();
  const [open, setOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const text = store.drafts[document.id] ?? documentText(document);
  const dirty = text !== documentText(document);
  function changeOpen(value: boolean) { if (!value && dirty) setDiscardOpen(true); else setOpen(value); }
  function save() {
    try { store.mutate({ type: "save", id: document.id, content: text, at: new Date().toISOString() }); setError(""); setOpen(false); } catch (cause) { setError((cause as Error).message); }
  }
  return <><Dialog open={open} onOpenChange={changeOpen}><DialogTrigger data-test-id="text-editor-dialogtrigger-1" render={<Button data-test-id="text-editor-dialogtrigger-1" onClick={() => setError("")} />}><Pencil aria-hidden="true" />{dirty ? "ادامه ویرایش" : "ویرایش متن"}</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog ws-textEditor" showCloseButton={false}><DialogTitle>ویرایش «{document.title}»</DialogTitle><DialogDescription>ذخیره، نسخه تازه‌ای از متن ساده در همین نشست می‌سازد؛ نسخه تازه پیش‌نویس است.</DialogDescription><TextareaField data-test-id="text-editor-textareafield-3" ref={editorRef} label="متن سند" value={text} onValueChange={value => store.setDraft(document.id, value)} maxLength={50000} rows={16} error={error || undefined} /><p data-test-id="text-editor-p-4" className="ws-formHint" role="status">{dirty ? "تغییرات هنوز ذخیره نشده‌اند." : "تغییری برای ذخیره وجود ندارد."}</p><div data-test-id="text-editor-div-5" className="ws-formButtons"><Button data-test-id="text-editor-button-6" variant="outline" onClick={() => changeOpen(false)}>بستن ویرایشگر</Button><Button data-test-id="text-editor-button-7" onClick={save} disabled={!dirty}>ذخیره متن</Button></div></DialogContent></Dialog>
    <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}><AlertDialogContent className="ws-confirmDialog" dir="rtl" initialFocus={cancelRef} finalFocus={() => open ? editorRef.current ?? true : true}><AlertDialogTitle>از تغییرات ذخیره‌نشده صرف‌نظر می‌کنید؟</AlertDialogTitle><AlertDialogDescription>با صرف‌نظر، متن «{document.title}» به آخرین محتوای ذخیره‌شده برمی‌گردد.</AlertDialogDescription><div data-test-id="text-editor-div-8" className="ws-formButtons"><AlertDialogCancel render={<Button data-test-id="text-editor-button-9" ref={cancelRef} variant="outline" />}>ادامه ویرایش</AlertDialogCancel><Button data-test-id="text-editor-button-10" variant="destructive" onClick={() => { store.setDraft(document.id, null); setDiscardOpen(false); setOpen(false); }}>صرف‌نظر از تغییرات</Button></div></AlertDialogContent></AlertDialog>
  </>;
}
