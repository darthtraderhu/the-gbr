import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Két gyökér layout van (app/(hu) és app/en) — ehhez a Next.js explicit
  // globalNotFound.js fájlt kér a teljesen egyezés nélküli URL-ekhez, mert
  // egyetlen közös layoutból nem lehetne a 404-et összeállítani.
  experimental: {
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
