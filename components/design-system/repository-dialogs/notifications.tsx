"use client";
import { useState } from "react";
import { SearchField } from "@/components/ui/text-field";
import { SwitchField } from "@/components/ui/choice-field";
import { GlassScrollArea } from "@/components/ui/GlassScrollArea";
import { useRepositoryPreview } from "./context";
export function RepositoryNotifications({ formId, done }: { formId: string; done: () => void }) {
  const { repo, setRepo } = useRepositoryPreview();
  const [query, setQuery] = useState("");
  const [values, setValues] = useState(repo.notifications);
  const member = repo.role === "ویرایشگر";
  const entries = Object.entries(values).filter(([title]) => title.includes(query));
  return <form data-test-id="repo-notifications-form" id={formId} className="space-y-4" onSubmit={event => { event.preventDefault(); setRepo(current => ({ ...current, notifications: values })); done(); }}>
    <SearchField data-test-id="repo-notifications-search" label="جستجو در اعلانات" value={query} onValueChange={setQuery} />
    {member && <p data-test-id="repo-notifications-limit" className="text-xs leading-relaxed text-muted-foreground">شما فقط می‌توانید اعلانات فعال را غیرفعال کنید؛ فعال‌سازی دوباره توسط مدیر یا مالک انجام می‌شود.</p>}
    <GlassScrollArea data-test-id="repo-notifications-services" label="اعلانات من" className="h-[min(22rem,45dvh)] space-y-1 pe-2">
      {entries.map(([title, checked]) => <SwitchField key={title} label={title} checked={checked} disabled={member && !repo.notifications[title]} onCheckedChange={value => setValues(current => ({ ...current, [title]: !!value }))} />)}
      {!entries.length && <p data-test-id="repo-notifications-empty" className="py-4 text-center text-xs">موردی یافت نشد.</p>}
    </GlassScrollArea>
  </form>;
}
