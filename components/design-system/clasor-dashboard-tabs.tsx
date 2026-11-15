"use client";

import { ClasorTabs, type ClasorTabsProps } from "@/components/ui/clasor-tabs";

/** Dashboard composition uses the shared variant and retains its public selectors. */
export function DashboardTabs({ label, defaultValue, items }: Pick<ClasorTabsProps, "label" | "items"> & { defaultValue: string }) {
  return <ClasorTabs label={label} defaultValue={defaultValue} variant="segmented" items={items} testIds={{
    root: `dashboard-tabs-${defaultValue}`,
    list: `dashboard-tablist-${defaultValue}`,
    tab: value => `dashboard-tab-${defaultValue}-${value}`,
    panel: value => `dashboard-tabpanel-${defaultValue}-${value}`,
  }} />;
}
