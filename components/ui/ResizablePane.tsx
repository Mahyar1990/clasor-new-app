"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { clampPane, paneBounds, resizePaneWithKey } from "@/lib/design-system/resize-pane";
export function ResizablePane({ children, label, testId, defaultWidth = 240, minWidth = 180, maxWidth = 420, minRemainingWidth = 320, direction = "rtl", className }: {
  children: ReactNode; label: string; testId: string; defaultWidth?: number; minWidth?: number; maxWidth?: number; minRemainingWidth?: number; direction?: "rtl" | "ltr"; className?: string;
}) {
  const panelId = useId();
  const hintId = useId();
  const root = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; width: number; pointer: number } | null>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [available, setAvailable] = useState(maxWidth + minRemainingWidth);
  const [dragging, setDragging] = useState(false);
  const bounds = paneBounds(minWidth, maxWidth, available, minRemainingWidth);
  const actual = clampPane(width, bounds);
  useEffect(() => {
    const container = root.current?.parentElement;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => { const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0; setAvailable(container.clientWidth - gap); });
    observer.observe(container); return () => observer.disconnect();
  }, []);
  return <div ref={root} dir={direction} data-test-id={testId} className={cn("flex h-full min-h-0 shrink-0", className)} style={{ width: actual }}>
    <div id={panelId} data-test-id={`${testId}-content`} className="min-h-0 min-w-0 flex-1">{children}</div>
    <div data-test-id={`${testId}-resize`} role="separator" tabIndex={0} title="برای تغییر عرض بکشید؛ دوبار کلیک برای بازنشانی" aria-orientation="vertical" aria-label={label} aria-controls={panelId} aria-describedby={hintId} aria-valuemin={bounds.min} aria-valuemax={bounds.max} aria-valuenow={actual} aria-valuetext={`${actual} پیکسل`} data-dragging={dragging} className={glass.resizeSeparator}
      onPointerDown={event => {
        if (event.button !== 0 || !event.isPrimary || drag.current) return;
        event.preventDefault(); event.currentTarget.focus();
        drag.current = { x: event.clientX, width: actual, pointer: event.pointerId };
        event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
      }}
      onPointerMove={event => {
        const start = drag.current;
        if (start?.pointer !== event.pointerId) return;
        setWidth(clampPane(start.width + (event.clientX - start.x) * (direction === "rtl" ? -1 : 1), bounds));
      }}
      onPointerUp={event => { if (drag.current?.pointer !== event.pointerId) return; drag.current = null; setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={event => { if (drag.current?.pointer !== event.pointerId) return; if (drag.current) setWidth(drag.current.width); drag.current = null; setDragging(false); }}
      onLostPointerCapture={() => { drag.current = null; setDragging(false); }}
      onDoubleClick={() => setWidth(clampPane(defaultWidth, bounds))}
      onKeyDown={event => {
        if (event.key === "Escape" && drag.current) { setWidth(drag.current.width); drag.current = null; setDragging(false); return; }
        const next = resizePaneWithKey(event.key, actual, direction, event.shiftKey ? 32 : 8, bounds);
        if (next !== null) { event.preventDefault(); setWidth(next); }
      }}>
      <GripVertical data-test-id={`${testId}-grip`} aria-hidden="true" className="relative size-3.5 rounded-sm bg-background/70 text-primary/70 group-hover:text-primary" />
    </div>
    <span id={hintId} data-test-id={`${testId}-hint`} className="sr-only">برای تغییر عرض بکشید یا از کلیدهای چپ و راست استفاده کنید. Home و End کمترین و بیشترین عرض را انتخاب می‌کنند. دوبار کلیک برای بازنشانی.</span>
  </div>;
}
