import type { Metadata } from "next";
import RepositoryList from "@/components/workspace/repository-list";

export const metadata: Metadata = { title: "مخزن‌ها | کلاسور" };
export default function RepositoriesPage() { return <RepositoryList />; }
