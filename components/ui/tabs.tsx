"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { glass } from "@/lib/design-system/classes";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" data-variant="default" data-orientation={orientation}
    className={cn("group/tabs flex min-w-0 gap-2 data-horizontal:flex-col", className)} {...props} />;
}

/** Retain the public export; all tab lists now share one visual contract. */
const tabsListVariants = cva(glass.tabsList);

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return <TabsPrimitive.List data-test-id="tabs-tabsprimitive-list-1" data-slot="tabs-list" data-variant="default"
    className={cn(tabsListVariants(), className)} {...props} />;
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab data-test-id="tabs-tabsprimitive-tab-2" data-slot="tabs-trigger"
    className={cn(glass.tab, className)} {...props} />;
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-test-id="tabs-tabsprimitive-panel-3" data-slot="tabs-content"
    className={cn("min-w-0 flex-1 text-sm outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
