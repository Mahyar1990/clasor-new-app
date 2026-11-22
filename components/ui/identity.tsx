import { UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Identity as IdentityModel } from "@/lib/design-system/models"

function Identity({ identity, density = "comfortable" }: { identity: IdentityModel; density?: "comfortable" | "compact" }) {
  const registeredName = identity.kind === "known" ? identity.name.trim() : ""
  const name = identity.kind === "known" ? registeredName || "نام ثبت نشده" : identity.label.trim() || "هویت نامشخص"
  const initials = registeredName.split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join(" ")
  return <span data-test-id="identity-span-1" className={`inline-flex min-w-0 items-center ${density === "compact" ? "gap-2" : "gap-3"}`}>
    <Avatar data-test-id="identity-avatar" size={density === "compact" ? "sm" : "default"} aria-hidden="true">
      {identity.kind === "known" && identity.avatarUrl && <AvatarImage src={identity.avatarUrl} alt="" />}
      <AvatarFallback>{initials || <UserRound className="size-5" aria-hidden="true" />}</AvatarFallback>
    </Avatar>
    <span data-test-id="identity-span-2" className={`min-w-0 wrap-anywhere leading-body text-foreground ${density === "compact" ? "text-xs" : "text-sm"}`}>{name}</span>
  </span>
}
export { Identity }
