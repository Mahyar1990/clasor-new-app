import type { DownloadAttachment } from "@/lib/design-system/download-attachment";
import type { FeedbackRecord } from "./query";
export interface AdminFeedback extends FeedbackRecord { attachments?: DownloadAttachment[] }
