"use client";
import { useEffect, useId, useRef, useState } from "react";
export function EditorFrame({ value, title, readOnly = true, onValueChange, onEscape, zoom = 100, testId = "editor-frame" }: { value: string; title: string; readOnly?: boolean; onValueChange?: (value: string) => void; onEscape?: () => void; zoom?: number; testId?: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const session = useId();
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "clasor-editor-init", session, value, title, readOnly, zoom }, window.location.origin);
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "clasor-editor-ready") { setReady(true); send(); }
      if (event.data?.session !== session) return;
      if (event.data.type === "clasor-editor-loaded") setReady(true);
      if (event.data.type === "clasor-editor-change" && !readOnly && typeof event.data.value === "string" && event.data.value.length <= 2_000_000) onValueChange?.(event.data.value);
      if (event.data.type === "clasor-editor-escape") onEscape?.();
    }
    window.addEventListener("message", receive); send();
    return () => window.removeEventListener("message", receive);
  }, [value, title, readOnly, zoom, session, onValueChange, onEscape]);
  return <div data-test-id={testId} className="relative flex h-full min-h-64 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/40 bg-white/30">
    {!ready && <p data-test-id={`${testId}-loading`} role="status" className="absolute inset-x-0 top-4 text-center text-xs text-muted-foreground">در حال آماده‌سازی ادیتور…</p>}
    <iframe data-test-id={`${testId}-iframe`} ref={frame} src="/document-editor" title={`ادیتور ${title}`} referrerPolicy="no-referrer" className="h-full min-h-64 w-full flex-1 border-0" />
  </div>;
}
