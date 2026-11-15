import type { Metadata } from "next";
import PersonalDocuments from "@/components/workspace/personal-documents";

export const metadata: Metadata = { title: "اشتراکی‌ها | کلاسور" };
export default function SharedPage() { return <PersonalDocuments scope="shared" />; }
