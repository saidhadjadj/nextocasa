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
import Navbar from "./components/about/Navbar";

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
          <main className="flex-1 pt-20">
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
              {/*
              <Route path="/blog" element={<Blog />} />
              */}
              {/* <Route path="/blog/:slug" element={<BlogArticle />} />*/}
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
