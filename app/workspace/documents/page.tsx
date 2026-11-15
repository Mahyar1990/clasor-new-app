import type { Metadata } from "next";
import PersonalDocuments from "@/components/workspace/personal-documents";

export const metadata: Metadata = {
  title: "اسناد من | کلاسور",
  description: "مرور و سازمان‌دهی اسناد شخصی در نسخه نمونه کلاسور",
};

export default function PersonalDocumentsPage() {
  return <PersonalDocuments />;
}
