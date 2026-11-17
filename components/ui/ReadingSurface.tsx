import type { ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
import { cn } from "@/lib/utils";
export function ReadingSurface({ title, metadata, children, footer, testId, className }: { title: string; metadata?: ReactNode; children: ReactNode; footer?: ReactNode; testId: string; className?: string }) {
  return <article data-test-id={testId} className={cn(`${glass.readingSurface} mx-auto flex w-full max-w-4xl flex-col p-5 sm:p-8 lg:p-10`, className)}>
    <header data-test-id={`${testId}-header`} className="mb-7 space-y-3">
      {metadata && <div data-test-id={`${testId}-metadata`} className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">{metadata}</div>}
      <h1 data-test-id={`${testId}-title`} className="text-xl leading-relaxed font-bold sm:text-2xl">{title}</h1>
    </header>
    <div data-test-id={`${testId}-body`} className="flex-1 space-y-5 text-sm leading-8 wrap-anywhere">{children}</div>
    {footer && <footer data-test-id={`${testId}-footer`} className="mt-10 border-t border-border/50 pt-4">{footer}</footer>}
  </article>;
}
