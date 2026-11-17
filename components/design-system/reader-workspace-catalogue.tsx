"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectField } from "@/components/ui/select-field";
import { EditorWorkspace } from "./reader/editor-workspace";
import { initialDocument, type DocumentPreview } from "./document-dialogs/model";
import { initialRepository } from "./repository-dialogs/context";
const types = [{ value: "classic", label: "کلاسیک کلاسور" }, { value: "file", label: "فایل" }, { value: "word", label: "وورد" }, { value: "flowchart", label: "فلوچارت" }, { value: "excel", label: "اکسل" }];
function Example({ type, fail }: { type: string; fail: boolean }) {
  const [document, setDocument] = useState<DocumentPreview>(() => ({ ...initialDocument({ id: `editor-example-${type}`, title: "سند نمونهٔ محیط ویرایش", shared: false, creator: "کاربر نمونه", category: "راهنما", content: "محتوای نمونه برای بررسی نوار ابزار و پنل سند" }), contentType: type }));
  return <div data-test-id="catalogue-editor-workspace-stage" className="flex h-[42rem] min-h-0 flex-col overflow-hidden rounded-lg"><EditorWorkspace document={document} onChange={setDocument} onCommit={next => { if (fail) return false; setDocument(next); return true; }} repository={initialRepository()} folders={[{ id: "design", label: "طراحی" }, { id: "guides", label: "راهنماها" }]} /></div>;
}
export function ReaderWorkspaceCatalogue() {
  const [type, setType] = useState("classic");
  const [fail, setFail] = useState(false);
  return <section data-test-id="reader-workspace-catalogue" className="space-y-3 border-t border-white/30 pt-3"><h3 data-test-id="reader-workspace-title" className="text-sm font-medium">محیط فشردهٔ سند؛ پیش‌نمایش، ویرایش و پنل تب‌ها</h3><div data-test-id="reader-workspace-type-field" className="max-w-xs"><SelectField data-test-id="catalogue-editor-type" label="نوع سند نمونه" value={type} onValueChange={setType} options={types} /></div><label data-test-id="catalogue-editor-failure-label" className="flex min-h-11 items-center gap-2 text-xs"><Checkbox data-test-id="catalogue-editor-failure" checked={fail} onCheckedChange={value => setFail(!!value)} />شبیه‌سازی خطای ذخیره با حفظ تغییرات</label><Example key={type} type={type} fail={fail} /></section>;
}
