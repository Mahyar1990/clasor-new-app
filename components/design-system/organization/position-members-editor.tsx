"use client";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { TextField, SearchField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { Identity } from "@/components/ui/identity";
import { glass } from "@/lib/design-system/classes";
import { PreviewList } from "../preview-list";
import { uniqueUsername } from "../domain/queries";
import { organizationUsername } from "./memberships";
import type { OrganizationUser } from "./model";
import { useOrganization } from "./store";
export function PositionMembersEditor({ branchId, positionId, value, onChange, draft, onDraftChange }: {
  branchId: string; positionId?: string; value: string[]; onChange: (value: string[]) => void; draft: string; onDraftChange: (value: string) => void;
}) {
  const { state } = useOrganization();
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const selected = new Set(value.map(organizationUsername));
  const available = state.members.filter(member => member.branchId === branchId && !selected.has(organizationUsername(member.user.username)));
  const removed = state.members.filter(member => member.branchId === branchId && member.positionId === positionId && !selected.has(organizationUsername(member.user.username))).length;
  function add(username: string) {
    const name = organizationUsername(username);
    if (!uniqueUsername(name, value.map(organizationUsername))) { setError("نام کاربری معتبر و غیرتکراری وارد کنید."); return; }
    onChange([...value, name]); onDraftChange(""); setError("");
  }
  const records = value.map(username => {
    const member = state.members.find(item => organizationUsername(item.user.username) === organizationUsername(username));
    const current = state.members.find(item => item.branchId === branchId && organizationUsername(item.user.username) === organizationUsername(username));
    const previous = current && current.positionId !== positionId ? state.positions.find(item => item.id === current.positionId)?.name : undefined;
    const user: OrganizationUser = member?.user ?? { id: username, name: username, username };
    return { id: username, username, user, previous };
  }).filter(item => `${item.username} ${item.user.name}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section data-test-id="organization-position-members-editor" className="space-y-3">
    <h3 data-test-id="organization-position-members-title" className="text-xs font-semibold">اعضای سمت · {value.length.toLocaleString("fa-IR")} نفر</h3>
    <TextField ref={input} data-test-id="organization-position-member-username" label="نام کاربری پادی" dir="ltr" value={draft} maxLength={64} error={error} onValueChange={text => { onDraftChange(text); setError(""); }} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); add(draft); } }} action={<Button data-test-id="organization-position-member-add" type="button" size="sm" variant="outline" onClick={() => add(draft)}>افزودن</Button>} />
    {!!available.length && <SelectField data-test-id="organization-position-existing-user" label="انتخاب از افراد همین شعبه" size="sm" value="" placeholder="انتخاب فرد" options={available.map(member => ({ value: member.user.username, label: `${member.user.name} (${member.user.username})` }))} onValueChange={add} />}
    {(value.length > 5 || query) && <SearchField data-test-id="organization-position-members-search" label="جستجو در اعضای انتخاب‌شده" value={query} onValueChange={setQuery} />}
    <GlassScrollArea data-test-id="organization-position-members-scroll" label="اعضای انتخاب‌شده سمت" className={value.length > 4 ? "h-44" : "max-h-44"}>
      <PreviewList key={query} testId="organization-position-members" noun="عضو" items={records} render={item => <div data-test-id={`organization-position-person-${item.id}`} className={glass.compactRecord}>
        <div data-test-id={`organization-position-person-info-${item.id}`} className="min-w-0 flex-1"><Identity density="compact" identity={{ kind: "known", id: item.user.id, name: item.user.name, avatarUrl: item.user.avatar }} /><p data-test-id={`organization-position-person-detail-${item.id}`} className="mt-1 text-[10px] text-muted-foreground"><bdi data-test-id={`organization-position-person-username-${item.id}`}>{item.username}</bdi>{item.previous ? ` · انتقال از سمت ${item.previous}` : ""}</p></div>
        <Button data-test-id={`organization-position-member-remove-${item.id}`} type="button" size="icon-sm" variant="plain" aria-label={`حذف ${item.username} از فهرست`} onClick={() => { onChange(value.filter(name => name !== item.username)); input.current?.focus({ preventScroll: true }); }}><X aria-hidden="true" className="size-3!" /></Button>
      </div>} />
    </GlassScrollArea>
    {!!removed && <p data-test-id="organization-position-members-removal-note" role="status" className="text-[11px] leading-6 text-muted-foreground">با ذخیره، دسترسی {removed.toLocaleString("fa-IR")} فرد حذف‌شده از این فهرست به همین شعبه لغو می‌شود.</p>}
  </section>;
}
