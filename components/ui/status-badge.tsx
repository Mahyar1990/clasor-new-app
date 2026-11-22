import { Badge } from "@/components/ui/badge"
import type { ApprovalStatus, Visibility, VersionStatus, DisplayRole } from "@/lib/design-system/models"

const approval = {
  draft: { label: "پیش‌نویس", variant: "outline" },
  pending: { label: "در انتظار تأیید", variant: "warning" },
  approved: { label: "تأییدشده", variant: "success" },
  rejected: { label: "ردشده", variant: "destructive" },
} as const
function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  return <Badge variant={approval[status].variant} data-test-id={`approval-badge-${status}`}>{approval[status].label}</Badge>
}
function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  return <Badge variant="info">{{ private: "خصوصی", link: "با پیوند", public: "عمومی" }[visibility]}</Badge>
}
function LatestBadge({ status }: { status: VersionStatus }) {
  return status === "latest" ? <Badge variant="outline">آخرین نسخه</Badge> : null
}
function RoleBadge({ role }: { role: DisplayRole }) {
  return <Badge variant="outline">{{ owner: "مالک", admin: "مدیر مخزن", editor: "ویرایشگر", writer: "نویسنده", viewer: "مشاهده‌گر", anonymous: "بازدیدکننده واردنشده", manager: "مدیر", guest: "مهمان" }[role]}</Badge>
}
export { ApprovalBadge, VisibilityBadge, LatestBadge, RoleBadge }
