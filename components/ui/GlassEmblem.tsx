"use client";
import type { ComponentProps } from "react";
import { useGlassSurface } from "./glass-surface-context";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";

export interface GlassEmblemProps extends ComponentProps<"span"> {
  shape?: "tile" | "avatar";
}

/** Decorative identity surface; accessible naming belongs to its consumer. */
export function GlassEmblem({ shape = "tile", className, ...props }: GlassEmblemProps) {
  const nested = useGlassSurface();
  return <span data-test-id="glass-emblem" {...props} className={cn(
    nested ? glass.insetEmblem : glass.emblem,
    shape === "avatar" ? "rounded-full" : "rounded-xl",
    className,
  )} />;
}
