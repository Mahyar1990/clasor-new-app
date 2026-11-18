"use client";
import { useId } from "react";
import { TextField } from "./text-field";
import { Input } from "./input";

/** Editable hex value plus a native color picker, sharing one controlled value. */
export function ColorField({ label, value, onValueChange, testId, disabled }: {
  label: string; value: string; onValueChange: (value: string) => void; testId: string; disabled?: boolean;
}) {
  const id = useId();
  const valid = /^#[0-9a-f]{6}$/i.test(value);
  return <div data-test-id={testId} className="flex min-w-0 items-end gap-2">
    <div data-test-id={`${testId}-text-wrap`} className="min-w-0 flex-1"><TextField data-test-id={`${testId}-hex`} label={label} dir="ltr" value={value} disabled={disabled} maxLength={7} onValueChange={onValueChange} error={valid ? undefined : "کد شش‌رقمی رنگ را وارد کنید."} /></div>
    <label data-test-id={`${testId}-picker-label`} htmlFor={id} className="sr-only">انتخاب رنگ {label}</label>
    <Input data-test-id={`${testId}-picker`} id={id} type="color" aria-label={`انتخاب رنگ ${label}`} value={valid ? value : "#ffffff"} disabled={disabled} onChange={event => onValueChange(event.target.value)} className="mb-0.5 h-9 w-10 shrink-0 cursor-pointer p-1" />
  </div>;
}
