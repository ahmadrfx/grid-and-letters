import { useState } from "react";

/**
 * Chapter 3 — The Grid
 *
 * Interactive grid pattern switcher.
 * Four historical grid modes. Same four content blocks.
 * Click a mode — watch the content reflow.
 *
 * Modes:
 *   Manuscript   — single column, generous margins
 *   Column       — newspaper multi-column
 *   Modular      — Swiss rigid cells
 *   Hierarchical — asymmetric dominance
 */

interface GridMode {
  id: string;
  label: string;
  description: string;
  cols: string;
  rows: string;
  areas: string;
}

const GRID_MODES: GridMode[] = [
  {
    id: "manuscript",
    label: "Manuscript",
    description:
      "A single column centered in generous margins. The text is the authority — nothing competes for attention. Scribes have used this layout for millennia.",
    cols: "1fr 2.5fr 1fr",
    rows: "auto",
    areas: `
      ". a ."
      ". b ."
      ". c ."
      ". d ."
    `,
  },
  {
    id: "column",
    label: "Column",
    description:
      "Multi-column text flow. Parallel tracks carry the eye across the page. Born in newsprint, refined by modernist typographers — density without chaos.",
    cols: "1fr 1fr 1fr",
    rows: "auto",
    areas: `
      "a a a"
      "b b c"
      "d d d"
    `,
  },
  {
    id: "modular",
    label: "Modular",
    description:
      "Rigid cells on a fixed matrix. Every element snaps to the module — Swiss precision. Brockmann, Gerstner: the grid as intellectual discipline.",
    cols: "1fr 1fr 1fr 1fr",
    rows: "1fr 1fr",
    areas: `
      "a a b c"
      "a a d d"
    `,
  },
  {
    id: "hierarchical",
    label: "Hierarchical",
    description:
      "Asymmetric. One element dominates; others orbit around it. The modern web's native pattern — visual weight, not grid lines, guides the eye.",
    cols: "1fr 1fr 1fr 1fr",
    rows: "auto auto auto",
    areas: `
      "a a a d"
      "b b c d"
      "b b . ."
    `,
  },
];

/* ── Content blocks ──────────────────────────────────── */

function BlockA() {
  return (
    <div style={{ gridArea: "a" }}>
      <h3
        className="display-sm"
        style={{ lineHeight: 0.95, marginBottom: 0 }}
      >
        The Grid Is The Content
      </h3>
    </div>
  );
}

function BlockB() {
  return (
    <div style={{ gridArea: "b" }} className="body-copy">
      <p>
        Before any letter is set, before any image is placed — the grid is
        already there. It is the first design decision and the last thing
        anyone notices. A grid is not a cage. It is a rhythm, a conversation
        between constraint and freedom, a way of saying{" "}
        <em>this belongs here</em> without raising your voice.
      </p>
    </div>
  );
}

function BlockC() {
  return (
    <div
      style={{
        gridArea: "c",
        display: "flex",
        flexDirection: "column",
        gap: "var(--grid-gap)",
        justifyContent: "center",
      }}
    >
      {[
        { value: "12", label: "Columns" },
        { value: "1rem", label: "Gap" },
        { value: "∞", label: "Layouts" },
      ].map((stat) => (
        <div
          key={stat.label}
          style={{
            border: "1px solid var(--color-border)",
            padding: "clamp(0.4rem, 1.5vw, 0.75rem)",
            textAlign: "center",
            background: "var(--color-surface)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-4)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {stat.value}
          </div>
          <div className="mono" style={{ color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockD() {
  return (
    <div
      style={{
        gridArea: "d",
        background: "var(--color-accent)",
        opacity: 0.12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <span
        className="mono"
        style={{ color: "var(--color-text)", fontWeight: 600 }}
      >
        [Media&nbsp;→&nbsp;Placeholder]
      </span>
    </div>
  );
}

/* ── Section component ────────────────────────────────── */

export default function TheGrid() {
  const [activeId, setActiveId] = useState("manuscript");
  const active = GRID_MODES.find((m) => m.id === activeId)!;

  return (
    <section
      className="section content-grid"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter header ──────────────────────────────── */}
      <div
        style={{
          gridColumn: "2 / span 8",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <p
          className="mono"
          style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
        >
          [Chapter&nbsp;3]
        </p>
        <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
          The Grid
        </h2>
        <p className="body-large" style={{ maxWidth: "50ch" }}>
          Same content. Four grid patterns.
          <br />
          The grid is not decoration — it decides what matters.
        </p>
      </div>

      {/* ── Mode selector ──────────────────────────────── */}
      <nav
        style={{
          gridColumn: "2 / -2",
          display: "flex",
          gap: "0.5rem",
          marginBottom: "clamp(1rem, 2vh, 1.5rem)",
          flexWrap: "wrap",
        }}
        aria-label="Grid pattern selector"
      >
        {GRID_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveId(mode.id)}
            className="mono"
            style={{
              padding: "0.4rem 1rem",
              border:
                mode.id === activeId
                  ? "1px solid var(--color-accent)"
                  : "1px solid var(--color-border)",
              background:
                mode.id === activeId ? "var(--color-accent)" : "transparent",
              color:
                mode.id === activeId
                  ? "var(--color-bg)"
                  : "var(--color-text-muted)",
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {mode.label}
          </button>
        ))}
      </nav>

      {/* ── Mode description ───────────────────────────── */}
      <p
        className="body-copy"
        style={{
          gridColumn: "2 / span 6",
          marginBottom: "clamp(1.5rem, 4vh, 3rem)",
        }}
      >
        {active.description}
      </p>

      {/* ── Grid playground ────────────────────────────── */}
      <div
        key={activeId}
        className="grid-playground"
        style={{
          gridColumn: "2 / -2",
          display: "grid",
          gridTemplateColumns: active.cols,
          gridTemplateRows: active.rows,
          gridTemplateAreas: active.areas,
          gap: "clamp(0.5rem, 2vw, 1rem)",
          minHeight: "clamp(20rem, 50vh, 36rem)",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <BlockA />
        <BlockB />
        <BlockC />
        <BlockD />
      </div>

      {/* ── Footer annotation ──────────────────────────── */}
      <div
        className="mono"
        style={{
          gridColumn: "2 / span 4",
          color: "var(--color-text-muted)",
        }}
      >
        <div>
          [Pattern&nbsp;→&nbsp;{active.label}]
        </div>
        <div>
          [Tracks&nbsp;→&nbsp;{active.cols.split(" ").length} columns]
        </div>
        <div>
          [Method&nbsp;→&nbsp;grid-template-areas]
        </div>
      </div>
    </section>
  );
}
