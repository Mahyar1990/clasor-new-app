"use client";
import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { RadioField } from "@/components/ui/choice-field";
import { FileInput } from "@/components/ui/file-input";
import { Button } from "@/components/ui/button";
import { DialogSection } from "@/components/ui/DialogSection";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { useRepositoryPreview } from "./context";

export function EditRepository({ formId, done }: { formId: string; done: () => void }) {
  const { repo, setRepo } = useRepositoryPreview();
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description);
  const [image, setImage] = useState(["purple", "blue", "green", "orange"].includes(repo.image) ? repo.image : "purple");
  const [imageType, setImageType] = useState(repo.imageType ?? (/^(\/|https?:|data:|blob:)/.test(repo.image) ? "custom" : "default"));
  const [customName, setCustomName] = useState("");
  return <form data-test-id="repo-edit-form" id={formId} className="space-y-4" onSubmit={event => { event.preventDefault(); if (!name.trim()) { setNameError("عنوان مخزن را وارد کنید."); return; } setRepo(current => ({ ...current, name: name.trim(), description, imageType, image: imageType === "custom" ? customName || repo.image : image })); done(); }}>
    <TextField data-test-id="repo-edit-name" label="عنوان مخزن" error={nameError} required maxLength={100} value={name} onValueChange={setName} />
    <TextareaField data-test-id="repo-edit-description" label="توضیحات مخزن" rows={3} maxLength={500} value={description} onValueChange={setDescription} />
    <DialogSection testId="repo-image-section" title="تصویر مخزن">
      <RadioField label="نوع تصویر" value={imageType} onValueChange={value => setImageType(String(value))} options={[{ value: "default", label: "تصویر پیش‌فرض", content: <div data-test-id="repo-image-presets" className="flex flex-wrap gap-2">{["purple", "blue", "green", "orange"].map(color => <Button key={color} type="button" data-test-id={`repo-image-${color}`} variant={image === color ? "default" : "outline"} aria-label={`تصویر ${color}`} aria-pressed={image === color} onClick={() => setImage(color)} className="h-auto p-2"><GlassEmblem data-test-id={`repo-image-emblem-${color}`} className="size-8"><FolderOpen aria-hidden="true" className={color === "blue" ? "text-blue-600" : color === "green" ? "text-green-600" : color === "orange" ? "text-orange-600" : "text-purple-600"} /></GlassEmblem></Button>)}</div> }, { value: "custom", label: "تصویر سفارشی", content: <FileInput data-test-id="repo-edit-custom-image" label="تصویر دلخواه مخزن" accept="image/*" maxSizeBytes={5 * 1024 * 1024} description="انتخاب فایل فقط در همین پیش‌نمایش انجام می‌شود." onFileChange={file => { if (!file) { setCustomName(""); return; } const reader = new FileReader(); reader.onload = () => setCustomName(String(reader.result)); reader.readAsDataURL(file); }} /> }]} />
    </DialogSection>
  </form>;
}
