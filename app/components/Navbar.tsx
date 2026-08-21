"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { requestChatOpen } from "./chat-bus";
import {
  MAIN_NAV_ITEMS,
  MAIN_NAV_ITEMS_EN,
  ARZENAL_SECTIONS,
  ARZENAL_SECTIONS_EN,
  LEGAL_LINKS,
} from "@/lib/site-links";
import { getEnglishEquivalent, getHungarianEquivalent } from "@/lib/i18n-routes";
import huMessages from "@/messages/hu.json";
import enMessages from "@/messages/en.json";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isEn = pathname?.startsWith("/en") ?? false;
  const t = isEn ? enMessages.Nav : huMessages.Nav;
  const headerRef = useRef<HTMLElement>(null);

  // Útvonalváltáskor mindig zárjuk a mobil menüt — render közbeni
  // állapot-igazítás (ld. React dok.: "Adjusting state on a prop
  // change"), nem effektus, hogy ne legyen felesleges extra render kör.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  // A ragadós fejléc tényleges magasságát írjuk a --header-height CSS
  // változóba (globals.css: html { scroll-padding-top: var(--header-height) }),
  // hogy horgony-ugráskor és route-váltáskor a tartalom teteje sose kerüljön
  // a fejléc alá. Mért érték, nem tippelt — a mobil és az asztali fejléc
  // magassága eltér (ld. lejjebb a mobil-only nyelvváltó/CTA), és
  // ResizeObserverrel automatikusan követi, ha ez a jövőben változna.
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-height", `${headerEl.offsetHeight}px`);
    };

    updateHeaderHeight();
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerEl);
    return () => resizeObserver.disconnect();
  }, []);

  // Az /init (és angolul a /en/contact) oldalon — fókuszált
  // kapcsolatfelvételi folyamat — nincs sem felső, sem alsó navigáció.
  if (pathname === "/init" || pathname === "/en/contact") return null;

  const navItems = isEn ? MAIN_NAV_ITEMS_EN : MAIN_NAV_ITEMS;
  const sections = isEn ? ARZENAL_SECTIONS_EN : ARZENAL_SECTIONS;
  const servicesHref = isEn ? "/en/services" : "/arzenal";
  const homeHref = isEn ? "/en" : "/";
  const ctaHref = isEn ? "/en/contact" : "/init";
  const switcherHref = isEn ? getHungarianEquivalent(pathname ?? "/en") : getEnglishEquivalent(pathname ?? "/");
  const bottomLinks = [
    { name: t.engagement, icon: "▤", href: isEn ? "/en/engagement" : "/architektura" },
    { name: t.writing, icon: "▦", href: isEn ? "/en/writing" : "/hirek" },
  ];

  return (
    <>
      {/* ===== ASZTALI / FELSŐ NAVIGÁCIÓ ===== */}
      <header
        ref={headerRef}
        data-theme="dark"
        className="sticky top-0 z-[60] border-b border-[var(--rule)] backdrop-blur-md"
        style={{ backgroundColor: "rgba(11,14,16,.94)", color: "var(--ink)" }}
      >
        <div className="flex items-center gap-5 px-6 py-[18px]">
          <Link
            href={homeHref}
            className="font-display font-extrabold text-[20px] tracking-[-0.045em] hover:opacity-80 transition-opacity"
          >
            THE GBR<span className="text-[var(--signal)]">.</span>
          </Link>

          <nav className="ml-auto hidden md:flex items-center gap-6">
            {navItems.map((link) => {
              const isActive = pathname === link.href;
              const isServices = link.href === servicesHref;
              const linkEl = (
                <Link
                  href={link.href}
                  className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase transition-colors ${
                    isActive ? "text-[var(--signal)]" : "text-[var(--mid)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.label}
                </Link>
              );

              if (!isServices) {
                return <span key={link.href}>{linkEl}</span>;
              }

              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase transition-colors ${
                      isActive
                        ? "text-[var(--signal)]"
                        : "text-[var(--mid)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <div className="hidden group-hover:block group-focus-within:block absolute left-0 top-full pt-3 z-10">
                    <div
                      data-theme="dark"
                      style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
                      className="w-[300px] border border-[var(--rule)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
                    >
                      <div className="px-4 py-[10px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:9.5px] tracking-[0.2em] uppercase text-[var(--dim)]">
                        {t.sevenAreas}
                      </div>
                      {sections.map((s) => (
                        <Link
                          key={s.id}
                          href={`${servicesHref}#${s.id}`}
                          className="flex items-center gap-3 px-4 py-3 border-b border-[var(--rule)] last:border-b-0 hover:bg-[var(--panel)] transition-colors group/item"
                        >
                          <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--dim)] group-hover/item:text-[var(--signal)] transition-colors">
                            {s.n}
                          </span>
                          <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.1em] uppercase text-[var(--ink-2)] group-hover/item:text-[var(--signal)] transition-colors">
                            {s.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              href={switcherHref}
              className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] text-[var(--mid)] hover:text-[var(--ink)] transition-colors border border-[var(--rule)] px-[10px] py-[4px]"
              aria-label={t.switchLabel}
            >
              {isEn ? huMessages.LanguageSwitcher.hu : enMessages.LanguageSwitcher.en}
            </Link>
            <ThemeToggle />
            <Link
              href={ctaHref}
              className="font-display font-bold text-[12.5px] tracking-[-0.01em] px-[17px] py-[10px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)] hover:bg-[var(--signal-deep)] hover:border-[var(--signal-deep)] transition-colors"
            >
              {t.cta}
            </Link>
          </nav>

          <Link
            href={switcherHref}
            className="ml-auto md:hidden shrink-0 h-[44px] px-[10px] flex items-center justify-center [font-family:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--mid)] border border-[var(--rule)]"
            aria-label={t.switchLabel}
          >
            {isEn ? huMessages.LanguageSwitcher.hu : enMessages.LanguageSwitcher.en}
          </Link>

          <Link
            href={ctaHref}
            className="md:hidden shrink-0 h-[44px] px-[14px] flex items-center justify-center font-display font-bold text-[12px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)]"
          >
            {t.mobileCta}
          </Link>
        </div>
      </header>

      {/* ===== MOBIL ALSÓ SÁV ===== */}
      <nav
        data-theme="dark"
        className="md:hidden fixed left-0 right-0 bottom-0 z-[75] grid grid-cols-5 border-t border-[var(--rule)]"
        style={{ backgroundColor: "var(--ground)" }}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          className={`relative flex flex-col items-center justify-center gap-[6px] border-r border-[var(--rule)] pt-[11px] pb-[calc(11px+env(safe-area-inset-bottom))] px-1 ${
            isMenuOpen ? "text-[var(--ink)]" : "text-[var(--mid)]"
          }`}
        >
          {isMenuOpen && (
            <span className="absolute top-[-1px] left-0 right-0 h-[2px] bg-[var(--signal)]" />
          )}
          <span className="[font-family:var(--font-mono)] text-[15px] leading-none">☰</span>
          <span className="[font-family:var(--font-mono)] text-[8.5px] tracking-[0.12em] uppercase">
            {t.mobileMenu}
          </span>
        </button>

        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex flex-col items-center justify-center gap-[6px] border-r border-[var(--rule)] pt-[11px] pb-[calc(11px+env(safe-area-inset-bottom))] px-1 ${
                isActive ? "text-[var(--ink)]" : "text-[var(--mid)]"
              }`}
            >
              {isActive && (
                <span className="absolute top-[-1px] left-0 right-0 h-[2px] bg-[var(--signal)]" />
              )}
              <span className="[font-family:var(--font-mono)] text-[15px] leading-none">
                {link.icon}
              </span>
              <span className="[font-family:var(--font-mono)] text-[8.5px] tracking-[0.12em] uppercase">
                {link.name}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => requestChatOpen()}
          className="relative flex flex-col items-center justify-center gap-[6px] border-r border-[var(--rule)] pt-[11px] pb-[calc(11px+env(safe-area-inset-bottom))] px-1 text-[var(--mid)]"
        >
          <span className="[font-family:var(--font-mono)] text-[15px] leading-none">◇</span>
          <span className="[font-family:var(--font-mono)] text-[8.5px] tracking-[0.12em] uppercase">
            {t.mobileChat}
          </span>
        </button>

        <Link
          href={ctaHref}
          className="flex flex-col items-center justify-center gap-[6px] pt-[11px] pb-[calc(11px+env(safe-area-inset-bottom))] px-1"
          style={{ backgroundColor: "var(--signal)", color: "#101400" }}
        >
          <span className="[font-family:var(--font-mono)] text-[15px] leading-none">&rarr;</span>
          <span className="[font-family:var(--font-mono)] text-[8.5px] tracking-[0.12em] uppercase font-semibold">
            {t.mobileCta}
          </span>
        </Link>
      </nav>

      {/* ===== MOBIL MENÜ — teljes képernyős átfedés ===== */}
      {isMenuOpen && (
        <div
          data-theme="dark"
          className="md:hidden fixed inset-0 z-[85] overflow-y-auto"
          style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
        >
          <div className="flex items-center gap-4 px-6 py-[18px] border-b border-[var(--rule)]">
            <span className="font-display font-extrabold text-[19px] tracking-[-0.045em]">
              THE GBR<span className="text-[var(--signal)]">.</span>
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label={t.closeMenu}
              className="ml-auto [font-family:var(--font-mono)] text-[20px] text-[var(--mid)]"
            >
              ✕
            </button>
          </div>

          <div className="pb-[calc(24px+env(safe-area-inset-bottom))]">
            {navItems.map((item, i) => {
              const isServices = item.href === servicesHref;
              return (
                <div key={item.href} className="border-b border-[var(--rule)]">
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 px-6 py-[18px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--dim)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-bold text-[20px] tracking-[-0.02em]">
                      {item.label}
                    </span>
                  </Link>
                  {isServices && (
                    <div className="pb-[10px]">
                      {sections.map((s) => (
                        <Link
                          key={s.id}
                          href={`${servicesHref}#${s.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 pl-[58px] pr-6 py-[10px]"
                        >
                          <span className="[font-family:var(--font-mono)] text-[length:9.5px] text-[var(--dim)]">
                            {s.n}
                          </span>
                          <span className="[font-family:var(--font-mono)] text-[length:11.5px] tracking-[0.08em] uppercase text-[var(--ink-2)]">
                            {s.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="px-6 pt-[24px] pb-[8px] [font-family:var(--font-mono)] text-[length:9.5px] tracking-[0.2em] uppercase text-[var(--dim)]">
              {isEn ? enMessages.Footer.legalColumn : huMessages.Footer.legalColumn}
            </div>
            {isEn && (
              <p className="px-6 pb-[14px] [font-size:12.5px] leading-relaxed text-[var(--dim)] max-w-[46ch]">
                {enMessages.Footer.legalNote}
              </p>
            )}
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-[10px] [font-size:14px] text-[var(--ink-2)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
