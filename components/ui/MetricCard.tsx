import type { ReactNode } from "react";
import { GlassCard } from "./GlassCard";
import { GlassEmblem } from "./GlassEmblem";
import { Skeleton } from "./skeleton";
export interface MetricItem { id: string; label: string; value: ReactNode }
/** One semantic summary surface; values/units and data ownership stay with its caller. */
export function MetricCard({ title, icon, metrics, testId, loading = false }: {
  title: string; icon: ReactNode; metrics: MetricItem[]; testId: string; loading?: boolean;
}) {
  return <GlassCard data-test-id={testId} aria-labelledby={`${testId}-title`} aria-busy={loading} className="min-w-0 space-y-4 p-4">
    <h3 id={`${testId}-title`} data-test-id={`${testId}-title`} className="flex items-center gap-2 text-sm font-semibold"><GlassEmblem data-test-id={`${testId}-icon`} className="size-8 shrink-0" aria-hidden="true">{icon}</GlassEmblem>{title}</h3>
    <dl data-test-id={`${testId}-metrics`} className={`grid gap-3 ${metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
      {metrics.map(metric => <div data-test-id={`${testId}-${metric.id}`} key={metric.id} className="min-w-0 space-y-1">
        <dt data-test-id={`${testId}-${metric.id}-label`} className="text-[11px] leading-5 text-muted-foreground wrap-anywhere">{metric.label}</dt>
        <dd data-test-id={`${testId}-${metric.id}-value`} className="m-0 text-base font-semibold tabular-nums wrap-anywhere">{loading ? <Skeleton data-test-id={`${testId}-${metric.id}-skeleton`} className="h-5 w-14 max-w-full motion-reduce:animate-none" /> : metric.value}</dd>
      </div>)}
    </dl>
    {loading && <span data-test-id={`${testId}-loading`} role="status" className="sr-only">در حال دریافت {title}</span>}
  </GlassCard>;
}
