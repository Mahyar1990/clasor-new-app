import { Badge } from "@/components/ui/badge"
import type { ApprovalStatus, Visibility, VersionStatus, DisplayRole } from "@/lib/design-system/models"

const approval = {
  draft: { label: "پیش‌نویس", style: "border-border bg-muted text-muted-foreground" },
  pending: { label: "در انتظار تأیید", style: "border-warning-border bg-warning-surface text-warning" },
  approved: { label: "تأییدشده", style: "border-success-border bg-success-surface text-success" },
  rejected: { label: "ردشده", style: "border-danger-border bg-danger-surface text-danger" },
}
function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  return <Badge variant="outline" className={approval[status].style}>{approval[status].label}</Badge>
}
function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  return <Badge variant="outline" className="border-info-border bg-info-surface text-info">{{ private: "خصوصی", link: "با پیوند", public: "عمومی" }[visibility]}</Badge>
}
function LatestBadge({ status }: { status: VersionStatus }) {
  return status === "latest" ? <Badge variant="outline" className="border-border bg-muted text-foreground">آخرین نسخه</Badge> : null
}
function RoleBadge({ role }: { role: DisplayRole }) {
  return <Badge variant="outline" className="border-border bg-muted text-muted-foreground">{{ owner: "مالک", admin: "مدیر مخزن", editor: "ویرایشگر", writer: "نویسنده", viewer: "مشاهده‌گر", anonymous: "بازدیدکننده واردنشده", manager: "مدیر", guest: "مهمان" }[role]}</Badge>
}
export { ApprovalBadge, VisibilityBadge, LatestBadge, RoleBadge }
