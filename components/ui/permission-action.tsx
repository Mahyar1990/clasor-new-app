"use client"
import { Button } from "@/components/ui/button"
import type { ResolvedPermission } from "@/lib/design-system/models"
import type { RowAction } from "@/components/ui/row-action-menu"
type PermissionProps = { permission: ResolvedPermission; onDirectApproval: () => void; onRequestApproval: () => void; loading?: boolean }
export function permissionActionItem({ permission, onDirectApproval, onRequestApproval }: PermissionProps): RowAction {
  return { id: "approval", label: permission.kind === "direct-approval" ? "تأیید محتوا" : "درخواست تأیید", disabledReason: permission.kind === "blocked" ? permission.reason : undefined, onSelect: () => { if (permission.kind === "direct-approval") onDirectApproval(); else if (permission.kind === "request-approval") onRequestApproval() } }
}
export function PermissionAction(props: PermissionProps) {
  const action = permissionActionItem(props)
  return <Button data-test-id="permission-action-button-1" loading={props.loading} disabled={!props.permission.allowed} disabledReason={action.disabledReason} onClick={action.onSelect}>{action.label}</Button>
}
