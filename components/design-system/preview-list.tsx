"use client";
import { useRef, useState, type ReactNode } from "react";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";

export function PreviewList<T extends { id: string }>({ items, noun, testId, render }: { items: T[]; noun: string; testId: string; render: (item: T) => ReactNode }) {
  const [count, setCount] = useState(10);
  const ref = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(items, count);
  return <div data-test-id={testId} className="space-y-2 [&_.ws-loadMore]:space-y-2 [&_.ws-loadMore]:py-3 [&_.ws-loadMore>p]:text-xs [&_.ws-loadMore>p]:text-muted-foreground [&_.ws-listSkeleton]:w-full [&_.ws-skeletonRow]:flex [&_.ws-skeletonRow]:min-h-14 [&_.ws-skeletonRow]:items-center [&_.ws-skeletonRow]:gap-3 [&_.ws-skeletonRow]:py-2 [&_.ws-skeletonIcon]:size-7 [&_.ws-skeletonTitle]:flex-1 [&_.ws-skeletonTitle]:space-y-2 [&_.ws-skeletonMeta]:h-2 [&_.ws-skeletonMeta]:w-12">
    <div data-test-id={`${testId}-rows`} ref={ref} className="space-y-2">{result.rows.map(item => <div data-test-id={`${testId}-row-${item.id}`} data-load-more-item key={item.id}>{render(item)}</div>)}</div>
    {!items.length && <p data-test-id={`${testId}-empty`} className="py-8 text-center text-xs text-muted-foreground">موردی برای نمایش وجود ندارد.</p>}
    <LoadMore listRef={ref} result={result} noun={noun} onLoadMore={() => setCount(result.nextCount)} />
  </div>;
}
