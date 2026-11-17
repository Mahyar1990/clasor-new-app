import { Bookmark, EyeOff, Shield, Ban } from "lucide-react";
import { Badge } from "./badge";
import { glass } from "@/lib/design-system/classes";
export interface DocumentFlagState { bookmarked: boolean; hidden: boolean; restricted: boolean; blocked: boolean }
export function DocumentFlags({ state, labels = false, testId, bookmarkTestId }: { state: DocumentFlagState; labels?: boolean; testId: string; bookmarkTestId?: string }) {
  const flags = [
    { id: "bookmarked", label: "نشان‌شده", icon: Bookmark, style: glass.statusInfo },
    { id: "hidden", label: "مخفی در انتشار", icon: EyeOff, style: glass.statusWarning },
    { id: "restricted", label: "محدودیت انتشار", icon: Shield, style: glass.statusWarning },
    { id: "blocked", label: "محدودیت دسترسی در پنل", icon: Ban, style: glass.statusDanger },
  ].filter(flag => state[flag.id as keyof DocumentFlagState]);
  if (!flags.length) return null;
  return <span data-test-id={testId} className="inline-flex shrink-0 flex-wrap items-center gap-1">{flags.map(({ id, label, icon: Icon, style }) => labels ? <Badge data-test-id={`${testId}-${id}`} key={id} variant="outline" className={`${style} gap-1`}><Icon aria-hidden="true" className="size-3" />{label}</Badge> : <span data-test-id={id === "bookmarked" ? bookmarkTestId ?? `${testId}-${id}` : `${testId}-${id}`} key={id} title={label} className="inline-flex text-primary"><Icon aria-hidden="true" className="size-3.5" /><span data-test-id={`${testId}-${id}-label`} className="sr-only">{label}</span></span>)}</span>;
}
