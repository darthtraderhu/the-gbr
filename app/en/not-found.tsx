import Link from "next/link";
import { Rail, Eyebrow } from "@/app/components/ui";

const SUGGESTIONS = [
  { n: "01", label: "Services", href: "/en/services" },
  { n: "02", label: "Engagement", href: "/en/engagement" },
  { n: "03", label: "Writing", href: "/en/writing" },
  { n: "04", label: "Contact", href: "/en/contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)] font-body">
      <Rail label="404 / Not found" dark>
        <section className="min-h-[78vh] flex items-center px-6 py-[clamp(48px,6vw,100px)]">
          <div className="w-full">
            <Eyebrow>Error · 404</Eyebrow>
            <div className="font-display font-black leading-[0.8] tracking-[-0.07em] [font-size:var(--text-error-code)] text-[var(--rule)]">
              4<span className="text-[var(--signal)]">0</span>4
            </div>
            <h2 className="font-display font-extrabold [font-size:var(--text-error-h2)] leading-[1.02] tracking-[-0.042em] max-w-[18ch] mt-[var(--space-8)] mb-[var(--space-5)] text-[var(--ink)]">
              This page isn&apos;t here.
            </h2>
            <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-8)]">
              Either the address has a typo, or we moved this content a while ago. If you came
              from somewhere else and this is frustrating, tell us — a broken link is our
              problem, not yours.
            </p>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              <Link
                href="/en"
                className="font-display font-bold text-[14px] px-6 py-[14px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)] hover:bg-[var(--signal-deep)] hover:border-[var(--signal-deep)] transition-colors"
              >
                Back to home
              </Link>
              <a
                href="mailto:gabor@thegbr.eu?subject=Broken%20link%20on%20thegbr.eu"
                className="font-display font-bold text-[14px] px-6 py-[14px] bg-transparent text-[var(--ink)] border border-[var(--rule-strong)] hover:border-[var(--ink)] transition-colors"
              >
                Report it
              </a>
            </div>
          </div>
        </section>

        <div className="border-t border-[var(--rule)] mt-[clamp(40px,5vw,70px)]">
          <div className="px-6 py-[11px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            Maybe you wanted
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4">
            {SUGGESTIONS.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`px-6 py-[var(--space-5)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--dim)] hover:bg-[var(--panel)] hover:text-[var(--ink)] transition-colors border-[var(--rule)] ${
                  i < SUGGESTIONS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
                }`}
              >
                {s.n}
                <b className="block font-body text-[15.5px] normal-case tracking-normal text-[var(--ink)] font-semibold mt-[var(--space-3)]">
                  {s.label}
                </b>
              </Link>
            ))}
          </div>
        </div>
      </Rail>
    </main>
  );
}
