"use client";
import { useState, useRef } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { SelectField } from "@/components/ui/select-field";
import { TagPicker } from "@/components/ui/TagPicker";
import { CheckboxField } from "@/components/ui/choice-field";
import { Button } from "@/components/ui/button";
import { MultiSortEditor, type SortRule } from "@/components/ui/MultiSortEditor";
import { emptyFilters, sortFields, type LibraryFilters } from "./query";
export function FilterDialog({ value, onApply, close, trigger, tags }: { value: LibraryFilters; onApply: (value: LibraryFilters) => void; close: () => void; trigger: HTMLElement | null; tags: string[] }) {
  const anchor = useRef(trigger);
  const [draft, setDraft] = useState(value);
  function set<K extends keyof LibraryFilters>(key: K, value: LibraryFilters[K]) { setDraft(current => ({ ...current, [key]: value, ...(key === "kind" && value === "folder" ? { template: false, contentType: "all" } : key === "template" && value ? { kind: "document" } : {}) })); }
  return <GlassModal testId="library-filter-dialog" themeAnchorRef={anchor} open title="جستجو و فیلتر اسناد" compact surface="liquid" size="sm" finalFocus={() => trigger?.isConnected ? trigger : true} onOpenChange={open => { if (!open) close(); }} footer={<><Button data-test-id="filters-cancel" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="filters-apply" onClick={() => { onApply(draft); close(); }}>اعمال فیلتر</Button></>}>
    <div data-test-id="library-filter-fields" className="grid gap-3 sm:grid-cols-2">
      <SelectField data-test-id="filter-kind" label="نوع" value={draft.kind} onValueChange={value => set("kind", value)} options={[{ value: "all", label: "همه" }, { value: "document", label: "سند" }, { value: "folder", label: "دسته‌بندی" }]} />
      <SelectField data-test-id="filter-content-type" disabled={draft.kind === "folder"} disabledReason="نوع محتوا فقط برای سند کاربرد دارد." label="نوع محتوا" value={draft.contentType} onValueChange={value => set("contentType", value)} options={[{ value: "all", label: "همه" }, { value: "classic", label: "کلاسور" }, { value: "excel", label: "اکسل" }, { value: "file", label: "فایل" }, { value: "form", label: "فرم" }]} />
      <SelectField data-test-id="filter-search-mode" label="جستجو در" value={draft.searchMode} onValueChange={value => set("searchMode", value)} options={[{ value: "title", label: "عنوان" }, { value: "content", label: "محتوا" }]} />
      <SelectField data-test-id="filter-scope" label="محدوده جستجو" value={draft.scope} onValueChange={value => set("scope", value)} options={[{ value: "current", label: "همین دسته‌بندی" }, { value: "all", label: "همه دسته‌بندی‌ها" }]} />

    </div>
    <TagPicker testId="filter-tags" label="تگ‌ها" value={draft.tags} options={tags} onValueChange={value => set("tags", value)} description="سند باید همه تگ‌های انتخاب‌شده را داشته باشد." />
    <CheckboxField data-test-id="filter-bookmarked" label="نشان‌شده" checked={draft.bookmarked} onCheckedChange={value => set("bookmarked", value)} />
    <CheckboxField data-test-id="filter-template" label="نمونه سند" checked={draft.template} onCheckedChange={value => set("template", value)} />
    <Button data-test-id="filters-reset-draft" variant="ghost" size="sm" onClick={() => setDraft(emptyFilters)}>پاک‌کردن فیلترها</Button>
  </GlassModal>;
}
export function SortDialog({ value, onApply, close, trigger }: { value: SortRule[]; onApply: (value: SortRule[]) => void; close: () => void; trigger: HTMLElement | null }) {
  const anchor = useRef(trigger);
  const [draft, setDraft] = useState(value);
  return <GlassModal testId="library-sort-dialog" themeAnchorRef={anchor} open title="مرتب‌سازی چندمعیاره" compact surface="liquid" size="md" finalFocus={() => trigger?.isConnected ? trigger : true} onOpenChange={open => { if (!open) close(); }} footer={<><Button data-test-id="sort-cancel" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="sort-apply" onClick={() => { onApply(draft); close(); }}>اعمال ترتیب</Button></>}><MultiSortEditor value={draft} onValueChange={setDraft} fields={sortFields} /></GlassModal>;
}
