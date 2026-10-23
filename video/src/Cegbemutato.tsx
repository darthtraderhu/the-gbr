import "@fontsource/archivo/800.css";
import "@fontsource/archivo/900.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { EN, HU, type VideoCopy } from "./copy";

// Az oldal világos témájának tokenjei (app/globals.css) — ugyanaz a paletta,
// hogy a videó ne „valahonnan összeszedett” anyagnak hasson.
const C = {
  ground: "#EEF0EC",
  panel: "#FFFFFF",
  ink: "#14171A",
  ink2: "#3C4348",
  mid: "#697079",
  rule: "#D4D8D1",
  ruleSoft: "#E4E8E1",
  ruleStrong: "#BFC5BC",
  signal: "#93B300",
};

const F = {
  display: "'Archivo', sans-serif",
  body: "'Source Serif 4', serif",
  mono: "'IBM Plex Mono', monospace",
};

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

// Jelenetek: [kezdet, hossz] másodpercben, mindkét nyelven ugyanaz az időzítés.
const SCENES = {
  open: [0, 4.5],
  quote: [4.5, 7.5],
  two: [12, 10],
  steps: [22, 30],
  promise: [52, 6],
  close: [58, 6],
} as const;

export const DURATION = s(64);

const STEP_LEN = SCENES.steps[1] / 4;
const CHAPTER_STARTS = [SCENES.quote[0], SCENES.two[0], SCENES.steps[0], SCENES.promise[0]];

const CopyContext = createContext<VideoCopy>(HU);
const useCopy = () => useContext(CopyContext);

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Belépés: enyhe emelkedés + áttűnés, a megadott képkockától.
function enter(frame: number, start: number, dur = 20, dist = 28): CSSProperties {
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
}

// Jelenet: a végén rövid kiúsztatás, hogy a vágás ne legyen kemény.
function Scene({ len, children }: { len: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [len - 12, len], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: out }}>{children}</AbsoluteFill>;
}

function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: F.mono,
        fontWeight: 500,
        fontSize: 20,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: C.mid,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Wordmark({ size }: { size: number }) {
  return (
    <span
      style={{
        fontFamily: F.display,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.05em",
        color: C.ink,
        lineHeight: 1,
      }}
    >
      THE GBR<span style={{ color: C.signal }}>.</span>
    </span>
  );
}

const PAD = 112;

function Stage({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill
      style={{
        padding: `150px ${PAD}px 150px`,
        justifyContent: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

// ---------- Állandó keret: műszerfej és idővonal ----------

function timecode(frame: number) {
  const t = Math.floor(frame / FPS);
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function Chrome() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  const progress = frame / (DURATION - 1);
  const ticks = Math.round(DURATION / FPS);
  const chromeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: chromeIn }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: PAD,
          right: PAD,
          height: 104,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <Mono style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 10, height: 10, background: C.signal, display: "block" }} />
          {copy.header}
        </Mono>
        <Mono style={{ color: C.ink, letterSpacing: "0.14em" }}>
          {timecode(frame)} <span style={{ color: C.ruleStrong }}>/ {timecode(DURATION)}</span>
        </Mono>
      </div>

      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 56, height: 56 }}>
        {copy.chapters.map((label, i) => {
          const from = CHAPTER_STARTS[i];
          const x = from / (DURATION / FPS);
          const active = frame >= s(from);
          return (
            <Mono
              key={label}
              style={{
                position: "absolute",
                left: `${x * 100}%`,
                top: 0,
                fontSize: 16,
                color: active ? C.ink : C.mid,
                paddingLeft: 12,
                borderLeft: `1px solid ${active ? C.ink : C.ruleStrong}`,
                lineHeight: "28px",
              }}
            >
              {label}
            </Mono>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            background: C.rule,
          }}
        />
        {Array.from({ length: ticks + 1 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i / ticks) * 100}%`,
              bottom: 0,
              width: 1,
              height: i % 10 === 0 ? 14 : 6,
              background: C.ruleStrong,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -1,
            height: 3,
            width: `${progress * 100}%`,
            background: C.signal,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

// ---------- Jelenetek ----------

function Open() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  return (
    <Scene len={s(SCENES.open[1])}>
      <Stage>
        <div style={enter(frame, 6, 26, 40)}>
          <Wordmark size={260} />
        </div>
        <div style={{ ...enter(frame, 30), marginTop: 40 }}>
          <Mono style={{ fontSize: 26 }}>{copy.openLine}</Mono>
        </div>
      </Stage>
    </Scene>
  );
}

function Quote() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  const headline: CSSProperties = {
    fontFamily: F.display,
    fontWeight: 800,
    fontSize: 110,
    lineHeight: 1.04,
    letterSpacing: "-0.04em",
    margin: 0,
  };
  return (
    <Scene len={s(SCENES.quote[1])}>
      <Stage>
        <div style={enter(frame, 0)}>
          <Mono>{copy.quoteEyebrow}</Mono>
        </div>
        <p style={{ ...headline, ...enter(frame, 8, 24), color: C.ink, marginTop: 36 }}>
          {copy.quote[0]}
        </p>
        <p style={{ ...headline, ...enter(frame, 40, 24), color: C.ruleStrong }}>{copy.quote[1]}</p>
      </Stage>
    </Scene>
  );
}

function TwoThings() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  return (
    <Scene len={s(SCENES.two[1])}>
      <Stage>
        <div style={enter(frame, 0)}>
          <Mono>{copy.twoEyebrow}</Mono>
        </div>
        <h2
          style={{
            ...enter(frame, 6, 24),
            fontFamily: F.display,
            fontWeight: 900,
            fontSize: 120,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            margin: "28px 0 64px",
            color: C.ink,
          }}
        >
          {copy.twoHeadline}
          <span style={{ color: C.signal }}>.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: `1px solid ${C.rule}`,
          }}
        >
          {copy.rows.map((row, i) => {
            const start = 50 + i * 40;
            const lit = interpolate(frame, [start + 20, start + 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={row.lab}
                style={{
                  ...enter(frame, start, 24),
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: 40,
                  paddingTop: 44,
                  paddingRight: 56,
                  paddingLeft: i === 1 ? 56 : 0,
                  borderLeft: i === 1 ? `1px solid ${C.rule}` : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: F.display,
                      fontWeight: 900,
                      fontSize: 150,
                      lineHeight: 0.8,
                      letterSpacing: "-0.06em",
                      color: lit > 0.5 ? C.signal : C.rule,
                      opacity: 0.5 + lit * 0.5,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Mono style={{ display: "block", marginTop: 20, fontSize: 18 }}>{row.lab}</Mono>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: F.display,
                      fontWeight: 800,
                      fontSize: 64,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: C.ink,
                    }}
                  >
                    {row.title}
                  </div>
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: 36,
                      lineHeight: 1.4,
                      color: C.ink2,
                      margin: "20px 0 0",
                      maxWidth: "26ch",
                    }}
                  >
                    {row.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Stage>
    </Scene>
  );
}

function Steps() {
  const frame = useCurrentFrame();
  const { steps, stepsEyebrow } = useCopy();
  const stepFrames = s(STEP_LEN);
  const current = Math.min(steps.length - 1, Math.floor(frame / stepFrames));
  const local = frame - current * stepFrames;
  const step = steps[current];
  const leave = interpolate(local, [stepFrames - 10, stepFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isLast = current === steps.length - 1;

  return (
    <Scene len={s(SCENES.steps[1])}>
      <Stage>
        <div style={enter(frame, 0)}>
          <Mono>{stepsEyebrow}</Mono>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "660px 1fr",
            gap: 80,
            alignItems: "start",
            marginTop: 48,
            paddingTop: 48,
            borderTop: `1px solid ${C.rule}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {steps.map((st, i) => {
              const active = i === current;
              const done = i < current;
              return (
                <div
                  key={st.title}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 28,
                    ...enter(frame, 6 + i * 5, 18, 16),
                  }}
                >
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontWeight: 500,
                      fontSize: 24,
                      letterSpacing: "0.1em",
                      color: active ? C.signal : done ? C.ink : C.ruleStrong,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: F.display,
                      fontWeight: 800,
                      fontSize: 36,
                      letterSpacing: "-0.025em",
                      color: active ? C.ink : done ? C.mid : C.ruleStrong,
                    }}
                  >
                    {st.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ opacity: isLast ? 1 : leave, position: "relative" }}>
            <div
              style={{
                ...enter(local, 4, 22, 36),
                fontFamily: F.display,
                fontWeight: 900,
                fontSize: 300,
                lineHeight: 0.78,
                letterSpacing: "-0.06em",
                color: C.ruleSoft,
                position: "absolute",
                right: 0,
                top: -10,
              }}
            >
              {String(current + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                ...enter(local, 8, 22),
                fontFamily: F.display,
                fontWeight: 900,
                fontSize: 84,
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: C.ink,
                position: "relative",
              }}
            >
              {step.title}
            </div>
            <p
              style={{
                ...enter(local, 22, 24),
                fontFamily: F.body,
                fontSize: 44,
                lineHeight: 1.4,
                color: C.ink2,
                margin: "36px 0 0",
                maxWidth: "36ch",
                position: "relative",
              }}
            >
              {step.text}
            </p>
          </div>
        </div>
      </Stage>
    </Scene>
  );
}

function Pledge() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  return (
    <Scene len={s(SCENES.promise[1])}>
      <Stage>
        <div
          style={{
            ...enter(frame, 4, 26),
            fontFamily: F.display,
            fontWeight: 900,
            fontSize: 132,
            letterSpacing: "-0.05em",
            lineHeight: 0.98,
            color: C.ink,
            maxWidth: "20ch",
          }}
        >
          {copy.pledge[0]}
          <span style={{ color: C.ruleStrong }}>{copy.pledge[1]}</span>
        </div>
      </Stage>
    </Scene>
  );
}

function Close() {
  const frame = useCurrentFrame();
  const copy = useCopy();
  return (
    <Scene len={s(SCENES.close[1]) + 12}>
      <Stage>
        <div style={enter(frame, 4, 26, 40)}>
          <Wordmark size={220} />
        </div>
        <div
          style={{
            ...enter(frame, 24),
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 56,
          }}
        >
          <span
            style={{
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: "-0.01em",
              color: C.panel,
              background: C.ink,
              padding: "26px 44px",
            }}
          >
            {copy.cta}
          </span>
          <Mono style={{ fontSize: 26, color: C.ink, letterSpacing: "0.12em" }}>{copy.ctaUrl}</Mono>
          <Mono style={{ fontSize: 22 }}>{copy.ctaNote}</Mono>
        </div>
      </Stage>
    </Scene>
  );
}

// A betűtípusok betöltéséig nem rögzítünk képkockát — különben az első
// képkockák tartalék fonttal kerülnének a videóba.
function useFontsReady() {
  const [handle] = useState(() => delayRender("Betűtípusok betöltése"));
  useEffect(() => {
    const faces = [
      `900 100px ${F.display}`,
      `800 100px ${F.display}`,
      `400 40px ${F.body}`,
      `500 20px ${F.mono}`,
    ];
    Promise.all(faces.map((f) => document.fonts.load(f, "ŐőŰűÁá"))).then(() =>
      continueRender(handle)
    );
  }, [handle]);
}

export function Cegbemutato({ lang }: { lang: "hu" | "en" }) {
  useFontsReady();
  const scene = (key: keyof typeof SCENES) => ({
    from: s(SCENES[key][0]),
    durationInFrames: s(SCENES[key][1]),
  });

  return (
    <CopyContext.Provider value={lang === "en" ? EN : HU}>
      <AbsoluteFill style={{ background: C.ground, color: C.ink }}>
        <Sequence {...scene("open")}>
          <Open />
        </Sequence>
        <Sequence {...scene("quote")}>
          <Quote />
        </Sequence>
        <Sequence {...scene("two")}>
          <TwoThings />
        </Sequence>
        <Sequence {...scene("steps")}>
          <Steps />
        </Sequence>
        <Sequence {...scene("promise")}>
          <Pledge />
        </Sequence>
        <Sequence {...scene("close")}>
          <Close />
        </Sequence>
        <Chrome />
      </AbsoluteFill>
    </CopyContext.Provider>
  );
}
