import { glass } from "@/lib/design-system/classes";
import { useId } from "react"
import { Skeleton } from "@/components/ui/skeleton"
export function ProgressIndicator({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const id = useId()
  const limit = Math.max(1, max)
  const current = Math.min(limit, Math.max(0, value))
  return <div data-test-id="progress-indicator-div-1" className="grid gap-2"><div data-test-id="progress-indicator-div-2" className="flex flex-wrap justify-between gap-2 text-sm"><label data-test-id="progress-indicator-label-3" htmlFor={id} className="min-w-0 flex-1 wrap-anywhere">{label}</label><span data-test-id="progress-indicator-span-4">{new Intl.NumberFormat("fa", { style: "percent" }).format(current / limit)}</span></div><progress data-test-id="progress-indicator-progress-5" id={id} value={current} max={limit} className={glass.progress} /></div>
}
export function LoadingSkeleton({ label = "در حال بارگذاری", rows = 3 }: { label?: string; rows?: number }) {
  return <div data-test-id="progress-indicator-div-6" role="status" aria-label={label} className="space-y-3"><span data-test-id="progress-indicator-span-7" className="sr-only">{label}</span><div data-test-id="progress-indicator-div-8" aria-hidden="true" className="space-y-3">{Array.from({ length: rows }, (_, i) => <Skeleton key={i} className="h-5 w-full motion-reduce:animate-none" />)}</div></div>
}
