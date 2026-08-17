import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import InitProtocolClient from "./InitProtocolClient";

export const metadata: Metadata = {
  title: "Projekt Indítása | THE GBR",
  description:
    "Indítsd el a kapcsolatfelvételt a THE GBR-rel: mondd el, mi a helyzet most, mekkora a kereted, és két munkanapon belül jelentkezünk.",
  alternates: {
    canonical: "/init",
  },
  openGraph: {
    title: "Projekt Indítása | THE GBR",
    description: "Indítsd el a kapcsolatfelvételt a THE GBR-rel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projekt Indítása | THE GBR",
    description: "Indítsd el a kapcsolatfelvételt a THE GBR-rel.",
  },
};

export default function InitPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Projekt Indítása", url: `${SITE_URL}/init` },
        ])}
      />
      <InitProtocolClient />
    </>
  );
}
