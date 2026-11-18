"use client";
import { useState } from "react";
import { EditorWithContents } from "@/components/ui/EditorWithContents";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassPreviewFrame } from "./glass-preview-frame";
const example = "# راهنمای سند\n\nمتن نمونهٔ کلاسور\n\n## شروع کار\n\nراهنمای شروع\n\n### تنظیمات\n\nتنظیمات اولیه\n\n#### دسترسی‌ها\n\nتعیین دسترسی\n\n##### گروه‌ها\n\nمدیریت گروه‌ها\n\n###### اعضا\n\nمدیریت اعضا\n\n## پایان\n\nپایان راهنما";
export function EditorContentsCatalogue() {
  const [editing, setEditing] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [value, setValue] = useState(example);
  return <GlassPreviewFrame title="فهرست قابل‌بستن کنار ادیتور" testId="editor-contents-catalogue">
    <div data-test-id="editor-contents-catalogue-controls" className="flex flex-wrap gap-4 text-xs">
      <label data-test-id="editor-contents-catalogue-edit-label" className="flex items-center gap-2"><Checkbox data-test-id="editor-contents-catalogue-edit" checked={editing} onCheckedChange={value => setEditing(!!value)} />حالت ویرایش</label>
      <label data-test-id="editor-contents-catalogue-empty-label" className="flex items-center gap-2"><Checkbox data-test-id="editor-contents-catalogue-empty" checked={empty} onCheckedChange={value => setEmpty(!!value)} />بدون سرفصل</label>
    </div>
    <p data-test-id="editor-contents-catalogue-help" className="text-xs text-muted-foreground">آیکون داخل گوشهٔ بالای سمت راست ادیتور، فهرست را باز می‌کند؛ ضربدر آن را می‌بندد و فوکوس را برمی‌گرداند. سرفصل‌های # تا ###### هنگام ویرایش به‌روز می‌شوند؛ انتخاب هر مورد به همان بخش می‌رود.</p>
    <div data-test-id="editor-contents-catalogue-stage" className="flex h-[32rem] min-w-0"><EditorWithContents testId="catalogue-contents-editor" title="راهنمای فهرست" value={empty ? "این سند سرفصل ندارد." : value} readOnly={!editing || empty} onValueChange={setValue} minimal /></div>
  </GlassPreviewFrame>;
}
