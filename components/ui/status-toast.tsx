"use client"
import { toast } from "@/components/ui/toast"

// Compatibility for existing callers; the shared Toaster is mounted in app/layout.
export { Toaster as StatusToastProvider } from "@/components/ui/toast"
export function useStatusToast() {
  return {
    show: (message: string, options?: { type?: "default" | "success" | "info" | "warning" | "error"; duration?: number; onDismiss?: () => void }) => toast.add({ title: message, type: options?.type === "default" ? undefined : options?.type, priority: "low", timeout: options?.duration ?? 6500, onClose: options?.onDismiss }),
    dismiss: toast.close,
  }
}
