"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import DataCell from "../components/ui/DataCell";
import StatusStrip from "../components/ui/StatusStrip";
import SectionHeader from "../components/ui/SectionHeader";
import Field from "../components/ui/Field";
import ChipGroup from "../components/ui/ChipGroup";
import Prose from "../components/ui/Prose";

const CHIP_OPTIONS = [
  { value: "web", label: "Web" },
  { value: "ai", label: "AI" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
];

const STATUS_ITEMS = [
  { label: "Aktív leadek", value: 128, unit: "db", ticks: [0.4, 0.55, 0.5, 0.7, 0.65, 0.85, 1] },
  { label: "Válaszidő", value: 42, unit: "s", ticks: [0.9, 0.8, 0.85, 0.6, 0.5, 0.45, 0.4] },
  { label: "Konverzió", value: "3.8", unit: "%", ticks: [0.3, 0.35, 0.5, 0.45, 0.6, 0.7, 0.75] },
  { label: "Uptime", value: "99.98", unit: "%", ticks: [1, 1, 0.98, 1, 1, 1, 1] },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-3)]">
      <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.1em] text-[var(--mid)]">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ComponentsShowcase() {
  const [chip, setChip] = useState<string | null>("ai");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-[var(--space-12)]">
      {/* Button */}
      <Row label="Button — variáns × méret">
        <div className="flex flex-col gap-[var(--space-4)]">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-[var(--space-3)]">
              {(["sm", "md", "lg"] as const).map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant} / {size}
                </Button>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-[var(--space-3)]">
            <Button disabled>Letiltva</Button>
            <Button loading={loading} onClick={() => setLoading((v) => !v)}>
              {loading ? "Betöltés…" : "Betöltés indítása"}
            </Button>
            <Button asChild variant="ghost">
              <Link href="/design-system">asChild — Link</Link>
            </Button>
          </div>
        </div>
      </Row>

      {/* Card */}
      <Row label="Card — default / elevated / dark">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-4)]">
          <Card
            eyebrow="Projekt"
            footer={
              <Button size="sm" variant="ghost">
                Részletek
              </Button>
            }
          >
            <p className="font-body text-[var(--ink-2)] [font-size:var(--text-base)]">
              Alapértelmezett panel, vékony vonallal.
            </p>
          </Card>
          <Card variant="elevated" eyebrow="Kiemelt">
            <p className="font-body text-[var(--ink-2)] [font-size:var(--text-base)]">
              Emelt variáns, halvány, tokenből származó árnyékkal.
            </p>
          </Card>
          <Card variant="dark" eyebrow="Sötét">
            <p className="font-body text-[var(--ink-2)] [font-size:var(--text-base)]">
              Lokálisan sötét kártya, világos oldalon belül is.
            </p>
          </Card>
        </div>
      </Row>

      {/* DataCell */}
      <Row label="DataCell — önállóan">
        <div className="flex flex-wrap gap-[var(--space-8)]">
          {STATUS_ITEMS.map((item) => (
            <DataCell key={item.label} {...item} />
          ))}
        </div>
      </Row>

      {/* StatusStrip */}
      <Row label="StatusStrip (DataCell rács)">
        <StatusStrip title="Rendszerállapot" timestamp="2026-08-17 16:20" items={STATUS_ITEMS} />
      </Row>

      {/* SectionHeader */}
      <Row label="SectionHeader">
        <SectionHeader
          eyebrow="Referencia"
          title="Alcím Archivóban"
          lead="A bevezető bekezdés talpas betűvel fut, a törzsszöveg szerepét mintázva."
        />
      </Row>

      {/* Field */}
      <Row label="Field — input / textarea / hiba">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4)]">
          <Field label="Cégnév" placeholder="THE GBR Kft." hint="Ahogy a számlán szerepel." />
          <Field label="E-mail" placeholder="nev@ceg.hu" error="Érvénytelen e-mail cím." />
          <Field
            label="Megjegyzés"
            multiline
            maxLength={140}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Max. 140 karakter…"
            className="sm:col-span-2"
          />
        </div>
      </Row>

      {/* ChipGroup */}
      <Row label="ChipGroup — egyválasztós">
        <ChipGroup name="kategoria" options={CHIP_OPTIONS} value={chip} onChange={setChip} />
      </Row>

      {/* Prose */}
      <Row label="Prose — markdown tipográfia">
        <Prose>
          <h3>Adatvezérelt döntések</h3>
          <p>
            A <strong>Prose</strong> a jogi oldalak és a cikkek tipográfiai burkolója — kizárólag a
            design tokenekből építi fel a színsémáját, nem hardcode-olt színekből.
          </p>
          <ul>
            <li>Helyes címsor-hierarchia</li>
            <li>Olvasható táblázatok</li>
            <li>Kódrészletek egységes stílusban</li>
          </ul>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Szerep</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>--tw-prose-links</code>
                </td>
                <td>var(--signal-deep)</td>
              </tr>
            </tbody>
          </table>
        </Prose>
      </Row>
    </div>
  );
}
