"use client"

import * as React from "react"
import { glass } from "@/lib/design-system/classes";
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const testId = React.useId()
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-test-id={props.id ?? props.name ?? `input-${testId}`}
      className={cn(glass.input, "h-[var(--control-height)] w-full min-w-0 py-1 ps-3 pe-3 text-base md:text-sm", className)}
      {...props}
    />
  )
}

export { Input }
