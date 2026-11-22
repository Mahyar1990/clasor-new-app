import type { CatalogueSection } from "./catalogue-sections";

type Preview = { section: CatalogueSection; anchor: string; theme: "local" | "catalogue" };

export const handoffPreviews: Readonly<Partial<Record<string, Preview>>> = {
  button: { section: "buttons", anchor: "glass-actions-catalogue", theme: "local" },
  "text-field": { section: "inputs", anchor: "glass-control-states", theme: "local" },
  select: { section: "inputs", anchor: "glass-control-states", theme: "local" },
  choice: { section: "inputs", anchor: "glass-control-states", theme: "local" },
  "file-input": { section: "inputs", anchor: "catalogue-file-input", theme: "catalogue" },
  badge: { section: "status", anchor: "glass-status-states", theme: "local" },
  identity: { section: "status", anchor: "glass-status-identities", theme: "local" },
  tabs: { section: "navigation", anchor: "glass-default-tabs", theme: "local" },
  breadcrumb: { section: "navigation", anchor: "glass-navigation-states", theme: "local" },
  pagination: { section: "navigation", anchor: "glass-navigation-states", theme: "local" },
  "data-table": { section: "data", anchor: "glass-data-table-states", theme: "local" },
  "action-menu": { section: "overlays", anchor: "glass-options-title", theme: "local" },
  feedback: { section: "feedback", anchor: "glass-feedback-states", theme: "local" },
  "system-state": { section: "feedback", anchor: "glass-system-state-title", theme: "local" },
  progress: { section: "feedback", anchor: "glass-feedback-states", theme: "local" },
  dialog: { section: "overlays", anchor: "glass-layer-states", theme: "local" },
  drawer: { section: "overlays", anchor: "glass-layer-states", theme: "local" },
  toast: { section: "overlays", anchor: "glass-layer-states", theme: "local" },
  tooltip: { section: "overlays", anchor: "glass-layer-states", theme: "local" },
  "permission-action": { section: "patterns", anchor: "catalogue-permission-action", theme: "local" },
  stepper: { section: "patterns", anchor: "catalogue-creation-stepper", theme: "local" },
  "approval-context": { section: "patterns", anchor: "catalogue-approval-context", theme: "local" },
};

export function handoffPreview(id: string) {
  const preview = handoffPreviews[id];
  if (!preview) throw new Error(`Missing handoff preview: ${id}`);
  return preview;
}
