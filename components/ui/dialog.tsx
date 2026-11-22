"use client"

import { glass } from "@/lib/design-system/classes";
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { GlassSurfaceContext } from "./glass-surface-context";
import { usePortalTheme } from "@/hooks/use-portal-theme";
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-test-id="dialog-dialogprimitive-trigger-1" data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ className, themeAnchorRef, ...props }: DialogPrimitive.Portal.Props & { themeAnchorRef?: React.RefObject<HTMLElement | null> }) {
  const theme = usePortalTheme(themeAnchorRef);
  return <DialogPrimitive.Portal className={cn(theme, className)} data-test-id="dialog-dialogprimitive-portal-2" data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-test-id="dialog-dialogprimitive-close-3" data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop data-test-id="dialog-dialogprimitive-backdrop-4"
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 isolate z-[var(--z-dialog)] bg-[var(--overlay-backdrop)] supports-backdrop-filter:backdrop-blur-xs", className, glass.backdrop)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  themeAnchorRef,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  themeAnchorRef?: React.RefObject<HTMLElement | null>
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal themeAnchorRef={themeAnchorRef}>
      <DialogOverlay />
      <DialogPrimitive.Popup data-test-id="dialog-dialogprimitive-popup-5"
        data-slot="dialog-content"
        className={cn("fixed top-1/2 start-1/2 z-[var(--z-dialog)] grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none sm:max-w-sm", glass.dialogMotion, glass.floating, className)}
        {...props}
      >
        <GlassSurfaceContext.Provider value>{children}</GlassSurfaceContext.Provider>
        {showCloseButton && (
          <DialogPrimitive.Close data-test-id="dialog-dialogprimitive-close-6"
            data-slot="dialog-close"
            render={
              <Button data-test-id="dialog-dialogprimitive-close-6"
                variant="ghost"
                className="absolute top-2 end-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span data-test-id="dialog-span-8" className="sr-only">بستن</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-test-id="dialog-div-9"
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div data-test-id="dialog-div-10"
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close data-test-id="dialog-dialogprimitive-close-11" render={<Button data-test-id="dialog-dialogprimitive-close-11" variant="outline" />}>
          بستن
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title data-test-id="dialog-dialogprimitive-title-13"
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description data-test-id="dialog-dialogprimitive-description-14"
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
