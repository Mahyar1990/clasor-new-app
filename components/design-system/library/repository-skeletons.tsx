import { Skeleton } from "@/components/ui/skeleton";
import { glass } from "@/lib/design-system/classes";
export function RepositorySkeletons({ testId = "repository-tile-skeletons" }: { testId?: string }) {
  return <div data-test-id={testId} role="status" aria-label="در حال بارگذاری مخزن‌ها" className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
    {[0, 1, 2].map(id => <div data-test-id={`${testId}-${id}`} key={id} aria-hidden="true" className={`${glass.contentSurface} flex aspect-square flex-col gap-2 p-2`}><Skeleton className="size-6" /><Skeleton className="mt-auto h-3 w-4/5" /><Skeleton className="h-2 w-3/5" /></div>)}
  </div>;
}
