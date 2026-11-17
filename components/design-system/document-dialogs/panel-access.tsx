"use client";
import { useState } from "react";
import { RecipientPicker } from "@/components/ui/RecipientPicker";
import { FormActions } from "@/components/ui/FormActions";
import { Button } from "@/components/ui/button";
import { panelRecipientOptions, prunePanelRecipients } from "../library/document-state";
import { useDocumentPreview } from "./context";
export function PanelAccess() {
  const { document, setDocument, repository } = useDocumentPreview();
  const options = panelRecipientOptions(repository);
  const [value, setValue] = useState(prunePanelRecipients(document.blocked, repository));
  const [message, setMessage] = useState("");
  return <div data-test-id="document-panel-access" className="space-y-3"><p data-test-id="panel-access-help" className="text-xs text-muted-foreground">کاربران و گروه‌هایی را که نباید این سند را در پنل مخزن ببینند، انتخاب کنید. دعوت‌های پذیرفته‌نشده عضو مخزن محسوب نمی‌شوند.</p><RecipientPicker testId="panel-access-recipients" options={options} value={value} onValueChange={setValue} /><FormActions data-test-id="panel-access-actions"><Button data-test-id="panel-access-save" onClick={() => { setDocument(current => ({ ...current, blocked: prunePanelRecipients(value, repository) })); setMessage("محدودیت‌های پنل ذخیره شد."); }}>ذخیره محدودیت‌ها</Button><Button data-test-id="panel-access-clear" variant="outline" onClick={() => setValue([])}>پاک‌کردن انتخاب‌ها</Button></FormActions><p data-test-id="panel-access-status" role="status" className="text-xs text-success">{message}</p></div>;
}
