"use client";
import { LogIn, PanelsTopLeft, Rss, Search, UserRound } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { HelpTooltip } from "./help-tooltip";
import { glass } from "@/lib/design-system/classes";
export interface PublicHeaderUser { name: string; avatar?: string }
export function PublicHeaderActions({ user, panelHref, onLogin, onProfile, onNewsletter, onSearch, testId, guestProfile = false }: { user: PublicHeaderUser | null; panelHref: string; onLogin: () => void; onProfile: () => void; onNewsletter: () => void; onSearch: () => void; testId: string; guestProfile?: boolean }) {
  return <div data-test-id={testId} className="flex flex-wrap items-center gap-1.5">
    <HelpTooltip content="خبرنامه"><Button data-test-id={`${testId}-newsletter`} size="icon-sm" variant="outline" aria-label="خبرنامه" onClick={onNewsletter}><Rss aria-hidden="true" /></Button></HelpTooltip>
    <HelpTooltip content="جستجوی پیشرفته"><Button data-test-id={`${testId}-search`} size="icon-sm" variant="outline" aria-label="جستجوی پیشرفته" onClick={onSearch}><Search aria-hidden="true" /></Button></HelpTooltip>
    <a data-test-id={`${testId}-panel`} href={panelHref} className={`${glass.navigation} inline-flex min-h-8 items-center gap-1.5 px-2 text-[11px]`}><PanelsTopLeft aria-hidden="true" className="size-3.5" />ورود به پنل</a>
    {!user && <Button data-test-id={`${testId}-login`} variant="outline" size="sm" onClick={onLogin}><LogIn aria-hidden="true" />ورود</Button>}
    {(user || guestProfile) && <Button data-test-id={`${testId}-profile`} variant={user ? "plain" : "outline"} size="icon-sm" aria-label={user ? `حساب کاربری ${user.name}` : "حساب کاربری مهمان"} aria-haspopup="dialog" onClick={onProfile}>
      {user ? <Avatar data-test-id={`${testId}-avatar`}><AvatarImage data-test-id={`${testId}-avatar-image`} src={user.avatar} alt={user.name} /><AvatarFallback data-test-id={`${testId}-avatar-fallback`}><UserRound aria-hidden="true" className="size-4" /></AvatarFallback></Avatar> : <UserRound aria-hidden="true" className="size-4" />}
    </Button>}
  </div>;
}
