import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CataloguePage } from "@/components/design-system/catalogue-page";
import { catalogueSections } from "@/components/design-system/catalogue-sections";

export function generateStaticParams() {
  return catalogueSections.map(({ id }) => ({ section: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const entry = catalogueSections.find(item => item.id === section);
  return { title: entry ? `${entry.title} | سیستم طراحی کلاسور` : "بخش پیدا نشد" };
}

async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const entry = catalogueSections.find(item => item.id === section);
  if (!entry) notFound();
  return <CataloguePage section={entry.id} />;
}

export default function Page({ params }: { params: Promise<{ section: string }> }) {
  return <Suspense fallback={<p data-test-id="catalogue-route-loading" role="status" className="p-4 text-sm">در حال آماده‌سازی بخش طراحی…</p>}><SectionPage params={params} /></Suspense>;
}
