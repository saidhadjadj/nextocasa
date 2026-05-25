/**
 * NextoCasa — Utilitaire d'optimisation des images
 *
 * Génère des URLs Unsplash optimisées selon le contexte d'affichage.
 * Utilise le format WebP automatiquement via le paramètre ?fm=webp.
 *
 * Usage :
 *   import { imgUrl, imgSrcSet } from '../utils/imageUtils';
 *   <img src={imgUrl(url, 'card')} srcSet={imgSrcSet(url, 'card')} ... />
 */

// ─── Profils de taille par contexte ──────────────────────────────────────────
const PROFILES = {
  hero: { w: 1200, q: 75 }, // Hero plein écran desktop
  heroMobile: { w: 640, q: 70 }, // Hero mobile
  card: { w: 600, q: 75 }, // Carte bien / article
  cardSmall: { w: 400, q: 70 }, // Miniature / carte similaire
  detail: { w: 900, q: 80 }, // Photo fiche bien
  stats: { w: 1000, q: 70 }, // Image de fond section stats
};

/**
 * Génère une URL Unsplash optimisée
 * @param {string} baseUrl - URL Unsplash de base
 * @param {keyof typeof PROFILES} profile - Profil de taille
 * @returns {string} URL optimisée avec WebP et dimensions
 */
export function imgUrl(baseUrl, profile = "card") {
  if (!baseUrl || !baseUrl.includes("unsplash.com")) return baseUrl;
  const { w, q } = PROFILES[profile] || PROFILES.card;
  // Nettoyer les paramètres existants et ajouter les optimisés
  const base = baseUrl.split("?")[0];
  return `${base}?w=${w}&q=${q}&fm=webp&fit=crop&auto=format`;
}

/**
 * Génère un srcSet responsive pour les images Unsplash
 * @param {string} baseUrl - URL Unsplash de base
 * @param {keyof typeof PROFILES} profile - Profil de base
 * @returns {string} srcSet avec 1x et 2x
 */
export function imgSrcSet(baseUrl, profile = "card") {
  if (!baseUrl || !baseUrl.includes("unsplash.com")) return undefined;
  const { w, q } = PROFILES[profile] || PROFILES.card;
  const base = baseUrl.split("?")[0];
  const w2x = Math.min(w * 2, 1600); // Plafonner à 1600px
  return [
    `${base}?w=${w}&q=${q}&fm=webp&fit=crop&auto=format 1x`,
    `${base}?w=${w2x}&q=${q}&fm=webp&fit=crop&auto=format 2x`,
  ].join(", ");
}

/**
 * Props img optimisées complètes — à spreader sur <img>
 * @param {string} baseUrl
 * @param {keyof typeof PROFILES} profile
 * @param {string} alt
 * @returns {object} Props src, srcSet, loading, decoding
 */
export function imgProps(baseUrl, profile = "card", alt = "") {
  return {
    src: imgUrl(baseUrl, profile),
    srcSet: imgSrcSet(baseUrl, profile),
    loading: "lazy",
    decoding: "async",
    alt,
  };
}
