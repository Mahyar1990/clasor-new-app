"use client";
import { useId, useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { saveOrganizationMember } from "./memberships";
import { useOrganization } from "./store";
import type { OrganizationMember } from "./model";
export function OrganizationMemberDialog({ branchId, member, remove = false, trigger, close }: { branchId: string; member?: OrganizationMember; remove?: boolean; trigger: HTMLElement | null; close: () => void }) {
  const { state, setState } = useOrganization();
  const [username, setUsername] = useState(member?.user.username ?? "");
  const [positionId, setPositionId] = useState(member?.positionId ?? "");
  const [error, setError] = useState("");
  const anchor = useRef(trigger);
  const formId = useId();
  const positions = state.positions.filter(item => item.branchId === branchId);
  const hasPosition = positions.some(position => position.id === positionId);
  const branch = state.branches.find(item => item.id === branchId);
  function save() {
    try { setState(saveOrganizationMember(state, branchId, username, positionId, member?.id)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "ثبت فرد انجام نشد."); return; }
    close();
  }
  return <GlassModal testId="organization-member-dialog" title={remove ? "حذف دسترسی فرد" : member ? "ویرایش سمت فرد" : "افزودن فرد به شعبه"} description={branch?.name} themeAnchorRef={anchor} open compact surface="liquid" size="sm" onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger?.isConnected ? trigger : true} footer={<>
    <Button data-test-id="organization-member-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button>
    {remove ? <Button data-test-id="organization-member-confirm-remove" size="sm" variant="destructive-outline" onClick={() => { setState(current => ({ ...current, members: current.members.filter(item => item.id !== member?.id) })); close(); }}>حذف دسترسی</Button> : <Button data-test-id="organization-member-save" size="sm" type="submit" form={formId} disabled={!hasPosition}>{member ? "ذخیره" : "افزودن"}</Button>}
  </>}>
    {remove ? <p data-test-id="organization-member-remove-note" className="text-xs leading-7">دسترسی {member?.user.name} به این شعبه حذف شود؟</p> : <form data-test-id="organization-member-form" id={formId} className="space-y-3" onSubmit={event => { event.preventDefault(); save(); }}>
      <TextField data-test-id="organization-member-username" label="نام کاربری پادی" dir="ltr" required autoFocus disabled={!!member} value={username} onValueChange={setUsername} error={error} />
      <SelectField data-test-id="organization-member-position" label="سمت در این شعبه" required disabled={!positions.length} size="sm" value={positionId} onValueChange={value => { setPositionId(value); setError(""); }} options={positions.map(item => ({ value: item.id, label: item.name }))} />
      {!positions.length && <p data-test-id="organization-member-no-positions" className="text-xs leading-6 text-muted-foreground">ابتدا در تب سمت‌ها، یک سمت برای این شعبه ایجاد کنید. افزودن فرد بدون سمت امکان‌پذیر نیست.</p>}
    </form>}
  </GlassModal>;
}
