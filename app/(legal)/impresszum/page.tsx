import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("impresszum");
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function ImpresszumPage() {
  const doc = await getLegalDoc("impresszum");
  return <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />;
}
