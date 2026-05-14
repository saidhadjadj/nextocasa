import { Link } from "react-router-dom";
import { useRef } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import { cta } from "../../data/aboutContent";

export default function AboutCTA() {
  const ref = useRef(null);
  useIntersectionReveal(ref);

  return (
    <section
      ref={ref}
      className="px-6 py-16 md:px-12 md:py-24 lg:px-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <p
          data-reveal
          className="max-w-md font-serif text-2xl font-light italic leading-snug text-stone-700 md:text-3xl"
        >
          {cta.text}
        </p>

        <Link
          data-reveal
          to={cta.href}
          className="group inline-flex items-center gap-3 border border-stone-300 px-7 py-3 text-xs tracking-[0.14em] uppercase text-stone-700 transition-all duration-300 hover:border-stone-800 hover:bg-stone-900 hover:text-white"
        >
          {cta.label}
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}