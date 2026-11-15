"use client"
import { Button, type ButtonProps } from "@/components/ui/button"
type IconButtonProps = Omit<ButtonProps, "size" | "aria-label"> & {
  "aria-label": string
  size?: "icon" | "icon-sm" | "icon-lg"
}
function IconButton({ size = "icon", ...props }: IconButtonProps) {
  return <Button data-test-id="icon-button-button-1" size={size} {...props} />
}
export { IconButton }
