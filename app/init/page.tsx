import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import InitProtocolClient from "./InitProtocolClient";

const DESCRIPTION =
  "Mondd el, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.";

export const metadata: Metadata = {
  title: "Beszéljünk a projektedről | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/init",
  },
  openGraph: {
    title: "Beszéljünk a projektedről | THE GBR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Beszéljünk a projektedről | THE GBR",
    description: DESCRIPTION,
  },
};

export default function InitPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Kapcsolat", url: `${SITE_URL}/init` },
        ])}
      />
      <InitProtocolClient />
    </>
  );
}
