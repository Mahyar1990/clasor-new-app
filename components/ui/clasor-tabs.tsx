"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export type ClasorTabsProps = Omit<ComponentProps<typeof Tabs>, "children"> & {
  label: string;
  items: { value: string; label: string; content: ReactNode; disabled?: boolean }[];
  testIds?: {
    root?: string;
    list?: string;
    tab?: (value: string) => string;
    panel?: (value: string) => string;
  };
};

export function ClasorTabs({ items, label, testIds, className, ...props }: ClasorTabsProps) {
  return <Tabs {...props} data-test-id={testIds?.root ?? "clasor-tabs"} className={cn("min-w-0", className)}>
    <TabsList data-test-id={testIds?.list ?? "clasor-tabs-list"} activateOnFocus aria-label={label}>
      {items.map(item => <TabsTrigger data-test-id={testIds?.tab?.(item.value) ?? `clasor-tabs-tabstrigger-1-${item.value}`} key={item.value} value={item.value} disabled={item.disabled}>
        {item.label}
      </TabsTrigger>)}
    </TabsList>
    {items.map(item => <TabsContent data-test-id={testIds?.panel?.(item.value) ?? `clasor-tabs-panel-${item.value}`} key={item.value} value={item.value} className="min-w-0 py-4 leading-body">{item.content}</TabsContent>)}
  </Tabs>;
}
