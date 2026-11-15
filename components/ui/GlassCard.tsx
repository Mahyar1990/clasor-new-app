import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";

export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "main" | "div";
  "data-test-id"?: string;
}

/** Semantic glass surface; content supplies its own heading. */
export function GlassCard({ as: Surface = "section", className, children, ...props }: GlassCardProps) {
  return <Surface data-test-id="glass-card" {...props} className={cn(glass.panel, "min-w-0", className)}>{children}</Surface>;
}
