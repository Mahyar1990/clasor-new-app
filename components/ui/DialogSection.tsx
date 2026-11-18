import type { ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";

export function DialogSection({ title, description, children, testId }: { title: string; description?: string; children: ReactNode; testId: string }) {
  return <section data-test-id={testId} className={glass.dialogSection} aria-label={title}>
    <h3 data-test-id={`${testId}-title`} className="wrap-anywhere text-xs font-semibold">{title}</h3>
    {description && <p data-test-id={`${testId}-description`} className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{description}</p>}
    <div data-test-id={`${testId}-content`} className="mt-3 space-y-3">{children}</div>
  </section>;
}
