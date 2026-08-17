import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import ArchitekturaClient from "./ArchitekturaClient";

export const metadata: Metadata = {
  title: "Digitális Architektúra & ROI Kalkulátor | THE GBR",
  description:
    "Tervezd meg a digitális architektúrád és számold ki a várható megtérülést a THE GBR ROI motorjával. Web Presence, Scale & E-Comm és Full-Stack Autopilot csomagok.",
  alternates: {
    canonical: "/architektura",
  },
  openGraph: {
    title: "Digitális Architektúra & ROI Kalkulátor | THE GBR",
    description: "Tervezd meg a digitális architektúrád, és számold ki a várható megtérülést.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitális Architektúra & ROI Kalkulátor | THE GBR",
    description: "Tervezd meg a digitális architektúrád, és számold ki a várható megtérülést.",
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
