"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { CreationStepper } from "@/components/ui/creation-stepper";
import { useDocumentStore } from "@/components/workspace/document-store";
import { repositories, folders, personalRepositoryId, sampleUser } from "@/lib/workspace/fixtures";
import { folderPath } from "@/lib/workspace/navigation";
import { validateTitle } from "@/lib/workspace/mutations";
import { defaultFilters } from "@/lib/workspace/documents";
import { useListSession } from "@/components/workspace/list-session";
import type { DocumentKind } from "@/interface/document";

export default function CreateDocumentDialog({ repositoryId = personalRepositoryId, folderId = null, listHref }: { repositoryId?: string; folderId?: string | null; listHref: string }) {
  const store = useDocumentStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<DocumentKind>("text");
  const destinationSession = useListSession(listHref);
  const heading = useRef<HTMLHeadingElement>(null);
  const created = useRef<string | null>(null);
  const repository = repositories.find(repository => repository.id === repositoryId);
  const path = folderPath(folders, repositoryId, folderId);
  const enabled = Boolean(repository && repository.ownerId === sampleUser.id && !repository.archived && path);
  let titleError = "";
  try { validateTitle(title); } catch (error) { titleError = (error as Error).message; }
  useEffect(() => { if (open) heading.current?.focus(); }, [step, open]);
  function changeOpen(value: boolean) {
    if (value && created.current) { created.current = null; setTitle(""); setKind("text"); setStep(0); }
    setOpen(value);
  }
  function commit() {
    if (created.current) return;
    const id = store.create({ title, kind, repositoryId, folderId });
    created.current = id;
    setOpen(false);
    destinationSession.setFilters(defaultFilters); destinationSession.setScenario("ready"); destinationSession.setSelectedIds([]);
    const from = listHref;
    router.push(`/workspace/documents/${id}?from=${encodeURIComponent(from)}`);
  }
  const locationLabel = [repository?.name, ...(path ?? []).map(item => item.name), ...(!folderId ? ["ریشه مخزن"] : [])].join(" / ");
  return <Dialog open={open} onOpenChange={changeOpen}><DialogTrigger data-test-id="create-document-dialog-dialogtrigger-1" render={<Button data-test-id="create-document-dialog-dialogtrigger-1" disabled={!enabled} disabledReason={!enabled ? "ایجاد سند در این مخزن نمونه در دسترس نیست." : undefined} />}><Plus aria-hidden="true" />ایجاد سند</DialogTrigger><DialogContent dir="rtl" className="ws-editDialog ws-createDialog" showCloseButton={false}>
    <DialogTitle ref={heading} tabIndex={-1}>ایجاد سند تازه</DialogTitle><DialogDescription>عنوان و نوع را مشخص کنید؛ سند در محل زیر ایجاد می‌شود.</DialogDescription>
    <DialogClose data-test-id="create-document-dialog-dialogclose-3" render={<Button data-test-id="create-document-dialog-dialogclose-3" variant="ghost" size="icon-sm" className="ws-createDismiss" aria-label="انصراف از ایجاد" title="انصراف از ایجاد" />}><X aria-hidden="true" /></DialogClose>
    <dl data-test-id="create-document-dialog-dl-5" className="ws-createLocation"><dt data-test-id="create-document-dialog-dt-6">محل ایجاد سند</dt><dd data-test-id="create-document-dialog-dd-7">{locationLabel}</dd></dl>
    <CreationStepper steps={[{ id: "type", label: "عنوان و نوع" }, { id: "review", label: "بازبینی" }]} currentStep={step} onStepChange={setStep} canContinue={step !== 0 || !titleError} validationMessage={title.trim() ? titleError : undefined} onCommit={commit} commitLabel="ایجاد سند">
      {step === 0 && <div data-test-id="create-document-dialog-div-8" className="ws-formFields"><TextField data-test-id="create-document-dialog-textfield-9" label="عنوان سند" required value={title} onValueChange={setTitle} maxLength={160} placeholder="مثلاً یادداشت جلسه طراحی" /><SelectField data-test-id="create-document-dialog-selectfield-10" label="نوع محتوا" value={kind} onValueChange={value => setKind(value as DocumentKind)} options={[{ value: "text", label: "متن ساده" }, { value: "pdf", label: "PDF نمونه" }, { value: "image", label: "تصویر نمونه" }]} />{kind !== "text" && <p data-test-id="create-document-dialog-p-11" className="ws-formHint">این نوع از فایل نمونه استفاده می‌کند؛ فایلی ارسال نمی‌شود.</p>}</div>}
      {step === 1 && <dl data-test-id="create-document-dialog-dl-12" className="ws-reviewFields"><div data-test-id="create-document-dialog-div-13"><dt data-test-id="create-document-dialog-dt-14">عنوان</dt><dd data-test-id="create-document-dialog-dd-15">{title.trim()}</dd></div><div data-test-id="create-document-dialog-div-16"><dt data-test-id="create-document-dialog-dt-17">نوع</dt><dd data-test-id="create-document-dialog-dd-18">{kind === "text" ? "متن ساده" : kind === "pdf" ? "PDF نمونه" : "تصویر نمونه"}</dd></div><div data-test-id="create-document-dialog-div-19"><dt data-test-id="create-document-dialog-dt-20">وضعیت اولیه</dt><dd data-test-id="create-document-dialog-dd-21">پیش‌نویس · ذخیره در حافظه همین نشست</dd></div></dl>}
    </CreationStepper>
  </DialogContent></Dialog>;
}
