import { LibraryShell } from "@/components/design-system/library/shell";
import { AdminSummary } from "@/components/design-system/admin/summary";
import { AdminFeedbackList } from "@/components/design-system/admin/feedback";
export default function Page() {
  return <LibraryShell page="admin" title="پنل ادمین"><div data-test-id="admin-workspace" className="min-h-0 space-y-4 overflow-y-auto"><AdminSummary /><AdminFeedbackList /></div></LibraryShell>;
}
