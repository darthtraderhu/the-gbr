---
title: "A többnyelvű oldal nem fordítási feladat"
date: "2026-10-01"
category: "Fejlesztés"
excerpt: "Mielőtt angolra fordítanád az oldaladat, egyetlen kérdésre kell válaszolni: kinek szól? Ha erre nincs válasz, a fordítás pénzkidobás — és mi is pont ezen a kérdésen mentünk végig."
---

„Kellene rá egy angol verzió is." Ez a mondat majdnem minden magyar cégnél elhangzik egyszer. Aztán vagy elmarad, vagy megcsinálják — és ott áll egy angol oldal, amiről senki nem tudja, kinek szól.

**A többnyelvűség nem fordítási feladat, hanem piaci döntés.** Mi is most mentünk végig rajta a saját oldalunkkal, és menet közben derült ki, hogy a nehéz része nem a nyelv.

## Az első kérdés, amit senki nem tesz fel

**Miért kell angol verzió?**

Két válasz létezik, és nagyon különböznek.

**„Hogy komolyabbnak látsszunk."** Ez legitim indok, de akkor mondjuk ki: ez arculati döntés, nem üzleti. Ilyenkor elég egy tisztességes fordítás, és nem kell tovább gondolkodni.

**„Mert konkrét piacot célzunk."** Ez viszont teljesen más munka — és itt kezdődik a valódi kérdés.

**Ha a második a válasz, akkor a következő kérdés az, hogy pontosan kit.** És innentől a fordítás a legkisebb tétel.

## Ugyanaz az oldal, más vevő, más érvelés

A saját példánkon a legegyszerűbb elmagyarázni.

**A magyar oldalunk cégvezetőknek szól** — annak, akinek van vállalkozása, és weboldal vagy webshop kell neki. Ott az működik, hogy húsz év értékesítési tapasztalat áll a cég mögött, hogy magyar cég vagyunk, hogy elérhető a székhelyünk.

**Az angol oldal viszont ügynökségeknek szól** — olyanoknak, akiknek már megvan az ügyfél, csak nincs kapacitásuk megcsinálni.

**Ez teljesen más vevő.** Őt nem érdekli, hány éve vagyunk a magyar piacon — azt nem tudja értelmezni. Őt az érdekli, hogy:

- Az EU-n belül vagyunk-e, mert akkor nincs adattovábbítási papírmunka
- Ugyanabban az időzónában dolgozunk-e
- Olcsóbbak vagyunk-e, mint egy saját alkalmazott
- Ugyanaz a fejlesztő marad-e végig a projekten

**Egyik érvet sem lehet lefordítani a magyar oldalról, mert egyik sincs rajta.** És fordítva: a magyar oldal legerősebb mondatai angolul semmit nem mondanának.

## Amit ugyanígy meg lehet tartani

Nem minden változik. **Ami tényleg megkülönböztet, az nyelvfüggetlen.**

Nálunk a főoldal megméri magát: a látogató böngészője kiolvassa a betöltési időt, és odateszi egy átlag mellé. **Ez angolul ugyanolyan erős**, mert nem szöveg, hanem bizonyíték.

Ugyanígy megmarad az, hogy nem vállalunk el minden projektet. Egy ügynökségnek ez ugyanolyan szokatlan és ugyanolyan hiteles, mint egy magyar cégvezetőnek.

**A jó szabály:** ami tény vagy elv, az marad. Ami piaci kontextusra épül, azt újra kell gondolni.

## Melyik régió? Mert az sem mindegy

Az „angol" nem egy piac. Az legalább három, és mást várnak.

**Nyugat-Európa.** Közel van, ugyanaz a jogi keret, valós időben lehet beszélni. A bizalom gyorsabban épül, mert Magyarország „az EU keleti fele" — ismerős fogalom. **Ez a legkönnyebb belépő.**

**Egyesült Királyság.** Hasonló, de a Brexit óta több az adminisztráció, és az EU-tagságunk már nem közös nevező.

**Egyesült Államok.** Ott a legjobb az árszint, de a bizalom lassabban épül, a szerződéses keret bonyolultabb, és erős a latin-amerikai verseny, amelynek ráadásul jobb az időzónája.

**És ez a szövegen is látszik.** Ugyanaz az érv más megfogalmazást kíván: egy holland ügynökségnek *„ugyanaz a munkanap"*, egy amerikainak *„amíg te alszol, mi dolgozunk"*. Egy mondat különbség — de a fordítóprogram ezt nem tudja eldönteni.

## A félig lefordított oldal rosszabb, mint az egynyelvű

Ez a leggyakoribb hiba, amivel találkozunk.

Valaki lefordítja a főoldalt meg a szolgáltatásokat, aztán a blog, a jogi oldalak és a kapcsolati űrlap magyar marad. **A látogató két kattintás után idegen nyelvű oldalon áll**, és nem érti, hogy most akkor ez egy angol cég, vagy nem.

**Jobb kevesebbet lefordítani, de teljesen.** Nálunk például a cikkeknek csak egy része létezik angolul — azok, amik az ügynökségi olvasónak szólnak. A többi meg sem jelenik az angol listában. **Nem hiány, hanem válogatás.**

A jogi dokumentumokat pedig szándékosan nem fordítottuk le. Nem fordítási feladat: jogi kérdés, hogy melyik joghatóság feltételei vonatkoznak egy külföldi ügyfélre. Amíg erre nincs válasz, az angol oldal egy magyarázó mondattal a magyar dokumentumokra mutat — **ez őszintébb, mint egy félreérthető fordítás.**

## A technikai rész, amit el szoktak rontani

Három dolog van, ami elrontja a többnyelvű oldal keresőoptimalizálását, és mindhárom gyakori.

**Nincs `hreflang`.** Enélkül a Google nem tudja, hogy a két oldal ugyanaz két nyelven — és duplikált tartalomnak nézheti. **Ez a leggyakoribb hiba.**

**Megváltoznak a meglévő URL-ek.** Sokan a nyelvi réteg bevezetésekor minden magyar címet átteszik `/hu/` alá. Ezzel egy csapásra elveszítik a felépített indexeltséget, hacsak nem oldják meg tökéletesen az átirányításokat.

**A helyes megoldás:** a meglévő nyelv marad ott, ahol van, prefix nélkül. Az új nyelv kap prefixet.

**Automatikus nyelvfelismerés átirányítással.** Ha az oldal az IP-cím vagy a böngésző nyelve alapján automatikusan átdob valakit, azzal két bajt okoz: a Google robotja nem látja mindkét verziót, és a felhasználó sem tud választani. **Ajánld fel a váltást, de ne kényszerítsd.**

## Egy részlet, ami többet ér, mint gondolnád

Amikor a saját angol oldalunkat építettük, kiderült valami, amit előre nem terveztünk: **a kapcsolati űrlap visszaigazoló e-mailje magyarul ment volna ki.**

Egy nyugat-európai ügynökség kitölti az angol űrlapot, aztán kap egy magyar nyelvű levelet. **Ez az egész oldal célját aláásta volna** — pontosan azt a benyomást rombolja, amit felépítettünk.

**A többnyelvűség nem ér véget a weboldalnál.** Ott van még az automatikus e-mail, a hibaüzenet, a visszaigazolás, a hírlevél. Ezek mind részei annak, ahogy a cég megjelenik — és pont ezekről feledkeznek meg a leggyakrabban.

## A teszt, amit érdemes elvégezni

Mielőtt bárki fordításba kezd, három kérdésre kell válasz:

**Melyik piac?** Nem „külföld", hanem konkrétan: Németország, Egyesült Királyság, Egyesült Államok.

**Ki a vevő?** Nem „külföldi ügyfél", hanem: ügynökség, végfelhasználó, viszonteladó — mert mindháromnak más érv kell.

**Miért téged választana?** Ha erre a válasz ugyanaz, mint a hazai piacon, akkor valószínűleg nem gondoltad végig.

**Ha mindháromra van válaszod, a fordítás már a könnyebbik fele.** Ha nincs, akkor a fordítással megveszed a látszatot — de nem az eredményt.

---

Ha többnyelvű oldalon gondolkodsz, [írd le, mit szeretnél elérni](/init). Az első beszélgetésen kiderül, hogy fordítás kell, vagy valami más.
