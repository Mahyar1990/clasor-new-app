"use client"
import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import { useRef, useState, type ComponentProps } from "react"
import { FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { FieldFrame, useFieldMeta, type FieldMeta } from "@/components/ui/field-frame"

type FileInputProps = Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "multiple" | "onChange" | "size"> & FieldMeta & {
  maxSizeBytes?: number
  restrictionsText?: string
  onFileChange?: (file: File | null) => void
}
function accepts(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(",").some(part => {
    const rule = part.trim().toLowerCase()
    if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule)
    if (rule.endsWith("/*")) return file.type.toLowerCase().startsWith(rule.slice(0, -1))
    return file.type.toLowerCase() === rule
  })
}
function FileInput({ label, description, error, disabledReason, maxSizeBytes, restrictionsText, onFileChange, ...props }: FileInputProps) {
  const input = useRef<HTMLInputElement>(null)
  const picker = useRef<HTMLButtonElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [selectionError, setSelectionError] = useState("")
  const limits = [description, restrictionsText, props.accept && `نوع مجاز: ${props.accept}`, maxSizeBytes !== undefined && `حداکثر حجم: ${new Intl.NumberFormat("fa").format(maxSizeBytes)} بایت`].filter(Boolean).join(" — ")
  const meta = { ...props, label, description: limits || undefined, disabledReason, error: error || selectionError }
  const { controlId, describedBy } = useFieldMeta(meta)
  function clear() {
    if (input.current) { input.current.value = ""; input.current.setCustomValidity("") }
    picker.current?.focus()
    setFile(null); setSelectionError(""); onFileChange?.(null)
  }
  return <FieldFrame {...meta} controlId={controlId}>
    <Button data-test-id="file-input-button-1" ref={picker} id={controlId} type="button" variant="outline" disabled={props.disabled} aria-describedby={describedBy} aria-invalid={!!meta.error} onClick={() => input.current?.click()}><FileText aria-hidden="true" />انتخاب فایل</Button>
    <input data-slot="input" data-test-id="file-input-input-2" {...props} type="file" ref={input} id={`${controlId}-input`} aria-label={label} className={cn("sr-only", glass.input)} tabIndex={-1} aria-describedby={describedBy} aria-invalid={!!meta.error} onInvalid={event => {
      props.onInvalid?.(event)
      if (!event.defaultPrevented) {
        event.preventDefault()
        if (!file && props.required) setSelectionError("یک فایل انتخاب کنید.")
        picker.current?.focus()
      }
    }} onChange={event => {
      const selected = event.target.files?.[0] ?? null
      const invalid = selected && !accepts(selected, props.accept) ? "نوع فایل مجاز نیست؛ یکی از نوع‌های اعلام‌شده را انتخاب کنید." : selected && maxSizeBytes !== undefined && selected.size > maxSizeBytes ? "حجم فایل بیشتر از حد مجاز است؛ فایل کوچک‌تری انتخاب کنید." : ""
      event.target.setCustomValidity(invalid)
      setFile(selected); setSelectionError(invalid); onFileChange?.(invalid ? null : selected)
    }} />
    {file && <div data-test-id="file-input-div-3" className={cn(glass.panel, "flex min-w-0 items-center gap-3 p-3")}>
      <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div data-test-id="file-input-div-4" className="min-w-0 flex-1"><bdi data-test-id="file-input-bdi-5" className="block break-all text-sm">{file.name}</bdi><p data-test-id="file-input-p-6" className="text-xs text-muted-foreground">{new Intl.NumberFormat("fa").format(file.size)} بایت — انتخاب محلی</p></div>
      <IconButton data-test-id="file-input-iconbutton-7" aria-label={`پاک‌کردن فایل ${file.name}`} variant="ghost" disabled={props.disabled} onClick={clear}><X aria-hidden="true" /></IconButton>
    </div>}
  </FieldFrame>
}
export { FileInput }
