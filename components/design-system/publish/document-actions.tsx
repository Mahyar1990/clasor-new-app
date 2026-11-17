"use client";
import { useRef, useState } from "react";
import { PreviewList } from "../preview-list";
import { Copy, Info, History } from "lucide-react";
import { FloatingOptions } from "@/components/ui/FloatingOptions";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { VersionBadges } from "@/components/ui/VersionBadges";
import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
export function PublishedActions({ document, version, onVersionChange }: { document: DocumentPreview; version: DocumentVersion; onVersionChange: (id: string) => void }) {
  const [opened, setOpened] = useState("");
  const [notice, setNotice] = useState("");
  const anchor = useRef<HTMLDivElement>(null);
  async function action(id: string) {
    if (id !== "copy") { setOpened(id); return; }
    try { await navigator.clipboard.writeText(window.location.href); setNotice("لینک سند کپی شد."); }
    catch { setNotice("کپی انجام نشد؛ نشانی را از نوار آدرس مرورگر کپی کنید."); }
  }
  return <>
    <div data-test-id="publish-floating-position" ref={anchor} className="pointer-events-none absolute inset-x-2 bottom-4 z-20 flex flex-col items-center gap-2">
      <span data-test-id="publish-action-notice" role="status" className="max-w-full rounded-lg bg-card px-2 text-[10px] leading-6 empty:hidden">{notice}</span>
      <FloatingOptions testId="publish-document-options" title="گزینه‌های سند" items={[{ id: "information", label: "اطلاعات سند", icon: <Info /> }, { id: "versions", label: "نسخه‌های منتشرشده", icon: <History /> }, { id: "copy", label: "کپی لینک سند", icon: <Copy /> }]} onAction={action} />
    </div>
    <GlassModal themeAnchorRef={anchor} testId="publish-options-dialog" title={opened === "versions" ? "نسخه‌های منتشرشده" : "اطلاعات سند"} description={document.title} open={!!opened} onOpenChange={open => { if (!open) setOpened(""); }} finalFocus={() => anchor.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-document-options"]') ?? true} surface="liquid" compact size="sm">
      {opened === "versions" ? <PreviewList testId="publish-version-list" noun="نسخه" items={document.versions.filter(item => item.approval === "approved" && item.published)} render={item => <Button data-test-id={`publish-version-${item.id}`} key={item.id} variant="plain" className="h-auto min-h-9 w-full justify-between px-2 text-xs" aria-pressed={version.id === item.id} onClick={() => { onVersionChange(item.id); setOpened(""); }}>{item.name}<VersionBadges testId={`publish-version-state-${item.id}`} approval={item.approval} published={item.published} latest={item.latest} /></Button>} /> : <dl data-test-id="publish-information" className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs"><dt data-test-id="publish-author-label">سازنده</dt><dd data-test-id="publish-author">{version.creator ?? document.creator}</dd><dt data-test-id="publish-edit-label">آخرین ویرایش</dt><dd data-test-id="publish-edited">{version.editedAt ?? document.updatedAt ?? "—"}</dd><dt data-test-id="publish-version-label">نسخه</dt><dd data-test-id="publish-selected-version">{version.name}</dd></dl>}
    </GlassModal>
  </>;
}
