"use client";
import { RotateCcw, X } from "lucide-react";
import { Button } from "./button";
import { ProgressIndicator } from "./progress-indicator";
import { glass } from "@/lib/design-system/classes";
export function UploadProgress({ name, value, cancelled, onRetry, onCancel }: { name: string; value: number; cancelled?: boolean; onRetry: () => void; onCancel: () => void }) {
  return <div data-test-id="upload-progress" className={`${glass.panel} flex items-center gap-2 p-2`}>
    <div data-test-id="upload-progress-meter" className="min-w-0 flex-1"><ProgressIndicator label={name} value={value} />{cancelled && <p data-test-id="upload-progress-cancelled" role="status" className="text-xs">بارگذاری لغو شد</p>}</div>
    <Button data-test-id="upload-retry" variant="glass" size="icon" aria-label="تلاش مجدد" disabled={value === 100} onClick={onRetry}><RotateCcw aria-hidden="true" /></Button>
    <Button data-test-id="upload-cancel" variant="glass" size="icon" aria-label="لغو بارگذاری" disabled={cancelled || value === 100} onClick={onCancel}><X aria-hidden="true" /></Button>
  </div>;
}
