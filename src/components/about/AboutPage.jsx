import Navbar from "../components/about/Navbar";
import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import AboutPhilosophy from "../components/about/AboutPhilosophy";
import AboutTeam from "../components/about/AboutTeam";
import AboutStats from "../components/about/AboutStats";
import AboutCTA from "../components/about/AboutCTA";

/**
 * Page "L'agence" — NextoCasa
 *
 * Route recommandée : /agence
 * Titre de document : L'agence | NextoCasa
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation principale */}
      <Navbar />

      <main>
        {/* 1. Hero — manifeste */}
        <AboutHero />

        {/* 2. Histoire — origine et fondateurs */}
        <AboutStory />

        {/* 3. Philosophie — 3 piliers */}
        <AboutPhilosophy />

        {/* 4. Équipe — portraits */}
        <AboutTeam />

        {/* 5. Chiffres clés */}
        <AboutStats />

        {/* 6. CTA — vers la page contact */}
        <AboutCTA />
      </main>

      {/* Footer minimal — à compléter */}
      <footer className="border-t border-stone-100 px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-serif text-sm tracking-widest text-stone-400">
            NEXTO<span className="italic">CASA</span>
          </span>
          <p className="text-xs text-stone-300">
            © {new Date().getFullYear()} NextoCasa. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}