"use client";

import { useRef, useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { TextareaField } from "@/components/ui/text-field";
import { FormActions } from "@/components/ui/FormActions";
import { Button } from "@/components/ui/button";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { glass } from "@/lib/design-system/classes";
import { cn } from "@/lib/utils";
import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "./context";
import type { DocumentActivity as Activity } from "./model";

function ActivityCard({ item, focusRef }: { item: Activity; focusRef: React.RefObject<HTMLTextAreaElement | null> }) {
  const { document, setDocument } = useDocumentPreview();
  const [reply, setReply] = useState(item.answer ?? "");
  const [answering, setAnswering] = useState(false);
  const replyButton = useRef<HTMLButtonElement>(null);
  const canManage = !document.shared;
  function update(patch: Partial<Activity>) { setDocument(current => ({ ...current, activities: current.activities.map(record => record.id === item.id ? { ...record, ...patch } : record) })); if (patch.state) focusRef.current?.focus(); }
  return <article data-test-id={`doc-activity-${item.id}`} className={`${glass.contentSurface} space-y-3 p-3`}>
    <p data-test-id={`doc-activity-author-${item.id}`} className="text-xs font-semibold">{item.name}</p>
    <p data-test-id={`doc-activity-body-${item.id}`} className="whitespace-pre-wrap wrap-anywhere text-xs leading-relaxed">{item.body}</p>
    {item.answer && <div data-test-id={`doc-activity-answer-${item.id}`} className="rounded-lg border border-white/40 bg-white/15 p-2 text-xs leading-relaxed">پاسخ: {item.answer}</div>}
    {answering && <div data-test-id={`doc-activity-answer-form-${item.id}`} className="space-y-2">
      <TextareaField data-test-id={`doc-activity-answer-input-${item.id}`} label="پاسخ شما" rows={3} value={reply} onValueChange={setReply} />
      <Button data-test-id={`doc-activity-answer-save-${item.id}`} size="sm" disabled={!reply.trim()} onClick={() => { update({ answer: reply.trim() }); setAnswering(false); replyButton.current?.focus(); }}>ثبت پاسخ نمونه</Button>
    </div>}
    <FormActions data-test-id={`doc-activity-actions-${item.id}`}>
      {item.kind === "questions" && item.state === "approved" && <Button data-test-id={`doc-activity-reply-${item.id}`} ref={replyButton} size="sm" variant="outline" onClick={() => setAnswering(!answering)}>{answering ? "انصراف" : "پاسخ به پرسش"}</Button>}
      {canManage && item.state === "pending" && <><Button data-test-id={`doc-activity-approve-${item.id}`} size="sm" onClick={() => update({ state: "approved" })}>تأیید</Button><Button data-test-id={`doc-activity-reject-${item.id}`} size="sm" variant="outline" onClick={() => update({ state: "rejected" })}>رد کردن</Button></>}
      {(canManage || item.name === "شما (نمونه)") && <DestructiveDialog title="حذف پیام" description="این پیام فقط از سند نمونه حذف می‌شود." targetName={item.body} confirmLabel="حذف پیام نمونه" fallbackFocusRef={focusRef} contentClassName={cn(glass.liquidFloating, glass.dialogCompact, glass.dialogConfirmation)} trigger={<Button data-test-id={`doc-activity-delete-${item.id}`} size="sm" variant="destructive-outline">حذف</Button>} onConfirm={() => setDocument(current => ({ ...current, activities: current.activities.filter(record => record.id !== item.id) }))} />}
    </FormActions>
  </article>;
}

export function DocumentActivities({ kind }: { kind: "comments" | "questions" }) {
  const { document, setDocument } = useDocumentPreview();
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  function list(state: string) {
    return <PreviewList key={`${kind}-${state}`} testId={`doc-${kind}-${state}`} noun={kind === "comments" ? "نظر" : "پرسش"} items={document.activities.filter(item => item.kind === kind && item.state === state)} render={item => <ActivityCard item={item} focusRef={input} />} />;
  }
  return <div data-test-id="doc-activities" className="space-y-4">
    <form data-test-id="doc-activity-compose" className="space-y-3" onSubmit={event => {
      event.preventDefault(); if (!body.trim()) return;
      const state = document.shared ? "pending" : "approved";
      setDocument(current => ({ ...current, activities: [{ id: crypto.randomUUID(), name: "شما (نمونه)", body: body.trim(), kind, state }, ...current.activities] }));
      input.current?.focus(); setBody(""); setMessage(state === "pending" ? "پیام نمونه در انتظار تأیید است." : "پیام نمونه ثبت شد.");
    }}>
      <TextareaField ref={input} data-test-id="doc-activity-input" label={kind === "comments" ? "نظر شما" : "پرسش شما"} value={body} onValueChange={setBody} rows={3} required />
      <Button data-test-id="doc-activity-send" type="submit" disabled={!body.trim()}>{kind === "comments" ? "ارسال نظر" : "ارسال پرسش"}</Button>
    </form>
    <p data-test-id="doc-activity-status" role="status" className="text-xs text-success">{message}</p>
    <ClasorTabs label={kind === "comments" ? "نظرات سند" : "پرسش‌های سند"} defaultValue="approved" items={[
      { value: "approved", label: kind === "comments" ? "نظرات" : "پرسش‌ها", content: list("approved") },
      ...(!document.shared ? [{ value: "pending", label: "در انتظار تأیید", content: list("pending") }] : []),
    ]} />
  </div>;
}
