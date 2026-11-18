"use client";
import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { GlassModal, type GlassModalProps } from "./GlassModal";
interface Presentation { size?: "viewport" }
interface Page { presentation?: Presentation; id: string; title: string; content: ReactNode; origin: HTMLElement | null; scroll: number }
interface Navigation { dismiss: () => void; push: (title: string, content: ReactNode, origin?: HTMLElement | null, presentation?: Presentation) => void; back: () => void }
const Context = createContext<Navigation | null>(null);
export function useDialogNavigation() {
  const navigation = useContext(Context);
  if (!navigation) throw new Error("Dialog navigation requires NavigableGlassModal");
  return navigation;
}
/** One Base UI dialog; previous pages remain mounted to retain form and tab state. */
export function NavigableGlassModal({ children, ...props }: GlassModalProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const closeControl = useRef<HTMLButtonElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const restore = useRef<{ origin: HTMLElement | null; scroll: number } | null>(null);
  const heading = useRef<HTMLDivElement>(null);
  const current = pages.at(-1);
  useLayoutEffect(() => {
    const body = host.current?.closest("[data-dialog-body]");
    if (restore.current) {
      if (body) body.scrollTop = restore.current.scroll;
      const origin = restore.current.origin;
      if (origin?.isConnected && !origin.closest("[hidden]")) origin.focus({ preventScroll: true });
      else heading.current?.focus({ preventScroll: true });
      restore.current = null;
    } else if (pages.length) {
      if (body) body.scrollTop = 0;
      heading.current?.focus({ preventScroll: true });
    }
  }, [pages]);
  function back() {
    if (!current) return;
    restore.current = current;
    setPages(value => value.slice(0, -1));
  }
  function push(title: string, content: ReactNode, origin?: HTMLElement | null, presentation?: Presentation) {
    const active = host.current?.ownerDocument.activeElement;
    setPages(value => [...value, { id: crypto.randomUUID(), title, content, presentation, origin: origin ?? (active instanceof HTMLElement ? active : null), scroll: host.current?.closest("[data-dialog-body]")?.scrollTop ?? 0 }]);
  }
  return <Context.Provider value={{ push, back, dismiss: () => closeControl.current?.click() }}>
    <GlassModal {...props} size={current?.presentation?.size ?? props.size} title={current?.title ?? props.title} onBack={current ? back : undefined} footer={current ? undefined : props.footer}>
      <div data-test-id="dialog-navigation" ref={host} className={current?.presentation?.size === "viewport" || props.size === "viewport" ? "flex h-full min-h-0 flex-1 flex-col" : undefined}>
        <Dialog.Close data-test-id="dialog-navigation-dismiss" ref={closeControl} className="hidden" aria-hidden tabIndex={-1} />
        <div data-test-id="dialog-navigation-heading" ref={heading} tabIndex={-1} className="sr-only">{current?.title ?? props.title}</div>
        <div data-test-id="dialog-navigation-root" hidden={!!current} className={!current && props.size === "viewport" ? "flex min-h-0 flex-1 flex-col" : undefined}>{children}</div>
        {pages.map((page, i) => <div data-test-id={`dialog-navigation-page-${i}`} key={page.id} hidden={i !== pages.length - 1} className={page.presentation?.size === "viewport" && i === pages.length - 1 ? "flex min-h-0 flex-1 flex-col" : undefined}>{page.content}</div>)}
      </div>
    </GlassModal>
  </Context.Provider>;
}
