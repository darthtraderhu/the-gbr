import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/contact",
      languages: { hu: "/init", en: "/en/contact", "x-default": "/init" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default function EnglishContact() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "Contact", url: `${SITE_URL}/en/contact` },
        ])}
      />
      <ContactClient />
    </>
  );
}
