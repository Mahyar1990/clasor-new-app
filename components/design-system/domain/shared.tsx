"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLibrary } from "../library/store";
import type { DomainFilter } from "./collection";
import type { DomainUser } from "./model";
export function DomainPerson({ user }: { user: DomainUser }) {
  return <span data-test-id={`domain-person-${user.id}`} className="flex min-w-0 items-center gap-2">
    <Avatar data-test-id={`domain-person-avatar-${user.id}`} size="sm">{user.avatar && <AvatarImage data-test-id={`domain-person-image-${user.id}`} src={user.avatar} alt="" />}<AvatarFallback data-test-id={`domain-person-fallback-${user.id}`}>{user.name.slice(0, 1)}</AvatarFallback></Avatar>
    <span data-test-id={`domain-person-name-${user.id}`} className="min-w-0 wrap-anywhere">{user.name}</span>
  </span>;
}
const dateFormatter = new Intl.DateTimeFormat("fa-IR", { timeZone: "Asia/Tehran", year: "numeric", month: "short", day: "numeric" });
export function DomainDate({ value, testId }: { value: string; testId: string }) {
  return <time data-test-id={testId} dateTime={value} className="whitespace-nowrap text-[11px] text-muted-foreground">{dateFormatter.format(new Date(value))}</time>;
}
export function useDomainRepositories() {
  const { repositories, documents } = useLibrary();
  return repositories.filter(item => !item.deleted && item.published).map((repo, i) => ({ id: repo.id, name: repo.name, image: repo.image, creator: documents.find(doc => doc.repositoryId === repo.id)?.creator ?? "کاربر نمونه", priority: i + 1 }));
}
export function useRepositoryFilter(): DomainFilter {
  const repos = useDomainRepositories();
  return { id: "repositoryId", label: "مخزن", options: [{ value: "all", label: "همه مخزن‌ها" }, ...repos.map(repo => ({ value: repo.id, label: repo.name }))] };
}
