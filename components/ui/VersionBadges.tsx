import { ApprovalBadge, LatestBadge, VisibilityBadge } from "./status-badge";
export function VersionBadges({ approval, pending, latest, published, testId }: { approval: "draft" | "approved"; pending?: boolean; latest?: boolean; published?: boolean; testId: string }) {
  return <span data-test-id={testId} className="flex flex-wrap items-center gap-1"><ApprovalBadge status={approval} />{pending && <ApprovalBadge status="pending" />}{latest && <LatestBadge status="latest" />}{published && <VisibilityBadge visibility="public" />}</span>;
}
