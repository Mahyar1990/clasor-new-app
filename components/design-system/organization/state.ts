import type { HierarchyNode } from "@/lib/design-system/hierarchy";
import type { OrganizationState, OrganizationBranch } from "./model";
import { normalizeDomainText } from "../domain/queries";
export function branchPath(branches: OrganizationBranch[], id?: string): OrganizationBranch[] {
  const path: OrganizationBranch[] = [];
  const seen = new Set<string>();
  let branch = branches.find(item => item.id === id);
  while (branch && !seen.has(branch.id)) { path.unshift(branch); seen.add(branch.id); branch = branches.find(item => item.id === branch?.parentId); }
  return path;
}
export function branchHierarchy(branches: OrganizationBranch[], query = ""): HierarchyNode[] {
  const needle = normalizeDomainText(query);
  function level(parentId: string | undefined, ancestors: Set<string>, parentMatches = false): HierarchyNode[] {
    return branches.filter(item => item.parentId === parentId && !ancestors.has(item.id)).flatMap(item => {
      const matches = parentMatches || !needle || normalizeDomainText(item.name).includes(needle);
      const children = level(item.id, new Set([...ancestors, item.id]), matches);
      return matches || children.length ? [{ id: item.id, label: item.name, children }] : [];
    });
  }
  return level(undefined, new Set());
}
export function branchDescendants(branches: OrganizationBranch[], id: string) {
  const ids = new Set([id]);
  let changed = true;
  while (changed) { changed = false; for (const item of branches) if (item.parentId && ids.has(item.parentId) && !ids.has(item.id)) { ids.add(item.id); changed = true; } }
  return ids;
}
export function removeBranch(state: OrganizationState, id: string): OrganizationState {
  const ids = branchDescendants(state.branches, id);
  return { branches: state.branches.filter(branch => !ids.has(branch.id)), positions: state.positions.filter(position => !ids.has(position.branchId)), members: state.members.filter(member => !ids.has(member.branchId)) };
}
export function branchNameError(branches: OrganizationBranch[], name: string, parentId?: string, editingId?: string) {
  if (!name.trim()) return "نام شعبه را وارد کنید.";
  if (branches.some(item => item.id !== editingId && item.parentId === parentId && normalizeDomainText(item.name) === normalizeDomainText(name))) return "شعبه‌ای با این نام در این سطح وجود دارد.";
  return "";
}
