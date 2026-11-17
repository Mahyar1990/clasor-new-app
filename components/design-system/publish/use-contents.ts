"use client";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { ContentsItem } from "@/components/ui/ContentsNavigation";
export function usePublishedContents(items: ContentsItem[], viewport: RefObject<HTMLDivElement | null>, revision: string) {
  const [active, setActive] = useState("publish-content-title");
  const pending = useRef<number | null>(null);
  const ids = items.map(item => item.id).join("|");
  const syncActive = useCallback(() => {
    const root = viewport.current;
    if (!root) return;
    const wanted = new Set(ids.split("|"));
    const headings = Array.from(root.querySelectorAll<HTMLElement>("[id]")).filter(item => wanted.has(item.id));
    const atEnd = root.scrollTop > 0 && root.scrollTop + root.clientHeight >= root.scrollHeight - 2;
    const top = root.getBoundingClientRect().top + 24;
    const current = atEnd ? headings.at(-1) : headings.filter(item => item.getBoundingClientRect().top <= top).at(-1) ?? headings[0];
    if (current) setActive(current.id);
  }, [ids, viewport]);
  useEffect(() => {
    const frame = requestAnimationFrame(syncActive);
    return () => { cancelAnimationFrame(frame); if (pending.current !== null) cancelAnimationFrame(pending.current); };
  }, [syncActive, revision]);
  function onScroll() {
    if (pending.current !== null) cancelAnimationFrame(pending.current);
    pending.current = requestAnimationFrame(() => { pending.current = null; syncActive(); });
  }
  function select(id: string) {
    const root = viewport.current;
    const target = root && Array.from(root.querySelectorAll<HTMLElement>("[id]")).find(item => item.id === id);
    if (!root || !target) return;
    setActive(id);
    root.scrollTo({ top: root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - 16, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    target.focus({ preventScroll: true });
  }
  return { active, select, onScroll };
}
