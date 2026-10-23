"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import huMessages from "@/messages/hu.json";
import enMessages from "@/messages/en.json";

const GA_ID = "G-HLK1LCQB5C";
const CONSENT_COOKIE = "gbr-consent";
// A süti-tájékoztató szerint a hozzájárulás tárolása 6 hónapig él.
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

type Consent = "granted" | "denied" | "unset";
type Snapshot = { consent: Consent; settingsOpen: boolean };

// Minimál külső store a hozzájárulási süti és a beállítás-panel nyitott
// állapota köré — useSyncExternalStore-ral, mint a ThemeToggle-ben. A
// Footer „Süti-beállítások” gombja az openCookieSettings()-szel nyitja meg.
let listeners: Array<() => void> = [];
let settingsOpen = false;
let cached: Snapshot = { consent: "unset", settingsOpen: false };
const SERVER_SNAPSHOT: Snapshot = { consent: "unset", settingsOpen: false };

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}
function notify() {
  listeners.forEach((l) => l());
}

function readConsent(): Consent {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return match ? (match[1] as "granted" | "denied") : "unset";
}

function getSnapshot(): Snapshot {
  const consent = readConsent();
  // Ugyanazt az objektumot kell visszaadni, amíg nincs változás, különben
  // a useSyncExternalStore végtelen újrarenderelésbe fut.
  if (cached.consent !== consent || cached.settingsOpen !== settingsOpen) {
    cached = { consent, settingsOpen };
  }
  return cached;
}
function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

// A GA saját sütijei (_ga, _ga_<azonosító>) a gyökérdomainre is kerülhetnek,
// ezért visszavonáskor mindkét változatot töröljük.
function deleteAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  document.cookie.split("; ").forEach((entry) => {
    const name = entry.split("=")[0];
    if (!name.startsWith("_ga")) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    });
  });
}

function saveConsent(consent: "granted" | "denied") {
  const previous = readConsent();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${consent}; Max-Age=${CONSENT_MAX_AGE}; path=/; SameSite=Lax${secure}`;
  settingsOpen = false;

  // A már betöltött GA-szkriptet nem lehet kivenni az oldalból: visszavonás
  // után a sütiket töröljük, és újratöltünk, hogy a mérés ténylegesen leálljon.
  if (previous === "granted" && consent === "denied") {
    deleteAnalyticsCookies();
    window.location.reload();
    return;
  }
  notify();
}

export function openCookieSettings() {
  settingsOpen = true;
  notify();
}

export default function CookieConsent() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;
  const t = (isEn ? enMessages : huMessages).CookieConsent;
  const { consent, settingsOpen: isOpen } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const showBanner = isOpen || consent === "unset";

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={GA_ID} />}

      {showBanner && (
        <div
          role="region"
          aria-label={t.title}
          data-theme="dark"
          className="fixed z-[78] left-0 right-0 bottom-[calc(64px+env(safe-area-inset-bottom))] lg:bottom-6 lg:left-6 lg:right-auto lg:w-[420px] border-t lg:border border-[var(--rule)] px-6 py-[var(--space-5)]"
          style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
        >
          <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-2)]">
            {t.title}
          </div>
          <p className="[font-size:var(--text-sm)] text-[var(--mid)] mb-[var(--space-4)]">
            {t.body}{" "}
            <Link href="/cookie-tajekoztato" className="underline hover:text-[var(--ink)]">
              {t.policyLink}
            </Link>
          </p>
          {/* A két gomb szándékosan egyforma súlyú: az elutasítás ne legyen
              nehezebb, mint az elfogadás. */}
          <div className="grid grid-cols-2 gap-[var(--space-3)]">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="border border-[var(--rule)] hover:border-[var(--ink)] px-4 py-[10px] [font-family:var(--font-mono)] text-[10.5px] tracking-[0.18em] uppercase transition-colors"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="border border-[var(--rule)] hover:border-[var(--ink)] px-4 py-[10px] [font-family:var(--font-mono)] text-[10.5px] tracking-[0.18em] uppercase transition-colors"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
