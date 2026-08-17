import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("impresszum");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/impresszum",
    },
  };
}

export default async function ImpresszumPage() {
  const doc = await getLegalDoc("impresszum");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Impresszum", url: `${SITE_URL}/impresszum` },
        ])}
      />
      <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
    </>
  );
}
