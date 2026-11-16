"use client";

import { useRef, useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { DestructiveDialog } from "@/components/ui/confirmation-dialog";
import { DialogSection } from "@/components/ui/DialogSection";
import { glass } from "@/lib/design-system/classes";
import { cn } from "@/lib/utils";
import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "./context";

const roles = ["مدیر", "ویرایشگر", "نویسنده", "بیننده"].map(value => ({ value, label: value }));
export function DocumentAccess({ blocked = false }: { blocked?: boolean }) {
  const { document, setDocument } = useDocumentPreview();
  const [name, setName] = useState("");
  const [role, setRole] = useState("بیننده");
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const records = blocked ? document.blocked.map(name => ({ id: name, name, role: "بدون دسترسی" })) : document.recipients;
  function remove(id: string) {
    setDocument(current => blocked ? { ...current, blocked: current.blocked.filter(item => item !== id) } : { ...current, recipients: current.recipients.filter(item => item.id !== id) });
  }
  return <div data-test-id="doc-access" className="space-y-4">
    <DialogSection testId="doc-access-add-section" title={blocked ? "محدودیت دسترسی روی پنل" : "دسترسی مستقیم روی سند"} description={blocked ? "کاربران محدودشده در این نمونه به سند در پنل دسترسی ندارند." : "شناسهٔ پادی و نقش دسترسی به همین سند را مشخص کنید."}>
      <form data-test-id="doc-access-add-form" className="space-y-3" onSubmit={event => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        if (records.some(item => item.name === trimmed)) { setMessage("این کاربر در فهرست وجود دارد."); return; }
        setDocument(current => blocked ? { ...current, blocked: [...current.blocked, trimmed] } : { ...current, recipients: [...current.recipients, { id: crypto.randomUUID(), name: trimmed, role }] });
        setName(""); setMessage("دسترسی نمونه به‌روز شد."); input.current?.focus();
      }}>
        <TextField data-test-id="doc-access-username" ref={input} label="شناسهٔ پادی" required value={name} onValueChange={setName} />
        {!blocked && <SelectField data-test-id="doc-access-role" label="نقش دسترسی" options={roles} value={role} onValueChange={setRole} />}
        <Button data-test-id="doc-access-add" type="submit" disabled={!name.trim()}>{blocked ? "افزودن محدودیت" : "افزودن دسترسی"}</Button>
      </form>
    </DialogSection>
    <p data-test-id="doc-access-message" role="status" className="text-xs text-success">{message}</p>
    <PreviewList testId="doc-access-list" items={records} noun="کاربر" render={person => <div data-test-id={`doc-access-person-${person.id}`} className={`${glass.panel} flex flex-wrap items-center justify-between gap-3 p-3`}>
      <span data-test-id={`doc-access-person-name-${person.id}`} className="min-w-0 flex-1 wrap-anywhere text-xs">{person.name}</span>
      {!blocked && <div data-test-id={`doc-access-person-role-${person.id}`} className="w-28"><SelectField data-test-id={`doc-access-select-${person.id}`} label="نقش" value={person.role} options={roles} onValueChange={value => setDocument(current => ({ ...current, recipients: current.recipients.map(item => item.id === person.id ? { ...item, role: value } : item) }))} /></div>}
      <DestructiveDialog title={blocked ? "برداشتن محدودیت" : "حذف دسترسی"} description="این تغییر فقط در سند نمونه اعمال می‌شود." targetName={person.name} confirmLabel={blocked ? "برداشتن محدودیت نمونه" : "حذف دسترسی نمونه"} fallbackFocusRef={input} contentClassName={cn(glass.liquidFloating, glass.dialogCompact, glass.dialogConfirmation)} trigger={<Button data-test-id={`doc-access-remove-${person.id}`} variant="destructive-outline" size="sm">حذف</Button>} onConfirm={() => remove(person.id)} />
    </div>} />
  </div>;
}
