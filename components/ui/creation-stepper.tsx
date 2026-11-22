"use client"
import { useRef, useState, type ReactNode } from "react"
import { glass } from "@/lib/design-system/classes";
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
export function CreationStepper({ steps, currentStep, onStepChange, children, onCommit, commitLabel, canContinue = true, validationMessage, loading = false, error, compact = false, onCancel }: {
  compact?: boolean; onCancel?: () => void
  steps: { id: string; label: string }[]; currentStep: number; onStepChange: (step: number) => void; children: ReactNode
  onCommit: () => void | Promise<void>; commitLabel: string; canContinue?: boolean; validationMessage?: string; loading?: boolean; error?: string
}) {
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState("")
  const lock = useRef(false)
  const busy = loading || pending
  async function commit() { if (lock.current || busy) return; lock.current = true; setPending(true); setFailure(""); try { await onCommit() } catch (cause) { setFailure(cause instanceof Error ? cause.message : "ایجاد انجام نشد؛ دوباره تلاش کنید.") } finally { lock.current = false; setPending(false) } }
  return <div data-test-id="creation-stepper-div-1" data-slot="creation-stepper" className={compact ? "space-y-3" : "space-y-5"}>{compact && <div data-test-id="creation-stepper-summary" className="space-y-2"><p data-test-id="creation-stepper-current" role="status" className="flex justify-between gap-2 text-xs"><span data-test-id="creation-stepper-label">{steps[currentStep]?.label}</span><span data-test-id="creation-stepper-counter" className="text-muted-foreground">{currentStep + 1} / {steps.length}</span></p><progress data-test-id="creation-stepper-progress" aria-label="پیشرفت مراحل" value={currentStep + 1} max={steps.length} className={`${glass.progress} ${glass.stepProgress}`} /></div>}<ol data-test-id="creation-stepper-ol-2" aria-label="مراحل ایجاد" className={compact ? "sr-only" : "flex flex-wrap gap-4"}>{steps.map((step, index) => <li data-test-id={`creation-stepper-li-3-${String(step.id)}`} key={step.id} aria-current={index === currentStep ? "step" : undefined} className={`flex items-center gap-2 text-sm ${index === currentStep ? "font-semibold text-[color:var(--panel-link)]" : index < currentStep ? "text-foreground" : "text-muted-foreground"}`}>
    <span data-test-id={`creation-stepper-span-4-${String(step.id)}`} data-slot="step-indicator" data-step-state={index < currentStep ? "complete" : index === currentStep ? "current" : "pending"} className={glass.step}>{index < currentStep ? <Check className="size-4" aria-hidden="true" /> : new Intl.NumberFormat("fa").format(index + 1)}</span>{step.label}{index < currentStep && <span data-test-id={`creation-stepper-span-5-${String(step.id)}`} className="sr-only">تکمیل‌شده</span>}
  </li>)}</ol><div data-test-id="creation-stepper-div-6">{children}</div>
    {(!canContinue && validationMessage) && <p data-test-id="creation-stepper-p-7" className="text-sm text-danger">{validationMessage}</p>}
    {(error || failure) && <p data-test-id="creation-stepper-p-8" role="alert" className="text-sm text-danger">{error || failure}</p>}
    <div data-test-id="creation-stepper-div-9" className="flex flex-wrap justify-between gap-3"><Button data-test-id="creation-stepper-button-10" variant="outline" disabled={currentStep === 0 && !onCancel || busy} onClick={() => currentStep === 0 ? onCancel?.() : onStepChange(currentStep - 1)}>{currentStep === 0 && onCancel ? "انصراف" : "برگشت"}</Button>
      {currentStep < steps.length - 1 ? <Button data-test-id="creation-stepper-button-11" disabled={!canContinue || busy} onClick={() => onStepChange(currentStep + 1)}>ادامه</Button> : <Button data-test-id="creation-stepper-button-12" loading={busy} disabled={!canContinue} onClick={commit}>{commitLabel}</Button>}
    </div>
  </div>
}
