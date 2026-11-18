"use client";
import { Ellipsis } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
export function OptionsButton({ className, tone = "neutral", ...props }: Omit<ButtonProps, "variant" | "size" | "children"> & { tone?: "neutral" | "accent" }) {
  return <Button variant="outline" size="icon-sm" {...props} data-test-id={props["data-test-id"] ?? "options-button"} className={cn(tone === "accent" ? glass.recordOptionsAccent : glass.recordOptions, className)}><Ellipsis aria-hidden="true" /></Button>;
}
