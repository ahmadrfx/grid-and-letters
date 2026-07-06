import { useEffect } from "react";
import { initLenis } from "./lib/lenis";
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
  useEffect(() => {
    const lenis = initLenis();
    // touch devices get native scroll — no Lenis to store or destroy
    if (!lenis) return;
    (window as any).__lenis = lenis;
    return () => {
      lenis.destroy();
      delete (window as any).__lenis;
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
