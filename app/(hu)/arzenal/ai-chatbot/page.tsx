import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/app/components/ServicePage";
import { AI_FAQ, AI_FEATURES, AI_PITCH, AI_SERVICE, SIZE_FAQ } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "AI-chatbot a céges weboldalra | THE GBR";
const DESCRIPTION =
  "Chat a weboldalon, a saját tartalmadra hangolva, emberi átirányítással a komolyabb kérdéseknél. AI-tájékoztatóval, dokumentált adattovábbítással.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: AI_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Hangolás a saját tartalmadra",
    body: "A chat abból válaszol, ami a weboldaladon és az általad adott anyagokban szerepel.",
  },
  {
    title: "Átirányítás emberhez",
    body: "Ha a kérdés komoly, a chat emberhez irányít. Árat és határidőt ember mond.",
  },
  {
    title: "Jogi oldal",
    body: "Elkészül az AI-tájékoztató, és dokumentáljuk, milyen adat hova kerül.",
  },
];

export default function AiChatbot() {
  return (
    <ServicePage
      n="04"
      railLabel="04 / AI"
      name="AI-chatbot"
      path={AI_SERVICE.path}
      schemaName={AI_SERVICE.name}
      schemaDescription={AI_SERVICE.description}
      kicker={AI_PITCH.kicker}
      title="AI-chatbot, ami éjjel is válaszol, és tudja, mikor kell ember"
      lead={[
        <>
          Az AI nem varázslat, és nem helyettesíti az ügyfélszolgálatot.{" "}
          <strong className="text-[var(--ink)]">Egy jól betanított első vonal</strong>: a látogató
          éjjel is választ kap az egyszerű kérdésére, a komoly érdeklődő pedig eljut oda, ahol
          ember foglalkozik vele.
        </>,
        <>
          Ezen az oldalon is fut egy, kipróbálhatod. Az adattovábbítás részleteit az{" "}
          <Link href="/ai-tajekoztato" className="text-[var(--ink)] underline">
            AI-használati tájékoztató
          </Link>{" "}
          írja le.
        </>,
      ]}
      facts={AI_PITCH.facts}
      angleTitle={AI_PITCH.angleTitle}
      angle={AI_PITCH.angle}
      ecosystemId="ai"
      cta={AI_PITCH.cta}
      features={AI_FEATURES}
      steps={STEPS}
      relatedSlugs={["ai-ertekesitesi-asszisztens", "llm-es-chatbotok-b2b", "ai-forradalom"]}
      faq={[...AI_FAQ, SIZE_FAQ]}
    />
  );
}
