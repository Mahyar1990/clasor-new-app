"use client";
import { useRef, useState, type ReactNode } from "react";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import type { PreviewRecord } from "./context";

export function PreviewList({ items, noun, testId, render }: { items: PreviewRecord[]; noun: string; testId: string; render: (item: PreviewRecord) => ReactNode }) {
  const [count, setCount] = useState(10);
  const ref = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(items, count);
  return <div data-test-id={testId} className="space-y-2">
    <div data-test-id={`${testId}-rows`} ref={ref} className="space-y-2">{result.rows.map(item => <div data-test-id={`${testId}-row-${item.id}`} data-load-more-item key={item.id}>{render(item)}</div>)}</div>
    {!items.length && <p data-test-id={`${testId}-empty`} className="py-8 text-center text-xs text-muted-foreground">موردی برای نمایش وجود ندارد.</p>}
    <LoadMore listRef={ref} result={result} noun={noun} onLoadMore={() => setCount(result.nextCount)} />
  </div>;
}
