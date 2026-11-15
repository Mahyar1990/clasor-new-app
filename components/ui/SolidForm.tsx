"use client";

import { cn } from "@/lib/utils";
import { useId, useRef, useState, type FormEvent } from "react";
import { glass } from "@/lib/design-system/classes";
import { Button } from "@/components/ui/button";
import { FieldFrame } from "@/components/ui/field-frame";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SolidFormValues {
  name: string;
  email: string;
  category: string;
}

export interface SolidFormProps {
  disabled?: boolean;
  onSubmit?: (values: SolidFormValues) => void | Promise<void>;
}

type FieldName = keyof SolidFormValues;
const fields = [
  { name: "name", label: "نام و نام خانوادگی", type: "text", autoComplete: "name" },
  { name: "email", label: "ایمیل", type: "email", autoComplete: "email" },
] as const;
const categories = [{ value: "personal", label: "شخصی" }, { value: "team", label: "تیمی" }];
const controlClass = `${glass.input} min-h-11 w-full py-2 ps-3 pe-3 text-start text-base`;

/** Organism: field molecules and a submit atom with the shared glass treatment. */
export function SolidForm({ disabled = false, onSubmit }: SolidFormProps) {
  const id = useId();
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: SolidFormValues = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      category: category ?? "",
    };
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.name) nextErrors.name = "نام و نام خانوادگی را وارد کنید.";
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (!values.email || !email.validity.valid) nextErrors.email = "یک ایمیل معتبر وارد کنید.";
    if (!["personal", "team"].includes(values.category)) nextErrors.category = "یک دسته‌بندی انتخاب کنید.";
    setErrors(nextErrors);
    setStatus("");
    setSubmitError("");
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`${id}-${firstError}`)?.focus();
      return;
    }
    submitting.current = true;
    setBusy(true);
    try {
      await onSubmit?.(values);
      setStatus(onSubmit ? "فرم با موفقیت ارسال شد." : "اطلاعات فرم معتبر است؛ این نمونه به سرویس ذخیره‌سازی متصل نیست.");
    } catch {
      setSubmitError("ارسال فرم انجام نشد. دوباره تلاش کنید.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <form
      dir="rtl"
      noValidate
      aria-labelledby={`${id}-title`}
      aria-busy={busy}
      data-test-id="solid-form"
      onSubmit={handleSubmit}
      onChange={() => { setStatus(""); setSubmitError(""); }}
      className={`${glass.panel} p-4 text-start md:p-6 [&_[data-slot=field-error]]:text-red-700 dark:[&_[data-slot=field-error]]:text-red-400 [&_[data-slot=field-label]_span]:text-inherit`}
    >
      <h2 data-test-id="SolidForm-h2-2" id={`${id}-title`} className="mb-4 text-xl font-bold">ثبت اطلاعات</h2>
      <fieldset data-test-id="SolidForm-fieldset-3" disabled={disabled || busy} className="grid min-w-0 gap-5 md:grid-cols-2">
        <legend data-test-id="SolidForm-legend-4" className="sr-only">اطلاعات فردی؛ همهٔ فیلدها الزامی هستند.</legend>
        {fields.map(field => {
          const controlId = `${id}-${field.name}`;
          return (
            <FieldFrame key={field.name} controlId={controlId} label={field.label} required error={errors[field.name]}>
              <input data-slot="input"
                id={controlId}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                dir={field.name === "email" ? "ltr" : undefined}
                required
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${controlId}-error` : undefined}
                data-test-id={`solid-form-${field.name}`}
                className={cn(controlClass, glass.input)}
              />
            </FieldFrame>
          );
        })}
        <FieldFrame controlId={`${id}-category`} label="دسته‌بندی" required error={errors.category}>
          <Select name="category" required items={categories} value={category} disabled={disabled || busy}
            onValueChange={value => { setCategory(value); setStatus(""); setSubmitError(""); }}>
          <SelectTrigger
            id={`${id}-category`}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? `${id}-category-error` : undefined}
            data-test-id="solid-form-category"
            className="min-h-11"
          >
            <SelectValue placeholder="انتخاب دسته‌بندی" />
          </SelectTrigger>
          <SelectContent dir="rtl" align="start" alignItemWithTrigger={false} data-test-id="solid-form-category-content">
            {categories.map(option => <SelectItem key={option.value} value={option.value} data-test-id={`solid-form-category-${option.value}`}>{option.label}</SelectItem>)}
          </SelectContent>
          </Select>
        </FieldFrame>
        <div data-test-id="SolidForm-div-8" className="flex items-end md:col-span-2">
          <Button type="submit" size="lg" disabled={disabled} loading={busy} data-test-id="solid-form-submit">ثبت اطلاعات</Button>
        </div>
      </fieldset>
      <p role="status" data-test-id="solid-form-status" className="mt-3 text-sm">{status}</p>
      {submitError && <p role="alert" data-test-id="solid-form-error" className="mt-3 text-sm text-red-700 dark:text-red-400">{submitError}</p>}
    </form>
  );
}
