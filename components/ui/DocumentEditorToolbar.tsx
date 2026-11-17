"use client";
import { Eye, Pencil, PanelRight, Download, Save, Check, Globe } from "lucide-react";
import { Button } from "./button";
import { ModeSwitch } from "./ModeSwitch";
import { Checkbox } from "./checkbox";
import { OptionsButton } from "./OptionsButton";
import { GlassOptionsMenu, type GlassOption } from "./GlassOptionsMenu";
import { VersionPicker, type EditorVersionOption } from "./VersionPicker";
export type { EditorVersionOption } from "./VersionPicker";
export function DocumentEditorToolbar({ editing, canEdit, versions, versionId, onVersionChange, onVersions, onModeChange, onDownload, onSave, onApprove, onPublish, approveDraft, publishVersion, dirty, autoSave, onAutoSaveChange, showAutoSave, showDrawer, drawerOpen, onDrawerChange, drawerId, pdf }: {
  editing: boolean; canEdit: boolean; versions: EditorVersionOption[]; versionId: string; onVersionChange: (id: string) => void;
  onVersions: (trigger: HTMLElement) => void; onModeChange: () => void; onDownload: () => void; onSave: () => void;
  onApprove: (published: boolean) => void; onPublish: () => void; approveDraft: boolean; publishVersion: boolean;
  dirty: boolean; autoSave: boolean; onAutoSaveChange: (value: boolean) => void;
  showAutoSave: boolean; showDrawer: boolean; drawerOpen: boolean; onDrawerChange: () => void; drawerId?: string; pdf: boolean;
}) {
  const items: GlassOption[] = [
    ...(approveDraft ? [{ id: "confirm", label: "تأیید پیش‌نویس", icon: <Check /> }, { id: "confirm-public", label: "تأیید و عمومی‌سازی", icon: <Globe /> }] : []),
    ...(publishVersion ? [{ id: "publish", label: "عمومی‌سازی", icon: <Globe /> }] : []),
    ...(!editing ? [{ id: "download", label: pdf ? "دانلود PDF" : "دانلود فایل", icon: <Download />, disabled: !versions.length, separatorBefore: approveDraft || publishVersion }] : []),
  ];
  function action(id: string) {
    if (id === "download") onDownload();
    if (id === "confirm" || id === "confirm-public") onApprove(id === "confirm-public");
    if (id === "publish") onPublish();
  }
  return <div data-test-id="reader-toolbar" className="flex min-w-0 flex-wrap items-center gap-1.5">
    {showDrawer && <Button data-test-id="reader-drawer-toggle" size="icon-sm" variant="outline" aria-label="ابزارهای سند" aria-expanded={drawerOpen} aria-controls={drawerId} onClick={onDrawerChange}><PanelRight aria-hidden="true" /></Button>}
    <VersionPicker versions={versions} value={versionId} onValueChange={onVersionChange} onViewAll={onVersions} />

    <div data-test-id="reader-left-actions" className="ms-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-1.5">
    {editing && <>
      {showAutoSave && <label data-test-id="reader-autosave-label" className="flex min-h-8 cursor-pointer items-center gap-1.5 px-1 text-[11px]"><Checkbox data-test-id="reader-autosave" checked={autoSave} onCheckedChange={value => onAutoSaveChange(!!value)} />ذخیرهٔ خودکار</label>}
      <Button data-test-id="reader-save" size="sm" variant="outline" disabled={!canEdit || !versions.length || !dirty || showAutoSave && autoSave} onClick={onSave}><Save aria-hidden="true" />ذخیره</Button>
    </>}
    <ModeSwitch data-test-id="reader-mode-switch" testId="reader-mode" label="حالت سند" second={editing} disabled={!canEdit || !versions.length} onValueChange={second => { if (second !== editing) onModeChange(); }} modes={[{ label: "پیش‌نمایش", icon: <Eye /> }, { label: "ویرایش", icon: <Pencil /> }]} />
    <GlassOptionsMenu data-test-id="reader-actions-menu" testId="reader-actions" title="عملیات سند" description={editing ? "حالت ویرایش" : "حالت پیش‌نمایش"} trigger={<OptionsButton data-test-id="reader-actions" aria-label="عملیات سند" disabled={!items.length} />} items={items} onAction={action} />
    </div>
  </div>;
}
