"use client";

import { useState } from "react";
import { TagPicker } from "@/components/ui/TagPicker";
import { GlassPreviewFrame } from "./glass-preview-frame";
export function TagPickerCatalogue() {
  const [errorValue, setErrorValue] = useState<string[]>([]);
  const [value, setValue] = useState(["طراحی"]);
  const options = ["طراحی", "محصول", "توسعه", "آموزش", "پژوهش"];
  return <GlassPreviewFrame title="انتخاب چند برچسب؛ جستجو و حذف چیپ" testId="tag-picker-catalogue">
    <TagPicker testId="catalogue-tag-picker" label="برچسب‌های سند نمونه" value={value} onValueChange={setValue} options={options} description="با Space انتخاب کنید؛ حذف هر برچسب فوکوس را به جستجو برمی‌گرداند." />
    <TagPicker testId="catalogue-tag-picker-disabled" label="برچسب‌های قفل‌شده" value={["محصول"]} onValueChange={() => {}} options={options} disabled />
    <TagPicker testId="catalogue-tag-picker-error" label="نمونهٔ نیازمند اصلاح" value={errorValue} onValueChange={setErrorValue} options={options} error={!errorValue.length ? "برای این نمونه حداقل یک برچسب را انتخاب کنید." : undefined} />
  </GlassPreviewFrame>;
}
