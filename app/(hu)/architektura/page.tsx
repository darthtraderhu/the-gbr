import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import ArchitekturaClient from "./ArchitekturaClient";

const DESCRIPTION =
  "Három tipikus felállás weboldal-fejlesztéstől a folyamatos üzemeltetésig, plusz a Pulzus havi figyelő szolgáltatás. Tervezd meg a keretet, és nézd meg, mit kapsz érte.";

export const metadata: Metadata = {
  title: "Csomagok és árazás | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/architektura",
    languages: { hu: "/architektura", en: "/en/engagement", "x-default": "/architektura" },
  },
  openGraph: {
    title: "Csomagok és árazás | THE GBR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Csomagok és árazás | THE GBR",
    description: DESCRIPTION,
  },
};

export default function ArchitekturaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Csomagok", url: `${SITE_URL}/architektura` },
        ])}
      />
      <ArchitekturaClient />
    </>
  );
}
