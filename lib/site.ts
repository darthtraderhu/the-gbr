// Egyetlen forrás a kanonikus domainre. A Vercelen 5 domain (köztük az apex
// thegbr.eu is) a www.thegbr.eu-ra irányít — ez a véglegesen kanonikus cím.
export const SITE_URL = "https://www.thegbr.eu";

// A tranzakciós levelek a Rackhostos noreply@thegbr.eu postafiókból mennek
// SMTP-n (lib/mail.ts). A feladó egyezzen az SMTP_USER fiókkal, különben a
// szerver elutasíthatja. Felülírható a LEAD_FROM_EMAIL env-változóval.
export const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "THE GBR <noreply@thegbr.eu>";
