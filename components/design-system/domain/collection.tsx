"use client";
import { useRef, useState, type ReactNode, type RefObject } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { CompactSearch } from "@/components/ui/CompactSearch";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { SolidDataTable, type SolidColumn } from "@/components/ui/SolidDataTable";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { activateRowLink } from "@/lib/design-system/row-activation";
import { glass } from "@/lib/design-system/classes";
import type { DomainQuery } from "./queries";
export interface DomainFilter { id: string; label: string; options?: { value: string; label: string }[]; type?: "date"; initial?: string }
export function DomainTools({ testId, query, onChange, filters, count }: { testId: string; query: DomainQuery; onChange: (query: DomainQuery) => void; filters: DomainFilter[]; count: number }) {
  const [text, setText] = useState(query.text);
  const [expanded, setExpanded] = useState(false);
  const hasFilters = Object.values(query.filters).some(value => value && value !== "all");
  return <div data-test-id={`${testId}-tools`} className="space-y-2">
    <div data-test-id={`${testId}-search-row`} className="flex flex-wrap items-center gap-2">
      <CompactSearch testId={`${testId}-search`} label="جستجو در این بخش" value={text} onValueChange={setText} onApply={() => onChange({ ...query, text })} />
      {!!filters.length && <Button data-test-id={`${testId}-filter-toggle`} variant="outline" size="sm" aria-expanded={expanded} aria-controls={`${testId}-filters`} onClick={() => setExpanded(!expanded)}><Filter aria-hidden="true" className="size-3!" />فیلتر{hasFilters ? " · فعال" : ""}</Button>}
      {(query.text || hasFilters) && <Button data-test-id={`${testId}-reset`} variant="ghost" size="sm" onClick={() => { setText(""); onChange({ text: "", filters: {} }); }}><RotateCcw aria-hidden="true" className="size-3!" />پاک‌کردن</Button>}
      <span data-test-id={`${testId}-count`} role="status" className="text-[11px] text-muted-foreground">{count.toLocaleString("fa-IR")} مورد</span>
    </div>
    {expanded && <div data-test-id={`${testId}-filters`} id={`${testId}-filters`} className={`${glass.insetCard} grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3`}>
      {filters.map(filter => filter.type === "date" ? <TextField key={filter.id} data-test-id={`${testId}-filter-${filter.id}`} type="date" label={filter.label} value={query.filters[filter.id] ?? ""} min={filter.id === "toDate" ? query.filters.fromDate : undefined} max={filter.id === "fromDate" ? query.filters.toDate : undefined} onValueChange={value => onChange({ ...query, filters: { ...query.filters, [filter.id]: value } })} /> : <SelectField key={filter.id} data-test-id={`${testId}-filter-${filter.id}`} label={filter.label} size="sm" options={filter.options ?? []} value={query.filters[filter.id] ?? "all"} onValueChange={value => onChange({ ...query, filters: { ...query.filters, [filter.id]: value } })} />)}
    </div>}
  </div>;
}
export function useDomainQuery(filters: DomainFilter[] = []) {
  return useState<DomainQuery>(() => ({ text: "", filters: Object.fromEntries(filters.filter(item => item.initial).map(item => [item.id, item.initial!])) }));
}
function TableSession<T extends { id: string }>({ items, columns, testId, title, rowLinks, wide }: { items: T[]; columns: readonly [SolidColumn<T>, ...SolidColumn<T>[]]; testId: string; title: string; rowLinks?: boolean; wide?: boolean }) {
  const [count, setCount] = useState(10);
  const ref = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(items, count);
  return <div ref={ref} data-test-id={`${testId}-session`} className={`[&_table]:text-xs [&_td]:py-2 [&_th]:py-2 ${wide ? "[&_table]:min-w-[60rem]" : ""}`}>
    <SolidDataTable onRowClick={rowLinks ? (_row, event) => activateRowLink(event) : undefined} testId={`${testId}-table`} caption={title} hideCaption appearance="glass" columns={columns} rows={result.rows} getRowId={row => row.id} emptyMessage="موردی با این جستجو و فیلتر یافت نشد." />
    <LoadMore noun="مورد" listRef={ref} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </div>;
}
export function DomainCollection<T extends { id: string }>({ title, testId, items, columns, query, onQueryChange, filters = [], action, detail, rowLinks, wide, headingRef }: {
  title: string; testId: string; items: T[]; columns: readonly [SolidColumn<T>, ...SolidColumn<T>[]]; query: DomainQuery;
  onQueryChange: (query: DomainQuery) => void; filters?: DomainFilter[]; action?: ReactNode; detail?: ReactNode; rowLinks?: boolean; wide?: boolean; headingRef?: RefObject<HTMLHeadingElement | null>;
}) {
  return <section data-test-id={testId} className="min-w-0 space-y-3">
    <div data-test-id={`${testId}-heading`} className="flex flex-wrap items-center justify-between gap-2"><h2 ref={headingRef} tabIndex={-1} data-test-id={`${testId}-title`} className="text-sm font-bold">{title}</h2>{action}</div>
    {detail}
    <DomainTools testId={testId} query={query} onChange={onQueryChange} filters={filters} count={items.length} />
    <TableSession key={JSON.stringify(query)} items={items} columns={columns} testId={testId} title={title} rowLinks={rowLinks} wide={wide} />
  </section>;
}
