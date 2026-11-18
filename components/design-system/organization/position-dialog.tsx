"use client";
import { useId, useRef, useState } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { useOrganization } from "./store";
import { PositionMembersEditor } from "./position-members-editor";
import { saveOrganizationPosition, removeOrganizationPosition } from "./memberships";
import type { OrganizationPosition } from "./model";
export function OrganizationPositionDialog({ branchId, position, remove = false, membersOnly = false, trigger, close }: {
  branchId: string; position?: OrganizationPosition; remove?: boolean; membersOnly?: boolean; trigger: HTMLElement | null; close: () => void;
}) {
  const { state, setState } = useOrganization();
  const [name, setName] = useState(position?.name ?? "");
  const [usernames, setUsernames] = useState(() => position ? state.members.filter(member => member.branchId === branchId && member.positionId === position.id).map(member => member.user.username) : []);
  const [pendingUsername, setPendingUsername] = useState("");
  const [error, setError] = useState("");
  const anchor = useRef(trigger);
  const formId = useId();
  const branch = state.branches.find(item => item.id === branchId);
  const hasMembers = !!position && state.members.some(member => member.branchId === branchId && member.positionId === position.id);
  const editMembers = !position || membersOnly;
  function save() {
    try {
      if (remove && position) setState(removeOrganizationPosition(state, branchId, position.id));
      else {
        const draft = { id: position?.id ?? crypto.randomUUID(), branchId, name };
        const members = editMembers ? [...usernames, ...(pendingUsername.trim() ? [pendingUsername] : [])] : undefined;
        setState(saveOrganizationPosition(state, draft, members));
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ذخیره انجام نشد."); return; }
    close();
  }
  return <GlassModal testId="organization-position-dialog" title={remove ? "حذف سمت" : membersOnly ? "ویرایش اعضای سمت" : position ? "ویرایش سمت" : "افزودن سمت"} description={membersOnly ? `${branch?.name} · ${position?.name}` : branch?.name} themeAnchorRef={anchor} open compact surface="liquid" size={editMembers && !remove ? "md" : "sm"} onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger?.isConnected ? trigger : true} footer={<>
    <Button data-test-id="organization-position-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button>
    {remove ? <Button data-test-id="organization-position-confirm-remove" size="sm" disabled={hasMembers} variant="destructive-outline" onClick={save}>حذف سمت</Button> : <Button data-test-id="organization-position-save" size="sm" type="submit" form={formId}>{position ? "ذخیره" : "افزودن"}</Button>}
  </>}>
    {remove ? <p data-test-id="organization-position-remove-note" className="text-xs leading-7">{hasMembers ? "این سمت دارای عضو است. ابتدا اعضا را به سمت دیگری منتقل کنید یا دسترسی آن‌ها را حذف کنید تا فردی بدون سمت باقی نماند." : `سمت «${position?.name}» حذف شود؟`}</p> : <form data-test-id="organization-position-form" id={formId} className="space-y-4" onSubmit={event => { event.preventDefault(); save(); }}>
      {!membersOnly && <TextField data-test-id="organization-position-name" label="عنوان سمت" required autoFocus maxLength={120} value={name} error={error} onValueChange={value => { setName(value); setError(""); }} />}
      {editMembers && <PositionMembersEditor branchId={branchId} positionId={position?.id} value={usernames} onChange={setUsernames} draft={pendingUsername} onDraftChange={setPendingUsername} />}
      {!!error && <p data-test-id="organization-position-error" role="alert" className="text-xs text-destructive">{error}</p>}
    </form>}
  </GlassModal>;
}
