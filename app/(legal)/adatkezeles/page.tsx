import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("adatkezeles");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/adatkezeles",
    },
  };
}

export default async function AdatkezelesPage() {
  const doc = await getLegalDoc("adatkezeles");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Adatkezelés", url: `${SITE_URL}/adatkezeles` },
        ])}
      />
      <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
    </>
  );
}
