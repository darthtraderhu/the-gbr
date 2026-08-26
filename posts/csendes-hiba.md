---
title: "A hiba, ami nem szól"
date: "2026-09-15"
category: "Fejlesztés"
excerpt: "Van egy hibafajta, amitől nem áll le semmi, nem jön hibaüzenet, és senki nem panaszkodik. Fél év múlva viszont magasabb a számla, és nem tudni, miért."
---

Amikor egy rendszer elromlik, azt általában észreveszed. Fehér képernyő, hibaüzenet, telefonál egy ügyfél.

**Van viszont egy másik fajta hiba, ami sokkal drágább — mert nem szól.**

Nem áll le semmi. A képernyőn minden rendben. A művelet sikeresnek látszik. **Csak épp nem történt meg.**

És mire kiderül, addigra hónapok teltek el, és senki nem tudja, mikor kezdődött.

## Egy konkrét eset

Nemrég építettünk magunknak egy fájlmegosztó felületet — azt, amivel az ügyfeleinknek küldjük a videókat és a jelentéseket, ahelyett hogy egy külső szolgáltatón keresztül mennénk.

Van benne egy törlés gomb. Egyszerű funkció: eltűnik a küldemény, eltűnnek a fájlok.

Kipróbáltuk. **Működött. A felületről eltűnt minden.**

Aztán megnéztük a tárhelyet is.

**A fájlok ott voltak.**

## Mi történt valójában

A rendszer, ahol a fájlokat tároljuk, a törléskor nem hibát adott vissza — hanem **üres választ.** Semmit.

A kód pedig azt látta, hogy nincs hiba, tehát továbbment: kitörölte a nyilvántartásból a bejegyzést, és jelentette, hogy kész.

**A fájl viszont ottmaradt a tárhelyen. Örökre.**

Nem tudott róla senki, nem látszott sehol, és **fizettük volna a helyét minden hónapban.**

## Miért ez a legdrágább hibafajta

Számoljunk egy pillanatra.

Ha egy ügynökség hetente küld pár videót, és mondjuk minden ötödik küldemény ilyen csendben ragad be, akkor **egy év alatt több száz gigabájt gyűlik össze** olyan fájlokból, amikről senki nem tud.

A számla lassan nő. Nem ugrik meg, nem tűnik fel. Csak jövőre valaki megkérdezi, hogy miért ennyi a tárhelydíj — és nincs rá válasz.

**És ez még a jobbik eset**, mert csak pénz.

**A rosszabbik:** ha ugyanez a hibafajta egy webshopban van, akkor nem fájlok ragadnak be, hanem **elveszett rendelések, elmaradt e-mailek, rögzítetlen adatok.** Ugyanaz a szerkezet: a rendszer azt mondja, hogy sikerült, és nem sikerült.

## A tanulság, ami minden rendszerre igaz

**Nem elég azt ellenőrizni, hogy nem jött hibaüzenet.**

Azt kell ellenőrizni, hogy **a művelet tényleg megtörtént-e.**

A kettő között óriási a különbség, és a legtöbb rendszer csak az elsőt csinálja — mert az egyszerűbb, gyorsabb, és a tesztelésen átmegy.

Nálunk a törlés most így működik: a fájlok eltávolítása után **visszakérdez, hogy tényleg eltűntek-e**, és csak akkor megy tovább, ha igen. Ha nem, akkor szól — hangosan.

## Egy döntés, amiről ritkán beszélnek

Volt még valami, ami első ránézésre részletkérdés, de valójában pénzben mérhető.

**Mi legyen, ha a folyamat közepén elakad valami?**

Kétféleképp dőlhet:

**Az egyik irányban** a nyilvántartás kiürül, a fájl marad. Ilyenkor van egy láthatatlan fájl, amiről senki nem tud, és amiért fizetsz — **örökre, mert soha nem fogod megtalálni.**

**A másik irányban** a fájl tűnik el, és marad egy bejegyzés, ami már nem mutat sehova. Csúnya — **de látszik, ingyen van, és egy kattintással rendbe tehető.**

**Ezért a fájlok törlése megy előbb.**

Ez a fajta döntés az, ami nem látszik a kész terméken, nem szerepel az ajánlatban, és mégis eldönti, hogy egy rendszer két év múlva jól működik-e vagy szivárog.

## Miért írjuk le ezt

Nem azért, mert a fájlmegosztó nagy dolog. **Hanem mert ez a hiba a saját rendszerünkön derült ki, nem az ügyfelünkén.**

Ez a különbség aközött, hogy valaki leszállít egy weboldalt, és aközött, hogy üzemelteti is. Aki csak épít, sosem találkozik ezekkel — mert mire előjönnek, ő már régen továbbment.

**Mi a saját rendszereinket magunk működtetjük.** Nem portfólióból: azért, mert ott derül ki, hol rejtőznek ezek a hibák — és mire a te rendszeredhez érünk, már tudjuk, hol keressük őket.

---

## Egy kérdés, amit érdemes feltenned

Ha most építtetsz vagy építtettél valamit, tedd fel annak, aki csinálja:

> **„Ha egy művelet nem sikerül, honnan fogom megtudni?"**

Ha a válasz az, hogy „majd jelez a rendszer", akkor kérdezz vissza: **és ha nem jelez?**

Mert a hibák egy része sosem jelez. Azokat csak úgy lehet elkapni, ha valaki előre gondolt rájuk.

[Írd le, min dolgozol](/init) — az első beszélgetésen kiderül, van-e olyan pont a rendszeredben, ahol csendben szivároghat valami.
