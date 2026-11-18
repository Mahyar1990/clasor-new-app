"use client";
import { OptionsButton } from "@/components/ui/OptionsButton";
import { useRef, useState } from "react";
import { FolderOpen, RotateCcw, LogOut } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { repositoryActionItems } from "./options";
import { repositoryOptions } from "@/components/design-system/clasor-repository-options";
import { RepositoryPreviewProvider, useRepositoryPreview, initialRepository, type PreviewRole } from "./context";
import { RepositoryActionDialog, type DialogSelection } from "./dialog";

function Experience() {
  const { repo, setRepo } = useRepositoryPreview();
  const [selection, setSelection] = useState<DialogSelection | null>(null);
  const [notice, setNotice] = useState("");
  const menuRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const activeOptions = repositoryActionItems(repo);
  const allOptions = [...repositoryOptions("مالک", true), { id: "restore", label: "بازگردانی مخزن", icon: <RotateCcw /> }, { id: "leave", label: "ترک مخزن", icon: <LogOut /> }];
  function disabled(id: string) {
    return repo.deleted || repo.left || (repo.archived && !["info", "restore", "delete"].includes(id)) || (["edit", "files", "requests"].includes(id) && repo.role === "ویرایشگر") || (["archive", "delete", "questions", "document-requests"].includes(id) && repo.role !== "مالک") || (id === "leave" && repo.role === "مالک") || (id === "published" && !repo.published) || (id === "archive" && repo.archived) || (id === "restore" && (!repo.archived || repo.role !== "مالک"));
  }
  return <section data-test-id="repository-options-experience" className="space-y-5">
    <div data-test-id="repository-options-intro" className="flex flex-wrap items-start justify-between gap-3">
      <div data-test-id="repository-options-heading"><h1 data-test-id="repository-options-title" className="text-xl font-bold">دیالوگ‌های گزینه‌های مخزن</h1><p data-test-id="repository-options-description" className="mt-2 text-xs leading-relaxed text-muted-foreground">هر گزینه را جداگانه باز کنید؛ تغییرها فقط در مخزن نمونهٔ همین صفحه باقی می‌مانند.</p></div>
      <Button data-test-id="repository-options-reset" ref={resetRef} variant="outline" size="sm" onClick={() => { setRepo(initialRepository()); setNotice("نمونه بازنشانی شد."); }}>بازنشانی نمونه</Button>
    </div>
    <GlassCard data-test-id="repository-options-summary" className="flex flex-wrap items-center gap-4 p-4">
      <GlassEmblem data-test-id="repository-options-avatar" className="size-10"><FolderOpen aria-hidden="true" className={`size-5 ${repo.image === "blue" ? "text-blue-600" : repo.image === "green" ? "text-green-600" : repo.image === "orange" ? "text-orange-600" : "text-purple-600"}`} /></GlassEmblem>
      <div data-test-id="repository-options-name-copy" className="min-w-0 flex-1"><h2 data-test-id="repository-options-name" className="wrap-anywhere text-sm font-semibold">{repo.name}</h2><p data-test-id="repository-options-state" className="mt-1 text-xs text-muted-foreground">{repo.deleted ? "حذف‌شده در نمونه" : repo.left ? "عضویت پایان‌یافته در نمونه" : repo.archived ? "بایگانی‌شده" : "فعال"} · {repo.bookmarked ? "نشان‌شده" : "بدون نشان"} · {repo.members.length} عضو</p></div>
      <div data-test-id="repository-options-role" className="w-36"><SelectField data-test-id="repo-preview-role-select" label="نقش نمایشی شما" value={repo.role} options={[{ value: "مالک", label: "مالک" }, { value: "مدیر", label: "مدیر" }, { value: "ویرایشگر", label: "ویرایشگر" }]} onValueChange={value => setRepo(current => ({ ...current, role: value as PreviewRole }))} /></div>
      <GlassOptionsMenu testId="repository-options-menu" title={repo.name} description={`گزینه‌های مخزن · ${repo.role}`} icon={<FolderOpen />} items={activeOptions} triggerRef={menuRef}
        trigger={<OptionsButton data-test-id="repository-options-menu" aria-label="گزینه‌های مخزن نمونه" disabled={repo.deleted || repo.left} />}
        onAction={(id, label) => setSelection({ id, label, trigger: menuRef.current })} />
    </GlassCard>
    <p data-test-id="repository-options-status" role="status" className="min-h-4 text-xs text-success">{notice}</p>
    <div data-test-id="repository-options-gallery" className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
      {allOptions.map(option => <GlassCard key={option.id} data-test-id={`repository-option-card-${option.id}`} className="flex min-w-0 items-center gap-3 p-3">
        <GlassEmblem data-test-id={`repository-option-icon-${option.id}`} className="size-8 [&_svg]:size-4">{option.icon}</GlassEmblem>
        <div data-test-id={`repository-option-copy-${option.id}`} className="min-w-0 flex-1"><h3 data-test-id={`repository-option-label-${option.id}`} className="text-xs font-semibold">{option.label}</h3><p data-test-id={`repository-option-description-${option.id}`} className="mt-1 text-[11px] text-muted-foreground">{option.id === "restore" ? "پس از بایگانی فعال می‌شود" : option.id === "leave" ? "برای اعضای غیرمالک" : "نمایش و بررسی مستقل"}</p></div>
        <Button data-test-id={`repository-option-open-${option.id}`} variant="outline" size="sm" disabled={disabled(option.id)} onClick={event => setSelection({ id: option.id, label: option.label, trigger: event.currentTarget })}>نمایش</Button>
      </GlassCard>)}
    </div>
    {selection && <RepositoryActionDialog selection={selection} close={() => setSelection(null)} announce={setNotice} fallbackFocusRef={resetRef} />}
  </section>;
}
export function RepositoryOptionsExperience() { return <RepositoryPreviewProvider><Experience /></RepositoryPreviewProvider>; }
