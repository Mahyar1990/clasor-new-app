"use client";
import { useRef, useState } from "react";
import { SolidDataTable } from "@/components/ui/SolidDataTable";
import { GlassCard } from "@/components/ui/GlassCard";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { adminFeedback, type AdminFeedback } from "./fixtures";
import { sortFeedback, type FeedbackSort } from "./query";
export function AdminFeedbackList({ records = adminFeedback }: { records?: AdminFeedback[] }) {
  const [sort, setSort] = useState<FeedbackSort>({ field: "id", direction: "desc" });
  const [count, setCount] = useState(10);
  const list = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(sortFeedback(records, sort), count);
  function toggle(field: FeedbackSort["field"]) { setCount(10); setSort(current => ({ field, direction: current.field === field && current.direction === "asc" ? "desc" : "asc" })); }
  return <GlassCard data-test-id="admin-feedback-panel" className="min-w-0 space-y-3 p-3 md:p-4" aria-labelledby="admin-feedback-title">
    <h2 data-test-id="admin-feedback-title" id="admin-feedback-title" className="text-sm font-semibold">لیست بازخوردها</h2>
    <div data-test-id="admin-feedback-list" ref={list} className="[&_table]:min-w-[32rem] [&_table]:text-xs [&_td]:py-2 [&_th]:py-2">
      <SolidDataTable testId="admin-feedback-table" caption="بازخوردهای کاربران" hideCaption appearance="glass" layout="fixed" rows={result.rows} getRowId={row => row.id} columns={[
        { id: "id", label: "شناسه", width: 100, sort: { direction: sort.field === "id" ? sort.direction : undefined, onToggle: () => toggle("id") }, render: row => <bdi data-test-id={`admin-feedback-id-${row.id}`}>{row.id}</bdi> },
        { id: "entityId", label: "entityId", width: 112, sort: { direction: sort.field === "entityId" ? sort.direction : undefined, onToggle: () => toggle("entityId") }, render: row => <bdi data-test-id={`admin-feedback-entity-${row.id}`}>{row.entityId}</bdi> },
        { id: "description", label: "توضیحات", render: row => <p data-test-id={`admin-feedback-description-${row.id}`} className="whitespace-pre-wrap leading-6 wrap-anywhere">{row.description}</p> },
      ]} />
      <LoadMore key={`${sort.field}-${sort.direction}`} noun="بازخورد" listRef={list} result={result} onLoadMore={() => setCount(result.nextCount)} />
    </div>
  </GlassCard>;
}
