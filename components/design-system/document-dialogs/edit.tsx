"use client";

import { useState } from "react";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { TagPicker } from "@/components/ui/TagPicker";
import { DialogSection } from "@/components/ui/DialogSection";
import { useDocumentPreview } from "./context";
import { documentTags } from "./model";

export function DocumentEdit({ action, formId, done }: { action: string; formId: string; done: () => void }) {
  const { document, setDocument } = useDocumentPreview();
  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState(document.description);
  const [order, setOrder] = useState(String(document.order));
  const [content, setContent] = useState(document.content);
  const [tags, setTags] = useState(document.tags);
  const [category, setCategory] = useState(document.category);
  const [error, setError] = useState("");
  return <form data-test-id="doc-edit-form" id={formId} className="space-y-4" onSubmit={event => {
    event.preventDefault();
    if (action === "edit-document" && !title.trim()) { setError("نام سند را وارد کنید."); return; }
    setDocument(current => ({ ...current,
      ...(action === "edit-document" ? { title: title.trim(), description, order: Number(order) } : {}),
      ...(action === "edit-content" ? { content, versions: current.versions.map((version, i) => i === 0 ? { ...version, content } : version) } : {}),
      ...(action === "tags" ? { tags } : {}),
      ...(action === "move" ? { category } : {}),
    })); done();
  }}>
    {action === "edit-document" && <>
      <TextField data-test-id="doc-edit-name" label="نام سند" value={title} onValueChange={setTitle} maxLength={150} required error={error} />
      <TextField data-test-id="doc-edit-order" label="اولویت سند" type="number" min={1} step={1} value={order} onValueChange={setOrder} required />
      <TextareaField data-test-id="doc-edit-description" label="توضیحات سند" value={description} onValueChange={setDescription} rows={3} />
    </>}
    {action === "edit-content" && <TextareaField data-test-id="doc-edit-content" label="محتوای سند" value={content} onValueChange={setContent} rows={9} description="ویرایش متن در همین پیش‌نمایش؛ نسخه‌های پیشین حفظ می‌شوند." />}
    {action === "tags" && <TagPicker testId="doc-tags" label="تگ‌های سند" value={tags} options={documentTags} onValueChange={setTags} description="برچسب‌ها را جستجو و انتخاب کنید." />}
    {action === "move" && <DialogSection testId="doc-move-section" title="انتقال سند" description={`مقصد «${document.title}» را انتخاب کنید.`}>
      <SelectField data-test-id="doc-move-target" label="دستهٔ مقصد" value={category} onValueChange={setCategory} options={[...new Set([document.category, "ریشهٔ مخزن", "راهنما", "محصول", "طراحی", "توسعه"])].map(value => ({ value, label: value }))} />
    </DialogSection>}
  </form>;
}
