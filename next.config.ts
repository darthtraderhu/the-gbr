import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy nonce nélkül: a nonce minden oldalt dinamikus
// renderelésre kényszerítene, ami a statikus oldalak sebességét rontaná.
// Külső források, amiket az oldal ténylegesen használ:
// - Google Analytics 4 (googletagmanager.com, google-analytics.com)
// - Formspree (az /init párhuzamos fetch-hívása, amíg a saját pipeline át nem veszi)
// A Vercel Analytics és Speed Insights a saját domainről (/_vercel/insights, /_vercel/speed-insights) fut, külön engedély nem kell.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://formspree.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Két gyökér layout van (app/(hu) és app/en) — ehhez a Next.js explicit
  // globalNotFound.js fájlt kér a teljesen egyezés nélküli URL-ekhez, mert
  // egyetlen közös layoutból nem lehetne a 404-et összeállítani.
  experimental: {
    globalNotFound: true,
  },
  // Az /api/autopilot futásidőben olvassa a posts/ mappát — a fájlkövetés
  // magától nem tudja, hogy a markdown kell a függvényhez.
  outputFileTracingIncludes: {
    "/api/autopilot": ["./posts/**/*"],
  },
  // Az X-Powered-By: Next.js fejléc feleslegesen árulja el a stacket.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
