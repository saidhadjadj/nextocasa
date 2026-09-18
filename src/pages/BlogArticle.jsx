import { useMemo } from "react"
import { PortableText } from '@portabletext/react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useSanityArticle, useSanityArticles } from "../hooks/useSanityArticles"

// ── DÉTECTION ET GROUPEMENT DES TABLEAUX ────────────────────────────────────
function groupBlocks(blocks) {
  const result = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    const text = block?.children?.[0]?.text || ''

    // Bloc markdownTable (du script v3)
    if (block._type === 'markdownTable') {
      result.push({ type: 'table', rows: block.rows })
      i++
      continue
    }

    // Ligne d'en-tête de tableau inline (▸ col1 · col2 · col3)
    if (block._type === 'block' && text.startsWith('▸ ')) {
      const header = text.replace('▸ ', '').split(' · ')
      const rows = []
      i++
      while (i < blocks.length) {
        const next = blocks[i]
        const nextText = next?.children?.[0]?.text || ''
        if (next._type === 'block' && nextText.includes(' — ') && !nextText.startsWith('▸')) {
          rows.push(nextText.split(' — '))
          i++
        } else break
      }
      result.push({ type: 'table', header, rows })
      continue
    }

    result.push({ type: 'block', block })
    i++
  }
  return result
}

// ── COMPOSANT TABLEAU ────────────────────────────────────────────────────────
function TableBlock({ header, rows }) {
  return (
    <div className="overflow-x-auto -webkit-overflow-scrolling-touch my-8 rounded-xl border border-stone-200">
      <table className="w-full text-sm border-collapse">
        {header && header.length > 0 && (
          <thead>
            <tr>
              {header.map((h, j) => (
                <th key={j} className="bg-[#1A1814] text-[#F7F4EE] px-4 py-3 text-left font-medium text-xs tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, j) => (
            <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-[#F7F4EE]'}>
              {row.map((cell, k) => (
                <td key={k} className="px-4 py-3 border-b border-stone-100 text-stone-600 font-light align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── COMPOSANTS PORTABLE TEXT ─────────────────────────────────────────────────
const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-light text-stone-800 mt-10 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-medium text-stone-700 uppercase tracking-widest mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-stone-600 text-base font-light leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <div className="my-6 border-l-2 border-[#ffb800] pl-5 py-2 bg-[#ffb800]/5 rounded-r-xl">
        <p className="text-sm font-light text-stone-600 leading-relaxed italic">
          {children}
        </p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 pl-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 space-y-2 pl-5 list-decimal text-stone-600 font-light">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 text-stone-600 font-light text-base leading-relaxed">
        <span className="text-[#ffb800] mt-1 shrink-0">→</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-stone-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-stone-700">{children}</em>
    ),
    link: ({ value, children }) => (
        <a
      
        href={value?.href}
        className="text-[#0022d2] underline underline-offset-2 hover:text-[#001aad] transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={value?.asset?.url}
          alt={value?.alt || ''}
          className="w-full rounded-xl"
          loading="lazy"
        />
        {value?.caption && (
          <figcaption className="text-xs text-stone-400 text-center mt-2 font-light">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

// ── ARTICLE BODY ─────────────────────────────────────────────────────────────
function ArticleBody({ content }) {
  if (!content) return (
    <div className="py-10 text-center">
      <p className="font-serif text-xl font-light text-stone-300 italic">
        Contenu en cours de rédaction…
      </p>
    </div>
  )

  // Portable Text (tableau de blocs Sanity)
  if (Array.isArray(content)) {
    const grouped = groupBlocks(content)
    return (
      <div className="article-body">
        {grouped.map((item, idx) => {
          if (item.type === 'table') {
            return (
              <TableBlock
                key={idx}
                header={item.header || (item.rows?.[0] ? null : null)}
                rows={item.rows || []}
              />
            )
          }
          return (
            <PortableText
              key={idx}
              value={[item.block]}
              components={portableTextComponents}
            />
          )
        })}
      </div>
    )
  }

  // Fallback texte brut
  if (typeof content === 'string') {
    return (
      <div className="article-body">
        {content.split('\n').filter(l => l.trim()).map((line, i) => {
          if (line.startsWith('## '))
            return <h2 key={i} className="font-serif text-2xl font-light text-stone-800 mt-10 mb-4">{line.replace('## ', '')}</h2>
          if (line.startsWith('### '))
            return <h3 key={i} className="text-sm font-medium text-stone-700 uppercase tracking-widest mt-8 mb-3">{line.replace('### ', '')}</h3>
          return <p key={i} className="text-stone-600 text-base font-light leading-relaxed mb-5">{line}</p>
        })}
      </div>
    )
  }
  return null
}

// ── PAGE ARTICLE ─────────────────────────────────────────────────────────────
export default function BlogArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { article, loading } = useSanityArticle(slug)
  const { articles: allArticles } = useSanityArticles()

  const relatedArticles = useMemo(() => {
    if (!article || !allArticles.length) return []
    return allArticles.filter(
      (a) =>
        a.slug !== slug &&
        (a.category === article.category ||
          article.interlinks?.includes(a.slug)),
    ).slice(0, 3)
  }, [article, allArticles, slug])

  if (loading) return (
    <div className="bg-[#f7f5f1] min-h-[70vh] flex items-center justify-center">
      <p className="font-serif text-2xl font-light text-stone-300 animate-pulse">
        L'<em className="not-italic italic text-[#ffb800]">Observatoire</em>
      </p>
    </div>
  )

  if (!article) return (
    <div className="bg-[#f7f5f1] min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
      <p className="font-serif text-4xl font-light text-stone-300">Article introuvable</p>
      <Link to="/observatoire" className="text-sm text-[#0022d2] hover:underline font-light">
        Retour à L'Observatoire
      </Link>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{article.title} — L'Observatoire NextoCasa</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="bg-[#f7f5f1] min-h-screen">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          {article.image ? (
            <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover object-center" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0022d2] to-[#001aad]" />
          )}
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

        {/* ── FIL D'ARIANE ─────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-stone-400 font-light" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-[#0022d2] transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/observatoire" className="hover:text-[#0022d2] transition-colors">L'Observatoire</Link>
            <span>/</span>
            <span className="text-stone-600 truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>

        {/* ── CONTENU ───────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Auteur + méta */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-stone-200">
            <div className="w-12 h-12 rounded-full bg-[#0022d2]/10 flex items-center justify-center font-serif text-sm text-[#0022d2] shrink-0 border border-[#0022d2]/20">
              {article.authorInitials}
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800">{article.author}</p>
              <p className="text-xs text-stone-400 font-light italic">{article.authorRole}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-stone-400 font-light">
                {article.date ? new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </p>
              <p className="text-xs text-stone-400 font-light">{article.readTime}</p>
            </div>
          </div>

          {/* Chapeau */}
          <p className="font-serif text-xl font-light text-stone-700 leading-relaxed mb-10 italic border-l-2 border-[#ffb800] pl-6">
            {article.excerpt}
          </p>

          {/* Corps de l'article */}
          <ArticleBody content={article.body} />

          {/* Interlinks */}
          {article.interlinks && article.interlinks.length > 0 && (
            <div className="mt-10 p-6 rounded-2xl bg-white border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-5 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.15em] uppercase text-stone-400 font-light">Pour aller plus loin</p>
              </div>
              <div className="space-y-2">
                {article.interlinks.map((iSlug) => {
                  const linked = allArticles.find((a) => a.slug === iSlug)
                  if (!linked) return null
                  return (
                    <Link
                      key={iSlug}
                      to={`/observatoire/${iSlug}`}
                      className="group flex items-center gap-3 text-sm text-stone-600 hover:text-[#0022d2] transition-colors font-light"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {linked.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-600 text-sm font-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <Link to="/observatoire" className="text-sm text-[#0022d2] hover:underline font-light flex items-center gap-1">
              Tous les articles
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── ARTICLES LIÉS ─────────────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="border-t border-stone-200 pt-14">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-[#ffb800]" />
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">Sur le même sujet</p>
              </div>
              <h2 className="font-serif text-2xl font-light text-stone-800 mb-8">
                Articles <em className="not-italic italic text-[#0022d2]">liés</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <Link
                    key={a._id}
                    to={`/observatoire/${a.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-36 overflow-hidden bg-stone-100">
                      {a.image ? (
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0022d2]/10 to-[#0022d2]/20" />
                      )}
                      <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-stone-600 backdrop-blur-sm">
                        {a.tag}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-serif text-sm font-light text-stone-800 mb-2 leading-snug group-hover:text-[#0022d2] transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-light mt-auto">{a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  )
}