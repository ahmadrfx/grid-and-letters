import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Initialize Lenis smooth scrolling, driven by GSAP's ticker.
 *
 * Using GSAP's ticker (instead of a separate requestAnimationFrame)
 * guarantees Lenis updates before ScrollTrigger calculates positions
 * each frame — eliminating scroll-position drift.
 *
 * Call once in App mount. Clean up with `lenis.destroy()` on unmount.
 */
export function initLenis(): Lenis | null {
  // Native scroll is already smooth on touch devices — skip Lenis
  // to avoid touch-event conflicts on real phones/tablets.
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
    smoothWheel: true,
  });

  // Drive Lenis via GSAP's ticker so it stays in lockstep with ScrollTrigger
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Keep ScrollTrigger in sync during Lenis-initiated scroll events
  lenis.on("scroll", () => ScrollTrigger.update());

  return lenis;
}
