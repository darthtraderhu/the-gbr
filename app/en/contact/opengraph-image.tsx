import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Start a conversation | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Contact",
    titleLine1: "Start a",
    titleLine2: "conversation",
    subtitle: "Tell us what you need and we'll reply within two business days. If we're not a fit, we'll say that too.",
  });
}
