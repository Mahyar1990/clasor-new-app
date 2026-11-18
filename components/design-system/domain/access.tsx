"use client";
import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { GlassModal } from "@/components/ui/GlassModal";
import { RowActionMenu } from "@/components/ui/row-action-menu";
import { useStatusToast } from "@/components/ui/status-toast";
import { DomainCollection, useDomainQuery } from "./collection";
import { DomainPerson } from "./shared";
import { DomainConfirmation } from "./confirmation";
import { matchesDomainQuery, uniqueUsername } from "./queries";
import { useDomain } from "./store";
import type { DomainUser } from "./model";
function AddUser({ trigger, close }: { trigger: HTMLElement; close: () => void }) {
  const anchor = useRef(trigger);
  const formId = useId();
  const { state, setState } = useDomain();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  return <GlassModal testId="domain-add-user-dialog" title="افزودن کاربر پادی" description="دسترسی مدیریت دامنه؛ بدون انتخاب نقش" themeAnchorRef={anchor} open compact surface="liquid" size="sm" onOpenChange={open => { if (!open) close(); }} finalFocus={() => trigger.isConnected ? trigger : true} footer={<><Button data-test-id="domain-user-cancel" size="sm" variant="outline" onClick={close}>انصراف</Button><Button data-test-id="domain-user-submit" size="sm" type="submit" form={formId}>افزودن</Button></>}>
    <form data-test-id="domain-user-form" id={formId} onSubmit={event => { event.preventDefault(); if (!uniqueUsername(username, state.users.map(user => user.username))) { setError("نام کاربری معتبر و غیرتکراری وارد کنید؛ حروف لاتین، عدد، نقطه، خط تیره یا زیرخط."); return; } const name = username.trim().replace(/^@/, ""); setState(current => ({ ...current, users: [...current.users, { id: crypto.randomUUID(), username: name, name }] })); close(); }}>
      <TextField data-test-id="domain-user-username" label="نام کاربری پادی" description="نام کاربری را وارد کنید. اطلاعات این نمونه به سرویس کاربران متصل نیست." dir="ltr" autoFocus required maxLength={64} value={username} onValueChange={value => { setUsername(value); setError(""); }} error={error} />
    </form>
  </GlassModal>;
}
export function DomainAccess() {
  const { state, setState } = useDomain();
  const [query, setQuery] = useDomainQuery();
  const [add, setAdd] = useState<HTMLElement | null>(null);
  const [remove, setRemove] = useState<{ user: DomainUser; trigger: HTMLElement | null } | null>(null);
  const heading = useRef<HTMLDivElement>(null);
  const toast = useStatusToast();
  const items = state.users.filter(user => matchesDomainQuery({ ...query, filters: {} }, [query.filters.field === "username" ? user.username : query.filters.field === "name" ? user.name : `${user.name} ${user.username} ${user.id}`], {}));
  return <div data-test-id="domain-access-host" ref={heading} tabIndex={-1}>
    <DomainCollection title="کاربران دارای دسترسی" testId="domain-access" query={query} onQueryChange={setQuery} items={items} filters={[{ id: "field", label: "جستجو در", options: [{ value: "all", label: "نام، نام کاربری و شناسه" }, { value: "name", label: "نام" }, { value: "username", label: "نام کاربری پادی" }] }]} action={<Button data-test-id="domain-add-user" size="sm" onClick={event => setAdd(event.currentTarget)}><Plus aria-hidden="true" className="size-3!" />افزودن کاربر</Button>} columns={[
      { id: "name", label: "نام کاربر", render: row => <DomainPerson user={row} /> },
      { id: "username", label: "نام کاربری پادی", width: 180, render: row => <bdi data-test-id={`domain-username-${row.id}`}>{row.username}</bdi> },
      { id: "actions", label: "عملیات", kind: "actions", render: row => <RowActionMenu fallbackFocusRef={heading} rowLabel={row.name} items={[{ id: "delete", label: "حذف دسترسی", destructive: true, onSelect: () => setRemove({ user: row, trigger: heading.current }) }]} /> },
    ]} />
    {add && <AddUser trigger={add} close={() => setAdd(null)} />}
    {remove && <DomainConfirmation title="حذف دسترسی کاربر" description={`دسترسی ${remove.user.name} به مدیریت دامنه حذف شود؟`} trigger={remove.trigger} close={() => setRemove(null)} confirm={() => { heading.current?.focus(); setState(current => ({ ...current, users: current.users.filter(user => user.id !== remove.user.id) })); toast.show("دسترسی کاربر حذف شد.", { type: "success" }); }} />}
  </div>;
}
