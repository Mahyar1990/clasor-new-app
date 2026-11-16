"use client";
import { useState } from "react";
import { TextField, SearchField } from "@/components/ui/text-field";
import { SwitchField } from "@/components/ui/choice-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { useRepositoryPreview, type PreviewRecord } from "./context";
export const roles = ["مدیر", "ویرایشگر", "نویسنده", "بیننده"].map(value => ({ value, label: value }));
export function MemberSettings({ member, notifications = false }: { member: PreviewRecord; notifications?: boolean }) {
  const { repo, setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const [query, setQuery] = useState("");
  const services = notifications ? Object.keys(repo.notifications) : ["مشاهده اسناد", "ایجاد سند", "ویرایش سند", "حذف سند", "مدیریت فایل‌ها", "ایجاد دسته‌بندی"];
  const prefix = notifications ? "notification:" : "blocked:";
  const [settings, setSettings] = useState(member.settings ?? {});
  return <form data-test-id="repo-member-settings" className="space-y-3" onSubmit={event => { event.preventDefault(); setRepo(current => ({ ...current, members: current.members.map(item => item.id === member.id ? { ...item, settings } : item) })); back(); }}>
    <p data-test-id="repo-member-settings-name" className="text-xs">{member.name} · {notifications ? "اعلانات فعال کاربر" : "دسترسی‌های محدودشدهٔ کاربر"}</p>
    <SearchField data-test-id="repo-member-services-search" label="جستجوی سرویس" value={query} onValueChange={setQuery} />
    <GlassScrollArea data-test-id="repo-member-services" label="سرویس‌های کاربر" className="h-[min(22rem,45dvh)]">
      {services.filter(name => name.includes(query)).map(name => <SwitchField data-test-id={`repo-member-setting-${name}`} key={name} label={name} checked={settings[prefix + name] ?? notifications} onCheckedChange={checked => setSettings(current => ({ ...current, [prefix + name]: checked }))} />)}
    </GlassScrollArea>
    <Button data-test-id="repo-member-settings-save" type="submit">ذخیره</Button>
  </form>;
}
export function MemberConfirm({ member, transfer = false }: { member: PreviewRecord; transfer?: boolean }) {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  return <div data-test-id="repo-member-confirm" className="space-y-3">
    <p data-test-id="repo-member-confirm-description" className="text-xs leading-relaxed">{transfer ? `مالکیت مخزن به «${member.name}» منتقل شود؟ نقش شما به مدیر تغییر می‌کند.` : `دسترسی «${member.name}» به این مخزن حذف شود؟`}</p>
    <Button data-test-id="repo-member-confirm-submit" variant={transfer ? "default" : "destructive"} onClick={() => { setRepo(current => transfer ? { ...current, role: "مدیر", members: current.members.map(item => ({ ...item, role: item.id === member.id ? "مالک" : item.role === "مالک" ? "مدیر" : item.role })) } : { ...current, members: current.members.filter(item => item.id !== member.id), groups: current.groups.map(group => ({ ...group, memberIds: group.memberIds?.filter(id => id !== member.id) })) }); back(); }}>{transfer ? "انتقال مالکیت" : "حذف کاربر"}</Button>
  </div>;
}
export function MemberRole({ member }: { member: PreviewRecord }) {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const [role, setRole] = useState(member.role ?? "بیننده");
  return <form data-test-id="repo-member-role-form" className="space-y-3" onSubmit={event => { event.preventDefault(); setRepo(current => ({ ...current, members: current.members.map(item => item.id === member.id ? { ...item, role } : item) })); back(); }}><TextField data-test-id="repo-member-role-name" label="کاربر" value={member.name} readOnly /><SelectField data-test-id="repo-member-role" label="نقش" value={role} onValueChange={setRole} options={roles} /><Button data-test-id="repo-member-role-save" type="submit">ذخیره</Button></form>;
}
