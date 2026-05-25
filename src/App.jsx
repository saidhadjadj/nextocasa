import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Navbar from "./components/about/Navbar";

// ─── Chargement immédiat — page critique ─────────────────────────────────────
import HomePage from "./pages/HomePage";

// ─── Chargement différé — pages secondaires (réduit le TBT) ──────────────────
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Achat = lazy(() => import("./pages/Achat"));
const Vente = lazy(() => import("./pages/Vente"));
const Location = lazy(() => import("./pages/Location"));
const Estimation = lazy(() => import("./pages/Estimation"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));

// ─── Fallback pendant le chargement ──────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-serif text-2xl font-light text-stone-300 animate-pulse">
          NEXTO<span className="italic text-[#ffb800]">CASA</span>
        </p>
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#ffb800] to-transparent animate-pulse" />
      </div>
    </div>
  );
}

// ─── Liens de navigation ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/achat", label: "Achat" },
  { to: "/vente", label: "Vente" },
  { to: "/location", label: "Location" },
  { to: "/estimation", label: "Estimation" },
  { to: "/observatoire", label: "L'Observatoire" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0022d2] text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-xl tracking-widest">
            NEXTO<span className="italic font-light text-[#ffb800]">CASA</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            {[
              { to: "/achat", label: "Achat" },
              { to: "/vente", label: "Vente" },
              { to: "/location", label: "Location" },
              { to: "/estimation", label: "Estimation" },
              { to: "/observatoire", label: "L'Observatoire" },
              { to: "/about", label: "À propos" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:text-[#ffb800] transition"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-white/40">
            <Link
              to="/mentions-legales"
              className="hover:text-[#ffb800] transition"
            >
              Mentions légales
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-[#ffb800] transition">
              Contact
            </Link>
          </div>
        </div>
        <p className="text-center text-xs text-white/30 mt-8">
          © {new Date().getFullYear()} NextoCasa. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Helmet>
                        <title>
                          NextoCasa — Agence immobilière d'exception
                        </title>
                        <meta
                          name="description"
                          content="NextoCasa, agence immobilière premium. Achat, vente, location et estimation gratuite de biens d'exception à Paris, Lyon et Bordeaux."
                        />
                      </Helmet>
                      <HomePage />
                    </>
                  }
                />
                <Route path="/achat" element={<Achat />} />
                <Route path="/vente" element={<Vente />} />
                <Route path="/location" element={<Location />} />
                <Route path="/estimation" element={<Estimation />} />
                <Route path="/observatoire" element={<Blog />} />
                <Route path="/observatoire/:slug" element={<BlogArticle />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/biens/:id" element={<PropertyDetail />} />
                <Route path="/mentions-legales" element={<Legal />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
