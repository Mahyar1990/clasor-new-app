import { Skeleton } from "@/components/ui/skeleton";

export default function ListSkeleton({ rows = 3, label = "در حال بارگذاری اسناد…" }: { rows?: number; label?: string }) {
  return <div data-test-id="list-skeleton-div-1" className="ws-listSkeleton" role="status" aria-label={label} aria-busy="true"><span data-test-id="list-skeleton-span-2" className="sr-only">{label}</span><div data-test-id="list-skeleton-div-3" aria-hidden="true">{Array.from({ length: rows }, (_, index) => <div data-test-id={`list-skeleton-div-4-${String(index)}`} key={index} className="ws-skeletonRow"><Skeleton className="ws-skeletonIcon motion-reduce:animate-none" /><div data-test-id={`list-skeleton-div-5-${String(index)}`} className="ws-skeletonTitle"><Skeleton className="h-3 w-3/4 motion-reduce:animate-none" /><Skeleton className="h-2 w-1/2 motion-reduce:animate-none" /></div><Skeleton className="ws-skeletonMeta motion-reduce:animate-none" /></div>)}</div></div>;
}
