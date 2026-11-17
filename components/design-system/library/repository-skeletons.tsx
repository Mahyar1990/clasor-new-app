import { Skeleton } from "@/components/ui/skeleton";
import { glass } from "@/lib/design-system/classes";
export function RepositorySkeletons({ testId = "repository-tile-skeletons" }: { testId?: string }) {
  return <div data-test-id={testId} role="status" aria-label="در حال بارگذاری مخزن‌ها" className={glass.repositoryGrid}>
    {[0, 1, 2].map(id => <div data-test-id={`${testId}-${id}`} key={id} aria-hidden="true" className={`${glass.contentSurface} flex min-h-32 items-center gap-3 p-3`}><Skeleton className="size-16 shrink-0" /><div data-test-id={`${testId}-copy-${id}`} className="flex-1 space-y-2"><Skeleton className="h-3 w-4/5" /><Skeleton className="h-2 w-3/5" /></div><Skeleton className="size-8 shrink-0" /></div>)}
  </div>;
}
