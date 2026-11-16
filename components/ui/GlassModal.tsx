"use client";

import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { withTestId } from "@/lib/design-system/test-id";
import { glass } from "@/lib/design-system/classes";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GlassModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: Dialog.Root.Props["onOpenChange"];
  testId?: string;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  surface?: "frosted" | "liquid";
  footer?: ReactNode;
  icon?: ReactNode;
  finalFocus?: Dialog.Popup.Props["finalFocus"];
}

/** Organism: Base UI owns focus trapping, scroll lock and dismissal. */
export function GlassModal({
  title, description, children, trigger, open, defaultOpen, onOpenChange,
  testId = "glass-modal", size = "md", compact = false, surface = "frosted", footer, icon, finalFocus,
}: GlassModalProps) {
  const portalTheme = usePortalTheme();
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger render={withTestId(trigger, `${testId}-trigger`)} data-test-id={`${testId}-trigger`} />}
      <Dialog.Portal className={portalTheme} data-test-id="GlassModal-dialog-portal-2">
        <Dialog.Backdrop
          data-test-id={`${testId}-backdrop`}
          className={cn("fixed inset-0 z-[var(--z-dialog)]", surface === "liquid" ? glass.liquidBackdrop : glass.backdrop)}
        />
        <Dialog.Popup
          dir="rtl"
          finalFocus={finalFocus}
          data-test-id={testId}
          data-material-surface="floating"
          data-material-variant={surface}
          className={cn(`${glass.panel} fixed top-1/2 start-1/2 z-[calc(var(--z-dialog)+1)] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col text-start shadow-2xl outline-none rtl:translate-x-1/2`, surface === "liquid" ? glass.liquidFloating : glass.floating, size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-lg", compact && glass.dialogCompact, "fixed")}
        >
          <header data-test-id="GlassModal-header-5" className="flex shrink-0 items-start justify-between gap-4 border-b border-white/30 p-4 md:p-6">
            <div data-test-id="GlassModal-div-6" className="min-w-0">
              <Dialog.Title data-test-id="GlassModal-dialog-title-7" className="flex items-center gap-2 text-xl font-bold wrap-anywhere">{icon}{title}</Dialog.Title>
              {description && <Dialog.Description data-test-id="GlassModal-dialog-description-8" className="mt-2 text-sm leading-body">{description}</Dialog.Description>}
            </div>
            <Dialog.Close
              render={<Button data-test-id={`${testId}-close`} variant="ghost" size="icon-lg" className="shrink-0 text-inherit" />}
              aria-label="بستن پنجره"
              data-test-id={`${testId}-close`}
            >
              <X aria-hidden="true" />
            </Dialog.Close>
          </header>
          <div data-test-id={`${testId}-content`} data-dialog-body className="min-h-0 overflow-y-auto overscroll-contain p-4 md:p-6">
            {children}
          </div>
          {footer && <footer data-test-id={`${testId}-footer`} className={glass.dialogFooter}>{footer}</footer>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
