export type Decision = "pending" | "approved" | "rejected";
export interface DomainUser { id: string; name: string; username: string; avatar?: string }
export interface DomainNews { id: string; title: string; body: string; link: string; image: string; createdAt: string; repositoryId?: string }
export interface NewsRequest { id: string; user: DomainUser; repositoryId: string; status: Decision; createdAt: string }
export interface DomainReview { id: string; kind: "comment" | "question"; user: DomainUser; documentId: string; document: string; repositoryId: string; body: string; createdAt: string; status: Decision }
export type ReportTarget = "document" | "repository" | "comment" | "question" | "answer";
export interface DomainReport { id: string; target: ReportTarget; targetTitle: string; document?: string; repositoryId: string; user: DomainUser; reason: string; body: string; createdAt: string }
export interface DomainRepository { id: string; name: string; creator: string; priority: number }
export interface DomainSettings { fields: Record<string, string>; colors: Record<string, string>; flags: Record<string, boolean> }
export interface DomainState { users: DomainUser[]; news: DomainNews[]; requests: NewsRequest[]; reviews: DomainReview[]; reports: DomainReport[]; priorities: Record<string, number>; tags: string[]; settings: DomainSettings }
export const reportLabels: Record<ReportTarget, string> = { document: "سند", repository: "مخزن", comment: "نظر", question: "سوال", answer: "پاسخ" };
export const decisionOptions = [{ value: "pending", label: "در انتظار تأیید" }, { value: "all", label: "همه وضعیت‌ها" }, { value: "approved", label: "تأییدشده" }, { value: "rejected", label: "ردشده" }];
