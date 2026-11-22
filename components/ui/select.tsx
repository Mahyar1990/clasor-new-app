"use client"

import { glass } from "@/lib/design-system/classes";
import * as React from "react"
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"

import { SelectGroup, SelectValue, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from "@/components/ui/select-parts"

const Select = SelectPrimitive.Root

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default" | "lg"
}) {
  const testId = React.useId()
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-test-id={props.id ?? `select-trigger-${testId}`}
      data-size={size}
      className={cn("flex w-full min-w-0 items-center justify-between gap-1.5 rounded-md border border-white/40 bg-white/30 shadow-lg backdrop-blur-md py-2 pe-2 ps-2.5 text-sm whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md hover:shadow-purple-500/20 outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-[var(--control-height)] data-[size=sm]:h-[var(--clasor-size-control-small)] data-[size=lg]:h-[var(--clasor-size-control-large)]  *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className, glass.select)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-test-id="select-selectprimitive-icon-2"
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  const portalTheme = usePortalTheme();
  return (
    <SelectPrimitive.Portal className={portalTheme} data-test-id="select-selectprimitive-portal-3">
      <SelectPrimitive.Positioner data-test-id="select-selectprimitive-positioner-4"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-[calc(var(--z-dialog)+2)]"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-material-surface="floating"
          data-material-variant="clear"
          data-test-id="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-[var(--z-menu)] max-h-(--available-height) w-(--anchor-width) min-w-36 max-w-[calc(100vw-2rem)] overflow-x-hidden overflow-y-auto rounded-lg border border-white/40 bg-white/30 text-popover-foreground shadow-lg backdrop-blur-md ring-1 ring-foreground/10", glass.menuMotion, className, glass.floating)}
          {...props}
        >
          <SelectScrollUpButton data-test-id="select-selectscrollupbutton-6" />
          <SelectPrimitive.List data-test-id="select-selectprimitive-list-7">{children}</SelectPrimitive.List>
          <SelectScrollDownButton data-test-id="select-selectscrolldownbutton-8" />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
