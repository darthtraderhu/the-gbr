"use client";

import { useState } from "react";

export default function ShareBar({
  linkedInShareUrl,
  articleUrl,
}: {
  linkedInShareUrl: string;
  articleUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Nincs Clipboard API — a link amúgy is ott van a címsorban.
    }
  };

  return (
    <div className="flex items-center gap-5 flex-wrap [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
      <span>Megosztás</span>
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-[var(--rule)] hover:text-[var(--ink)] hover:border-[var(--signal)] transition-colors pb-[1px]"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="border-b border-[var(--rule)] hover:text-[var(--ink)] hover:border-[var(--signal)] transition-colors pb-[1px]"
      >
        {copied ? "Másolva ✓" : "Link másolása"}
      </button>
    </div>
  );
}
