import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

// ─── Slides hero ──────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85",
    label: "Salon d'exception — Paris 7ème",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
    label: "Villa contemporaine — Neuilly-sur-Seine",
  },
  {
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=85",
    label: "Penthouse lumineux — Paris 16ème",
  },
];

// ─── Biens (remplacer par properties.json) ────────────────────────────────────
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
    id: 3,
    title: "Loft industriel rénové",
    type: "location",
    price: 3_800,
    location: "Paris 11ème",
    surface: 120,
    rooms: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    tag: "Nouveau",
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
    id: 5,
    title: "Maison de maître",
    type: "vente",
    price: 1_100_000,
    location: "Bordeaux Chartrons",
    surface: 280,
    rooms: 9,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    tag: "Off-market",
  },
  {
    id: 6,
    title: "Penthouse panoramique",
    type: "location",
    price: 6_500,
    location: "Paris 16ème",
    surface: 165,
    rooms: 4,
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
    tag: "Premium",
  },
];

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "achat", label: "Achat" },
  { key: "vente", label: "Vente" },
  { key: "location", label: "Location" },
];

const SERVICES = [
  {
    to: "/achat",
    icon: "🏠",
    title: "Acheter",
    desc: "Biens d'exception, souvent en avant-première de mise sur le marché.",
    cta: "Voir les biens",
    border: "border-[#0022d2]/20",
    accent: "text-[#0022d2]",
  },
  {
    to: "/vente",
    icon: "🤝",
    title: "Vendre",
    desc: "Mise en valeur sur-mesure et réseau d'acquéreurs qualifiés.",
    cta: "Nous confier votre bien",
    border: "border-[#ffb800]/40",
    accent: "text-amber-600",
  },
  {
    to: "/location",
    icon: "🗝️",
    title: "Louer",
    desc: "Biens premium, locataires sélectionnés, gestion sereine.",
    cta: "Voir les locations",
    border: "border-stone-200",
    accent: "text-stone-600",
  },
];

const STATS = [
  { value: "14", label: "Années d'expérience" },
  { value: "620+", label: "Transactions réalisées" },
  { value: "97 %", label: "Clients satisfaits" },
  { value: "3", label: "Villes d'implantation" },
];

const TYPE_BADGE = {
  achat: "bg-[#0022d2]/10 text-[#0022d2]",
  vente: "bg-amber-100 text-amber-700",
  location: "bg-emerald-100 text-emerald-700",
};
const TYPE_LABEL = { achat: "Achat", vente: "Vente", location: "Location" };

// ─── Ligne décorative réutilisable ────────────────────────────────────────────
function GoldLine({ center = false }) {
  return (
    <div
      className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : ""}`}
    >
      <div className="h-px w-6 bg-[#ffb800]" />
      {center && <div className="h-px w-6 bg-[#ffb800]" />}
    </div>
  );
}

// ─── Carte bien ───────────────────────────────────────────────────────────────
function PropertyCard({ property }) {
  const isLoc = property.type === "location";
  const price = isLoc
    ? `${property.price.toLocaleString("fr-FR")} €/mois`
    : `${property.price.toLocaleString("fr-FR")} €`;

  return (
    <Link
      to={`/biens/${property.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:border-stone-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden bg-stone-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${TYPE_BADGE[property.type]}`}
          >
            {TYPE_LABEL[property.type]}
          </span>
          {property.tag && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
              {property.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs text-stone-400 mb-1.5 flex items-center gap-1.5 font-light">
          <svg
            className="w-3 h-3 shrink-0"
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
          {property.location}
        </p>

        <h3 className="font-serif text-lg font-light text-stone-800 mb-3 leading-snug group-hover:text-[#0022d2] transition-colors duration-300">
          {property.title}
        </h3>

        <div className="flex gap-4 text-xs text-stone-400 mb-4 font-light">
          <span>{property.surface} m²</span>
          <span className="text-stone-200">|</span>
          <span>{property.rooms} pièces</span>
        </div>

        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
          <p className="font-serif text-xl font-light text-[#0022d2]">
            {price}
          </p>
          <span className="text-xs text-stone-300 group-hover:text-[#0022d2] transition-colors duration-300 flex items-center gap-1">
            Voir le bien
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
  );
}

// ─── Hero carousel ────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const goTo = useCallback((index) => {
    setOpacity(0);
    setTimeout(() => {
      setCurrent(index);
      setOpacity(1);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [goTo]);

  return (
    <section className="relative h-screen max-h-[860px] min-h-[580px] overflow-hidden">
      {/* Image active */}
      <img
        src={HERO_SLIDES[current].url}
        alt={HERO_SLIDES[current].label}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity, transition: "opacity 0.6s ease" }}
      />

      {/* Dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 md:px-16 md:pb-20 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Texte */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Agence immobilière premium
              </p>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.1] mb-3">
              L'art de
            </h1>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.1] mb-5">
              <em className="text-[#ffb800] not-italic">l'exception</em>{" "}
              immobilière.
            </h1>

            <p
              className="text-white/60 text-sm font-light tracking-wider mb-10 transition-all duration-500"
              style={{ opacity }}
            >
              {HERO_SLIDES[current].label}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/achat"
                className="inline-flex items-center justify-center gap-2 bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-semibold py-3.5 px-8 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Découvrir nos biens
                <svg
                  className="w-4 h-4"
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
              </Link>
              <Link
                to="/estimation"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/90 font-light py-3.5 px-8 rounded-full text-sm transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                Estimation gratuite
              </Link>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex md:flex-col gap-2 md:gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Photo ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-[#ffb800] w-8 h-1.5 md:w-1.5 md:h-8"
                    : "bg-white/30 hover:bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page d'accueil ───────────────────────────────────────────────────────────
export default function HomePage() {
  const [filterType, setFilterType] = useState("all");
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      filterType === "all"
        ? PROPERTIES
        : PROPERTIES.filter((p) => p.type === filterType),
    [filterType],
  );

  return (
    <div className="bg-[#f7f5f1] min-h-screen">
      {/* 1 — HERO */}
      <HeroCarousel />

      {/* 2 — BIENS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <GoldLine />
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light mb-2">
              Sélection du moment
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-800">
              Nos biens{" "}
              <em className="not-italic italic text-[#0022d2]">d'exception</em>
            </h2>
          </div>
          <Link
            to="/achat"
            className="group text-sm text-stone-400 hover:text-[#0022d2] flex items-center gap-1.5 font-light transition-colors duration-300 shrink-0"
          >
            Voir tous les biens
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Filtres */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filtrer les biens"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className={[
                "px-6 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300",
                filterType === f.key
                  ? "bg-[#0022d2] text-white shadow-md"
                  : "bg-white text-stone-500 border border-stone-200 hover:border-[#0022d2]/30 hover:text-[#0022d2]",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grille */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-300">
            <p className="font-serif text-4xl mb-4 font-light">Aucun bien</p>
            <p className="text-sm font-light">
              disponible dans cette catégorie pour le moment.
            </p>
            <button
              onClick={() => setFilterType("all")}
              className="mt-6 text-[#0022d2] hover:underline text-sm font-light"
            >
              Voir tous les biens
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>

      {/* 3 — SERVICES */}
      <section className="border-y border-stone-200/60 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]" />
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                Ce que nous faisons
              </p>
              <div className="h-px w-6 bg-[#ffb800]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-800">
              Un accompagnement{" "}
              <em className="not-italic italic text-[#0022d2]">sur-mesure</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className={`group flex flex-col p-8 rounded-2xl bg-white border ${s.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}
              >
                <span className="text-3xl mb-6" aria-hidden="true">
                  {s.icon}
                </span>
                <h3
                  className={`font-serif text-2xl font-light mb-3 ${s.accent}`}
                >
                  {s.title}
                </h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 flex-1">
                  {s.desc}
                </p>
                <span
                  className={`text-xs tracking-widest uppercase font-medium flex items-center gap-2 ${s.accent}`}
                >
                  {s.cta}
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — CHIFFRES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/92" />

          <div className="relative px-8 py-16 md:px-16 md:py-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]/50" />
              <p className="text-[#ffb800]/70 text-xs tracking-[0.2em] uppercase font-light">
                NextoCasa en chiffres
              </p>
              <div className="h-px w-6 bg-[#ffb800]/50" />
            </div>
            <h2 className="font-serif text-3xl font-light text-white text-center mb-16">
              Une confiance construite sur{" "}
              <em className="not-italic italic text-[#ffb800]">l'expérience</em>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="text-center transition-all duration-700"
                  style={{
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible
                      ? "translateY(0)"
                      : "translateY(24px)",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <p className="font-serif text-5xl md:text-6xl font-light text-[#ffb800] mb-3">
                    {stat.value}
                  </p>
                  <div className="h-px w-8 bg-[#ffb800]/25 mx-auto mb-3" />
                  <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — CTA ESTIMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl bg-white border border-stone-100 px-8 py-14 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <GoldLine />
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light mb-3">
              Estimation gratuite
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-800 mb-2 leading-snug">
              Vous souhaitez vendre
              <br />
              <em className="not-italic italic text-[#0022d2]">
                ou estimer votre bien ?
              </em>
            </h2>
            <p className="text-stone-400 text-sm font-light">
              Sans engagement · Réponse sous 48h
            </p>
          </div>
          <Link
            to="/estimation"
            className="shrink-0 inline-flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-4 px-10 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-md whitespace-nowrap"
          >
            Estimer mon bien
            <svg
              className="w-4 h-4"
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
          </Link>
        </div>
      </section>
    </div>
  );
}
