import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins once — ScrollSmoother replaces Lenis
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

/**
 * Reveal each child word-by-word on scroll.
 *
 * Splits text on spaces, wraps each word in a <span>,
 * then staggers opacity + y from a random range.
 *
 * Usage:
 *   wordReveal(".my-heading", { stagger: 0.04, y: 60 })
 */
export function wordReveal(
  selector: string,
  options?: {
    stagger?: number;
    y?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  const el = document.querySelector(selector);
  if (!el) return;

  const stagger = options?.stagger ?? 0.04;
  const y = options?.y ?? 40;
  const duration = options?.duration ?? 0.8;

  // Split text content into words
  const words = el.textContent?.split(" ") ?? [];
  el.innerHTML = words
    .map((word) => `<span class="reveal-word" style="display:inline-block">${word}&nbsp;</span>`)
    .join("");

  const spans = el.querySelectorAll(".reveal-word");

  gsap.fromTo(
    spans,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        ...options?.scrollTrigger,
      },
    }
  );
}

/**
 * Fade + slide a section into view on scroll.
 */
export function sectionIn(
  selector: string,
  options?: {
    y?: number;
    duration?: number;
    start?: string;
  }
) {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: options?.y ?? 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: options?.start ?? "top 85%",
      },
    }
  );
}

/**
 * Parallax — element moves slower than scroll.
 */
export function parallax(
  selector: string,
  speed: number = 0.3
) {
  gsap.to(selector, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
