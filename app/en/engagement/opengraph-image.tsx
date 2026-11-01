import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "How we work | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "How we work",
    titleLine1: "How",
    titleLine2: "we work",
    subtitle: "Three engagement models for agencies: fixed-scope projects, retained capacity, and build-and-operate.",
  });
}
