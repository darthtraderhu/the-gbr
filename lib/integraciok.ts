// „Rendszerek, amiket összekötünk” blokk adatai — a webfejlesztés és az
// automatizáció aloldal közösen használja. Csak olyan rendszert és módot írj
// ide, amihez ténylegesen kapcsolódunk vagy amit vállalunk; a feltétel
// (hivatalos API, webhook vagy export) minden esetben érvényes.

export type IntegrationSystem = {
  title: string;
  examples: string[];
  flow: string;
};

export const INTEGRATION_SYSTEMS: IntegrationSystem[] = [
  {
    title: "Webshop-motor",
    examples: ["WooCommerce", "Shopify", "Shoprenter", "UNAS"],
    flow: "Rendelés, vevő, készlet és ár: onnan visszük tovább, ahol keletkezik.",
  },
  {
    title: "Számlázó",
    examples: ["Számlázz.hu", "Billingo"],
    flow: "A számla a rendelésből vagy az elfogadott ajánlatból készül, nem kézzel átmásolva.",
  },
  {
    title: "CRM és értékesítés",
    examples: ["HubSpot", "Pipedrive", "saját értékesítési rendszer"],
    flow: "A megkeresés az űrlapról egyenesen a felelőshöz fut, forrással együtt.",
  },
  {
    title: "ERP, ügyvitel, raktár",
    examples: ["ügyviteli szoftver", "raktárkezelő"],
    flow: "Cikkszám, készlet, partneri ár: hivatalos API-n vagy rendszeres exporton keresztül.",
  },
  {
    title: "Táblázat és levelezés",
    examples: ["Google Sheets", "Excel / Microsoft 365", "e-mail"],
    flow: "Ahol ma kézzel vezetitek, oda magától kerül be, és értesítés megy róla.",
  },
  {
    title: "Ügyfélportál és belső felület",
    examples: ["bejelentkezés", "szerepkörök", "adminfelület"],
    flow: "Ki mit lát és mit módosíthat: jogosultsággal, ha nincs rá megfelelő kész szoftver.",
  },
];

export const INTEGRATION_METHODS = [
  "Hivatalos API",
  "Webhook",
  "Ütemezett szinkron",
  "Napló és hibariasztás",
];
