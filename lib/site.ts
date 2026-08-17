// Egyetlen forrás a kanonikus domainre. A Vercelen 5 domain (köztük az apex
// thegbr.eu is) a www.thegbr.eu-ra irányít — ez a véglegesen kanonikus cím.
export const SITE_URL = "https://www.thegbr.eu";

// A Resend-hitelesített domain maga a thegbr.eu (a send.thegbr.eu csak a
// return-path aldomain, arról nem küldhető) — innen kell feladni minden
// tranzakciós e-mailt. Felülírható a LEAD_FROM_EMAIL env-változóval, ha
// később külön feladói cím kellene környezetenként.
export const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "THE GBR <noreply@thegbr.eu>";
