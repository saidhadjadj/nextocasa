# Guide SEO Technique — Blog Immobilier Paris Premium
## Sitemap · robots.txt · Open Graph · Schema.org · Search Console

> Ce guide couvre l'ensemble des éléments SEO techniques à mettre en place
> avant le lancement du blog pour maximiser l'indexation et le référencement.
> Temps estimé : 2 à 3 heures.

---

## 1. Vue d'ensemble des priorités SEO techniques

| Priorité | Élément | Impact SEO | Temps |
|---|---|---|---|
| ★★★ | Sitemap XML dynamique | Indexation rapide des 32 articles | 45 min |
| ★★★ | Balises Open Graph | Partage social LinkedIn/Twitter | 30 min |
| ★★★ | Schema.org Article | Rich snippets Google | 45 min |
| ★★☆ | robots.txt | Contrôle de l'exploration | 10 min |
| ★★☆ | Google Search Console | Suivi indexation | 20 min |
| ★★☆ | Canonical URLs | Éviter le contenu dupliqué | 15 min |
| ★☆☆ | Core Web Vitals | Performance · score Lighthouse | 30 min |

---

## 2. Sitemap XML dynamique

Le sitemap indique à Google toutes les URLs du blog à indexer — avec leur priorité et leur fréquence de mise à jour.

### 2.1 Installer les dépendances

```bash
npm install vite-plugin-sitemap
```

### 2.2 Configuration dans vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// Liste des slugs de tous les articles
// À mettre à jour à chaque nouvel article publié
const articleSlugs = [
  // Articles piliers
  'marche-immobilier-paris-2025',
  'acheter-bien-prestige-paris-etapes',
  'investissement-locatif-paris-rentabilite',
  'apport-achat-arrondissements-paris',
  'sci-vs-nom-propre-paris',
  'quartiers-paris-investir-2025',
  // Articles calendrier S01 à S26
  'negocier-prix-appartement-paris',
  'fiscalite-revenus-locatifs-paris',
  'credit-immobilier-haut-de-gamme-dossier',
  'colocation-haut-de-gamme-paris-investissement',
  'acheter-haussmannien-paris-vigilance',
  'transmission-patrimoine-immobilier-paris',
  '8e-arrondissement-paris-marche-2025',
  'lmnp-paris-2025-rentable-reformes',
  'frais-caches-achat-immobilier-paris',
  'investir-immeuble-rapport-paris',
  '16e-arrondissement-paris-marche-2025',
  'assurance-emprunteur-bien-prestige-paris',
  '17e-arrondissement-paris-marche-2025',
  'bilan-marche-immobilier-paris-s1-2025',
  'negocier-agent-immobilier-paris',
  '9e-arrondissement-paris-investir-2025',
  '11e-arrondissement-paris-marche-2025',
  'deficit-foncier-reduire-impots-paris',
  '6e-7e-arrondissement-paris-marche-2025',
  'pret-relais-paris-fonctionnement-risques',
  '18e-arrondissement-paris-marche-2025',
  'bilan-marche-immobilier-paris-s2-2025',
  'acheter-neuf-ou-ancien-paris',
  '11e-arrondissement-paris-investissement-locatif',
  'gestion-locative-paris-seul-ou-deleguer',
  'previsions-marche-immobilier-paris-2026',
  // Pages statiques
  'glossaire-immobilier-paris',
]

const dynamicRoutes = [
  '/',
  '/blog',
  '/contact',
  '/estimation',
  '/guides/pdf-immeuble-rapport-paris',
  ...articleSlugs.map(slug => `/blog/${slug}`),
]

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.prestige-immo.fr',
      dynamicRoutes,
      // Priorités par type de page
      changefreq: 'monthly',
      priority: 0.8,
      // Dernière modification
      lastmod: new Date().toISOString().split('T')[0],
    }),
  ],
})
```

### 2.3 Sitemap manuel (alternative sans plugin)

Créer `public/sitemap.xml` — à mettre à jour à chaque publication :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Pages principales -->
  <url>
    <loc>https://www.prestige-immo.fr/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Articles piliers -->
  <url>
    <loc>https://www.prestige-immo.fr/blog/marche-immobilier-paris-2025</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog/acheter-bien-prestige-paris-etapes</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog/investissement-locatif-paris-rentabilite</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog/apport-achat-arrondissements-paris</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog/sci-vs-nom-propre-paris</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.prestige-immo.fr/blog/quartiers-paris-investir-2025</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Articles calendrier — ajouter au fur et à mesure des publications -->
  <!-- Format : <loc>URL</loc><lastmod>DATE</lastmod><changefreq>monthly</changefreq><priority>0.8</priority> -->

  <!-- Glossaire -->
  <url>
    <loc>https://www.prestige-immo.fr/blog/glossaire-immobilier-paris</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

---

## 3. robots.txt

Créer `public/robots.txt` :

```
User-agent: *
Allow: /

# Bloquer les pages techniques
Disallow: /api/
Disallow: /_vercel/
Disallow: /studio/

# Sitemap
Sitemap: https://www.prestige-immo.fr/sitemap.xml

# Délai entre les requêtes (optionnel)
Crawl-delay: 1
```

---

## 4. Balises Open Graph — composant Head

### 4.1 Installer react-helmet-async

```bash
npm install react-helmet-async
```

### 4.2 Wrapper dans main.jsx

```jsx
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
```

### 4.3 Composant SEOHead réutilisable

Créer `src/components/SEOHead.jsx` :

```jsx
import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Prestige Immo'
const SITE_URL = 'https://www.prestige-immo.fr'
const DEFAULT_IMAGE = `${SITE_URL}/og-image-default.jpg`
const TWITTER_HANDLE = '@prestigenimmo'

export default function SEOHead({
  title,
  description,
  slug,
  image,
  imageAlt,
  publishedAt,
  type = 'article', // 'article' ou 'website'
  category,
}) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME
  const url = slug ? `${SITE_URL}/blog/${slug}` : SITE_URL
  const ogImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      {/* ── BALISES DE BASE ─────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* ── OPEN GRAPH ──────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* ── ARTICLE SPECIFIC ────────────────────────────── */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && category && (
        <meta property="article:section" content={category} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={SITE_NAME} />
      )}

      {/* ── TWITTER CARD ────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── DIVERS ──────────────────────────────────────── */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="French" />
    </Helmet>
  )
}
```

### 4.4 Utilisation dans ArticleView

```jsx
import SEOHead from '../components/SEOHead'

function ArticleView({ article, onBack }) {
  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        slug={article.slug}
        image={article.mainImage}
        imageAlt={article.mainImageAlt}
        publishedAt={article.publishedAt}
        category={article.category}
        type="article"
      />
      {/* ... reste du composant */}
    </>
  )
}
```

### 4.5 Utilisation dans BlogList

```jsx
function BlogList({ onSelect }) {
  return (
    <>
      <SEOHead
        title="Blog immobilier Paris — Analyses et conseils premium"
        description="Analyses de marché, guides d'achat et stratégies d'investissement pour le marché immobilier parisien haut de gamme."
        type="website"
      />
      {/* ... reste du composant */}
    </>
  )
}
```

---

## 5. Schema.org — données structurées

Les données structurées permettent à Google d'afficher des rich snippets dans les résultats de recherche (date de publication, auteur, fil d'Ariane).

### 5.1 Schema Article

Ajouter dans `SEOHead.jsx` :

```jsx
// Dans le composant SEOHead, après les balises Twitter
{type === 'article' && (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": url,
      "image": ogImage,
      "datePublished": publishedAt,
      "dateModified": publishedAt,
      "author": {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    })}
  </script>
)}
```

### 5.2 Schema BreadcrumbList

Ajouter dans `ArticleView` :

```jsx
// Fil d'Ariane structuré
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": `${SITE_URL}/blog`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": article.title,
      "item": `${SITE_URL}/blog/${article.slug}`
    }
  ]
}

// Dans le return du composant
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify(breadcrumbSchema)}
  </script>
</Helmet>
```

### 5.3 Schema FAQPage (optionnel — fort impact SEO)

Pour les articles qui contiennent des questions/réponses explicites (ex : S·08 LMNP, A·05 SCI) :

```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Le LMNP est-il encore avantageux en 2025 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, pour les investisseurs sans intention de revendre. L'amortissement du bien reste déductible chaque année, générant une économie fiscale significative pour les TMI élevées."
      }
    },
    // Ajouter les autres Q/R de l'article
  ]
}
```

---

## 6. Image Open Graph par défaut

Créer une image de marque `public/og-image-default.jpg` (1200 × 630 px) avec :
- Fond crème (#F7F4EE)
- Logo Prestige Immo centré
- Tagline : "Analyses immobilières · Paris & Île-de-France"
- Accent or (#C4973A)

Outils recommandés : Figma · Canva · Adobe Express

---

## 7. Google Search Console

### 7.1 Vérification du domaine

1. Aller sur **search.google.com/search-console**
2. Ajouter la propriété `https://www.prestige-immo.fr`
3. Méthode de vérification recommandée : **balise HTML** dans `index.html`

```html
<!-- Dans public/index.html, dans le <head> -->
<meta name="google-site-verification" content="VOTRE_CODE_DE_VERIFICATION" />
```

### 7.2 Soumettre le sitemap

1. Search Console → Sitemaps → Ajouter un sitemap
2. Entrer : `sitemap.xml`
3. Cliquer sur Envoyer

### 7.3 Soumettre les articles individuellement

Après chaque publication d'un article :
1. Search Console → Inspection d'URL
2. Entrer l'URL complète de l'article
3. Cliquer sur **Demander l'indexation**

Cela accélère l'indexation de plusieurs semaines à quelques heures.

### 7.4 Métriques à suivre chaque mois

| Métrique | Outil | Fréquence |
|---|---|---|
| Impressions et clics par article | Search Console → Résultats de recherche | Mensuelle |
| Mots-clés qui génèrent du trafic | Search Console → Requêtes | Mensuelle |
| Erreurs d'exploration | Search Console → Couverture | Hebdomadaire |
| Core Web Vitals | Search Console → Expérience | Mensuelle |
| Backlinks entrants | Search Console → Liens | Mensuelle |

---

## 8. Performance — Core Web Vitals

Google utilise trois métriques de performance pour le classement :

| Métrique | Seuil idéal | Impact |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2,5 secondes | ★★★ |
| **FID** (First Input Delay) | < 100 ms | ★★☆ |
| **CLS** (Cumulative Layout Shift) | < 0,1 | ★★☆ |

### Optimisations essentielles pour React/Vite

```javascript
// vite.config.js — optimisation du build
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          sanity: ['@sanity/client', '@portabletext/react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  // Optimisation des images
  plugins: [
    react(),
    // Compression automatique des assets
  ]
})
```

```jsx
// Lazy loading des images dans BlogCard
<img
  src={article.mainImage}
  alt={article.mainImageAlt}
  loading="lazy"
  decoding="async"
  width={600}
  height={400}
/>

// Lazy loading des composants lourds
const ArticleView = lazy(() => import('./ArticleView'))
```

---

## 9. Checklist SEO technique complète

### Avant le lancement

- [ ] **sitemap.xml** généré et accessible sur `/sitemap.xml`
- [ ] **robots.txt** créé et accessible sur `/robots.txt`
- [ ] **SEOHead** intégré sur toutes les pages (liste + articles)
- [ ] **Open Graph** testé sur le [débogueur Facebook](https://developers.facebook.com/tools/debug/)
- [ ] **Twitter Card** testée sur le [validateur Twitter](https://cards-dev.twitter.com/validator)
- [ ] **Schema.org Article** validé sur le [testeur Google](https://search.google.com/test/rich-results)
- [ ] **BreadcrumbList** validé sur le testeur Google
- [ ] **Canonical URLs** présentes sur chaque article
- [ ] **Image OG par défaut** créée (1200 × 630 px)
- [ ] **Search Console** configurée et sitemap soumis

### Après chaque publication

- [ ] URL soumise à Search Console (demande d'indexation)
- [ ] Open Graph testé avec l'URL réelle
- [ ] Interlinks des articles existants vérifiés (les liens pointent bien vers le nouvel article)
- [ ] Article ajouté au sitemap.xml (si mise à jour manuelle)

### Chaque mois

- [ ] Search Console → vérifier impressions et clics par article
- [ ] Search Console → vérifier les erreurs d'exploration
- [ ] Lighthouse → score Performance > 90 sur mobile
- [ ] Mettre à jour `lastmod` des articles modifiés dans le sitemap

---

## 10. Ressources de test et validation

| Outil | Usage | URL |
|---|---|---|
| Google Rich Results Test | Valider Schema.org | search.google.com/test/rich-results |
| Facebook Sharing Debugger | Tester Open Graph | developers.facebook.com/tools/debug |
| Twitter Card Validator | Tester Twitter Card | cards-dev.twitter.com/validator |
| LinkedIn Post Inspector | Tester partage LinkedIn | linkedin.com/post-inspector |
| Google PageSpeed Insights | Core Web Vitals | pagespeed.web.dev |
| Lighthouse (Chrome DevTools) | Audit complet | Dans Chrome → F12 → Lighthouse |
| XML Sitemap Validator | Valider le sitemap | xmlsitemapvalidator.com |

---

*Document créé : session SEO technique*
*À placer dans le dépôt GitHub : /docs/seo-technique.md*
*Dernière mise à jour : à compléter après déploiement*