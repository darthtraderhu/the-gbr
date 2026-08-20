# THE GBR — két új szolgáltatás szövegezése

**Dátum:** 2026. 08. 18.
**Hova kerül:** `/arzenal` — a meglévő öt szolgáltatás mellé, 06. és 07. sorszámmal
**Név:** a figyelő szolgáltatás neve **Pulzus** — rendszeres mérés egy élő rendszeren

---

# ELŐSZÖR: A BEKÖTHETŐSÉG

Ez a szövegezés végig azt az elvet követi, amit az egész oldalon alkalmaztunk: **teljesítést állítunk, nem eredményt.**

Konkrétan ez azt jelenti, hogy sehol nem szerepel:

| Amit nem írunk | Miért |
|---|---|
| „Garantáljuk a megfelelést" | A megfelelés jogi minősítés, nem szolgáltatói ígéret |
| „Ügyfeleink átlagosan X%-kal…" | Nincs mögötte mért adat |
| „Az első helyre kerül a Google-ben" | Nem tőlünk függ |
| „Több vásárlót hoz" | Eredmény, nem teljesítés |
| „Megvédjük a bírságtól" | Nem tudjuk megvédeni |

**Amit helyette írunk:** mit mérünk, mit küldünk, milyen gyakran, és mit teszünk, ha valami nem stimmel.

**Ez nem óvatoskodás.** Az ellenőrizhető vállalás erősebb, mint a nem ellenőrizhető ígéret — és pontosan ez a pozicionálásod alapja.

---
---

# 06 · AKADÁLYMENTESÍTÉS

## Fejléc

> `06`
> **Akadálymentesítés**

## Címsor

> **Van, aki nem tudja használni az oldalát**

## Bevezető

> Aki képernyőolvasót használ, aki csak billentyűzettel navigál, akinek gyengébb a látása vagy remeg a keze — ők ugyanúgy vásárolnának, csak sokszor nem tudnak. Nem azért, mert az oldal rossz, hanem mert senki nem gondolt rájuk a tervezésekor.
>
> Emellett az uniós akadálymentesítési szabályozás 2025 óta a fogyasztóknak szóló online szolgáltatásokra is kiterjed. Hogy ez pontosan kire és hogyan vonatkozik, azt jogász mondja meg — **mi a technikai oldalt tudjuk felmérni és rendbe tenni.**

## Tételek

- Felmérés: mi akadályozza a használatot, és mennyire súlyos
- Kontraszt, betűméret, kattintható felületek mérete
- Billentyűzetes bejárhatóság, látható fókusz
- Képernyőolvasóval való használhatóság: szemantikus szerkezet, képleírások
- Űrlapok: érthető címkék, világos hibaüzenetek
- Videók feliratozása
- Írásos jelentés arról, mi változott

## Az eszköz — minta-hibalista

*(A szolgáltatás-blokk saját vizuális eleme, fehér panelen, monospace fejléccel: „Amit egy felmérés tipikusan talál")*

| Amit találunk | Mit jelent | Súly |
|---|---|---|
| Kontraszt 3,1:1 a gombokon | Gyengénlátónak nehezen olvasható | Magas |
| 47 kép leírás nélkül | Képernyőolvasó nem tudja felolvasni | Magas |
| Fókusz nem látszik | Billentyűzettel nem követhető, hol jár | Magas |
| Űrlapmezők címke nélkül | Nem derül ki, mit kell beírni | Közepes |
| Kattintható felület 28 px | Remegő kézzel, telefonon nehéz eltalálni | Közepes |

**Alá, apró szöveggel:**
> Illusztráció. A tényleges lista a felmérés után áll össze, oldalanként eltér.

## Ami külön hangsúlyos

**Egy megjegyzés, ami bizalmat épít, és jogilag is véd:**

> A megfelelés jogi kérdés, és arról ügyvéd nyilatkozik. Mi azt vállaljuk, hogy **a technikai akadályokat felmérjük, dokumentáljuk és megszüntetjük** — és hogy a végén írásban megkapja, mi változott.

---
---

# 07 · PULZUS

## Fejléc

> `07`
> **Pulzus**

## Címsor

> **Havonta egy levél arról, hogyan látja önt az internet**

## Bevezető

> A legtöbb weboldal elkészül, aztán senki nem nézi meg többé. Ha lelassul, ha lejár egy tanúsítvány, ha elromlik a kapcsolati űrlap — az derül ki, amikor egy ügyfél szól. Vagy nem derül ki.
>
> A Pulzus ezt figyeli helyette — havonta megméri, és megmondja, mi változott. Nem pontszámokat küldünk, hanem egy levelet arról, mi változott, és mit érdemes tenni.

## Tételek

- Elérhetőség figyelése — leállásnál értesítés
- Betöltési sebesség: a változást jelezzük, nem a pontszámot
- SSL-tanúsítvány lejárata — időben szólunk
- Kapcsolati űrlap havi tesztelése
- Indexeltség: látszik-e az oldal a keresőben
- Google-profil: új értékelések, változó átlag
- Értékelés-kérés a vásárlás után
- Válaszjavaslat az értékelésekre — a küldés az öné
- Havi levél magyarul, konkrét javaslatokkal

## Az eszköz — mintalevél

*(A szolgáltatás-blokk saját vizuális eleme: egy e-mail részlete, fehér panelen)*

> **Augusztusi összefoglaló**
>
> **Az oldala**
> Egész hónapban elérhető volt. A betöltési idő 2,1 mp — ez rendben van.
> ⚠️ Az SSL-tanúsítványa 24 nap múlva lejár. Ha nem újul meg, a böngészők „nem biztonságos" jelzést tesznek az oldalára.
>
> **Ahogy a Google látja**
> 8 új értékelés érkezett. Az átlaga 4,7-ről 4,8-ra emelkedett.
>
> **Amit érdemes megnézni**
> Két értékelés említi, hogy nehéz telefonon elérni. Ha ez visszatér, érdemes lehet visszahívás-kérést tenni az oldalra.
>
> **Amit ebben a hónapban tehet**
> 1. SSL megújítása — intézzük, ha kéri
> 2. Nyitvatartás frissítése a Google-profilban a hosszú hétvégére

**Alá, apró szöveggel:**
> Minta. A tényleges levél az ön adataiból áll össze.

## Ami külön hangsúlyos

**Két mondat, ami megkülönböztet — és mindkettő igaz:**

> **Nem kérünk csillagot, csak véleményt.** A Google tiltja, hogy egy vállalkozás kizárólag pozitív értékelést kérjen. Mi nem is tesszük: a vásárló egy semleges kérést kap. Ha jó a munka, a jó értékelés magától jön.

> **A választ a gép írja, de ön küldi.** Elkészítjük a válaszjavaslatot, de az ön nevében soha nem posztolunk automatikusan. Egy elhamarkodott válasz többet árt, mint amennyit tíz köszönőlevél használ.

---
---

# A CSOMAGOKBA

## Hova illeszkedik

A `/architektura` oldalon a Pulzus **önálló, negyedik sorként** jelenjen meg a három csomag alatt — mert más jellegű: nem projekt, hanem folyamatos szolgáltatás.

## Szöveg

**Címke:** `FOLYAMATOS`
**Név:** **Pulzus**
**Ár:** Havidíjas

**Leírás:**
> Ha van már működő oldala, és csak azt szeretné tudni, hogy rendben van-e. Havi figyelés és egy levél arról, mi változott.

**Tételek:**
- Weboldal-figyelés: elérhetőség, sebesség, tanúsítvány, űrlap
- Google-profil: értékelések és helyi megjelenés
- Értékelés-kérés a vásárlás után
- Havi levél konkrét javaslatokkal
- Igény szerint havi fejlesztési óra

**Nem tartalmazza:**
> A weboldal fejlesztését. A Pulzus figyel és jelez — a javítás külön megrendelés, vagy a havi órakeret terhére megy.

**Gomb:** *Beszéljünk róla*

---
---

# HÁROM DOLOG, AMIT NEM ÍRUNK KI

Ezeket szándékosan hagyom ki, és érdemes tudni, miért — mert kísértés lesz beírni őket.

## „Megvédjük a bírságtól"

**Nem tudjuk megvédeni.** A megfelelés jogi minősítés, hatósági eljárásban dől el. Amit tudunk: a technikai akadályokat megszüntetni, és azt dokumentálni.

## „Több értékelés = több vevő"

**Igaz lehet, de nem tőlünk függ**, és nincs mögötte saját mért adatod. Ha az ügyfél megkérdezi, élőszóban elmondhatod, hogy a helyi keresésben az értékelés rangsorolási tényező — de kiírni állításként nem érdemes.

## Konkrét százalékok és megtérülési ígéret

Amíg nincs saját ügyfeled ezekben a szolgáltatásokban, **minden szám találgatás lenne.** Amikor lesz — és lesz mérésed —, akkor kikerülhet, forrással.

**Addig a levél maga adja el a szolgáltatást.** Ezért van benne minta mindkét blokkban: nem ígérünk, hanem megmutatjuk, mit kap.

---

# AMI MÉG HÁTRAVAN, MIELŐTT KIMEGY

**1. Saját felmérés akadálymentesítésből** — a thegbr.eu-n és a hondashopon. Ingyenes eszközzel (axe DevTools, WAVE) tíz perc. Kell hozzá saját tapasztalat, mielőtt eladod.

**2. Jogi tisztázás** Dr. Pál Zoltánnál: mit lehet és mit nem lehet állítani az akadálymentesítésnél. A fenti szöveg óvatosra van írva, de érdemes megerősíttetni.

**3. Öt kézi Pulzus-levél** — párhuzamosan, ingyen, helyi vállalkozásoknak. Ha senkit nem érdekel, jobb most tudni.

**A szolgáltatás kiírásához viszont egyik sem előfeltétel.** Egy cég hirdethet olyan szolgáltatást, amit tud nyújtani — és ezt tudod nyújtani. Amit nem tehetsz: eredményt állítani, ami nincs. Ez a szöveg nem is teszi.
