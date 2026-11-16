"use client";
import type { ReactNode } from "react";
import { productViewport } from "../clasor-dashboard-layout";
import { AppLayout } from "@/components/ui/AppLayout";
import { ClasorDashboardSidebar } from "../clasor-dashboard-sidebar";
import { ClasorDashboardHeaderActions } from "../clasor-dashboard-header-actions";
export function LibraryShell({ page, title, children }: { page: string; title: string; children: ReactNode }) {
  return <section data-test-id="clasor-library-preview" className={productViewport}><AppLayout density="compact" title="کلاسور · سیستم مدیریت اسناد" contentAs="main" sidebar={<ClasorDashboardSidebar activePage={page} />} profile={<ClasorDashboardHeaderActions />}>
    <h1 data-test-id="library-title" className="mb-4 text-lg font-bold">{title}</h1>
    {children}
  </AppLayout></section>;
}
