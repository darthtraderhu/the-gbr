import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("szolgaltatasi-feltetelek");
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function SzolgaltatasiFeltetelekPage() {
  const doc = await getLegalDoc("szolgaltatasi-feltetelek");
  return <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />;
}
