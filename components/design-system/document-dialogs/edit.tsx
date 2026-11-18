"use client";

import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { EditorFrame } from "@/components/ui/EditorFrame";
import { useState } from "react";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { PathPicker } from "@/components/ui/PathPicker";
import { useOptionalLibrary } from "../library/store";
import { folderTree, folderPath } from "../library/tree";
import { documentFolders, folderLabel } from "./move-data";
import { editDraft } from "./version-state";
import { TagPicker } from "@/components/ui/TagPicker";
import { DialogSection } from "@/components/ui/DialogSection";
import { useDocumentPreview } from "./context";
import { documentTags } from "./model";

export function DocumentEdit({ action, formId, done }: { action: string; formId: string; done: () => void }) {
  const { dismiss } = useDialogNavigation();
  const library = useOptionalLibrary();
  const { document, setDocument, repository } = useDocumentPreview();
  const repositoryTags = repository?.tags ?? (library ? library.repositories.find(repo => repo.id === document.repositoryId)?.tags ?? [] : documentTags);
  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState(document.description);
  const [order, setOrder] = useState(String(document.order));
  const [content, setContent] = useState(document.content);
  const [tags, setTags] = useState(document.tags);
  const [categoryPath, setCategoryPath] = useState(library ? folderPath(library.documents, document.parentId) : document.categoryPath ?? []);
  const [error, setError] = useState("");
  return <form data-test-id="doc-edit-form" id={formId} className={action === "edit-content" ? "flex h-full min-h-0 flex-1 flex-col gap-3" : "space-y-4"} onSubmit={event => {
    event.preventDefault();
    if (action === "edit-document" && !title.trim()) { setError("نام سند را وارد کنید."); return; }
    setDocument(current => ({ ...current, updatedAt: new Date().toISOString(),
      ...(action === "edit-document" ? { title: title.trim(), description, order: Number(order) } : {}),
      ...(action === "edit-content" ? { content, versions: current.versions.length ? editDraft(current.versions, (current.versions.find(item => item.approval === "draft") ?? current.versions[0]).id, content) : current.versions } : {}),
      ...(action === "tags" ? { tags } : {}),
      ...(action === "move" ? { category: library ? ["ریشهٔ مخزن", ...categoryPath.map(id => library.documents.find(item => item.id === id)?.title)].join(" / ") : folderLabel(categoryPath), categoryPath, parentId: library ? categoryPath.at(-1) : current.parentId } : {}),
    })); done();
  }}>
    {action === "edit-document" && <>
      <TextField data-test-id="doc-edit-name" label="نام سند" value={title} onValueChange={setTitle} maxLength={150} required error={error} />
      <TextField data-test-id="doc-edit-order" label="اولویت سند" type="number" min={1} step={1} value={order} onValueChange={setOrder} required />
      <TextareaField data-test-id="doc-edit-description" label="توضیحات سند" value={description} onValueChange={setDescription} rows={3} />
    </>}
    {action === "edit-content" && <EditorFrame testId="doc-edit-content" title={document.title} value={content} onValueChange={setContent} readOnly={false} onEscape={dismiss} />}
    {action === "tags" && <TagPicker testId="doc-tags" label="تگ‌های سند" value={tags} options={repositoryTags} onValueChange={setTags} description="برچسب‌ها را جستجو و انتخاب کنید." />}
    {action === "move" && <DialogSection testId="doc-move-section" title="انتقال سند" description={`مقصد «${document.title}» را انتخاب کنید.`}>
      <PathPicker nodes={library ? folderTree(library.documents.filter(item => item.repositoryId === document.repositoryId).map(item => ({ ...item, shared: false })), document.kind === "folder" ? document.id : undefined) : documentFolders} value={categoryPath} onValueChange={setCategoryPath} />
    </DialogSection>}
  </form>;
}
