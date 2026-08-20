import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import LegalDoc from "../LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("szolgaltatasi-feltetelek");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/szolgaltatasi-feltetelek",
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

export default async function SzolgaltatasiFeltetelekPage() {
  const doc = await getLegalDoc("szolgaltatasi-feltetelek");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Szolgáltatási feltételek", url: `${SITE_URL}/szolgaltatasi-feltetelek` },
        ])}
      />
      <LegalDoc doc={doc} />
    </>
  );
}
