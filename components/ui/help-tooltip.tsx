"use client"
import { useId, useRef, useState, type ReactElement } from "react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
export function HelpTooltip({ content, children }: { content: string; children: ReactElement }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()
  const [open, setOpen] = useState(false)
  const existing = (children.props as { "aria-describedby"?: string })["aria-describedby"]
  return <TooltipProvider><Tooltip open={open} onOpenChange={setOpen}><TooltipTrigger ref={triggerRef} data-test-id="help-tooltip-tooltiptrigger-1" aria-describedby={[existing, open ? id : undefined].filter(Boolean).join(" ") || undefined} render={children} /><TooltipContent themeAnchorRef={triggerRef} id={id} role="tooltip" dir="rtl" className="max-w-[min(20rem,calc(100vw-2rem))] leading-body">{content}</TooltipContent></Tooltip></TooltipProvider>
}
