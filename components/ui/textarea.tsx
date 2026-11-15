"use client"

import * as React from "react"
import { glass } from "@/lib/design-system/classes";
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const testId = React.useId()
  return (
    <textarea
      data-slot="textarea"
      data-test-id={props.id ?? props.name ?? `textarea-${testId}`}
      className={cn(glass.input, "min-h-24 w-full py-2 ps-3 pe-3 text-base md:text-sm placeholder:text-muted-foreground disabled:opacity-50", className, glass.input)}
      {...props}
    />
  )
}

export { Textarea }
