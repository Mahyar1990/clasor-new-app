"use client";

import { useState } from "react";
import { CheckboxField, RadioField, SwitchField } from "@/components/ui/choice-field";
import { SelectField } from "@/components/ui/select-field";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { GlassPreviewFrame } from "./glass-preview-frame";

export function GlassControlStatesCatalogue() {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [choice, setChoice] = useState("private");
  return <GlassPreviewFrame title="کنترل‌های شیشه‌ای؛ حالت‌ها و تم‌ها" testId="glass-control-states">
    <div data-test-id="glass-control-states-grid" className="grid gap-5 md:grid-cols-2">
      <div data-test-id="glass-control-states-choices" className="space-y-3">
        <CheckboxField data-test-id="glass-state-checkbox" label="انتخاب سند نمونه" checked={checked} onCheckedChange={setChecked} />
        <CheckboxField data-test-id="glass-state-partial" label="انتخاب جزئی" indeterminate />
        <CheckboxField data-test-id="glass-state-disabled" label="انتخاب غیرفعال" disabled disabledReason="این سند در نمونه قفل است." />
        <CheckboxField data-test-id="glass-state-checkbox-error" label="تأیید لازم است" error="پیش از ادامه این مورد را بررسی کنید." />
        <SwitchField data-test-id="glass-state-switch" label="اعلان تغییرات نمونه" checked={enabled} onCheckedChange={setEnabled} />
        <SwitchField data-test-id="glass-state-switch-off" label="اعلان خاموش" defaultChecked={false} />
        <SwitchField data-test-id="glass-state-switch-error" label="تنظیم نیازمند بررسی" error="وضعیت را دوباره بررسی کنید." />
      </div>
      <div data-test-id="glass-control-states-fields" className="space-y-4">
        <RadioField label="نوع دسترسی نمونه" value={choice} onValueChange={value => setChoice(String(value))} options={[{ value: "private", label: "خصوصی" }, { value: "link", label: "با پیوند" }, { value: "public", label: "عمومی", disabled: true, disabledReason: "انتشار عمومی در این نمونه فعال نیست." }]} />
        <SelectField data-test-id="glass-state-select" label="مخزن نمونه" defaultValue="design" options={[{ value: "design", label: "تیم طراحی" }, { value: "product", label: "تیم محصول" }]} />
        <p data-test-id="glass-state-select-motion" className="text-xs text-muted-foreground">منوی مخزن بدون لغزش یا زوم محو می‌شود. بازکردن با صفحه‌کلید، حرکت بین گزینه‌ها و بستن با Escape را امتحان کنید.</p>
        <TextField data-test-id="glass-state-text" label="عنوان نمونه" placeholder="راهنمای طراحی" />
        <TextField data-test-id="glass-state-error" label="عنوان نیازمند اصلاح" defaultValue="عنوان ناقص" error="یک عنوان مشخص‌تر وارد کنید." />
        <TextField data-test-id="glass-state-readonly" label="شناسهٔ فقط‌خواندنی" defaultValue="DOC-1042" readOnly dir="ltr" description="قابل انتخاب و کپی است." />
        <TextField data-test-id="glass-state-text-disabled" label="عنوان غیرفعال" defaultValue="سند بایگانی‌شده" disabled disabledReason="در حالت بایگانی نمی‌توان عنوان را ویرایش کرد." />
        <SelectField data-test-id="glass-state-select-error" label="مخزن مقصد" error="یک مخزن مقصد انتخاب کنید." options={[{ value: "design", label: "تیم طراحی" }, { value: "archived", label: "مخزن بایگانی‌شده", disabled: true }]} />
      </div>
    </div>
    <div data-test-id="glass-control-states-buttons" className="flex flex-wrap gap-3">
      <Button data-test-id="glass-state-primary">اقدام اصلی</Button>
      <Button data-test-id="glass-state-secondary" variant="outline">اقدام ثانویه</Button>
      <Button data-test-id="glass-state-danger" variant="destructive">اقدام حساس</Button>
      <Button data-test-id="glass-state-danger-outline" variant="destructive-outline">حساس ثانویه</Button>
      <Button data-test-id="glass-state-button-disabled" disabled>غیرفعال</Button>
    </div>
  </GlassPreviewFrame>;
}
