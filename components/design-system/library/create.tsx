"use client";
import { useState, useRef } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { CreationStepper } from "@/components/ui/creation-stepper";
import { useStatusToast } from "@/components/ui/status-toast";
import { useLibrary } from "./store";
import { initialDocument } from "../document-dialogs/model";
import { initialRepository } from "../repository-dialogs/context";
import { CreationFields, creationDraft, type CreationDraft } from "./create-fields";
export type CreationKind = "document" | "folder" | "template" | "repository";
const names = { document: "ایجاد سند", folder: "ساخت دسته‌بندی", template: "ایجاد نمونه سند", repository: "ایجاد مخزن" };
const labels: Record<string, string> = { type: "نوع سند", info: "عنوان و توضیحات", template: "نمونه سند", key: "رمزگذاری سند", version: "نام نسخه", form: "مشخصات فرم", share: "اشتراک‌گذاری", tags: "تگ", image: "افزودن تصویر", review: "بازبینی" };
export function CreationDialog({ kind, parentId, repositoryId = "dashboard-repository-1", close, trigger }: { kind: CreationKind; parentId?: string; repositoryId?: string; close: () => void; trigger: HTMLElement | null }) {
  const anchor = useRef(trigger);
  const { documents, repositories, setDocuments, setRepositories } = useLibrary();
  const [draft, setDraft] = useState(creationDraft);
  const [index, setIndex] = useState(0);
  const toast = useStatusToast();
  const steps = kind === "repository" ? ["info", "share", "tags", "image"] : kind === "folder" ? ["info", "review"] : kind === "template" ? ["type", "info", "version"] : ["type", "info", ...(draft.type === "classic" ? ["template", "key"] : draft.type === "form" ? ["form"] : []), "version"];
  const step = steps[index];
  function set<K extends keyof CreationDraft>(key: K, value: CreationDraft[K]) { setDraft(current => ({ ...current, [key]: value })); }
  const canContinue = step === "info" ? !!draft.title.trim() && (kind === "repository" || Number.isInteger(Number(draft.order)) && Number(draft.order) >= 1) : step === "version" ? !!draft.version.trim() : true;
  function commit() {
    if (!draft.title.trim() || !canContinue) return;
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    if (kind === "repository") {
      const members = draft.members.map(item => ({ ...item, detail: item.name }));
      setRepositories(current => [{ ...initialRepository(), id, name: draft.title.trim(), description: draft.description, tags: draft.tags, image: draft.image, imageType: draft.image.startsWith("data:") ? "custom" : "default", published: false, shared: false, updatedAt: now, members: [{ id: "owner", name: "کاربر نمونه", role: "مالک" }, ...members], groups: [], files: [], requests: [], keys: [], joinLinks: [] }, ...current]);
    } else {
      const source = documents.find(item => item.id === draft.templateId);
      const content = kind === "document" ? source?.content ?? "" : "";
      const item = initialDocument({ id, title: draft.title.trim(), category: documents.find(item => item.id === parentId)?.title ?? "ریشهٔ مخزن", creator: "کاربر نمونه", shared: repositories.find(repo => repo.id === repositoryId)?.shared ?? false, content });
      setDocuments(current => [{ ...item, repositoryId, parentId, kind, contentType: draft.type, extension: draft.extension, description: draft.description, order: Number(draft.order), keyId: draft.keyId, formType: draft.formType, formDisplay: draft.formDisplay, createdAt: now, updatedAt: now, tags: draft.tags, versions: kind === "folder" ? [] : [{ id: `${id}-draft`, name: `نسخهٔ ${draft.version}`, content, approval: "draft", published: false, creator: "شما", editedAt: "هم‌اکنون" }] }, ...current]);
    }
    toast.show(kind === "repository" ? "مخزن در فهرست مخزن‌های من ساخته شد." : `${names[kind]} انجام شد.`, { type: "success" }); close();
  }
  return <GlassModal testId="library-create-dialog" themeAnchorRef={anchor} open title={names[kind]} compact surface="liquid" size="sm" finalFocus={() => trigger?.isConnected ? trigger : true} onOpenChange={open => { if (!open) close(); }}>
    <CreationStepper compact currentStep={index} steps={steps.map(id => ({ id, label: labels[id] }))} onStepChange={setIndex} onCancel={close} onCommit={commit} commitLabel="ایجاد" canContinue={canContinue} validationMessage={step === "info" ? "عنوان و اولویت معتبر را وارد کنید." : "نام نسخه را وارد کنید."}>
      {step === "review" ? <p data-test-id="creation-review" className="text-xs leading-relaxed">{draft.title} · اولویت {draft.order}<br data-test-id="creation-review-break" />{draft.description || "بدون توضیحات"}</p> : <CreationFields step={step} kind={kind} draft={draft} set={set} templates={documents.filter(item => item.kind === "template" && !item.deleted && item.repositoryId === repositoryId)} />}
    </CreationStepper>
  </GlassModal>;
}
