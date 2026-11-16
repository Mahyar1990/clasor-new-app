import { RotateCcw } from "lucide-react";
import { repositoryOptions } from "../clasor-repository-options";
import type { GlassOption } from "@/components/ui/GlassOptionsMenu";
import type { RepositoryPreview } from "./context";

export function repositoryActionItems(repo: RepositoryPreview): GlassOption[] {
  const items = repositoryOptions(repo.role, repo.published);
  const visible: GlassOption[] = repo.archived ? [
    ...items.filter(item => item.id === "info"),
    ...(repo.role === "مالک" ? [{ id: "restore", label: "بازگردانی مخزن", icon: <RotateCcw /> }, ...items.filter(item => item.id === "delete")] : []),
  ] : items;
  return visible.map(item => ({ ...item, disabled: repo.deleted || repo.left || item.disabled, label: item.id === "bookmark" && repo.bookmarked ? "حذف بوکمارک" : item.label }));
}
