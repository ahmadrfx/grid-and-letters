import { useState, useEffect, useCallback } from "react";

/**
 * Chapter 4 — Grid × Type
 *
 * Two interactive demos showing how type lives on the grid:
 *
 *   1. Type Scale Slider — drag a range input from Minor Second (1.067)
 *      to Golden Ratio (1.618). Every --text-N CSS custom property
 *      recalculates in real time. A visual scale ladder shows each step.
 *
 *   2. Measure Comparison — same paragraph at 35ch, 55ch, 75ch widths.
 *      Demonstrates the 45–75 character ideal for line length.
 */

/* ── Type scale math ─────────────────────────────────── */

interface ScaleStep {
  name: string;
  step: number;
  label: string;
}

const SCALE_STEPS: ScaleStep[] = [
  { name: "--text-00", step: -1, label: "00" },
  { name: "--text-0", step: 0, label: "0" },
  { name: "--text-1", step: 1, label: "1 (body)" },
  { name: "--text-2", step: 2, label: "2" },
  { name: "--text-3", step: 3, label: "3" },
  { name: "--text-4", step: 4, label: "4" },
  { name: "--text-5", step: 5, label: "5" },
  { name: "--text-6", step: 6, label: "6 (display)" },
  { name: "--text-7", step: 7, label: "7" },
  { name: "--text-8", step: 8, label: "8" },
  { name: "--text-9", step: 9, label: "9" },
];

/** Build clamp(min, preferred, max) for a given desktop size. */
function clampExpr(desktopRem: number): string {
  const min = desktopRem * 0.68;
  const slope = (desktopRem - min) / 65; // rem per rem of viewport (400px–1440px range)
  const vwSlope = slope * 100; // convert to vw units
  const offset = min - slope * 25; // rem at 0 viewport width
  return `clamp(${min.toFixed(3)}rem, ${offset.toFixed(3)}rem + ${vwSlope.toFixed(3)}vw, ${desktopRem.toFixed(3)}rem)`;
}

function applyScale(ratio: number) {
  const root = document.documentElement;
  const base = 1; // rem — body size (--text-1)
  for (const s of SCALE_STEPS) {
    const desktop = base * Math.pow(ratio, s.step);
    root.style.setProperty(s.name, clampExpr(desktop));
  }
}

/* ── Musical ratio reference marks ──────────────────── */

const RATIO_MARKS = [
  { value: 1.067, label: "Minor 2nd" },
  { value: 1.125, label: "Major 2nd" },
  { value: 1.2, label: "Minor 3rd" },
  { value: 1.25, label: "Major 3rd" },
  { value: 1.333, label: "Perfect 4th" },
  { value: 1.5, label: "Perfect 5th" },
  { value: 1.618, label: "Golden φ" },
];

/* ── Measure comparison text ─────────────────────────── */

const MEASURE_TEXT = `The ideal line length for body text is between forty-five and seventy-five characters. When lines are too short, the eye is forced to jump too frequently — breaking rhythm. When lines are too long, the eye struggles to find the start of the next line — breaking focus. This paragraph is set at three different column widths to demonstrate the difference. Read each one. Notice where your eye tires. The grid does not merely position text — it shapes how you experience it.`;

/* ── Section component ────────────────────────────────── */

const DEFAULT_RATIO = 1.25;

export default function GridType() {
  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  // Apply scale to :root on mount and on every ratio change
  useEffect(() => {
    applyScale(ratio);
  }, [ratio]);

  // Restore original scale on unmount
  useEffect(() => {
    return () => {
      applyScale(DEFAULT_RATIO);
    };
  }, []);

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRatio(parseFloat(e.target.value));
    },
    []
  );

  // Find the closest named ratio mark
  const currentMark = RATIO_MARKS.reduce((prev, curr) =>
    Math.abs(curr.value - ratio) < Math.abs(prev.value - ratio) ? curr : prev
  );

  return (
    <section
      className="section content-grid"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter header ──────────────────────────────── */}
      <div
        style={{
          gridColumn: "2 / span 8",
          marginBottom: "clamp(3rem, 8vh, 5rem)",
        }}
      >
        <p
          className="mono"
          style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
        >
          [Chapter&nbsp;4]
        </p>
        <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
          Grid × Type
        </h2>
        <p className="body-large" style={{ maxWidth: "50ch" }}>
          How type lives on the grid.
          <br />
          Scale it. Measure it. Watch it breathe.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════
          Demo 1 — Type Scale Slider
          ════════════════════════════════════════════════════ */}
      <div style={{ gridColumn: "2 / -2", marginBottom: "clamp(4rem, 12vh, 8rem)" }}>
        <h3 className="heading" style={{ marginBottom: "0.5rem" }}>
          Type Scale
        </h3>
        <p
          className="body-copy"
          style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)", maxWidth: "50ch" }}
        >
          Drag the slider to change the type scale ratio. Every step from{" "}
          <code className="mono">--text-00</code> to{" "}
          <code className="mono">--text-9</code> recalculates in real time.
        </p>

        {/* Ratio display */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-4)",
              fontWeight: 700,
            }}
          >
            {ratio.toFixed(3)}
          </span>
          <span className="mono" style={{ color: "var(--color-accent)" }}>
            ≈ {currentMark.label}
          </span>
        </div>

        {/* Slider */}
        <div style={{ position: "relative", marginBottom: "0.5rem" }}>
          <input
            type="range"
            min="1.067"
            max="1.618"
            step="0.001"
            value={ratio}
            onChange={handleSlider}
            aria-label="Type scale ratio"
            style={{
              width: "100%",
              accentColor: "var(--color-accent)",
              cursor: "pointer",
            }}
          />
          {/* Tick marks at key ratios */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingInline: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            {RATIO_MARKS.map((m) => {
              const pct =
                ((m.value - 1.067) / (1.618 - 1.067)) * 100;
              return (
                <span
                  key={m.value}
                  className="mono"
                  style={{
                    position: "absolute",
                    left: `${pct}%`,
                    transform: "translateX(-50%)",
                    top: "1.75rem",
                    color:
                      Math.abs(ratio - m.value) < 0.015
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                    fontSize: "0.625rem",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s ease",
                  }}
                >
                  {m.value}
                </span>
              );
            })}
          </div>
        </div>

        {/* Spacer for tick labels */}
        <div style={{ height: "1.5rem", marginBottom: "clamp(1.5rem, 4vh, 2.5rem)" }} />

        {/* Visual scale ladder */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--color-border)",
            padding: "clamp(1rem, 3vw, 2rem)",
            background: "var(--color-surface)",
          }}
        >
          {SCALE_STEPS.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "clamp(0.5rem, 2vw, 1.5rem)",
                borderBottom: "1px solid var(--color-border)",
                paddingBlock: "0.25rem",
              }}
            >
              <span
                className="mono"
                style={{
                  color: "var(--color-text-muted)",
                  minWidth: "4.5rem",
                  flexShrink: 0,
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontSize: `var(${s.name})`,
                  lineHeight: 1.1,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Grid
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Demo 2 — Measure Comparison
          ════════════════════════════════════════════════════ */}
      <div style={{ gridColumn: "2 / -2", marginBottom: "clamp(2rem, 6vh, 4rem)" }}>
        <h3 className="heading" style={{ marginBottom: "0.5rem" }}>
          Measure
        </h3>
        <p
          className="body-copy"
          style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)", maxWidth: "50ch" }}
        >
          The ideal line length is 45–75 characters. Below that, your eye jumps
          too often. Above it, your eye gets lost finding the next line.
        </p>

        {/* Three columns */}
        <div
          className="measure-columns"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--grid-gap)",
          }}
        >
          {[
            { width: "35ch", label: "35ch — Too Narrow", verdict: "↓ rhythm" },
            { width: "55ch", label: "55ch — Ideal", verdict: "✓ balanced" },
            { width: "75ch", label: "75ch — Maximum", verdict: "↓ focus" },
          ].map((col) => (
            <div key={col.width}>
              <div
                className="mono"
                style={{
                  color: "var(--color-accent)",
                  marginBottom: "0.75rem",
                }}
              >
                [{col.label}]
              </div>
              <p
                className="body-copy"
                style={{ maxWidth: col.width }}
              >
                {MEASURE_TEXT}
              </p>
              <div
                className="mono"
                style={{
                  color: "var(--color-text-muted)",
                  marginTop: "0.75rem",
                }}
              >
                {col.verdict}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer annotation ──────────────────────────── */}
      <div
        className="mono"
        style={{
          gridColumn: "2 / span 4",
          color: "var(--color-text-muted)",
        }}
      >
        <div>[Scale&nbsp;→&nbsp;{ratio.toFixed(3)}&nbsp;≈&nbsp;{currentMark.label}]</div>
        <div>[Measure&nbsp;→&nbsp;45–75&nbsp;characters per line]</div>
        <div>[Method&nbsp;→&nbsp;style.setProperty on :root]</div>
      </div>
    </section>
  );
}
