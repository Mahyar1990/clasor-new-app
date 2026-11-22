import { GlassCard } from "@/components/ui/GlassCard";
import type { ReactNode } from "react"
export function Sample({ id, title, description, children }: { id?: string; title: string; description: string; children: ReactNode }) {
  return <GlassCard id={id} data-test-id="sample-section-1" data-slot="ds-sample" className="min-w-0"><header data-test-id="sample-header-2" className="border-b px-5 py-4"><h3 data-test-id="sample-h3-3" className="text-sm font-medium">{title}</h3><p data-test-id="sample-p-4" className="mt-1 text-xs leading-body text-muted-foreground">{description}</p></header><div data-test-id="sample-div-5" className="space-y-5 p-5 sm:p-6">{children}</div></GlassCard>
}
export function SectionTitle({ id, title, number }: { id: string; title: string; number: string }) {
  return <div data-test-id="sample-div-6" id={id} className="mb-5 flex scroll-mt-6 items-center justify-between gap-3 border-t pt-8"><h2 data-test-id="sample-h2-7" className="text-xl font-bold">{title}</h2><bdi data-test-id="sample-bdi-8" className="text-xs text-muted-foreground">COMPONENTS / {number}</bdi></div>
}
