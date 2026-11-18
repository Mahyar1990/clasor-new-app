import { FolderOpen, HardDrive, Users, FileText } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { adminTotals } from "./fixtures";
const number = (value: number) => value.toLocaleString("fa-IR");
export function AdminSummary({ loading = false, empty = false }: { loading?: boolean; empty?: boolean }) {
  const count = (value: number) => number(empty ? 0 : value);
  const storage = (value: number) => `${count(value)} گیگابایت`;
  return <section data-test-id="admin-summary" aria-label="آمار کلی سامانه" className="grid gap-3 md:grid-cols-2">
    <MetricCard testId="admin-repositories" title="مخزن‌ها" icon={<FolderOpen aria-hidden="true" className="size-4" />} loading={loading} metrics={[{ id: "total", label: "تعداد کل مخزن‌ها", value: count(adminTotals.repositories.total) }, { id: "super", label: "تعداد کل سوپر مخزن‌ها", value: count(adminTotals.repositories.super) }]} />
    <MetricCard testId="admin-storage" title="فضاهای ذخیره‌سازی" icon={<HardDrive aria-hidden="true" className="size-4" />} loading={loading} metrics={[{ id: "used", label: "استفاده‌شده", value: storage(adminTotals.storage.used) }, { id: "remaining", label: "مانده", value: storage(adminTotals.storage.remaining) }, { id: "total", label: "حجم کل", value: storage(adminTotals.storage.total) }]} />
    <MetricCard testId="admin-users" title="تعداد کاربران" icon={<Users aria-hidden="true" className="size-4" />} loading={loading} metrics={[{ id: "active", label: "کاربران فعال", value: count(adminTotals.users.active) }, { id: "inactive", label: "کاربران غیرفعال", value: count(adminTotals.users.inactive) }, { id: "total", label: "مجموع کاربران", value: count(adminTotals.users.total) }]} />
    <MetricCard testId="admin-documents" title="تعداد اسناد" icon={<FileText aria-hidden="true" className="size-4" />} loading={loading} metrics={[{ id: "public", label: "اسناد عمومی", value: count(adminTotals.documents.public) }, { id: "draft", label: "پیش‌نویس‌ها", value: count(adminTotals.documents.draft) }, { id: "total", label: "مجموع اسناد", value: count(adminTotals.documents.total) }]} />
  </section>;
}
