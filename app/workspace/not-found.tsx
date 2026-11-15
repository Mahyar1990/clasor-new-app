import { cn } from "@/lib/utils";
import { glass } from "@/lib/design-system/classes";
import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function WorkspaceNotFound() {
  return <section data-test-id="not-found-section-1" className={cn("ws-empty", glass.panel)}><FileSearch size={36} aria-hidden="true" /><h1 data-test-id="not-found-h1-2">سند یا مخزن پیدا نشد</h1><p data-test-id="not-found-p-3">نشانی این مورد در نسخه نمونه وجود ندارد.</p><Link data-test-id="not-found-link-4" className="ws-textLink" href="/workspace/documents">بازگشت به اسناد من</Link><Link data-test-id="not-found-link-5" className="ws-textLink" href="/workspace/repositories">مرور مخزن‌ها</Link></section>;
}
