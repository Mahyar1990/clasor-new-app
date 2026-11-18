import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { glass } from "@/lib/design-system/classes";
import { Layers, UserRound } from "lucide-react";

export interface GlassHeaderProps {
  title?: string;
  logo?: ReactNode;
  profile?: ReactNode;
}

/** Organism: floating application identity and profile slot. */
export function GlassHeader({
  title = "کلاسور",
  logo = <Layers aria-hidden="true" className="size-6" />,
  profile,
}: GlassHeaderProps) {
  return (
    <header
      data-test-id="layout-header"
      data-material-surface="chrome"
      data-material-variant="clear"
      className={cn(`${glass.panel} sticky top-4 z-30 flex min-h-16 items-center justify-between gap-4 py-3 ps-4 pe-4 md:ps-6 md:pe-6`, glass.panel)}
    >
      <div data-test-id="GlassHeader-div-2" className="flex min-w-0 items-center gap-3">
        <GlassEmblem data-test-id="GlassHeader-span-3" className="size-10">
          {logo}
        </GlassEmblem>
        <span data-test-id="GlassHeader-span-4" className="truncate text-xl font-bold">{title}</span>
      </div>
      <div data-test-id="layout-profile" className="flex shrink-0 items-center gap-2">
        {profile ?? (
          <GlassEmblem shape="avatar" data-test-id="GlassHeader-span-6"
            role="img"
            aria-label="پروفایل کاربر"
          >
            <UserRound aria-hidden="true" className="size-5" />
          </GlassEmblem>
        )}
      </div>
    </header>
  );
}
