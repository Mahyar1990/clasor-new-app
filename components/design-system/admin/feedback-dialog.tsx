"use client";
import { useRef, type RefObject } from "react";
import { MessageSquare } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { DownloadAttachmentRow } from "@/components/ui/DownloadAttachmentRow";
import { DialogSection } from "@/components/ui/DialogSection";
import { Button } from "@/components/ui/button";
import { PreviewList } from "../preview-list";
import type { AdminFeedback } from "./model";
export function FeedbackDialog({ record, trigger, fallbackFocusRef, close }: {
  record: AdminFeedback; trigger: HTMLElement; fallbackFocusRef: RefObject<HTMLElement | null>; close: () => void;
}) {
  const anchor = useRef(trigger);
  const files = record.attachments ?? [];
  return <GlassModal testId="admin-feedback-dialog" themeAnchorRef={anchor} title="جزئیات بازخورد" description={`شناسه: ${record.id} · entityId: ${record.entityId}`} open compact surface="liquid" size="md" onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger.isConnected ? trigger : fallbackFocusRef.current ?? true} icon={<GlassEmblem data-test-id="admin-feedback-dialog-icon" className="size-7"><MessageSquare aria-hidden="true" className="size-3.5" /></GlassEmblem>} footer={<Button data-test-id="admin-feedback-dialog-done" size="sm" variant="outline" onClick={close}>بستن</Button>}>
    <DialogSection testId="admin-feedback-text-section" title="متن بازخورد"><p data-test-id="admin-feedback-full-text" className="whitespace-pre-wrap text-xs leading-7 wrap-anywhere">{record.description}</p></DialogSection>
    <DialogSection testId="admin-feedback-files-section" title={`فایل‌های پیوست (${files.length.toLocaleString("fa-IR")})`}>
      {files.length ? <GlassScrollArea data-test-id="admin-feedback-files-scroll" label="پیوست‌های بازخورد" className={files.length > 4 ? "h-44" : "max-h-44"}><PreviewList testId="admin-feedback-files" noun="فایل" items={files} render={file => <DownloadAttachmentRow file={file} testId={`admin-feedback-file-${file.id}`} />} /></GlassScrollArea> : <p data-test-id="admin-feedback-no-files" className="text-xs text-muted-foreground">این بازخورد فایل پیوست ندارد.</p>}
    </DialogSection>
  </GlassModal>;
}
