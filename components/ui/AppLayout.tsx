import { glass } from "@/lib/design-system/classes";
import type { ReactNode } from "react";
import { GlassHeader, type GlassHeaderProps } from "@/components/ui/GlassHeader";
import { GlassSidebar, type GlassNavigationItem } from "@/components/ui/GlassSidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassBackdrop } from "./GlassBackdrop";

export interface AppLayoutProps extends GlassHeaderProps {
  children: ReactNode;
  navigation?: readonly GlassNavigationItem[];
  sidebar?: ReactNode;
  contentAs?: "main" | "section";
  density?: "comfortable" | "compact";
}

/** Template: glass chrome and content wrappers over a fixed mesh backdrop. */
export function AppLayout({ children, title, logo, profile, navigation, sidebar, contentAs: Content = "main", density = "comfortable" }: AppLayoutProps) {
  return (
    <div
      dir="rtl"
      data-density={density}
      data-test-id="layout-root"
      className={`relative isolate min-h-dvh bg-[image:var(--material-canvas)] p-4 text-foreground md:p-6 ${Content === "section" ? "[contain:paint]" : ""} ${density === "compact" ? glass.compactLayout : ""}`}
    >
      <GlassBackdrop />
      <a
        href="#layout-main"
        data-test-id="layout-skip-link"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3"
      >
        رفتن به محتوای اصلی
      </a>
      <GlassHeader title={title} logo={logo} profile={profile} />
      <div data-test-id="AppLayout-div-7" className="mt-4 grid min-w-0 items-start gap-4 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-6">
        {sidebar ?? <GlassSidebar items={navigation} />}
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
