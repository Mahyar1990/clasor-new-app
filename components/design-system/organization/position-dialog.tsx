"use client";
import { useId, useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { normalizeDomainText } from "../domain/queries";
import { useOrganization } from "./store";
import type { OrganizationPosition } from "./model";
export function OrganizationPositionDialog({ branchId, position, remove = false, trigger, close }: { branchId: string; position?: OrganizationPosition; remove?: boolean; trigger: HTMLElement | null; close: () => void }) {
  const { state, setState } = useOrganization();
  const [name, setName] = useState(position?.name ?? "");
  const [error, setError] = useState("");
  const anchor = useRef(trigger);
  const formId = useId();
  const branch = state.branches.find(item => item.id === branchId);
  function save() {
    if (!name.trim() || state.positions.some(item => item.branchId === branchId && item.id !== position?.id && normalizeDomainText(item.name) === normalizeDomainText(name))) { setError("نام سمت باید غیرخالی و در این شعبه غیرتکراری باشد."); return; }
    setState(current => ({ ...current, positions: position ? current.positions.map(item => item.id === position.id ? { ...item, name: name.trim() } : item) : [...current.positions, { id: crypto.randomUUID(), name: name.trim(), branchId }] })); close();
  }
  return <GlassModal testId="organization-position-dialog" title={remove ? "حذف سمت" : position ? "ویرایش سمت" : "افزودن سمت"} description={branch?.name} themeAnchorRef={anchor} open compact surface="liquid" size="sm" onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger?.isConnected ? trigger : true} footer={<>
    <Button data-test-id="organization-position-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button>
    {remove ? <Button data-test-id="organization-position-confirm-remove" size="sm" variant="destructive-outline" onClick={() => { setState(current => ({ ...current, positions: current.positions.filter(item => item.id !== position?.id), members: current.members.map(item => item.branchId === branchId && item.positionId === position?.id ? { ...item, positionId: undefined } : item) })); close(); }}>حذف سمت</Button> : <Button data-test-id="organization-position-save" size="sm" type="submit" form={formId}>{position ? "ذخیره" : "افزودن"}</Button>}
  </>}>
    {remove ? <p data-test-id="organization-position-remove-note" className="text-xs leading-7">سمت «{position?.name}» حذف می‌شود؛ دسترسی افراد این شعبه باقی می‌ماند و سمت آن‌ها خالی خواهد شد.</p> : <form data-test-id="organization-position-form" id={formId} onSubmit={event => { event.preventDefault(); save(); }}><TextField data-test-id="organization-position-name" label="عنوان سمت" required autoFocus maxLength={120} value={name} error={error} onValueChange={value => { setName(value); setError(""); }} /></form>}
  </GlassModal>;
}
