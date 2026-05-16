import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const RENTALS = [
  {
    id: 3,
    title: "Loft industriel rénové",
    price: 3_800,
    location: "Paris 11ème",
    surface: 120,
    rooms: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    tag: "Nouveau",
    dispo: "Disponible maintenant",
  },
  {
    id: 6,
    title: "Penthouse panoramique",
    price: 6_500,
    location: "Paris 16ème",
    surface: 165,
    rooms: 4,
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
    tag: "Premium",
    dispo: "Disponible maintenant",
  },
  {
    id: 10,
    title: "Appartement haussmannien",
    price: 4_200,
    location: "Paris 8ème",
    surface: 110,
    rooms: 4,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    tag: null,
    dispo: "Disponible le 1er juin",
  },
  {
    id: 11,
    title: "Studio de luxe",
    price: 1_900,
    location: "Lyon 2ème",
    surface: 45,
    rooms: 1,
    image:
      "https://images.unsplash.com/photo-1560185008-a33f5a7b2800?w=600&q=80",
    tag: null,
    dispo: "Disponible maintenant",
  },
  {
    id: 12,
    title: "Maison avec jardin privé",
    price: 5_800,
    location: "Bordeaux",
    surface: 200,
    rooms: 6,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    tag: "Coup de cœur",
    dispo: "Disponible maintenant",
  },
  {
    id: 13,
    title: "T3 vue sur la Garonne",
    price: 2_600,
    location: "Bordeaux",
    surface: 72,
    rooms: 3,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    tag: null,
    dispo: "Disponible le 15 juin",
  },
];

const SERVICES_LOC = [
  {
    icon: "🔍",
    title: "Sélection rigoureuse",
    desc: "Chaque locataire est étudié avec soin : solvabilité, dossier, sérieux. Votre bien est entre de bonnes mains.",
  },
  {
    icon: "📋",
    title: "Gestion complète",
    desc: "États des lieux, contrats, quittances, suivi des interventions. Nous gérons tout, vous encaissez.",
  },
  {
    icon: "🛡️",
    title: "Garantie loyer impayé",
    desc: "En option, une assurance couvre les loyers impayés et les dégradations. Zéro mauvaise surprise.",
  },
  {
    icon: "📞",
    title: "Interlocuteur dédié",
    desc: "Un conseiller unique pour vous et votre locataire. Disponible, réactif, professionnel.",
  },
];

export default function Location() {
  const [search, setSearch] = useState("");
  const [budgetMax, setBudgetMax] = useState(10000);

  const filtered = useMemo(
    () =>
      RENTALS.filter(
        (p) =>
          p.price <= budgetMax &&
          (p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase())),
      ),
    [search, budgetMax],
  );

  return (
    <>
      <Helmet>
        <title>Location — NextoCasa</title>
        <meta
          name="description"
          content="Biens premium à louer à Paris, Lyon et Bordeaux. Sélection rigoureuse, gestion sereine, locataires qualifiés."
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/80" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Biens premium
              </p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
              Biens à{" "}
              <em className="not-italic italic text-[#ffb800]">louer</em>
            </h1>
            <p className="mt-3 text-white/60 text-sm font-light max-w-md">
              Des biens sélectionnés avec soin, pour une expérience locative
              sans compromis.
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Recherche */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un bien, une ville…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#0022d2] transition font-light"
                />
              </div>

              {/* Budget slider */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex justify-between text-xs text-stone-400 font-light mb-2">
                  <span>Budget max.</span>
                  <span className="font-medium text-[#0022d2]">
                    {budgetMax.toLocaleString("fr-FR")} €/mois
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full accent-[#0022d2] cursor-pointer"
                />
              </div>

              <p className="text-xs text-stone-400 font-light shrink-0">
                {filtered.length} bien{filtered.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Grille */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-3xl font-light text-stone-300 mb-3">
                Aucun résultat
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setBudgetMax(10000);
                }}
                className="text-sm text-[#0022d2] hover:underline font-light"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to={`/biens/${p.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.tag && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    {/* Disponibilité */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-light px-3 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                        {p.dispo}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-xs text-stone-400 mb-1.5 font-light flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {p.location}
                    </p>
                    <h2 className="font-serif text-lg font-light text-stone-800 mb-3 group-hover:text-[#0022d2] transition-colors duration-300">
                      {p.title}
                    </h2>
                    <div className="flex gap-4 text-xs text-stone-400 font-light mb-4">
                      <span>{p.surface} m²</span>
                      <span className="text-stone-200">|</span>
                      <span>
                        {p.rooms} pièce{p.rooms > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <p className="font-serif text-xl font-light text-[#0022d2]">
                          {p.price.toLocaleString("fr-FR")} €
                        </p>
                        <p className="text-xs text-stone-400 font-light">
                          par mois
                        </p>
                      </div>
                      <span className="text-xs text-stone-300 group-hover:text-[#0022d2] transition-colors flex items-center gap-1">
                        Voir le bien
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Services gestion locative */}
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]" />
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                Propriétaires
              </p>
            </div>
            <h2 className="font-serif text-3xl font-light text-stone-800 mb-10">
              Confiez-nous la{" "}
              <em className="not-italic italic text-[#0022d2]">
                gestion locative
              </em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {SERVICES_LOC.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl border border-stone-100 p-6 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-2xl mb-4 block" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3 className="font-serif text-base font-light text-stone-800 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#0022d2] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6 bg-[#ffb800]/60" />
                  <p className="text-[#ffb800]/70 text-xs tracking-[0.18em] uppercase font-light">
                    Propriétaire bailleur
                  </p>
                </div>
                <p className="font-serif text-2xl font-light text-white italic">
                  "Votre bien géré comme s'il était le nôtre."
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 inline-flex items-center gap-2 bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-semibold py-3.5 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md whitespace-nowrap"
              >
                Confier mon bien
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
