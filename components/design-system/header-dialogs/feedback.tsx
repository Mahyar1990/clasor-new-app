"use client";
import { useState } from "react";
import { TextareaField } from "@/components/ui/text-field";
import { AttachmentPicker, type AttachmentItem } from "@/components/ui/AttachmentPicker";
import { feedbackAccept } from "./model";
export function HeaderFeedback({ formId, done }: { formId: string; done: () => void }) {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [error, setError] = useState("");
  return <form data-test-id="dashboard-feedback-form" id={formId} className="space-y-3" onSubmit={event => {
    event.preventDefault();
    if (!content.trim()) { setError("لطفاً متن پیام را وارد کنید."); return; }
    done();
  }}>
    <TextareaField data-test-id="dashboard-feedback-text" label="متن بازخورد" placeholder="لطفاً متن خود را وارد کنید" value={content} onValueChange={value => { setContent(value); setError(""); }} rows={3} required error={error} />
    <AttachmentPicker testId="dashboard-feedback-attachments" value={attachments} onValueChange={setAttachments} accept={feedbackAccept} />
    <p data-test-id="dashboard-feedback-formats" className="text-[10px] text-muted-foreground">JPG، JPEG، PNG، WEBP، PDF، TXT، MPEG، MP4</p>
  </form>;
}
