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

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const entry = catalogueSections.find(item => item.id === section);
  if (!entry) notFound();
  return <CataloguePage section={entry.id} />;
}
