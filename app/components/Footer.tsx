"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS, MAIN_NAV_ITEMS_EN, LEGAL_LINKS } from "@/lib/site-links";
import huMessages from "@/messages/hu.json";
import enMessages from "@/messages/en.json";

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;

  // Az /init (és angolul a /en/contact) oldalon itt is elrejtjük.
  if (pathname === "/init" || pathname === "/en/contact") return null;

  const messages = isEn ? enMessages : huMessages;
  const agencyLinks = isEn
    ? [{ label: messages.Footer.home, href: "/en" }, ...MAIN_NAV_ITEMS_EN]
    : [{ label: messages.Footer.home, href: "/" }, ...MAIN_NAV_ITEMS];
  const ctaHref = isEn ? "/en/contact" : "/init";

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
            {messages.Footer.tagline}
          </p>
        </div>

        <div>
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
            {messages.Footer.agencyColumn}
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-[var(--space-3)]">
            {agencyLinks.map((link) => (
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
            {messages.Footer.contactColumn}
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
                href={ctaHref}
                className="[font-size:var(--text-sm)] text-[var(--signal)] hover:text-[var(--ink)] transition-colors"
              >
                {messages.Footer.writeToUs}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
            {messages.Footer.legalColumn}
          </div>
          {isEn && (
            <p className="[font-size:12.5px] leading-relaxed text-[var(--dim)] max-w-[34ch] mb-[var(--space-4)]">
              {enMessages.Footer.legalNote}
            </p>
          )}
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
        © {new Date().getFullYear()} THE GBR. {messages.Footer.rightsReserved}
      </div>
    </footer>
  );
}
