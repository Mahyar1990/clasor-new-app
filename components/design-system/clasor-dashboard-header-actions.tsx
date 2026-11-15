"use client";

import { useState } from "react";
import { ShieldCheck, Bell, MessageSquare, UserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassModal } from "@/components/ui/GlassModal";
import { TextareaField } from "@/components/ui/text-field";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const actions = [
  { id: "admin", label: "پنل ادمین", icon: ShieldCheck },
  { id: "requests", label: "لیست درخواست‌ها", icon: Bell },
  { id: "feedback", label: "بازخورد", icon: MessageSquare },
] as const;

export function ClasorDashboardHeaderActions() {
  const [opened, setOpened] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);
  const titles: Record<string, string> = { admin: "پنل ادمین", requests: "لیست درخواست‌ها", feedback: "بازخورد", profile: "اطلاعات کاربر", logout: "خروج از حساب" };
  return <div data-test-id="dashboard-header-actions" className="flex flex-wrap justify-end gap-1 sm:gap-2">
    {actions.map(({ id, label, icon: Icon }) => <Button data-test-id={`dashboard-header-${id}`} key={id} variant="outline" size="icon" aria-label={label} title={label} onClick={() => { setOpened(id); setSaved(false); }}><Icon aria-hidden="true" className="size-5" /></Button>)}
    <DropdownMenu>
      <DropdownMenuTrigger data-test-id="dashboard-header-user" render={<Button data-test-id="dashboard-header-user" variant="outline" size="icon" aria-label="حساب کاربر" title="حساب کاربر" />}><UserRound aria-hidden="true" className="size-5" /></DropdownMenuTrigger>
      <DropdownMenuContent dir="rtl" align="end">
        <DropdownMenuItem data-test-id="dashboard-header-profile" onClick={() => setOpened("profile")}>کاربر نمونه</DropdownMenuItem>
        <DropdownMenuItem data-test-id="dashboard-header-logout" onClick={() => setOpened("logout")}><LogOut aria-hidden="true" />خروج از حساب</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <GlassModal testId="dashboard-header-modal" open={opened !== null} onOpenChange={open => { if (!open) setOpened(null); }} title={titles[opened ?? ""] ?? "حساب کاربر"} description="پیش‌نمایش طراحی با داده‌های ساختگی">
      {opened === "admin" && <p data-test-id="dashboard-admin-note" className="text-sm leading-body">صفحه پنل ادمین در نمونه‌های بعدی اضافه می‌شود.</p>}
      {opened === "requests" && <p data-test-id="dashboard-requests-empty" className="text-sm leading-body">درخواستی برای پیوستن به مخزن‌های اشتراکی ندارید.</p>}
      {opened === "profile" && <div data-test-id="dashboard-profile-details" className="space-y-2 text-sm"><p data-test-id="dashboard-profile-name">نام: کاربر نمونه</p><p data-test-id="dashboard-profile-account">نوع حساب: نمایشی</p></div>}
      {opened === "logout" && <p data-test-id="dashboard-logout-note" className="text-sm leading-body">این حساب نمایشی است؛ حساب کلاسور شما در سایت اصلی تغییری نمی‌کند.</p>}
      {opened === "feedback" && <form data-test-id="dashboard-feedback-form" className="space-y-4" onSubmit={event => { event.preventDefault(); setSaved(true); }}>
        <TextareaField data-test-id="dashboard-feedback-text" label="بازخورد شما" value={feedback} onValueChange={value => { setFeedback(value); setSaved(false); }} rows={4} required />
        <p data-test-id="dashboard-feedback-note" className="text-xs text-muted-foreground">این فرم فقط برای بررسی تجربه است؛ پیامی به سرویس ارسال نمی‌شود.</p>
        <Button data-test-id="dashboard-feedback-submit" type="submit" disabled={!feedback.trim() || saved}>ثبت بازخورد نمونه</Button>
        {saved && <p data-test-id="dashboard-feedback-status" role="status" className="text-sm text-success">بازخورد در همین پیش‌نمایش ثبت شد.</p>}
      </form>}
    </GlassModal>
  </div>;
}
