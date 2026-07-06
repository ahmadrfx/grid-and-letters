import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Chapter 1 — Anatomy
 *
 * A visual dictionary of typographic anatomy.
 * Massive letterforms with gradient highlights reveal
 * the architecture: ascenders, x-height, descenders,
 * serifs, bowls, counters, and terminals.
 *
 * Each entry pairs a letter with its highlighted zone,
 * rendered in the typeface that best demonstrates the feature.
 */

interface AnatomyEntry {
  letter: string;
  term: string;
  definition: string;
  typeface: string;
  fontVar: string;
  gradient: string;
  fontWeight: number;
}

const ENTRIES: AnatomyEntry[] = [
  {
    letter: "h",
    term: "Ascender",
    definition:
      "The stem that rises above the x-height, reaching toward the ascender line. In lowercase letters like h, b, d, and k, this upward stroke defines vertical rhythm.",
    typeface: "Inter",
    fontVar: "var(--font-sans)",
    gradient:
      "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent) 32%, var(--color-text) 32%)",
    fontWeight: 700,
  },
  {
    letter: "x",
    term: "x-height",
    definition:
      "The height of the lowercase x — the backbone of readability. A larger x-height improves legibility at small sizes but reduces the distinction between letterforms.",
    typeface: "Inter",
    fontVar: "var(--font-sans)",
    gradient:
      "linear-gradient(to bottom, var(--color-text-muted) 0%, var(--color-text-muted) 25%, var(--color-accent) 25%, var(--color-accent) 75%, var(--color-text-muted) 75%)",
    fontWeight: 700,
  },
  {
    letter: "p",
    term: "Descender",
    definition:
      "The tail that drops below the baseline. In p, q, g, j, and y, the descender anchors the letter and adds distinctive character — especially in old-style serifs.",
    typeface: "EB Garamond",
    fontVar: "var(--font-serif)",
    gradient:
      "linear-gradient(to bottom, var(--color-text) 0%, var(--color-text) 70%, var(--color-accent) 70%)",
    fontWeight: 500,
  },
  {
    letter: "T",
    term: "Serif",
    definition:
      "The small stroke at the end of a main stroke. Serifs guide the eye horizontally and lend a formal, classical voice. Bracketed in old-style, hairline in modern, slab in Egyptian.",
    typeface: "EB Garamond",
    fontVar: "var(--font-serif)",
    gradient:
      "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent) 6%, var(--color-text) 6%, var(--color-text) 94%, var(--color-accent) 94%)",
    fontWeight: 500,
  },
  {
    letter: "d",
    term: "Bowl",
    definition:
      "The enclosed rounded part of a letter. In b, d, p, q, g, and o, the bowl creates the letter's interior space — its shape varies dramatically between type families.",
    typeface: "EB Garamond",
    fontVar: "var(--font-serif)",
    gradient:
      "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-accent) 48%, var(--color-text) 48%)",
    fontWeight: 500,
  },
  {
    letter: "o",
    term: "Counter",
    definition:
      "The fully or partially enclosed space inside a letter. The counter's shape — whether circular, oval, or angular — gives a typeface its essential character and texture.",
    typeface: "Poppins",
    fontVar: "var(--font-geo)",
    gradient:
      "radial-gradient(ellipse 50% 35% at 50% 55%, var(--color-accent) 0%, var(--color-accent) 35%, var(--color-text) 35%)",
    fontWeight: 700,
  },
  {
    letter: "a",
    term: "Terminal",
    definition:
      "The end of a stroke that does not end in a serif. In the lowercase a, the terminal is the small curved tail at the top-right — subtle, but a signature of the typeface's voice.",
    typeface: "EB Garamond",
    fontVar: "var(--font-serif)",
    gradient:
      "linear-gradient(to right, var(--color-text) 0%, var(--color-text) 75%, var(--color-accent) 75%)",
    fontWeight: 500,
  },
];

export default function Anatomy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger each anatomy entry in as it scrolls into view
      gsap.fromTo(
        ".anatomy-entry",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anatomy-entries",
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section content-grid baseline-grid"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter intro ──────────────────────────────── */}
      <div style={{ gridColumn: "2 / span 8", marginBottom: "clamp(4rem, 10vh, 10rem)" }}>
        <p className="mono" style={{ color: "var(--color-accent)", marginBottom: "1rem" }}>
          [Chapter&nbsp;1]
        </p>
        <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
          Anatomy
        </h2>
        <p className="body-large" style={{ maxWidth: "50ch" }}>
          Every letter is a structure — stems, bowls, serifs, and counters.
          <br />
          Here, the letterform becomes the diagram.
        </p>
      </div>

      {/* ── Visual dictionary ──────────────────────────── */}
      <div className="anatomy-entries" style={{ gridColumn: "2 / -2" }}>
        {ENTRIES.map((entry, i) => {
          const isEven = i % 2 === 0;

          return (
            <div
              key={entry.term}
              className="anatomy-entry"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--grid-gap)",
                alignItems: "center",
                minHeight: "clamp(20rem, 45vh, 36rem)",
                borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
                paddingBlock: "clamp(2rem, 5vh, 4rem)",
              }}
            >
              {/* Letter side */}
              <div
                style={{
                  gridColumn: isEven ? "1" : "2",
                  gridRow: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span
                  className="letter-highlight"
                  style={{
                    fontFamily: entry.fontVar,
                    fontSize: "clamp(8rem, 18vw, 22rem)",
                    fontWeight: entry.fontWeight,
                    lineHeight: 0.85,
                    background: entry.gradient,
                    userSelect: "none",
                  }}
                >
                  {entry.letter}
                </span>
              </div>

              {/* Text side */}
              <div
                style={{
                  gridColumn: isEven ? "2" : "1",
                  gridRow: "1",
                  paddingInline: "clamp(1rem, 3vw, 3rem)",
                }}
              >
                <h3
                  className="display-sm"
                  style={{
                    marginBottom: "1rem",
                    fontFamily: entry.fontVar,
                  }}
                >
                  {entry.term}
                </h3>
                <p
                  className="body-copy"
                  style={{ marginBottom: "1.5rem", maxWidth: "45ch" }}
                >
                  {entry.definition}
                </p>
                <span className="mono" style={{ color: "var(--color-text-muted)" }}>
                  [Type&nbsp;→&nbsp;{entry.typeface}]
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer annotation ──────────────────────────── */}
      <p
        className="mono"
        style={{
          gridColumn: "2 / span 4",
          color: "var(--color-text-muted)",
          marginTop: "clamp(4rem, 10vh, 8rem)",
          paddingBottom: "var(--grid-margin)",
        }}
      >
        The highlighted zones are approximate — real anatomy is more nuanced.
        <br />
        Best viewed in a browser that supports <code>background-clip: text</code>.
      </p>
    </section>
  );
}
