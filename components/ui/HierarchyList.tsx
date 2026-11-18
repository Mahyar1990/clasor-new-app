"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, Folder } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
import { hierarchyPath, type HierarchyNode } from "@/lib/design-system/hierarchy";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
export type { HierarchyNode } from "@/lib/design-system/hierarchy";
export interface HierarchyListProps {
  items: HierarchyNode[]; selectedId?: string; expanded: Set<string>;
  onExpandedChange: (id: string) => void; onSelectionChange: (id: string) => void;
  revealSelected?: boolean; renderActions?: (item: HierarchyNode) => ReactNode; label: string; testId: string;
}
/** Nested native lists: every node is selectable, with separate disclosure and actions. */
export function HierarchyList(props: HierarchyListProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !props.revealSelected || !props.selectedId) return;
    const reveal = () => { const selected = element.querySelector<HTMLElement>('button[aria-current="page"]'); if (selected?.getClientRects().length) { selected.scrollIntoView({ block: "nearest", inline: "nearest" }); observer.disconnect(); } };
    const observer = new MutationObserver(reveal);
    observer.observe(element, { childList: true, subtree: true });
    reveal(); return () => observer.disconnect();
  }, [props.revealSelected, props.selectedId]);
  const path = hierarchyPath(props.items, props.selectedId);
  return <nav ref={root} data-test-id={props.testId} aria-label={props.label}>
    {props.items.length ? <HierarchyLevel {...props} depth={0} path={path} /> : <p data-test-id={`${props.testId}-empty`} className="p-4 text-center text-xs text-muted-foreground">موردی یافت نشد.</p>}
  </nav>;
}
function HierarchyLevel({ items, selectedId, expanded, onExpandedChange, onSelectionChange, renderActions, label, testId, depth, path, revealSelected }: HierarchyListProps & { depth: number; path: string[] }) {
  const [count, setCount] = useState(10);
  const list = useRef<HTMLUListElement>(null);
  const result = getLoadedItems(items, count);
  const selectedIndex = items.findIndex(item => path.includes(item.id));
  useEffect(() => {
    if (revealSelected && selectedIndex >= result.shown) list.current?.nextElementSibling?.scrollIntoView({ block: "nearest" });
  }, [revealSelected, selectedIndex, result.shown]);
  return <>
    <ul ref={list} data-test-id={`${testId}-level-${depth}-${items[0]?.id ?? "empty"}`} className={depth ? glass.outlineGroup : "space-y-1"} data-current-path={items.some(item => path.includes(item.id))}>
      {result.rows.map(item => <li data-test-id={`${testId}-item-${item.id}`} data-load-more-item key={item.id}>
        <div data-test-id={`${testId}-row-${item.id}`} data-selected={item.id === selectedId} className={glass.hierarchyRow}>
          {item.children?.length ? <Button data-test-id={`${testId}-toggle-${item.id}`} size="icon-sm" variant="plain" className="size-7! shrink-0" aria-label={`${expanded.has(item.id) ? "بستن" : "بازکردن"} زیرمجموعه‌های ${item.label}`} aria-expanded={expanded.has(item.id)} aria-controls={`${testId}-children-${item.id}`} onClick={() => onExpandedChange(item.id)}>{expanded.has(item.id) ? <ChevronDown aria-hidden="true" className="size-3!" /> : <ChevronLeft aria-hidden="true" className="size-3!" />}</Button> : <span data-test-id={`${testId}-leaf-${item.id}`} aria-hidden="true" className="w-7 shrink-0" />}
          <Button data-test-id={`${testId}-select-${item.id}`} variant="plain" disabled={item.disabled} aria-current={selectedId === item.id ? "page" : undefined} onClick={() => onSelectionChange(item.id)} className={`${glass.outlineRow} ${glass.current} min-w-0 flex-1 justify-start whitespace-normal px-1 text-start text-xs`}><Folder aria-hidden="true" className="size-3.5! shrink-0" /><span data-test-id={`${testId}-name-${item.id}`} className="min-w-0 wrap-anywhere">{item.label}</span></Button>
          {renderActions && <div data-test-id={`${testId}-actions-${item.id}`} className="shrink-0 px-1">{renderActions(item)}</div>}
        </div>
        {!!item.children?.length && expanded.has(item.id) && <div data-test-id={`${testId}-children-${item.id}`} id={`${testId}-children-${item.id}`}><HierarchyLevel items={item.children} selectedId={selectedId} expanded={expanded} onExpandedChange={onExpandedChange} onSelectionChange={onSelectionChange} renderActions={renderActions} label={label} testId={testId} depth={depth + 1} path={path} revealSelected={revealSelected} /></div>}
      </li>)}
    </ul>
    <LoadMore noun="آیتم" listRef={list} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </>;
}
