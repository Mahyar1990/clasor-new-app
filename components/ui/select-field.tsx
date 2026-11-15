"use client"
import type { ComponentProps } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldFrame, useFieldMeta, type FieldMeta } from "@/components/ui/field-frame"

type SelectFieldProps = Omit<ComponentProps<typeof Select<string>>, "children" | "items" | "multiple" | "onValueChange" | "id"> & FieldMeta & {
  options: { value: string; label: string; disabled?: boolean }[]
  onValueChange?: (value: string) => void
  placeholder?: string
  size?: "sm" | "default" | "lg"
  className?: string
  "aria-invalid"?: ComponentProps<typeof SelectTrigger>["aria-invalid"]
}
function SelectField({ label, description, error, disabledReason, options, onValueChange, placeholder = "یک گزینه انتخاب کنید", size = "default", className, id, "aria-describedby": externalDescription, "aria-invalid": invalid, ...props }: SelectFieldProps) {
  const meta = { id, label, description, error, disabledReason, disabled: props.disabled, required: props.required, "aria-describedby": externalDescription }
  const { controlId, describedBy } = useFieldMeta(meta)
  return <FieldFrame {...meta} controlId={controlId}>
    <Select {...props} items={options} onValueChange={value => onValueChange?.(value ?? "")}>
      <SelectTrigger data-test-id="select-field-selecttrigger-1" id={controlId} size={size} className={className} aria-describedby={describedBy} aria-invalid={!!error || invalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent dir="rtl" align="start" alignItemWithTrigger={false}>
        <SelectGroup>{options.map(option => <SelectItem data-test-id={`select-field-selectitem-2-${String(option.value)}`} key={option.value} value={option.value} disabled={option.disabled}>{option.label}</SelectItem>)}</SelectGroup>
      </SelectContent>
    </Select>
  </FieldFrame>
}
export { SelectField }
export type { SelectFieldProps }
