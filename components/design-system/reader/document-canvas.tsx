"use client";
import { useState } from "react";
import { Copy, Minus, Plus, Download } from "lucide-react";
import { EditorFrame } from "@/components/ui/EditorFrame";
import { Button } from "@/components/ui/button";
import { DocumentFlags } from "@/components/ui/DocumentFlags";
import { VersionBadges } from "@/components/ui/VersionBadges";
import { documentFlags } from "../library/document-state";
import type { DocumentPreview, DocumentVersion } from "../document-dialogs/model";
export function DocumentCanvas({ document, version, onEscape }: { document: DocumentPreview; version?: DocumentVersion; onEscape?: () => void }) {
  const [zoom, setZoom] = useState(100);
  const [message, setMessage] = useState("");
  const value = version?.content ?? document.content;
  return <div data-test-id="document-canvas" className="flex h-full min-h-0 flex-1 flex-col gap-2">
    <div data-test-id="document-canvas-status" className="flex flex-wrap items-center gap-2"><DocumentFlags testId="reader-flags" labels state={documentFlags(document)} />{version && <VersionBadges testId="reader-version-badges" approval={version.approval} pending={version.pending} published={version.published} latest={version.latest} />}</div>
    <div data-test-id="document-canvas-controls" className="flex flex-wrap items-center gap-1">
      <Button data-test-id="reader-zoom-out" size="icon-sm" variant="outline" aria-label="کوچک‌نمایی" disabled={zoom <= 70} onClick={() => setZoom(current => current - 10)}><Minus aria-hidden="true" /></Button><span data-test-id="reader-zoom" className="w-10 text-center text-[11px]">{zoom}٪</span><Button data-test-id="reader-zoom-in" size="icon-sm" variant="outline" aria-label="بزرگ‌نمایی" disabled={zoom >= 150} onClick={() => setZoom(current => current + 10)}><Plus aria-hidden="true" /></Button>
      <Button data-test-id="reader-copy-content" size="sm" variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(value); setMessage("متن سند کپی شد."); } catch { setMessage("کپی متن انجام نشد؛ متن را از ادیتور انتخاب کنید."); } }}><Copy aria-hidden="true" />کپی متن</Button>
      <Button data-test-id="reader-download" size="sm" variant="outline" onClick={() => { const url = URL.createObjectURL(new Blob([value], { type: "text/plain;charset=utf-8" })); const link = window.document.createElement("a"); link.href = url; link.download = `${document.title.replace(/[\\/:*?"<>|]/g, "-")}.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }}><Download aria-hidden="true" />دریافت</Button>
      <span data-test-id="reader-canvas-message" role="status" className="text-[11px] text-muted-foreground">{message}</span>
    </div>
    <EditorFrame testId="document-editor" title={version ? `${document.title} · ${version.name}` : document.title} value={value} zoom={zoom} onEscape={onEscape} />
  </div>;
}
