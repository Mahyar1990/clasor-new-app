/** Display contracts only; these types do not resolve or enforce permissions. */
export type ApprovalStatus = "draft" | "pending" | "approved" | "rejected";
export type Visibility = "private" | "link" | "public";
export type VersionStatus = "latest" | "previous";
export type DisplayRole = "owner" | "admin" | "editor" | "writer" | "viewer" | "anonymous" | "manager" | "guest";

export type Identity =
  | { kind: "known"; id: string; name: string; avatarUrl?: string }
  | { kind: "unknown"; label: string };

export type ResolvedPermission =
  | { kind: "direct-approval"; allowed: true }
  | { kind: "request-approval"; allowed: true }
  | { kind: "blocked"; allowed: false; reason: string };

export type ApprovalContext = {
  creator: Identity;
  lastEditor: Identity;
  requester: Identity;
} & (
  | { status: "pending"; requestedAt: string; decision?: never }
  | {
      status: "decided";
      requestedAt: string;
      decision: {
        by: Identity;
        at: string;
        outcome: "approved" | "rejected";
      };
    }
);

/** A reason must be rendered persistently outside the disabled control. */
export type Availability =
  | { disabled?: false; disabledReason?: never }
  | { disabled: true; disabledReason: string };

export type FeedbackTone = "success" | "warning" | "error" | "info";
export type Density = "comfortable" | "compact";
export type ControlSize = "sm" | "default" | "lg";

export type SystemState =
  | { kind: "empty"; title: string; description: string }
  | { kind: "permission-denied"; title: string; reason: string }
  | {
      kind: "partial-success";
      createdItem: { id: string; name: string };
      unfinishedStep: string;
      recoveryLabel: string;
    }
  | {
      kind: "service-error";
      title: string;
      description: string;
      dataRetained: boolean;
      recoveryLabel: string;
    };
