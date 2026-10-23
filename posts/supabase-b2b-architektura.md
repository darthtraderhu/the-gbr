---
title: "Ügyfélportál, belső rendszer: mi kell egy megbízható háttérhez?"
date: "2026-06-20"
updated: "2026-10-23"
category: "Fejlesztés"
excerpt: "Egy partnerportál vagy belső rendszer értékét nem a felülete adja, hanem az, hogy az adatok biztonságban vannak, és mindenki csak azt látja, amit kell. Ennek a háttere a Supabase-hez hasonló platformokkal ma gyorsabban felépíthető."
---

Amikor egy cég partnerportált, rendelésfelvevő felületet vagy belső nyilvántartást építtet, a beszélgetés többnyire a képernyőkről szól: mi hol legyen, hogyan nézzen ki.

**A rendszer valódi értéke viszont a háttérben van:** hol vannak az adatok, ki fér hozzájuk, és mi történik, ha valami elromlik.

## Amit egy jó háttérnek tudnia kell

**Hozzáférés-kezelés.** Minden felhasználó csak a saját adatait lássa. Egy partner ne férjen hozzá egy másik partner rendeléseihez, akkor se, ha a felületen valaki ügyesen átír egy linket.

**Biztonságos belépés.** Jelszó helyett vagy mellett belépési link e-mailben, vagy belépés egy meglévő céges fiókkal.

**Mentés és visszaállítás.** Nem elég, hogy van mentés. Tudni kell, hogy vissza is lehet állítani belőle.

**Naplózás.** Ha valaki módosít egy adatot, utólag is látszódjon, ki volt és mikor.

## Miért használunk ehhez kész platformot?

Ezeket mind meg lehet írni nulláról, de nem érdemes. A Supabase egy nyílt forráskódú platform, ami PostgreSQL adatbázisra épül, és kész megoldást ad a belépésre, a hozzáférés-szabályokra és a fájltárolásra. Az adatbázis EU-s régióban is futtatható.

Ez azt jelenti, hogy a fejlesztési idő nagy része arra mehet, ami a cégnek egyedi: a folyamatokra és a felületre. Nem kell újra feltalálni a belépést.

## Amire figyelni kell

**A hozzáférési szabályokat végig kell gondolni.** A platform megadja az eszközt, de hogy ki mit láthat, azt a projekt elején pontosan le kell írni, és tesztelni is kell.

**Az üzemeltetés nem marad el.** Egy kész platform is igényel figyelmet: frissítéseket, mentések ellenőrzését, a költségek követését.

---

Ha portált vagy belső rendszert terveztek, [írd le, mit kellene tudnia](/init). Megmondjuk, mire érdemes építeni. Részletek: [web és webshop](/arzenal#web).
