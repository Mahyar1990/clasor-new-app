"use client";
import { useState } from "react";
import { AttachmentPicker, type AttachmentItem } from "@/components/ui/AttachmentPicker";
import { GlassPreviewFrame } from "./glass-preview-frame";
import { feedbackAccept } from "./header-dialogs/model";
export function AttachmentPickerCatalogue() {
  const [files, setFiles] = useState<AttachmentItem[]>([]);
  return <GlassPreviewFrame title="پیوست‌های جمع‌وجور؛ انتخاب، حذف و خطا" testId="attachment-picker-catalogue">
    <AttachmentPicker testId="catalogue-attachments" value={files} onValueChange={setFiles} accept={feedbackAccept} />
  </GlassPreviewFrame>;
}
