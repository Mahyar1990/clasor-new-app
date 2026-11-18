import { DocumentOptionsExperience } from "./document-dialogs/experience";
export function DocumentDialogsCatalogue() {
  return <section data-test-id="document-dialogs-catalogue" className="space-y-3" aria-labelledby="document-dialogs-catalogue-title">
    <h3 data-test-id="document-dialogs-catalogue-title" id="document-dialogs-catalogue-title" className="text-lg font-bold">ترکیب دیالوگ‌های سند</h3>
    <p data-test-id="document-dialogs-catalogue-description" className="text-sm text-muted-foreground">همان دیالوگ‌های متصل به عملیات داشبورد؛ فرم ویرایش، انتخاب تگ، دسترسی، نسخه‌ها، فعالیت و تأیید عملیات با دادهٔ مستقل نمونه.</p>
    <details data-test-id="document-dialogs-catalogue-details" className="rounded-xl border border-white/40 bg-white/15 p-4"><summary data-test-id="document-dialogs-catalogue-toggle" className="cursor-pointer text-sm font-medium">نمایش نمونه‌های تعاملی دیالوگ‌های سند</summary><div data-test-id="document-dialogs-catalogue-content" className="mt-4"><DocumentOptionsExperience /></div></details>
  </section>;
}
