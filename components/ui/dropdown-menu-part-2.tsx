"use client";

import { glass } from "@/lib/design-system/classes";
import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem data-test-id="dropdown-menu-part-2-menuprimitive-checkboxitem-1"
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pe-8 ps-1.5 text-sm outline-hidden select-none focus:bg-white/20 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 focus:text-inherit focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className, glass.navigation)}
      checked={checked}
      {...props}
    >
      <span data-test-id="dropdown-menu-part-2-span-2"
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator data-test-id="dropdown-menu-part-2-menuprimitive-checkboxitemindicator-3">
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup data-test-id="dropdown-menu-part-2-menuprimitive-radiogroup-4"
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

export function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem data-test-id="dropdown-menu-part-2-menuprimitive-radioitem-5"
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pe-8 ps-1.5 text-sm outline-hidden select-none focus:bg-white/20 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 focus:text-inherit focus:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className, glass.navigation)}
      {...props}
    >
      <span data-test-id="dropdown-menu-part-2-span-6"
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator data-test-id="dropdown-menu-part-2-menuprimitive-radioitemindicator-7">
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator data-test-id="dropdown-menu-part-2-menuprimitive-separator-8"
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span data-test-id="dropdown-menu-part-2-span-9"
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}
