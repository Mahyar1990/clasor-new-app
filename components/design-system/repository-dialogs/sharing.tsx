"use client";
import { useRef, useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { SelectField } from "@/components/ui/select-field";
import { TextField, SearchField } from "@/components/ui/text-field";
import { SwitchField } from "@/components/ui/choice-field";
import { CopyField } from "@/components/ui/CopyField";
import { DialogSection } from "@/components/ui/DialogSection";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "./list";
import { useRepositoryPreview } from "./context";
const roles = [{ value: "مدیر", label: "مدیر" }, { value: "ویرایشگر", label: "ویرایشگر" }, { value: "نویسنده", label: "نویسنده" }, { value: "بیننده", label: "بیننده" }];
function Members({ groups = false }: { groups?: boolean }) {
  const { repo, setRepo } = useRepositoryPreview();
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("بیننده");
  const items = groups ? repo.groups : repo.members;
  const canManage = repo.role !== "ویرایشگر";
  const searchRef = useRef<HTMLInputElement>(null);
  function updatePerson(id: string, role: string) { setRepo(current => groups ? { ...current, groups: current.groups.map(item => item.id === id ? { ...item, role } : item) } : { ...current, members: current.members.map(item => item.id === id ? { ...item, role } : item) }); }
  function removePerson(id: string) { setRepo(current => groups ? { ...current, groups: current.groups.filter(item => item.id !== id) } : { ...current, members: current.members.filter(item => item.id !== id) }); }
  return <div data-test-id={groups ? "repo-share-groups" : "repo-share-members"} className="space-y-3">
    {canManage && <form data-test-id="repo-share-add-form" className="space-y-3 rounded-lg border border-white/40 bg-white/15 p-3" onSubmit={event => { event.preventDefault(); if (!name.trim()) return; const item = { id: crypto.randomUUID(), name: name.trim(), role, detail: groups ? "گروه نمونه" : name }; setRepo(current => groups ? { ...current, groups: [item, ...current.groups] } : { ...current, members: [item, ...current.members] }); setName(""); }}>
      <TextField data-test-id="repo-share-add-name" label={groups ? "نام گروه" : "ایمیل یا شناسهٔ کاربر"} value={name} onValueChange={setName} required />
      <SelectField data-test-id="repo-share-role-select" label="نقش دسترسی" options={roles} value={role} onValueChange={setRole} />
      <Button data-test-id="repo-share-add" type="submit" disabled={!name.trim()}>افزودن {groups ? "گروه" : "کاربر"} نمونه</Button>
    </form>}
    <SearchField ref={searchRef} data-test-id="repo-share-search" label={groups ? "جستجوی گروه" : "جستجوی اعضا"} value={query} onValueChange={setQuery} />
    <PreviewList key={query} testId={groups ? "repo-groups-list" : "repo-members-list"} noun={groups ? "گروه" : "عضو"} items={items.filter(item => `${item.name} ${item.detail}`.includes(query))} render={item => <div data-test-id={`repo-share-person-${item.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/40 bg-white/15 p-3">
      <div data-test-id={`repo-share-person-copy-${item.id}`} className="min-w-0 flex-1"><p data-test-id={`repo-share-person-name-${item.id}`} className="text-xs font-medium">{item.name}</p><p data-test-id={`repo-share-person-detail-${item.id}`} className="break-all text-[11px] text-muted-foreground">{item.detail}</p></div>
      {canManage && item.role !== "مالک" ? <div data-test-id={`repo-share-person-controls-${item.id}`} className="flex items-end gap-2">
        <div data-test-id={`repo-share-person-select-${item.id}`} className="w-28"><SelectField data-test-id={`repo-share-role-${item.id}`} label="نقش" options={roles} value={item.role} onValueChange={value => updatePerson(item.id, value)} /></div>
        <DestructiveDialog contentClassName={cn(glass.liquidFloating, glass.dialogCompact, glass.dialogConfirmation)} fallbackFocusRef={searchRef} title={groups ? "حذف دسترسی گروه" : "حذف دسترسی عضو"} description="دسترسی فقط در این مخزن نمونه حذف می‌شود." targetName={item.name} confirmLabel="حذف دسترسی نمونه" trigger={<Button data-test-id={`repo-share-remove-${item.id}`} variant="destructive-outline" size="icon" aria-label={`حذف دسترسی ${item.name}`}><Trash2 aria-hidden="true" /></Button>} onConfirm={() => removePerson(item.id)} />
      </div> : <span data-test-id={`repo-share-person-role-${item.id}`} className="text-xs text-primary">{item.role}</span>}
    </div>} />
  </div>;
}
function JoinLink() {
  const { repo } = useRepositoryPreview();
  const [role, setRole] = useState("بیننده");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");
  const [minimumExpiry] = useState(() => new Date(Date.now() + 86400000).toLocaleDateString("en-CA"));
  const [url, setUrl] = useState("");
  return <form data-test-id="repo-join-form" className="space-y-4" onSubmit={event => { event.preventDefault(); setUrl(`https://example.com/join/demo-${encodeURIComponent(role)}-${crypto.randomUUID().slice(0, 8)}`); }}>
    <DialogSection testId="repo-join-settings" title="لینک پیوستن به مخزن" description={`نقش اعضایی که به «${repo.name}» می‌پیوندند را مشخص کنید.`}>
      <SelectField data-test-id="repo-join-role-select" label="نقش لینک" options={roles} value={role} onValueChange={setRole} />
      <SwitchField label="افزودن رمز عبور" checked={passwordEnabled} onCheckedChange={value => setPasswordEnabled(!!value)} />
      {passwordEnabled && <TextField data-test-id="repo-join-password" label="رمز عبور لینک" type="password" required value={password} onValueChange={setPassword} />}
      <SwitchField label="افزودن تاریخ انقضای لینک" checked={expiryEnabled} onCheckedChange={value => setExpiryEnabled(!!value)} />
      {expiryEnabled && <TextField data-test-id="repo-join-expiry" label="تاریخ انقضا" type="date" min={minimumExpiry} required value={expiry} onValueChange={setExpiry} />}
    </DialogSection>
    <Button data-test-id="repo-join-create" type="submit">ایجاد لینک نمونه</Button>
    {url && <CopyField testId="repo-join-link" label="لینک پیوستن نمایشی" value={url} />}
  </form>;
}
export function RepositoryPublication() {
  const { repo, setRepo } = useRepositoryPreview();
  const [enabled, setEnabled] = useState(repo.published);
  const [status, setStatus] = useState("");
  return <div data-test-id="repo-publication" className="space-y-4">
    <DialogSection testId="repo-publication-settings" title="انتشار مخزن" description="وضعیت انتشار فقط در مخزن نمایشی تغییر می‌کند."><SwitchField label="فعال بودن انتشار مخزن" checked={enabled} onCheckedChange={value => setEnabled(!!value)} /><Button data-test-id="repo-publication-save" onClick={() => { setRepo(current => ({ ...current, published: enabled })); setStatus("تنظیم انتشار نمونه ذخیره شد."); }}>ذخیره تنظیم انتشار</Button></DialogSection>
    {repo.published && <CopyField testId="repo-publication-link" label="نشانی صفحهٔ منتشرشدهٔ نمونه" value={`https://example.com/publish/${encodeURIComponent(repo.id)}`} />}
    <p data-test-id="repo-publication-status" role="status" className="text-xs text-success">{status}</p>
  </div>;
}
export function RepositorySharing() {
  const { repo } = useRepositoryPreview();
  return <ClasorTabs label="اشتراک گذاری مخزن" variant="segmented" defaultValue="people" items={[
    { value: "people", label: "اشتراک گذاری", content: <Members /> },
    { value: "groups", label: "گروه‌ها", content: <Members groups /> },
    ...(repo.role !== "ویرایشگر" ? [{ value: "link", label: "لینک", content: <JoinLink data-test-id="repo-join-content" /> }] : []),
    ...(repo.role === "مالک" ? [{ value: "publish", label: "انتشار", content: <RepositoryPublication /> }] : []),
  ]} />;
}
