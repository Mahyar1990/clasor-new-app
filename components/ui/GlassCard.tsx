"use client";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { GlassSurfaceContext, useGlassSurface } from "./glass-surface-context";
import { glass } from "@/lib/design-system/classes";

export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "main" | "div";
  "data-test-id"?: string;
  surface?: "auto" | "glass" | "content";
}

/** Semantic glass surface; content supplies its own heading. */
export function GlassCard({ as: Surface = "section", className, children, surface = "auto", ...props }: GlassCardProps) {
  const nested = useGlassSurface();
  return <Surface data-test-id="glass-card" {...props} className={cn(surface === "glass" || surface === "auto" && !nested ? glass.panel : glass.contentSurface, "min-w-0", className)}><GlassSurfaceContext.Provider value>{children}</GlassSurfaceContext.Provider></Surface>;
}
