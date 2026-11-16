import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
export function FormActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-test-id="form-actions" {...props} className={cn(glass.formActions, className)} />;
}
