import { useId, type ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
export function RecordGroup({ title, description, children, testId }: { title: string; description?: string; children: ReactNode; testId: string }) {
  const titleId = useId();
  return <section data-test-id={testId} aria-labelledby={titleId} className={`${glass.panel} overflow-hidden border-s-2 border-s-purple-400/60`}>
    <header data-test-id={`${testId}-header`} className="space-y-1 border-b border-white/30 px-3 py-2">
      <h4 data-test-id={`${testId}-title`} id={titleId} className="text-xs font-semibold wrap-anywhere">{title}</h4>
      {description && <p data-test-id={`${testId}-description`} className="text-[10px] text-muted-foreground">{description}</p>}
    </header>
    <div data-test-id={`${testId}-records`} className="space-y-1 p-1">{children}</div>
  </section>;
}
