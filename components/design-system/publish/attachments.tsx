"use client";
import { Download, Paperclip } from "lucide-react";
import { PreviewList } from "../preview-list";
import { publicAttachmentUrl } from "./article-state";
import type { DocumentPreview } from "../document-dialogs/model";
import { glass } from "@/lib/design-system/classes";
export function PublishedAttachments({ document }: { document: DocumentPreview }) {
  return <PreviewList testId="publish-attachments" noun="فایل" items={document.attachments ?? []} render={file => <div data-test-id={`publish-attachment-${file.id}`} className={`${glass.insetCard} flex items-center gap-2 px-2 py-2`}><Paperclip aria-hidden="true" className="size-3.5 shrink-0 text-primary" /><div data-test-id={`publish-attachment-copy-${file.id}`} className="min-w-0 flex-1"><p data-test-id={`publish-attachment-name-${file.id}`} className="truncate text-xs">{file.name}</p><span data-test-id={`publish-attachment-size-${file.id}`} className="text-[10px] text-muted-foreground">{new Intl.NumberFormat("fa").format(file.size)} بایت</span></div>{publicAttachmentUrl(file.dataUrl) ? <a data-test-id={`publish-attachment-download-${file.id}`} href={file.dataUrl} download={file.name} className={`${glass.navigation} flex min-h-8 items-center gap-1 px-2 text-[10px]`}><Download aria-hidden="true" className="size-3" />دانلود</a> : <span data-test-id={`publish-attachment-unavailable-${file.id}`} className="text-[10px] text-muted-foreground">فایل در دسترس نیست</span>}</div>} />;
}
