import { glass } from "@/lib/design-system/classes";
import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="skeleton-div-1"
      data-slot="skeleton"
      className={cn("rounded-md", glass.skeleton, className)}
      {...props}
    />
  )
}

export { Skeleton }
