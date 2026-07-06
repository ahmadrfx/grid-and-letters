import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chapter 2 — History
 *
 * A horizontal timeline of typographic history, driven by vertical scroll.
 *
 * Mechanics:
 *   - The timeline container gets pinned while the user scrolls.
 *   - Inside the pin, a horizontal track translates left — six era cards
 *     slide through the viewport in sequence.
 *   - Each card fades/scales in as it enters via containerAnimation.
 *   - The global --grid-gap tightens progressively: loose manuscript
 *     spacing → pixel-precise digital rhythm.
 *
 * Eras:
 *   Trajan 113  →  Gutenberg 1455  →  Garamond 1530
 *   Bodoni 1798  →  Helvetica 1957  →  Variable Fonts 2016
 */

interface Era {
  year: string;
  era: string;
  typeface: string;
  fontVar: string;
  description: string;
}

const ERAS: Era[] = [
  {
    year: "113",
    era: "Trajan's Column",
    typeface: "Cinzel",
    fontVar: "var(--font-roman)",
    description:
      "Roman square capitals carved in stone. The serif is born — not as a stylistic flourish, but as the natural termination of a chisel stroke. Inscribed letters that have outlasted empires.",
  },
  {
    year: "1455",
    era: "Gutenberg",
    typeface: "UnifrakturMaguntia",
    fontVar: "var(--font-blackletter)",
    description:
      "Moveable type meets the 42-line Bible. Blackletter's dense, angular texture — born from the scribe's pen — becomes the first mass-produced letterform. Literacy's first explosion.",
  },
  {
    year: "1530",
    era: "Garamond",
    typeface: "EB Garamond",
    fontVar: "var(--font-serif)",
    description:
      "Old-style serif reaches its apex. Claude Garamond's roman types balance warmth with precision — the diagonal stress, the organic curves. Still unmatched after five centuries.",
  },
  {
    year: "1798",
    era: "Bodoni",
    typeface: "Bodoni Moda",
    fontVar: "var(--font-modern)",
    description:
      "The Didone revolution: extreme contrast between hairline thins and slab thicks. Unbracketed serifs. Type as luxury object. Fashion magazines, high contrast, pure drama.",
  },
  {
    year: "1957",
    era: "Helvetica",
    typeface: "Inter",
    fontVar: "var(--font-sans)",
    description:
      "Neo-grotesque neutrality conquers the world. Max Miedinger's design — horizontal terminals, closed apertures, uniform stroke — becomes the voice of modernism: corporate, clean, ubiquitous.",
  },
  {
    year: "2016",
    era: "Variable Fonts",
    typeface: "Inter Variable",
    fontVar: "var(--font-sans)",
    description:
      "OpenType 1.8. A single font file hosting infinite axes — weight, width, slant, optical size. For the first time in history, type adapts to its context rather than being fixed at cast.",
  },
];

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 48rem)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { isMobile, reduceMotion } = ctx.conditions as {
          isMobile: boolean;
          reduceMotion: boolean;
        };
        const track = trackRef.current;
        if (!track) return;

        if (isMobile) {
          // ════════════════════════════════════════════════════
          // MOBILE — vertical stack, one card highlighted at a time.
          // ════════════════════════════════════════════════════
          if (reduceMotion) {
            // Accessibility: cards are always fully visible, no scroll link
            gsap.set(".history-card", { opacity: 1, scale: 1 });
          } else {
            gsap.utils.toArray<HTMLElement>(".history-card").forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0.2, scale: 0.85 },
                {
                  opacity: 1,
                  scale: 1,
                  ease: "power2.in",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                  },
                }
              );
              gsap.fromTo(
                card,
                { opacity: 1, scale: 1 },
                {
                  opacity: 0.2,
                  scale: 0.85,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "center center",
                    end: "bottom top",
                    scrub: 1,
                  },
                }
              );
            });
          }

          // Grid tightening
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const gap = gsap.utils.interpolate(
                "clamp(0.5rem, 2vw, 1rem)",
                "clamp(0.5rem, 2vw, 0.25rem)",
                self.progress
              );
              document.documentElement.style.setProperty("--grid-gap", gap);
            },
          });
        } else {
          // ════════════════════════════════════════════════════
          // DESKTOP — pinned horizontal scroll
          // ════════════════════════════════════════════════════
          const pin = pinRef.current;
          if (!pin) return;

          const getDistance = () => {
            const cards = track.querySelectorAll<HTMLElement>(".history-card");
            const last = cards[cards.length - 1];
            if (!last) return 500;
            const cardW = last.offsetWidth;
            const style = window.getComputedStyle(track);
            const padR = parseFloat(style.paddingRight) || 0;
            const raw =
              track.scrollWidth - padR - cardW / 2 - window.innerWidth / 2;
            return Math.max(raw, 500);
          };

          if (reduceMotion) {
            // Accessibility: no pin, no horizontal scroll — let the section
            // flow naturally as a vertical stack
            gsap.set(".history-card", { opacity: 1, scale: 1 });
          } else {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${getDistance()}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const gap = gsap.utils.interpolate(
                    "clamp(0.5rem, 2vw, 1rem)",
                    "clamp(0.5rem, 2vw, 0.25rem)",
                    self.progress
                  );
                  document.documentElement.style.setProperty("--grid-gap", gap);
                },
              },
            });

            tl.to(track, { x: () => -getDistance(), ease: "none" });

            gsap.utils.toArray<HTMLElement>(".history-card").forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0.25, scale: 0.9 },
                {
                  opacity: 1,
                  scale: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "right 90%",
                    end: "left 10%",
                    containerAnimation: tl,
                    scrub: true,
                  },
                }
              );
            });
          }
        }

        // ── Reset grid-gap once the section is fully scrolled past ──
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom top",
          onLeave: () =>
            document.documentElement.style.removeProperty("--grid-gap"),
          onEnterBack: () =>
            document.documentElement.style.removeProperty("--grid-gap"),
        });

        // Return cleanup (matchMedia calls this when conditions change)
        return () => {
          document.documentElement.style.removeProperty("--grid-gap");
        };
      },
      sectionRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* ── Chapter header ──────────────────────────────── */}
      <div className="content-grid" style={{ marginBottom: "clamp(2rem, 6vh, 6rem)" }}>
        <div style={{ gridColumn: "2 / span 8" }}>
          <p
            className="mono"
            style={{ color: "var(--color-accent)", marginBottom: "1rem" }}
          >
            [Chapter&nbsp;2]
          </p>
          <h2 className="display-sm" style={{ marginBottom: "1.5rem" }}>
            History
          </h2>
          <p className="body-large" style={{ maxWidth: "50ch" }}>
            Two thousand years of type, scrolling sideways.
            <br />
            Each era wears the face it was born into.
          </p>
        </div>
      </div>

      {/* ── Pinned horizontal timeline ──────────────────── */}
      <div ref={pinRef} className="history-pin" style={{ overflow: "hidden" }}>
        <div ref={trackRef} className="history-track">
          {ERAS.map((era) => (
            <div key={era.era} className="history-card">
              {/* Year — massive, bleeding off the card */}
              <span
                style={{
                  fontFamily: era.fontVar,
                  fontSize: "clamp(6rem, 18vw, 22rem)",
                  fontWeight: 700,
                  lineHeight: 0.78,
                  letterSpacing: "-0.03em",
                  marginBottom: "clamp(0.5rem, 2vh, 1.5rem)",
                  marginLeft: "-0.04em", // optical alignment for large type
                  userSelect: "none",
                }}
              >
                {era.year}
              </span>

              {/* Era name */}
              <h3
                className="display-sm"
                style={{ marginBottom: "0.75rem" }}
              >
                {era.era}
              </h3>

              {/* Description */}
              <p
                className="body-copy"
                style={{ marginBottom: "1rem", maxWidth: "45ch" }}
              >
                {era.description}
              </p>

              {/* Typeface label */}
              <span
                className="mono"
                style={{ color: "var(--color-text-muted)" }}
              >
                [Year&nbsp;→&nbsp;{era.typeface}]
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Outro ──────────────────────────────────────── */}
      <div
        className="content-grid"
        style={{ marginTop: "clamp(4rem, 10vh, 8rem)" }}
      >
        <p
          className="body-large"
          style={{ gridColumn: "2 / span 5", maxWidth: "50ch" }}
        >
          Watch the grid tighten as time advances — from the organic rhythm of
          carved stone to the pixel-precise spacing of digital type. The grid is
          the invisible hand of every era.
        </p>
      </div>
    </section>
  );
}
