export const ARTICLES_QUERY = `
  *[_type == "article" && status == "PUBLIE"] | order(publishedAt desc) {
    _id,
    "id": _id,
    "ref": articleRef,
    "slug": slug.current,
    "category": categorie->slug.current,
    "tag": categorie->titre,
    "type": select(articleRef match "A*" => "pilier", "calendrier"),
    featured,
    "published": true,
    title,
    excerpt,
    body,
    "author": "L'Observateur de l'Immobilier",
    "authorRole": "Blog L'Observatoire — NextoCasa",
    "authorInitials": "OI",
    "date": publishedAt,
    "readTime": string(readTime) + " min",
    "wordCount": 0,
    "image": mainImage.asset->url,
    "interlinks": relatedArticles[]->slug.current,
  }
`

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    "ref": articleRef,
    "slug": slug.current,
    "category": categorie->slug.current,
    "tag": categorie->titre,
    "type": select(articleRef match "A*" => "pilier", "calendrier"),
    featured,
    "published": true,
    title,
    excerpt,
    body,
    "author": "L'Observateur de l'Immobilier",
    "authorRole": "Blog L'Observatoire — NextoCasa",
    "authorInitials": "OI",
    "date": publishedAt,
    "readTime": string(readTime) + " min",
    "wordCount": 0,
    "image": mainImage.asset->url,
    "interlinks": relatedArticles[]->slug.current,
  }
`
