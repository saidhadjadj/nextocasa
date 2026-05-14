import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Biens", to: "/biens" },
  { label: "L\u2019agence", to: "/agence" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="border-b border-stone-200/70 px-6 md:px-12 lg:px-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-5">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-xl tracking-widest text-stone-900"
        >
          NEXTO<span className="font-light italic text-stone-400">CASA</span>
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, to }) => {
            const active = pathname.startsWith(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={[
                    "text-xs tracking-widest uppercase transition-colors duration-200",
                    active
                      ? "text-stone-900 border-b border-stone-900 pb-px"
                      : "text-stone-400 hover:text-stone-700",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu icon placeholder */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <span className="block h-px w-6 bg-stone-700" />
          <span className="block h-px w-4 bg-stone-400" />
          <span className="block h-px w-6 bg-stone-700" />
        </button>
      </nav>
    </header>
  );
}