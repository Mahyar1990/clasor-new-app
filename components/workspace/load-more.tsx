"use client";

import { useEffect, useEffectEvent, useId, useRef, useState, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { LIST_BATCH_SIZE } from "@/lib/workspace/documents";
import type { ILoadMoreResult } from "@/interface/workspace";
import ListSkeleton from "@/components/workspace/list-skeleton";

export default function LoadMore({ result, onLoadMore, listRef, noun = "مورد" }: {
  result: Pick<ILoadMoreResult<unknown>, "shown" | "total" | "hasMore">;
  onLoadMore: () => void;
  listRef: RefObject<HTMLElement | null>;
  noun?: string;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pendingBatch, setPendingBatch] = useState<string | null>(null);
  const [manualFallback, setManualFallback] = useState(false);
  const fallbackRequest = useRef<(() => void) | null>(null);
  const statusId = useId();
  const { shown, total, hasMore } = result;
  const batch = `${shown}:${total}`;
  const loading = hasMore && pendingBatch === batch;
  const append = useEffectEvent(onLoadMore);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!hasMore || !sentinel) return;
    let pending = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    const load = () => {
      if (pending || !listRef.current?.getClientRects().length) return;
      pending = true;
      setPendingBatch(batch);
      // Local mock latency; replace with the real request lifecycle when connected.
      timer = setTimeout(() => { setPendingBatch(null); append(); }, 600);
    };
    fallbackRequest.current = load;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) load();
    }, { threshold: 0 });
    observer?.observe(sentinel);
    if (!observer) fallbackTimer = setTimeout(() => setManualFallback(true), 0);
    return () => { observer?.disconnect(); clearTimeout(timer); clearTimeout(fallbackTimer); fallbackRequest.current = null; };
  }, [shown, total, hasMore, listRef, batch]);
  if (total <= LIST_BATCH_SIZE) return null;
  return <div data-test-id="load-more-div-1" ref={sentinelRef} className="ws-loadMore" aria-busy={loading}><p data-test-id="load-more-p-2" id={statusId} role="status" aria-atomic="true">{hasMore ? `${new Intl.NumberFormat("fa").format(shown)} از ${new Intl.NumberFormat("fa").format(total)} ${noun} نمایش داده شده` : `همه ${new Intl.NumberFormat("fa").format(total)} ${noun} نمایش داده شدند.`}</p>{loading && <ListSkeleton rows={Math.min(3, total - shown)} label={`در حال بارگذاری ${noun === "سند" ? "اسناد" : noun} بیشتر…`} />}{hasMore && !loading && <p data-test-id="load-more-p-3" className="ws-loadMoreHint">برای دیدن موارد بیشتر به پایین فهرست بروید</p>}{hasMore && manualFallback && <Button data-test-id="load-more-button-4" variant="outline" disabled={loading} aria-describedby={statusId} onClick={() => fallbackRequest.current?.()}>نمایش بیشتر</Button>}</div>;
}
