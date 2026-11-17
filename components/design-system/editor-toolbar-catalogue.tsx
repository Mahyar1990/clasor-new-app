"use client";
import { useState } from "react";
import { DocumentEditorToolbar } from "@/components/ui/DocumentEditorToolbar";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectField } from "@/components/ui/select-field";
import { GlassPreviewFrame } from "./glass-preview-frame";
export function EditorToolbarCatalogue() {
  const [editing, setEditing] = useState(false);
  const [versionId, setVersionId] = useState("draft");
  const [autoSave, setAutoSave] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [file, setFile] = useState("classic");
  const [drawer, setDrawer] = useState(false);
  const [message, setMessage] = useState("");
  return <GlassPreviewFrame title="نوار ابزار فشردهٔ ادیتور" testId="editor-toolbar-catalogue">
    <div data-test-id="editor-toolbar-kind-field" className="max-w-xs"><SelectField data-test-id="editor-toolbar-kind" label="خانوادهٔ سند" value={file} onValueChange={setFile} options={[{ value: "classic", label: "کلاسیک" }, { value: "file", label: "فایل" }, { value: "office", label: "وورد، اکسل و فلوچارت" }]} /></div>
    <DocumentEditorToolbar data-test-id="catalogue-editor-toolbar" editing={editing} canEdit={!readonly} versions={empty ? [] : [{ id: "draft", label: "نسخهٔ ۳ · پیش‌نویس" }, { id: "approved", label: "نسخهٔ ۳ · تأییدشده" }, { id: "public", label: "نسخهٔ ۲ · عمومی" }]} versionId={empty ? "" : versionId} onVersionChange={setVersionId} onVersions={() => setMessage("درخواست مدیریت نسخه‌ها")} onModeChange={() => setEditing(current => !current)} onDownload={() => setMessage("درخواست دانلود")} onSave={() => { setDirty(false); setMessage("تغییرات نمونه ذخیره شد."); }} approveDraft={!readonly && !empty && versionId === "draft"} publishVersion={!readonly && !empty && versionId === "approved"} onPublish={() => setMessage("عمومی‌سازی نسخهٔ تأییدشده")} onApprove={published => { setEditing(false); setDirty(false); setMessage(published ? "تأیید و عمومی‌سازی نمونه" : "تأیید نمونه"); }} dirty={dirty} autoSave={autoSave} onAutoSaveChange={setAutoSave} showAutoSave={file !== "file"} showDrawer={file === "classic"} drawerOpen={drawer} onDrawerChange={() => setDrawer(current => !current)} pdf={file === "classic"} />
    <div data-test-id="editor-toolbar-example-states" className="flex flex-wrap gap-4">
      <label data-test-id="editor-toolbar-readonly-label" className="flex min-h-11 items-center gap-2 text-xs"><Checkbox data-test-id="editor-toolbar-readonly" checked={readonly} onCheckedChange={value => { setReadonly(!!value); setEditing(false); }} />دسترسی فقط خواندن</label>
      <label data-test-id="editor-toolbar-empty-label" className="flex min-h-11 items-center gap-2 text-xs"><Checkbox data-test-id="editor-toolbar-empty" checked={empty} onCheckedChange={value => { setEmpty(!!value); setEditing(false); }} />فهرست نسخهٔ خالی</label>
      <label data-test-id="editor-toolbar-dirty-label" className="flex min-h-11 items-center gap-2 text-xs"><Checkbox data-test-id="editor-toolbar-dirty" checked={dirty} onCheckedChange={value => setDirty(!!value)} />تغییر ذخیره‌نشده</label>
    </div>
    <p data-test-id="editor-toolbar-event" role="status" className="text-xs text-muted-foreground">{message || "با Tab بین کنترل‌ها و با کلیدهای جهت بین نسخه‌ها حرکت کنید؛ در عرض کم ابزارها به خط بعد می‌روند."}</p>
  </GlassPreviewFrame>;
}
