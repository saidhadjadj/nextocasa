import { useRef } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import { team } from "../../data/aboutContent";

export default function AboutTeam() {
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
          L&apos;équipe
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <div
              key={i}
              data-reveal
              className="group flex flex-col rounded-sm border border-stone-200/80 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            >
              {/* Avatar */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 font-serif text-sm font-light text-stone-500 tracking-wider">
                {member.initials}
              </div>

              {/* Identity */}
              <p className="text-sm font-medium text-stone-800">{member.name}</p>
              <p className="mt-0.5 text-xs tracking-widest uppercase text-stone-400">
                {member.role}
              </p>

              {/* Divider */}
              <div className="my-5 h-px w-8 bg-stone-200 transition-all duration-300 group-hover:w-12" />

              {/* Quote */}
              <p className="font-serif text-sm italic font-light leading-relaxed text-stone-500 mt-auto">
                {member.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}