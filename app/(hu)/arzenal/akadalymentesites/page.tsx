import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame, FindingsTable } from "@/app/components/ServiceFrame";
import {
  ACCESS_FAQ,
  ACCESS_FEATURES, ACCESS_PITCH,
  ACCESS_SAMPLE_ROWS,
  ACCESS_SERVICE,
  SIZE_FAQ,
} from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal-akadálymentesítés: felmérés és javítás | THE GBR";
const DESCRIPTION =
  "Technikai akadálymentesítési felmérés és javítás: kontraszt, billentyűzetes bejárhatóság, képernyőolvasó, űrlapok, feliratozás. Írásos jelentéssel a változásokról.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ACCESS_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Felmérés",
    body: "Megnézzük, mi akadályozza a használatot, és mennyire súlyos.",
  },
  {
    title: "Javítás",
    body: "Kontraszt, betűméret, kattintható felületek, billentyűzetes bejárhatóság, képernyőolvasó, űrlapok és feliratok.",
  },
  {
    title: "Írásos jelentés",
    body: "A végén írásban megkapod, mi változott. A jogi megfelelésről ügyvéd nyilatkozik, nem mi.",
  },
];

export default function Akadalymentesites() {
  return (
    <ServicePage
      n="07"
      railLabel="07 / Akadálymentesítés"
      name="Akadálymentesítés"
      path={ACCESS_SERVICE.path}
      schemaName={ACCESS_SERVICE.name}
      schemaDescription={ACCESS_SERVICE.description}
      kicker={ACCESS_PITCH.kicker}
      title="Akadálymentesítés: van, aki most nem tudja használni az oldaladat"
      lead={[
        <>
          Aki képernyőolvasót használ, csak billentyűzettel navigál, gyengébben lát vagy remeg a
          keze, ugyanúgy vásárolna, csak sokszor nem tud.{" "}
          <strong className="text-[var(--ink)]">Ők nem panaszt tesznek, hanem elmennek.</strong>{" "}
          Nem azért, mert az oldal rossz, hanem mert senki nem gondolt rájuk a tervezésekor.
        </>,
        <>
          Emellett az uniós akadálymentesítési szabályozás 2025 óta a fogyasztóknak szóló online
          szolgáltatásokra is kiterjed. Hogy ez pontosan kire és hogyan vonatkozik, azt jogász
          mondja meg;{" "}
          <strong className="text-[var(--ink)]">
            mi a technikai oldalt mérjük fel és tesszük rendbe
          </strong>
          .
        </>,
      ]}
      facts={ACCESS_PITCH.facts}
      angleTitle={ACCESS_PITCH.angleTitle}
      angle={ACCESS_PITCH.angle}
      ecosystemId="access"
      cta={ACCESS_PITCH.cta}
      features={ACCESS_FEATURES}
      device={
        <DevFrame header="Amit egy felmérés tipikusan talál" headerRight="Minta">
          <FindingsTable
            rows={ACCESS_SAMPLE_ROWS}
            note="Illusztráció. A tényleges lista a felmérés után áll össze, oldalanként eltér."
          />
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={["akadalymentesites"]}
      faq={[...ACCESS_FAQ, SIZE_FAQ]}
    />
  );
}
