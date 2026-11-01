import { ogImage, OG_SIZE } from "@/lib/og";
import { EN_SERVICE_PAGES } from "@/lib/szolgaltatasok-en-pages";

export const alt = "THE GBR service";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return EN_SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = EN_SERVICE_PAGES.find((p) => p.slug === slug) ?? EN_SERVICE_PAGES[0];
  return ogImage({
    topLabel: `Services / ${page.n}`,
    titleLine1: page.ogLines[0],
    titleLine2: page.ogLines[1],
    subtitle: page.schemaDescription,
  });
}
