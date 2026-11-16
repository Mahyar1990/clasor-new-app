import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { glass } from "@/lib/design-system/classes";
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex min-h-6 w-fit  items-center justify-center gap-1  rounded-sm border border-transparent px-2 py-0.5 text-xs font-medium whitespace-normal transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: glass.primary,
        secondary:
          glass.statusNeutral,
        destructive:
          glass.statusDanger,
        outline:
          glass.statusNeutral,
        ghost:
          glass.control,
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { ...{ "data-test-id": "badge" },
        className: cn(glass.statusSurface, badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
