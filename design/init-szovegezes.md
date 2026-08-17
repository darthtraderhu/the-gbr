# THE GBR — /init oldal szövegezése

**Verzió:** 1.0 · 2026. 08. 17.
**Fájlok:** `app/init/page.tsx` (metadata), `app/init/InitProtocolClient.tsx`

---

# ELŐSZÖR: NÉGY VALÓTLAN BIZTONSÁGI ÁLLÍTÁS

Az oldal négy helyen sugallja, hogy az adatátvitel titkosított vagy különlegesen védett. **Ez ugyanaz a HTTPS, ami minden más weboldalon fut** — nincs benne semmi többlet.

| Hol | Mit állít |
|---|---|
| Jobb felül | `Kapcsolat: Biztonságos` |
| Boot-szöveg | `> KAPCSOLAT TITKOSÍTVA...` |
| E-mail placeholder | `titkosított@email.com` |
| Küldés közben | `> Adatok kódolása és továbbítása...` |
| Sikerképernyő | `Adatok titkosítva.` |

**Miért kell ezeket kivenni:**

Pont az a közönség, akit meg akarsz fogni — technikai döntéshozó —, tudja, hogy ez marketingszöveg. És **ez az egyetlen oldal, ahol az ügyfél adatot ad meg.** Ha itt túlzol, az bizalmi kérdéssé válik.

Ráadásul következetlen is: az `AntiCopy.tsx`-et ma töröltük ugyanezért, a `KAPCSOLAT: BIZTONSÁGOS` jelvényt pedig már az első átnézésnél megjelöltem.

**Ami maradhat, mert igaz:** a jelölőnégyzet melletti adatkezelési link. Az valódi jogi tartalom.

---

# MÁSODIK PROBLÉMA: A KATEGÓRIÁK NEM EGYEZNEK A SITE-TAL

Az első lépés három opciója még a régi szolgáltatásneveket használja:

| Az űrlapon | A site-on most |
|---|---|
| `High-End Web & Shop` | Weboldal és arculat |
| `Performance Marketing & Videó` | Webshop és skálázás |
| `Full-Stack Autopilot (Minden)` | Fejlesztés és üzemeltetés |

**Az „Autopilot" nevet ma vezettük ki mindenhonnan** — itt még benne van. Aki a csomagoknál kattint át ide, mást lát, mint amit választott.

## Új opciók

Négy elem, mert a negyedik konverziót ment:

- **Weboldal vagy webshop** — Új rendszer, vagy a mostani lecserélése
- **Marketing és tartalom** — Hirdetés, videó, tartalomgyártás
- **Fejlesztés és üzemeltetés** — Teljes lefedettség, folyamatosan
- **Még nem tudom** — Beszéljük meg

**A negyedik fontos.** Aki bizonytalan, most kilép — pedig gyakran ő a legjobb lead, mert nála te alakítod a projektet.

---

# AZ ÚJ SZÖVEGEK

## Metadata (`page.tsx`)

- **title:** `Beszéljünk a projektedről | THE GBR`
- **description:** `Mondd el, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.`
- **breadcrumb neve:** `Kapcsolat`

## Fejléc

**Ki:** `root@thegbr:~ /init_protocol` és a három színes pötty
**Be:** egyszerű fejléc a márkajellel és a lépésszámmal

> **THE GBR** · 1. lépés / 3

*(A keret és a haladásjelző maradhat — az szerkezet, nem jelmez.)*

## Kilépés gomb

**Ki:** `ESC` + `Megszakítás`
**Be:** `← Vissza a főoldalra`

*(Az ESC billentyű-metafora akkor lenne indokolt, ha az ESC billentyű tényleg működne. Nem működik.)*

## Jobb felső sarok

**Ki:** `Kapcsolat: Biztonságos` + pulzáló pont
**Be:** semmi, vagy egy valóban hasznos információ:

> Válasz 2 munkanapon belül

## Boot-szöveg

**Ki:**
```
> RENDSZER INICIALIZÁLÁSA...
> KAPCSOLAT TITKOSÍTVA...
> VÁROM AZ AZONOSÍTÁST...
```

**Be:** a gépelő animáció megtartható, de a tartalma legyen valódi tájékoztatás:

```
Három lépés, kb. két perc.
Nem minden projektet vállalunk el — ezért kérdezünk előbb.
```

**Ez a második mondat fontos.** Előre kimondja a szelektivitást, ami a pozicionálásod alapja — és pont ezért lesz komolyabb az egész űrlap.

---

# LÉPÉS 1 · A PROJEKT

### Fejléc
> **01 · A projekt**

*(A `//` elválasztó a terminál-jelmez része, cserélhető sima középpontra.)*

### Az opciók fölött

**Ki:** `Melyik rendszert aktiváljuk?`
**Be:** `Mivel tudunk segíteni?`

### A leírás mező

**Címke marad:** `Mi a helyzet most, és mit szeretnél elérni?`
**Placeholder marad** — jó, konkrét, megmutatja az elvárt mélységet.

**Egy kiegészítés a mező alá:**
> Minél konkrétabb, annál pontosabb választ tudunk adni.

*(A karakterszámláló mellé, halványan. Így a 100 karakteres minimum nem korlátnak tűnik, hanem segítségnek.)*

---

# LÉPÉS 2 · KERET ÉS HATÁRIDŐ

### Fejléc
> **02 · Keret és határidő**

### A kérdés fölé — ez most hiányzik

**A költségkeret a legkényesebb kérdés az űrlapon.** Sokan itt lépnek ki, mert úgy érzik, „skatulyázzák" őket. Egy mondat megoldja:

> Azért kérdezzük, hogy ne pazaroljuk egymás idejét. Ha a keret nem reális a feladathoz, azt inkább most mondjuk meg, mint három egyeztetés után.

**Ez a mondat növeli a kitöltési arányt**, mert megmagyarázza a kérdést, ahelyett hogy csak feltenné.

### A kérdés
> Mekkora keretet terveztek erre?

*(A „büdzsé" helyett „keret" — magyarabb, és a site többi részén is így szerepel.)*

---

# LÉPÉS 3 · KAPCSOLAT

### Fejléc
> **03 · Kapcsolat**

### A mezőcímkék

| Ki | Be |
|---|---|
| `Engedélyezett Név` | `Neved` |
| `Vállalat / Entitás` | `Cégnév` |
| `Kommunikációs Csatorna (Email)` | `E-mail cím` |
| `Telefonos Elérhetőség (opcionális)` | `Telefonszám (opcionális)` |

### Placeholderek

| Ki | Be |
|---|---|
| `titkosított@email.com` | `nev@ceged.hu` |
| `Vezeték és Keresztnév` | `Kovács János` |

### Küldés közben

**Ki:** `> Adatok kódolása és továbbítása...`
**Be:** `Küldés folyamatban…`

### Hibaüzenetek

**A mostaniak jargonban szólnak** (`> API_HIBA:`, `> SYS_ERROR: Hálózati hiba blokkolja a jelet!`), és nem segítenek. Ha valakinek elszáll a küldés, az nem akar rendszerüzenetet olvasni — hanem meg akarja oldani.

**Új szövegek:**

**Szerverhiba esetén:**
> A küldés nem sikerült. Próbáld újra pár másodperc múlva — ha akkor sem megy, írj közvetlenül: **gabor@thegbr.eu**

**Hálózati hiba esetén:**
> Nem sikerült elérni a szervert. Ellenőrizd az internetkapcsolatot, vagy írj közvetlenül: **gabor@thegbr.eu**

*(A közvetlen e-mail cím legyen kattintható `mailto:` link. Ha az űrlap hibázik, a lead ne vesszen el.)*

---

# LÉPÉS 4 · SIKERKÉPERNYŐ

**Ez a képernyő most három olyan dolgot állít, ami nem igaz vagy nem jelent semmit.**

### Ki

- `Protokoll Elindítva`
- `A célpont rögzítve. Adatok titkosítva.`
- `A THE GBR **operatív törzse** két munkanapon belül...` ← **ezt a kifejezést ma vezettük ki a /szindikatus oldalról**
- `sys.status: 200_OK / connection: CLOSED / agent_routing: ACTIVE` ← az `agent_routing` nem jelent semmit
- `Vissza a Bázisra`

### Be

**Címsor:**
> **Megkaptuk.**

**Szöveg:**
> Küldtünk egy visszaigazolást a megadott e-mail címre — ha pár percen belül nem érkezik meg, nézd meg a spam mappát is.
>
> Két munkanapon belül válaszolunk. Ha közben eszedbe jut valami, írj nyugodtan: **gabor@thegbr.eu**

**A visszaigazoló e-mail említése azért fontos**, mert most tényleg megy egy — és ha a látogató tudja, hogy jönni fog, akkor keresni is fogja. Ha nem tudja, elveszik a spam mappában.

**A státusz-blokk:** vagy törlendő, vagy őszinte tartalmat kap:

> `Beérkezett:` 2026. 08. 17. 14:32
> `Azonosító:` a8f3c1

*(Az időbélyeg és a lead-azonosító valós adat — az API már generál ilyet. Ez tényleg hasznos, ha valaki később hivatkozni akar rá.)*

**Gomb:**
> Vissza a főoldalra

**A töltőgyűrű-animáció maradhat**, de érdemes átgondolni: a művelet befejeződött, egy pörgő gyűrű azt sugallja, hogy még folyamatban van. Egy statikus pipa vagy egy egyszeri animáció logikusabb.

---

# AMIT ELTÁVOLÍTOK, ÉS MIÉRT

| Kivezetve | Ok |
|---|---|
| `Kapcsolat: Biztonságos` | Ugyanaz a HTTPS, mint mindenhol. Dekoratív biztonsági állítás. |
| `> KAPCSOLAT TITKOSÍTVA...` | Ugyanaz. |
| `titkosított@email.com` | Ugyanaz, placeholderben. |
| `> Adatok kódolása és továbbítása...` | Nincs kódolás azon felül, ami minden HTTPS-kérésnél van. |
| `Adatok titkosítva.` (sikerképernyő) | Ugyanaz. |
| `Full-Stack Autopilot (Minden)` | Az „Autopilot" nevet ma vezettük ki mindenhonnan. |
| `High-End Web & Shop` / `Performance Marketing & Videó` | Nem egyeznek a site új szolgáltatásneveivel. |
| `root@thegbr:~ /init_protocol` | Terminál-jelmez. |
| `ESC` / `Megszakítás` | Az ESC billentyű nem működik — a metafora hamis. |
| `Engedélyezett Név` / `Vállalat / Entitás` / `Kommunikációs Csatorna` | Jelmez-címkék egy űrlapon, ahol a világosság a legfontosabb. |
| `> API_HIBA:` / `> SYS_ERROR: Hálózati hiba blokkolja a jelet!` | Jargon, ami nem segít megoldani a problémát. |
| `Protokoll Elindítva` / `A célpont rögzítve` | Terminál-jelmez. |
| `operatív törzse` | **Ezt ma vezettük ki a /szindikatus oldalról** — itt még megmaradt. |
| `agent_routing: ACTIVE` | Nem jelent semmit. |
| `connection: CLOSED` | Ugyanaz. |
| `Vissza a Bázisra` | Katonai nyelv. |

---

# HÁROM APRÓSÁG, AMI NEM SZÖVEGEZÉS

**1. A `descriptionRef` használatlan.** A `handleDescriptionChange` az `e.target`-tel dolgozik, a ref sehol nem hivatkozott — törölhető.

**2. A Formspree-hívás mezőnevei is jelmezesek:** `Célpont (Rendszer)`, `Kiválasztott Büdzsé`. Ezek a te postafiókodba érkeznek, tehát nem kritikus — de ha már úgyis változik, legyen egységes.

**3. A visszaigazoló e-mail hangvétele** most konzisztens a jogi dokumentumokkal. Az űrlap átírása után érdemes újra elolvasni, hogy a kettő ne térjen el.

---

# ÖSSZEFOGLALVA

Ez az oldal a **legfontosabb konverziós pont** az egész site-on — itt dől el, lesz-e megkeresés.

**A négy biztonsági állítás a legsúlyosabb**, mert pont ott túloz, ahol az ügyfél adatot ad meg. A többi jelmez-szöveg pedig ugyanaz a minta, mint az öt átírt oldalon — csak itt még nem javítottuk.

**És egy konverziós nyereség:** a költségkeret-kérdés indoklása („azért kérdezzük, hogy ne pazaroljuk egymás idejét") és a negyedik, „Még nem tudom" opció együtt érezhetően növelheti a kitöltési arányt. Aki bizonytalan, most kilép — pedig gyakran ő a legjobb lead.
