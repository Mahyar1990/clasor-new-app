"use client";
import { useState } from "react";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { SelectField } from "@/components/ui/select-field";
import { TextField } from "@/components/ui/text-field";
import { SwitchField } from "@/components/ui/choice-field";
import { CopyField } from "@/components/ui/CopyField";
import { DialogSection } from "@/components/ui/DialogSection";
import { Button } from "@/components/ui/button";
import { Members } from "./members";
import { Groups } from "./groups";
import { roles } from "./member-pages";
import { useRepositoryPreview } from "./context";
function JoinLink() {
  const { repo, setRepo } = useRepositoryPreview();
  const [role, setRole] = useState("بیننده");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");
  const [minimumExpiry] = useState(() => new Date(Date.now() + 86400000).toLocaleDateString("en-CA"));
  const exists = repo.joinLinks.some(link => link.role === role);
  return <form data-test-id="repo-join-form" className="space-y-4" onSubmit={event => { event.preventDefault(); if (exists) return; setRepo(current => current.joinLinks.some(link => link.role === role) ? current : { ...current, joinLinks: [...current.joinLinks, { id: crypto.randomUUID(), role, url: `https://example.com/join/demo-${crypto.randomUUID()}`, password: passwordEnabled ? password : "", expiresAt: expiryEnabled ? expiry : "" }] }); }}>
    <DialogSection testId="repo-join-settings" title="لینک پیوستن به مخزن" description={`نقش اعضایی که به «${repo.name}» می‌پیوندند را مشخص کنید.`}>
      <SelectField data-test-id="repo-join-role-select" label="نقش لینک" options={roles.map(option => ({ ...option, disabled: repo.joinLinks.some(link => link.role === option.value) }))} value={role} onValueChange={setRole} />
      <SwitchField label="افزودن رمز عبور" checked={passwordEnabled} onCheckedChange={value => setPasswordEnabled(!!value)} />
      {passwordEnabled && <TextField data-test-id="repo-join-password" label="رمز عبور لینک" type="password" required value={password} onValueChange={setPassword} />}
      <SwitchField label="افزودن تاریخ انقضای لینک" checked={expiryEnabled} onCheckedChange={value => setExpiryEnabled(!!value)} />
      {expiryEnabled && <TextField data-test-id="repo-join-expiry" label="تاریخ انقضا" type="date" min={minimumExpiry} required value={expiry} onValueChange={setExpiry} />}
    </DialogSection>
    <Button data-test-id="repo-join-create" type="submit" disabled={exists}>ایجاد لینک نمونه</Button>
    {exists && <p data-test-id="repo-join-existing-role" className="text-xs">لینک این نقش قبلاً ساخته شده است.</p>}
    {repo.joinLinks.map(link => <div data-test-id={`repo-join-existing-${link.id}`} key={link.id} className="space-y-2 rounded-lg border border-white/40 bg-white/15 p-2"><CopyField testId={`repo-join-link-${link.id}`} label={`لینک ${link.role}`} value={link.url} /><Button data-test-id={`repo-join-delete-${link.id}`} type="button" variant="destructive-outline" size="sm" onClick={() => setRepo(current => ({ ...current, joinLinks: current.joinLinks.filter(item => item.id !== link.id) }))}>حذف لینک</Button></div>)}
  </form>;
}
export function RepositoryPublication() {
  const { repo, setRepo } = useRepositoryPreview();
  return <div data-test-id="repo-publication" className="space-y-3">
    {repo.published && <CopyField testId="repo-publication-link" label="نشانی صفحهٔ منتشرشدهٔ نمونه" value={`https://example.com/publish/${encodeURIComponent(repo.id)}`} />}
    <Button data-test-id="repo-publication-save" variant={repo.published ? "destructive-outline" : "default"} onClick={() => setRepo(current => ({ ...current, published: !current.published }))}>{repo.published ? "لغو انتشار" : "انتشار"}</Button>
    <p data-test-id="repo-publication-status" role="status" className="text-xs text-muted-foreground">{repo.published ? "مخزن منتشر شده است." : "مخزن منتشر نشده است."}</p>
  </div>;
}
export function RepositorySharing() {
  const { repo } = useRepositoryPreview();
  return <ClasorTabs label="اشتراک گذاری مخزن" defaultValue="people" items={[
    { value: "people", label: "اشتراک گذاری", content: <Members /> },
    { value: "groups", label: "گروه‌ها", content: <Groups /> },
    ...(repo.role !== "ویرایشگر" ? [{ value: "link", label: "لینک", content: <JoinLink data-test-id="repo-join-content" /> }] : []),
    ...(repo.role === "مالک" ? [{ value: "publish", label: "انتشار", content: <RepositoryPublication /> }] : []),
  ]} />;
}
