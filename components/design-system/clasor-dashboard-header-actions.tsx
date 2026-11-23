"use client";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ShieldCheck, Bell, MessageSquare, UserRound, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { HeaderDialog, type HeaderDialogKind } from "./header-dialogs/dialog";
import { useStatusToast } from "@/components/ui/status-toast";
import { initialHeaderInvitations, type HeaderInvitation } from "./header-dialogs/model";
export function ClasorDashboardHeaderActions({ initialInvitations, isAdmin = true, accountOnly = false, appearance }: { initialInvitations?: HeaderInvitation[]; isAdmin?: boolean; accountOnly?: boolean; appearance?: ReactNode }) {
  const [opened, setOpened] = useState<{ kind: HeaderDialogKind; trigger: HTMLElement | null } | null>(null);
  const [items, setItems] = useState(initialInvitations ?? initialHeaderInvitations);
  const [status, setStatus] = useState("");
  const [signedOut, setSignedOut] = useState(false);
  const headerGroup = useRef<HTMLDivElement>(null);
  const toast = useStatusToast();
  const userTrigger = useRef<HTMLButtonElement>(null);
  const focusUser = useRef(false);
  useLayoutEffect(() => { if (focusUser.current && !signedOut) { focusUser.current = false; userTrigger.current?.focus(); } }, [signedOut]);
  const pending = items.filter(item => item.state === "pending").length;
  function open(kind: HeaderDialogKind, origin: HTMLElement | null) { setOpened({ kind, trigger: origin }); setStatus(""); }
  return <div data-test-id="dashboard-header-actions" ref={headerGroup} tabIndex={-1} className="flex flex-wrap items-center justify-end gap-1.5" role="group" aria-label="ابزارهای حساب کاربر">
    {isAdmin && !accountOnly && !signedOut && <Button data-test-id="dashboard-header-admin" nativeButton={false} render={<Link data-test-id="dashboard-header-admin" href="/clasor-pages/admin" target="_blank" rel="noreferrer" />} variant="glass" size="icon" aria-label="پنل ادمین کلاسور، بازشدن در تب جدید" title="پنل ادمین · تب جدید"><ShieldCheck aria-hidden="true" /></Button>}
    {!signedOut && <>
      {!accountOnly && <>
      <IconButton data-test-id="dashboard-header-requests" variant="glass" aria-label={`لیست درخواست‌ها، ${pending} دعوت`} title="لیست درخواست‌ها" aria-haspopup="dialog" aria-expanded={opened?.kind === "requests"} onClick={event => open("requests", event.currentTarget)}>
        <Bell aria-hidden="true" />{pending > 0 && <span data-test-id="header-requests-indicator" aria-hidden="true" className="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-purple-600 shadow-[0_0_0_2px_rgb(255_255_255/0.7)] dark:bg-purple-300" />}
      </IconButton>
      <IconButton data-test-id="dashboard-header-feedback" variant="glass" aria-label="ارسال نظر و بازخورد" title="بازخورد" aria-haspopup="dialog" aria-expanded={opened?.kind === "feedback"} onClick={event => open("feedback", event.currentTarget)}><MessageSquare aria-hidden="true" /></IconButton>
      </>}
      <DropdownMenu>
        <DropdownMenuTrigger ref={userTrigger} data-test-id="dashboard-header-user" render={<IconButton data-test-id="dashboard-header-user" variant="glass" aria-label="حساب کاربر" title="حساب کاربر" />}>
          <Avatar data-test-id="dashboard-header-avatar" className="size-6"><AvatarImage data-test-id="dashboard-header-avatar-image" src="/avatars/preview-user.svg" alt="" /><AvatarFallback data-test-id="dashboard-header-avatar-fallback"><UserRound aria-hidden="true" /></AvatarFallback></Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-test-id="dashboard-header-account-menu" dir="rtl" align="end" surface="liquid" className="min-w-40 text-xs">
          <DropdownMenuGroup data-test-id="dashboard-header-account-group">
          <DropdownMenuLabel data-test-id="dashboard-header-profile" className="text-xs">کاربر نمونه</DropdownMenuLabel>
          <DropdownMenuSeparator data-test-id="dashboard-header-account-separator" />
          {appearance && <DropdownMenuItem data-test-id="dashboard-header-profile-open" onClick={() => open("profile", userTrigger.current)}><UserRound aria-hidden="true" />اطلاعات حساب</DropdownMenuItem>}
          <DropdownMenuItem data-test-id="dashboard-header-logout" onClick={() => open("logout", userTrigger.current)}><LogOut aria-hidden="true" />خروج از حساب</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>}
    {signedOut && <Button data-test-id="dashboard-header-login" variant="outline" size="sm" onClick={() => { focusUser.current = true; setSignedOut(false); setStatus("به پیش‌نمایش خوش آمدید."); }}><LogIn aria-hidden="true" />ورود به پیش‌نمایش</Button>}
    <span data-test-id="dashboard-header-status" role="status" className="sr-only">{status}</span>
    {opened && <HeaderDialog key={opened.kind} kind={opened.kind} appearance={appearance} items={items} trigger={opened.trigger} fallbackFocusRef={headerGroup} close={() => setOpened(null)}
      onDecision={(id, state) => { setItems(current => current.map(item => item.id === id ? { ...item, state } : item)); if (state === "rejected") toast.show("درخواست پیوستن رد شد."); }}
      onFeedback={() => { setStatus("بازخورد شما در پیش‌نمایش ثبت شد."); toast.show("بازخورد شما در پیش‌نمایش ثبت شد.", { type: "success" }); setOpened(null); }}
      onLogout={() => { setSignedOut(true); setOpened(null); setStatus("از حساب نمایشی خارج شدید."); }} />}
  </div>;
}
