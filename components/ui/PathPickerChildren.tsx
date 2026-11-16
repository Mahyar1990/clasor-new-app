"use client";
import { useRef, useState } from "react";
import { ChevronLeft, FolderOpen } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
import LoadMore from "@/components/workspace/load-more";
import { getLoadedItems } from "@/lib/workspace/documents";
import type { PathNode } from "./PathPicker";
export function PathPickerChildren({ nodes, value, onValueChange }: { nodes: PathNode[]; value: string[]; onValueChange: (path: string[]) => void }) {
  const [count, setCount] = useState(10);
  const list = useRef<HTMLDivElement>(null);
  const result = getLoadedItems(nodes, count);
  return <div data-test-id="path-picker-children" className={`${glass.contentSurface} space-y-1 p-1`}>
    {value.length > 0 && <Button data-test-id="path-picker-up" type="button" variant="ghost" size="sm" onClick={() => onValueChange(value.slice(0, -1))}>بازگشت به سطح قبل</Button>}
    <div data-test-id="path-picker-folder-list" ref={list}>
      {result.rows.map(node => <div data-load-more-item data-test-id={`path-picker-folder-${node.id}`} key={node.id}><Button data-test-id={`path-picker-node-${node.id}`} type="button" variant="plain" className="w-full justify-start text-xs" onClick={() => onValueChange([...value, node.id])}><FolderOpen aria-hidden="true" />{node.name}<ChevronLeft aria-hidden="true" className="ms-auto" /></Button></div>)}
    </div>
    {!nodes.length && <p data-test-id="path-picker-empty" className="p-3 text-xs text-muted-foreground">این دسته زیردسته‌ای ندارد.</p>}
    <LoadMore noun="دسته‌بندی" listRef={list} result={result} onLoadMore={() => setCount(result.nextCount)} />
  </div>;
}
