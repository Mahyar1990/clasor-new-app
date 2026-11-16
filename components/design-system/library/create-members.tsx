"use client";
import { useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
export interface CreationMember { id: string; name: string; role: string }
const roles = ["مدیر", "ویرایشگر", "نویسنده", "بیننده"].map(value => ({ value, label: value }));
export function CreationMembers({ value, onChange }: { value: CreationMember[]; onChange: (members: CreationMember[]) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("بیننده");
  const [error, setError] = useState("");
  return <div data-test-id="creation-members" className="space-y-3">
    <div data-test-id="creation-members-add" className="grid grid-cols-[minmax(0,1fr)_6rem_auto] items-end gap-2">
      <TextField data-test-id="create-member-name" label="شناسه پادی" value={name} onValueChange={setName} />
      <SelectField data-test-id="create-member-role" label="نقش" value={role} onValueChange={setRole} options={roles} />
      <Button className="h-[var(--control-height)]" data-test-id="create-member-add" size="sm" disabled={!name.trim()} onClick={() => { if (value.some(item => item.name === name.trim())) { setError("این کاربر قبلاً اضافه شده است."); return; } onChange([...value, { id: crypto.randomUUID(), name: name.trim(), role }]); setName(""); setError(""); }}>افزودن</Button>
    </div>
    <p data-test-id="creation-members-error" role="alert" className="text-xs text-danger">{error}</p>
    {value.map(member => <div data-test-id={`creation-member-${member.id}`} key={member.id} className="flex items-end gap-2 border-b border-white/25 py-2"><span data-test-id={`creation-member-name-${member.id}`} className="min-w-0 flex-1 truncate pb-2 text-xs">{member.name}</span><div data-test-id={`creation-member-role-wrap-${member.id}`} className="w-24"><SelectField data-test-id={`creation-member-role-${member.id}`} label="نقش" value={member.role} options={roles} onValueChange={role => onChange(value.map(item => item.id === member.id ? { ...item, role } : item))} /></div><Button data-test-id={`creation-member-remove-${member.id}`} variant="plain" size="icon" aria-label={`حذف ${member.name}`} onClick={() => onChange(value.filter(item => item.id !== member.id))}><Trash2 aria-hidden="true" /></Button></div>)}
    {!value.length && <p data-test-id="creation-members-empty" className="text-xs text-muted-foreground">افزودن همکار اختیاری است؛ بعداً هم می‌توانید مخزن را به اشتراک بگذارید.</p>}
  </div>;
}
