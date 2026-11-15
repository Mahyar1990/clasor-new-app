"use client";

import * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react";
import { toast, ToastProvider, ToastPortal, ToastViewport, Toast, ToastContent, ToastTitle, ToastDescription, ToastAction, ToastClose } from "./toast-part-1";

export function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null

  if (type === "success") {
    icon = (
      <CircleCheckIcon className="text-success" aria-hidden="true" />
    )
  }

  if (type === "info") {
    icon = (
      <InfoIcon className="text-info" aria-hidden="true" />
    )
  }

  if (type === "warning") {
    icon = (
      <TriangleAlertIcon className="text-warning" aria-hidden="true" />
    )
  }

  if (type === "error") {
    icon = (
      <OctagonXIcon className="text-destructive" aria-hidden="true" />
    )
  }

  if (type === "loading") {
    icon = (
      <Loader2Icon className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
    )
  }

  if (!icon) {
    return null
  }

  return (
    <span data-test-id="toast-part-2-span-1"
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  )
}

export function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem} dir="rtl" data-tone={toastItem.type ?? "default"}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div data-test-id={`toast-part-2-div-2-${String(toastItem.id)}`} className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        {toastItem.actionProps && <ToastAction />}
        <ToastClose data-test-id={`toast-part-2-toastclose-3-${String(toastItem.id)}`} />
      </ToastContent>
    </Toast>
  ))
}

export function Toaster({
  children,
  toastManager = toast,
  timeout = 6500,
  limit = 3,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} timeout={timeout} limit={limit} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport dir="rtl" aria-label="پیام‌ها">
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

export const createToastManager = ToastPrimitive.createToastManager

export const useToastManager = ToastPrimitive.useToastManager
