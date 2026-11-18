import { Download, Paperclip } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
import { canDownloadAttachment, type DownloadAttachment } from "@/lib/design-system/download-attachment";
export function DownloadAttachmentRow({ file, testId }: { file: DownloadAttachment; testId: string }) {
  return <div data-test-id={testId} className={`${glass.compactRecord} min-w-0`}>
    <Paperclip aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
    <div data-test-id={`${testId}-copy`} className="min-w-0 flex-1"><p data-test-id={`${testId}-name`} className="truncate text-xs" title={file.name}>{file.name}</p><span data-test-id={`${testId}-size`} className="text-[10px] text-muted-foreground">{file.size.toLocaleString("fa-IR")} بایت</span></div>
    {canDownloadAttachment(file.url) ? <Button nativeButton={false} data-test-id={`${testId}-download`} size="sm" variant="outline" render={<a data-test-id={`${testId}-download`} href={file.url} download={file.name} target="_blank" rel="noopener noreferrer" />} aria-label={`دانلود ${file.name}`} className="gap-1 ps-2 pe-2 text-[11px]"><Download aria-hidden="true" className="size-3!" />دانلود</Button> : <span data-test-id={`${testId}-unavailable`} className="text-[10px] text-muted-foreground">فایل در دسترس نیست</span>}
  </div>;
}
