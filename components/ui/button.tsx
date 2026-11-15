"use client"

import { useId } from "react"
import { glass } from "@/lib/design-system/classes";
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"
import { cn } from "cn"

const buttonVariants = cva(
  `${glass.interaction} inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border ps-4 pe-4 text-sm font-medium leading-label whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: glass.primary,
        glass: glass.iconButton,
        outline: glass.secondary,
        secondary: glass.secondary,
        ghost: `${glass.control} text-primary`,
        destructive: "border-transparent bg-destructive text-destructive-foreground enabled:hover:brightness-90 enabled:active:brightness-75 opaque:bg-destructive! opaque:backdrop-blur-none!",
        "destructive-outline": "border-destructive bg-card text-destructive enabled:hover:bg-danger-surface enabled:active:bg-danger-border",
        link: "border-transparent text-primary underline-offset-4 enabled:hover:underline",
      },
      size: {
        default: "h-[var(--control-height)]",
        sm: "h-[var(--clasor-size-control-small)] px-3 text-xs",
        lg: "h-[var(--clasor-size-control-large)] px-5 text-base",
        icon: "size-[var(--control-height)] p-0",
        "icon-sm": "size-[var(--clasor-size-control-small)] p-0",
        "icon-lg": "size-[var(--clasor-size-control-large)] p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & {
  loading?: boolean
  loadingLabel?: string
  disabledReason?: string
  "data-test-id"?: string
}

function Button({ className, variant, size, loading = false, loadingLabel = "در حال انجام…", disabledReason, disabled, children, ...props }: ButtonProps) {
  const reasonId = useId()
  const showReason = disabled && disabledReason
  return <>
    <ButtonPrimitive {...props} data-test-id={props["data-test-id"] ?? `button-${reasonId}`} data-slot="button" data-variant={variant ?? "default"} data-size={size ?? "default"} disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
      aria-describedby={[props["aria-describedby"], showReason ? reasonId : undefined].filter(Boolean).join(" ") || undefined}
      className={cn(buttonVariants({ variant, size }), className)}>
      {loading && <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
      {children}
    </ButtonPrimitive>
    <span data-test-id="button-span-1" className="sr-only" role="status">{loading ? loadingLabel : ""}</span>
    {showReason && <p data-test-id="button-p-2" id={reasonId} className="mt-2 text-xs leading-body text-muted-foreground">{disabledReason}</p>}
  </>
}

export { Button, buttonVariants }
export type { ButtonProps }
