"use client";
import { useState } from "react";
import { Plus, KeyRound, Trash2 } from "lucide-react";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { CopyField } from "@/components/ui/CopyField";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "./list";
import { useRepositoryPreview, type PreviewRecord } from "./context";
export { RepositoryFiles } from "./files";
function CreateKey() {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState("");
  return <form data-test-id="repo-key-form" className="space-y-3" onSubmit={event => {
    event.preventDefault();
    setRepo(current => ({ ...current, keys: [...current.keys, { id: crypto.randomUUID(), name: name.trim(), value: `DEMO-PUBLIC-${generated}`, detail: "کلید نمایشی" }] }));
    back();
  }}>
    <TextField data-test-id="repo-key-name" label="نام کلید" value={name} required onValueChange={setName} />
    <Button data-test-id="repo-key-generate" type="button" variant="outline" onClick={() => setGenerated(crypto.randomUUID())}><KeyRound aria-hidden="true" />تولید کلید نمایشی</Button>
    {generated && <>
      <CopyField testId="repo-new-public-key" label="کلید عمومی" value={`DEMO-PUBLIC-${generated}`} />
      <CopyField testId="repo-new-private-key" label="کلید خصوصی" value={`DEMO-PRIVATE-${generated}`} secret />
      <p data-test-id="repo-key-warning" className="text-xs text-warning">کلید خصوصی فقط در همین مرحله نمایش داده می‌شود. این کلیدها نمایشی و غیرقابل استفاده‌اند.</p>
    </>}
    <Button data-test-id="repo-key-save" type="submit" disabled={!name.trim() || !generated}>ثبت کلید نمونه</Button>
  </form>;
}
function DeleteKey({ item }: { item: PreviewRecord }) {
  const { setRepo } = useRepositoryPreview();
  const { back } = useDialogNavigation();
  return <div data-test-id="repo-key-delete-confirm" className="space-y-3">
    <p data-test-id="repo-key-delete-target" className="text-xs">کلید «{item.name}» حذف شود؟</p>
    <Button data-test-id="repo-key-delete-submit" variant="destructive" onClick={() => { setRepo(current => ({ ...current, keys: current.keys.filter(key => key.id !== item.id) })); back(); }}>حذف کلید</Button>
  </div>;
}
export function RepositoryKeys() {
  const { repo } = useRepositoryPreview();
  const { push } = useDialogNavigation();
  return <div data-test-id="repo-keys" className="space-y-3">
    <Button data-test-id="repo-key-create" variant="outline" size="sm" disabled={repo.role === "ویرایشگر"} disabledReason="ایجاد کلید فقط برای مالک و مدیر فعال است." onClick={() => push("ایجاد کلید", <CreateKey />)}><Plus aria-hidden="true" />ایجاد کلید</Button>
    <PreviewList testId="repo-keys-list" items={repo.keys} noun="کلید" render={item => <div data-test-id={`repo-key-${item.id}`} className={`${glass.contentSurface} grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 p-2`}>
      <CopyField testId={`repo-key-value-${item.id}`} compact label={item.name} value={item.value ?? ""} />
      {repo.role !== "ویرایشگر" && <Button data-test-id={`repo-key-delete-${item.id}`} variant="destructive-outline" size="icon" aria-label={`حذف کلید ${item.name}`} onClick={() => push("حذف کلید", <DeleteKey item={item} />)}><Trash2 aria-hidden="true" /></Button>}
    </div>} />
  </div>;
}
