"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { GlassBackdrop } from "@/components/ui/GlassBackdrop";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { PublishHeaderActions } from "./header-actions";
import { glass } from "@/lib/design-system/classes";
export function PublishShell({ children, tools, reading = false, embedded = false }: { children: ReactNode; tools?: ReactNode; reading?: boolean; embedded?: boolean }) {
  return <div data-test-id="publish-shell" dir="rtl" className={`relative isolate flex min-h-dvh min-w-0 flex-col gap-3 bg-[image:var(--material-canvas)] p-3 text-foreground ${reading ? "h-dvh overflow-hidden" : ""}`}>
    <GlassBackdrop />
    {!embedded && <a data-test-id="publish-skip" href="#publish-main" className="sr-only focus:not-sr-only focus:rounded-lg focus:bg-card focus:p-2">رفتن به محتوای اصلی</a>}
    <header data-test-id="publish-header" className={`${glass.panel} flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 px-3 py-2`}>
      <Link data-test-id="publish-home-link" href="/clasor-pages/publish" className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-ring"><GlassEmblem data-test-id="publish-brand-icon" className="size-8"><BookOpen aria-hidden="true" className="size-4" /></GlassEmblem><span data-test-id="publish-brand" className="text-sm font-bold">داکس</span><span data-test-id="publish-brand-caption" className="hidden text-[10px] text-muted-foreground sm:inline">سیستم مدیریت اسناد</span></Link>
      <div data-test-id="publish-header-tools" className="flex flex-wrap items-center gap-2">{tools}<PublishHeaderActions /><Link data-test-id="publish-catalogue-link" href="/" className={`${glass.navigation} flex min-h-8 items-center gap-1 px-2 text-[10px]`}>سیستم طراحی<ArrowUpRight aria-hidden="true" className="size-3" /></Link></div>
    </header>
    {children}
  </div>;
}
