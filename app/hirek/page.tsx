import type { Metadata } from "next";
import { getSortedPostsData } from "../../lib/posts";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import HirekClient from "./HirekClient";

// A cikk-ütemezés (lib/posts.ts) miatt ez az oldal statikusan épül, de a
// tartalma naponta lejár — így egy ütemezett cikk a megadott napon (a
// következő beérkező kéréssel) automatikusan felkerül új deploy nélkül is.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Írások | THE GBR",
  description:
    "B2B marketing, Next.js fejlesztés és AI-integráció — amit megcsinálunk, arról írunk is.",
  alternates: {
    canonical: "/hirek",
  },
  openGraph: {
    title: "Írások | THE GBR",
    description: "B2B marketing, Next.js fejlesztés és AI-integráció.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Írások | THE GBR",
    description: "B2B marketing, Next.js fejlesztés és AI-integráció.",
  },
};

export default function Hirek() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Írások", url: `${SITE_URL}/hirek` },
        ])}
      />
      <HirekClient posts={allPostsData} />
    </>
  );
}
