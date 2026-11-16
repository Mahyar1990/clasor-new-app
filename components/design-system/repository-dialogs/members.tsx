"use client";
import { OptionsButton } from "@/components/ui/OptionsButton";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { SelectField } from "@/components/ui/select-field";
import { TextField, SearchField } from "@/components/ui/text-field";

import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button";
import { PreviewList } from "./list";
import { MemberSettings, MemberConfirm, MemberRole, roles } from "./member-pages";
import { useRepositoryPreview, type PreviewRecord } from "./context";
export function Members() {
  const { repo, setRepo } = useRepositoryPreview();
  const { push } = useDialogNavigation();
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("بیننده");
  const canManage = repo.role !== "ویرایشگر";
  function action(id: string, member: PreviewRecord, origin?: HTMLElement | null) {
    if (id === "role") push("تغییر نقش کاربر", <MemberRole member={member} />, origin);
    if (id === "advanced" || id === "notifications") push(id === "advanced" ? "محدودسازی دسترسی کاربر" : "دسترسی اعلانات", <MemberSettings member={member} notifications={id === "notifications"} />, origin);
    if (id === "transfer" || id === "remove") push(id === "transfer" ? "انتقال مالکیت" : "حذف کاربر", <MemberConfirm member={member} transfer={id === "transfer"} />, origin);
  }
  return <div data-test-id="repo-share-members" className="space-y-3">
    {canManage && <form data-test-id="repo-share-add-form" className="grid grid-cols-[minmax(0,1fr)_6rem_auto] items-end gap-2" onSubmit={event => { event.preventDefault(); if (!name.trim() || repo.members.some(item => item.detail === name.trim())) return; setRepo(current => ({ ...current, members: [{ id: crypto.randomUUID(), name: name.trim(), role, detail: name.trim() }, ...current.members] })); setName(""); }}>
      <TextField data-test-id="repo-share-add-name" label="شناسه پادی" value={name} onValueChange={setName} required />
      <SelectField data-test-id="repo-share-role-select" label="نقش" options={roles} value={role} onValueChange={setRole} />
      <Button className="h-[var(--control-height)]" data-test-id="repo-share-add" type="submit" size="sm" disabled={!name.trim()}>افزودن</Button>
    </form>}
    <SearchField data-test-id="repo-share-search" label="جستجوی اعضا" value={query} onValueChange={setQuery} />
    <PreviewList key={query} testId="repo-members-list" noun="عضو" items={repo.members.filter(item => `${item.name} ${item.detail}`.includes(query))} render={item => <div data-test-id={`repo-share-person-${item.id}`} className={glass.compactRecord}>
      <Avatar data-test-id={`repo-member-avatar-${item.id}`} className="size-7 shrink-0">{item.avatarUrl && <AvatarImage data-test-id={`repo-member-image-${item.id}`} src={item.avatarUrl} alt="" />}<AvatarFallback data-test-id={`repo-member-fallback-${item.id}`}><UserRound aria-hidden="true" className="size-4" /></AvatarFallback></Avatar>
      <div data-test-id={`repo-member-copy-${item.id}`} className="min-w-0 flex-1"><p data-test-id={`repo-member-name-${item.id}`} className="truncate text-xs">{item.name}</p><p data-test-id={`repo-member-meta-${item.id}`} className="truncate text-[10px] text-muted-foreground">{item.detail}</p></div>
      <span data-test-id={`repo-member-role-${item.id}`} className="text-[11px] text-primary">{item.role}</span>
      <GlassOptionsMenu testId={`repo-member-menu-${item.id}`} title={`عملیات ${item.name}`} description={item.role ?? "عضو"} trigger={<OptionsButton data-test-id={`repo-member-menu-${item.id}`} aria-label={`عملیات ${item.name}`} />} items={[
        { id: "advanced", label: "دسترسی پیشرفته" },
        ...(canManage ? [{ id: "notifications", label: "دسترسی اعلانات" }, ...(item.role !== "مالک" ? [{ id: "role", label: "تغییر نقش" }] : [])] : []),
        ...(repo.role === "مالک" && item.role !== "مالک" ? [{ id: "transfer", label: "انتقال مالکیت" }, { id: "remove", label: "حذف کاربر", destructive: true }] : []),
      ]} onAction={(id, _label, trigger) => action(id, item, trigger)} />
    </div>} />
  </div>;
}
