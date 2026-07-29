# Guide d'intégration Sanity.io + React
## Blog Immobilier Paris Premium — PRESTIGE IMMO

> Ce guide couvre l'intégration complète de Sanity.io comme CMS headless
> avec le projet React/Vite/Tailwind existant.
> Temps estimé : 3 à 5 heures selon le niveau de familiarité avec les outils.

---

## 1. Vue d'ensemble de l'architecture

```
┌─────────────────────┐     GROQ API      ┌─────────────────────┐
│   Sanity Studio     │ ─────────────────▶ │   React / Vite      │
│   (CMS headless)    │                    │   (Front-end)       │
│                     │ ◀───────────────── │                     │
│  Articles · Auteurs │   Mutations        │  BlogList · BlogPost│
│  Catégories · Tags  │                    │  BlogTemplate.jsx   │
└─────────────────────┘                    └─────────────────────┘
         │                                          │
         ▼                                          ▼
  sanity.io/manage                           Vercel (deploy)
  (dashboard cloud)                          vercel.com
```

**Principe :** Sanity stocke le contenu (articles, catégories, auteurs). React consomme ce contenu via l'API GROQ de Sanity. Vercel déploie le tout en production.

---

## 2. Installation et configuration de Sanity

### 2.1 Créer le projet Sanity

```bash
# Dans le terminal, à la racine de votre projet React
npm create sanity@latest -- --project blog-immo-paris --dataset production --template clean

# Répondre aux questions :
# ✓ Project name : blog-immo-paris
# ✓ Use TypeScript : No (sauf si vous êtes à l'aise)
# ✓ Package manager : npm
```

Cela crée un dossier `studio/` à la racine de votre projet.

### 2.2 Installer le client Sanity dans React

```bash
# À la racine du projet React (pas dans studio/)
npm install @sanity/client @sanity/image-url
```

### 2.3 Créer le fichier de configuration du client

Créer `src/lib/sanityClient.js` :

```javascript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'VOTRE_PROJECT_ID',  // Disponible sur sanity.io/manage
  dataset: 'production',
  apiVersion: '2025-01-01',       // Date du jour au format YYYY-MM-DD
  useCdn: true,                   // true en production, false en développement
})
```

> ⚠️ **Sécurité**
> Ne jamais exposer le token API Sanity dans le code client. Pour les opérations
> d'écriture (mutations), utiliser uniquement côté serveur ou via des variables
> d'environnement Vercel.

### 2.4 Variables d'environnement

Créer `.env.local` à la racine du projet React :

```env
VITE_SANITY_PROJECT_ID=votre_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```

Mettre à jour `src/lib/sanityClient.js` :

```javascript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
})
```

---

## 3. Schéma des articles — structure Sanity

Créer `studio/schemas/article.js` :

```javascript
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // ── IDENTITÉ ────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Titre H1',
      type: 'string',
      validation: Rule => Rule.required().max(65),
      description: '55 à 65 caractères — mot-clé + géo + année'
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Ex : marche-immobilier-paris-2025'
    },
    {
      name: 'excerpt',
      title: 'Méta-description / Résumé',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160),
      description: '150 à 160 caractères'
    },

    // ── CLASSIFICATION ───────────────────────────────────────────
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Marché & tendances', value: 'marche-tendances' },
          { title: 'Achat premium', value: 'achat-premium' },
          { title: 'Investissement', value: 'investissement' },
          { title: 'Financement', value: 'financement' },
          { title: 'Juridique & fiscal', value: 'juridique-fiscal' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'target',
      title: 'Cible',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Acheteur', value: 'Acheteur' },
          { title: 'Investisseur', value: 'Investisseur' },
        ]
      },
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'articleRef',
      title: 'Référence (A·01, S·03…)',
      type: 'string',
      description: 'Code de référence interne — ex : A01, S03'
    },
    {
      name: 'featured',
      title: 'Article mis en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Affiche cet article en format large sur la liste du blog'
    },

    // ── CONTENU ──────────────────────────────────────────────────
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif (alt)',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Descriptif SEO — contient le mot-clé principal'
        }
      ]
    },
    {
      name: 'body',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [
        { type: 'block' },           // Texte riche (titres, paragraphes, listes)
        { type: 'image' },           // Images dans le corps
        {
          type: 'object',
          name: 'callout',
          title: 'Encadré de données',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'content', title: 'Contenu', type: 'text' },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Chiffre clé', value: 'chiffre' },
                  { title: 'À retenir', value: 'retenir' },
                  { title: 'Attention', value: 'alerte' },
                  { title: 'Repère historique', value: 'historique' },
                ]
              }
            }
          ],
          preview: {
            select: { title: 'label', subtitle: 'content' }
          }
        }
      ]
    },

    // ── SEO & PUBLICATION ────────────────────────────────────────
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      description: 'Calculé automatiquement ou renseigné manuellement'
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Planifié', value: 'PLANIFIE' },
          { title: 'En cours', value: 'EN_COURS' },
          { title: 'À relire', value: 'A_RELIRE' },
          { title: 'Publié', value: 'PUBLIE' },
        ],
        layout: 'radio'
      },
      initialValue: 'EN_COURS'
    },

    // ── INTERLINKS ───────────────────────────────────────────────
    {
      name: 'relatedArticles',
      title: 'Articles liés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      validation: Rule => Rule.max(3),
      description: '2 à 3 articles maximum'
    },
  ],

  // Aperçu dans le Studio Sanity
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage'
    }
  }
}
```

### 3.1 Enregistrer le schéma dans Sanity

Mettre à jour `studio/schemaTypes/index.js` :

```javascript
import article from './article'

export const schemaTypes = [article]
```

---

## 4. Importer les articles Markdown dans Sanity

### 4.1 Créer le script d'import

Créer `scripts/importArticles.js` à la racine du projet :

```javascript
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'VOTRE_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: 'VOTRE_TOKEN_ECRITURE', // Généré sur sanity.io/manage → API → Tokens
  useCdn: false,
})

// Mapper les slugs des articles existants
const articles = [
  {
    _type: 'article',
    articleRef: 'A01',
    title: 'Marché immobilier à Paris en 2025 : état des lieux et perspectives',
    slug: { _type: 'slug', current: 'marche-immobilier-paris-2025' },
    category: 'marche-tendances',
    target: ['Acheteur', 'Investisseur'],
    featured: true,
    status: 'EN_COURS',
    publishedAt: new Date().toISOString(),
    readTime: 9,
    excerpt: 'Entre correction des prix et premiers signaux de stabilisation, le marché parisien en 2025 offre des opportunités réelles pour l\'acheteur préparé.',
  },
  {
    _type: 'article',
    articleRef: 'A02',
    title: 'Acheter un bien de prestige à Paris : les 7 étapes clés',
    slug: { _type: 'slug', current: 'acheter-bien-prestige-paris-etapes' },
    category: 'achat-premium',
    target: ['Acheteur'],
    featured: false,
    status: 'EN_COURS',
    publishedAt: new Date().toISOString(),
    readTime: 11,
    excerpt: 'De la définition du projet à la remise des clés — le guide complet d\'un achat haut de gamme à Paris.',
  },
  // Ajouter les 30 articles restants selon le même modèle...
  // Voir le document de continuité pour la liste complète
]

async function importArticles() {
  console.log(`Import de ${articles.length} articles...`)
  for (const article of articles) {
    try {
      const result = await client.create(article)
      console.log(`✓ ${article.articleRef} — ${result._id}`)
    } catch (err) {
      console.error(`✗ ${article.articleRef} — ${err.message}`)
    }
  }
  console.log('Import terminé.')
}

importArticles()
```

```bash
# Exécuter l'import
node scripts/importArticles.js
```

> **Note :** Le contenu long (corps de l'article) peut être ajouté directement
> dans le Studio Sanity en copiant-collant le Markdown depuis les fichiers exportés.
> Le script ci-dessus importe les métadonnées — le corps est à compléter dans l'interface.

---

## 5. Requêtes GROQ — récupérer les articles

Créer `src/lib/queries.js` :

```javascript
// ── LISTE DES ARTICLES ────────────────────────────────────────────
export const ARTICLES_QUERY = `
  *[_type == "article" && status == "PUBLIE"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    target,
    featured,
    articleRef,
    readTime,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
  }
`

// ── UN ARTICLE PAR SLUG ───────────────────────────────────────────
export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    target,
    articleRef,
    readTime,
    publishedAt,
    body,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "relatedArticles": relatedArticles[]-> {
      title,
      "slug": slug.current,
      excerpt,
      category,
      readTime,
    }
  }
`

// ── ARTICLES PAR CATÉGORIE ────────────────────────────────────────
export const ARTICLES_BY_CATEGORY_QUERY = `
  *[_type == "article" && status == "PUBLIE" && category == $category]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    target,
    readTime,
    publishedAt,
  }
`

// ── ARTICLE MIS EN AVANT ──────────────────────────────────────────
export const FEATURED_ARTICLE_QUERY = `
  *[_type == "article" && status == "PUBLIE" && featured == true][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    target,
    readTime,
    publishedAt,
    "mainImage": mainImage.asset->url,
  }
`

// ── RECHERCHE PAR MOT-CLÉ ─────────────────────────────────────────
export const SEARCH_QUERY = `
  *[_type == "article" && status == "PUBLIE"
    && (title match $searchTerm || excerpt match $searchTerm)]
  | order(publishedAt desc) [0...10] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
  }
`
```

---

## 6. Intégration dans BlogTemplate.jsx

Mettre à jour `src/pages/BlogTemplate.jsx` pour consommer les données Sanity :

```javascript
import { useState, useEffect } from "react"
import { client } from "../lib/sanityClient"
import { ARTICLES_QUERY, ARTICLE_BY_SLUG_QUERY } from "../lib/queries"

// ── HOOKS PERSONNALISÉS ───────────────────────────────────────────

// Récupère tous les articles publiés
function useArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.fetch(ARTICLES_QUERY)
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { articles, loading, error }
}

// Récupère un article par son slug
function useArticle(slug) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      .then(data => {
        setArticle(data)
        setLoading(false)
      })
  }, [slug])

  return { article, loading }
}

// ── COMPOSANT PRINCIPAL ───────────────────────────────────────────
export default function BlogTemplate() {
  const [view, setView] = useState("list")
  const [selectedSlug, setSelectedSlug] = useState(null)

  return (
    <div className="blog-root">
      <Header onNav={setView} />
      {view === "list" && (
        <BlogList
          onSelect={(slug) => {
            setSelectedSlug(slug)
            setView("article")
          }}
        />
      )}
      {view === "article" && selectedSlug && (
        <ArticleView
          slug={selectedSlug}
          onBack={() => {
            setSelectedSlug(null)
            setView("list")
          }}
        />
      )}
      <Footer />
    </div>
  )
}

// ── BLOG LIST ─────────────────────────────────────────────────────
function BlogList({ onSelect }) {
  const { articles, loading, error } = useArticles()
  const [activeFilter, setActiveFilter] = useState("Tous")

  if (loading) return <div className="loading">Chargement des articles...</div>
  if (error) return <div className="error">Erreur de chargement.</div>

  const filtered = articles.filter(a => {
    if (activeFilter === "Tous") return true
    if (a.target?.includes(activeFilter)) return true
    return false
  })

  const featured = filtered.find(a => a.featured)
  const rest = filtered.filter(a => !a.featured)

  return (
    <>
      <Hero articlesCount={articles.length} />
      <Filters active={activeFilter} onChange={setActiveFilter} />
      <div className="blog-grid">
        {featured && (
          <BlogCard
            article={featured}
            featured
            onClick={() => onSelect(featured.slug)}
          />
        )}
        {rest.map(article => (
          <BlogCard
            key={article._id}
            article={article}
            onClick={() => onSelect(article.slug)}
          />
        ))}
      </div>
    </>
  )
}

// ── ARTICLE VIEW ──────────────────────────────────────────────────
function ArticleView({ slug, onBack }) {
  const { article, loading } = useArticle(slug)

  if (loading) return <div className="loading">Chargement de l'article...</div>
  if (!article) return <div className="error">Article introuvable.</div>

  return (
    <div className="article-view">
      <button className="article-back" onClick={onBack}>← Retour</button>
      <div className="article-category">{article.category}</div>
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta-bar">
        <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
        <span>⏱ {article.readTime} min</span>
      </div>
      {/* Rendu du contenu Portable Text */}
      <PortableTextRenderer value={article.body} />
      {/* Articles liés */}
      {article.relatedArticles?.length > 0 && (
        <RelatedArticles articles={article.relatedArticles} />
      )}
    </div>
  )
}
```

---

## 7. Rendu du Portable Text (contenu riche)

Installer le renderer Sanity :

```bash
npm install @portabletext/react
```

Créer `src/components/PortableTextRenderer.jsx` :

```javascript
import { PortableText } from '@portabletext/react'

const components = {
  types: {
    // Rendu des encadrés de données personnalisés
    callout: ({ value }) => {
      const colors = {
        chiffre: { bg: '#E6F1FB', border: '#185FA5', label: '#0C447C' },
        retenir: { bg: '#E1F5EE', border: '#0F6E56', label: '#085041' },
        alerte: { bg: '#FAECE7', border: '#E24B4A', label: '#712B13' },
        historique: { bg: '#EEEDFE', border: '#534AB7', label: '#3C3489' },
      }
      const style = colors[value.type] || colors.chiffre

      return (
        <div style={{
          background: style.bg,
          borderLeft: `3px solid ${style.border}`,
          borderRadius: '0 8px 8px 0',
          padding: '12px 16px',
          margin: '24px 0'
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: style.label,
            marginBottom: '6px'
          }}>
            {value.label}
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            {value.content}
          </p>
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 400, margin: '48px 0 20px', lineHeight: 1.3 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '14px', fontWeight: 500, margin: '32px 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#4A4540', marginBottom: '20px' }}>
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 500, color: '#1A1814' }}>{children}</strong>,
    link: ({ value, children }) => (
      <a href={value.href} style={{ color: '#185FA5', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ value }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
```

---

## 8. Déploiement sur Vercel

### 8.1 Variables d'environnement Vercel

Dans le dashboard Vercel → Settings → Environment Variables :

```
VITE_SANITY_PROJECT_ID    =  votre_project_id
VITE_SANITY_DATASET       =  production
VITE_SANITY_API_VERSION   =  2025-01-01
```

### 8.2 Configuration CORS Sanity

Sur sanity.io/manage → API → CORS Origins → Ajouter :

```
https://votre-domaine.vercel.app
http://localhost:5173   (développement)
```

### 8.3 Déployer le Studio Sanity

```bash
# Dans le dossier studio/
cd studio
npx sanity deploy

# Choisir un nom de studio : prestige-immo-studio
# Accessible sur : https://prestige-immo-studio.sanity.studio
```

---

## 9. Checklist de mise en service

### Phase 1 — Configuration (1h)
- [ ] Créer le projet Sanity sur sanity.io/manage
- [ ] Copier le Project ID dans `.env.local`
- [ ] Installer les dépendances npm
- [ ] Tester la connexion : `client.fetch('*[_type == "article"]')` dans la console

### Phase 2 — Schéma (30 min)
- [ ] Copier le fichier `studio/schemas/article.js` ci-dessus
- [ ] Enregistrer dans `studio/schemaTypes/index.js`
- [ ] Lancer le Studio : `cd studio && npm run dev`
- [ ] Vérifier que le type "Article" apparaît dans le Studio

### Phase 3 — Import des articles (2h)
- [ ] Créer le token d'écriture sur sanity.io/manage
- [ ] Exécuter le script d'import pour les métadonnées
- [ ] Copier-coller le contenu des 32 fichiers Markdown dans le Studio
- [ ] Vérifier que chaque article est bien créé avec statut EN_COURS

### Phase 4 — Intégration React (1h)
- [ ] Mettre à jour `src/lib/sanityClient.js` avec le Project ID
- [ ] Copier `src/lib/queries.js`
- [ ] Mettre à jour `BlogTemplate.jsx` avec les hooks Sanity
- [ ] Installer `@portabletext/react`
- [ ] Copier `PortableTextRenderer.jsx`
- [ ] Tester en local : `npm run dev`

### Phase 5 — Déploiement (30 min)
- [ ] Configurer les variables d'environnement sur Vercel
- [ ] Configurer CORS sur Sanity
- [ ] Déployer le Studio Sanity
- [ ] Tester la production

---

## 10. Structure finale des fichiers

```
blog-immo-paris/
├── studio/                          ← Sanity Studio (CMS)
│   └── schemas/
│       └── article.js               ← Schéma des articles
├── src/
│   ├── lib/
│   │   ├── sanityClient.js          ← Client Sanity configuré
│   │   └── queries.js               ← Requêtes GROQ
│   ├── components/
│   │   └── PortableTextRenderer.jsx ← Rendu du contenu riche
│   └── pages/
│       └── BlogTemplate.jsx         ← Template mis à jour
├── scripts/
│   └── importArticles.js            ← Script d'import des articles
├── .env.local                       ← Variables d'environnement (non commité)
└── .gitignore                       ← Ajouter .env.local
```

---

## 11. Ressources utiles

| Ressource | URL |
|---|---|
| Sanity.io — Documentation | sanity.io/docs |
| GROQ Cheat Sheet | sanity.io/docs/groq |
| Portable Text React | portabletext.org |
| Sanity Studio v3 | sanity.io/docs/sanity-studio |
| Variables Vercel | vercel.com/docs/environment-variables |

---

*Document créé : session d'intégration technique*
*À placer dans le dépôt GitHub : /docs/integration-sanity.md*
*Dernière mise à jour : à compléter après intégration*