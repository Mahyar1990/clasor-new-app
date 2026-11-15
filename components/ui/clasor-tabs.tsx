"use client"
import type { ComponentProps, ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
type ClasorTabsProps = Omit<ComponentProps<typeof Tabs>, "children"> & { label: string; items: { value: string; label: string; content: ReactNode }[] }
export function ClasorTabs({ items, label, ...props }: ClasorTabsProps) {
  return <Tabs {...props}><TabsList activateOnFocus variant="line" aria-label={label} className="max-w-full flex-wrap">
    {items.map(item => <TabsTrigger data-test-id={`clasor-tabs-tabstrigger-1-${String(item.value)}`} key={item.value} value={item.value} className="min-h-11 px-4 data-active:text-primary after:bg-primary">{item.label}</TabsTrigger>)}
  </TabsList>{items.map(item => <TabsContent key={item.value} value={item.value} className="py-5 leading-body">{item.content}</TabsContent>)}</Tabs>
}
