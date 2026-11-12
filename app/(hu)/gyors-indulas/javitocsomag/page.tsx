import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TermekOldal from "@/app/components/TermekOldal";
import { formatFt, getTermek, termekPath } from "@/lib/gyors-indulas";

const termek = getTermek("javitocsomag");

const TITLE = termek
  ? `${termek.name}: ${formatFt(termek.arNetto)} + ÁFA, ${termek.hatarido} | THE GBR`
  : "THE GBR";
const DESCRIPTION = termek?.summary ?? "";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: termekPath("javitocsomag") },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  if (!termek) notFound();
  return <TermekOldal termek={termek} />;
}
