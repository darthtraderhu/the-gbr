import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { TERMEKEK, formatFt } from "@/lib/gyors-indulas";
import ArchitekturaClient from "./ArchitekturaClient";

// A belépő ár a fix áras termékek legkisebbike (ugyanaz, mint a főoldalon),
// szerveren számolva, hogy a termékadat ne kerüljön a kliens-csomagba.
const BELEPO_AR = formatFt(Math.min(...TERMEKEK.map((t) => t.arNetto)));

const DESCRIPTION =
  "Weboldal-, webshop- és üzemeltetési csomagok, amelyek a megkeresést az értékesítési rendszerbe hozzák, plusz a Pulzus havi figyelő. Nagy munkára nincs árlista; fix áron átvilágítással kezdheted.";

export const metadata: Metadata = {
  title: "Csomagok és árazás: weboldal, webshop, üzemeltetés | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/architektura",
    languages: { hu: "/architektura", en: "/en/engagement", "x-default": "/architektura" },
  },
  openGraph: {
    title: "Csomagok és árazás: weboldal, webshop, üzemeltetés | THE GBR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Csomagok és árazás: weboldal, webshop, üzemeltetés | THE GBR",
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
      <ArchitekturaClient belepoAr={BELEPO_AR} />
    </>
  );
}
