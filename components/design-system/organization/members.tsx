"use client";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SearchableCollection, useCollectionQuery } from "@/components/ui/SearchableCollection";
import { Identity } from "@/components/ui/identity";
import { Badge } from "@/components/ui/badge";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/design-system/classes";
import { matchesDomainQuery } from "../domain/queries";
import { OrganizationMemberDialog } from "./member-dialog";
import { useOrganization } from "./store";
import type { OrganizationMember } from "./model";
export function OrganizationMembers({ branchId }: { branchId: string }) {
  const { state } = useOrganization();
  const positions = state.positions.filter(item => item.branchId === branchId);
  const [query, setQuery] = useCollectionQuery();
  const [dialog, setDialog] = useState<{ member?: OrganizationMember; remove?: boolean; trigger: HTMLElement | null } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const positionName = (id?: string) => positions.find(item => item.id === id)?.name ?? "بدون سمت";
  const items = state.members.filter(item => item.branchId === branchId && matchesDomainQuery(query, [item.user.name, item.user.username, positionName(item.positionId)], { position: item.positionId ?? "none" }));
  return <div data-test-id="organization-members" ref={root} tabIndex={-1}>
    <SearchableCollection testId="organization-members-list" title="افراد دارای دسترسی" items={items} query={query} onQueryChange={setQuery} filters={[{ id: "position", label: "سمت", options: [{ value: "all", label: "همه سمت‌ها" }, { value: "none", label: "بدون سمت" }, ...positions.map(item => ({ value: item.id, label: item.name }))] }]} action={<Button data-test-id="organization-add-member" size="sm" onClick={event => setDialog({ trigger: event.currentTarget })}><Plus aria-hidden="true" className="size-3!" />افزودن فرد</Button>} columns={[
      { id: "name", label: "نام", render: row => <Identity density="compact" identity={{ kind: "known", id: row.user.id, name: row.user.name, avatarUrl: row.user.avatar }} /> },
      { id: "username", label: "نام کاربری", width: 136, render: row => <bdi data-test-id={`organization-username-${row.id}`}>{row.user.username}</bdi> },
      { id: "position", label: "سمت", width: 112, render: row => <Badge data-test-id={`organization-member-position-${row.id}`} className={glass.statusNeutral}>{positionName(row.positionId)}</Badge> },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.user.name} fallbackFocusRef={root} items={[{ id: "edit", label: "ویرایش سمت", onSelect: () => setDialog({ member: row, trigger: root.current }) }, { id: "remove", label: "حذف دسترسی", destructive: true, onSelect: () => setDialog({ member: row, remove: true, trigger: root.current }) }]} /> },
    ]} />
    {dialog && <OrganizationMemberDialog branchId={branchId} {...dialog} close={() => setDialog(null)} />}
  </div>;
}
