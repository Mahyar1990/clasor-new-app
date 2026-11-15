"use client";

import { ClasorDashboardHeaderActions } from "@/components/design-system/clasor-dashboard-header-actions";
import { LayoutDashboard } from "lucide-react";
import { AppLayout } from "@/components/ui/AppLayout";
import { ClasorDashboardSidebar } from "@/components/design-system/clasor-dashboard-sidebar";
import { ClasorDashboardDocuments } from "@/components/design-system/clasor-dashboard-documents";
import { ClasorDashboardRepositories } from "@/components/design-system/clasor-dashboard-repositories";
import { dashboardDocuments, dashboardRepositories } from "@/components/design-system/clasor-dashboard-data";

export function ClasorDashboardPreview() {
  return <section data-test-id="clasor-documents-preview" aria-label="نمونه داشبورد کلاسور" className="min-h-dvh w-full min-w-0 [&_[data-test-id=layout-header]]:flex-wrap max-sm:[&_[data-test-id=layout-profile]]:w-full max-sm:[&_[data-test-id=layout-profile]]:justify-end">
      <AppLayout title="کلاسور · سیستم مدیریت اسناد" contentAs="main" sidebar={<ClasorDashboardSidebar />} profile={<ClasorDashboardHeaderActions />}>
        <div data-test-id="dashboard-overview" id="dashboard-overview" className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div data-test-id="dashboard-heading" className="space-y-1">
            <p data-test-id="dashboard-eyebrow" className="text-xs text-muted-foreground">فضای کار / داشبورد</p>
            <h1 data-test-id="dashboard-title" className="flex items-center gap-2 text-2xl font-bold"><LayoutDashboard aria-hidden="true" className="size-6 text-primary" />داشبورد</h1>
            <p data-test-id="dashboard-subtitle" className="text-sm text-muted-foreground">دسترسی به سندها و مخزن‌های شما در یک نگاه</p>
          </div>
        </div>
        <div data-test-id="dashboard-content" className="grid min-w-0 items-start gap-5 xl:grid-cols-2">
          <ClasorDashboardDocuments documents={dashboardDocuments} />
          <ClasorDashboardRepositories repositories={dashboardRepositories} />
        </div>
      </AppLayout>
  </section>;
}

/** Retain the original public preview export. */
export const ClasorDocumentsPreview = ClasorDashboardPreview;
