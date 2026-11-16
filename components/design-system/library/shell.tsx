"use client";
import type { ReactNode, RefObject } from "react";
import { productViewport } from "../clasor-dashboard-layout";
import { AppLayout } from "@/components/ui/AppLayout";
import { ClasorDashboardSidebar } from "../clasor-dashboard-sidebar";
import { ClasorDashboardHeaderActions } from "../clasor-dashboard-header-actions";
export function LibraryShell({ page, title, titleRef, children }: { page: string; title: string; children: ReactNode; titleRef?: RefObject<HTMLHeadingElement | null> }) {
  return <section data-test-id="clasor-library-preview" className={productViewport}><AppLayout density="compact" title="کلاسور · سیستم مدیریت اسناد" contentAs="main" sidebar={<ClasorDashboardSidebar activePage={page} />} profile={<ClasorDashboardHeaderActions />}>
    <h1 ref={titleRef} tabIndex={-1} data-test-id="library-title" className="mb-4 shrink-0 text-lg font-bold">{title}</h1>
    {children}
  </AppLayout></section>;
}
