export function paneBounds(min: number, max: number, available: number, remaining: number) {
  const upper = Math.max(0, Math.min(max, available - remaining));
  return { min: Math.min(Math.max(0, min), upper), max: upper };
}
export function clampPane(value: number, bounds: { min: number; max: number }) { return Math.round(Math.max(bounds.min, Math.min(bounds.max, value))); }
export function resizePaneWithKey(key: string, width: number, direction: "rtl" | "ltr", step: number, bounds: { min: number; max: number }) {
  if (key === "Home") return bounds.min;
  if (key === "End") return bounds.max;
  if (key !== "ArrowLeft" && key !== "ArrowRight") return null;
  const physicalDelta = key === "ArrowRight" ? step : -step;
  return clampPane(width + physicalDelta * (direction === "rtl" ? -1 : 1), bounds);
}
