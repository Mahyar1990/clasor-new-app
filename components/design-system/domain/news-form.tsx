"use client";
import { useId, useRef, useState, type RefObject } from "react";
import { FileText } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { Button } from "@/components/ui/button";
import { useStatusToast } from "@/components/ui/status-toast";
import { useDomain } from "./store";
import { useDomainRepositories } from "./shared";
import { validateNews } from "./queries";
import type { DomainNews } from "./model";
export function NewsForm({ existing, privateNews, repositoryId, trigger, close, anchorRef }: { existing?: DomainNews; privateNews: boolean; repositoryId?: string; trigger: HTMLElement | null; close: () => void; anchorRef?: RefObject<HTMLElement | null> }) {
  const anchor = useRef(trigger);
  const formId = useId();
  const { setState } = useDomain();
  const repositories = useDomainRepositories();
  const [draft, setDraft] = useState({ title: existing?.title ?? "", body: existing?.body ?? "", link: existing?.link ?? "", image: existing?.image ?? "purple", repositoryId: existing?.repositoryId ?? repositoryId ?? "" });
  const [error, setError] = useState("");
  const toast = useStatusToast();
  function save() {
    const invalid = validateNews(draft, privateNews);
    if (invalid) { setError(invalid); return; }
    const item: DomainNews = { ...draft, title: draft.title.trim(), body: draft.body.trim(), link: draft.link.trim(), repositoryId: privateNews ? draft.repositoryId : undefined, id: existing?.id ?? crypto.randomUUID(), createdAt: existing?.createdAt ?? new Date().toISOString() };
    setState(current => ({ ...current, news: existing ? current.news.map(news => news.id === existing.id ? item : news) : [item, ...current.news] }));
    toast.show(existing ? "خبرنامه ویرایش شد." : "خبرنامه ایجاد شد.", { type: "success" }); close();
  }
  return <GlassModal testId="domain-news-form-dialog" themeAnchorRef={anchorRef ?? anchor} open compact surface="liquid" size="md" title={`${existing ? "ویرایش" : "ایجاد"} خبرنامه ${privateNews ? "خصوصی" : "عمومی"}`} onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger?.isConnected ? trigger : anchorRef?.current ?? true} footer={<><Button data-test-id="domain-news-form-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="domain-news-form-submit" size="sm" type="submit" form={formId}>{existing ? "ذخیره" : "ایجاد"}</Button></>}>
    <form data-test-id="domain-news-form" id={formId} className="space-y-3" onSubmit={event => { event.preventDefault(); save(); }}>
      {privateNews && <SelectField data-test-id="domain-news-repository" label="مخزن" required size="sm" value={draft.repositoryId} onValueChange={value => setDraft(current => ({ ...current, repositoryId: value }))} options={repositories.map(repo => ({ value: repo.id, label: repo.name }))} />}
      <TextField data-test-id="domain-news-title" label="عنوان" autoFocus required maxLength={150} value={draft.title} onValueChange={value => setDraft(current => ({ ...current, title: value }))} />
      <TextareaField data-test-id="domain-news-body" label="متن خبرنامه" rows={4} required maxLength={5000} value={draft.body} onValueChange={value => setDraft(current => ({ ...current, body: value }))} />
      <TextField data-test-id="domain-news-link" label="لینک" dir="ltr" type="url" placeholder="https://…" value={draft.link} onValueChange={value => setDraft(current => ({ ...current, link: value }))} />
      <fieldset data-test-id="domain-news-images" className="space-y-2"><legend data-test-id="domain-news-images-label" className="text-xs">عکس خبرنامه</legend><div data-test-id="domain-news-image-options" className="flex flex-wrap gap-2">{[{ value: "purple", label: "بنفش", style: "text-purple-600" }, { value: "blue", label: "آبی", style: "text-blue-600" }, { value: "green", label: "سبز", style: "text-green-600" }, { value: "orange", label: "نارنجی", style: "text-orange-600" }].map(item => <Button key={item.value} data-test-id={`domain-news-image-${item.value}`} type="button" size="icon" variant={draft.image === item.value ? "default" : "outline"} aria-label={`تصویر ${item.label}`} aria-pressed={draft.image === item.value} onClick={() => setDraft(current => ({ ...current, image: item.value }))}><GlassEmblem data-test-id={`domain-news-emblem-${item.value}`} className={`size-6 ${item.style}`}><FileText aria-hidden="true" className="size-3.5!" /></GlassEmblem></Button>)}</div></fieldset>
      {!!error && <p data-test-id="domain-news-form-error" role="alert" className="text-xs text-destructive">{error}</p>}
    </form>
  </GlassModal>;
}
