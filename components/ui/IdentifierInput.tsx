"use client";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Badge } from "./badge";
import { FieldFrame, useFieldMeta } from "./field-frame";
import { appendIdentifiers } from "@/lib/design-system/identifiers";
export function IdentifierInput({ value, onValueChange, label, testId }: { value: string[]; onValueChange: (value: string[]) => void; label: string; testId: string }) {
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const meta = { label, description: "شناسه‌ها را با فاصله، Enter، کاما یا ویرگول از هم جدا کنید." };
  const { controlId, describedBy } = useFieldMeta(meta);
  function commit(text = draft) { onValueChange(appendIdentifiers(value, text)); setDraft(""); }
  return <div data-test-id={testId}><FieldFrame {...meta} controlId={controlId}>
    <Input data-test-id={`${testId}-input`} id={controlId} ref={input} value={draft} aria-describedby={describedBy} autoComplete="off" placeholder="شناسهٔ کاربر" onChange={event => {
      const text = event.target.value;
      if (/[\s,،]/u.test(text)) { const parts = text.split(/[\s,،]+/u); const last = parts.pop() ?? ""; onValueChange(appendIdentifiers(value, parts.join(" "))); setDraft(last); } else setDraft(text);
    }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); commit(); } }} onBlur={() => { if (draft.trim()) commit(); }} onPaste={event => { const text = event.clipboardData.getData("text"); if (/[\s,،]/u.test(text)) { event.preventDefault(); commit(`${draft.slice(0, event.currentTarget.selectionStart ?? draft.length)}${text}${draft.slice(event.currentTarget.selectionEnd ?? draft.length)}`); } }} />
    <div data-test-id={`${testId}-chips`} className="flex flex-wrap gap-1" aria-label="شناسه‌های انتخاب‌شده">
      {value.map(item => <Badge data-test-id={`${testId}-chip-${item}`} key={item} variant="secondary" className="max-w-full gap-1"><bdi data-test-id={`${testId}-text-${item}`} className="wrap-anywhere">{item}</bdi><Button data-test-id={`${testId}-remove-${item}`} type="button" variant="plain" size="icon-sm" className="size-6" aria-label={`حذف ${item}`} onClick={() => { onValueChange(value.filter(id => id !== item)); input.current?.focus(); }}><X aria-hidden="true" className="size-3!" /></Button></Badge>)}
    </div>
  </FieldFrame></div>;
}
