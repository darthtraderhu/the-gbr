import type { ProposalPage } from "@/app/components/ProposalSample";

// Anonimizált oldalak egy 24 oldalas dizájnajánlásból — az /arzenal és az
// átvilágítás-aloldal mintablokkja. A márka, a terméknevek és az árak ki
// vannak takarva; ügyfélnevet ide se írj.
export const PROPOSAL_PAGES: ProposalPage[] = [
  {
    src: "/minta/dizajnajanlas/01-tartalom.webp",
    alt: "Dizájnajánlás tartalomjegyzéke tizenhat fejezettel",
    caption: "Tartalom",
  },
  {
    src: "/minta/dizajnajanlas/02-tipografia.webp",
    alt: "Tipográfiai fejezet: betűpár és arculati lap a látványtervből",
    caption: "Tipográfia",
  },
  {
    src: "/minta/dizajnajanlas/03-szinpaletta.webp",
    alt: "Színpaletta hat színnel és WCAG kontrasztarány-táblázattal",
    caption: "Színpaletta",
  },
  {
    src: "/minta/dizajnajanlas/04-fooldal.webp",
    alt: "A főoldal látványterve és szakaszonkénti felépítése",
    caption: "Főoldal",
  },
  {
    src: "/minta/dizajnajanlas/05-termekoldal.webp",
    alt: "A termékoldal látványterve lépésenkénti termékválasztóval",
    caption: "Termékoldal",
  },
];

export const PROPOSAL_INTRO =
  "Öt oldal egy 24 oldalas arculati és webdizájn-ajánlásból, amit egy kézműves webáruháznak készítettünk az oldaluk átvilágítása után: tipográfia, színpaletta kontrasztméréssel, főoldal- és termékoldal-látványterv. A márkát, a termékneveket és az árakat kitakartuk, mert az ügyfeleink anyagai nem nyilvánosak.";
