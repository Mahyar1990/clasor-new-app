"use client";
import { FieldFrame, useFieldMeta } from "./field-frame";
import { Input } from "./input";

/** Compact controlled hex/picker pair, with a shared visible label and error. */
export function ColorField({ label, value, onValueChange, testId, disabled }: {
  label: string; value: string; onValueChange: (value: string) => void; testId: string; disabled?: boolean;
}) {
  const valid = /^#[0-9a-f]{6}$/i.test(value);
  const error = valid ? undefined : "کد شش‌رقمی رنگ را وارد کنید.";
  const meta = { label, disabled, error };
  const { controlId, describedBy } = useFieldMeta(meta);
  return <div data-test-id={testId} className="min-w-0 [&_label]:text-[11px]">
    <FieldFrame {...meta} controlId={controlId}>
      <div data-test-id={`${testId}-text-wrap`} className="flex min-w-0 items-center gap-1.5">
        <Input data-test-id={`${testId}-hex`} id={controlId} aria-describedby={describedBy} aria-invalid={!valid} className="h-8 w-28 max-w-full text-[11px]" dir="ltr" value={value} disabled={disabled} maxLength={7} onChange={event => onValueChange(event.target.value)} />
        <Input data-test-id={`${testId}-picker`} type="color" aria-label={`انتخاب رنگ ${label}`} aria-describedby={describedBy} value={valid ? value : "#ffffff"} disabled={disabled} onChange={event => onValueChange(event.target.value)} className="h-8 w-8 shrink-0 cursor-pointer p-1" />
      </div>
    </FieldFrame>
  </div>;
}
