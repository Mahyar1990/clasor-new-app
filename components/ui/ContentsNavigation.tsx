"use client";
import { glass } from "@/lib/design-system/classes";
import { ChevronDown, Circle } from "lucide-react";
import { contentsTree, type ContentHeadingNode } from "@/lib/design-system/contents-tree";
export interface ContentsItem { id: string; label: string; level: number }
export function ContentsNavigation({ items, selectedId, onSelect, testId }: { items: ContentsItem[]; selectedId?: string; onSelect: (id: string) => void; testId: string }) {
  function level(nodes: ContentHeadingNode[], parentId?: string) {
    return <ol data-test-id={parentId ? `${testId}-children-${parentId}` : `${testId}-list`} className={parentId ? glass.contentsBranch : "space-y-0.5"}>
      {nodes.map(item => <li data-test-id={`${testId}-item-${item.id}`} key={item.id} data-level={item.level} className={parentId ? glass.contentsNode : "min-w-0"}>
        <a data-test-id={`${testId}-link-${item.id}`} href={`#${item.id}`} aria-current={item.id === selectedId ? "location" : undefined} className={`${glass.navigation} ${glass.current} flex items-start gap-1.5 px-1.5 py-1.5 text-[10px] leading-5 wrap-anywhere`} onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item.id); } }}>
          {item.children.length ? <ChevronDown aria-hidden="true" className="mt-1 size-3 shrink-0 text-primary" /> : <Circle aria-hidden="true" className="mt-2 size-1.5! shrink-0 fill-current text-primary/60" />}
          <span data-test-id={`${testId}-label-${item.id}`} className="min-w-0">{item.label}</span>
        </a>
        {item.children.length > 0 && level(item.children, item.id)}
      </li>)}
    </ol>;
  }
  return <nav data-test-id={testId} aria-label="فهرست سند">
    {items.length ? level(contentsTree(items)) : <p data-test-id={`${testId}-empty`} className="p-2 text-[11px] text-muted-foreground">سرفصلی برای نمایش وجود ندارد.</p>}
  </nav>;
}
