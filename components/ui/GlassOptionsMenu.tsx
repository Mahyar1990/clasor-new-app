"use client";

import type { ReactElement, ReactNode, Ref } from "react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { withTestId } from "@/lib/design-system/test-id";
import { glass } from "@/lib/design-system/classes";
import { GlassEmblem } from "@/components/ui/GlassEmblem";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";

export interface GlassOption {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  description?: string;
  destructive?: boolean;
  separatorBefore?: boolean;
  children?: GlassOption[];
}

export interface GlassOptionsMenuProps {
  title: string;
  description: string;
  icon?: ReactNode;
  trigger: ReactElement;
  items: GlassOption[];
  onAction: (id: string, label: string) => void;
  testId: string;
  triggerRef?: Ref<HTMLButtonElement>;
}

function OptionItems({ items, onAction, testId }: Pick<GlassOptionsMenuProps, "items" | "onAction" | "testId">) {
  return items.map(item => <Fragment key={item.id}>
    {item.separatorBefore && <DropdownMenuSeparator data-test-id={`${testId}-separator-${item.id}`} />}
    {item.children ? <DropdownMenuSub>
      <DropdownMenuSubTrigger data-test-id={`${testId}-item-${item.id}`} disabled={item.disabled} className={glass.optionItem}>
        <OptionLabel item={item} testId={testId} />
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent data-test-id={`${testId}-submenu-${item.id}`} dir="rtl" aria-label={item.label} surface="liquid" className={cn(glass.optionsPopup, glass.optionsSubPopup)} sideOffset={6}>
        <OptionItems items={item.children} onAction={onAction} testId={testId} />
      </DropdownMenuSubContent>
    </DropdownMenuSub> : <DropdownMenuItem data-test-id={`${testId}-item-${item.id}`} disabled={item.disabled} aria-description={item.description}
      variant={item.destructive ? "destructive" : "default"} className={glass.optionItem} onClick={() => onAction(item.id, item.label)}>
      <OptionLabel item={item} testId={testId} />
    </DropdownMenuItem>}
  </Fragment>);
}

function OptionLabel({ item, testId }: { item: GlassOption; testId: string }) {
  return <>
    {item.icon && <GlassEmblem data-test-id={`${testId}-icon-${item.id}`} aria-hidden="true" className="size-5 text-inherit [&_svg]:size-3">{item.icon}</GlassEmblem>}
    <span data-test-id={`${testId}-label-${item.id}`} className={glass.optionLabel}>
      <span data-test-id={`${testId}-text-${item.id}`} className="block">{item.label}</span>
      {item.description && <span data-test-id={`${testId}-description-${item.id}`} className="mt-0.5 block text-[10px] text-muted-foreground">{item.description}</span>}
    </span>
  </>;
}

/** Base UI owns keyboard navigation, submenus, collision handling and dismissal. */
export function GlassOptionsMenu({ title, description, icon, trigger, items, onAction, testId, triggerRef }: GlassOptionsMenuProps) {
  return <DropdownMenu>
    <DropdownMenuTrigger ref={triggerRef} data-test-id={testId} render={withTestId(trigger, testId)} />
    <DropdownMenuContent data-test-id={`${testId}-popup`} dir="rtl" aria-label={`${description} ${title}`} surface="liquid" className={glass.optionsPopup} align="end" sideOffset={8}>
      <div data-test-id={`${testId}-heading`} className={glass.optionsHeader}>
        {icon && <GlassEmblem data-test-id={`${testId}-heading-icon`} className="size-6 [&_svg]:size-3.5" aria-hidden="true">{icon}</GlassEmblem>}
        <div data-test-id={`${testId}-heading-copy`} className="min-w-0">
          <p data-test-id={`${testId}-kind`} className="text-[10px] leading-3.5 text-muted-foreground">{description}</p>
          <p data-test-id={`${testId}-title`} className="truncate text-[11px] leading-4 font-semibold" title={title}>{title}</p>
        </div>
      </div>
      <OptionItems items={items} onAction={onAction} testId={testId} />
    </DropdownMenuContent>
  </DropdownMenu>;
}
