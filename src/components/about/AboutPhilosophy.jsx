import { useRef } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import { pillars } from "../../data/aboutContent";

export default function AboutPhilosophy() {
  const ref = useRef(null);
  useIntersectionReveal(ref);

  return (
    <section
      ref={ref}
      className="border-b border-stone-200/70 px-6 py-16 md:px-12 md:py-20 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p
          data-reveal
          className="mb-10 text-xs tracking-[0.16em] uppercase text-stone-400"
        >
          Notre philosophie
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              data-reveal
              className="group rounded-sm border border-stone-100 bg-stone-50/60 p-7 transition-colors duration-300 hover:bg-white hover:border-stone-200"
            >
              <span className="mb-4 block font-serif text-3xl font-light text-stone-300 transition-colors duration-300 group-hover:text-stone-400">
                {pillar.index}
              </span>
              <h3 className="mb-3 text-sm font-medium tracking-wide text-stone-800">
                {pillar.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-500">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
