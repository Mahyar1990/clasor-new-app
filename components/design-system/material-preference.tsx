"use client"

import { cn } from "@/lib/utils";
import { useId, useSyncExternalStore } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

let material: "auto" | "solid" = "auto"
const listeners = new Set<() => void>()
function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
const snapshot = () => material
const serverSnapshot = () => "auto" as const

/** Session-local root preference also covers Base UI portal surfaces. */
export function MaterialPreference() {
  const id = useId()
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  return <div data-test-id="material-preference-div-1" className={cn("material-preference", "inline-flex items-center gap-2 text-xs")}>
    <label data-test-id="material-preference-label-2" htmlFor={id}>نمای سطح</label>
    <Select items={[{ value: "auto", label: "شیشه مات" }, { value: "solid", label: "بدون شفافیت" }]} value={value} onValueChange={next => {
      material = next === "solid" ? "solid" : "auto"
      document.documentElement.dataset.material = material
      listeners.forEach(listener => listener())
    }}>
      <SelectTrigger id={id} data-test-id="catalogue-material-preference" className="w-32 sm:w-40"><SelectValue /></SelectTrigger>
      <SelectContent dir="rtl" align="end" alignItemWithTrigger={false} data-test-id="catalogue-material-options">
        <SelectItem value="auto" data-test-id="catalogue-material-auto">شیشه مات</SelectItem>
        <SelectItem value="solid" data-test-id="catalogue-material-solid">بدون شفافیت</SelectItem>
      </SelectContent>
    </Select>
  </div>
}
