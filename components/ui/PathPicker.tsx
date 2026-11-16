"use client";
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";
import { ChevronLeft, FolderOpen } from "lucide-react";
import { Button } from "./button";
import { glass } from "@/lib/design-system/classes";
export interface PathNode { id: string; name: string; children?: PathNode[] }
export function PathPicker({ nodes, value, onValueChange }: { nodes: PathNode[]; value: string[]; onValueChange: (path: string[]) => void }) {
  let level = nodes;
  const path: PathNode[] = [];
  for (const id of value) { const node = level.find(item => item.id === id); if (!node) break; path.push(node); level = node.children ?? []; }
  return <div data-test-id="path-picker" className="space-y-2">
    <Breadcrumb data-test-id="path-picker-breadcrumb" aria-label="مسیر مقصد">
      <BreadcrumbList data-test-id="path-picker-breadcrumb-list" className="gap-1">
        <BreadcrumbItem data-test-id="path-picker-root-item"><Button data-test-id="path-picker-root" type="button" variant="ghost" size="sm" aria-current={!path.length ? "location" : undefined} onClick={() => onValueChange([])}>ریشهٔ مخزن</Button></BreadcrumbItem>
        {path.map((node, i) => <Fragment key={node.id}>
          <BreadcrumbSeparator data-test-id={`path-picker-separator-${node.id}`} />
          <BreadcrumbItem data-test-id={`path-picker-item-${node.id}`}><Button data-test-id={`path-picker-ancestor-${node.id}`} type="button" variant="ghost" size="sm" className="h-auto whitespace-normal wrap-anywhere" aria-current={i === path.length - 1 ? "location" : undefined} onClick={() => onValueChange(value.slice(0, i + 1))}>{node.name}</Button></BreadcrumbItem>
        </Fragment>)}
      </BreadcrumbList>
    </Breadcrumb>
    <p data-test-id="path-picker-selected" role="status" className="text-xs text-muted-foreground">مقصد انتخاب‌شده: {path.at(-1)?.name ?? "ریشهٔ مخزن"}</p>
    <div data-test-id="path-picker-children" className={`${glass.contentSurface} space-y-1 p-1`}>
      {path.length > 0 && <Button data-test-id="path-picker-up" type="button" variant="ghost" size="sm" onClick={() => onValueChange(value.slice(0, -1))}>بازگشت به سطح قبل</Button>}
      {level.map(node => <Button data-test-id={`path-picker-node-${node.id}`} key={node.id} type="button" variant="ghost" className="w-full justify-start text-xs" onClick={() => onValueChange([...value, node.id])}><FolderOpen aria-hidden="true" />{node.name}<ChevronLeft aria-hidden="true" className="ms-auto" /></Button>)}
      {!level.length && <p data-test-id="path-picker-empty" className="p-3 text-xs text-muted-foreground">این دسته زیردسته‌ای ندارد.</p>}
    </div>
  </div>;
}
