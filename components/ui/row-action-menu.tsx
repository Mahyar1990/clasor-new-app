"use client"
import { useId, useRef, type RefObject } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { OptionsButton } from "@/components/ui/OptionsButton"
export type RowAction = { id: string; label: string; onSelect: () => void; disabledReason?: string; destructive?: boolean }
export function RowActionMenu({ rowLabel, items, open, defaultOpen, onOpenChange, fallbackFocusRef }: { rowLabel: string; items: RowAction[]; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; fallbackFocusRef?: RefObject<HTMLElement | null> }) {
  const id = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  return <div data-test-id="row-action-menu-div-1"><DropdownMenu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger data-test-id="row-action-menu-dropdownmenutrigger-2" ref={trigger} render={<OptionsButton data-test-id="row-action-menu-dropdownmenutrigger-2" aria-label={`اقدام‌های ${rowLabel}`} />} />
    <DropdownMenuContent dir="rtl" align="end" finalFocus={fallbackFocusRef ? () => trigger.current?.isConnected ? trigger.current : fallbackFocusRef.current ?? true : undefined} className="min-w-52 max-w-[calc(100vw-2rem)] border shadow-floating">
      {items.map((item, index) => <DropdownMenuItem key={item.id} disabled={!!item.disabledReason} aria-describedby={item.disabledReason ? `${id}-${index}` : undefined} variant={item.destructive ? "destructive" : "default"} onClick={item.onSelect} className="min-h-10 whitespace-normal break-words">{item.label}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu><div data-test-id="row-action-menu-div-4" className="space-y-1">{items.map((item, index) => item.disabledReason && <p data-test-id={`row-action-menu-p-5-${String(item.id)}`} key={item.id} id={`${id}-${index}`} className="max-w-72 text-xs leading-body text-muted-foreground">{item.label}: {item.disabledReason}</p>)}</div></div>
}
