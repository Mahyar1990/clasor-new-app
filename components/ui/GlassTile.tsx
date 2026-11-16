import type { ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
export function GlassTile({ title, icon, metadata, actions, onOpen, testId }: { title: string; icon: ReactNode; metadata: ReactNode; actions: ReactNode; onOpen: (trigger: HTMLButtonElement) => void; testId: string }) {
  return <article data-test-id={testId} className={`${glass.contentSurface} relative aspect-square min-w-0 overflow-hidden`}>
    <button data-test-id={`${testId}-open`} className="flex h-full w-full min-w-0 flex-col items-start justify-end gap-1 rounded-lg p-2 text-start hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring" onClick={event => onOpen(event.currentTarget)}>
      <span data-test-id={`${testId}-icon`} aria-hidden="true" className="mb-auto text-primary [&_svg]:size-6">{icon}</span>
      <span data-test-id={`${testId}-title`} className="line-clamp-2 w-full text-xs font-semibold wrap-anywhere">{title}</span>
      <span data-test-id={`${testId}-metadata`} className="flex w-full flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">{metadata}</span>
    </button>
    <div data-test-id={`${testId}-actions`} className="absolute end-2 top-2">{actions}</div>
  </article>;
}
