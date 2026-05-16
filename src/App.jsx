import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
/*
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
*/
import PropertyDetail from "./pages/PropertyDetail";
import Achat from "./pages/Achat";
import Vente from "./pages/Vente";
import Location from "./pages/Location";
import Estimation from "./pages/Estimation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

// ─── Liens de navigation ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/achat", label: "Achat" },
  { to: "/vente", label: "Vente" },
  { to: "/location", label: "Location" },
  { to: "/estimation", label: "Estimation" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Fermer au changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Fermer avec Échap
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="NextoCasa"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Liens desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={[
                  "px-3 py-2 rounded-full transition-all duration-200 text-sm font-medium",
                  isActive(to)
                    ? "text-[#0022d2] bg-blue-50"
                    : "text-gray-600 hover:text-[#0022d2] hover:bg-blue-50",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:block shrink-0">
            <Link
              to="/estimation"
              className="bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-semibold py-2.5 px-5 rounded-full text-sm transition-all hover:scale-105 shadow-sm whitespace-nowrap"
            >
              Estimation gratuite
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#0022d2] focus:outline-none"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={[
                  "block py-2.5 px-4 rounded-xl transition text-sm font-medium",
                  isActive(to)
                    ? "bg-blue-50 text-[#0022d2]"
                    : "text-gray-700 hover:text-[#0022d2] hover:bg-blue-50",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                to="/estimation"
                className="block text-center bg-[#ffb800] text-[#0022d2] font-semibold py-3 px-5 rounded-full text-sm"
              >
                Estimation gratuite
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

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
              { to: "/blog", label: "Blog" },
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
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Helmet>
                      <title>NextoCasa — Agence immobilière d'exception</title>
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

              {/*<Route path="/blog" element={<Blog />} />*/}
              {/*<Route path="/blog/:slug" element={<BlogArticle />} />*/}

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/biens/:id" element={<PropertyDetail />} />
              <Route path="/mentions-legales" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

/*

import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PropertyCard from "./components/PropertyCard";
import PropertyDetail from "./pages/PropertyDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Achat from "./pages/Achat";
import Location from "./pages/Location";
import Vente from "./pages/Vente";
import Estimation from "./pages/Estimation";

function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setProperties(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!Array.isArray(properties) || properties.length === 0) return;
    if (filterType === "all") {
      setFiltered(properties);
    } else {
      const filteredList = properties.filter((p) => p && p.type === filterType);
      setFiltered(filteredList);
    }
  }, [filterType, properties]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const types = useMemo(() => {
    return Array.isArray(properties)
      ? [...new Set(properties.map((p) => p.type).filter(Boolean))]
      : [];
  }, [properties]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-blue-800 animate-pulse">
          ⏳ Chargement des biens...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 p-4">
        <p className="text-2xl mb-4">❌ Erreur : {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="NextoCasa"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Accueil
                </Link>
                <Link
                  to="/achat"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Achat
                </Link>
                <Link
                  to="/vente"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Vente
                </Link>
                <Link
                  to="/location"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Location
                </Link>
                <Link
                  to="/estimation"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Estimation
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition font-medium"
                >
                  Contact
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                  aria-label="Menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-4 pt-2 pb-4 space-y-2">
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  to="/achat"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Achat
                </Link>
                <Link
                  to="/vente"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vente
                </Link>
                <Link
                  to="/location"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Location
                </Link>
                <Link
                  to="/estimation"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Estimation
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>NextoCasa — Agence immobilière</title>
                  <meta
                    name="description"
                    content="NextoCasa, agence immobilière nouvelle génération. Achat, vente, location, estimation gratuite."
                  />
                </Helmet>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="relative h-[85vh] flex items-center justify-start overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/NextoCasa.png"
                      alt="NextoCasa"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

                    <div className="relative z-10 text-center px-6 md:px-12 max-w-xl translate-y-32 md:translate-y-36">
                      <div
                        className="rounded-xl p-5 md:p-6 shadow-xl border border-white/20"
                        style={{ backgroundColor: "#0022d2" }}
                      >
                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#ffb800] leading-tight tracking-tight mb-4">
                          <span className="font-bold">Nexto</span>
                          <span className="font-normal italic">Casa</span> :
                          <br />
                          Immobilier d'exception,
                          <br />
                          Expertise locale.
                        </h1>

                        <p className="text-lg md:text-xl text-[#ffb800] font-medium leading-relaxed tracking-wide mb-6">
                          L’élégance immobilière
                          <br />
                          pour des biens d’exception.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <br />
                          <br />
                          <Link
                            to="/achat"
                            className="bg-[#ffb800] hover:bg-[#ffcf4d] text-[#0022d2] font-semibold py-1.2 px-6 md:py-2 md:px-7 rounded-full shadow-md transition transform hover:scale-105 text-sm md:text-base"
                          >
                            🔍 Découvrir nos biens
                          </Link>
                          <Link
                            to="/estimation"
                            className="bg-white/20 border border-[#ffb800] text-[#ffb800] font-semibold py-1.2 px-6 md:py-2 md:px-7 rounded-full shadow-md transition transform hover:scale-105 text-sm md:text-base hover:bg-white/30"
                          >
                            📊 Estimation gratuite
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />

          <Route
            path="/biens/:id"
            element={<PropertyDetail properties={properties} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/achat" element={<Achat />} />

          <Route path="/vente" element={<Vente />} />
          <Route path="/location" element={<Location />} />
          <Route path="/estimation" element={<Estimation />} />
        </Routes>

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} NextoCasa. Tous droits réservés.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              <Link to="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>{" "}
              |
              <Link to="/contact" className="hover:underline ml-2">
                Contact
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
*/
