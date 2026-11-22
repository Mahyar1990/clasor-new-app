"use client"

import { glass } from "@/lib/design-system/classes";
import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group data-test-id="select-parts-selectprimitive-group-1"
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value data-test-id="select-parts-selectprimitive-value-2"
      data-slot="select-value"
      className={cn("flex flex-1 text-start", className)}
      {...props}
    />
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel data-test-id="select-parts-selectprimitive-grouplabel-3"
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const testId = React.useId()
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-test-id={`select-item-${testId}`}
      className={cn("relative flex w-full cursor-default items-center gap-1.5 rounded-md min-h-10 py-2 pe-8 ps-1.5 text-sm outline-hidden select-none hover:bg-white/20 data-highlighted:bg-white/20 focus:bg-white/20 focus:text-inherit forced-colors:data-highlighted:outline-2 forced-colors:data-highlighted:outline-[Highlight] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className, glass.navigation)}
      {...props}
    >
      <SelectPrimitive.ItemText data-test-id="select-parts-selectprimitive-itemtext-5" className="flex flex-1 shrink-0 gap-2 whitespace-normal break-words">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator data-test-id="select-parts-selectprimitive-itemindicator-6"
        render={
          <span data-test-id="select-parts-selectprimitive-itemindicator-6" className="pointer-events-none absolute end-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator data-test-id="select-parts-selectprimitive-separator-8"
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow data-test-id="select-parts-selectprimitive-scrolluparrow-9"
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow data-test-id="select-parts-selectprimitive-scrolldownarrow-10"
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export { SelectGroup, SelectValue, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton }
