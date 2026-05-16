import { useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    callback: false,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // ── Validation ────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          callback: false,
        });
        setErrors({});
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
      });
  };

  // ── Champ réutilisable ────────────────────────────────────────────────────
  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition
     focus:ring-2 focus:ring-[#0022d2]/30 focus:border-[#0022d2]
     ${
       errors[field]
         ? "border-red-300 bg-red-50"
         : "border-stone-200 bg-white hover:border-stone-300"
     }`;

  return (
    <>
      <Helmet>
        <title>NextoCasa — Contact</title>
        <meta
          name="description"
          content="Contactez NextoCasa pour une visite, une estimation ou une consultation privée."
        />
      </Helmet>

      <main className="bg-[#f7f5f1] min-h-screen">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* ── En-tête page ─────────────────────────────────────────────── */}

          <div className="mb-12 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#0022d2] font-medium mb-3">
              NextoCasa
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-stone-800 leading-tight">
              Réserver une{" "}
              <span className="italic text-[#0022d2]">consultation privée</span>
            </h1>
            <p className="mt-4 text-stone-500 text-base font-light max-w-xl mx-auto leading-relaxed">
              Une question, une visite ou une étude de valeur personnalisée ?
              Notre équipe vous répond avec attention et réactivité.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* ── Formulaire ───────────────────────────────────────────────── */}

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-100 md:p-10">
              {/* Notifications */}

              {status === "sending" && (
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  Envoi en cours…
                </div>
              )}
              {status === "success" && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  ✓ Merci. Votre demande a bien été transmise à notre équipe.
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Nom + Email */}

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium tracking-wide text-stone-600 uppercase"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Jean Dupont"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium tracking-wide text-stone-600 uppercase"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="jean.dupont@exemple.fr"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Téléphone */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-stone-600 uppercase"
                  >
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="06 00 00 00 00"
                    className={inputClass("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-stone-600 uppercase"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet…"
                    className={`resize-none ${inputClass("message")}`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Rappel */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="callback"
                    checked={formData.callback}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#0022d2] focus:ring-[#0022d2]"
                  />
                  <span className="text-sm text-stone-600 font-light">
                    Je préfère être rappelé(e) dans les 2 heures ouvrées.
                  </span>
                </label>

                {/* Bouton */}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-4 px-6 text-sm tracking-wide transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                >
                  {status === "sending"
                    ? "Envoi en cours…"
                    : "Envoyer ma demande"}
                </button>

                <p className="text-xs text-stone-400 text-center leading-relaxed">
                  Vos informations sont utilisées uniquement pour vous répondre.
                </p>
              </form>
            </div>

            {/* ── Panneau latéral — premium clair ──────────────────────────── */}

            <aside className="space-y-5">
              {/* Coordonnées */}

              <div className="rounded-2xl bg-white ring-1 ring-stone-100 shadow-sm p-8">
                <p className="text-xs tracking-[0.15em] uppercase text-[#0022d2] font-medium mb-5">
                  Informations utiles
                </p>
                <div className="space-y-5">
                  {[
                    {
                      label: "Adresse",
                      value: "Neuilly-sur-Marne, Île-de-France",
                    },
                    { label: "Téléphone", value: "+33 1 00 00 00 00" },
                    { label: "Email", value: "contact@nextocasa.fr" },
                    {
                      label: "Horaires",
                      value: "Lun–Ven : 9h–19h · Sam : 10h–13h",
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-xs tracking-widest uppercase text-stone-400">
                        {label}
                      </span>
                      <span className="text-sm text-stone-700 font-light">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement qualité */}

              <div className="rounded-2xl border border-[#0022d2]/10 bg-[#0022d2]/[0.03] p-7">
                <p className="font-serif text-lg font-light italic text-stone-700 leading-relaxed">
                  "Chaque contact est traité avec soin, confidentialité et
                  professionnalisme."
                </p>
                <p className="mt-4 text-xs tracking-widest uppercase text-[#0022d2]">
                  L'équipe NextoCasa
                </p>
              </div>

              {/* Délai de réponse */}

              <div className="rounded-2xl bg-[#ffb800]/10 border border-[#ffb800]/20 p-6 flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">
                  ⚡
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-800 mb-1">
                    Réponse sous 24h
                  </p>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Notre équipe s'engage à vous répondre le jour ouvré suivant
                    votre demande.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;
