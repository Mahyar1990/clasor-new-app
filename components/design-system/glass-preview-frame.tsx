"use client";

import { useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { glass } from "@/lib/design-system/classes";

export function GlassPreviewFrame({ title, testId, children }: { title: string; testId: string; children: ReactNode }) {
  const [dark, setDark] = useState(false);
  return <section data-test-id={testId} className={`${glass.panel} overflow-hidden`}>
    <header data-test-id={`${testId}-header`} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/35 p-4">
      <h3 data-test-id={`${testId}-title`} className="text-sm font-semibold">{title}</h3>
      <Button data-test-id={`${testId}-theme`} variant="outline" size="sm" aria-pressed={dark} onClick={() => setDark(!dark)}>
        {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />} {dark ? "نمای روشن" : "نمای تاریک"}
      </Button>
    </header>
    <div data-test-id={`${testId}-stage`} className={`${dark ? "dark scheme-dark bg-slate-950/80 text-slate-100" : "scheme-light bg-linear-to-br from-purple-200/40 to-sky-200/40"} min-w-0 space-y-5 p-4 sm:p-5`}>
      {children}
    </div>
  </section>;
}
