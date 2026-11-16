"use client";

import { useRef, useState } from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";

export function CopyField({ label, value, secret = false, testId }: { label: string; value: string; secret?: boolean; testId: string }) {
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState("");
  const input = useRef<HTMLInputElement>(null);
  async function copy() {
    try { await navigator.clipboard.writeText(value); setStatus("کپی شد"); }
    catch { input.current?.focus(); input.current?.select(); setStatus("متن انتخاب شد؛ با میان‌بر صفحه‌کلید کپی کنید."); }
  }
  return <div data-test-id={testId} className="space-y-1">
    <div data-test-id={`${testId}-row`} className="flex items-end gap-2">
      <div data-test-id={`${testId}-field`} className="min-w-0 flex-1"><TextField ref={input} data-test-id={`${testId}-input`} label={label} value={value} readOnly dir="ltr" type={secret && !revealed ? "password" : "text"} className="font-mono text-xs" /></div>
      {secret && <Button data-test-id={`${testId}-reveal`} variant="glass" size="icon" aria-label={revealed ? "پنهان کردن مقدار" : "نمایش مقدار"} aria-pressed={revealed} onClick={() => setRevealed(!revealed)}>{revealed ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</Button>}
      <Button data-test-id={`${testId}-copy`} variant="glass" size="icon" aria-label={`کپی ${label}`} onClick={copy}>{status === "کپی شد" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button>
    </div>
    <p data-test-id={`${testId}-status`} role="status" className="min-h-4 text-[11px] text-muted-foreground">{status}</p>
  </div>;
}
