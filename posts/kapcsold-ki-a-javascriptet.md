---
title: "Kapcsold ki a JavaScriptet, és nézd meg, mi marad: ennyit lát az AI a weboldaladból"
date: "2027-03-26"
category: "SEO és AEO"
excerpt: "Az AI-asszisztensek nem úgy nézik a weboldaladat, mint a vevőid. Nem látják a dizájnt, a képre írt szöveget, és sokszor azt sem, amit a böngésző csak utólag tölt be. Öt perc alatt megnézheted, mi jut el belőle hozzájuk."
---

Amikor a vevőd megnyitja a weboldaladat, képeket lát, színeket, mozgó elemeket, egy szépen felépített oldalt. **Amikor egy AI-asszisztens nézi meg ugyanazt az oldalt, ennek nagy részét nem látja.** Egy szöveges változatot kap, és abból dolgozik.

Hogy ebben a szöveges változatban mi marad, az dönti el, mit tud rólad mondani, ha valaki megkérdezi.

## Mit lát az AI a weboldaladból

Az AI-asszisztenseknek saját robotjaik vannak, amelyek letöltik az oldalakat. Ezek jellemzően ezt olvassák ki:

- **a szöveget**, ami az oldal forráskódjában ott van: címsorok, bekezdések, listák, táblázatok;
- **a címet és a leírást**, amit a keresőtalálatban is látsz;
- **a strukturált adatot**, vagyis a gépnek szóló cégadatot: név, cím, telefonszám, szolgáltatások, gyakori kérdések;
- **a linkeket**, amelyekből kiderül, milyen oldalaid vannak, és mi hogyan kapcsolódik;
- **a képek leírását**, ha van.

## Mit nem lát

Ami kimarad, azt nem fogja idézni. Akkor sem, ha a vevőid szerint az a legfontosabb rész.

- **A képre írt szöveget.** Ha az akció, a nyitvatartás vagy a szolgáltatásaid listája egy képbe van égetve, a robot annyit tud meg, hogy van ott egy kép.
- **A dizájnt.** Hogy prémium, megbízható vagy modern a cég, azt a robot nem a színekből olvassa ki, hanem abból, amit leírtál.
- **Amit a böngésző csak utólag tölt be.** Sok oldal úgy működik, hogy először egy szinte üres váz érkezik, és a tartalmat a JavaScript rakja bele a böngészőben. A legtöbb AI-robot a JavaScriptet nem futtatja, ezért ilyenkor az üres vázat kapja meg.
- **Ami bejelentkezés mögött van**, például a partneri árak vagy a letölthető anyagok.
- **Amit a robots.txt kitilt.** Ebben a fájlban mondja meg az oldal, melyik robot mit nézhet meg. Néha egy régi beállítás vagy egy biztonsági bővítmény az AI-robotokat is kizárja, és erről senki nem tud.

## Az öt perces próba

Nem kell fejlesztőnek lenned, hogy megnézd, mi jut el az oldaladból az AI-hoz.

1. **Nézd meg a forráskódot.** Nyisd meg a főoldaladat a böngészőben, és nyomd meg a Ctrl+U billentyűt (Macen: Cmd+Option+U). Ez az, amit a robot letölt. Keress rá a Ctrl+F-fel a cégneved mellett egy mondatra a főoldalról, a telefonszámodra és egy szolgáltatásod nevére. Ha nincs meg, a robot sem látja.
2. **Kapcsold ki a JavaScriptet.** A Chrome beállításaiban (Adatvédelem és biztonság → Webhelybeállítások → JavaScript) letilthatod a saját oldaladra, és újratöltheted. Ami így is ott marad, azt látja a robot. Ha az oldal üres, vagy csak a menü marad, akkor az AI-asszisztensek nagy valószínűséggel szinte semmit nem tudnak rólad.
3. **Próbáld kijelölni a szöveget.** Ha egy fontos mondatot az egérrel nem tudsz kijelölni, akkor az kép, nem szöveg.
4. **Nyisd meg a robots.txt-t.** Írd be a böngészőbe: `tedomained.hu/robots.txt`. Ha a GPTBot, az OAI-SearchBot, a ClaudeBot vagy a PerplexityBot neve mellett „Disallow: /” áll, az az AI-robot nem nézheti meg az oldalt.
5. **Kérdezd meg az AI-t.** Írd be a ChatGPT-be vagy a Geminibe: „Mit csinál a [céged neve]?”. Ha a válasz pontatlan vagy régi, nézd meg, mit talált az előző négy lépésben.

## Mit jelent ez a gyakorlatban

Ha a próba rendben van, az még nem jelenti, hogy az AI-asszisztensek ajánlani fognak. Azt jelenti, hogy **van miből jó választ adniuk.** Ha nincs rendben, akkor bármennyit dolgozol a tartalmon, az nem jut el hozzájuk.

A javítás sokszor nem nagy munka. A képre írt szövegből szöveg lesz. A robots.txt-ből kikerül egy sor. A főoldalra bekerül két mondat arról, mit csinálsz és kinek. Ahol viszont az egész oldal a böngészőben áll össze, ott a megoldás az oldal felépítésén múlik, nem egy beállításon.

## Hogyan csináljuk mi

Az általunk épített oldalak szerveroldalon állnak össze. A szöveg már abban a változatban ott van, amit a robot letölt, nem a böngésző rakja bele utólag. A robots.txt-ben az AI-asszisztensek robotjait név szerint is beengedjük, és a cégadatok gépileg olvasható formában is az oldalon vannak.

Ha a meglévő oldaladat szeretnéd megnézetni, az [átvilágításban](/arzenal/atvilagitas-es-ajanlas) ez is benne van. Ha azt is tudni akarod, mit mondanak ma rólad az AI-asszisztensek, azt az [AEO-felmérésben](/seo) mérjük meg.

---

Csináld meg a fenti öt lépést, és ha valamelyiknél elakadsz, [írd meg, melyiknél](/init). Megmondjuk, mi a következő lépés.
