import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame, FindingsTable } from "@/app/components/ServiceFrame";
import { IT_FAQ, IT_FEATURES, IT_PITCH, IT_SAMPLE_ROWS, IT_SERVICE, SIZE_FAQ } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Irodai IT-üzemeltetés és rendszergazda cégeknek | THE GBR";
const DESCRIPTION =
  "Rendszergazdai szolgáltatás kis és nagyobb irodáknak: felmérés írásos összefoglalóval, távfelügyelet, szerver, hálózat, VPN, levelezés, Microsoft 365 és Teams. IT-partnerünkkel, aki 15 éve üzemeltet irodai rendszereket.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: IT_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Felmérés",
    body: "Megnézzük, mi van most: gépek, hálózat, fiókok, mentés, levelezés. Írásban megkapod, mit találtunk és mit javasolunk.",
  },
  {
    title: "Te döntöd el, mit bízol ránk",
    body: "A felmérés alapján megmondjuk, mekkora rendszeres munkát kíván a rendszeretek. Ha keveset, azt is.",
  },
  {
    title: "Üzemeltetés távfelügyelettel",
    body: "Rákapcsolódunk a gépekre, nem kell kiszállásra várni. A szervertől a nyomtatón át a munkatársak telefonjáig egy helyen intézzük.",
  },
];

export default function ItUzemeltetes() {
  return (
    <ServicePage
      n="09"
      railLabel="09 / IT"
      name="Irodai IT-üzemeltetés"
      path={IT_SERVICE.path}
      schemaName={IT_SERVICE.name}
      schemaDescription={IT_SERVICE.description}
      kicker={IT_PITCH.kicker}
      title="Irodai IT-üzemeltetés, amire nem kell gondolnod"
      lead={[
        "Egy irodában ritkán az a gond, hogy nincs informatika. Inkább az, hogy senki nem látja egészben: ki fér hozzá mihez, van-e mentés, és kit kell hívni, ha reggel nem indul a levelezés.",
        <>
          <strong className="text-[var(--ink)]">IT-partnerünkkel végezzük</strong>, aki 15 éve
          üzemeltet informatikai rendszereket kis és nagyobb irodáknak, home office-ban dolgozó
          csapatoknak, a szervertől a nyomtatón át a munkatársak telefonjáig. A kapcsolattartó
          ilyenkor is mi vagyunk: neked nem kell két beszállítót egyeztetned.
        </>,
      ]}
      facts={IT_PITCH.facts}
      angleTitle={IT_PITCH.angleTitle}
      angle={IT_PITCH.angle}
      ecosystemId="it"
      cta={IT_PITCH.cta}
      features={IT_FEATURES}
      device={
        <DevFrame header="Amit egy IT-felmérés tipikusan talál" headerRight="Minta">
          <FindingsTable
            rows={IT_SAMPLE_ROWS}
            note="Illusztráció. A tényleges lista a felmérés után áll össze, irodánként eltér."
          />
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={["ki-fer-hozza-a-ceges-fiokokhoz", "sajat-fajlmegoszto"]}
      faq={[...IT_FAQ, SIZE_FAQ]}
    />
  );
}
