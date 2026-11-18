"use client"

import type { RefObject } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { glass } from "@/lib/design-system/classes";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { cn } from "cn"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-test-id="tooltip-tooltipprimitive-trigger-1" data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  themeAnchorRef,
  ...props
}: TooltipPrimitive.Popup.Props & { themeAnchorRef?: RefObject<HTMLElement | null> } &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const theme = usePortalTheme(themeAnchorRef);
  return (
    <TooltipPrimitive.Portal className={theme} data-test-id="tooltip-tooltipprimitive-portal-2">
      <TooltipPrimitive.Positioner data-test-id="tooltip-tooltipprimitive-positioner-3"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-[var(--z-toast)]"
      >
        <TooltipPrimitive.Popup data-test-id="tooltip-tooltipprimitive-popup-4"
          data-slot="tooltip-content"
          className={cn(
            "z-[var(--z-toast)] inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg px-3 py-2 text-xs has-data-[slot=kbd]:pe-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-[var(--z-toast)] **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            glass.floating,
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow data-test-id="tooltip-tooltipprimitive-arrow-5" className="z-[var(--z-toast)] size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] border border-white/50 bg-[var(--glass-fallback)] glass-enabled:bg-white/30 dark:glass-enabled:bg-slate-900/30 opaque:bg-[var(--glass-fallback)]! forced-colors:bg-[Canvas]! data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-start-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-end-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! ltr:data-[side=left]:-end-1 rtl:data-[side=left]:-start-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! ltr:data-[side=right]:-start-1 rtl:data-[side=right]:-end-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
