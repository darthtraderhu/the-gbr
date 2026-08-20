---
title: "Miért épít saját terméket egy ügynökség?"
date: "2026-09-17"
category: "Fejlesztés"
excerpt: "Építettünk egy pénzügyi nyilvántartót — magunknak. Aztán kiderült, hogy a vállalkozóknak ugyanaz hiányzik: nem a könyvelés, hanem a rálátás."
---

Egy ügynökség általában más cégeknek épít szoftvert. Leszállítja, számláz, továbbmegy. Ha fél év múlva elromlik valami, jön egy e-mail, és megjavítja.

**Mi elkezdtünk magunknak is építeni** — és ez többet tanított, mint húsz ügyfélprojekt.

## Hogyan kezdődött

Kereskedem. És mint a legtöbb kereskedő, én is táblázatban vezettem a naplómat.

Egy idő után feltűnt, hogy **nem bízom benne.** Nem azért, mert hazudtam magamnak — hanem mert a táblázatban minden átírható. Egy rossz nap utólag kicsit jobbnak tűnt. Egy elrontott kereskedés lemaradt. Fél év múlva szép volt a kimutatás, de nem tudtam, mennyire igaz.

**Ez nem jellemhiba, hanem szerkezeti probléma.** Ha a napló engedi az átírást, az emlékezet ki fogja használni.

Elkezdtem megcsinálni azt, amit magam is használnék. Így lett belőle a **Gimbal**.

## Az elv, ami mindent meghatározott

A Gimbal nem táblázat, hanem **könyvelési logikára épül.**

Ha egyszer rögzítettél egy tételt, az ott marad. Javítani lehet — de a javítás **új sor, nem felülírás.** Pont úgy, ahogy a könyvelésben: egy elrontott bizonylatot nem radírozol ki, hanem ellentételezel.

Ez kényelmetlenebb. És pontosan ezért működik: hat hónap múlva az adat arról szól, ami történt, nem arról, amire emlékezni szeretnél.

**A technikai megvalósítás fontos része:** az adatbázisban trigger tiltja a módosítást a könyvelési sorokon. Nem beállítás és nem szabály a kódban — **az adatbázis szintjén nem megy.** Így akkor sem sérülhet, ha valaki később hibás kódot ír fölé.

Ez az a fajta döntés, ami egy sablonra épülő projektben soha nem születik meg.

## Amit menet közben megtanultunk

### A pénz nem tizedes tört

Egy pénzügyi alkalmazásban a legcsendesebb hiba a kerekítés. Ha lebegőpontos számmal dolgozol, előbb-utóbb lesz egy fillér, ami eltűnik — vagy megjelenik. Egyetlen tranzakciónál észrevehetetlen, ezerötszáznál viszont már nem stimmel az összesítés.

**Egész egységekben számolunk**, és több mint száz automatikus teszt figyeli, hogy a matematika helyes maradjon.

Ez a fajta gondosság egy ügyfélprojektbe ritkán fér bele — vagy legalábbis ritkán kérik. **A sajátodnál nincs kifogás**, és onnantól már tudod, hogyan kell csinálni.

### A jogi rész nem toldalék

Amikor pénzügyi adatot gyűjtesz — még ha csak néhány embertől is —, az teljesen más kategória, mint egy kapcsolati űrlap.

A Gimbalnál külön oda kellett figyelni arra, hogy **az alkalmazás ne csússzon át befektetési tanácsadásba.** Az elemző funkció mintázatokat mutat a saját adatokból — de ez könnyen olvasható tanácsként, és a tanácsadás Magyarországon engedélyköteles tevékenység.

**A megoldás nem egy jogi oldal mélyén elrejtett kizárás**, hanem az, hogy az érintett képernyőn, közvetlenül a szöveg mellett ott áll: ez megfigyelés, nem javaslat.

Ezt a szemléletet azóta minden ügyfélprojektbe visszük — és nem egyszer előfordult már, hogy egy ügyfél weboldalán olyan állítást találtunk, amit jobb volt kivenni, mielőtt valaki rákérdez.

### Az üzemeltetés más, mint a fejlesztés

Amíg csak szállítasz, a projekt véget ér. Ha üzemeltetsz is, sosem.

**Ez a legfontosabb, amit a saját termék tanított.** Amikor a te rendszered van élesben, és nincs kire mutogatni, másképp gondolkodsz a hibakezelésről, a naplózásról, a mentésről és arról, mi történik, ha valami elszáll hajnali kettőkor.

## És kiderült, hogy nem csak kereskedőknek kell

Menet közben megmutattam néhány vállalkozónak. A visszajelzés mindenhol ugyanaz volt: *„nekem is pont ez hiányzik, csak nem kereskedésre."*

Mert a probléma ugyanaz. Egy vállalkozó is táblázatban vezeti a számait — ha vezeti egyáltalán. A pénz jön és megy, a könyvelő áprilisban szól, hogy márciusban baj volt, és **közben senki nem tudja megmondani, hol tart a cég ma.**

**Nem a könyvelés hiányzik. Az megvan.** Hanem a rálátás: hogy mennyi jött be a hónapban, mennyi megy ki jövő héten, ki tartozik és mióta — és a legfontosabb kérdés, amire a legtöbb vállalkozó nem tudja a választ:

> **Meddig bírom, ha holnaptól nem jön be egy forint sem?**

A Gimbal ezt kiszámolja. Nem becslésből — a saját, rögzített adataidból.

**Ezért lett belőle két üzemmód:** ugyanaz a rendszer, ugyanaz a szigor, csak más adatokkal. Egy vállalkozónál bevétel, kiadás, kintlévőség, futamidő. Egy kereskedőnél napi eredmény, kifizetés, mintázatok.

**Ugyanaz az elv mindkettőben:** amit rögzítettél, az ott marad. Nincs utólagos szépítés, nincs „majd kijavítom". Ettől lesz használható fél év múlva is.

## Miért mondjuk el ezt

Nem azért, hogy a Gimbalt eladjuk — zárt bétában van, és nem is ez a fő üzletünk.

**Hanem azért, mert ez a különbség.**

Egy ügynökség portfóliója megmutatja, mi készült el. Nem mutatja meg, hogy mi lett vele fél évvel később — pedig ott dől el, hogy jó volt-e a munka.

Nálunk erre is van válasz: **a saját termékeinket magunk üzemeltetjük.** Minden döntést, amit az ügyfeleinknek javaslunk, előbb magunkon próbálunk ki. Ha valami nem működik, először nálunk derül ki — nem az ügyfélnél.

**Ez a legdrágább minőségbiztosítás, amit egy ügynökség csinálhat.** És egyben a legőszintébb.

---

A Gimbal jelenleg **zárt bétában** fut, és keresünk hozzá vállalkozókat, akik kipróbálnák.

A béta ingyenes, és aki most csatlakozik, annak az is marad. Cserébe egyetlen dolgot kérünk: mondd meg őszintén, mi a baja.

[Írj egy sort](/init), és küldjük a hozzáférést. Vagy nézd meg, [mit építünk és üzemeltetünk másoknak](/arzenal#ops).
