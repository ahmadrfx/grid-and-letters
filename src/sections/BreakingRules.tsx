import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Chapter 5 — Breaking Rules
 *
 * Five deliberate typographic transgressions.
 * Each one annotated: what rule was broken, and why it still works.
 *
 * The grid is a tool, not a cage. You can't break it until you understand it.
 *
 * Breaks:
 *   1. Bleed       — type so large it escapes the viewport
 *   2. Overlap     — two words occupying the same space
 *   3. Asymmetry   — all weight on one side, void on the other
 *   4. Scale Jump  — one word 10× larger than its neighbors
 *   5. Out of Bounds — content ignoring the grid columns entirely
 */

interface RuleBreak {
  id: string;
  rule: string;
  why: string;
}

const BREAKS: RuleBreak[] = [
  {
    id: "bleed",
    rule: "Containment",
    why: "The eye completes what it cannot see. A letterform that extends beyond the edge feels larger than the screen — infinite, uncontained.",
  },
  {
    id: "overlap",
    rule: "Separation",
    why: "When two voices occupy the same space, the tension becomes the message. Overlap is not chaos — it is counterpoint, and it demands to be read.",
  },
  {
    id: "asymmetry",
    rule: "Balance",
    why: "Negative space is not empty. When all content leans to one side, the void on the other side becomes a deliberate presence — a held breath.",
  },
  {
    id: "scale-jump",
    rule: "Hierarchy",
    why: "A single word at 10× scale breaks every rule of even texture — but the disruption IS the point. Emphasis through violence rather than weight.",
  },
  {
    id: "out-of-bounds",
    rule: "The Grid",
    why: "Content placed outside the column structure proves you understand what the grid is for. You can only break a rule you have already mastered.",
  },
];

const BREAK_PARAGRAPH =
  "The grid is not a cage. Before you can break the rules, you must know them — every column, every baseline, every measure. Only then can you step outside and make the void sing.";

export default function BreakingRules() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal each break panel on scroll
      gsap.utils.toArray<HTMLElement>(".rule-break").forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter header ──────────────────────────────── */}
      <div className="content-grid" style={{ marginBottom: "clamp(4rem, 10vh, 8rem)" }}>
        <div style={{ gridColumn: "2 / span 8" }}>
          <p
            className="mono"
            style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
          >
            [Chapter&nbsp;5]
          </p>
          <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
            Breaking Rules
          </h2>
          <p className="body-large" style={{ maxWidth: "50ch" }}>
            The grid understood. Now broken.
            <br />
            Five deliberate transgressions, annotated.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Break 1 — Bleed
          ════════════════════════════════════════════════════ */}
      <div
        className="rule-break"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <span
          className="display-xl"
          style={{
            fontSize: "clamp(8rem, 28vw, 40rem)",
            fontWeight: 900,
            lineHeight: 0.78,
            whiteSpace: "nowrap",
            margin: "-0.15em 0",
            userSelect: "none",
            color: "var(--color-text)",
          }}
        >
          BLEED
        </span>
        <div
          className="mono"
          style={{
            marginTop: "clamp(1rem, 3vh, 2rem)",
            color: "var(--color-text-muted)",
            textAlign: "center",
          }}
        >
          <div>[Rule&nbsp;Broken&nbsp;→&nbsp;Containment]</div>
          <div style={{ maxWidth: "40ch", marginTop: "0.5rem" }}>
            {BREAKS[0].why}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Break 2 — Overlap
          ════════════════════════════════════════════════════ */}
      <div
        className="rule-break"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(6rem, 18vw, 24rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 0.85,
              color: "var(--color-text)",
              opacity: 0.85,
              zIndex: 2,
              transform: "translate(3%, 0)",
              userSelect: "none",
            }}
          >
            Overlap
          </span>
          <span
            style={{
              fontFamily: "var(--font-geo)",
              fontSize: "clamp(6rem, 18vw, 24rem)",
              fontWeight: 800,
              lineHeight: 0.85,
              color: "var(--color-accent)",
              opacity: 0.55,
              zIndex: 1,
              transform: "translate(-3%, -18%)",
              position: "absolute",
              userSelect: "none",
            }}
          >
            Overlap
          </span>
        </div>
        <div
          className="mono"
          style={{
            marginTop: "clamp(2rem, 5vh, 4rem)",
            color: "var(--color-text-muted)",
            textAlign: "center",
          }}
        >
          <div>[Rule&nbsp;Broken&nbsp;→&nbsp;Separation]</div>
          <div style={{ maxWidth: "40ch", marginTop: "0.5rem" }}>
            {BREAKS[1].why}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Break 3 — Asymmetry
          ════════════════════════════════════════════════════ */}
      <div
        className="rule-break content-grid"
        style={{
          minHeight: "100vh",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <div
          style={{
            gridColumn: "9 / -1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4)",
              lineHeight: 1.4,
              fontStyle: "italic",
              color: "var(--color-text)",
              maxWidth: "30ch",
            }}
          >
            {BREAK_PARAGRAPH}
          </p>
          <div
            className="mono"
            style={{
              marginTop: "clamp(1rem, 3vh, 2rem)",
              color: "var(--color-text-muted)",
            }}
          >
            <div>[Rule&nbsp;Broken&nbsp;→&nbsp;Balance]</div>
            <div style={{ maxWidth: "35ch", marginTop: "0.5rem" }}>
              {BREAKS[2].why}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Break 4 — Scale Jump
          ════════════════════════════════════════════════════ */}
      <div
        className="rule-break"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: "var(--grid-margin)",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        <p
          className="body-large"
          style={{
            maxWidth: "55ch",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Before you can{" "}
          <span
            style={{
              fontFamily: "var(--font-geo)",
              fontSize: "clamp(4rem, 10vw, 10rem)",
              fontWeight: 800,
              lineHeight: 0.8,
              display: "inline-block",
              verticalAlign: "middle",
              color: "var(--color-accent)",
            }}
          >
            BREAK
          </span>{" "}
          the rules, you must know them — every column, every baseline, every
          measure. Only then can you step outside and make the void sing.
        </p>
        <div
          className="mono"
          style={{
            marginTop: "clamp(1.5rem, 4vh, 3rem)",
            color: "var(--color-text-muted)",
            textAlign: "center",
          }}
        >
          <div>[Rule&nbsp;Broken&nbsp;→&nbsp;Hierarchy]</div>
          <div style={{ maxWidth: "40ch", marginTop: "0.5rem" }}>
            {BREAKS[3].why}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Break 5 — Out of Bounds
          ════════════════════════════════════════════════════ */}
      <div
        className="rule-break"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          marginBottom: "clamp(2rem, 6vh, 4rem)",
        }}
      >
        {/* Letterform bleeding into the left margin */}
        <span
          style={{
            fontFamily: "var(--font-roman)",
            fontSize: "clamp(12rem, 30vw, 36rem)",
            fontWeight: 900,
            lineHeight: 0.75,
            marginLeft: "-0.15em",
            userSelect: "none",
            color: "var(--color-accent)",
            opacity: 0.15,
            position: "absolute",
            left: "-0.1em",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        >
          G
        </span>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            paddingLeft: "var(--grid-margin)",
            marginLeft: "clamp(2rem, 8vw, 8rem)",
          }}
        >
          <p
            className="body-large"
            style={{ maxWidth: "40ch", marginBottom: "clamp(1rem, 3vh, 2rem)" }}
          >
            Content is not obliged to stay in its column. The grid is a starting
            point — not a fence. When a letterform breaks free into the margin,
            it reminds you that the grid is invisible. It only has the power you
            give it.
          </p>
          <div className="mono" style={{ color: "var(--color-text-muted)" }}>
            <div>[Rule&nbsp;Broken&nbsp;→&nbsp;The&nbsp;Grid]</div>
            <div style={{ maxWidth: "35ch", marginTop: "0.5rem" }}>
              {BREAKS[4].why}
            </div>
          </div>
        </div>
      </div>

      {/* ── Outro ──────────────────────────────────────── */}
      <div className="content-grid">
        <p
          className="body-large"
          style={{
            gridColumn: "2 / span 5",
            maxWidth: "50ch",
            borderTop: "1px solid var(--color-border)",
            paddingTop: "clamp(2rem, 6vh, 4rem)",
          }}
        >
          These five breaks are not mistakes. They are proof that the grid is
          understood — and that understanding is the only prerequisite to
          transcendence.
        </p>
      </div>
    </section>
  );
}
