"use client";
import { useRef, useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { DomainCollection, useDomainQuery } from "./collection";
import { DomainConfirmation } from "./confirmation";
import { normalizeDomainText } from "./queries";
import { useDomain } from "./store";
export function DomainTags() {
  const { state, setState } = useDomain();
  const [query, setQuery] = useDomainQuery();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [remove, setRemove] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const needle = normalizeDomainText(query.text);
  const items = state.tags.filter(tag => query.filters.match === "prefix" ? normalizeDomainText(tag).startsWith(needle) : normalizeDomainText(tag).includes(needle)).map(tag => ({ id: tag, name: tag }));
  function create() {
    const tag = name.trim();
    if (!tag || state.tags.some(item => normalizeDomainText(item) === normalizeDomainText(tag))) { setError("نام تگ را وارد کنید؛ نام تکراری مجاز نیست."); return; }
    setState(current => ({ ...current, tags: [...current.tags, tag] })); setName(""); setError("");
  }
  return <div data-test-id="domain-tags-host" ref={root} tabIndex={-1}>
    <DomainCollection testId="domain-tags" title="تگ‌های دامنه" items={items} query={query} onQueryChange={setQuery} filters={[{ id: "match", label: "مطابقت نام", options: [{ value: "all", label: "شامل عبارت" }, { value: "prefix", label: "شروع با عبارت" }] }]} detail={<form data-test-id="domain-tag-create-form" className="max-w-md" onSubmit={event => { event.preventDefault(); create(); }}><TextField data-test-id="domain-tag-name" label="افزودن تگ" maxLength={80} value={name} onValueChange={setName} error={error} action={<Button data-test-id="domain-tag-add" size="sm" type="submit">افزودن</Button>} /></form>} columns={[
      { id: "name", label: "نام تگ", render: row => row.name },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.name} fallbackFocusRef={root} items={[{ id: "delete", label: "حذف تگ", destructive: true, onSelect: () => setRemove(row.name) }]} /> },
    ]} />
    {remove && <DomainConfirmation title="حذف تگ دامنه" description={`تگ «${remove}» حذف شود؟`} trigger={null} anchorRef={root} close={() => setRemove(null)} confirm={() => { root.current?.focus(); setState(current => ({ ...current, tags: current.tags.filter(tag => tag !== remove) })); }} />}
  </div>;
}
