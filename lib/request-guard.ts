import { SITE_URL } from "@/lib/site";

// Csak a saját domainről fogadunk űrlap-beküldést. Fejlesztés közben
// (localhost) nem akadunk el rajta.
export function isAllowedOrigin(origin: string | null): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  if (!origin) return false;
  return origin === SITE_URL || origin === "https://thegbr.eu";
}
