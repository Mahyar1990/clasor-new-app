"use client";

import type { ComponentProps } from "react";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";

export interface GlassScrollAreaProps extends ComponentProps<"div"> {
  label: string;
  contentClassName?: string;
  "data-test-id"?: string;
}

/** Base UI keeps native scrolling and owns scrollbar sizing and dragging. */
export function GlassScrollArea({ label, className, contentClassName, children, "data-test-id": testId = "glass-scroll-area", ...props }: GlassScrollAreaProps) {
  return <ScrollArea.Root data-test-id={`${testId}-root`} className={cn("relative min-h-0 min-w-0 flex-1 overflow-hidden", className)}>
    <ScrollArea.Viewport data-test-id={testId} role="region" aria-label={label} tabIndex={0}
      {...props} className={glass.scrollArea}>
      <ScrollArea.Content data-test-id={`${testId}-content`} className={cn("min-w-0 p-1 pe-4", contentClassName)}>{children}</ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar data-test-id={`${testId}-scrollbar`} orientation="vertical" className={glass.scrollTrack}>
      <ScrollArea.Thumb data-test-id={`${testId}-thumb`} className={glass.scrollThumb} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>;
}
