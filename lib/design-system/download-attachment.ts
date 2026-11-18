export interface DownloadAttachment { id: string; name: string; size: number; url?: string }
/** Downloads may use application files, HTTP(S), blobs or the supported upload MIME types. */
export function canDownloadAttachment(value?: string): boolean {
  if (!value || /[\u0000-\u001f\u007f]/.test(value)) return false;
  if (value.startsWith("/")) return !value.startsWith("//") && !value.startsWith("/\\");
  if (/^https?:\/\//i.test(value)) { try { return !!new URL(value).hostname; } catch { return false; } }
  return /^blob:https?:\/\//i.test(value) || /^data:(text\/plain|application\/pdf|image\/(png|jpeg|webp)|video\/(mpeg|mp4))[,;]/i.test(value);
}
