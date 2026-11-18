"use client";
import type { RefObject } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { VersionBadges } from "@/components/ui/VersionBadges";
import { CopyField } from "@/components/ui/CopyField";
import { PreviewList } from "../preview-list";
import { PublishedAttachments } from "./attachments";
import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
export type PublishedAction = "attachments" | "versions" | "short-link";
export function PublishedActionDialogs({ opened, close, anchor, document, version, onVersionChange, shortLink }: { opened: PublishedAction | null; close: () => void; anchor: RefObject<HTMLDivElement | null>; document: DocumentPreview; version: DocumentVersion; onVersionChange: (id: string) => void; shortLink: string }) {
  return <GlassModal testId="publish-options-dialog" title={opened === "attachments" ? "فایل‌های پیوست سند" : opened === "versions" ? "نسخه‌های منتشرشده" : "لینک کوتاه سند"} description={document.title} open={!!opened} onOpenChange={open => { if (!open) close(); }} themeAnchorRef={anchor} finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-action-origin=true]') ?? anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-action-bar-toggle"]') ?? true} compact surface="liquid" size="sm">
    {opened === "attachments" && <PublishedAttachments document={document} />}
    {opened === "short-link" && <CopyField testId="publish-short-link" label="لینک کوتاه سند" value={shortLink} compact />}
    {opened === "versions" && <PreviewList testId="publish-version-list" noun="نسخه" items={document.versions.filter(item => item.approval === "approved" && item.published)} render={item => <Button data-test-id={`publish-version-${item.id}`} variant="plain" className="h-auto min-h-9 w-full justify-between px-2 text-xs" aria-pressed={version.id === item.id} onClick={() => { onVersionChange(item.id); close(); }}>{item.name}<VersionBadges testId={`publish-version-state-${item.id}`} approval={item.approval} published={item.published} latest={item.latest} /></Button>} />}
  </GlassModal>;
}
