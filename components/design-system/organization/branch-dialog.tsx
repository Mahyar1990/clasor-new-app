"use client";
import { useId, useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { branchDescendants, branchNameError, removeBranch } from "./state";
import { useOrganization } from "./store";
export interface BranchAction { kind: "create" | "child" | "edit" | "delete"; branchId?: string; trigger: HTMLElement | null }
export function BranchDialog({ action, close, onCreated, onRemoved }: { action: BranchAction; close: () => void; onCreated: (id: string) => void; onRemoved: (id: string, parentId?: string) => void }) {
  const { state, setState } = useOrganization();
  const branch = state.branches.find(item => item.id === action.branchId);
  const parentId = action.kind === "child" ? branch?.id : action.kind === "edit" ? branch?.parentId : undefined;
  const [name, setName] = useState(action.kind === "edit" ? branch?.name ?? "" : "");
  const [error, setError] = useState("");
  const anchor = useRef(action.trigger);
  const formId = useId();
  const title = { create: "افزودن شعبه", child: "افزودن زیرشعبه", edit: "ویرایش شعبه", delete: "حذف شعبه" }[action.kind];
  const affected = branch ? branchDescendants(state.branches, branch.id) : new Set<string>();
  function save() {
    const invalid = branchNameError(state.branches, name, parentId, action.kind === "edit" ? branch?.id : undefined);
    if (invalid) { setError(invalid); return; }
    if (action.kind === "edit" && branch) setState(current => ({ ...current, branches: current.branches.map(item => item.id === branch.id ? { ...item, name: name.trim() } : item) }));
    else { const id = crypto.randomUUID(); setState(current => ({ ...current, branches: [...current.branches, { id, name: name.trim(), parentId }] })); onCreated(id); }
    close();
  }
  return <GlassModal testId="organization-branch-dialog" themeAnchorRef={anchor} open compact surface="liquid" size="sm" title={title} description={branch?.name ?? "شعبه در سطح اصلی"} onOpenChange={open => { if (!open) close(); }} finalFocus={() => action.trigger?.isConnected ? action.trigger : true} footer={<>
    <Button data-test-id="organization-branch-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button>
    {action.kind === "delete" ? <Button data-test-id="organization-branch-confirm-delete" size="sm" variant="destructive-outline" onClick={() => { if (branch) { setState(current => removeBranch(current, branch.id)); onRemoved(branch.id, branch.parentId); } close(); }}>حذف شعبه</Button> : <Button data-test-id="organization-branch-save" size="sm" type="submit" form={formId}>{action.kind === "edit" ? "ذخیره" : "افزودن"}</Button>}
  </>}>
    {action.kind === "delete" ? <p data-test-id="organization-branch-delete-note" className="text-xs leading-7">شعبه «{branch?.name}»، {Math.max(0, affected.size - 1).toLocaleString("fa-IR")} زیرشعبه و دسترسی‌ها و سمت‌های داخل آن‌ها از این نمونه حذف می‌شوند.</p> : <form data-test-id="organization-branch-form" id={formId} onSubmit={event => { event.preventDefault(); save(); }}><TextField data-test-id="organization-branch-name" label="نام شعبه" required autoFocus maxLength={120} value={name} error={error} onValueChange={value => { setName(value); setError(""); }} /></form>}
  </GlassModal>;
}
