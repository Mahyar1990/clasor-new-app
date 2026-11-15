"use client";

import { glass } from "@/lib/design-system/classes";
import * as React from "react";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { ChevronRightIcon } from "lucide-react";

export function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

export function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-test-id="dropdown-menu-part-1-menuprimitive-portal-1" data-slot="dropdown-menu-portal" {...props} />
}

export function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-test-id="dropdown-menu-part-1-menuprimitive-trigger-2" data-slot="dropdown-menu-trigger" {...props} />
}

export function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  surface = "frosted",
  ...props
}: MenuPrimitive.Popup.Props & { surface?: "frosted" | "liquid" } &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const portalTheme = usePortalTheme();
  return (
    <MenuPrimitive.Portal className={portalTheme} data-test-id="dropdown-menu-part-1-menuprimitive-portal-3">
      <MenuPrimitive.Positioner data-test-id="dropdown-menu-part-1-menuprimitive-positioner-4"
        className="isolate z-[var(--z-menu)] outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup data-test-id="dropdown-menu-part-1-menuprimitive-popup-5"
          data-slot="dropdown-menu-content"
          data-material-surface="floating"
          data-material-variant={surface}
          className={cn("z-[var(--z-menu)] max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className, surface === "liquid" ? glass.liquidFloating : glass.floating)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

export function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-test-id="dropdown-menu-part-1-menuprimitive-group-6" data-slot="dropdown-menu-group" {...props} />
}

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel data-test-id="dropdown-menu-part-1-menuprimitive-grouplabel-7"
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:ps-7",
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item data-test-id="dropdown-menu-part-1-menuprimitive-item-8"
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-white/20 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 focus:text-inherit not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className, glass.navigation)}
      {...props}
    />
  )
}

export function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-test-id="dropdown-menu-part-1-menuprimitive-submenuroot-9" data-slot="dropdown-menu-sub" {...props} />
}

export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger data-test-id="dropdown-menu-part-1-menuprimitive-submenutrigger-10"
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn("flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-white/20 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 focus:text-inherit not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-popup-open:bg-white/30 data-popup-open:text-accent-foreground data-open:bg-white/30 data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className, glass.navigation)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="rtl:rotate-180 ms-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

export function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}
