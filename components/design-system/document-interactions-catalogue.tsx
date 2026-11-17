"use client";
import { useState } from "react";
import { IdentifierInput } from "@/components/ui/IdentifierInput";
import { RecipientPicker } from "@/components/ui/RecipientPicker";
import { DocumentFlags } from "@/components/ui/DocumentFlags";
import { VersionBadges } from "@/components/ui/VersionBadges";
import { EditorFrame } from "@/components/ui/EditorFrame";
import { Button } from "@/components/ui/button";
export function DocumentInteractionsCatalogue() {
  const [ids, setIds] = useState(["user-100"]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [text, setText] = useState("عنوان سند نمونه\nاین متن در ادیتور مستقل نمایش داده می‌شود.");
  const [readOnly, setReadOnly] = useState(true);
  return <section data-test-id="document-interactions-catalogue" className="space-y-4 border-t border-white/30 pt-3">
    <h3 data-test-id="document-interactions-title" className="text-sm font-medium">وضعیت سند، شناسه‌های چندگانه و ادیتور مستقل</h3>
    <DocumentFlags testId="catalogue-document-flags" labels state={{ bookmarked: true, hidden: true, restricted: true, blocked: true }} />
    <VersionBadges testId="catalogue-version-badges" approval="approved" latest published />
    <IdentifierInput data-test-id="catalogue-identifiers" testId="catalogue-identifiers" label="شناسه‌های کاربران" value={ids} onValueChange={setIds} />
    <RecipientPicker testId="catalogue-recipients" options={[{ id: "user:1", name: "همکار نمونه", kind: "user", detail: "ویرایشگر" }, { id: "group:1", name: "تیم طراحی", kind: "group", detail: "۴ عضو" }]} value={recipients} onValueChange={setRecipients} />
    <Button data-test-id="catalogue-editor-mode" size="sm" variant="outline" aria-pressed={!readOnly} onClick={() => setReadOnly(current => !current)}>{readOnly ? "فعال‌کردن ویرایش نمونه" : "فقط خواندن"}</Button>
    <div data-test-id="catalogue-editor-stage" className="h-80"><EditorFrame testId="catalogue-editor" title="سند نمونهٔ دیزاین سیستم" value={text} readOnly={readOnly} onValueChange={setText} /></div>
  </section>;
}
