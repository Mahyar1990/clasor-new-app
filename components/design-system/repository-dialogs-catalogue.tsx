import { RepositoryOptionsExperience } from "@/components/design-system/repository-dialogs/experience";
import { DialogPatternsCatalogue } from "./dialog-patterns-catalogue";
export function RepositoryDialogsCatalogue() {
  return <section data-test-id="repository-dialogs-catalogue" aria-labelledby="repository-dialogs-catalogue-title" className="space-y-3">
    <h3 data-test-id="repository-dialogs-catalogue-title" id="repository-dialogs-catalogue-title" className="text-lg font-bold">ترکیب دیالوگ‌های مخزن</h3>
    <p data-test-id="repository-dialogs-catalogue-description" className="text-sm text-muted-foreground">نمونه‌های مشترک فرم بخش‌بندی‌شده، فوتر ثابت، فیلد کپی/مقدار حساس، تب‌ها، فهرست تجمعی و تأیید نام برای حذف؛ همین ترکیب‌ها در صفحهٔ نمونه مخزن استفاده می‌شوند.</p>
    <DialogPatternsCatalogue />
    <details data-test-id="repository-dialogs-catalogue-details" className="rounded-xl border border-white/40 bg-white/15 p-4"><summary data-test-id="repository-dialogs-catalogue-toggle" className="cursor-pointer text-sm font-medium">نمایش نمونه‌های تعاملی دیالوگ‌ها</summary><div data-test-id="repository-dialogs-catalogue-content" className="mt-4"><RepositoryOptionsExperience /></div></details>
  </section>;
}
