"use client";

import { ClasorTabs, type ClasorTabsProps } from "@/components/ui/clasor-tabs";

/** Dashboard composition uses the shared variant and retains its public selectors. */
export function DashboardTabs({ label, defaultValue, items }: Pick<ClasorTabsProps, "label" | "items"> & { defaultValue: string }) {
  return <ClasorTabs label={label} defaultValue={defaultValue} variant="segmented" items={items} className="min-h-0 flex-1 [&_[role=tablist]]:shrink-0 [&_[role=tabpanel]]:flex [&_[role=tabpanel]]:min-h-0 [&_[role=tabpanel]]:flex-col [&_[role=tabpanel]]:overflow-hidden [&_[role=tabpanel]]:pb-0" testIds={{
    root: `dashboard-tabs-${defaultValue}`,
    list: `dashboard-tablist-${defaultValue}`,
    tab: value => `dashboard-tab-${defaultValue}-${value}`,
    panel: value => `dashboard-tabpanel-${defaultValue}-${value}`,
  }} />;
}
