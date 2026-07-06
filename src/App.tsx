import { useEffect, useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Manifesto from "./sections/Manifesto";
import Anatomy from "./sections/Anatomy";
import History from "./sections/History";
import TheGrid from "./sections/TheGrid";
import GridType from "./sections/GridType";
import BreakingRules from "./sections/BreakingRules";
import Resources from "./sections/Resources";
import GridDebug from "./components/GridDebug";

/**
 * Grid & Letters
 *
 * A typographic exploration of the two foundations of visual design:
 * the grid (structure, space, proportion) and the letter (form, rhythm, voice).
 *
 * Chapters:
 *   0 — Manifesto
 *   1 — Anatomy
 *   2 — History
 *   3 — The Grid
 *   4 — Grid × Type
 *   5 — Breaking Rules
 *   6 — Resources
 */
export default function App() {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // ScrollSmoother replaces Lenis — native GSAP sync, no virtual
    // scroll drift. smoothTouch handles mobile out of the box.
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      smoothTouch: 0,
    });
    smootherRef.current = smoother;
    (window as any).__smoother = smoother;

    // Recalculate ScrollTrigger positions once web fonts finish loading
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      smoother.kill();
      smootherRef.current = null;
      delete (window as any).__smoother;
    };
  }, []);

  return (
    <>
      <GridDebug />

      <main>
        <Manifesto />
        <Anatomy />
        <History />
        <TheGrid />
        <GridType />
        <BreakingRules />
        <Resources />
      </main>
    </>
  );
}
