import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("ai-tajekoztato");
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function AiTajekoztatoPage() {
  const doc = await getLegalDoc("ai-tajekoztato");
  return <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />;
}
