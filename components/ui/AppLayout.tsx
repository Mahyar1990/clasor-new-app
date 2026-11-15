import type { ReactNode } from "react";
import { GlassHeader, type GlassHeaderProps } from "@/components/ui/GlassHeader";
import { GlassSidebar, type GlassNavigationItem } from "@/components/ui/GlassSidebar";
import { GlassCard } from "@/components/ui/GlassCard";

export interface AppLayoutProps extends GlassHeaderProps {
  children: ReactNode;
  navigation?: readonly GlassNavigationItem[];
  contentAs?: "main" | "section";
}

/** Template: glass chrome and content wrappers over a fixed mesh backdrop. */
export function AppLayout({ children, title, logo, profile, navigation, contentAs: Content = "main" }: AppLayoutProps) {
  return (
    <div
      dir="rtl"
      data-test-id="layout-root"
      className={`relative isolate min-h-dvh bg-[image:var(--material-canvas)] p-4 text-foreground md:p-6 ${Content === "section" ? "[contain:paint]" : ""}`}
    >
      <div aria-hidden="true" data-test-id="layout-mesh" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[image:var(--material-canvas)]">
        <div data-test-id="AppLayout-div-3" className="absolute -top-24 -start-24 size-[32rem] rounded-full bg-[var(--clasor-color-brand-400)]/60 blur-3xl" />
        <div data-test-id="AppLayout-div-4" className="absolute top-16 -end-32 size-[36rem] rounded-full bg-[var(--clasor-color-semantic-info-text)]/35 blur-3xl" />
        <div data-test-id="AppLayout-div-5" className="absolute -bottom-32 start-1/4 size-[30rem] rounded-full bg-[var(--clasor-color-brand-300)]/60 blur-3xl" />
      </div>
      <a
        href="#layout-main"
        data-test-id="layout-skip-link"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3"
      >
        رفتن به محتوای اصلی
      </a>
      <GlassHeader title={title} logo={logo} profile={profile} />
      <div data-test-id="AppLayout-div-7" className="mt-4 grid min-w-0 items-start gap-4 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-6">
        <GlassSidebar items={navigation} />
        <GlassCard as={Content}
          id="layout-main"
          tabIndex={-1}
          data-test-id="layout-main"
          aria-label={Content === "section" ? "ناحیه محتوای نمونه چیدمان" : undefined}
          className="min-h-[calc(100dvh-10rem)] p-4 md:p-6"
        >
          {children}
        </GlassCard>
      </div>
    </div>
  );
}
