"use client";
import { useRef, useState } from "react";
import { Building2, Plus } from "lucide-react";
import { HierarchyList } from "@/components/ui/HierarchyList";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { CompactSearch } from "@/components/ui/CompactSearch";
import { ClasorBreadcrumb } from "@/components/ui/clasor-breadcrumb";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { glass } from "@/lib/design-system/classes";
import { BranchDialog, type BranchAction } from "./branch-dialog";
import { OrganizationMembers } from "./members";
import { OrganizationPositions } from "./positions";
import { branchHierarchy, branchPath, branchDescendants } from "./state";
import { useOrganization } from "./store";
export function OrganizationWorkspace() {
  const { state } = useOrganization();
  const [selectedId, setSelectedId] = useState("head-office");
  const [expanded, setExpanded] = useState(new Set(["head-office", "product", "design"]));
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [detailTab, setDetailTab] = useState("members");
  const [action, setAction] = useState<BranchAction | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const selected = state.branches.find(branch => branch.id === selectedId) ?? state.branches[0];
  const tree = branchHierarchy(state.branches, query);
  function select(id: string) {
    setSelectedId(id);
    setExpanded(current => new Set([...current, ...branchPath(state.branches, id).map(branch => branch.id)]));
  }
  function toggle(id: string) { setExpanded(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }
  const members = state.members.filter(item => item.branchId === selected?.id);
  const positions = state.positions.filter(item => item.branchId === selected?.id);
  return <div data-test-id="organization-workspace" className="grid min-h-0 min-w-0 grid-cols-1 gap-3 lg:grid-cols-2 xl:flex-1">
    <GlassCard data-test-id="organization-branches-panel" className="flex h-[34rem] min-h-0 min-w-0 flex-col overflow-hidden p-3 xl:h-auto">
      <div data-test-id="organization-branches-heading" className="mb-3 flex items-center justify-between gap-2"><h2 data-test-id="organization-branches-title" ref={heading} tabIndex={-1} className="flex items-center gap-2 text-sm font-bold"><Building2 aria-hidden="true" className="size-4 text-primary" />شعبات</h2><Button data-test-id="organization-add-branch" size="sm" onClick={event => setAction({ kind: "create", trigger: event.currentTarget })}><Plus aria-hidden="true" className="size-3!" />افزودن شعبه</Button></div>
      <div data-test-id="organization-branch-search-row" className="mb-3"><CompactSearch testId="organization-branch-search" label="جستجوی شعبه" value={draftQuery} onValueChange={setDraftQuery} onApply={() => { setQuery(draftQuery); if (draftQuery.trim()) setExpanded(new Set(state.branches.map(branch => branch.id))); }} /></div>
      <GlassScrollArea data-test-id="organization-branches-scroll" label="ساختار شعبات سازمان" contentClassName={glass.boundedScrollContent}>
        <HierarchyList key={query} testId="organization-branches" label="ساختار شعبات" items={tree} selectedId={selected?.id} expanded={expanded} revealSelected onExpandedChange={toggle} onSelectionChange={select} renderActions={item => <RowActionMenu rowLabel={item.label} fallbackFocusRef={heading} items={[
          { id: "create-child", label: "افزودن زیرشعبه", onSelect: () => setAction({ kind: "child", branchId: item.id, trigger: heading.current }) },
          { id: "edit", label: "ویرایش شعبه", onSelect: () => setAction({ kind: "edit", branchId: item.id, trigger: heading.current }) },
          { id: "delete", label: "حذف شعبه", destructive: true, onSelect: () => setAction({ kind: "delete", branchId: item.id, trigger: heading.current }) },
        ]} />} />
      </GlassScrollArea>
    </GlassCard>
    <GlassCard data-test-id="organization-detail-panel" className="flex h-[34rem] min-h-0 min-w-0 flex-col overflow-hidden p-3 xl:h-auto">
      {selected ? <>
        <header data-test-id="organization-selected-header" className="mb-3 space-y-2 border-b border-white/30 pb-3">
          <div data-test-id="organization-selected-heading" className="flex flex-wrap items-center justify-between gap-2"><h2 data-test-id="organization-selected-name" className="text-sm font-bold">{selected.name}</h2><Badge data-test-id="organization-selection-badge" className={glass.statusInfo}>شعبه انتخاب‌شده</Badge></div>
          <div data-test-id="organization-selected-path"><ClasorBreadcrumb items={branchPath(state.branches, selected.id).map(branch => ({ id: branch.id, label: branch.name }))} className="[&_li]:text-[10px]" /></div>
          <p data-test-id="organization-selection-status" role="status" className="sr-only">اطلاعات شعبه {selected.name}؛ {members.length.toLocaleString("fa-IR")} فرد و {positions.length.toLocaleString("fa-IR")} سمت</p>
        </header>
        <ClasorTabs value={detailTab} onValueChange={value => setDetailTab(String(value))} label={`اطلاعات شعبه ${selected.name}`} className="min-h-0 flex-1 [&>[role=tabpanel]]:min-h-0 [&>[role=tabpanel]]:overflow-hidden" testIds={{ tab: value => `organization-detail-tab-${value}` }} items={[
          { value: "members", label: `افراد (${members.length.toLocaleString("fa-IR")})`, content: <GlassScrollArea key={`${selected.id}-members`} data-test-id="organization-members-scroll" label={`افراد شعبه ${selected.name}`} className="h-full"><OrganizationMembers branchId={selected.id} /></GlassScrollArea> },
          { value: "positions", label: `سمت‌ها (${positions.length.toLocaleString("fa-IR")})`, content: <GlassScrollArea key={`${selected.id}-positions`} data-test-id="organization-positions-scroll" label={`سمت‌های شعبه ${selected.name}`} className="h-full"><OrganizationPositions branchId={selected.id} /></GlassScrollArea> },
        ]} />
      </> : <p data-test-id="organization-no-selection" className="m-auto text-xs text-muted-foreground">برای نمایش افراد و سمت‌ها، یک شعبه بسازید و انتخاب کنید.</p>}
    </GlassCard>
    {action && <BranchDialog action={action} close={() => setAction(null)} onCreated={id => { setQuery(""); setDraftQuery(""); setSelectedId(id); setExpanded(current => new Set([...current, ...branchPath(state.branches, action.branchId).map(branch => branch.id)])); }} onRemoved={id => { const affected = branchDescendants(state.branches, id); if (affected.has(selectedId)) setSelectedId(state.branches.find(branch => !affected.has(branch.id))?.id ?? ""); }} />}
  </div>;
}
