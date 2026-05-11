import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/PropertyCard';

function Home({ loading, error, filtered }) {
  if (loading) {
    return (
      <main className="bg-[#f7f5f1] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-lg font-medium text-slate-600">Chargement des biens...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#f7f5f1] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-lg font-medium text-red-600">
            Une erreur est survenue lors du chargement des biens.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>NextoCasa — L’art de révéler les lieux d’exception</title>
        <meta
          name="description"
          content="NextoCasa accompagne une clientèle exigeante dans l’achat, la location et la valorisation de propriétés sélectionnées avec soin."
        />
      </Helmet>

      <main className="bg-[#f7f5f1] text-slate-900">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                NextoCasa
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                L’art de révéler les lieux d’exception
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Depuis 2002, NextoCasa accompagne une clientèle exigeante dans
                l’acquisition, la location et la valorisation de propriétés
                sélectionnées avec soin.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/biens"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Découvrir notre collection
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
                >
                  Réserver une consultation privée
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  'Expertise locale',
                  'Accompagnement personnalisé',
                  'Biens sélectionnés',
                  'Réponse rapide',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-black/5"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <img
                src="/images/hero-home.jpg"
                alt="Intérieur premium d'un bien immobilier NextoCasa"
                className="h-[520px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                'Réponse sous 24h ouvrées',
                'Biens sélectionnés avec exigence',
                'Accompagnement personnalisé',
                'Conseil confidentiel et discret',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-[#f7f5f1] px-5 py-4 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  Sélection exclusive
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Des biens choisis pour leur lumière et leur potentiel
                </h2>
              </div>
              <a
                href="/biens"
                className="text-sm font-semibold text-slate-900 underline underline-offset-4"
              >
                Voir tous les biens
              </a>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-semibold">Achat</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Trouver le bien qui correspond à votre projet avec un conseil
                précis et un suivi attentif.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-semibold">Location</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Des biens sélectionnés pour leur emplacement, leur qualité et
                leur cohérence avec vos attentes.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-semibold">Estimation</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Une étude de valeur personnalisée pour connaître le juste
                positionnement de votre bien.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ils nous ont fait confiance
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: 'Un accompagnement discret, précis et très professionnel.',
                  author: 'Client 1',
                },
                {
                  quote: 'Une équipe réactive, attentive et d’un grand sérieux.',
                  author: 'Client 2',
                },
                {
                  quote: 'Une vraie différence dans la présentation et le suivi du bien.',
                  author: 'Client 3',
                },
              ].map((item) => (
                <blockquote
                  key={item.author}
                  className="rounded-3xl bg-[#f7f5f1] p-8 shadow-sm ring-1 ring-black/5"
                >
                  <p className="leading-8 text-slate-700">“{item.quote}”</p>
                  <footer className="mt-6 text-sm font-semibold text-slate-900">
                    {item.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white md:px-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Une approche différente de l’immobilier d’exception
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
              Chez NextoCasa, nous privilégions la qualité du conseil, la
              cohérence du parcours et la confiance à long terme.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Réserver une consultation privée
              </a>
              <a
                href="/biens"
                className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Découvrir la collection
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;



















