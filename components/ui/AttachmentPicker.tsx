"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
export interface AttachmentItem { id: string; file: File }
export function AttachmentPicker({ value, onValueChange, accept, maxFiles = 6, maxSizeBytes = 1048576, testId }: { value: AttachmentItem[]; onValueChange: (files: AttachmentItem[]) => void; accept: string; maxFiles?: number; maxSizeBytes?: number; testId: string }) {
  const picker = useRef<HTMLInputElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  useLayoutEffect(() => { if (returnFocus.current) { returnFocus.current = false; addButton.current?.focus(); } }, [value]);
  const [error, setError] = useState("");
  const id = useId();
  function add(files: File[]) {
    if (value.length + files.length > maxFiles) { setError(`حداکثر ${maxFiles} فایل انتخاب کنید.`); return; }
    if (files.some(file => file.size > maxSizeBytes)) { setError(`حجم هر فایل نباید بیشتر از ${maxSizeBytes / 1048576} مگابایت باشد.`); return; }
    if (files.some(file => !accept.split(",").some(extension => file.name.toLowerCase().endsWith(extension.trim())))) { setError("فرمت فایل مجاز نیست."); return; }
    onValueChange([...value, ...files.map(file => ({ id: crypto.randomUUID(), file }))]);
    setError("");
  }
  return <div data-test-id={testId} className="space-y-2">
    <div data-test-id={`${testId}-toolbar`} className="flex flex-wrap items-center justify-between gap-2">
      <span data-test-id={`${testId}-label`} id={`${id}-label`} className="text-xs font-medium">پیوست‌ها <span data-test-id={`${testId}-count`} className="text-muted-foreground">({value.length}/{maxFiles})</span></span>
      <Button data-test-id={`${testId}-add`} ref={addButton} variant="outline" size="sm" type="button" disabled={value.length >= maxFiles} aria-describedby={`${id}-help ${id}-error`} onClick={() => picker.current?.click()}><Paperclip aria-hidden="true" />افزودن پیوست</Button>
    </div>
    <input data-slot="input" data-test-id={`${testId}-input`} ref={picker} type="file" hidden multiple accept={accept} aria-labelledby={`${id}-label`} onChange={event => { add(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
    <p data-test-id={`${testId}-help`} id={`${id}-help`} className="text-[10px] text-muted-foreground">حداکثر {maxFiles} فایل · هر فایل تا {maxSizeBytes / 1048576} مگابایت</p>
    {value.map(item => <div data-test-id={`${testId}-file-${item.id}`} key={item.id} className={`${glass.compactRecord} py-1`}>
      <Paperclip aria-hidden="true" className="size-3 shrink-0 text-primary" />
      <span data-test-id={`${testId}-name-${item.id}`} className="min-w-0 flex-1 truncate text-[11px]" title={item.file.name}>{item.file.name}</span>
      <span data-test-id={`${testId}-size-${item.id}`} className="text-[10px] text-muted-foreground">{new Intl.NumberFormat("fa").format(Math.ceil(item.file.size / 1024))} KB</span>
      <Button data-test-id={`${testId}-remove-${item.id}`} variant="ghost" size="icon-sm" type="button" aria-label={`حذف پیوست ${item.file.name}`} onClick={() => { returnFocus.current = true; onValueChange(value.filter(file => file.id !== item.id)); setError(""); }}><X aria-hidden="true" /></Button>
    </div>)}
    <p data-test-id={`${testId}-error`} id={`${id}-error`} role="alert" className={error ? "text-xs text-danger" : "sr-only"}>{error}</p>
  </div>;
}
