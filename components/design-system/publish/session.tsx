"use client";
import { createContext, useContext, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { GlassModal } from "@/components/ui/GlassModal";
import { Button } from "@/components/ui/button";
import type { PublicHeaderUser } from "@/components/ui/PublicHeaderActions";
import type { ReactionValue } from "@/components/ui/ReactionControl";
export interface PublishUser extends PublicHeaderUser { id: string; repositoryIds: string[] }
interface Session { user: PublishUser | null; signOut: () => void; requestLogin: (trigger?: HTMLElement | null) => void; votes: Record<string, ReactionValue>; vote: (id: string, value: ReactionValue) => void }
const Context = createContext<Session | null>(null);
const sessionKey = "clasor-publish-preview-signed-in";
const sessionEvent = "clasor-publish-preview-session";
const previewUser: PublishUser = { id: "person-0", name: "کاربر نمونه", avatar: "/avatars/preview-user.svg", repositoryIds: ["dashboard-repository-1"] };
function readSession() { try { return window.sessionStorage.getItem(sessionKey) === "1"; } catch { return false; } }
function subscribeSession(notify: () => void) { window.addEventListener("storage", notify); window.addEventListener(sessionEvent, notify); return () => { window.removeEventListener("storage", notify); window.removeEventListener(sessionEvent, notify); }; }
function storeSession(signedIn: boolean) { try { if (signedIn) window.sessionStorage.setItem(sessionKey, "1"); else window.sessionStorage.removeItem(sessionKey); } catch { /* Keep the in-memory preview usable when storage is unavailable. */ } window.dispatchEvent(new Event(sessionEvent)); }
export function PublishSessionProvider({ children, initialUser = null, persist = false }: { children: ReactNode; initialUser?: PublishUser | null; persist?: boolean }) {
  const [override, setUser] = useState<PublishUser | null | undefined>(initialUser ?? undefined);
  const savedSession = useSyncExternalStore(subscribeSession, readSession, () => false);
  const user = override !== undefined ? override : persist && savedSession ? previewUser : null;
  const [login, setLogin] = useState(false);
  const [votes, setVotes] = useState<Record<string, ReactionValue>>({});
  const trigger = useRef<HTMLElement | null>(null);
  const header = useRef<HTMLElement | null>(null);
  return <Context.Provider value={{ user, votes, signOut: () => { setUser(null); setVotes({}); if (persist) storeSession(false); }, requestLogin: origin => { trigger.current = origin ?? window.document.activeElement as HTMLElement; header.current = trigger.current?.closest<HTMLElement>('[data-test-id="publish-header-actions"]') ?? trigger.current; setLogin(true); }, vote: (id, value) => setVotes(current => ({ ...current, [id]: value })) }}>
    {children}
    <GlassModal testId="publish-login-dialog" title="ورود به کلاسور" description="پیش‌نمایش رابط کاربری؛ ورود واقعی به سرویس متصل نیست." open={login} onOpenChange={setLogin} themeAnchorRef={header} finalFocus={() => trigger.current?.isConnected ? trigger.current : header.current?.querySelector<HTMLButtonElement>('[data-test-id="publish-header-actions-profile"]') ?? true} compact surface="liquid" size="sm" footer={<Button data-test-id="publish-login-confirm" size="sm" onClick={() => { setUser(previewUser); if (persist) storeSession(true); setLogin(false); }}>ورود با حساب نمونه</Button>}>
      <p data-test-id="publish-login-note" className="text-xs leading-6">با حساب نمونه می‌توانید حالت تصویر کاربر، واکنش‌ها و دسترسی به پنل را بررسی کنید.</p>
    </GlassModal>
  </Context.Provider>;
}
export function usePublishSession() { const value = useContext(Context); if (!value) throw new Error("PublishSessionProvider is required"); return value; }
