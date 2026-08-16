<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# THE GBR — projekt kontextus

Ez a fájl azért van, hogy ne kelljen minden munkamenetben újra felderíteni a projektet. Ha valami itt elavul, javítsd.

## Mi ez

A thegbr.eu a GBR Marketing Solutions Kft. (márkanév: THE GBR) weboldala — full-stack B2B ügynökség. Az oldal a cég névjegye: minden állításnak, amit a szolgáltatásoldalak tesznek, az oldalon implementálva is kell lennie.

Ez nem stílus kérdése. Ha a `/seo` oldal dinamikus sitemapet és JSON-LD-t hirdet, akkor annak működnie kell — különben a szakmai ígéret elveszti a fedezetét.

**Éles:** Vercelen fut, a domain élő.

## Stack

- Next.js 16 (App Router) / React 19 / TypeScript (`strict: true`)
- Tailwind
- Markdown tartalom gray-matter-rel (`lib/posts.ts`)
- OpenAI API az AI chathez (`app/api/chat/route.ts`)
- Kapcsolati űrlap: Formspree (átmeneti — saját pipeline-ra készül átállni)
- Hosting: Vercel · Levelezés: Rackhost (MX ne kerüljön felülírásra!)

## Mappastruktúra

```
app/                 route-ok (App Router)
  api/               chat, autopilot
  init/              kapcsolatfelvételi wizard — szándékosan nincs rajta Navbar és Footer
  hirek/[id]/        dinamikus cikkoldalak
components/          megosztott komponensek (Navbar, Footer, AiChat)
content/legal/       jogi szövegek markdownban — INNEN jönnek a jogi oldalak
posts/               blog markdown
lib/                 posts.ts és segédfüggvények
public/              statikus fájlok
design/              arculati anyagok, mockupok (nem build-részei)
```

## Konvenciók

- Egy komponens, egy hely. A Navbar és a Footer a `layout.tsx`-ből jön. Soha ne renderelj lokális `<header>`-t vagy `<footer>`-t oldalanként — ez korábban 5 oldalon duplikálva volt, felszámoltuk.
- Az `/init` kivétel: nincs rajta Navbar és Footer (`pathname === "/init"`), mert fókuszált konverziós folyamat.
- Minden oldalnak saját `metadata` exportja van — egyedi title és description. Öröklött globális cím nem elfogadható.
- Nincs `any`. Külső bemenetet (API body, frontmatter) Zoddal validálunk, nem type assertionnel.
- Betűtípus kizárólag `next/font`-tal. Google Fonts `@import` tilos — korábban 5 oldalon duplán töltődött, felszámoltuk.
- Képek `next/image`-dzsel. Külső domainről hotlinkelni tilos.
- Animációnál mindig `prefers-reduced-motion`.
- Kommentek és UI-szövegek magyarul.

## Arculat (2026. 08. — döntés)

A korábbi sötét/neon terminál-esztétikáról világos „műszer" irányra váltunk. Az anyagok a `design/` mappában: arculati koncepció, főoldal-mockup, hero prototípus.

Logó: szövegjel-elsődleges — THE GBR + lime pont. A körös szimbólum csak négyzetes helyen (favicon, profilkép), mert 32 px alatt nem olvasható.

Színek (design tokenként kezelendő, ne hardcode-olva):

| szerep | érték |
|---|---|
| alap | `#EEF0EC` |
| panel | `#FFFFFF` |
| tinta | `#14171A` |
| másodlagos | `#697079` |
| vonal | `#D4D8D1` |
| jelzés (lime) | `#93B300` |
| figyelem | `#B8501C` |

Tipográfia, három szerep:

- **Display:** Archivo (600/700, szoros betűköz)
- **Törzsszöveg:** Source Serif 4
- **Adat és címke:** IBM Plex Mono — csak számokon és metaadatokon, sosem folyószövegben

Montserrat, scanline/sweep/radar animációk és a transparenttextures.com hotlink kivezetendő.

## Ismert hibák, amiken dolgozunk

Részletes lista: `the-gbr-feladatlista.md`. A legfontosabbak:

- `/api/autopilot` cron-guard: ha a `CRON_SECRET` hiányzik, a `Bearer undefined` átjut az ellenőrzésen. Kell egy explicit korai kilépés.
- `/api/chat` nyitott: nincs rate limit, origin-ellenőrzés, méretkorlát → költség-DoS kockázat.
- Nincs `app/sitemap.ts` és `app/robots.ts` — pedig a `/seo` oldal ezt hirdeti.
- Nincs JSON-LD sehol — ugyanez.
- Nincs canonical URL.
- Az `/init` sikerképernyője hardcode-olt (`sys.status: 200_OK`) — nem valós szerverválaszból jön. Javítandó valós állapotkezelésre.
- `AntiCopy.tsx` törlendő — jobbklikk/F12 tiltás, ami semmit nem véd.
- Nincsenek biztonsági HTTP fejlécek a `next.config.ts`-ben.
- Nincs `error.tsx` / `not-found.tsx`.

## Amit soha ne csinálj

- Ne írj felül DNS MX rekordot (a levelezés a Rackhostnál van).
- Ne tegyél titkot `NEXT_PUBLIC_` prefixszel env-változóba.
- Ne állíts noindex-et a jogi oldalakra — azok indexelhetők.
- Ne találj ki jogi szöveget. A jogi tartalom a `content/legal/` fájlokból jön.
- Ne írj olyat a szolgáltatásoldalakra, amit az oldal maga nem valósít meg.

## Döntési jogkör

Kérdezés nélkül elvégezhető:
- Formázás, elnevezés, mappastruktúra a fenti konvenciók szerint
- Kód törlése, ha a feladat azt kéri (nem kell megerősítés)
- Csomag telepítése, ha a feladathoz szükséges
- Olvasó jellegű shell parancsok (curl, grep, ls, git status, build)
- Több fájl egyidejű módosítása, ha ugyanaz a hiba több helyen van

Kérdezz, mielőtt megcsinálod:
- Adatbázis-séma vagy adatvesztéssel járó művelet
- Új külső szolgáltatás bevezetése (fizetős vagy adatot kap)
- Jogi vagy marketingszöveg tartalmi módosítása
- Bármi, ami az élő deployt érinti

Ha egy feladat több módon is megoldható, VÁLASSZ egyet a fenti konvenciók alapján, csináld meg, és a végén jelezd, mit választottál és miért. Ne kérdezz rá előre.

Ha egy javítás során további, kapcsolódó hibát találsz, azt is javítsd ki, és a végén sorold fel. Ne kérj rá külön engedélyt.
