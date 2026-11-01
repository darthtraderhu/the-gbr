import { ogImage, OG_SIZE } from "@/lib/og";
import { AI_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "AI-chatbot emberi átadással | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 04",
    titleLine1: "AI-chatbot",
    titleLine2: "emberi átadással",
    subtitle: AI_SERVICE.description,
  });
}
