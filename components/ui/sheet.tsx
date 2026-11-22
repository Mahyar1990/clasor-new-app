"use client"

import { glass } from "@/lib/design-system/classes";
import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { GlassSurfaceContext } from "./glass-surface-context";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-test-id="sheet-sheetprimitive-trigger-1" data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-test-id="sheet-sheetprimitive-close-2" data-slot="sheet-close" {...props} />
}

function SheetPortal({ className, themeAnchorRef, ...props }: SheetPrimitive.Portal.Props & { themeAnchorRef?: React.RefObject<HTMLElement | null> }) {
  const theme = usePortalTheme(themeAnchorRef);
  return <SheetPrimitive.Portal className={cn(theme, className)} data-test-id="sheet-sheetprimitive-portal-3" data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop data-test-id="sheet-sheetprimitive-backdrop-4"
      data-slot="sheet-overlay"
      className={cn("fixed inset-0 z-[var(--z-dialog)] bg-[var(--overlay-backdrop)] supports-backdrop-filter:backdrop-blur-xs", glass.dialogMotion, className, glass.backdrop)}
      {...props}
    />
  )
}

function SheetContent({
  className,
  themeAnchorRef,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  themeAnchorRef?: React.RefObject<HTMLElement | null>
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal themeAnchorRef={themeAnchorRef}>
      <SheetOverlay />
      <SheetPrimitive.Popup data-test-id="sheet-sheetprimitive-popup-5"
        data-slot="sheet-content"
        data-side={side}
        className={cn("fixed z-[var(--z-dialog)] flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 ltr:data-[side=left]:start-0 rtl:data-[side=left]:end-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-e data-[side=right]:inset-y-0 ltr:data-[side=right]:end-0 rtl:data-[side=right]:start-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-s data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", glass.sheetMotion, glass.floating, className)}
        {...props}
      >
        <GlassSurfaceContext.Provider value>{children}</GlassSurfaceContext.Provider>
        {showCloseButton && (
          <SheetPrimitive.Close data-test-id="sheet-sheetprimitive-close-6"
            data-slot="sheet-close"
            render={
              <Button data-test-id="sheet-sheetprimitive-close-6"
                variant="ghost"
                className="absolute top-3 end-3"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span data-test-id="sheet-span-8" className="sr-only">بستن</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sheet-div-9"
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="sheet-div-10"
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title data-test-id="sheet-sheetprimitive-title-11"
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description data-test-id="sheet-sheetprimitive-description-12"
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
