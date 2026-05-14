
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    callback: false
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L’email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value


      
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', callback: false });
        setErrors({});
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <>
      <Helmet>
        <title>NextoCasa — Contact</title>
        <meta
          name="description"
          content="Contactez NextoCasa pour une visite, une estimation ou une consultation privée."
        />
      </Helmet>

      <main className="bg-[#f7f5f1] text-slate-900">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                NextoCasa
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Réserver une consultation privée
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Une question, une visite ou une étude de valeur personnalisée ?
                Notre équipe vous répond avec attention et réactivité.
              </p>

              {status === 'sending' && (
                <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700">
                  Envoi en cours...
                </div>
              )}
              {status === 'success' && (
                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                  Merci. Votre demande a bien été transmise à notre équipe.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-700 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-700 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="jean.dupont@exemple.fr"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-700 ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}
                    placeholder="06 00 00 00 00"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full resize-none rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-700 ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}
                    placeholder="Décrivez votre projet..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="callback"
                    checked={formData.callback}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-700"
                  />
                  <span>Je préfère être rappelé(e) dans les 2 heures ouvrées.</span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>

                <p className="text-xs leading-6 text-slate-500">
                  Vos informations sont utilisées uniquement pour vous répondre.
                </p>
              </form>
            </div>

            <aside className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm md:p-10">
              <h2 className="text-2xl font-semibold">Informations utiles</h2>
              <p className="mt-4 text-white/75">
                Nous restons disponibles pour échanger sur votre projet immobilier.
              </p>

              <div className="mt-8 space-y-5 text-sm text-white/85">
                <p><span className="block text-white font-semibold">Adresse</span> Neuilly-sur-Marne, Île-de-France</p>
                <p><span className="block text-white font-semibold">Téléphone</span> +33 1 00 00 00 00</p>
                <p><span className="block text-white font-semibold">Email</span> contact@nextocasa.fr</p>
                <p><span className="block text-white font-semibold">Horaires</span> Lun–Ven : 9h00–19h00, Sam : 10h00–13h00</p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-7 text-white/80">
                  Chez NextoCasa, chaque contact est traité avec soin,
                  confidentialité et professionnalisme.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;










  
