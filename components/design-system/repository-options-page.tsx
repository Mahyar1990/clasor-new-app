import { AppLayout } from "@/components/ui/AppLayout";
import { ClasorDashboardSidebar } from "@/components/design-system/clasor-dashboard-sidebar";
import { ClasorDashboardHeaderActions } from "@/components/design-system/clasor-dashboard-header-actions";
import { RepositoryOptionsExperience } from "@/components/design-system/repository-dialogs/experience";
export function RepositoryOptionsPage() {
  return <AppLayout density="compact" title="کلاسور · گزینه‌های مخزن" sidebar={<ClasorDashboardSidebar activePage="repository-options" />} profile={<ClasorDashboardHeaderActions />}><RepositoryOptionsExperience /></AppLayout>;
}
