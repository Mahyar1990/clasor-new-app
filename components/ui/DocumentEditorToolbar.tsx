"use client";
import { Eye, Pencil, History, PanelLeft, Download, Save, Check, Globe } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
export interface EditorVersionOption { id: string; label: string }
export function DocumentEditorToolbar({ editing, canEdit, versions, versionId, onVersionChange, onVersions, onModeChange, onDownload, onSave, onApprove, dirty, autoSave, onAutoSaveChange, showAutoSave, showDrawer, drawerOpen, onDrawerChange, pdf }: {
  editing: boolean; canEdit: boolean; versions: EditorVersionOption[]; versionId: string; onVersionChange: (id: string) => void;
  onVersions: (trigger: HTMLElement) => void; onModeChange: () => void; onDownload: () => void; onSave: () => void;
  onApprove: (published: boolean) => void; dirty: boolean; autoSave: boolean; onAutoSaveChange: (value: boolean) => void;
  showAutoSave: boolean; showDrawer: boolean; drawerOpen: boolean; onDrawerChange: () => void; pdf: boolean;
}) {
  return <div data-test-id="reader-toolbar" className="flex min-w-0 flex-wrap items-center gap-1.5">
    <div data-test-id="reader-version-controls" className="flex min-w-0 items-center gap-1">
      <Select disabled={!versions.length} value={versionId} items={versions.map(item => ({ value: item.id, label: item.label }))} onValueChange={value => { if (value) onVersionChange(value); }}>
        <SelectTrigger data-test-id="reader-version-select" aria-label="نسخهٔ سند" size="sm" className="w-44 max-w-[48vw] text-xs"><SelectValue /></SelectTrigger>
        <SelectContent dir="rtl" align="start" alignItemWithTrigger={false}>{versions.map(item => <SelectItem data-test-id={`reader-version-option-${item.id}`} key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
      </Select>
      <Button data-test-id="reader-tool-versions" size="icon-sm" variant="outline" aria-label="مدیریت نسخه‌های سند" disabled={!versions.length} onClick={event => onVersions(event.currentTarget)}><History aria-hidden="true" /></Button>
    </div>
    {canEdit && <Button data-test-id="reader-mode" size="sm" variant="outline" aria-label={editing ? "تغییر به پیش‌نمایش سند" : "ویرایش سند"} disabled={!versions.length} onClick={onModeChange}>{editing ? <Eye aria-hidden="true" /> : <Pencil aria-hidden="true" />}{editing ? "پیش‌نمایش" : "ویرایش"}</Button>}
    {editing ? <>
      <Button data-test-id="reader-confirm" size="sm" variant="outline" onClick={() => onApprove(false)} disabled={!canEdit || !versions.length}><Check aria-hidden="true" />تأیید پیش‌نویس</Button>
      <Button data-test-id="reader-confirm-public" size="sm" onClick={() => onApprove(true)} disabled={!canEdit || !versions.length}><Globe aria-hidden="true" />تأیید و عمومی‌سازی</Button>
      {showAutoSave && <label data-test-id="reader-autosave-label" className="flex min-h-8 cursor-pointer items-center gap-1.5 px-1 text-[11px]"><Checkbox data-test-id="reader-autosave" checked={autoSave} onCheckedChange={value => onAutoSaveChange(!!value)} />ذخیرهٔ خودکار</label>}
      {dirty && <Button data-test-id="reader-save" size="icon-sm" variant="outline" aria-label="ذخیرهٔ تغییرات" onClick={onSave}><Save aria-hidden="true" /></Button>}
    </> : <Button data-test-id="reader-download" size="sm" variant="outline" onClick={onDownload}><Download aria-hidden="true" />{pdf ? "دانلود PDF" : "دانلود فایل"}</Button>}
    {showDrawer && <Button data-test-id="reader-drawer-toggle" size="icon-sm" variant="outline" className="ms-auto" aria-label="ابزارهای سند" aria-expanded={drawerOpen} onClick={onDrawerChange}><PanelLeft aria-hidden="true" /></Button>}
  </div>;
}
