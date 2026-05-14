import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to a section ref.
 * All children with [data-reveal] animate in with a staggered fade+slide
 * the first time the section enters the viewport.
 */
export function useIntersectionReveal(
  ref,
  options = { threshold: 0.15 }
) {
  useEffect(() => {
    const section = ref.current;

    if (!section) return;

    const children = Array.from(
      section.querySelectorAll("[data-reveal]")
    );

    // Initial hidden state
    children.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition =
        "opacity 0.65s ease, transform 0.65s ease";
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      children.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

      observer.disconnect();
    }, options);

    observer.observe(section);

    return () => observer.disconnect();
  }, [ref, options]);
}