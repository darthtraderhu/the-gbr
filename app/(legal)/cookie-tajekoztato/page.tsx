import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import LegalDoc from "../LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("cookie-tajekoztato");
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/cookie-tajekoztato",
    },
  };
}

export default async function CookieTajekoztatoPage() {
  const doc = await getLegalDoc("cookie-tajekoztato");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Cookie-tájékoztató", url: `${SITE_URL}/cookie-tajekoztato` },
        ])}
      />
      <LegalDoc doc={doc} />
    </>
  );
}
