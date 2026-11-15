import { UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Identity as IdentityModel } from "@/lib/design-system/models"

function Identity({ identity }: { identity: IdentityModel }) {
  const name = identity.kind === "known" ? identity.name.trim() || "نام ثبت نشده" : identity.label.trim() || "هویت نامشخص"
  const initials = identity.kind === "known" ? name.split(/\s+/).slice(0, 2).map(part => part[0]).join(" ") : null
  return <span data-test-id="identity-span-1" className="inline-flex min-w-0 items-center gap-3">
    <Avatar aria-hidden="true">
      {identity.kind === "known" && identity.avatarUrl && <AvatarImage src={identity.avatarUrl} alt="" />}
      <AvatarFallback>{initials || <UserRound className="size-5" aria-hidden="true" />}</AvatarFallback>
    </Avatar>
    <span data-test-id="identity-span-2" className="min-w-0 break-words text-sm leading-body">{name}</span>
  </span>
}
export { Identity }
