"use client";

import { useRef, useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";

import { glass } from "@/lib/design-system/classes";

import { PreviewList } from "../preview-list";
import { useDocumentPreview } from "./context";

const roles = ["مدیر", "ویرایشگر", "نویسنده", "بیننده"].map(value => ({ value, label: value }));
export function DocumentAccess({ blocked = false }: { blocked?: boolean }) {
  const { push, back } = useDialogNavigation();
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
      <form data-test-id="doc-access-add-form" className={blocked ? "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2" : "grid grid-cols-[minmax(0,1fr)_6rem_auto] items-end gap-2"} onSubmit={event => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        if (records.some(item => item.name === trimmed)) { setMessage("این کاربر در فهرست وجود دارد."); return; }
        setDocument(current => blocked ? { ...current, blocked: [...current.blocked, trimmed] } : { ...current, recipients: [...current.recipients, { id: crypto.randomUUID(), name: trimmed, role }] });
        setName(""); setMessage("دسترسی نمونه به‌روز شد."); input.current?.focus();
      }}>
        <TextField data-test-id="doc-access-username" ref={input} label="شناسهٔ پادی" required value={name} onValueChange={setName} />
        {!blocked && <SelectField data-test-id="doc-access-role" label="نقش دسترسی" options={roles} value={role} onValueChange={setRole} />}
        <Button className="h-[var(--control-height)]" data-test-id="doc-access-add" type="submit" disabled={!name.trim()} size="sm">افزودن</Button>
      </form>
    <p data-test-id="doc-access-message" role="status" className="text-xs text-success">{message}</p>
    <PreviewList testId="doc-access-list" items={records} noun="کاربر" render={person => <div data-test-id={`doc-access-person-${person.id}`} className={`${glass.contentSurface} flex items-center justify-between gap-2 p-2`}>
      <span data-test-id={`doc-access-person-name-${person.id}`} className="min-w-0 flex-1 wrap-anywhere text-xs">{person.name}</span>
      {!blocked && <div data-test-id={`doc-access-person-role-${person.id}`} className="w-24"><SelectField data-test-id={`doc-access-select-${person.id}`} label="نقش" value={person.role} options={roles} onValueChange={value => setDocument(current => ({ ...current, recipients: current.recipients.map(item => item.id === person.id ? { ...item, role: value } : item) }))} /></div>}
      <Button data-test-id={`doc-access-remove-${person.id}`} variant="destructive-outline" size="sm" onClick={() => push(blocked ? "برداشتن محدودیت" : "حذف دسترسی", <div data-test-id="doc-access-remove-confirm" className="space-y-3"><p data-test-id="doc-access-remove-target" className="text-xs">دسترسی «{person.name}» تغییر کند؟</p><Button data-test-id="doc-access-remove-submit" variant="destructive" onClick={() => { remove(person.id); back(); }}>تأیید</Button></div>)}>حذف</Button>
    </div>} />
  </div>;
}
