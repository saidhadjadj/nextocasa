import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ARTICLES } from "../data/blogContent";

// ─── Rendu markdown simplifié ─────────────────────────────────────────────────
function ArticleBody({ content }) {
  const paragraphs = content.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="prose-nextocasa">
      {paragraphs.map((line, i) => {
        // Titre H2
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-serif text-2xl font-light text-stone-800 mt-10 mb-4 leading-snug"
            >
              {line.replace("## ", "")}
            </h2>
          );
        }
        // Encadré chiffre clé
        if (line.startsWith("> **Chiffre clé**") || line.startsWith("> **")) {
          return (
            <div
              key={i}
              className="my-6 border-l-2 border-[#ffb800] pl-5 py-2 bg-[#ffb800]/5 rounded-r-xl"
            >
              <p
                className="text-sm font-light text-stone-600 leading-relaxed italic"
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/^> /, "")
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="font-semibold text-stone-800">$1</strong>',
                    ),
                }}
              />
            </div>
          );
        }
        // Gras inline
        if (line.includes("**")) {
          return (
            <p
              key={i}
              className="text-stone-600 text-base font-light leading-relaxed mb-4"
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-semibold text-stone-800">$1</strong>',
                ),
              }}
            />
          );
        }
        // Interlinks (ligne "Pour aller plus loin")
        if (line.startsWith("Pour aller plus loin")) {
          return null; // géré séparément
        }
        // Paragraphe standard
        return (
          <p
            key={i}
            className="text-stone-600 text-base font-light leading-relaxed mb-4"
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── Page article ─────────────────────────────────────────────────────────────
export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find((a) => a.slug === slug);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return ARTICLES.filter(
      (a) =>
        a.slug !== slug &&
        (a.category === article.category ||
          article.interlinks?.includes(a.slug)),
    ).slice(0, 3);
  }, [article, slug]);

  if (!article) {
    return (
      <div className="bg-[#f7f5f1] min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <p className="font-serif text-4xl font-light text-stone-300">
          Article introuvable
        </p>
        <Link
          to="/observatoire"
          className="text-sm text-[#0022d2] hover:underline font-light"
        >
          Retour à L'Observatoire
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} — L'Observatoire NextoCasa</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">
        {/* ── Hero article ─────────────────────────────────────────────────── */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative h-full flex flex-col justify-end px-6 pb-10 md:px-16 md:pb-14">
            <div className="max-w-3xl mx-auto w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#ffb800]" />
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-white/80 backdrop-blur-sm">
                  {article.tag}
                </span>
                {article.type === "pilier" && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb800] text-[#0022d2]">
                    Article pilier
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-light text-white leading-snug">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Fil d'Ariane ─────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <nav
            className="flex items-center gap-2 text-xs text-stone-400 font-light"
            aria-label="Fil d'Ariane"
          >
            <Link to="/" className="hover:text-[#0022d2] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              to="/observatoire"
              className="hover:text-[#0022d2] transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-stone-600 truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>

        {/* ── Contenu principal ────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Meta auteur */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-stone-200">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-serif text-sm text-stone-500 shrink-0">
              {article.authorInitials}
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800">
                {article.author}
              </p>
              <p className="text-xs text-stone-400 font-light">
                {article.authorRole}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-stone-400 font-light">
                {article.date}
              </p>
              <p className="text-xs text-stone-400 font-light">
                {article.readTime} · {article.wordCount} mots
              </p>
            </div>
          </div>

          {/* Chapeau */}
          <p className="font-serif text-xl font-light text-stone-700 leading-relaxed mb-8 italic border-l-2 border-[#ffb800] pl-6">
            {article.excerpt}
          </p>

          {/* Corps de l'article */}
          <ArticleBody content={article.body} />

          {/* Interlinks */}
          {article.interlinks && article.interlinks.length > 0 && (
            <div className="mt-10 p-6 rounded-2xl bg-white border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-5 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.15em] uppercase text-stone-400 font-light">
                  Pour aller plus loin
                </p>
              </div>
              <div className="space-y-2">
                {article.interlinks.map((iSlug) => {
                  const linked = ARTICLES.find((a) => a.slug === iSlug);
                  if (!linked) return null;
                  return (
                    <Link
                      key={iSlug}
                      to={`/blog/${iSlug}`}
                      className="group flex items-center gap-3 text-sm text-stone-600 hover:text-[#0022d2] transition-colors font-light"
                    >
                      <svg
                        className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1"
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
                      {linked.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA contact */}
          <div className="mt-10 rounded-2xl bg-[#0022d2] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-5 bg-[#ffb800]/60" />
                <p className="text-[#ffb800]/70 text-xs tracking-[0.18em] uppercase font-light">
                  Votre projet
                </p>
              </div>
              <p className="font-serif text-xl font-light text-white italic">
                "Une question sur cet article ou votre projet immobilier ?"
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[#ffb800] hover:bg-[#ffc929] text-[#0022d2] font-semibold py-3 px-7 rounded-full text-sm transition-all hover:scale-105 whitespace-nowrap"
            >
              Nous contacter
            </Link>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-600 text-sm font-light transition-colors"
            >
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
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Article précédent
            </button>
            <Link
              to="/blog"
              className="text-sm text-[#0022d2] hover:underline font-light flex items-center gap-1"
            >
              Tous les articles
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
        </div>

        {/* ── Articles liés ────────────────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="border-t border-stone-200 pt-14">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">
                  Sur le même sujet
                </p>
              </div>
              <h2 className="font-serif text-2xl font-light text-stone-800 mb-8">
                Articles{" "}
                <em className="not-italic italic text-[#0022d2]">liés</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.id}
                    to={`/blog/${a.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-36 overflow-hidden bg-stone-100">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-stone-600 backdrop-blur-sm">
                        {a.tag}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-serif text-sm font-light text-stone-800 mb-2 leading-snug group-hover:text-[#0022d2] transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-light mt-auto">
                        {a.date} · {a.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
