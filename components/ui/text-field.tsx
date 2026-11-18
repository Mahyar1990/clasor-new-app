"use client"
import type { ComponentProps, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldFrame, useFieldMeta, type FieldMeta } from "@/components/ui/field-frame"

type TextFieldProps = Omit<ComponentProps<typeof Input>, "size"> & FieldMeta & { onValueChange?: (value: string) => void; action?: ReactNode }
function TextField({ label, description, error, disabledReason, onValueChange, action, ...props }: TextFieldProps) {
  const meta = { ...props, label, description, error, disabledReason }
  const { controlId, describedBy } = useFieldMeta(meta)
  const control = <Input data-test-id="text-field-input-1" {...props} id={controlId} aria-describedby={describedBy} aria-invalid={!!error || props["aria-invalid"]} onChange={event => { props.onChange?.(event); onValueChange?.(event.target.value) }} />
  return <FieldFrame {...meta} controlId={controlId}>
    {action ? <div data-test-id={`${controlId}-action-row`} className="flex items-center gap-2 [&>button]:h-[var(--control-height)]">{control}{action}</div> : control}
  </FieldFrame>
}
function SearchField(props: Omit<TextFieldProps, "type">) {
  return <TextField data-test-id="text-field-textfield-2" {...props} type="search" />
}
type TextareaFieldProps = ComponentProps<typeof Textarea> & FieldMeta & { onValueChange?: (value: string) => void }
function TextareaField({ label, description, error, disabledReason, onValueChange, ...props }: TextareaFieldProps) {
  const meta = { ...props, label, description, error, disabledReason }
  const { controlId, describedBy } = useFieldMeta(meta)
  return <FieldFrame {...meta} controlId={controlId}>
    <Textarea {...props} id={controlId} aria-describedby={describedBy} aria-invalid={!!error || props["aria-invalid"]} onChange={event => { props.onChange?.(event); onValueChange?.(event.target.value) }} />
  </FieldFrame>
}
export { TextField, SearchField, TextareaField }
