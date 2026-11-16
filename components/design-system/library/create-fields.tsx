"use client";
import { CreationMembers, type CreationMember } from "./create-members";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { FileInput } from "@/components/ui/file-input";
import { TagPicker } from "@/components/ui/TagPicker";
import { documentTags } from "../document-dialogs/model";
import type { DocumentPreview } from "../document-dialogs/model";
export interface CreationDraft { title: string; description: string; order: string; type: string; version: string; templateId: string; keyId: string; formType: string; formDisplay: string; extension: string; members: CreationMember[]; tags: string[]; image: string }
export const creationDraft: CreationDraft = { title: "", description: "", order: "1", type: "classic", version: "۱", templateId: "", keyId: "", formType: "normal", formDisplay: "classic", extension: "doc", members: [], tags: [], image: "purple" };
export function CreationFields({ step, kind, draft, set, templates }: { step: string; kind: string; draft: CreationDraft; set: <K extends keyof CreationDraft>(key: K, value: CreationDraft[K]) => void; templates: DocumentPreview[] }) {
  return <div data-test-id={`creation-fields-${step}`} className="space-y-3">
    {step === "type" && <SelectField data-test-id="create-type" label="نوع سند" value={draft.type} onValueChange={value => set("type", value)} options={(kind === "template" ? [{ value: "classic", label: "کلاسور" }] : [{ value: "classic", label: "کلاسور" }, { value: "excel", label: "اکسل" }, { value: "office", label: "آفیس" }, { value: "file", label: "فایل" }, { value: "form", label: "فرم" }])} />}
    {step === "type" && draft.type === "office" && <SelectField data-test-id="create-extension" label="نوع فایل آفیس" value={draft.extension} onValueChange={value => set("extension", value)} options={[{ value: "doc", label: "Word (.docx, .doc, .txt, .odt)" }, { value: "xlsx", label: "Excel (.xlsx, .xls, .csv, .ods)" }, { value: "odp", label: "PowerPoint (.pptx, .ppt, .potx, .odp)" }]} />}
    {step === "info" && <><TextField data-test-id="create-title" label={kind === "repository" ? "عنوان مخزن" : kind === "folder" ? "نام دسته‌بندی" : "عنوان سند"} value={draft.title} onValueChange={value => set("title", value)} required maxLength={500} />{kind !== "repository" && <TextField data-test-id="create-order" label="اولویت" type="number" min={1} step={1} value={draft.order} onValueChange={value => set("order", value)} />}<TextareaField data-test-id="create-description" label="توضیحات" value={draft.description} onValueChange={value => set("description", value)} rows={2} maxLength={500} /></>}
    {step === "template" && <SelectField data-test-id="create-template" label="انتخاب نمونه سند" value={draft.templateId} onValueChange={value => set("templateId", value)} options={[{ value: "", label: "بدون نمونه سند" }, ...templates.filter(item => item.contentType === "classic").map(item => ({ value: item.id, label: item.title }))]} />}
    {step === "key" && <SelectField data-test-id="create-key" label="رمزگذاری سند" value={draft.keyId} onValueChange={value => set("keyId", value)} options={[{ value: "", label: "بدون کلید رمزگذاری" }, { value: "demo-key", label: "کلید نمونهٔ مخزن" }]} description="برای سند بدون رمزگذاری، گزینهٔ «بدون کلید رمزگذاری» را نگه دارید." />}
    {step === "version" && <TextField data-test-id="create-version" label="نام نسخه" value={draft.version} onValueChange={value => set("version", value)} required maxLength={500} />}
    {step === "form" && <><SelectField data-test-id="create-form-type" label="نوع فرم" value={draft.formType} onValueChange={value => set("formType", value)} options={[{ value: "normal", label: "فرم معمولی" }, { value: "exam", label: "فرم آزمون" }]} /><SelectField data-test-id="create-form-display" label="نمایش فرم" value={draft.formDisplay} onValueChange={value => set("formDisplay", value)} options={[{ value: "classic", label: "فرم کلاسیک" }, { value: "card", label: "فرم کارتی" }]} /></>}
    {step === "share" && <CreationMembers value={draft.members} onChange={value => set("members", value)} />}
    {step === "tags" && <TagPicker testId="create-tags" label="تگ‌ها" options={documentTags} value={draft.tags} onValueChange={value => set("tags", value)} />}
    {step === "image" && <FileInput data-test-id="create-image" label="تصویر مخزن" accept="image/*" onFileChange={file => set("image", file?.name ?? "purple")} description="اختیاری؛ در صورت انتخاب نکردن، تصویر پیش‌فرض استفاده می‌شود." />}
  </div>;
}
