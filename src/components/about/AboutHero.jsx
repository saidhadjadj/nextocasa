import { useEffect, useRef } from "react";
import { hero } from "../../data/aboutContent";

export default function AboutHero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Staggered reveal on mount
    const children = el.querySelectorAll("[data-reveal]");
    children.forEach((child, i) => {
      const el = child ;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      className="border-b border-stone-200/70 px-6 py-16 md:px-12 md:py-24 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p
          data-reveal
          className="mb-6 text-xs tracking-[0.18em] uppercase text-stone-400"
        >
          {hero.eyebrow}
        </p>

        <h1 data-reveal className="mb-8 max-w-2xl">
          <span className="block font-serif text-4xl font-light leading-snug text-stone-900 md:text-5xl lg:text-6xl">
            {hero.headline[0]}
          </span>
          <span className="block font-serif text-4xl font-light italic leading-snug text-stone-400 md:text-5xl lg:text-6xl">
            {hero.headline[1]}
          </span>
        </h1>

        <p
          data-reveal
          className="max-w-lg text-base font-light leading-relaxed text-stone-500"
        >
          {hero.lead}
        </p>
      </div>
    </section>
  );
}