/*

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function About() {
  const team = [
    {
      name: "Hind",
      role: "Directrice",
      image: "/Hind.png",
      bio: "Pilotage global, vision stratégique et accompagnement premium des clients.",
    },
    {
      name: "Laure Lefebre",
      role: "Conseil",
      image: "/Laure.png",
      bio: "Suivi client, coordination des dossiers et accompagnement de proximité.",
    },
    {
      name: "Max William",
      role: "Négociation",
      image: "/Max.png",
      bio: "Analyse des opportunités, échanges commerciaux et recherche de solutions.",
    },
    {
      name: "Kevine Dupon",
      role: "Relation client",
      image: "/Kevine.png",
      bio: "Gestion des demandes, fluidité du parcours et expérience client soignée.",
    },
  ];

  const values = [
    "Réponse sous 24h ouvrés",
    "Confidentialité absolue",
    "Suivi personnalisé",
    "Sélection exigeante",
  ];

  return (
    <>
      <Helmet>
        <title>À propos | NextoCasa</title>
        <meta
          name="description"
          content="Découvrez l’équipe NextoCasa, ses valeurs et son accompagnement immobilier sur mesure."
        />
      </Helmet>

      <main className="bg-[#f7f5f1] text-slate-900">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                À propos de NextoCasa
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Une équipe engagée pour un accompagnement clair et premium
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                NextoCasa, une équipe immobilière engagée, discrète et exigeante,
                au service de vos projets.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/Hind.png"
                    alt="Hind, directrice de NextoCasa"
                    className="h-[340px] w-full object-cover object-center"
                  />
                </div>

                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/Laure.png"
                    alt="Laure Lefebre"
                    className="h-56 w-full object-cover object-center"
                  />
                </div>

                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/Max.png"
                    alt="Max William"
                    className="h-56 w-full object-cover object-center"
                  />
                </div>

                <div className="sm:col-span-2 overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/Kevine.png"
                    alt="Kevine Dupon"
                    className="h-56 w-full object-cover object-center"
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-slate-500">
                L’équipe NextoCasa réunie autour d’une même exigence de qualité.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] ring-1 ring-black/5"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-72 w-full object-cover"
                />
                <div className="p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                    {member.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{member.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((item) => (
              <div
                key={item}
                className="flex min-h-[154px] flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white px-5 py-4 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid gap-8 rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-white/5 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
                Suivi bancaire & finalisation
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Un accompagnement jusqu’à la finalisation
              </h2>
            </div>

            <p className="text-center text-lg leading-8 text-white/75 lg:text-left">
              Notre rôle ne s’arrête pas à la mise en relation. Nous suivons le
              projet avec méthode, du premier échange au suivi bancaire, jusqu’à
              la finalisation, pour offrir une expérience fluide et rassurante.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 px-8 py-12 text-white md:px-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              Parlons de votre projet
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
              Notre équipe vous accompagne avec une approche fluide, élégante
              et confidentielle, adaptée aux projets immobiliers les plus
              exigeants.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Réserver une consultation privée
              </Link>
              <Link
                to="/estimation"
                className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Demander une estimation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
  */
import AboutPage from "../components/about/AboutPage";

export default function About() {
  return <AboutPage />;
}
