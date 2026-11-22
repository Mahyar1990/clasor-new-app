"use client";
import { useEffect, useRef, useState } from "react";
import { scrollToEditorHeading } from "./scroll-to-heading";
import { glass } from "@/lib/design-system/classes";
interface Payload { session: string; value: string; title: string; readOnly: boolean; zoom: number; minimal: boolean }
export function EditorClient() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [dark, setDark] = useState(false);
  const activeSession = useRef("");
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function receive(event: MessageEvent) {
      const data = event.data;
      if (event.origin !== location.origin || event.source !== parent) return;
      if (data?.type === "clasor-editor-theme" && activeSession.current && data.session === activeSession.current) {
        setDark(data.dark === true);
        return;
      }
      if (data?.type === "clasor-editor-navigate" && data.session === activeSession.current && activeSession.current && content.current && Number.isSafeInteger(data.offset) && data.offset >= 0 && data.offset <= content.current.innerText.length) { scrollToEditorHeading(content.current, data.offset); return; }
      if (data?.type === "clasor-editor-print" && data.session === activeSession.current && activeSession.current) { void document.fonts.ready.then(() => window.print()); return; }
      if (data?.type !== "clasor-editor-init" || typeof data.session !== "string" || typeof data.value !== "string" || data.value.length > 2_000_000) return;
      activeSession.current = data.session;
      setDark(data.dark === true);
      setPayload({ minimal: data.minimal === true, session: data.session, value: data.value, title: String(data.title), readOnly: data.readOnly !== false, zoom: Math.max(70, Math.min(150, Number(data.zoom) || 100)) });
      parent.postMessage({ type: "clasor-editor-loaded", session: data.session }, location.origin);
    }
    window.addEventListener("message", receive);
    parent.postMessage({ type: "clasor-editor-ready" }, location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => { if (content.current && payload && content.current.innerText !== payload.value) content.current.textContent = payload.value; }, [payload]);
  return <main data-test-id="embedded-editor" dir="rtl" className={`${dark ? "dark" : ""} ${glass.editorViewport} flex min-h-dvh flex-col`} onKeyDown={event => { if (event.key === "Escape" && payload) { event.preventDefault(); event.stopPropagation(); parent.postMessage({ type: "clasor-editor-escape", session: payload.session }, location.origin); } }}>
    {!payload?.minimal && <header data-test-id="embedded-editor-header" className="print:hidden flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2 text-xs"><span data-test-id="embedded-editor-title" className="truncate">{payload?.title ?? "ادیتور سند"}</span><span data-test-id="embedded-editor-mode" className="shrink-0 text-muted-foreground">{payload?.readOnly === false ? "ویرایش متن" : "فقط خواندن"}</span></header>}
    {!payload ? <p data-test-id="embedded-editor-wait" role="status" className="p-6 text-sm">در حال بارگذاری سند…</p> : <section data-test-id="embedded-editor-paper" className={`${glass.editorPaper} ${payload.minimal ? "m-0 w-full max-w-none flex-1 px-3 pb-3 pt-10" : "mx-auto my-4 w-[calc(100%-2rem)] max-w-4xl flex-1 rounded-md border border-border p-5 shadow-sm sm:p-8"} print:m-0 print:w-full print:max-w-none print:border-0 print:shadow-none`}><div data-test-id="embedded-editor-content" ref={content} tabIndex={0} role="textbox" aria-label="محتوای سند" aria-readonly={payload.readOnly} aria-multiline contentEditable={payload.readOnly ? false : "plaintext-only"} suppressContentEditableWarning className="min-h-[calc(100dvh-9rem)] whitespace-pre-wrap wrap-anywhere leading-loose outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ fontSize: `${payload.zoom / 100}rem` }} onInput={event => { if (!payload.readOnly) parent.postMessage({ type: "clasor-editor-change", session: payload.session, value: event.currentTarget.innerText }, location.origin); }} /></section>}
  </main>;
}
