"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, FileText, Folder } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import { outlineSelectionPath } from "@/lib/design-system/outline-path";
export type OutlineItem = { id: string; label: string } & ({ children: OutlineItem[]; href?: never } | { href: string; children?: never });
export interface OutlineNavigationProps {
  items: OutlineItem[];
  selectedId?: string;
  expanded: Set<string>;
  onExpandedChange: (id: string) => void;
  onSelect?: (id: string) => void;
  label: string;
  testId: string;
  density?: "comfortable" | "compact";
  revealSelected?: boolean;
}
/** Native disclosure navigation; each growing level appends ten records independently. */
export function OutlineNavigation(props: OutlineNavigationProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || !props.revealSelected || !props.selectedId) return;
    const reveal = () => { const link = node.querySelector<HTMLElement>('a[aria-current="page"]'); if (link?.getClientRects().length) { link.scrollIntoView({ block: "nearest", inline: "nearest" }); observer.disconnect(); } };
    const observer = new MutationObserver(reveal);
    observer.observe(node, { childList: true, subtree: true });
    reveal(); return () => observer.disconnect();
  }, [props.revealSelected, props.selectedId]);
  return <nav ref={root} data-test-id={props.testId} aria-label={props.label}>
    {props.items.length ? <OutlineLevel {...props} depth={0} activePath={outlineSelectionPath(props.items, props.selectedId)} /> : <p data-test-id={`${props.testId}-empty`} className="p-3 text-xs text-muted-foreground">موردی برای نمایش وجود ندارد.</p>}
  </nav>;
}
function OutlineLevel({ items, selectedId, expanded, onExpandedChange, onSelect, label, testId, depth, activePath, density = "comfortable", revealSelected }: OutlineNavigationProps & { depth: number; activePath: string[] }) {
  const [count, setCount] = useState(10);
  const listRef = useRef<HTMLUListElement>(null);
  const result = getLoadedItems(items, count);
  const selectedIndex = items.findIndex(item => activePath.includes(item.id));
  useEffect(() => {
    if (revealSelected && selectedIndex >= result.shown) listRef.current?.nextElementSibling?.scrollIntoView({ block: "nearest" });
  }, [revealSelected, selectedIndex, result.shown]);
  return <>
    <ul ref={listRef} data-test-id={`${testId}-level-${depth}-${items[0]?.id ?? "empty"}`} data-current-path={items.some(item => activePath.includes(item.id))} className={depth ? glass.outlineGroup : "space-y-0.5"}>
      {result.rows.map(item => <li data-load-more-item data-test-id={`${testId}-item-${item.id}`} key={item.id}>
        {item.children ? <>
          <Button data-test-id={`${testId}-folder-${item.id}`} data-density={density} data-current-path={activePath.includes(item.id)} type="button" variant="plain" aria-expanded={expanded.has(item.id)} aria-controls={`${testId}-children-${item.id}`} className={`${glass.outlineRow} justify-start`} onClick={() => onExpandedChange(item.id)}>
            {expanded.has(item.id) ? <ChevronDown aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}<Folder aria-hidden="true" />
            <span data-test-id={`${testId}-label-${item.id}`} className="min-w-0 text-start wrap-anywhere">{item.label}</span>
          </Button>
          <div data-test-id={`${testId}-children-${item.id}`} id={`${testId}-children-${item.id}`} hidden={!expanded.has(item.id)}>
            {expanded.has(item.id) && <OutlineLevel items={item.children} selectedId={selectedId} expanded={expanded} onExpandedChange={onExpandedChange} onSelect={onSelect} label={label} testId={testId} depth={depth + 1} activePath={activePath} density={density} revealSelected={revealSelected} />}
          </div>
        </> : <a data-test-id={`${testId}-link-${item.id}`} data-density={density} href={item.href} aria-current={selectedId === item.id ? "page" : undefined} className={`${glass.outlineRow} ${glass.current}`} onClick={onSelect ? event => {
          if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(item.id); }
        } : undefined}>
          <FileText aria-hidden="true" className="size-3.5 shrink-0" />{item.label}
        </a>}
      </li>)}
    </ul>
    <LoadMore noun="سند" listRef={listRef} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </>;
}
