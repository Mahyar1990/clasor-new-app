"use client"
import { useRef, type ReactElement, type ReactNode, type RefObject } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
export function DetailsSheet({ trigger, title, description, children, fallbackFocusRef, ...props }: { trigger: ReactElement; title: string; description: string; children: ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  return <Sheet {...props}><SheetTrigger data-test-id="details-sheet-sheettrigger-1" ref={triggerRef} render={trigger} /><SheetContent themeAnchorRef={triggerRef} dir="rtl" side="left" style={{ width: 400, maxWidth: "100vw", height: "100dvh" }} className="overflow-y-auto p-6" finalFocus={() => triggerRef.current?.isConnected ? triggerRef.current : fallbackFocusRef?.current ?? true}>
    <SheetTitle className="pe-8">{title}</SheetTitle><SheetDescription>{description}</SheetDescription>{children}
  </SheetContent></Sheet>
}
