import { GlassModal } from "@/components/ui/GlassModal";

export interface ClasorOptionSelection {
  id: string;
  label: string;
  name: string;
}

/** Local preview destination; no source account action or request is executed. */
export function ClasorOptionPreview({ selection, onClose, testId }: {
  selection: ClasorOptionSelection | null;
  onClose: () => void;
  testId: string;
}) {
  return <GlassModal testId={testId} open={!!selection} onOpenChange={open => { if (!open) onClose(); }}
    title={selection?.label ?? "گزینه‌ها"} description={selection?.name}>
    <p data-test-id={`${testId}-preview`} className="text-sm leading-body">پیش‌نمایش گزینهٔ «{selection?.label}» برای «{selection?.name}».</p>
    <p data-test-id={`${testId}-notice`} className="mt-3 text-xs text-muted-foreground">این نمونه به حساب کلاسور متصل نیست و اطلاعاتی را تغییر نمی‌دهد.</p>
  </GlassModal>;
}
