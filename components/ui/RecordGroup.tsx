import { useId, type ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
export function RecordGroup({ title, description, children, testId }: { title: string; description?: string; children: ReactNode; testId: string }) {
  const titleId = useId();
  return <section data-test-id={testId} aria-labelledby={titleId} className={`${glass.insetCard} overflow-hidden`}>
    <header data-test-id={`${testId}-header`} className="space-y-0.5 border-b border-white/30 px-2 py-1">
      <h4 data-test-id={`${testId}-title`} id={titleId} className="text-[11px] font-semibold wrap-anywhere">{title}</h4>
      {description && <p data-test-id={`${testId}-description`} className="text-[10px] text-muted-foreground">{description}</p>}
    </header>
    <div data-test-id={`${testId}-records`} className="divide-y divide-white/25">{children}</div>
  </section>;
}
