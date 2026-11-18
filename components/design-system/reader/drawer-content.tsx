"use client";
import { useRef, useState } from "react";
import { TagPicker } from "@/components/ui/TagPicker";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "../document-dialogs/context";
export function ReaderHistory() {
  const { document } = useDocumentPreview();
  return <PreviewList testId="reader-history-list" noun="ویرایش" items={document.editHistory ?? []} render={item => <div data-test-id={`reader-history-${item.id}`} className="space-y-1 border-b border-white/25 py-2 text-xs"><p data-test-id={`reader-history-name-${item.id}`}>{item.versionName} · ذخیرهٔ تغییرات</p><p data-test-id={`reader-history-meta-${item.id}`} className="text-[10px] text-muted-foreground">{item.creator} · {new Intl.DateTimeFormat("fa", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.editedAt))}</p><p data-test-id={`reader-history-content-${item.id}`} className="line-clamp-2 whitespace-pre-wrap wrap-anywhere text-[11px] text-muted-foreground">{item.content}</p></div>} />;
}
export function ReaderTags({ editable }: { editable: boolean }) {
  const { document, setDocument, repository } = useDocumentPreview();
  return editable ? <TagPicker data-test-id="reader-tags" testId="reader-tags" label="تگ‌های سند" options={repository?.tags ?? []} value={document.tags} onValueChange={tags => setDocument(current => ({ ...current, tags }))} /> : <p data-test-id="reader-tags-readonly" className="text-xs leading-loose">{document.tags.join(" · ") || "تگی ثبت نشده است."}</p>;
}
export function ReaderChat() {
  const { document, setDocument } = useDocumentPreview();
  const [body, setBody] = useState("");
  return <div data-test-id="reader-chat" className="space-y-3"><form data-test-id="reader-chat-compose" className="flex items-end gap-2" onSubmit={event => { event.preventDefault(); if (!body.trim()) return; setDocument(current => ({ ...current, activities: [...current.activities, { id: crypto.randomUUID(), name: "شما (نمونه)", body: body.trim(), kind: "chat", state: "approved" }] })); setBody(""); }}><TextField data-test-id="reader-chat-input" label="پیام شما" value={body} onValueChange={setBody} /><Button data-test-id="reader-chat-send" size="sm" type="submit" disabled={!body.trim()}>ارسال</Button></form><PreviewList testId="reader-chat-list" noun="پیام" items={document.activities.filter(item => item.kind === "chat")} render={item => <div data-test-id={`reader-chat-message-${item.id}`} className="border-b border-white/25 py-2 text-xs"><p data-test-id={`reader-chat-author-${item.id}`} className="mb-1 text-[10px] text-muted-foreground">{item.name}</p><p data-test-id={`reader-chat-body-${item.id}`} className="whitespace-pre-wrap wrap-anywhere">{item.body}</p></div>} /></div>;
}
export function ReaderAttachments({ editable }: { editable: boolean }) {
  const { document, setDocument } = useDocumentPreview();
  const picker = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const items = document.attachments ?? [];
  return <div data-test-id="reader-attachments" className="space-y-3">
    {editable && <><Button data-test-id="reader-attachment-add" size="sm" variant="outline" onClick={() => picker.current?.click()}>افزودن پیوست</Button><input data-test-id="reader-attachment-input" data-slot="input" ref={picker} type="file" hidden onChange={event => {
      const file = event.target.files?.[0]; event.target.value = ""; if (!file) return;
      if (items.reduce((sum, item) => sum + item.size, 0) + file.size > 512_000) { setError("حجم مجموع پیوست‌های نمونه حداکثر ۵۰۰ کیلوبایت است."); return; }
      const reader = new FileReader(); reader.onload = () => { setDocument(current => ({ ...current, attachments: [...(current.attachments ?? []), { id: crypto.randomUUID(), name: file.name, size: file.size, dataUrl: String(reader.result) }] })); setError(""); }; reader.onerror = () => setError("خواندن فایل انجام نشد."); reader.readAsDataURL(file);
    }} /></>}
    <p data-test-id="reader-attachment-error" role="alert" className="text-xs text-danger">{error}</p>
    <PreviewList testId="reader-attachment-list" noun="پیوست" items={items} render={item => <div data-test-id={`reader-attachment-${item.id}`} className="flex items-center gap-2 border-b border-white/25 py-2 text-xs"><span data-test-id={`reader-attachment-name-${item.id}`} className="min-w-0 flex-1 wrap-anywhere">{item.name}</span><Button data-test-id={`reader-attachment-download-${item.id}`} size="sm" variant="outline" onClick={() => { const link = window.document.createElement("a"); link.href = item.dataUrl; link.download = item.name; link.click(); }}>دریافت</Button>{editable && <Button data-test-id={`reader-attachment-remove-${item.id}`} size="sm" variant="ghost" onClick={() => setDocument(current => ({ ...current, attachments: current.attachments?.filter(file => file.id !== item.id) }))}>حذف</Button>}</div>} />
  </div>;
}
