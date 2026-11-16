"use client";
import { useRef, useState } from "react";
import { FileText, Plus, KeyRound } from "lucide-react";
import { FileInput } from "@/components/ui/file-input";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { CopyField } from "@/components/ui/CopyField";
import { DialogSection } from "@/components/ui/DialogSection";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "./list";
import { useRepositoryPreview } from "./context";

export function RepositoryFiles() {
  const { repo, setRepo } = useRepositoryPreview();
  const [fileRevision, setFileRevision] = useState(0);
  const [selected, setSelected] = useState<File | null>(null);
  return <div data-test-id="repo-files" className="space-y-4">
    <DialogSection testId="repo-file-upload" title="افزودن فایل" description="فایل در این نمونه فقط به فهرست محلی اضافه می‌شود.">
      <FileInput key={fileRevision} data-test-id="repo-file-picker" label="فایل مخزن" onFileChange={setSelected} />
      <Button data-test-id="repo-file-add" disabled={!selected} onClick={() => { if (selected) setRepo(current => ({ ...current, files: [{ id: crypto.randomUUID(), name: selected.name, detail: `${Math.ceil(selected.size / 1024)} کیلوبایت · نمایشی` }, ...current.files] })); setSelected(null); setFileRevision(value => value + 1); }}>افزودن فایل نمونه</Button>
    </DialogSection>
    <PreviewList testId="repo-files-list" items={repo.files} noun="فایل" render={item => <div data-test-id={`repo-file-${item.id}`} className="flex items-center gap-3 rounded-lg border border-white/40 bg-white/15 p-3"><FileText aria-hidden="true" className="size-5 shrink-0 text-primary" /><div data-test-id={`repo-file-copy-${item.id}`} className="min-w-0 flex-1"><p data-test-id={`repo-file-name-${item.id}`} className="break-words text-xs font-medium">{item.name}</p><p data-test-id={`repo-file-meta-${item.id}`} className="text-[11px] text-muted-foreground">{item.detail}</p></div></div>} />
  </div>;
}

export function RepositoryKeys() {
  const { repo, setRepo } = useRepositoryPreview();
  const [create, setCreate] = useState(false);
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState("");
  const [status, setStatus] = useState("");
  const createRef = useRef<HTMLButtonElement>(null);
  return <div data-test-id="repo-keys" className="space-y-4">
    <Button data-test-id="repo-key-create" ref={createRef} variant="outline" disabled={repo.role === "ویرایشگر"} disabledReason="ایجاد کلید فقط برای مالک و مدیر فعال است." onClick={() => setCreate(!create)}><Plus aria-hidden="true" />{create ? "بازگشت به فهرست کلیدها" : "ایجاد کلید"}</Button>
    {create ? <form data-test-id="repo-key-form" className="space-y-3" onSubmit={event => { event.preventDefault(); setRepo(current => ({ ...current, keys: [...current.keys, { id: crypto.randomUUID(), name, value: `DEMO-PUBLIC-${generated}`, detail: "کلید نمایشی" }] })); setCreate(false); setName(""); setGenerated(""); setStatus("کلید نمایشی اضافه شد."); }}>
      <TextField data-test-id="repo-key-name" label="نام کلید" value={name} required onValueChange={setName} />
      <Button data-test-id="repo-key-generate" type="button" variant="outline" onClick={() => setGenerated(crypto.randomUUID())}><KeyRound aria-hidden="true" />تولید کلید نمایشی</Button>
      {generated && <><CopyField testId="repo-new-public-key" label="کلید عمومی" value={`DEMO-PUBLIC-${generated}`} /><CopyField testId="repo-new-private-key" label="کلید خصوصی" value={`DEMO-PRIVATE-${generated}`} secret /><p data-test-id="repo-key-warning" className="text-xs text-warning">کلید خصوصی فقط در همین مرحله نمایش داده می‌شود. این کلیدها نمایشی و غیرقابل استفاده‌اند.</p></>}
      <Button data-test-id="repo-key-save" type="submit" disabled={!name.trim() || !generated}>ثبت کلید نمونه</Button>
    </form> : <PreviewList testId="repo-keys-list" items={repo.keys} noun="کلید" render={item => <DialogSection testId={`repo-key-${item.id}`} title={item.name} description={item.detail}>
      <CopyField testId={`repo-key-value-${item.id}`} label="کلید عمومی" value={item.value ?? ""} />
      {repo.role !== "ویرایشگر" && <DestructiveDialog contentClassName={cn(glass.liquidFloating, glass.dialogCompact, glass.dialogConfirmation)} fallbackFocusRef={createRef} title="حذف کلید" description="کلید از مخزن نمایشی حذف می‌شود." targetName={item.name} confirmLabel="حذف کلید نمونه" trigger={<Button data-test-id={`repo-key-delete-${item.id}`} variant="destructive-outline" size="sm">حذف کلید</Button>} onConfirm={() => { setRepo(current => ({ ...current, keys: current.keys.filter(key => key.id !== item.id) })); }} />}
    </DialogSection>} />}
    <p data-test-id="repo-key-status" role="status" className="text-xs text-success">{status}</p>
  </div>;
}
