import type { ApprovalStatus } from "@/lib/design-system/models";

export type DocumentKind = "text" | "pdf" | "image";
export interface IDocumentPerson { id: string; name: string }
export interface IDocumentReview {
  by: IDocumentPerson;
  reviewer: IDocumentPerson;
  requestedAt: string;
  decision?: { by: IDocumentPerson; at: string; outcome: "approved" | "rejected"; reason?: string };
}
export interface IDocumentVersion {
  id: string;
  number: number;
  basedOn: string | null;
  title: string;
  content?: string;
  at: string;
  by: IDocumentPerson | null;
  approval: ApprovalStatus;
  review?: IDocumentReview;
}
export interface IDocumentRecipient { person: IDocumentPerson; access: "مشاهده" | "ویرایش" }

/** Local prototype data, independent of backend access contracts. */
export interface IDocument {
  id: string;
  repositoryId: string;
  folderId: string | null;
  title: string;
  kind: DocumentKind;
  approval: ApprovalStatus;
  creator: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
  description: string;
  content?: string;
  versions?: IDocumentVersion[];
  recipients?: IDocumentRecipient[];
  share?: { by: { id: string; name: string }; access: "مشاهده" | "ویرایش" };
}

export interface IDocumentWorkspace {
  documents: IDocument[];
  deleted: IDocument[];
  drafts: Record<string, string>;
}

export type DocumentMutation =
  | { type: "create"; document: IDocument }
  | { type: "rename"; id: string; title: string; at: string }
  | { type: "move"; id: string; folderId: string | null; at: string }
  | { type: "save"; id: string; content: string; at: string }
  | { type: "request-approval"; id: string; versionId: string; reviewerId: string; at: string }
  | { type: "decide-approval"; id: string; versionId: string; requestedAt: string; outcome: "approved" | "rejected"; reason: string; at: string }
  | { type: "set-recipient"; id: string; personId: string; access: "مشاهده" | "ویرایش" }
  | { type: "remove-recipient"; id: string; personId: string }
  | { type: "delete"; id: string }
  | { type: "restore"; id: string };
