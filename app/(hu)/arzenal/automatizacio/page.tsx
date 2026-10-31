import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame, LogLines } from "@/app/components/ServiceFrame";
import {
  SIZE_FAQ,
  SOFTWARE_FAQ,
  SOFTWARE_FEATURES, SOFTWARE_PITCH,
  SOFTWARE_LOG,
  SOFTWARE_SERVICE,
} from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Folyamat-automatizálás és egyedi szoftver cégeknek | THE GBR";
const DESCRIPTION =
  "A webshop, a számlázó, a CRM és a táblázatok összekötése kész eszközzel vagy saját kóddal. Belső rendszer, ügyfélportál, naplózással és hibariasztással.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SOFTWARE_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Folyamatfelmérés",
    body: "Írásban megkapod, melyik folyamatot érdemes automatizálni, és melyiket nem.",
  },
  {
    title: "Összekötés vagy saját fejlesztés",
    body: "Azt kötjük össze, ami már megvan. Kész eszközzel vagy saját kóddal, amelyik hosszabb távon olcsóbban fenntartható.",
  },
  {
    title: "Naplózás és hibariasztás",
    body: "Minden futás naplózódik, és hiba esetén riasztás megy, mert egy csendben leállt folyamat rosszabb, mint a kézi munka.",
  },
  {
    title: "Átadás dokumentációval",
    body: "Úgy adjuk át, hogy ne csak mi értsük. Az üzemeltetést és a továbbfejlesztést is visszük, ha kéred.",
  },
];

export default function Automatizacio() {
  return (
    <ServicePage
      n="03"
      railLabel="03 / Szoftver"
      name="Automatizáció és egyedi szoftver"
      path={SOFTWARE_SERVICE.path}
      schemaName={SOFTWARE_SERVICE.name}
      schemaDescription={SOFTWARE_SERVICE.description}
      kicker={SOFTWARE_PITCH.kicker}
      title="Folyamat-automatizálás: ami ma kézzel megy, holnap magától"
      lead={[
        "A legtöbb cégnél van valaki, aki naponta átmásol valamit egyik helyről a másikra: a rendeléseket a számlázóba, a megkereséseket egy táblázatba, a táblázatot a havi jelentésbe. Ez nem hiba, csak drága, és éppen akkor marad el, amikor a legnagyobb a hajtás.",
        <>
          <strong className="text-[var(--ink)]">
            Ezeket a rendszereket összekötjük, hogy a munka magától fusson.
          </strong>{" "}
          Ahol elég egy kész automatizációs eszköz, azt használjuk; ahol nem, saját kódot írunk. Ha
          egy folyamathoz nincs megfelelő szoftver, megépítjük: belső rendszert, ügyfélportált,
          adminfelületet.
        </>,
        "Ez az értékesítési rendszer gerince is: a megkeresés nem egy postafiókban alszik el, hanem egy helyre fut be, felelőssel.",
      ]}
      facts={SOFTWARE_PITCH.facts}
      angleTitle={SOFTWARE_PITCH.angleTitle}
      angle={SOFTWARE_PITCH.angle}
      ecosystemId="software"
      features={SOFTWARE_FEATURES}
      device={
        <DevFrame header="Egy automatizáció naplója" headerRight="Minta">
          <LogLines lines={SOFTWARE_LOG} />
          <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
            Szemléltetés. A lépések a folyamattól függenek.
          </p>
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={[
        "uzleti-automatizaciok",
        "kesz-eszkoz-vagy-sajat-szoftver",
        "supabase-b2b-architektura",
        "data-driven-b2b-ertekesites",
        "csendes-hiba",
      ]}
      faq={[...SOFTWARE_FAQ, SIZE_FAQ]}
    />
  );
}
