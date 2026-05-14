import { useRef } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import { story } from "../../data/aboutContent";

export default function AboutStory() {
  const ref = useRef<HTMLElement>(null);
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
          Origine
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — narrative */}
          <div data-reveal>
            <span
              aria-hidden="true"
              className="mb-2 block font-serif text-8xl font-light leading-none text-stone-200 select-none"
            >
              {story.year}
            </span>
            <div className="space-y-5">
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm font-light leading-relaxed text-stone-500"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right — quote */}
          <div data-reveal className="flex flex-col justify-center">
            <blockquote className="border-l border-stone-300 pl-6">
              <p className="font-serif text-xl font-light italic leading-relaxed text-stone-700">
                {story.quote.text}
              </p>
            </blockquote>
            <p className="mt-5 pl-6 text-xs tracking-widest uppercase text-stone-400">
              — {story.quote.author}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}