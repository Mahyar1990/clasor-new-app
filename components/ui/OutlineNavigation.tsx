"use client";
import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, FileText, Folder } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
export type OutlineItem = { id: string; label: string } & ({ children: OutlineItem[]; href?: never } | { href: string; children?: never });
export interface OutlineNavigationProps {
  items: OutlineItem[];
  selectedId?: string;
  expanded: Set<string>;
  onExpandedChange: (id: string) => void;
  onSelect?: (id: string) => void;
  label: string;
  testId: string;
}
/** Native disclosure navigation; each growing level appends ten records independently. */
export function OutlineNavigation(props: OutlineNavigationProps) {
  return <nav data-test-id={props.testId} aria-label={props.label}>
    {props.items.length ? <OutlineLevel {...props} depth={0} /> : <p data-test-id={`${props.testId}-empty`} className="p-3 text-xs text-muted-foreground">موردی برای نمایش وجود ندارد.</p>}
  </nav>;
}
function OutlineLevel({ items, selectedId, expanded, onExpandedChange, onSelect, label, testId, depth }: OutlineNavigationProps & { depth: number }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLUListElement>(null);
  const result = getLoadedItems(items, count);
  return <>
    <ul ref={listRef} data-test-id={`${testId}-level-${depth}-${items[0]?.id ?? "empty"}`} className={depth ? "ms-3 border-s border-white/40 ps-2 dark:border-white/15" : "space-y-0.5"}>
      {result.rows.map(item => <li data-load-more-item data-test-id={`${testId}-item-${item.id}`} key={item.id}>
        {item.children ? <>
          <Button data-test-id={`${testId}-folder-${item.id}`} type="button" variant="plain" aria-expanded={expanded.has(item.id)} aria-controls={`${testId}-children-${item.id}`} className={`${glass.navigation} h-auto min-h-8 w-full justify-start gap-1.5 px-2 py-1 text-xs whitespace-normal`} onClick={() => onExpandedChange(item.id)}>
            {expanded.has(item.id) ? <ChevronDown aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}<Folder aria-hidden="true" />
            <span data-test-id={`${testId}-label-${item.id}`} className="min-w-0 text-start wrap-anywhere">{item.label}</span>
          </Button>
          <div data-test-id={`${testId}-children-${item.id}`} id={`${testId}-children-${item.id}`} hidden={!expanded.has(item.id)}>
            {expanded.has(item.id) && <OutlineLevel items={item.children} selectedId={selectedId} expanded={expanded} onExpandedChange={onExpandedChange} onSelect={onSelect} label={label} testId={testId} depth={depth + 1} />}
          </div>
        </> : <a data-test-id={`${testId}-link-${item.id}`} href={item.href} aria-current={selectedId === item.id ? "page" : undefined} className={`${glass.navigation} ${selectedId === item.id ? glass.current : ""} flex min-h-8 items-center gap-2 px-2 py-1 text-xs wrap-anywhere`} onClick={onSelect ? event => {
          if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item.id); }
        } : undefined}>
          <FileText aria-hidden="true" className="size-3.5 shrink-0" />{item.label}
        </a>}
      </li>)}
    </ul>
    <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </>;
}
