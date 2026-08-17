"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { requestChatOpen } from "./chat-bus";

const NAV_LINKS = [
  { name: "Szolgáltatások", href: "/arzenal" },
  { name: "Csomagok", href: "/architektura" },
  { name: "SEO", href: "/seo" },
  { name: "Rólunk", href: "/szindikatus" },
  { name: "Írások", href: "/hirek" },
];

const BOTTOM_LINKS = [
  { name: "Szolgált.", icon: "◧", href: "/arzenal" },
  { name: "Csomagok", icon: "▤", href: "/architektura" },
  { name: "Írások", icon: "▦", href: "/hirek" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Az /init oldalon (fókuszált kapcsolatfelvételi folyamat) nincs sem
  // felső, sem alsó navigáció.
  if (pathname === "/init") return null;

  return (
    <>
      {/* ===== ASZTALI / FELSŐ NAVIGÁCIÓ ===== */}
      <header
        data-theme="dark"
        className="sticky top-0 z-[60] border-b border-[var(--rule)] backdrop-blur-md"
        style={{ backgroundColor: "rgba(11,14,16,.94)", color: "var(--ink)" }}
      >
        <div className="flex items-center gap-5 px-6 py-[18px]">
          <Link
            href="/"
            className="font-display font-extrabold text-[20px] tracking-[-0.045em] hover:opacity-80 transition-opacity"
          >
            THE GBR<span className="text-[var(--signal)]">.</span>
          </Link>

          <nav className="ml-auto hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase transition-colors ${
                    isActive ? "text-[var(--signal)]" : "text-[var(--mid)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <ThemeToggle />
            <Link
              href="/init"
              className="font-display font-bold text-[12.5px] tracking-[-0.01em] px-[17px] py-[10px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)] hover:bg-[var(--signal-deep)] hover:border-[var(--signal-deep)] transition-colors"
            >
              Pitcheld el
            </Link>
          </nav>

          <Link
            href="/init"
            className="ml-auto md:hidden font-display font-bold text-[12px] px-[14px] py-[9px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)]"
          >
            Pitcheld el
          </Link>
        </div>
      </header>

      {/* ===== MOBIL ALSÓ SÁV ===== */}
      <nav
        data-theme="dark"
        className="md:hidden fixed left-0 right-0 bottom-0 z-[75] grid grid-cols-5 border-t border-[var(--rule)]"
        style={{ backgroundColor: "var(--ground)" }}
      >
        {BOTTOM_LINKS.map((link) => {
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
            Chat
          </span>
        </button>

        <Link
          href="/init"
          className="flex flex-col items-center justify-center gap-[6px] pt-[11px] pb-[calc(11px+env(safe-area-inset-bottom))] px-1"
          style={{ backgroundColor: "var(--signal)", color: "#101400" }}
        >
          <span className="[font-family:var(--font-mono)] text-[15px] leading-none">&rarr;</span>
          <span className="[font-family:var(--font-mono)] text-[8.5px] tracking-[0.12em] uppercase font-semibold">
            Pitch
          </span>
        </Link>
      </nav>
    </>
  );
}
