"use client";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SearchableCollection, useCollectionQuery } from "@/components/ui/SearchableCollection";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { Button } from "@/components/ui/button";
import { matchesDomainQuery } from "../domain/queries";
import { OrganizationPositionDialog } from "./position-dialog";
import { useOrganization } from "./store";
import type { OrganizationPosition } from "./model";
export function OrganizationPositions({ branchId }: { branchId: string }) {
  const { state } = useOrganization();
  const [query, setQuery] = useCollectionQuery();
  const [dialog, setDialog] = useState<{ position?: OrganizationPosition; remove?: boolean; trigger: HTMLElement | null } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const count = (id: string) => state.members.filter(member => member.branchId === branchId && member.positionId === id).length;
  const items = state.positions.filter(item => item.branchId === branchId && matchesDomainQuery(query, [item.name], { members: count(item.id) ? "with" : "without" }));
  return <div data-test-id="organization-positions" ref={root} tabIndex={-1}>
    <SearchableCollection testId="organization-positions-list" title="سمت‌های شعبه" items={items} query={query} onQueryChange={setQuery} filters={[{ id: "members", label: "افراد", options: [{ value: "all", label: "همه سمت‌ها" }, { value: "with", label: "دارای فرد" }, { value: "without", label: "بدون فرد" }] }]} action={<Button data-test-id="organization-add-position" size="sm" onClick={event => setDialog({ trigger: event.currentTarget })}><Plus aria-hidden="true" className="size-3!" />افزودن سمت</Button>} columns={[
      { id: "name", label: "عنوان سمت", render: row => row.name },
      { id: "members", label: "تعداد افراد", width: 104, render: row => count(row.id).toLocaleString("fa-IR") },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu rowLabel={row.name} fallbackFocusRef={root} items={[{ id: "edit", label: "ویرایش سمت", onSelect: () => setDialog({ position: row, trigger: root.current }) }, { id: "remove", label: "حذف سمت", destructive: true, onSelect: () => setDialog({ position: row, remove: true, trigger: root.current }) }]} /> },
    ]} />
    {dialog && <OrganizationPositionDialog branchId={branchId} {...dialog} close={() => setDialog(null)} />}
  </div>;
}
