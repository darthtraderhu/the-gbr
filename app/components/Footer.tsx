"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AGENCY_LINKS = [
  { label: "Főoldal", href: "/" },
  { label: "Szolgáltatások", href: "/arzenal" },
  { label: "Csomagok", href: "/architektura" },
  { label: "SEO", href: "/seo" },
  { label: "Rólunk", href: "/szindikatus" },
  { label: "Írások", href: "/hirek" },
];

const LEGAL_LINKS = [
  { label: "Adatkezelés", href: "/adatkezeles" },
  { label: "Cookie-tájékoztató", href: "/cookie-tajekoztato" },
  { label: "AI-tájékoztató", href: "/ai-tajekoztato" },
  { label: "ÁSZF", href: "/szolgaltatasi-feltetelek" },
  { label: "Impresszum", href: "/impresszum" },
];

export default function Footer() {
  const pathname = usePathname();

  // Az /init oldalon (fókuszált kapcsolatfelvételi folyamat) itt is elrejtjük.
  if (pathname === "/init") return null;

  return (
    <footer
      data-theme="dark"
      style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
      className="border-t border-[var(--rule)]"
    >
      <div className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)] grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-[var(--space-10)] sm:gap-[var(--space-12)]">
        <div>
          <div className="font-display font-extrabold text-[22px] tracking-[-0.045em] mb-[var(--space-3)]">
            THE GBR<span className="text-[var(--signal)]">.</span>
          </div>
          <p className="[font-size:var(--text-sm)] text-[var(--mid)] max-w-[32ch]">
            Fejlesztés és üzemeltetés B2B-ben.
          </p>
        </div>

        <div>
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
            Ügynökség
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-[var(--space-3)]">
            {AGENCY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="[font-size:var(--text-sm)] text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
            Kapcsolat
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-[var(--space-3)]">
            <li>
              <a
                href="mailto:gabor@thegbr.eu"
                className="[font-size:var(--text-sm)] text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
              >
                gabor@thegbr.eu
              </a>
            </li>
            <li>
              <a
                href="tel:+36705139838"
                className="[font-size:var(--text-sm)] text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
              >
                +36 70 513 9838
              </a>
            </li>
            <li>
              <Link
                href="/init"
                className="[font-size:var(--text-sm)] text-[var(--signal)] hover:text-[var(--ink)] transition-colors"
              >
                Írj nekünk &rarr;
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
            Jogi
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-[var(--space-3)]">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="[font-size:var(--text-sm)] text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--rule)] px-6 py-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] uppercase text-[var(--dim)] text-center md:text-right">
        © {new Date().getFullYear()} THE GBR. Minden jog fenntartva.
      </div>
    </footer>
  );
}
