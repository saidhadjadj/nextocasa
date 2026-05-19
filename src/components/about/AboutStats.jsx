import { useRef, useEffect, useState } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import { stats } from "../../data/aboutContent";

export default function AboutStats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useIntersectionReveal(ref);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
          En chiffres
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-reveal
              className={[
                "flex flex-col items-center justify-center rounded-sm bg-stone-50 py-8 px-4 text-center transition-all duration-700",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-serif text-4xl font-light text-stone-800 md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-xs tracking-widest uppercase text-stone-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
