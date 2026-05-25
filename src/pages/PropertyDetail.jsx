import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// ─── Données complètes (remplacer par fetch /properties.json) ─────────────────
const ALL_PROPERTIES = [
  {
    id: 1,
    title: "Haussmannien d'exception",
    type: "achat",
    price: 1_250_000,
    location: "Paris 7ème",
    address: "12 rue de Varenne, 75007 Paris",
    surface: 187,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    floor: "3ème étage / 5",
    year: 1890,
    dpe: "C",
    tag: "Exclusivité",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85",
    ],
    description:
      "Situé au cœur du 7ème arrondissement, à deux pas du musée d'Orsay, cet appartement haussmannien d'exception offre des volumes rares et une lumière traversante remarquable. Entièrement rénové par un architecte d'intérieur, il conjugue le cachet de l'époque — parquet point de Hongrie, moulures, cheminées en marbre — avec des prestations contemporaines haut de gamme. Le bien se compose d'une entrée avec dégagement, d'un grand salon-salle à manger de 65 m², d'une cuisine équipée ouverte, de quatre chambres dont une suite parentale, et de deux salles de bain en marbre.",
    features: [
      "Parquet point de Hongrie",
      "Moulures & cheminées",
      "Double vitrage",
      "Digicode & interphone",
      "Cave",
      "Gardien",
    ],
    agent: {
      name: "Lajoie Hind",
      role: "Fondatrice & Directrice",
      initials: "LH",
    },
  },
  {
    id: 2,
    title: "Villa contemporaine",
    type: "achat",
    price: 890_000,
    location: "Neuilly-sur-Seine",
    address: "8 avenue du Roule, 92200 Neuilly-sur-Seine",
    surface: 210,
    rooms: 7,
    bedrooms: 5,
    bathrooms: 3,
    floor: "Plain-pied + étage",
    year: 2018,
    dpe: "B",
    tag: "Coup de cœur",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85",
    ],
    description:
      "Villa contemporaine de standing élevé, construite en 2018, implantée sur une parcelle paysagée de 420 m². Architecture sobre et élégante, grandes ouvertures vitrées, matériaux nobles. Le rez-de-chaussée offre une vaste pièce de vie ouverte sur la terrasse et le jardin, une cuisine de chef équipée, et un bureau indépendant. L'étage accueille cinq chambres dont deux suites parentales, trois salles de bain et un dressing sur-mesure.",
    features: [
      "Jardin 420 m²",
      "Terrasse",
      "Piscine chauffée",
      "Domotique",
      "Garage double",
      "Alarme",
    ],
    agent: {
      name: "William Max",
      role: "Associé — Patrimoine",
      initials: "WM",
    },
  },
  {
    id: 3,
    title: "Loft industriel rénové",
    type: "location",
    price: 3_800,
    location: "Paris 11ème",
    address: "34 rue de la Roquette, 75011 Paris",
    surface: 120,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    floor: "2ème étage / 4",
    year: 1920,
    dpe: "D",
    tag: "Nouveau",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
      "https://images.unsplash.com/photo-1560185008-a33f5a7b2800?w=900&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=85",
    ],
    description:
      "Ancien atelier d'artiste entièrement rénové avec soin, ce loft atypique séduit par ses volumes, sa hauteur sous plafond de 3,80 m et ses grandes verrières apportant une lumière exceptionnelle. La pièce de vie principale, de 65 m², est ouverte sur une cuisine de chef. Deux chambres, une salle de bain en béton ciré et un espace bureau complètent la distribution. Parquet chêne massif, poutres apparentes, briques.",
    features: [
      "Hauteur 3,80 m",
      "Verrières",
      "Parquet chêne",
      "Poutres apparentes",
      "Digicode",
      "Cave",
    ],
    agent: { name: "Sofia Lemos", role: "Conseillère senior", initials: "SL" },
  },
  {
    id: 4,
    title: "Appartement Belle Époque",
    type: "achat",
    price: 675_000,
    location: "Lyon 6ème",
    address: "5 boulevard des Belges, 69006 Lyon",
    surface: 98,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    floor: "4ème étage / 6",
    year: 1905,
    dpe: "C",
    tag: null,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85",
    ],
    description:
      "Appartement de caractère situé dans un immeuble Belle Époque classé, boulevard des Belges. Beaux volumes, parquet en point de Hongrie, hauts plafonds à caissons. Séjour de 35 m² avec bow-window, cuisine séparée, deux chambres, salle de bain avec baignoire îlot. Ascenseur, gardien, cave. Vue dégagée sur le boulevard.",
    features: [
      "Bow-window",
      "Hauts plafonds",
      "Ascenseur",
      "Gardien",
      "Cave",
      "Vue dégagée",
    ],
    agent: { name: "Sofia Lemos", role: "Conseillère senior", initials: "SL" },
  },
  {
    id: 5,
    title: "Maison de maître",
    type: "vente",
    price: 1_100_000,
    location: "Bordeaux Chartrons",
    address: "18 rue Notre-Dame, 33000 Bordeaux",
    surface: 280,
    rooms: 9,
    bedrooms: 5,
    bathrooms: 3,
    floor: "Plain-pied + 2 étages",
    year: 1850,
    dpe: "E",
    tag: "Off-market",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=85",
    ],
    description:
      "Remarquable maison de maître girondine dans le quartier des Chartrons, à deux pas des antiquaires et des galeries d'art. Bâtisse du Second Empire entièrement restaurée, préservant ses boiseries d'origine, ses parquets Versailles et ses cheminées en marbre. Trois niveaux d'exception : réception, espaces nuit et appartement indépendant en rez-de-jardin. Patio privatif de 80 m².",
    features: [
      "Patio 80 m²",
      "Boiseries d'origine",
      "Parquet Versailles",
      "Cheminées marbre",
      "Cave à vin",
      "Appartement indépendant",
    ],
    agent: {
      name: "Dupon Levine",
      role: "Associé — Patrimoine",
      initials: "DL",
    },
  },
  {
    id: 6,
    title: "Penthouse panoramique",
    type: "location",
    price: 6_500,
    location: "Paris 16ème",
    address: "2 avenue Foch, 75016 Paris",
    surface: 165,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    floor: "Dernier étage / 8",
    year: 1970,
    dpe: "B",
    tag: "Premium",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=85",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85",
    ],
    description:
      "Exceptionnel penthouse au dernier étage d'une résidence de prestige avenue Foch. Vue à 270° sur Paris, la Tour Eiffel et le Bois de Boulogne. Grande terrasse de 45 m² aménagée. Intérieur contemporain signé par un architecte d'intérieur renommé : cuisine ouverte Bulthaup, salles de bain en marbre Calacatta, dressing sur-mesure. Gardien 24h/24, parking double en sous-sol.",
    features: [
      "Terrasse 45 m²",
      "Vue Tour Eiffel",
      "Cuisine Bulthaup",
      "Marbre Calacatta",
      "Parking double",
      "Gardien 24h/24",
    ],
    agent: {
      name: "Lajoie Hind",
      role: "Fondatrice & Directrice",
      initials: "LH",
    },
  },
];

const DPE_COLORS = {
  A: "bg-emerald-500",
  B: "bg-green-400",
  C: "bg-lime-400",
  D: "bg-yellow-400",
  E: "bg-orange-400",
  F: "bg-red-400",
  G: "bg-red-600",
};
const TYPE_LABEL = { achat: "Achat", vente: "Vente", location: "Location" };

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = ALL_PROPERTIES.find((p) => p.id === Number(id));
  const [imgIndex, setImgIndex] = useState(0);
  const [contacted, setContacted] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f7f5f1] flex flex-col items-center justify-center gap-6 px-4">
        <p className="font-serif text-4xl font-light text-stone-300">
          Bien introuvable
        </p>
        <Link
          to="/"
          className="text-sm text-[#0022d2] hover:underline font-light"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const isLocation = property.type === "location";
  const priceLabel = isLocation
    ? `${property.price.toLocaleString("fr-FR")} €/mois`
    : `${property.price.toLocaleString("fr-FR")} €`;

  // Biens similaires
  const similar = ALL_PROPERTIES.filter(
    (p) => p.id !== property.id && p.type === property.type,
  ).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{property.title} — NextoCasa</title>
        <meta
          name="description"
          content={`${property.title}, ${property.location}. ${property.surface} m², ${property.rooms} pièces. ${priceLabel}.`}
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* ── Fil d'Ariane ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav
            className="flex items-center gap-2 text-xs text-stone-400 font-light"
            aria-label="Fil d'Ariane"
          >
            <Link to="/" className="hover:text-[#0022d2] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              to={`/${property.type}`}
              className="hover:text-[#0022d2] transition-colors capitalize"
            >
              {TYPE_LABEL[property.type]}
            </Link>
            <span>/</span>
            <span className="text-stone-600">{property.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* ── Colonne gauche ────────────────────────────────────────────── */}
            <div>
              {/* Galerie photos */}
              <div className="rounded-2xl overflow-hidden bg-stone-100 mb-3">
                <div className="relative h-[420px] md:h-[520px]">
                  <img
                    src={property.images[imgIndex]}
                    alt={`${property.title} — photo ${imgIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-[#0022d2] backdrop-blur-sm">
                      {TYPE_LABEL[property.type]}
                    </span>
                    {property.tag && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
                        {property.tag}
                      </span>
                    )}
                  </div>
                  {/* Navigation flèches */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setImgIndex(
                            (i) =>
                              (i - 1 + property.images.length) %
                              property.images.length,
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
                        aria-label="Photo précédente"
                      >
                        <svg
                          className="w-4 h-4 text-stone-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setImgIndex((i) => (i + 1) % property.images.length)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
                        aria-label="Photo suivante"
                      >
                        <svg
                          className="w-4 h-4 text-stone-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  {/* Compteur */}
                  <div className="absolute bottom-4 right-4 text-xs text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-light">
                    {imgIndex + 1} / {property.images.length}
                  </div>
                </div>
              </div>

              {/* Miniatures */}
              {property.images.length > 1 && (
                <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        i === imgIndex
                          ? "border-[#0022d2]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Photo ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Titre + infos */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6 bg-[#ffb800]" />
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                    {property.location}
                  </p>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-light text-stone-800 mb-2">
                  {property.title}
                </h1>
                <p className="text-stone-400 text-sm font-light flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
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
                  {property.address}
                </p>
              </div>

              {/* Caractéristiques */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Surface", value: `${property.surface} m²` },
                  { label: "Pièces", value: property.rooms },
                  { label: "Chambres", value: property.bedrooms },
                  { label: "Salle(s) de bain", value: property.bathrooms },
                  { label: "Étage", value: property.floor },
                  { label: "Année", value: property.year },
                  {
                    label: "DPE",
                    value: (
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-white text-xs font-bold ${DPE_COLORS[property.dpe] || "bg-stone-300"}`}
                      >
                        {property.dpe}
                      </span>
                    ),
                  },
                  {
                    label: "Référence",
                    value: `NC-${String(property.id).padStart(4, "0")}`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-white rounded-xl border border-stone-100 p-4"
                  >
                    <p className="text-xs text-stone-400 font-light tracking-wide uppercase mb-1">
                      {label}
                    </p>
                    <p className="font-serif text-base font-light text-stone-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6 bg-[#ffb800]" />
                  <h2 className="font-serif text-xl font-light text-stone-800">
                    Description
                  </h2>
                </div>
                <p className="text-stone-500 text-sm font-light leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Prestations */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6 bg-[#ffb800]" />
                  <h2 className="font-serif text-xl font-light text-stone-800">
                    Prestations
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {property.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-light px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Colonne droite — Sticky ──────────────────────────────────── */}
            <aside className="space-y-5 lg:sticky lg:top-24 self-start">
              {/* Prix */}
              <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-7">
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light mb-2">
                  {isLocation ? "Loyer mensuel" : "Prix de vente"}
                </p>
                <p className="font-serif text-4xl font-light text-[#0022d2] mb-1">
                  {priceLabel}
                </p>
                {!isLocation && (
                  <p className="text-xs text-stone-400 font-light">
                    soit{" "}
                    {Math.round(
                      property.price / property.surface,
                    ).toLocaleString("fr-FR")}{" "}
                    €/m²
                  </p>
                )}
              </div>

              {/* Conseiller */}
              <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-7">
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light mb-5">
                  Votre conseiller
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-serif text-sm font-light text-stone-500">
                    {property.agent.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">
                      {property.agent.name}
                    </p>
                    <p className="text-xs text-stone-400 font-light">
                      {property.agent.role}
                    </p>
                  </div>
                </div>

                {contacted ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 text-center font-light">
                    ✓ Demande envoyée — nous vous rappelons sous 2h
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => setContacted(true)}
                      className="w-full bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-3.5 px-6 rounded-full text-sm transition-all hover:scale-[1.02] shadow-md"
                    >
                      Être rappelé(e)
                    </button>
                    <Link
                      to={`/contact?bien=${encodeURIComponent(property.title)}`}
                      className="w-full flex items-center justify-center border border-stone-200 text-stone-600 hover:border-[#0022d2] hover:text-[#0022d2] font-light py-3.5 px-6 rounded-full text-sm transition-all duration-300"
                    >
                      Envoyer un message
                    </Link>
                  </div>
                )}
              </div>

              {/* Engagement */}
              <div className="rounded-2xl border border-[#ffb800]/20 bg-[#ffb800]/5 p-6">
                <p className="font-serif text-sm italic font-light text-stone-600 leading-relaxed">
                  "Chaque visite est préparée avec soin. Nous vous accompagnons
                  à chaque étape."
                </p>
                <p className="mt-3 text-xs tracking-widest uppercase text-[#0022d2] font-light">
                  L'équipe NextoCasa
                </p>
              </div>

              {/* Retour */}
              <button
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 text-stone-400 hover:text-stone-600 text-sm font-light transition-colors py-2"
              >
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
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Retour aux résultats
              </button>
            </aside>
          </div>

          {/* ── Biens similaires ─────────────────────────────────────────────── */}
          {similar.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                  À découvrir aussi
                </p>
              </div>
              <h2 className="font-serif text-2xl font-light text-stone-800 mb-8">
                Biens{" "}
                <em className="not-italic italic text-[#0022d2]">similaires</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <Link
                    key={p.id}
                    to={`/biens/${p.id}`}
                    onClick={() => {
                      setImgIndex(0);
                      window.scrollTo(0, 0);
                    }}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden bg-stone-100">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {p.tag && (
                        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-stone-400 font-light mb-1">
                        {p.location}
                      </p>
                      <h3 className="font-serif text-base font-light text-stone-800 mb-2 group-hover:text-[#0022d2] transition-colors">
                        {p.title}
                      </h3>
                      <p className="font-serif text-lg font-light text-[#0022d2]">
                        {p.type === "location"
                          ? `${p.price.toLocaleString("fr-FR")} €/mois`
                          : `${p.price.toLocaleString("fr-FR")} €`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
