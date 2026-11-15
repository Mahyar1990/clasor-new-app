import type { DocumentMutation, IDocument, IDocumentPerson, IDocumentVersion, IDocumentWorkspace } from "@/interface/document";
import type { IFolder, IRepository } from "@/interface/repository";

export function validateTitle(value: string) {
  const title = value.trim();
  if (!title) throw new Error("عنوان سند را وارد کنید.");
  if (title.length > 160) throw new Error("عنوان را به حداکثر ۱۶۰ نویسه کوتاه کنید.");
  return title;
}

export function canManageDocument(document: IDocument, repositories: readonly IRepository[], userId: string) {
  const repository = repositories.find(item => item.id === document.repositoryId);
  return Boolean(repository && repository.ownerId === userId && !repository.archived && !document.share);
}

export function documentText(document: IDocument) {
  return document.content ?? `یادداشت نمونه · کلاسور\n\n${document.title}\n\n${document.description}\n\nاز دانسته‌ها به تصمیم‌های روشن\nیک سند خوب، زمینه را روشن می‌کند. هدف این یادداشت ثبت دانسته‌ها، دلیل تصمیم‌ها و قدم بعدی است؛ تا هر بار برای ادامه کار از ابتدا شروع نکنیم.\n\nهر ایده در جای خودش، هر تصمیم با زمینه‌ای روشن.\n\nچطور این سند را مرور کنیم؟\nابتدا هدف و زمینه موضوع را بخوانید.\nتصمیم‌ها را با نیازهای پروژه تطبیق دهید.\nقدم بعدی و مسئول پیگیری را مشخص کنید.\n\nاین محتوا برای نمایش تجربه مطالعه ساخته شده است.`;
}

export function getDocumentVersions(document: IDocument): IDocumentVersion[] {
  return document.versions?.length ? document.versions : [{ id: `${document.id}-v1`, number: 1, basedOn: null, title: document.title, ...(document.kind === "text" ? { content: documentText(document) } : {}), at: document.updatedAt, by: document.creator, approval: document.approval }];
}

export function applyDocumentMutation(state: IDocumentWorkspace, action: DocumentMutation, context: { repositories: readonly IRepository[]; folders: readonly IFolder[]; userId: string; people?: readonly (IDocumentPerson & { role?: string })[] }): IDocumentWorkspace {
  function destination(repositoryId: string, folderId: string | null) {
    if (folderId && !context.folders.some(folder => folder.id === folderId && folder.repositoryId === repositoryId)) throw new Error("پوشه مقصد در این مخزن وجود ندارد.");
  }
  if (action.type === "create") {
    if (state.documents.some(item => item.id === action.document.id) || state.deleted.some(item => item.id === action.document.id)) throw new Error("این سند قبلاً ایجاد شده است.");
    if (!canManageDocument(action.document, context.repositories, context.userId)) throw new Error("ایجاد در این فضای نمونه در دسترس نیست.");
    destination(action.document.repositoryId, action.document.folderId);
    const created = { ...action.document, title: validateTitle(action.document.title) };
    return { ...state, documents: [{ ...created, versions: getDocumentVersions(created) }, ...state.documents] };
  }
  if (action.type === "restore") {
    const document = state.deleted.find(item => item.id === action.id);
    if (!document || state.documents.some(item => item.id === action.id)) throw new Error("این سند برای برگرداندن موجود نیست.");
    destination(document.repositoryId, document.folderId);
    return { ...state, documents: [document, ...state.documents], deleted: state.deleted.filter(item => item.id !== action.id) };
  }
  const document = state.documents.find(item => item.id === action.id);
  if (!document) throw new Error("سند پیدا نشد.");
  if (!canManageDocument(document, context.repositories, context.userId)) throw new Error("تغییر این سند در نسخه نمونه در دسترس نیست.");
  if (action.type === "delete") return { ...state, documents: state.documents.filter(item => item.id !== action.id), deleted: [...state.deleted, document] };
  let updated = document;
  const versions = getDocumentVersions(document);
  const latest = versions.at(-1)!;
  const actor = document.creator?.id === context.userId ? document.creator : { id: context.userId, name: "کاربر نمونه" };
  if (action.type === "rename") updated = { ...document, title: validateTitle(action.title), updatedAt: action.at };
  if (action.type === "move") { destination(document.repositoryId, action.folderId); updated = { ...document, folderId: action.folderId, updatedAt: action.at }; }
  if (action.type === "save") {
    if (document.kind !== "text") throw new Error("ویرایش متن فقط برای سند متنی در دسترس است.");
    if (action.content.length > 50000) throw new Error("متن در این نمونه باید حداکثر ۵۰٬۰۰۰ نویسه باشد.");
    const next: IDocumentVersion = { id: `${document.id}-v${latest.number + 1}`, number: latest.number + 1, basedOn: latest.id, title: document.title, content: action.content, at: action.at, by: actor, approval: "draft" };
    updated = action.content === documentText(document) ? document : { ...document, content: action.content, updatedAt: action.at, approval: "draft", versions: [...versions, next] };
  }
  if (action.type === "request-approval" || action.type === "decide-approval") {
    if (action.versionId !== latest.id) throw new Error("نسخه تازه‌ای ذخیره شده است؛ درخواست را برای آخرین نسخه بررسی کنید.");
    if (state.drafts[document.id] !== undefined && state.drafts[document.id] !== documentText(document)) throw new Error("ابتدا تغییرات متن را ذخیره یا کنار بگذارید.");
    let reviewed = latest;
    if (action.type === "request-approval") {
      if (latest.approval !== "draft" && latest.approval !== "rejected") throw new Error("این نسخه قبلاً برای بررسی ارسال یا تأیید شده است.");
      const reviewer = context.people?.find(person => person.id === action.reviewerId && person.id !== context.userId && (person.role === "admin" || person.role === "owner"));
      if (!reviewer) throw new Error("بررسی‌کننده نمونه معتبر نیست.");
      reviewed = { ...latest, approval: "pending", review: { by: actor, reviewer: { id: reviewer.id, name: reviewer.name }, requestedAt: action.at } };
    } else {
      if (latest.approval !== "pending" || !latest.review || latest.review.decision || latest.review.requestedAt !== action.requestedAt) throw new Error("این درخواست دیگر در انتظار تصمیم نیست.");
      const reason = action.reason.trim();
      if (action.outcome === "rejected" && !reason) throw new Error("دلیل رد محتوا را وارد کنید.");
      if (reason.length > 500) throw new Error("دلیل باید حداکثر ۵۰۰ نویسه باشد.");
      reviewed = { ...latest, approval: action.outcome, review: { ...latest.review, decision: { by: latest.review.reviewer, at: action.at, outcome: action.outcome, ...(reason ? { reason } : {}) } } };
    }
    updated = { ...document, approval: reviewed.approval, versions: [...versions.slice(0, -1), reviewed] };
  }
  if (action.type === "set-recipient" || action.type === "remove-recipient") {
    const person = context.people?.find(person => person.id === action.personId && person.id !== context.userId);
    if (!person) throw new Error("یک شخص ساختگی معتبر انتخاب کنید.");
    const recipients = (document.recipients ?? []).filter(recipient => recipient.person.id !== action.personId);
    if (action.type === "set-recipient") {
      if (action.access !== "مشاهده" && action.access !== "ویرایش") throw new Error("سطح دسترسی معتبر نیست.");
      recipients.push({ person: { id: person.id, name: person.name }, access: action.access });
    }
    updated = { ...document, recipients };
  }
  const drafts = { ...state.drafts };
  if (action.type === "save") delete drafts[action.id];
  return { ...state, drafts, documents: state.documents.map(item => item.id === action.id ? updated : item) };
}
