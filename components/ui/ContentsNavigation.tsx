"use client";
import { glass } from "@/lib/design-system/classes";
export interface ContentsItem { id: string; label: string; level: number }
export function ContentsNavigation({ items, selectedId, onSelect, testId }: { items: ContentsItem[]; selectedId?: string; onSelect: (id: string) => void; testId: string }) {
  return <nav data-test-id={testId} aria-label="فهرست سند">
    {items.length ? <ol data-test-id={`${testId}-list`} className="space-y-0.5">{items.map(item => <li data-test-id={`${testId}-item-${item.id}`} key={item.id} style={{ paddingInlineStart: `${Math.max(0, item.level - 1) * 10}px` }}><a data-test-id={`${testId}-link-${item.id}`} href={`#${item.id}`} aria-current={item.id === selectedId ? "location" : undefined} className={`${glass.navigation} ${glass.current} block px-2 py-1.5 text-[10px] leading-5 wrap-anywhere`} onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item.id); } }}>{item.label}</a></li>)}</ol> : <p data-test-id={`${testId}-empty`} className="p-2 text-[11px] text-muted-foreground">سرفصلی برای نمایش وجود ندارد.</p>}
  </nav>;
}
