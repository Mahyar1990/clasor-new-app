"use client";
import { useState } from "react";
import { TextField, TextareaField, SearchField } from "@/components/ui/text-field";
import { CheckboxField } from "@/components/ui/choice-field";
import { Ellipsis } from "lucide-react";
import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button";
import { GlassOptionsMenu } from "@/components/ui/GlassOptionsMenu";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { PreviewList } from "./list";
import { useRepositoryPreview, type PreviewRecord } from "./context";
function GroupEditor({ group }: { group?: PreviewRecord }) {
  const { repo, setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const [name, setName] = useState(group?.name ?? "");
  const [description, setDescription] = useState(group?.description ?? "");
  const [memberIds, setMemberIds] = useState(group?.memberIds ?? []);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  return <form data-test-id="repo-group-form" className="space-y-3" onSubmit={event => { event.preventDefault(); if (repo.groups.some(item => item.id !== group?.id && item.name === name.trim())) { setError("گروهی با این نام وجود دارد."); return; } const record = { ...group, id: group?.id ?? crypto.randomUUID(), name: name.trim(), description, memberIds, role: group?.role ?? "بیننده", detail: `${memberIds.length} عضو` }; setRepo(current => ({ ...current, groups: group ? current.groups.map(item => item.id === group.id ? record : item) : [...current.groups, record] })); back(); }}>
    <TextField data-test-id="repo-group-name" label="نام گروه" value={name} onValueChange={setName} maxLength={500} error={error} required />
    <TextareaField data-test-id="repo-group-description" label="توضیحات" rows={2} value={description} onValueChange={setDescription} maxLength={500} />
    <SearchField data-test-id="repo-group-member-search" label="جستجوی اعضای مخزن" value={query} onValueChange={setQuery} />
    <PreviewList key={query} testId="repo-group-member-options" noun="عضو" items={repo.members.filter(item => item.role !== "مالک" && `${item.name} ${item.detail}`.includes(query))} render={item => <CheckboxField data-test-id={`repo-group-member-${item.id}`} label={item.name} checked={memberIds.includes(item.id)} onCheckedChange={checked => setMemberIds(current => checked ? [...current, item.id] : current.filter(id => id !== item.id))} />} />
    <Button data-test-id="repo-group-save" type="submit" disabled={!name.trim() || !memberIds.length}>{group ? "ذخیره" : "ایجاد گروه"}</Button>
  </form>;
}
function GroupDelete({ group }: { group: PreviewRecord }) {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  return <div data-test-id="repo-group-delete" className="space-y-3"><p data-test-id="repo-group-delete-description" className="text-xs">گروه «{group.name}» حذف شود؟ اعضا از مخزن حذف نمی‌شوند.</p><Button data-test-id="repo-group-delete-submit" variant="destructive" onClick={() => { setRepo(current => ({ ...current, groups: current.groups.filter(item => item.id !== group.id) })); back(); }}>حذف گروه</Button></div>;
}
export function Groups() {
  const { repo } = useRepositoryPreview();
  const { push } = useDialogNavigation();
  const [query, setQuery] = useState("");
  const canManage = repo.role !== "ویرایشگر";
  return <div data-test-id="repo-share-groups" className="space-y-3">
    <Button data-test-id="repo-group-create" size="sm" disabled={!canManage} onClick={() => push("ایجاد گروه", <GroupEditor />)}>ایجاد گروه</Button>
    <SearchField data-test-id="repo-groups-search" label="جستجوی گروه" value={query} onValueChange={setQuery} />
    <PreviewList key={query} testId="repo-groups-list" noun="گروه" items={repo.groups.filter(item => item.name.includes(query))} render={group => <div data-test-id={`repo-group-${group.id}`} className={glass.compactRecord}><div data-test-id={`repo-group-copy-${group.id}`} className="min-w-0 flex-1"><p data-test-id={`repo-group-title-${group.id}`} className="truncate text-xs">{group.name}</p><p data-test-id={`repo-group-meta-${group.id}`} className="text-[10px] text-muted-foreground">{group.memberIds?.length ?? 0} عضو · {group.description || "بدون توضیحات"}</p></div><GlassOptionsMenu testId={`repo-group-menu-${group.id}`} title={`عملیات ${group.name}`} description="گزینه‌های گروه" trigger={<Button data-test-id={`repo-group-menu-${group.id}`} variant="glass" size="icon" aria-label={`عملیات ${group.name}`}><Ellipsis aria-hidden="true" /></Button>} items={[{ id: "edit", label: "ویرایش گروه", disabled: !canManage }, { id: "delete", label: "حذف گروه", destructive: true, disabled: !canManage }]} onAction={(id, _label, trigger) => push(id === "edit" ? "ویرایش گروه" : "حذف گروه", id === "edit" ? <GroupEditor group={group} /> : <GroupDelete group={group} />, trigger)} /></div>} />
  </div>;
}
