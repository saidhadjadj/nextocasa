import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ETAPES = [
  {
    num: "01",
    title: "Estimation personnalisée",
    desc: "Nous réalisons une étude de valeur précise de votre bien, en tenant compte du marché local et de ses caractéristiques uniques.",
  },
  {
    num: "02",
    title: "Mise en valeur sur-mesure",
    desc: "Reportage photo professionnel, visite virtuelle, rédaction d'une annonce soignée. Votre bien mérite une présentation d'exception.",
  },
  {
    num: "03",
    title: "Diffusion & réseau",
    desc: "Diffusion sur les portails premium, présentation à notre réseau d'acquéreurs qualifiés, et gestion discrète si vous le souhaitez.",
  },
  {
    num: "04",
    title: "Accompagnement jusqu'à l'acte",
    desc: "Nous coordonnons les visites, les négociations et le suivi notarial. Vous êtes accompagné à chaque étape, sans surprise.",
  },
];

const AVANTAGES = [
  {
    icon: "📸",
    title: "Photos professionnelles",
    desc: "Reportage réalisé par un photographe spécialisé en immobilier de prestige.",
  },
  {
    icon: "🔒",
    title: "Vente discrète disponible",
    desc: "Jusqu'à 60 % de nos mandats sont traités en off-market, pour votre tranquillité.",
  },
  {
    icon: "🎯",
    title: "Acquéreurs qualifiés",
    desc: "Un réseau d'acheteurs présélectionnés, solvables et sérieux.",
  },
  {
    icon: "⚖️",
    title: "Suivi notarial",
    desc: "Coordination complète avec le notaire jusqu'à la signature de l'acte authentique.",
  },
];

export default function Vente() {
  return (
    <>
      <Helmet>
        <title>Vendre — NextoCasa</title>
        <meta
          name="description"
          content="Confiez la vente de votre bien à NextoCasa. Estimation gratuite, mise en valeur premium, réseau d'acquéreurs qualifiés."
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=70&fm=webp&auto=format"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/80" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Mandat de vente
              </p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
              Vendre avec{" "}
              <em className="not-italic italic text-[#ffb800]">NextoCasa</em>
            </h1>
            <p className="mt-3 text-white/60 text-sm font-light max-w-md">
              Une mise en valeur d'exception pour que votre bien trouve son
              acquéreur au juste prix.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
          {/* Notre process */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]" />
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                Notre process
              </p>
            </div>
            <h2 className="font-serif text-3xl font-light text-stone-800 mb-12">
              De l'estimation{" "}
              <em className="not-italic italic text-[#0022d2]">
                à la signature
              </em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ETAPES.map((e) => (
                <div
                  key={e.num}
                  className="group bg-white rounded-2xl border border-stone-100 p-8 hover:shadow-md hover:border-stone-200 transition-all duration-300"
                >
                  <span className="font-serif text-4xl font-light text-[#ffb800]/40 group-hover:text-[#ffb800]/70 transition-colors duration-300">
                    {e.num}
                  </span>
                  <h3 className="font-serif text-xl font-light text-stone-800 mt-3 mb-3">
                    {e.title}
                  </h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Avantages */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]" />
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                Nos engagements
              </p>
            </div>
            <h2 className="font-serif text-3xl font-light text-stone-800 mb-12">
              Ce qui fait{" "}
              <em className="not-italic italic text-[#0022d2]">
                la différence
              </em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AVANTAGES.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-2xl border border-stone-100 p-6 text-center hover:shadow-md transition-all duration-300"
                >
                  <span className="text-3xl mb-4 block" aria-hidden="true">
                    {a.icon}
                  </span>
                  <h3 className="font-serif text-base font-light text-stone-800 mb-2">
                    {a.title}
                  </h3>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA double */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#0022d2] px-8 py-10 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#ffb800]/60" />
                <p className="text-[#ffb800]/80 text-xs tracking-[0.18em] uppercase font-light">
                  Gratuit & sans engagement
                </p>
              </div>
              <h3 className="font-serif text-2xl font-light text-white mb-2 flex-1">
                Demander une estimation
              </h3>
              <p className="text-white/50 text-sm font-light mb-6">
                Recevez une évaluation précise de votre bien sous 48h.
              </p>
              <Link
                to="/estimation"
                className="self-start inline-flex items-center gap-2 bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-semibold py-3 px-7 rounded-full text-sm transition-all hover:scale-105"
              >
                Estimation gratuite
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-stone-100 px-8 py-10 flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light">
                  Prendre rendez-vous
                </p>
              </div>
              <h3 className="font-serif text-2xl font-light text-stone-800 mb-2 flex-1">
                Parler à un conseiller
              </h3>
              <p className="text-stone-400 text-sm font-light mb-6">
                Un échange confidentiel pour étudier votre projet de vente.
              </p>
              <Link
                to="/contact"
                className="self-start inline-flex items-center gap-2 border border-[#0022d2]/20 text-[#0022d2] hover:bg-[#0022d2] hover:text-white font-semibold py-3 px-7 rounded-full text-sm transition-all duration-300"
              >
                Nous contacter
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
