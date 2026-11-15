"use client"
import { useId, type Ref } from "react"
import { Search } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type TableSearchProps = {
  label: string
  tableId: string
  value: string
  onValueChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  disabled?: boolean
  ref?: Ref<HTMLInputElement>
}

export function TableSearch({ label, tableId, value, onValueChange, onSearch, placeholder = "جست‌وجو در جدول…", disabled, ref }: TableSearchProps) {
  const id = useId()
  return <form data-test-id="table-search-form-1" role="search" aria-label={label} className="min-w-0 w-full" onSubmit={event => { event.preventDefault(); if (!disabled) onSearch(value) }}>
    <label data-test-id="table-search-label-2" htmlFor={id} className="sr-only">{label}</label>
    <ButtonGroup aria-label={label} className="w-full">
      <Input data-test-id="table-search-input-3" ref={ref} id={id} type="search" value={value} disabled={disabled} placeholder={placeholder} aria-controls={tableId} onChange={event => onValueChange(event.target.value)} />
      <Button data-test-id="table-search-button-4" type="submit" variant="outline" size="icon" disabled={disabled} aria-label="اجرای جست‌وجوی جدول" aria-controls={tableId}><Search aria-hidden="true" /></Button>
    </ButtonGroup>
  </form>
}
