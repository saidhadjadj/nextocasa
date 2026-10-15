import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CATEGORIES } from "../data/blogContent";
import { useSanityArticles } from "../hooks/useSanityArticles";

function SignatureImage() {
  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&fm=webp&auto=format"
        alt="Paris — L'Observatoire NextoCasa"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0022d2]/75" />
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-6 bg-[#ffb800]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#ffb800]/80 font-medium">
              L'Observatoire
            </span>
          </div>
          <p className="font-serif text-2xl font-light text-white leading-snug">NextoCasa</p>
          <p className="text-white/50 text-xs font-light mt-1">Paris & Île-de-France</p>
        </div>
      </div>
    </div>
  );
}

function ArticleSemaine({ article }) {
  const cat = CATEGORIES.find(c => c.key === article.category);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden shadow-lg border border-stone-100">
      <div className="md:col-span-1"><SignatureImage /></div>
      <div className="md:col-span-2 bg-white p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-5 bg-[#ffb800]" />
            <span className="text-xs font-medium text-stone-500 tracking-wide">{cat?.icon} {article.tag}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-800 leading-snug mb-4">{article.title}</h2>
          <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
        </div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 text-xs text-stone-400 font-light">
            <span>⏱ {article.readTime}</span>
            <span>📅 {article.date ? new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
          </div>
          <Link
            to={`/observatoire/${article.slug}`}
            className="inline-flex items-center gap-2 bg-[#0022d2] hover:bg-[#001aad] text-white text-sm font-medium py-3 px-6 rounded-full transition-all hover:scale-105 whitespace-nowrap"
          >
            Lire l'article →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Newsletter({ articleTitle }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if (email) setSent(true); };
  return (
    <div className="bg-[#1A1814] rounded-2xl px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5 bg-[#ffb800]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#ffb800]/70 font-medium">Newsletter hebdomadaire</span>
          </div>
          <h3 className="font-serif text-xl font-light text-white mb-2">
            Chaque mercredi, <em className="not-italic italic text-[#ffb800]">l'analyse</em> dans votre boîte.
          </h3>
          {articleTitle && (
            <p className="text-white/40 text-xs font-light mt-2">
            la semaine prochaine : <span className="text-white/60 italic">"{articleTitle}"</span>
            </p>
          )}
        </div>
        <div className="w-full md:w-auto md:min-w-[320px]">
          {sent ? (
            <div className="bg-white/5 rounded-xl px-5 py-4 text-center">
              <p className="text-[#ffb800] text-sm font-light">✓ Inscription confirmée — à mercredi prochain.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email" required
                style={{ background: "rgba(255,255,255,0.05)" }}
                className="flex-1 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-yellow-400/50 transition font-light"
              />
              <button type="submit" className="bg-[#ffb800] hover:bg-[#ffc929] text-[#1A1814] font-semibold text-sm py-2.5 px-5 rounded-full transition whitespace-nowrap">
                S'abonner
              </button>
            </form>
          )}
          <p className="text-white/50 text-[10px] font-light mt-2 text-center">Pas de publicité. Désabonnement en un clic.</p>
        </div>
      </div>
    </div>
  );
}

function Archives({ articles, currentSlug }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() =>
    articles
      .filter((a) => a.slug !== currentSlug)
      .filter((a) => activeFilter === "all" || a.category === activeFilter),
    [articles, currentSlug, activeFilter]
  );

  const displayed = expanded ? filtered : filtered.slice(0, 8);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(0,34,210,0.06)" }}>📁</div>
        <h3 className="font-serif text-lg font-light text-stone-800">
          Tous les <em className="not-italic italic text-[#0022d2]">articles</em>
        </h3>
        <span className="text-xs text-stone-400 font-light bg-stone-50 px-2 py-0.5 rounded-full ml-auto">
          {filtered.length} article{filtered.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="px-6 py-3 border-b border-stone-50 flex gap-2 overflow-x-auto">
        <button onClick={() => { setActiveFilter("all"); setExpanded(false); }}
          className={`px-3 py-1.5 rounded-full text-xs font-light whitespace-nowrap transition-all ${activeFilter === "all" ? "bg-[#0022d2] text-white" : "bg-stone-50 text-stone-500 hover:bg-stone-100"}`}>
          Tous
        </button>
        {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
          <button key={cat.key} onClick={() => { setActiveFilter(cat.key); setExpanded(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-light whitespace-nowrap transition-all ${activeFilter === cat.key ? "bg-[#0022d2] text-white" : "bg-stone-50 text-stone-500 hover:bg-stone-100"}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      <div className="divide-y divide-stone-50">
        {displayed.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-stone-300 font-light text-sm">Aucun article dans cette catégorie.</p>
          </div>
        ) : displayed.map((article) => {
          const cat = CATEGORIES.find((c) => c.key === article.category);
          return (
            <Link key={article._id} to={`/observatoire/${article.slug}`}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-stone-50 transition group">
              <span className="text-base flex-shrink-0 w-7 text-center">{cat?.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-light text-stone-700 group-hover:text-[#0022d2] transition line-clamp-1">{article.title}</p>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  {article.date ? new Date(article.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : ""} · {article.readTime}
                </p>
              </div>
              <svg className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#0022d2] transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>
      {filtered.length > 8 && (
        <div className="px-6 py-4 border-t border-stone-50 text-center">
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-[#0022d2] hover:underline font-light">
            {expanded ? "Réduire ↑" : `Voir les ${filtered.length - 8} autres articles ↓`}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Blog() {
  const { articles, loading } = useSanityArticles();

  const articleSemaine = useMemo(() => {
    if (!articles.length) return null;
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  if (loading) return (
    <div className="bg-[#f7f5f1] min-h-screen flex items-center justify-center">
      <p className="font-serif text-2xl font-light text-stone-300 animate-pulse">
        L'<em className="not-italic italic text-[#ffb800]">Observatoire</em>
      </p>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>L'Observatoire — NextoCasa</title>
        <meta name="description" content="L'Observatoire NextoCasa — analyses du marché parisien, conseils acheteurs et guides investisseurs. Chaque mercredi, une analyse." />
      </Helmet>
      <div className="bg-[#f7f5f1] min-h-screen">
        <div className="bg-[#0022d2] px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#ffb800]" />
              <p className="text-[#ffb800] text-[10px] tracking-[0.25em] uppercase font-medium">Analyses & expertises — Paris</p>
              <div className="h-px w-8 bg-[#ffb800]" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">
              L'<em className="not-italic italic text-[#ffb800]">Observatoire</em> NextoCasa
            </h1>
            <p className="text-white/50 text-sm font-light">Décrypter le marché. Orienter vos décisions.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {articleSemaine && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-5 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light">Article de la semaine</p>
              </div>
              <ArticleSemaine article={articleSemaine} />
            </section>
          )}
          <Newsletter articleTitle={articleSemaine?.title} />
          <Archives articles={articles} currentSlug={articleSemaine?.slug} />
        </div>
      </div>
    </>
  );
}
