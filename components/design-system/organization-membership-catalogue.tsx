"use client";
import { useState } from "react";
import { Sample } from "./sample";
import { OrganizationProvider } from "./organization/store";
import { OrganizationPositions } from "./organization/positions";
import { OrganizationMembers } from "./organization/members";
import { ClasorTabs } from "@/components/ui/clasor-tabs";
import { GlassCard } from "@/components/ui/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
export function OrganizationMembershipCatalogue() {
  const [dark, setDark] = useState(false);
  return <Sample title="سمت با چند عضو و عضویت با سمت اجباری" description="ساخت سمت با افزودن چند کاربر، ویرایش مستقل اعضای سمت و انتخاب اجباری سمت هنگام افزودن فرد. داده‌ها متعلق به همین نمونه‌اند.">
    <label data-test-id="catalogue-position-members-dark-label" className="mb-3 flex items-center gap-2 text-xs"><Checkbox data-test-id="catalogue-position-members-dark" checked={dark} onCheckedChange={value => setDark(!!value)} />تم تیره محلی</label>
    <OrganizationProvider><GlassCard data-test-id="catalogue-position-members-surface" className={`${dark ? "dark" : ""} p-3`}>
      <ClasorTabs label="نمونه عضویت سازمانی" defaultValue="positions" testIds={{ tab: value => `catalogue-position-tab-${value}` }} items={[
        { value: "positions", label: "سمت‌ها و اعضا", content: <OrganizationPositions branchId="head-office" /> },
        { value: "members", label: "افراد شعبه", content: <OrganizationMembers branchId="head-office" /> },
      ]} />
    </GlassCard></OrganizationProvider>
  </Sample>;
}
