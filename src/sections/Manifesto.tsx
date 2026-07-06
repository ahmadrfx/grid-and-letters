import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Chapter 0 — Manifesto
 *
 * Full-bleed hero. One statement, massive type.
 * The grid is visible behind it — not hidden, celebrated.
 *
 * Layout:
 *   Left margin → large statement spanning 10 of 12 columns
 *   Right column → small bracket-style metadata
 *
 * Animation:
 *   The headline reveals word-by-word on load (not scroll)
 *   The metadata fades in on a slight delay
 */
export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    // Split headline into words for staggered reveal
    const words = headline.textContent?.split(" ") ?? [];
    headline.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;opacity:0;transform:translateY(60px)">${word}&nbsp;</span>`
      )
      .join("");

    const ctx = gsap.context(() => {
      // Staggered word reveal — fires on page load
      gsap.to(headline.querySelectorAll("span"), {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.4,
      });

      // Metadata fade-in
      gsap.fromTo(
        ".manifesto__meta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section--full content-grid"
      style={{ minHeight: "100vh" }}
    >
      {/* Headline — spans cols 2–12 (10 of 12 columns) */}
      <div className="manifesto-headline-wrap" style={{ gridColumn: "2 / span 10" }}>
        <h1
          ref={headlineRef}
          className="display-xl manifesto-headline"
          style={{
            fontWeight: 900,
            marginBottom: "clamp(2rem, 6vh, 6rem)",
          }}
        >
          Everything sits on a grid. Everything is made of letters.
        </h1>
      </div>

      {/* Metadata — right column, bracket-style */}
      <div
        className="manifesto__meta mono"
        style={{
          gridColumn: "12 / span 1",
          alignSelf: "end",
          color: "var(--color-text-muted)",
          lineHeight: 1.8,
        }}
      >
        <div>[Chapter&nbsp;0]</div>
        <div>[Type&nbsp;→&nbsp;Inter&nbsp;Variable]</div>
        <div>[Grid&nbsp;→&nbsp;12col&nbsp;/&nbsp;1rem&nbsp;gap]</div>
        <div>[Status&nbsp;→&nbsp;WIP]</div>
      </div>

      {/* Grid annotation — tiny text at bottom left */}
      <p
        className="mono"
        style={{
          gridColumn: "2 / span 3",
          alignSelf: "end",
          color: "var(--color-text-muted)",
          marginTop: "auto",
          paddingBottom: "var(--grid-margin)",
        }}
      >
        Press <kbd style={{ color: "var(--color-accent)" }}>`</kbd> to toggle the grid overlay
        <br />
        Scroll down to begin →
      </p>
    </section>
  );
}
