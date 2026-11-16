"use client";
import { TextField } from "@/components/ui/text-field";
import { DialogSection } from "@/components/ui/DialogSection";
import { useRepositoryPreview } from "./context";
export function ConfirmRepository({ action, formId, confirmation, onConfirmation, done }: { action: string; formId: string; confirmation: string; onConfirmation: (value: string) => void; done: () => void }) {
  const { repo, setRepo } = useRepositoryPreview();
  const descriptions: Record<string, string> = { bookmark: repo.bookmarked ? "این مخزن از فهرست نشان‌شده‌های شما برداشته می‌شود." : "این مخزن به فهرست نشان‌شده‌های شما اضافه می‌شود.", archive: "مخزن به بایگانی منتقل می‌شود و بعداً قابل بازگردانی است.", restore: "مخزن از بایگانی به فهرست مخزن‌های فعال برمی‌گردد.", delete: "مخزن و دسترسی به محتوای آن حذف می‌شود. برای تأیید، عنوان مخزن را وارد کنید.", leave: "عضویت و دسترسی شما به این مخزن پایان می‌یابد." };
  return <form data-test-id="repo-confirm-form" id={formId} className="space-y-4" onSubmit={event => {
    event.preventDefault(); if (action === "delete" && confirmation !== repo.name) return;
    setRepo(current => ({ ...current, bookmarked: action === "bookmark" ? !current.bookmarked : current.bookmarked, archived: action === "archive" ? true : action === "restore" ? false : current.archived, deleted: action === "delete" || current.deleted, left: action === "leave" || current.left })); done();
  }}>
    <DialogSection testId="repo-confirm-target" title={repo.name} description={descriptions[action]}>
      <p data-test-id="repo-confirm-local-note" className="text-xs text-muted-foreground">این تأیید فقط روی مخزن نمایشی همین صفحه اعمال می‌شود.</p>
    </DialogSection>
    {action === "delete" && <TextField data-test-id="repo-delete-confirmation" label="عنوان مخزن برای تأیید حذف" value={confirmation} onValueChange={onConfirmation} required error={confirmation && confirmation !== repo.name ? "عنوان واردشده با نام مخزن یکسان نیست." : undefined} />}
  </form>;
}
