"use client";

import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function DashboardTabs({ label, defaultValue, items }: {
  label: string;
  defaultValue: string;
  items: { value: string; label: string; content: ReactNode }[];
}) {
  return <Tabs data-test-id={`dashboard-tabs-${defaultValue}`} defaultValue={defaultValue} className="min-w-0">
    <TabsList data-test-id={`dashboard-tablist-${defaultValue}`} aria-label={label} activateOnFocus variant="line" className="w-full max-w-full justify-start overflow-x-auto group-data-horizontal/tabs:h-auto">
      {items.map(item => <TabsTrigger data-test-id={`dashboard-tab-${defaultValue}-${item.value}`} key={item.value} value={item.value} className="min-h-11 flex-none px-3 text-xs data-active:text-primary after:bg-primary">{item.label}</TabsTrigger>)}
    </TabsList>
    {items.map(item => <TabsContent data-test-id={`dashboard-tabpanel-${defaultValue}-${item.value}`} key={item.value} value={item.value} className="min-w-0 pt-4">{item.content}</TabsContent>)}
  </Tabs>;
}
