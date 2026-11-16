"use client"
import type { ComponentProps, ReactNode } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { FieldMessages, useFieldMeta, type FieldMeta } from "@/components/ui/field-frame"

function ChoiceFrame({ controlId, children, ...meta }: FieldMeta & { controlId: string; children: ReactNode }) {
  return <Field data-invalid={!!meta.error} data-disabled={!!meta.disabled}>
    <div data-test-id="choice-field-div-1" className="flex min-h-11 items-center gap-3">
      {children}<FieldLabel htmlFor={controlId} className="cursor-pointer text-sm leading-label">{meta.label}{meta.required && " (الزامی)"}</FieldLabel>
    </div>
    <FieldMessages {...meta} controlId={controlId} />
  </Field>
}
function CheckboxField({ label, description, error, disabledReason, ...props }: ComponentProps<typeof Checkbox> & FieldMeta) {
  const meta = { ...props, label, description, error, disabledReason }
  const { controlId, describedBy } = useFieldMeta(meta)
  return <ChoiceFrame {...meta} controlId={controlId}><Checkbox data-test-id="choice-field-checkbox-2" {...props} id={controlId} aria-describedby={describedBy} aria-invalid={!!error || props["aria-invalid"]} /></ChoiceFrame>
}
function SwitchField({ label, description, error, disabledReason, ...props }: ComponentProps<typeof Switch> & FieldMeta) {
  const meta = { ...props, label, description, error, disabledReason }
  const { controlId, describedBy } = useFieldMeta(meta)
  return <ChoiceFrame {...meta} controlId={controlId}><Switch data-test-id="choice-field-switch-3" {...props} id={controlId} aria-describedby={describedBy} aria-invalid={!!error || props["aria-invalid"]} /></ChoiceFrame>
}
type RadioFieldProps = ComponentProps<typeof RadioGroup> & FieldMeta & {
  options: { value: string; label: string; disabled?: boolean; disabledReason?: string; content?: ReactNode }[]
}
function RadioField({ label, description, error, disabledReason, options, ...props }: RadioFieldProps) {
  const meta = { ...props, label, description, error, disabledReason }
  const { controlId, describedBy } = useFieldMeta(meta)
  return <FieldSet disabled={props.disabled}>
    <FieldLegend id={`${controlId}-label`} variant="label">{label}{props.required && " (الزامی)"}</FieldLegend>
    <RadioGroup {...props} id={controlId} aria-labelledby={`${controlId}-label`} aria-describedby={describedBy} aria-invalid={!!error || props["aria-invalid"]}>
      {options.map((option, index) => <div data-test-id={`choice-field-div-4-${String(option.value)}`} key={option.value}>
        <div data-test-id={`choice-field-div-5-${String(option.value)}`} className="flex min-h-11 items-center gap-3">
          <RadioGroupItem data-test-id={`choice-field-radiogroupitem-6-${String(option.value)}`} id={`${controlId}-${index}`} value={option.value} disabled={props.disabled || option.disabled} aria-describedby={option.disabled && option.disabledReason ? `${controlId}-${index}-reason` : undefined} />
          <FieldLabel htmlFor={`${controlId}-${index}`} className="cursor-pointer text-sm">{option.label}</FieldLabel>
        </div>
        {props.value === option.value && option.content && <div data-test-id={`choice-field-content-${option.value}`} className="ps-7 pb-2">{option.content}</div>}
        {option.disabled && option.disabledReason && <p data-test-id={`choice-field-p-7-${String(option.value)}`} id={`${controlId}-${index}-reason`} className="text-xs text-muted-foreground">{option.disabledReason}</p>}
      </div>)}
    </RadioGroup>
    <FieldMessages {...meta} controlId={controlId} />
  </FieldSet>
}
export { CheckboxField, SwitchField, RadioField }
