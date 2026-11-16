"use client";
import { useGlassSurface } from "./glass-surface-context";
import { RotateCcw, X } from "lucide-react";
import { Button } from "./button";
import { ProgressIndicator } from "./progress-indicator";
import { glass } from "@/lib/design-system/classes";
export function UploadProgress({ name, value, cancelled, onRetry, onCancel }: { name: string; value: number; cancelled?: boolean; onRetry: () => void; onCancel: () => void }) {
  const nested = useGlassSurface();
  return <div data-test-id="upload-progress" className={`${nested ? glass.contentSurface : glass.panel} flex flex-wrap items-center gap-2 p-2`}>
    <div data-test-id="upload-progress-meter" className="min-w-24 flex-1"><ProgressIndicator label={name} value={value} />{cancelled && <p data-test-id="upload-progress-cancelled" role="status" className="text-xs">بارگذاری لغو شد</p>}</div>
    {value === 100 && !cancelled && <span data-test-id="upload-success" role="status" className="shrink-0 text-xs font-medium text-success">آپلود موفق</span>}
    <Button data-test-id="upload-retry" variant="glass" size="icon" aria-label="تلاش مجدد" disabled={value === 100} onClick={onRetry}><RotateCcw aria-hidden="true" /></Button>
    <Button data-test-id="upload-cancel" variant="glass" size="icon" aria-label="لغو بارگذاری" disabled={cancelled || value === 100} onClick={onCancel}><X aria-hidden="true" /></Button>
  </div>;
}
