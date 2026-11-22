import { GlassCard } from "./GlassCard";
import { FolderOpen, ShieldX, FileWarning, CloudOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SystemState as State } from "@/lib/design-system/models"
import { glass } from "@/lib/design-system/classes";

const stateAppearance = {
  empty: { icon: FolderOpen, tone: "" },
  "permission-denied": { icon: ShieldX, tone: glass.statusInfo },
  "partial-success": { icon: FileWarning, tone: glass.statusWarning },
  "service-error": { icon: CloudOff, tone: glass.statusDanger },
}
export function SystemState({ state, onRecovery }: { state: State; onRecovery?: () => void }) {
  const { icon: Icon, tone } = stateAppearance[state.kind]
  const title = state.kind === "partial-success" ? `«${state.createdItem.name}» ایجاد شد؛ یک مرحله ناتمام است` : state.title
  const description = state.kind === "partial-success" ? state.unfinishedStep : state.kind === "permission-denied" ? state.reason : state.description
  return <GlassCard as="div" data-test-id="system-state-div-1" className={`grid min-w-0 justify-items-start gap-3 p-4 ${tone ? `${glass.statusSurface} ${tone}` : ""}`} data-state={state.kind}>
    <Icon className={`size-8 ${tone ? "text-current" : "text-muted-foreground"}`} aria-hidden="true" />
    <h3 data-test-id="system-state-h3-2" className="min-w-0 wrap-anywhere text-base font-medium">{title}</h3><p data-test-id="system-state-p-3" className={`min-w-0 wrap-anywhere text-sm leading-body ${tone ? "text-current" : "text-muted-foreground"}`}>{description}</p>
    {state.kind === "service-error" && <p data-test-id="system-state-p-4" className="text-xs">{state.dataRetained ? "ورودی‌های شما حفظ شده‌اند." : "وضعیت ثبت اطلاعات نیازمند بررسی است."}</p>}
    {onRecovery && <Button data-test-id="system-state-button-5" variant="outline" className={glass.feedbackAction} onClick={onRecovery}>{"recoveryLabel" in state ? state.recoveryLabel : "بررسی و ادامه"}</Button>}
  </GlassCard>
}
