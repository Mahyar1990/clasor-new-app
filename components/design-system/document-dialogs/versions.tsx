"use client";
import { Ellipsis } from "lucide-react";
import { glass } from "@/lib/design-system/classes";
import { RecordGroup } from "@/components/ui/RecordGroup";
import { Button } from "@/components/ui/button";
import { GlassOptionsMenu, type GlassOption } from "@/components/ui/GlassOptionsMenu";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { ApprovalBadge, VisibilityBadge } from "@/components/ui/status-badge";
import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "./context";
import { VersionEditor, VersionViewer, VersionConfirmation, VersionLink, VersionCompare } from "./version-pages";
import { versionKey } from "./version-state";
import type { VersionAction } from "./version-state";
import type { DocumentVersion } from "./model";
export function DocumentVersions() {
  const { document } = useDocumentPreview();
  const { push } = useDialogNavigation();
  const groups = Array.from(document.versions.reduce((result, version) => {
    const id = versionKey(version.name);
    const group = result.get(id) ?? { id, name: version.name, versions: [] };
    group.versions.push(version);
    result.set(id, group);
    return result;
  }, new Map<string, { id: string; name: string; versions: DocumentVersion[] }>()).values());
  function options(version: DocumentVersion): GlassOption[] {
    return [
      { id: "view", label: "نمایش نسخه" }, { id: "clone", label: "ایجاد نسخه جدید" }, { id: "edit", label: "ویرایش" }, { id: "compare", label: "مقایسه", disabled: document.versions.length < 2 },
      ...(version.approval === "draft" ? [
        { id: "confirm-public", label: "تأیید و عمومی‌سازی پیش‌نویس" },
        ...(version.pending ? [{ id: "confirm", label: "تأیید درخواست تأیید پیش‌نویس" }, { id: "reject", label: "رد درخواست تأیید پیش‌نویس" }, { id: "cancel-request", label: "لغو درخواست تأیید پیش‌نویس" }] : [{ id: "confirm", label: "تأیید پیش‌نویس" }, { id: "request", label: "درخواست تأیید پیش‌نویس" }]),
      ] : [
        ...(!version.latest ? [{ id: "last", label: "انتخاب به عنوان آخرین نسخه" }] : []),
        ...(version.published ? [] : version.pending ? [{ id: "publish", label: "تأیید درخواست عمومی شدن" }, { id: "reject", label: "رد درخواست عمومی شدن" }, { id: "cancel-request", label: "لغو درخواست عمومی شدن نسخه" }] : [{ id: "publish", label: "عمومی شدن" }, { id: "request", label: "ارسال درخواست عمومی شدن" }]),
      ]),
      { id: "link", label: "کپی آدرس اشتراک‌گذاری" }, { id: "delete", label: version.approval === "draft" ? "حذف پیش‌نویس" : "حذف نسخه", destructive: true },
    ];
  }
  function open(id: string, version: DocumentVersion, origin?: HTMLElement | null) {
    const label = options(version).find(item => item.id === id)?.label ?? "عملیات نسخه";
    const pages = { view: <VersionViewer version={version} />, clone: <VersionEditor version={version} clone />, edit: <VersionEditor version={version} />, compare: <VersionCompare version={version} />, link: <VersionLink data-test-id="doc-version-link-page" version={version} /> };
    push(label, id in pages ? pages[id as keyof typeof pages] : <VersionConfirmation version={version} action={id as VersionAction} label={label} />, origin);
  }
  return <div data-test-id="doc-versions" className="space-y-3">
    <Button data-test-id="doc-version-create" size="sm" onClick={() => push("ایجاد نسخه جدید", <VersionEditor />)}>ایجاد نسخه جدید</Button>
    <PreviewList testId="doc-version-list" items={groups} noun="نسخه" render={group => <RecordGroup testId={`doc-version-group-${group.id}`} title={group.name} description={group.versions.length > 1 ? "پیش‌نویس و تأییدشدهٔ یک نسخه؛ هرکدام با محتوای مستقل" : undefined}>{group.versions.map(item => <div key={item.id} data-test-id={`doc-version-row-${item.id}`} className={glass.compactRecord}>
      <Button data-test-id={`doc-version-select-${item.id}`} variant="ghost" aria-label={`نمایش ${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}`} className="h-auto min-w-0 flex-1 flex-col items-start gap-1 whitespace-normal text-start" onClick={() => open("view", item)}><span data-test-id={`doc-version-name-${item.id}`} className="flex flex-wrap items-center gap-1 text-xs"><ApprovalBadge status={item.approval} />{item.latest ? "آخرین نسخه" : ""}</span><span data-test-id={`doc-version-meta-${item.id}`} className="text-[10px] text-muted-foreground">{item.creator} · {item.editedAt}{item.pending ? " · در انتظار تأیید" : ""}</span></Button>
      <div data-test-id={`doc-version-badges-${item.id}`} className="flex flex-wrap gap-1">{item.published && <VisibilityBadge visibility="public" />}</div>
      <GlassOptionsMenu testId={`doc-version-menu-${item.id}`} title={`عملیات ${item.name}`} description={item.approval === "draft" ? "گزینه‌های پیش‌نویس" : "گزینه‌های تأییدشده"} trigger={<Button data-test-id={`doc-version-menu-${item.id}`} variant="glass" size="icon" aria-label={`عملیات ${item.name} · ${item.approval === "draft" ? "پیش‌نویس" : "تأییدشده"}`}><Ellipsis aria-hidden="true" /></Button>} items={options(item)} onAction={(id, _label, trigger) => open(id, item, trigger)} />
    </div>)}</RecordGroup>} />
  </div>;
}
