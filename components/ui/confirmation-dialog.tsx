"use client"
import { useRef, useState, type ReactElement, type RefObject } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
type ConfirmationProps = {
  trigger: ReactElement; title: string; description: string; targetName: string; confirmLabel: string
  onConfirm: () => void | Promise<void>; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void
  loading?: boolean; error?: string; fallbackFocusRef?: RefObject<HTMLElement | null>
  contentClassName?: string
}
function Confirmation({ destructive = false, trigger, title, description, targetName, confirmLabel, onConfirm, open, defaultOpen = false, onOpenChange, loading, error, fallbackFocusRef, contentClassName }: ConfirmationProps & { destructive?: boolean }) {
  const [localOpen, setLocalOpen] = useState(defaultOpen)
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState("")
  const locked = useRef(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const busy = pending || loading
  function change(value: boolean) { if (open === undefined) setLocalOpen(value); onOpenChange?.(value); if (value) setFailure("") }
  async function confirm() {
    if (locked.current || busy) return
    locked.current = true; setPending(true)
    try { await onConfirm(); change(false) } catch (cause) { setFailure(cause instanceof Error ? cause.message : "انجام نشد؛ دوباره تلاش کنید.") }
    finally { locked.current = false; setPending(false) }
  }
  const Root = destructive ? AlertDialog : Dialog
  const Trigger = destructive ? AlertDialogTrigger : DialogTrigger
  const Content = destructive ? AlertDialogContent : DialogContent
  const Title = destructive ? AlertDialogTitle : DialogTitle
  const Description = destructive ? AlertDialogDescription : DialogDescription
  const Close = destructive ? AlertDialogCancel : DialogClose
  return <Root open={open ?? localOpen} onOpenChange={(value, details) => { if (busy) { details.cancel(); return } change(value) }} {...(!destructive ? { disablePointerDismissal: false } : {})}>
    <Trigger data-test-id="confirmation-dialog-trigger-1" ref={triggerRef} render={trigger} />
    <Content dir="rtl" {...(!destructive ? { showCloseButton: false } : {})} initialFocus={cancelRef} finalFocus={() => triggerRef.current?.isConnected ? triggerRef.current : fallbackFocusRef?.current ?? true} className={`max-h-[calc(100dvh-2rem)] overflow-y-auto break-words ${contentClassName ?? ""}`}>
      <Title>{title}</Title><Description>{description}</Description>
      <p data-test-id="confirmation-dialog-p-2" className="rounded-md border bg-muted p-3 text-sm leading-body">مورد: {targetName}</p>
      {(error || failure) && <p data-test-id="confirmation-dialog-p-3" role="alert" className="text-sm text-danger">{error || failure}</p>}
      <div data-test-id="confirmation-dialog-div-4" className="flex flex-wrap justify-end gap-3">
        <Close data-test-id="confirmation-dialog-close-5" render={<Button data-test-id="confirmation-dialog-close-5" ref={cancelRef} variant="outline" disabled={!!busy} />}>انصراف</Close>
        <Button data-test-id="confirmation-dialog-button-7" variant={destructive ? "destructive" : "default"} onClick={confirm} loading={busy}>{confirmLabel}</Button>
      </div>
    </Content>
  </Root>
}
export function ConfirmationDialog(props: ConfirmationProps) { return <Confirmation {...props} /> }
export function DestructiveDialog(props: ConfirmationProps) { return <Confirmation {...props} destructive /> }
