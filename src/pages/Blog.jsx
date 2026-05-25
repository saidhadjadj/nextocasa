import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ARTICLES, CATEGORIES, BLOG_BENEFITS } from "../data/blogContent";

// ─── Carte article standard ───────────────────────────────────────────────────
function ArticleCard({ article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-stone-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-stone-600 backdrop-blur-sm">
            {article.tag}
          </span>
          {article.type === "pilier" && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0022d2]/90 text-white backdrop-blur-sm">
              Pilier
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h2 className="font-serif text-lg font-light text-stone-800 mb-3 leading-snug group-hover:text-[#0022d2] transition-colors duration-300 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-stone-400 text-sm font-light leading-relaxed mb-4 flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center font-serif text-xs text-stone-500 shrink-0">
              {article.authorInitials}
            </div>
            <p className="text-xs text-stone-400 font-light">
              {article.date} · {article.readTime}
            </p>
          </div>
          <span className="text-xs text-stone-300 group-hover:text-[#0022d2] transition-colors flex items-center gap-1 shrink-0">
            Lire
            <svg
              className="w-3 h-3 transition-transform group-hover:translate-x-1"
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
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Carte article à la une ───────────────────────────────────────────────────
function FeaturedArticle({ article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-xl transition-all duration-500"
    >
      <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden bg-stone-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
            À la une
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-stone-600 backdrop-blur-sm">
            {article.tag}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 md:p-10 md:w-1/2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#ffb800]" />
          <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light">
            Article phare · {article.ref}
          </p>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-800 mb-4 leading-snug group-hover:text-[#0022d2] transition-colors duration-300">
          {article.title}
        </h2>
        <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center font-serif text-sm text-stone-500">
              {article.authorInitials}
            </div>
            <div>
              <p className="text-xs font-medium text-stone-700">
                {article.author}
              </p>
              <p className="text-xs text-stone-400 font-light">
                {article.date} · {article.readTime} · {article.wordCount} mots
              </p>
            </div>
          </div>
          <span className="text-xs text-stone-300 group-hover:text-[#0022d2] transition-colors flex items-center gap-1 shrink-0">
            Lire l'article
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page Blog ────────────────────────────────────────────────────────────────
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const featuredArticle = ARTICLES.find((a) => a.featured && a.published);

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => a.published).filter((a) => {
      if (a.featured && activeCategory === "all" && search === "") return false;
      const matchCat =
        activeCategory === "all" || a.category === activeCategory;
      const matchSearch =
        search === "" ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        a.tag.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>L'Observatoire — NextoCasa</title>
        <meta
          name="description"
          content="L'Observatoire NextoCasa — analyses du marché parisien, conseils acheteurs et guides investisseurs par nos experts."
        />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0022d2]/82" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-xs tracking-[0.25em] uppercase font-medium">
                Analyses & expertises — Paris
              </p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-3">
              L'
              <em className="not-italic italic text-[#ffb800]">
                Observatoire
              </em>{" "}
              NextoCasa
            </h1>
            <p className="text-white/60 text-sm font-light max-w-lg">
              Analyses de marché, décryptages et conseils d'experts. Tout ce
              qu'il faut savoir pour décider avec clarté.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* ── Article à la une ──────────────────────────────────────────── */}
          {featuredArticle && activeCategory === "all" && search === "" && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                  À la une
                </p>
              </div>
              <FeaturedArticle article={featuredArticle} />
            </div>
          )}
          {/* ── Filtres + recherche ───────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrer par catégorie"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={[
                    "px-5 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300",
                    activeCategory === cat.key
                      ? "bg-[#0022d2] text-white shadow-md"
                      : "bg-white text-stone-500 border border-stone-200 hover:border-[#0022d2]/30 hover:text-[#0022d2]",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un article…"
                className="pl-9 pr-4 py-2.5 text-sm text-stone-700 bg-white border border-stone-200 rounded-xl outline-none focus:border-[#0022d2] transition font-light w-56"
              />
            </div>
          </div>
          {/* ── Grille ───────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-3xl font-light text-stone-300 mb-3">
                Aucun article
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="text-sm text-[#0022d2] hover:underline font-light"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-stone-400 font-light mb-6">
                {filtered.length} article{filtered.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
          {/* ── Bénéfices ────────────────────────────────────────────────── */}
          <div className="mt-20 rounded-3xl bg-[#0022d2] px-8 py-14 md:px-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#ffb800]/50" />
              <p className="text-[#ffb800]/70 text-xs tracking-[0.2em] uppercase font-light">
                Pourquoi ce blog
              </p>
              <div className="h-px w-6 bg-[#ffb800]/50" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white text-center mb-12">
              L'Observatoire au service de{" "}
              <em className="not-italic italic text-[#ffb800]">votre projet</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_BENEFITS.map((b) => (
                <div key={b.title} className="text-center">
                  <span className="text-3xl mb-4 block" aria-hidden="true">
                    {b.icon}
                  </span>
                  <h3 className="font-serif text-lg font-light text-[#ffb800] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          s
          {/* ── CTA contact ──────────────────────────────────────────────── */}
          <div className="mt-10 rounded-2xl bg-white border border-stone-100 shadow-sm px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light">
                  Votre projet
                </p>
              </div>
              <h2 className="font-serif text-2xl font-light text-stone-800 mb-1">
                Une question sur votre projet{" "}
                <em className="not-italic italic text-[#0022d2]">
                  immobilier ?
                </em>
              </h2>
              <p className="text-stone-400 text-sm font-light">
                Nos conseillers répondent sous 24h, sans engagement.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white font-semibold py-3.5 px-8 rounded-full text-sm transition-all hover:scale-105 shadow-md whitespace-nowrap"
            >
              Nous contacter
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
    </>
  );
}
