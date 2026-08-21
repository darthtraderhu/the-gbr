import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSortedEnPostsData } from "@/lib/posts-en";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import WritingClient from "./WritingClient";

// Ugyanaz a napi ISR, mint a magyar /hirek-nél — az ütemezett angol cikkek
// (posts-en/) is a dátumuk napján jelenjenek meg, új deploy nélkül.
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.writing" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/writing",
      languages: { hu: "/hirek", en: "/en/writing", "x-default": "/hirek" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default function EnglishWriting() {
  const allPostsData = getSortedEnPostsData();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "Writing", url: `${SITE_URL}/en/writing` },
        ])}
      />
      <WritingClient posts={allPostsData} />
    </>
  );
}
