"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/text-field";
import { ApprovalBadge, VisibilityBadge } from "@/components/ui/status-badge";
import { DialogSection } from "@/components/ui/DialogSection";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "./context";

export function DocumentVersions() {
  const { document } = useDocumentPreview();
  const [selected, setSelected] = useState(document.versions[0].id);
  const version = document.versions.find(item => item.id === selected) ?? document.versions[0];
  return <div data-test-id="doc-versions" className="grid items-start gap-4 md:grid-cols-[12rem_minmax(0,1fr)]">
    <PreviewList testId="doc-version-list" items={document.versions} noun="نسخه" render={item => <Button data-test-id={`doc-version-select-${item.id}`} className="h-auto min-h-11 w-full flex-col items-start whitespace-normal p-3" variant={item.id === version.id ? "default" : "outline"} aria-pressed={item.id === version.id} onClick={() => setSelected(item.id)}>
      <span data-test-id={`doc-version-name-${item.id}`}>{item.name}</span><span data-test-id={`doc-version-meta-${item.id}`} className="text-[11px]">{item.id === document.versions[0].id ? "آخرین نسخه" : "نسخهٔ پیشین"}</span>
    </Button>} />
    <DialogSection testId="doc-version-detail" title={version.name} description="مشاهدهٔ محتوای نسخهٔ انتخاب‌شده؛ نسخه‌های قبلی تغییر نمی‌کنند.">
      <div data-test-id="doc-version-status" className="flex flex-wrap gap-2"><ApprovalBadge status={version.approval} /><VisibilityBadge visibility={version.published ? "public" : "private"} /></div>
      <TextareaField data-test-id="doc-version-content" label="محتوای نسخه" value={version.content} readOnly rows={7} />
      <p data-test-id="doc-version-separation" className={`${glass.statusSurface} ${glass.statusInfo} rounded-lg p-2 text-xs`}>تأیید محتوا و عمومی بودن دو وضعیت مستقل‌اند.</p>
    </DialogSection>
  </div>;
}
