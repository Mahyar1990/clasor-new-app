"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { glass } from "@/lib/design-system/classes";
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-lg border px-0.5 outline-none transition-colors after:absolute after:-inset-x-3 after:-inset-y-2.5 data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        glass.switchTrack,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb data-test-id="switch-switchprimitive-thumb-1"
        data-slot="switch-thumb"
        className={cn(glass.switchThumb, "pointer-events-none block rounded-lg ring-0 transition-transform group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0")}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
