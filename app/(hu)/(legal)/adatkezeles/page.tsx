import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import LegalDoc from "../LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("adatkezeles");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/adatkezeles",
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
      <LegalDoc doc={doc} />
    </>
  );
}
