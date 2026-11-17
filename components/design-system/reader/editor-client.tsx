"use client";
import { useEffect, useRef, useState } from "react";
interface Payload { session: string; value: string; title: string; readOnly: boolean; zoom: number }
export function EditorClient() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function receive(event: MessageEvent) {
      const data = event.data;
      if (event.origin !== location.origin || event.source !== parent || data?.type !== "clasor-editor-init" || typeof data.session !== "string" || typeof data.value !== "string" || data.value.length > 2_000_000) return;
      setPayload({ session: data.session, value: data.value, title: String(data.title), readOnly: data.readOnly !== false, zoom: Math.max(70, Math.min(150, Number(data.zoom) || 100)) });
      parent.postMessage({ type: "clasor-editor-loaded", session: data.session }, location.origin);
    }
    window.addEventListener("message", receive);
    parent.postMessage({ type: "clasor-editor-ready" }, location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => { if (content.current && payload && content.current.innerText !== payload.value) content.current.textContent = payload.value; }, [payload]);
  return <main data-test-id="embedded-editor" dir="rtl" className="flex min-h-dvh flex-col bg-slate-100 text-slate-900" onKeyDown={event => { if (event.key === "Escape" && payload) { event.preventDefault(); event.stopPropagation(); parent.postMessage({ type: "clasor-editor-escape", session: payload.session }, location.origin); } }}>
    <header data-test-id="embedded-editor-header" className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2 text-xs"><span data-test-id="embedded-editor-title" className="truncate">{payload?.title ?? "ادیتور سند"}</span><span data-test-id="embedded-editor-mode" className="shrink-0 text-slate-500">{payload?.readOnly === false ? "ویرایش متن" : "فقط خواندن"}</span></header>
    {!payload ? <p data-test-id="embedded-editor-wait" role="status" className="p-6 text-sm">در حال بارگذاری سند…</p> : <section data-test-id="embedded-editor-paper" className="mx-auto my-4 w-[calc(100%-2rem)] max-w-4xl flex-1 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div data-test-id="embedded-editor-content" ref={content} tabIndex={0} role="textbox" aria-label="محتوای سند" aria-readonly={payload.readOnly} aria-multiline contentEditable={payload.readOnly ? false : "plaintext-only"} suppressContentEditableWarning className="min-h-[calc(100dvh-9rem)] whitespace-pre-wrap wrap-anywhere leading-loose outline-none focus-visible:ring-2 focus-visible:ring-purple-400" style={{ fontSize: `${payload.zoom / 100}rem` }} onInput={event => { if (!payload.readOnly) parent.postMessage({ type: "clasor-editor-change", session: payload.session, value: event.currentTarget.innerText }, location.origin); }} /></section>}
  </main>;
}
