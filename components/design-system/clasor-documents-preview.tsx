"use client";

import { ClasorDashboardHeaderActions } from "@/components/design-system/clasor-dashboard-header-actions";
import { ClasorThemePreference } from "./clasor-appearance";
import { dashboardViewport } from "@/components/design-system/clasor-dashboard-layout";
import { LayoutDashboard } from "lucide-react";
import { AppLayout } from "@/components/ui/AppLayout";
import { ClasorDashboardSidebar } from "@/components/design-system/clasor-dashboard-sidebar";
import { ClasorDashboardDocuments } from "@/components/design-system/clasor-dashboard-documents";
import { ClasorDashboardRepositories } from "@/components/design-system/clasor-dashboard-repositories";

export function DashboardCollections() {
  return <div data-test-id="dashboard-content" className="grid min-h-0 min-w-0 gap-3 xl:flex-1 xl:grid-cols-2 xl:grid-rows-1">
    <ClasorDashboardDocuments />
    <ClasorDashboardRepositories />
  </div>;
}

export function ClasorDashboardPreview() {
  return <section data-test-id="clasor-documents-preview" aria-label="نمونه داشبورد کلاسور" className={dashboardViewport}>
      <AppLayout density="compact" title="کلاسور · سیستم مدیریت اسناد" contentAs="main" sidebar={<ClasorDashboardSidebar />} profile={<ClasorDashboardHeaderActions appearance={<ClasorThemePreference testId="dashboard-theme" />} />}>
        <div data-test-id="dashboard-overview" id="dashboard-overview" className="mb-3 flex shrink-0 flex-wrap items-start justify-between gap-4">
          <div data-test-id="dashboard-heading" className="space-y-1">
            <p data-test-id="dashboard-eyebrow" className="text-xs text-muted-foreground">فضای کار / داشبورد</p>
            <h1 data-test-id="dashboard-title" className="flex items-center gap-2 text-2xl font-bold"><LayoutDashboard aria-hidden="true" className="size-6 text-primary" />داشبورد</h1>
            <p data-test-id="dashboard-subtitle" className="text-sm text-muted-foreground">دسترسی به سندها و مخزن‌های شما در یک نگاه</p>
          </div>
        </div>
        <DashboardCollections />
      </AppLayout>
  </section>;
}

/** Retain the original public preview export. */
export const ClasorDocumentsPreview = ClasorDashboardPreview;
