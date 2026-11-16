"use client";

import { useState } from "react";
import { TextField, TextareaField } from "@/components/ui/text-field";
import { RadioField, SwitchField } from "@/components/ui/choice-field";
import { CopyField } from "@/components/ui/CopyField";
import { useDocumentPreview } from "./context";

export function DocumentPublication({ action, formId, done }: { action: string; formId: string; done: () => void }) {
  const { document, setDocument } = useDocumentPreview();
  const [mode, setMode] = useState(document.audienceMode);
  const [audience, setAudience] = useState(document.audience.join("\n"));
  const [password, setPassword] = useState("");
  const [expires, setExpires] = useState(!!document.expiresAt);
  const [date, setDate] = useState(document.expiresAt);
  const [minimumDate] = useState(() => new Date(Date.now() + 86400000).toLocaleDateString("en-CA"));
  return <form data-test-id="doc-publication-form" id={formId} className="space-y-4" onSubmit={event => {
    event.preventDefault();
    setDocument(current => ({ ...current,
      ...(action === "audience" ? { audienceMode: mode, audience: [...new Set(audience.split(/\n|,/).map(value => value.trim()).filter(Boolean))] } : {}),
      ...(action === "password" ? { password } : {}),
      ...(action === "publish-link" ? { publishLink: current.publishLink || `https://example.com/share/${encodeURIComponent(current.id)}`, expiresAt: expires ? date : "" } : {}),
    })); done();
  }}>
    {action === "audience" && <>
      <RadioField label="نوع محدودیت انتشار" value={mode} onValueChange={value => setMode(String(value))} options={[{ value: "white-list", label: "لیست سفید" }, { value: "black-list", label: "لیست سیاه" }]} description="این محدودیت مستقل از دسترسی مستقیم و تأیید محتواست." />
      <TextareaField data-test-id="doc-audience-users" label="شناسه‌های کاربران" value={audience} onValueChange={setAudience} rows={4} description="هر شناسه را در یک خط وارد کنید." />
    </>}
    {action === "password" && <TextField data-test-id="doc-publication-password" label={document.password ? "رمز عبور تازه" : "رمز عبور انتشار"} type="password" value={password} onValueChange={setPassword} required autoComplete="new-password" description="رمز فقط در حافظهٔ همین نمونه نگهداری می‌شود." />}
    {action === "publish-link" && <>
      {document.publishLink && <CopyField testId="doc-publication-existing-link" label="لینک انتشار نمونه" value={document.publishLink} />}
      <SwitchField data-test-id="doc-publication-expiry-toggle" label="افزودن تاریخ انقضای لینک" checked={expires} onCheckedChange={setExpires} />
      {expires && <TextField data-test-id="doc-publication-expiry" label="تاریخ انقضا" type="date" min={minimumDate} value={date} onValueChange={setDate} required />}
      <p data-test-id="doc-publication-link-note" className="text-xs leading-relaxed text-muted-foreground">نشانی نمونه پس از ثبت ساخته می‌شود و از بخش لینک انتشار قابل کپی است.</p>
    </>}
  </form>;
}

export function DocumentConfirm({ action, formId, done }: { action: string; formId: string; done: () => void }) {
  const { document, setDocument } = useDocumentPreview();
  const descriptions: Record<string, string> = {
    bookmark: document.bookmarked ? "این سند از نشان‌شده‌ها برداشته می‌شود." : "این سند به نشان‌شده‌های شما اضافه می‌شود.",
    delete: "آیا از حذف این سند اطمینان دارید؟ سند فقط از فهرست همین پیش‌نمایش حذف می‌شود.",
    "publish-version": "آخرین نسخه عمومی می‌شود؛ وضعیت تأیید محتوای آن تغییری نمی‌کند.",
    hide: document.hidden ? "سند دوباره در انتشار قابل نمایش می‌شود." : "سند در انتشار مخفی می‌شود؛ دسترسی در پنل مستقل می‌ماند.",
    "delete-password": "رمز عبور انتشار این سند نمونه برداشته می‌شود.",
    "delete-link": "لینک انتشار این سند نمونه غیرفعال می‌شود.",
  };
  return <form data-test-id="doc-confirm-form" id={formId} className="space-y-3" onSubmit={event => {
    event.preventDefault();
    setDocument(current => ({ ...current,
      bookmarked: action === "bookmark" ? !current.bookmarked : current.bookmarked,
      deleted: action === "delete" || current.deleted,
      hidden: action === "hide" ? !current.hidden : current.hidden,
      password: action === "delete-password" ? "" : current.password,
      publishLink: action === "delete-link" ? "" : current.publishLink,
      versions: action === "publish-version" ? current.versions.map((version, i) => i === 0 ? { ...version, published: true } : version) : current.versions,
    })); done();
  }}>
    <p data-test-id="doc-confirm-description" className="text-xs leading-relaxed">{descriptions[action]}</p>
    <p data-test-id="doc-confirm-target" className="wrap-anywhere rounded-lg border border-white/40 bg-white/15 p-3 text-sm font-medium">{document.title}</p>
  </form>;
}
