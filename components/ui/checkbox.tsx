"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { glass } from "@/lib/design-system/classes";
import { cn } from "cn"
import { CheckIcon, MinusIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-test-id="checkbox-control"
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-md border outline-none after:absolute after:-inset-3 disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        glass.choice,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-test-id="checkbox-checkboxprimitive-indicator-1"
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon className="[[data-indeterminate]_&]:hidden" aria-hidden="true" />
        <MinusIcon className="hidden [[data-indeterminate]_&]:block" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
