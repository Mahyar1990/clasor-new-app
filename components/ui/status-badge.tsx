import { glass } from "@/lib/design-system/classes";
import { Badge } from "@/components/ui/badge"
import type { ApprovalStatus, Visibility, VersionStatus, DisplayRole } from "@/lib/design-system/models"

const approval = {
  draft: { label: "پیش‌نویس", style: glass.statusNeutral },
  pending: { label: "در انتظار تأیید", style: glass.statusWarning },
  approved: { label: "تأییدشده", style: glass.statusSuccess },
  rejected: { label: "ردشده", style: glass.statusDanger },
}
function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  return <Badge variant="outline" data-test-id={`approval-badge-${status}`} className={approval[status].style}>{approval[status].label}</Badge>
}
function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  return <Badge variant="outline" className={glass.statusInfo}>{{ private: "خصوصی", link: "با پیوند", public: "عمومی" }[visibility]}</Badge>
}
function LatestBadge({ status }: { status: VersionStatus }) {
  return status === "latest" ? <Badge variant="outline" className={glass.statusNeutral}>آخرین نسخه</Badge> : null
}
function RoleBadge({ role }: { role: DisplayRole }) {
  return <Badge variant="outline" className={glass.statusNeutral}>{{ owner: "مالک", admin: "مدیر مخزن", editor: "ویرایشگر", writer: "نویسنده", viewer: "مشاهده‌گر", anonymous: "بازدیدکننده واردنشده", manager: "مدیر", guest: "مهمان" }[role]}</Badge>
}
export { ApprovalBadge, VisibilityBadge, LatestBadge, RoleBadge }
