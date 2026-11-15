"use client";

import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { withTestId } from "@/lib/design-system/test-id";
import { glass } from "@/lib/design-system/classes";
import { Menu } from "@base-ui/react/menu";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GlassDropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect: () => void;
}

export interface GlassDropdownProps {
  items: readonly GlassDropdownItem[];
  trigger?: ReactElement;
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: Menu.Root.Props["onOpenChange"];
  testId?: string;
}

/** Molecule: portalled action menu with native Base UI keyboard navigation. */
export function GlassDropdown({
  items, trigger, label = "منوی حساب کاربری", open, defaultOpen, onOpenChange,
  testId = "glass-dropdown",
}: GlassDropdownProps) {
  const portalTheme = usePortalTheme();
  return (
    <Menu.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Menu.Trigger
        render={withTestId(trigger ?? <Button data-test-id={`${testId}-trigger`} variant="ghost" size="icon-lg"><UserRound aria-hidden="true" /></Button>, `${testId}-trigger`)}
        aria-label={label}
        data-test-id={`${testId}-trigger`}
      />
      <Menu.Portal className={portalTheme} data-test-id="GlassDropdown-menu-portal-3">
        <Menu.Positioner data-test-id="GlassDropdown-menu-positioner-4" side="bottom" align="end" sideOffset={8} collisionPadding={12} className="z-[calc(var(--z-dialog)+2)] outline-none">
          <Menu.Popup
            dir="rtl"
            aria-label={label}
            data-test-id={testId}
            data-material-surface="floating"
            data-material-variant="clear"
            className={cn(`${glass.panel} max-h-[var(--available-height)] min-w-52 max-w-[calc(100vw-1.5rem)] overflow-y-auto p-2 text-start shadow-2xl outline-none`, glass.floating)}
          >
            {items.map(item => (
              <Menu.Item
                data-slot="glass-dropdown-item"
                key={item.id}
                label={item.label}
                disabled={item.disabled}
                onClick={item.onSelect}
                data-test-id={`${testId}-item-${item.id}`}
                className={cn(`${glass.navigation} flex min-h-11 cursor-pointer items-center gap-3 py-2 ps-3 pe-3 text-sm outline-none data-highlighted:bg-white/20 data-disabled:pointer-events-none data-disabled:opacity-50`, glass.navigation)}
              >
                {item.icon && <span data-test-id={`GlassDropdown-span-7-${String(item.id)}`} aria-hidden="true" className="shrink-0 [&>svg]:size-5">{item.icon}</span>}
                <span data-test-id={`GlassDropdown-span-8-${String(item.id)}`} className="wrap-anywhere">{item.label}</span>
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
