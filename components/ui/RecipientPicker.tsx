"use client";
import { useRef, useState } from "react";
import { Users, UserRound } from "lucide-react";
import { SearchField } from "./text-field";
import { Checkbox } from "./checkbox";
import { GlassScrollArea } from "./GlassScrollArea";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
export interface RecipientOption { id: string; name: string; kind: "user" | "group"; detail?: string }
function RecipientList({ options, value, onValueChange }: { options: RecipientOption[]; value: string[]; onValueChange: (ids: string[]) => void }) {
  const [count, setCount] = useState(10);
  const list = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(options, count);
  return <><div data-test-id="recipient-picker-list" ref={list} className="space-y-1">{result.rows.map(item => <label data-test-id={`recipient-option-${item.id}`} data-load-more-item key={item.id} className="flex cursor-pointer items-center gap-2 rounded-md border border-white/25 px-2 py-2 text-xs hover:bg-white/15"><Checkbox data-test-id={`recipient-check-${item.id}`} aria-label={item.name} checked={value.includes(item.id)} onCheckedChange={checked => onValueChange(checked ? [...value, item.id] : value.filter(id => id !== item.id))} />{item.kind === "group" ? <Users aria-hidden="true" className="size-4 text-primary" /> : <UserRound aria-hidden="true" className="size-4 text-primary" />}<span data-test-id={`recipient-name-${item.id}`} className="min-w-0 flex-1 wrap-anywhere">{item.name}<span data-test-id={`recipient-detail-${item.id}`} className="ms-2 text-[10px] text-muted-foreground">{item.kind === "group" ? "گروه" : "کاربر"}{item.detail ? ` · ${item.detail}` : ""}</span></span></label>)}</div>{!options.length && <p data-test-id="recipient-picker-empty" className="py-3 text-xs text-muted-foreground">موردی یافت نشد.</p>}<LoadMore noun="کاربر و گروه" listRef={list} result={result} onLoadMore={() => setCount(result.nextCount)} /></>;
}
export function RecipientPicker({ options, value, onValueChange, testId }: { options: RecipientOption[]; value: string[]; onValueChange: (ids: string[]) => void; testId: string }) {
  const [query, setQuery] = useState("");
  return <div data-test-id={testId} className="space-y-2">
    <SearchField data-test-id={`${testId}-search`} label="جستجوی کاربران و گروه‌های مخزن" value={query} onValueChange={setQuery} />
    <p data-test-id={`${testId}-count`} role="status" className="text-[11px] text-muted-foreground">{value.length} مورد انتخاب شده</p>
    <GlassScrollArea data-test-id={`${testId}-scroll`} label="کاربران و گروه‌های مخزن" className="h-56"><RecipientList key={query} options={options.filter(item => `${item.name} ${item.detail ?? ""}`.includes(query.trim()))} value={value} onValueChange={onValueChange} /></GlassScrollArea>
  </div>;
}
