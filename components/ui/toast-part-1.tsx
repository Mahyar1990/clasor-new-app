"use client";

import { isDarkPortalSource } from "@/hooks/use-portal-theme";
import { glass } from "@/lib/design-system/classes";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export const toast = ToastPrimitive.createToastManager()

export function addToastFrom(source: Element, options: Parameters<typeof toast.add>[0]) {
  return toast.add({ ...options, data: { ...options.data, portalDark: isDarkPortalSource(source) } })
}

export function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

export function ToastPortal({ className, ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal className={cn(glass.toastPortal, className)} data-test-id="toast-part-1-toastprimitive-portal-1" data-slot="toast-portal" {...props} />
}

export function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport data-test-id="toast-part-1-toastprimitive-viewport-2"
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-[var(--z-toast)] mx-auto w-auto max-w-sm outline-none sm:end-4 sm:start-auto sm:mx-0 sm:w-full",
        className
      )}
      {...props}
    />
  )
}

export function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn("group/toast pointer-events-auto absolute end-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-lg border bg-popover text-popover-foreground shadow-lg outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]", "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]", "after:absolute after:top-full after:start-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']", "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]", "data-limited:opacity-0", "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", glass.toastMotion, glass.floating, className)}
      {...props}
    />
  )
}

export function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content data-test-id="toast-part-1-toastprimitive-content-3"
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 motion-safe:transition-opacity motion-safe:duration-(--clasor-motion-fast) data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title data-test-id="toast-part-1-toastprimitive-title-4"
      data-slot="toast-title"
      className={cn("break-words text-sm font-medium leading-label", className)}
      {...props}
    />
  )
}

export function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description data-test-id="toast-part-1-toastprimitive-description-5"
      data-slot="toast-description"
      className={cn("break-words text-xs leading-body text-current", className)}
      {...props}
    />
  )
}

export function ToastAction({
  className,
  render = <Button data-test-id="toast-part-1-button-6" variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action data-test-id="toast-part-1-toastprimitive-action-7"
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

export function ToastClose({
  className,
  children,
  render = <Button data-test-id="toast-part-1-button-8" variant="ghost" size="icon-sm" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close data-test-id="toast-part-1-toastprimitive-close-9"
      data-slot="toast-close"
      aria-label="بستن پیام"
      aria-hidden={false}
      render={render}
      className={cn(
        "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
        className
      )}
      {...props}
    >
      {children ?? (
        <XIcon aria-hidden="true" />
      )}
    </ToastPrimitive.Close>
  )
}
