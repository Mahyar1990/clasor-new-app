import type { ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
export function GlassTile({ title, description, icon, metadata, media, actions, onOpen, testId }: { title: string; description?: string; icon: ReactNode; metadata: ReactNode; media?: ReactNode; actions: ReactNode; onOpen: (trigger: HTMLButtonElement) => void; testId: string }) {
  return <article data-test-id={testId} className={`${glass.repositoryTile} ${glass.repositoryTileLayout}`}>
    <button data-test-id={`${testId}-open`} type="button" className="flex h-full w-full min-w-0 items-center gap-3 rounded-lg p-3 text-start hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring" onClick={event => onOpen(event.currentTarget)}>
      {media ? <span data-test-id={`${testId}-media`} className="block size-16 shrink-0 sm:size-20">{media}</span> : <span data-test-id={`${testId}-icon`} aria-hidden="true" className="grid size-16 shrink-0 place-items-center text-primary [&_svg]:size-7">{icon}</span>}
      <span data-test-id={`${testId}-copy`} className="min-w-0 flex-1 space-y-1.5"><span data-test-id={`${testId}-title`} className="line-clamp-2 w-full text-xs font-semibold wrap-anywhere">{title}</span>{description?.trim() && <span data-test-id={`${testId}-description`} className={glass.repositoryDescription} title={description}>{description}</span>}<span data-test-id={`${testId}-metadata`} className="flex w-full flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">{metadata}</span></span>
    </button>
    <div data-test-id={`${testId}-actions`} className="flex shrink-0 items-end justify-center p-2">{actions}</div>
  </article>;
}
