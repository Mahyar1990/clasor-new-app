"use client";
import { useRef, useState, type ComponentProps } from "react";
import { ListTree } from "lucide-react";
import { Button } from "./button";
import { ContentsNavigation } from "./ContentsNavigation";
import { DockedPanel } from "./DockedPanel";
import { EditorFrame } from "./EditorFrame";
import { editorHeadings } from "@/lib/design-system/editor-headings";
/** Shared docked outline for editable and read-only plain-text editor frames. */
export function EditorWithContents({ testId = "editor-frame", ...props }: Omit<ComponentProps<typeof EditorFrame>, "navigation" | "topRightControl">) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [navigation, setNavigation] = useState<{ offset: number; request: number }>();
  const root = useRef<HTMLDivElement>(null);
  const items = editorHeadings(props.value);
  function close() {
    setOpen(false);
    requestAnimationFrame(() => root.current?.querySelector<HTMLButtonElement>(`[data-test-id="${testId}-contents-open"]`)?.focus({ preventScroll: true }));
  }
  return <div data-test-id={`${testId}-workspace`} ref={root} className="flex min-h-0 min-w-0 flex-1 flex-col gap-1.5">

    <div data-test-id={`${testId}-contents-layout`} className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 md:flex-row" dir="rtl">
      <DockedPanel testId={`${testId}-contents-panel`} title="فهرست سند" closeLabel="بستن فهرست سند" open={open} onClose={close} className="max-md:h-32 max-md:w-full max-md:max-w-none md:w-44 md:max-w-[30%]">
        <ContentsNavigation testId={`${testId}-contents`} items={items} selectedId={items.some(item => item.id === selected) ? selected : undefined} onSelect={id => {
          const item = items.find(heading => heading.id === id);
          if (item) { setSelected(id); setNavigation(current => ({ offset: item.offset, request: (current?.request ?? 0) + 1 })); }
        }} />
      </DockedPanel>
      <EditorFrame {...props} testId={testId} navigation={navigation} topRightControl={!open && <Button data-test-id={`${testId}-contents-open`} variant="outline" size="icon-sm" className="size-7" aria-label="نمایش فهرست سند" title="نمایش فهرست سند" aria-expanded={false} aria-controls={`${testId}-contents-panel`} onClick={() => { setOpen(true); requestAnimationFrame(() => root.current?.querySelector<HTMLButtonElement>(`[data-test-id="${testId}-contents-panel-close"]`)?.focus({ preventScroll: true })); }}><ListTree aria-hidden="true" className="size-3.5!" /></Button>} />
    </div>
  </div>;
}
