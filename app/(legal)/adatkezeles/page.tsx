import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("adatkezeles");
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function AdatkezelesPage() {
  const doc = await getLegalDoc("adatkezeles");
  return <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />;
}
