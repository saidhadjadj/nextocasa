import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PROPERTIES = [
  {
    id: 1,
    title: "Haussmannien d'exception",
    type: "achat",
    price: 1_250_000,
    location: "Paris 7ème",
    surface: 187,
    rooms: 6,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    tag: "Exclusivité",
  },
  {
    id: 2,
    title: "Villa contemporaine",
    type: "achat",
    price: 890_000,
    location: "Neuilly-sur-Seine",
    surface: 210,
    rooms: 7,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    tag: "Coup de cœur",
  },
  {
    id: 4,
    title: "Appartement Belle Époque",
    type: "achat",
    price: 675_000,
    location: "Lyon 6ème",
    surface: 98,
    rooms: 4,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    tag: null,
  },
  {
    id: 7,
    title: "Duplex avec terrasse",
    type: "achat",
    price: 820_000,
    location: "Paris 9ème",
    surface: 130,
    rooms: 5,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    tag: "Nouveau",
  },
  {
    id: 8,
    title: "Appartement rénové",
    type: "achat",
    price: 540_000,
    location: "Bordeaux centre",
    surface: 80,
    rooms: 3,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    tag: null,
  },
  {
    id: 9,
    title: "Maison avec jardin",
    type: "achat",
    price: 1_050_000,
    location: "Versailles",
    surface: 220,
    rooms: 8,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    tag: "Off-market",
  },
];

const SORT_OPTIONS = [
  { key: "default", label: "Par défaut" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
  { key: "surface", label: "Surface" },
];

export default function Achat() {
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  const properties = useMemo(() => {
    let list = PROPERTIES.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "surface")
      list = [...list].sort((a, b) => b.surface - a.surface);
    return list;
  }, [sort, search]);

  return (
    <>
      <Helmet>
        <title>Achat — NextoCasa</title>
        <meta
          name="description"
          content="Découvrez notre sélection de biens d'exception à l'achat. Appartements, maisons et villas premium à Paris, Lyon et Bordeaux."
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* Hero page */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/80" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Sélection premium
              </p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
              Biens à l'
              <em className="not-italic italic text-[#ffb800]">achat</em>
            </h1>
            <p className="mt-3 text-white/60 text-sm font-light max-w-md">
              Une sélection rigoureuse de biens d'exception, souvent en
              avant-première.
            </p>
          </div>
        </div>

        {/* Barre de recherche + tri */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-sm border border-stone-100">
            <div className="relative flex-1 max-w-sm">
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
                className="w-full pl-9 pr-4 py-2 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#0022d2] transition font-light"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm text-stone-600 bg-white border border-stone-200 rounded-xl px-4 py-2 outline-none focus:border-[#0022d2] transition font-light cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-stone-400 font-light shrink-0">
              {properties.length} bien{properties.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Grille */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-3xl font-light text-stone-300 mb-3">
                Aucun résultat
              </p>
              <button
                onClick={() => setSearch("")}
                className="text-sm text-[#0022d2] hover:underline font-light"
              >
                Effacer la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {properties.map((p) => (
                <Link
                  key={p.id}
                  to={`/biens/${p.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {p.tag && (
                      <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
                        {p.tag}
                      </span>
                    )}
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
                      <span>{p.rooms} pièces</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                      <p className="font-serif text-xl font-light text-[#0022d2]">
                        {p.price.toLocaleString("fr-FR")} €
                      </p>
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

          {/* CTA contact */}
          <div className="mt-16 rounded-2xl bg-white border border-stone-100 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light">
                  Vous ne trouvez pas ?
                </p>
              </div>
              <p className="font-serif text-xl font-light text-stone-700 italic">
                Décrivez-nous votre projet, nous avons des biens off-market.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-3.5 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md whitespace-nowrap"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
