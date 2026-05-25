import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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

// Pages avec hero plein écran — navbar transparente au départ
const HERO_PAGES = [
  "/",
  "/achat",
  "/vente",
  "/location",
  "/estimation",
  "/observatoire",
  "/about",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const hasHero = HERO_PAGES.includes(pathname);

  // Détection du scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // état initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu au changement de route
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

  // État visuel de la navbar
  const isTransparent = hasHero && !scrolled && !isMenuOpen;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100/80",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="NextoCasa — Accueil"
          >
            {/* Logo image */}
            <div
              className={[
                "relative w-9 h-9 rounded-full overflow-hidden ring-1 transition-all duration-300",
                isTransparent
                  ? "ring-white/30 group-hover:ring-[#ffb800]/60"
                  : "ring-stone-200 group-hover:ring-[#ffb800]/50",
              ].join(" ")}
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Fallback si logo absent */}
              <div className="absolute inset-0 bg-[#0022d2] flex items-center justify-center">
                <span className="font-serif text-[#ffb800] text-sm font-light">
                  N
                </span>
              </div>
            </div>

            {/* Texte serif */}
            <div className="leading-none">
              <p
                className={[
                  "font-serif text-xl tracking-[0.12em] transition-colors duration-300",
                  isTransparent ? "text-white" : "text-stone-900",
                ].join(" ")}
              >
                NEXTO
                <span
                  className={[
                    "italic font-light transition-colors duration-300",
                    isTransparent ? "text-[#ffb800]" : "text-[#0022d2]",
                  ].join(" ")}
                >
                  CASA
                </span>
              </p>
              <div
                className={[
                  "h-px mt-0.5 transition-all duration-500",
                  isTransparent
                    ? "bg-gradient-to-r from-[#ffb800]/60 to-transparent w-full"
                    : "bg-gradient-to-r from-[#0022d2]/30 to-transparent w-3/4",
                ].join(" ")}
              />
            </div>
          </Link>

          {/* ── Liens desktop ─────────────────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={[
                    "relative px-3.5 py-2 text-sm font-light tracking-wide transition-colors duration-200 group",
                    isTransparent
                      ? active
                        ? "text-[#ffb800]"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-[#0022d2]"
                        : "text-stone-500 hover:text-stone-900",
                  ].join(" ")}
                >
                  {label}

                  {/* Point doré sous le lien actif */}
                  <span
                    className={[
                      "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300",
                      active
                        ? "bg-[#ffb800] opacity-100 scale-100"
                        : "bg-[#ffb800] opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-75",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── CTA desktop ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Séparateur vertical */}
            <div
              className={[
                "w-px h-4 transition-colors duration-300",
                isTransparent ? "bg-white/20" : "bg-stone-200",
              ].join(" ")}
            />

            <Link
              to="/estimation"
              className={[
                "inline-flex items-center gap-2 py-2.5 px-5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105",
                isTransparent
                  ? "bg-[#ffb800] text-[#0022d2] hover:bg-[#ffc929] shadow-lg shadow-black/20"
                  : "bg-[#ffb800] text-[#0022d2] hover:bg-[#ffc929] shadow-md",
              ].join(" ")}
            >
              Estimation gratuite
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* ── Burger mobile ─────────────────────────────────────────────── */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={[
              "lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-200",
              isTransparent ? "hover:bg-white/10" : "hover:bg-stone-50",
            ].join(" ")}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={[
                "block h-px w-6 transition-all duration-300 origin-center",
                isMenuOpen ? "rotate-45 translate-y-2" : "",
                isTransparent ? "bg-white" : "bg-stone-700",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px transition-all duration-300",
                isMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100",
                isTransparent ? "bg-white/60" : "bg-stone-400",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-6 transition-all duration-300 origin-center",
                isMenuOpen ? "-rotate-45 -translate-y-2" : "",
                isTransparent ? "bg-white" : "bg-stone-700",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* ── Menu mobile ───────────────────────────────────────────────────── */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-all duration-400 ease-in-out",
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          "bg-white/98 backdrop-blur-md border-t border-stone-100",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 space-y-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={[
                  "flex items-center justify-between py-3 px-4 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-[#0022d2]/5 text-[#0022d2]"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
                ].join(" ")}
              >
                <span className="font-light tracking-wide">{label}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb800]" />
                )}
              </Link>
            );
          })}

          {/* CTA mobile */}
          <div className="pt-3 pb-2">
            <Link
              to="/estimation"
              className="flex items-center justify-center gap-2 w-full bg-[#ffb800] text-[#0022d2] font-semibold py-3.5 px-6 rounded-full text-sm transition-all hover:bg-[#ffc929]"
            >
              Estimation gratuite
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
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
