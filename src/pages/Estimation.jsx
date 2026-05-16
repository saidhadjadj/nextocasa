import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// ─── Étapes du formulaire ─────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Votre bien" },
  { num: 2, label: "Les détails" },
  { num: 3, label: "Vos coordonnées" },
];

const PROPERTY_TYPES = [
  { key: "appartement", label: "Appartement", icon: "🏢" },
  { key: "maison", label: "Maison", icon: "🏠" },
  { key: "villa", label: "Villa", icon: "🏡" },
  { key: "loft", label: "Loft / Atelier", icon: "🏗️" },
];

const TRANSACTION_TYPES = [
  { key: "vente", label: "Je souhaite vendre" },
  { key: "location", label: "Je souhaite louer" },
  { key: "info", label: "Simple curiosité / Info" },
];

const INITIAL = {
  // Étape 1
  transactionType: "",
  propertyType: "",
  // Étape 2
  surface: "",
  rooms: "",
  floor: "",
  condition: "",
  address: "",
  // Étape 3
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Estimation() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ── Validation par étape ──────────────────────────────────────────────────
  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.transactionType)
        e.transactionType = "Veuillez choisir une option";
      if (!data.propertyType)
        e.propertyType = "Veuillez choisir un type de bien";
    }
    if (s === 2) {
      if (!data.surface) e.surface = "La surface est requise";
      if (!data.address) e.address = "L'adresse (ou la ville) est requise";
    }
    if (s === 3) {
      if (!data.name.trim()) e.name = "Le nom est requis";
      if (!data.email.trim()) e.email = "L'email est requis";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "Email invalide";
      if (!data.phone.trim()) e.phone = "Le téléphone est requis";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validate(step)) setStep((s) => s + 1);
  };
  const prevStep = () => {
    setStep((s) => s - 1);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(3)) return;
    // Ici : intégrer EmailJS ou votre API
    setSent(true);
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition font-light
     focus:ring-2 focus:ring-[#0022d2]/20 focus:border-[#0022d2]
     ${errors[field] ? "border-red-300 bg-red-50" : "border-stone-200 bg-white hover:border-stone-300"}`;

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (sent) {
    return (
      <>
        <Helmet>
          <title>Estimation envoyée — NextoCasa</title>
        </Helmet>
        <div className="bg-[#f7f5f1] min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-stone-100 shadow-sm p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-7 h-7 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]" />
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                Demande reçue
              </p>
              <div className="h-px w-6 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-2xl font-light text-stone-800 mb-3">
              Merci, {data.name.split(" ")[0]} !
            </h1>
            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">
              Votre demande d'estimation a bien été reçue. Un conseiller
              NextoCasa vous contactera sous{" "}
              <strong className="font-medium text-stone-700">
                48 heures ouvrées
              </strong>
              .
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-3.5 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Estimation gratuite — NextoCasa</title>
        <meta
          name="description"
          content="Obtenez une estimation gratuite et personnalisée de votre bien immobilier. Réponse sous 48h par un conseiller NextoCasa."
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* Hero */}
        <div className="relative h-52 md:h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/82" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Gratuit & sans engagement
              </p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
              Estimer mon{" "}
              <em className="not-italic italic text-[#ffb800]">bien</em>
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step > s.num
                        ? "bg-[#0022d2] text-white"
                        : step === s.num
                          ? "bg-[#0022d2] text-white shadow-md scale-110"
                          : "bg-white border border-stone-200 text-stone-400"
                    }`}
                  >
                    {step > s.num ? (
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <p
                    className={`text-xs font-light transition-colors ${step === s.num ? "text-[#0022d2]" : "text-stone-400"}`}
                  >
                    {s.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-16 h-px mx-2 mb-4 transition-colors duration-300 ${step > s.num ? "bg-[#0022d2]" : "bg-stone-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 md:p-10">
            {/* ── Étape 1 ── */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6 bg-[#ffb800]" />
                    <h2 className="font-serif text-xl font-light text-stone-800">
                      Votre projet
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {TRANSACTION_TYPES.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => update("transactionType", t.key)}
                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                          data.transactionType === t.key
                            ? "border-[#0022d2] bg-[#0022d2]/5 text-[#0022d2]"
                            : "border-stone-200 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            data.transactionType === t.key
                              ? "border-[#0022d2]"
                              : "border-stone-300"
                          }`}
                        >
                          {data.transactionType === t.key && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0022d2]" />
                          )}
                        </div>
                        <span className="text-sm font-light">{t.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.transactionType && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.transactionType}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6 bg-[#ffb800]" />
                    <h2 className="font-serif text-xl font-light text-stone-800">
                      Type de bien
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {PROPERTY_TYPES.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => update("propertyType", t.key)}
                        className={`flex flex-col items-center gap-2 p-5 rounded-xl border text-center transition-all duration-200 ${
                          data.propertyType === t.key
                            ? "border-[#0022d2] bg-[#0022d2]/5"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <span className="text-2xl" aria-hidden="true">
                          {t.icon}
                        </span>
                        <span
                          className={`text-sm font-light ${data.propertyType === t.key ? "text-[#0022d2]" : "text-stone-600"}`}
                        >
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.propertyType && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.propertyType}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── Étape 2 ── */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-6 bg-[#ffb800]" />
                  <h2 className="font-serif text-xl font-light text-stone-800">
                    Les détails du bien
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      Surface (m²) *
                    </label>
                    <input
                      type="number"
                      value={data.surface}
                      onChange={(e) => update("surface", e.target.value)}
                      placeholder="Ex : 85"
                      className={inputClass("surface")}
                    />
                    {errors.surface && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.surface}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      Nombre de pièces
                    </label>
                    <input
                      type="number"
                      value={data.rooms}
                      onChange={(e) => update("rooms", e.target.value)}
                      placeholder="Ex : 4"
                      className={inputClass("rooms")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      Étage
                    </label>
                    <input
                      type="text"
                      value={data.floor}
                      onChange={(e) => update("floor", e.target.value)}
                      placeholder="Ex : 3ème / 5"
                      className={inputClass("floor")}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      État général
                    </label>
                    <select
                      value={data.condition}
                      onChange={(e) => update("condition", e.target.value)}
                      className={inputClass("condition")}
                    >
                      <option value="">Choisir…</option>
                      <option value="neuf">Neuf / Récent</option>
                      <option value="bon">Bon état</option>
                      <option value="travaux">Travaux à prévoir</option>
                      <option value="renovation">À rénover</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                    Adresse ou ville *
                  </label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Ex : Paris 16ème, ou adresse complète"
                    className={inputClass("address")}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── Étape 3 ── */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-6 bg-[#ffb800]" />
                  <h2 className="font-serif text-xl font-light text-stone-800">
                    Vos coordonnées
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jean Dupont"
                      className={inputClass("name")}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="06 00 00 00 00"
                      className={inputClass("phone")}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jean.dupont@exemple.fr"
                    className={inputClass("email")}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-500 uppercase">
                    Message complémentaire
                  </label>
                  <textarea
                    rows={4}
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Précisions sur votre bien, vos délais, vos attentes…"
                    className={`resize-none ${inputClass("message")}`}
                  />
                </div>

                {/* Récap */}
                <div className="rounded-xl bg-stone-50 border border-stone-100 p-4 text-xs text-stone-500 font-light space-y-1">
                  <p className="font-medium text-stone-700 mb-2 text-sm">
                    Récapitulatif de votre demande
                  </p>
                  <p>
                    Type de projet :{" "}
                    <span className="text-stone-700">
                      {
                        TRANSACTION_TYPES.find(
                          (t) => t.key === data.transactionType,
                        )?.label
                      }
                    </span>
                  </p>
                  <p>
                    Type de bien :{" "}
                    <span className="text-stone-700 capitalize">
                      {
                        PROPERTY_TYPES.find((t) => t.key === data.propertyType)
                          ?.label
                      }
                    </span>
                  </p>
                  <p>
                    Surface :{" "}
                    <span className="text-stone-700">{data.surface} m²</span>
                  </p>
                  <p>
                    Localisation :{" "}
                    <span className="text-stone-700">{data.address}</span>
                  </p>
                </div>

                <p className="text-xs text-stone-400 font-light">
                  Vos informations sont utilisées uniquement pour vous adresser
                  une estimation personnalisée.
                </p>
              </div>
            )}

            {/* Navigation étapes */}
            <div
              className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-500 rounded-full text-sm font-light hover:border-stone-300 transition-all"
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
                  Retour
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-3 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md"
                >
                  Continuer
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
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-bold py-3 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md"
                >
                  Envoyer ma demande
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
                </button>
              )}
            </div>
          </div>

          {/* Garanties */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: "🔒", label: "Données protégées" },
              { icon: "⚡", label: "Réponse sous 48h" },
              { icon: "🎯", label: "Sans engagement" },
            ].map((g) => (
              <div
                key={g.label}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <span className="text-xl" aria-hidden="true">
                  {g.icon}
                </span>
                <span className="text-xs text-stone-400 font-light">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
