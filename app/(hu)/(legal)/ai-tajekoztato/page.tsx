import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import LegalDoc from "../LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("ai-tajekoztato");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/ai-tajekoztato",
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
    },
  };
}

export default async function AiTajekoztatoPage() {
  const doc = await getLegalDoc("ai-tajekoztato");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "AI-tájékoztató", url: `${SITE_URL}/ai-tajekoztato` },
        ])}
      />
      <LegalDoc doc={doc} />
    </>
  );
}
