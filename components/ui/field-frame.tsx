"use client"
import { useId, type ReactNode } from "react"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

type FieldMeta = {
  id?: string
  label: string
  description?: string
  error?: string
  disabled?: boolean
  disabledReason?: string
  required?: boolean
  "aria-describedby"?: string
}
function useFieldMeta({ id, description, error, disabled, disabledReason, "aria-describedby": external }: FieldMeta) {
  const generated = useId()
  const controlId = id ?? generated
  return {
    controlId,
    describedBy: [external, description && `${controlId}-help`, error && `${controlId}-error`, disabled && disabledReason && `${controlId}-reason`].filter(Boolean).join(" ") || undefined,
  }
}
function FieldMessages({ controlId, description, error, disabled, disabledReason }: FieldMeta & { controlId: string }) {
  return <>
    {description && <FieldDescription id={`${controlId}-help`} className="text-xs leading-body text-[color:var(--panel-help-text)]">{description}</FieldDescription>}
    {disabled && disabledReason && <FieldDescription id={`${controlId}-reason`} className="text-xs leading-body text-[color:var(--panel-help-text)]">{disabledReason}</FieldDescription>}
    {error && <FieldError id={`${controlId}-error`} className="text-xs leading-body">{error}</FieldError>}
  </>
}
function FieldFrame({ controlId, children, ...meta }: FieldMeta & { controlId: string; children: ReactNode }) {
  return <Field data-invalid={!!meta.error} data-disabled={!!meta.disabled}>
    <FieldLabel htmlFor={controlId} className="text-sm leading-label">{meta.label}{meta.required && <span data-test-id="field-frame-span-1" className="text-xs text-muted-foreground">(الزامی)</span>}</FieldLabel>
    {children}
    <FieldMessages controlId={controlId} {...meta} />
  </Field>
}
export { FieldFrame, FieldMessages, useFieldMeta }
export type { FieldMeta }
