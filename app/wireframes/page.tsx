import type { Metadata } from "next";
import Wireframes from "@/components/wireframes";

export const metadata: Metadata = {
  title: "وایرفریم مدیریت اسناد | کلاسور",
  description: "پیش‌نمایش تعاملی چیدمان و مسیرهای مدیریت اسناد کلاسور",
};

export default function WireframesPage() {
  return <Wireframes />;
}
