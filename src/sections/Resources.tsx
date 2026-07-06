import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Chapter 6 — Resources
 *
 * Clean, restrained finale.
 * Foundries, books, tools, and inspiration — each in a card,
 * each title in a face that belongs to its category.
 *
 * Footer:
 *   [End] marker — click to scroll back to the top.
 */

/* ── Resource data ──────────────────────────────────── */

interface Resource {
  name: string;
  description: string;
  fontVar: string;
}

interface ResourceCategory {
  label: string;
  items: Resource[];
}

const CATEGORIES: ResourceCategory[] = [
  {
    label: "Foundries",
    items: [
      {
        name: "Klim Type Foundry",
        description:
          "Contemporary typefaces with rigorous craft — from the sharp Söhne to the warm Tiempos.",
        fontVar: "var(--font-serif)",
      },
      {
        name: "Commercial Type",
        description:
          "Stalwarts of editorial and identity design. Lyon, Graphik, Publico — modern classics.",
        fontVar: "var(--font-serif)",
      },
      {
        name: "Dinamo",
        description:
          "Playful, precise, independent. A Swiss-German collective pushing the edges of what type can be.",
        fontVar: "var(--font-serif)",
      },
      {
        name: "Grilli Type",
        description:
          "Swiss precision meets contemporary attitude. GT America, GT Sectra, GT Flexa.",
        fontVar: "var(--font-serif)",
      },
    ],
  },
  {
    label: "Books",
    items: [
      {
        name: "The Elements of Typographic Style",
        description:
          "Robert Bringhurst's definitive guide — poet, typographer, and historian in one voice.",
        fontVar: "var(--font-modern)",
      },
      {
        name: "Thinking with Type",
        description:
          "Ellen Lupton's accessible, visual primer. The book that made a generation care about type.",
        fontVar: "var(--font-modern)",
      },
      {
        name: "Grid Systems in Graphic Design",
        description:
          "Josef Müller-Brockmann's bible of the modular grid. Still the definitive text on structured layout.",
        fontVar: "var(--font-modern)",
      },
      {
        name: "The Form of the Book",
        description:
          "Jan Tschichold on page proportion, margins, and the architecture of the codex. Timeless.",
        fontVar: "var(--font-modern)",
      },
    ],
  },
  {
    label: "Tools",
    items: [
      {
        name: "Glyphs",
        description:
          "Professional type design for macOS. The tool behind most contemporary typefaces shipping today.",
        fontVar: "var(--font-mono)",
      },
      {
        name: "FontForge",
        description:
          "Free, open-source type editor. Rough edges, deep capabilities — the Linux of font tools.",
        fontVar: "var(--font-mono)",
      },
      {
        name: "Wakamai Fondue",
        description:
          "Drop a font file, see every OpenType feature inside. A type specimen generator for the curious.",
        fontVar: "var(--font-mono)",
      },
    ],
  },
  {
    label: "Inspiration",
    items: [
      {
        name: "Typewolf",
        description:
          "What's trending in type. A curated feed of fonts in use across the web — updated daily.",
        fontVar: "var(--font-geo)",
      },
      {
        name: "Fonts In Use",
        description:
          "An archive of typographic design. Search by typeface, format, industry, or era.",
        fontVar: "var(--font-geo)",
      },
      {
        name: "I Love Typography",
        description:
          "John Boardley's long-running blog. Essays on type history, design, and the people behind the letters.",
        fontVar: "var(--font-geo)",
      },
    ],
  },
];

/* ── Scroll-to-top helper ────────────────────────────── */

function scrollToTop() {
  const smoother = (window as any).__smoother;
  if (smoother) {
    smoother.scrollTo(0, true);
  } else {
    gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: "power2.inOut" });
  }
}

/* ── Section component ────────────────────────────────── */

export default function Resources() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resources-category",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resources-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section content-grid"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter header ──────────────────────────────── */}
      <div
        style={{
          gridColumn: "2 / span 8",
          marginBottom: "clamp(3rem, 8vh, 6rem)",
        }}
      >
        <p
          className="mono"
          style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
        >
          [Chapter&nbsp;6]
        </p>
        <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
          Resources
        </h2>
        <p className="body-large" style={{ maxWidth: "50ch" }}>
          Foundries, books, tools, and inspiration.
          <br />
          For when you want to go deeper.
        </p>
      </div>

      {/* ── Resource categories ─────────────────────────── */}
      <div className="resources-grid" style={{ gridColumn: "2 / -2" }}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="resources-category"
            style={{ marginBottom: "clamp(3rem, 8vh, 5rem)" }}
          >
            {/* Category label */}
            <h3
              className="mono"
              style={{
                color: "var(--color-accent)",
                marginBottom: "clamp(1rem, 3vh, 2rem)",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              [{cat.label}]
            </h3>

            {/* Card grid */}
            <div
              className="resources-card-grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(cat.items.length, 4)}, 1fr)`,
                gap: "var(--grid-gap)",
              }}
            >
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    border: "1px solid var(--color-border)",
                    padding: "clamp(1rem, 2.5vw, 1.5rem)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: item.fontVar,
                      fontSize: "var(--text-2)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="body-copy"
                    style={{ fontSize: "var(--text-0)", flex: 1 }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── [End] ──────────────────────────────────────── */}
      <div
        style={{
          gridColumn: "2 / -2",
          display: "flex",
          justifyContent: "center",
          paddingBlock: "clamp(3rem, 8vh, 6rem)",
          borderTop: "1px solid var(--color-border)",
          marginTop: "clamp(2rem, 5vh, 4rem)",
        }}
      >
        <button
          onClick={scrollToTop}
          className="mono"
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            padding: "0.75rem 2rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          [End]
        </button>
      </div>
    </section>
  );
}
