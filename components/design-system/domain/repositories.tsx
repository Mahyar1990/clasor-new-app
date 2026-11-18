"use client";
import { useId, useRef, useState, type RefObject } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { useStatusToast } from "@/components/ui/status-toast";
import { DomainCollection, useDomainQuery } from "./collection";
import { useDomainRepositories } from "./shared";
import { useDomain } from "./store";
import { matchesDomainQuery, validPriority } from "./queries";
import type { DomainRepository } from "./model";
function PriorityForm({ repository, close, anchorRef }: { repository: DomainRepository; close: () => void; anchorRef: RefObject<HTMLElement | null> }) {
  const { setState } = useDomain();
  const [priority, setPriority] = useState(String(repository.priority));
  const [error, setError] = useState("");
  const formId = useId();
  const toast = useStatusToast();
  return <GlassModal testId="domain-priority-dialog" title="ویرایش اولویت مخزن" description={repository.name} themeAnchorRef={anchorRef} open compact surface="liquid" size="sm" onOpenChange={open => { if (!open) close(); }} finalFocus={() => anchorRef.current ?? true} footer={<><Button data-test-id="domain-priority-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="domain-priority-save" type="submit" form={formId} size="sm">ذخیره</Button></>}>
    <form data-test-id="domain-priority-form" id={formId} onSubmit={event => { event.preventDefault(); if (!validPriority(priority)) { setError("اولویت باید عدد صحیح مثبت باشد."); return; } setState(current => ({ ...current, priorities: { ...current.priorities, [repository.id]: Number(priority) } })); toast.show("اولویت مخزن ذخیره شد.", { type: "success" }); close(); }}>
      <TextField data-test-id="domain-priority-value" label="اولویت" type="number" autoFocus required min={1} step={1} value={priority} onValueChange={setPriority} error={error} />
    </form>
  </GlassModal>;
}
export function DomainRepositories() {
  const { state } = useDomain();
  const repositories = useDomainRepositories().map(repo => ({ ...repo, priority: state.priorities[repo.id] ?? repo.priority }));
  const [query, setQuery] = useDomainQuery();
  const [editing, setEditing] = useState<DomainRepository | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const items = repositories.filter(repo => matchesDomainQuery(query, [repo.name, repo.creator, String(repo.priority)], { creator: repo.creator })).sort((a, b) => a.priority - b.priority);
  return <div data-test-id="domain-repositories-host" ref={root} tabIndex={-1}>
    <DomainCollection testId="domain-repositories" title="مدیریت مخزن‌های منتشرشده" query={query} onQueryChange={setQuery} items={items} filters={[{ id: "creator", label: "سازنده", options: [{ value: "all", label: "همه سازنده‌ها" }, ...[...new Set(repositories.map(repo => repo.creator))].map(value => ({ value, label: value }))] }]} columns={[
      { id: "priority", label: "اولویت", kind: "priority", render: row => row.priority.toLocaleString("fa-IR") },
      { id: "name", label: "نام مخزن", render: row => row.name },
      { id: "creator", label: "نام سازنده", kind: "metadata", render: row => row.creator },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.name} fallbackFocusRef={root} items={[{ id: "priority", label: "ویرایش اولویت", onSelect: () => setEditing(row) }]} /> },
    ]} />
    {editing && <PriorityForm repository={editing} anchorRef={root} close={() => setEditing(null)} />}
  </div>;
}
