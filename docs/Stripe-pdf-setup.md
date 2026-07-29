# Configuration Stripe — Guide PDF S·10
## "Investir dans un immeuble de rapport à Paris : le guide complet"
## Prix : 29 €

---

## 1. Vue d'ensemble du tunnel de vente

```
┌─────────────────┐    Clic CTA     ┌─────────────────┐    Paiement     ┌─────────────────┐
│  Article S·10   │ ──────────────▶ │  Page de vente  │ ──────────────▶ │ Stripe Checkout │
│  (blog)         │                 │  /guides/pdf-    │                 │ (checkout.stripe│
│                 │                 │  immeuble-rapport│                 │  .com)          │
└─────────────────┘                 └─────────────────┘                 └────────┬────────┘
                                                                                  │ Succès
                                                                         ┌────────▼────────┐
                                                                         │  Page de succès │
                                                                         │  + Email auto   │
                                                                         │  avec lien PDF  │
                                                                         └─────────────────┘
```

---

## 2. Configuration du produit sur Stripe

### 2.1 Créer le produit

1. Aller sur **dashboard.stripe.com** → Catalogue de produits → Créer un produit
2. Renseigner :

```
Nom du produit : Guide PDF — Investir dans un immeuble de rapport à Paris
Description : Guide complet 5 000 mots avec cas concret chiffré, checklist d'audit
              (25 points) et tableau de simulation financière sur 20 ans.
              Téléchargement immédiat après paiement.
Type : Ponctuel (one-time)
Prix : 29,00 € EUR
Devise : EUR
```

3. Cliquer sur **Enregistrer le produit**
4. Copier le **Price ID** généré (format : `price_1XXXXXXXXXXXXXXXXX`)

### 2.2 Variables d'environnement à ajouter

Dans `.env.local` (développement) et Vercel (production) :

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY
STRIPE_PRICE_ID_PDF_IMMEUBLE=price_1XXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX
PDF_DOWNLOAD_URL=https://votre-bucket.s3.amazonaws.com/guides/immeuble-rapport-paris.pdf
```

> ⚠️ **Sécurité**
> La clé secrète Stripe (`sk_live_`) ne doit JAMAIS être dans le code client.
> Elle s'utilise uniquement côté serveur (Vercel Functions ou API route).

---

## 3. Page de vente — copywriting complet

**URL :** `/guides/pdf-immeuble-rapport-paris`

---

### En-tête de page

**Titre H1 :**
> Investir dans un immeuble de rapport à Paris : le guide complet

**Sous-titre :**
> Cas concret chiffré · Checklist d'audit 25 points · Simulation financière sur 20 ans

**Prix + CTA principal :**
> **29 €** · Téléchargement immédiat
> [Obtenir le guide →]

---

### Section 1 — Le problème

> L'immeuble de rapport parisien est l'un des investissements les plus puissants disponibles sur le marché — et l'un des moins bien documentés. Les guides généralistes n'entrent jamais dans le détail opérationnel : comment chiffrer une acquisition, quoi vérifier avant de faire une offre, comment structurer le financement, quelle fiscalité appliquer.
>
> Ce guide comble ce vide. Il est rédigé pour les investisseurs patrimoniaux qui envisagent sérieusement cette stratégie — pas pour les curieux.

---

### Section 2 — Ce que contient le guide

**Ce que vous obtenez :**

✅ **Le mode d'emploi complet** — fonctionnement, avantages, inconvénients, marchés parisiens actifs en 2025

✅ **Un cas concret chiffré de A à Z** — acquisition rue Lepic (18e), négociation à −10 %, plan d'exploitation sur 5 ans, compte d'exploitation à l'équilibre, simulation sur 20 ans avec patrimoine créé

✅ **La checklist d'audit avant acquisition** — 25 points organisés en 3 catégories : documents à demander, inspection physique, questions au vendeur

✅ **Le tableau de simulation financière** — modèle vierge à compléter avec vos propres chiffres + la règle des 3 filtres avant offre

✅ **La fiscalité optimale** — comparatif nom propre vs SCI à l'IS · calcul de l'économie fiscale annuelle selon la TMI · exemple sur 20 ans

✅ **Les sources off-market** — comment accéder aux immeubles qui ne sont jamais publiés sur les portails

---

### Section 3 — Pour qui est ce guide ?

**Ce guide est fait pour vous si :**
- Vous avez un budget entre 1,5 M€ et 5 M€ à investir en immobilier parisien
- Vous cherchez un rendement supérieur à la location à l'unité (5 à 7 % brut vs 3,5 à 4 %)
- Vous avez une TMI élevée (30 % ou plus) et cherchez à optimiser votre fiscalité
- Vous voulez un patrimoine transmissible structuré

**Ce guide n'est pas fait pour vous si :**
- Vous débutez dans l'investissement immobilier (commencez par A·03 et S·24)
- Votre budget est inférieur à 1 M€ (la colocation ou l'appartement individuel sera plus adapté)

---

### Section 4 — Extrait du guide

> **Exemple du cas concret inclus :**
>
> Immeuble de 6 appartements · rue Lepic · 18e arrondissement · prix demandé 3 500 000 €
> Offre finale acceptée : 3 150 000 € (décote de 10 % argumentée)
> Cash-flow net après IS à l'équilibre : ~132 000 €/an
> Patrimoine total créé sur 20 ans : ~3 730 000 €

---

### Section 5 — Garantie

> **Satisfait ou remboursé 7 jours**
> Si ce guide ne correspond pas à vos attentes, contactez-nous dans les 7 jours suivant votre achat — nous vous remboursons intégralement, sans question.

---

### Section 6 — CTA final

**Prix :** 29 €
**Format :** PDF · 5 000 mots · téléchargement immédiat
**Compatible :** iPhone · Android · tablette · ordinateur

> [Obtenir le guide pour 29 € →]

*Paiement sécurisé par Stripe · CB · Visa · Mastercard · Apple Pay · Google Pay*

---

## 4. Composant React — Page de vente

Créer `src/pages/GuidePDFImmeuble.jsx` :

```jsx
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PRODUCT = {
  name: "Guide PDF — Immeuble de rapport à Paris",
  price: "29 €",
  features: [
    "Mode d'emploi complet de l'investissement en immeuble de rapport",
    "Cas concret chiffré : acquisition, exploitation, simulation 20 ans",
    "Checklist d'audit 25 points avant toute acquisition",
    "Tableau de simulation financière à compléter avec vos chiffres",
    "Fiscalité optimale : comparatif nom propre vs SCI à l'IS",
    "Sources off-market et réseau parisien",
  ],
  guarantee: "Satisfait ou remboursé 7 jours",
}

export default function GuidePDFImmeuble() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      // Appel à la Vercel Function pour créer la session Stripe
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PDF_IMMEUBLE,
          productName: PRODUCT.name,
        }),
      })

      const { sessionId, error: apiError } = await response.json()

      if (apiError) throw new Error(apiError)

      // Redirection vers Stripe Checkout
      const stripe = await stripePromise
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

      if (stripeError) throw new Error(stripeError.message)

    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 48px", fontFamily: "DM Sans, sans-serif" }}>

      {/* EN-TÊTE */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4973A", marginBottom: 16 }}>
          Guide PDF · Téléchargement immédiat
        </div>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 40, fontWeight: 400, lineHeight: 1.2, color: "#1A1814", marginBottom: 16 }}>
          Investir dans un immeuble de rapport à Paris
        </h1>
        <p style={{ fontSize: 16, color: "#4A4540", lineHeight: 1.7, marginBottom: 32 }}>
          Le guide complet avec cas concret chiffré, checklist d'audit 25 points et simulation financière sur 20 ans.
        </p>
        <CTAButton onClick={handleCheckout} loading={loading} />
        {error && <p style={{ color: "#E24B4A", fontSize: 13, marginTop: 12 }}>{error}</p>}
      </div>

      {/* CE QUE CONTIENT LE GUIDE */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 400, marginBottom: 24 }}>
          Ce que vous obtenez
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PRODUCT.features.map((feature, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "#1A1814", lineHeight: 1.5 }}>
              <span style={{ color: "#0F6E56", flexShrink: 0, fontWeight: 500 }}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRAIT */}
      <div style={{ background: "#F7F4EE", borderRadius: 12, padding: "28px 32px", marginBottom: 48, borderLeft: "3px solid #C4973A" }}>
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C4973A", marginBottom: 12 }}>
          Extrait du cas concret inclus
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#1A1814", margin: 0 }}>
          Immeuble de 6 appartements · rue Lepic · 18e · prix négocié 3 150 000 € (−10 %) · cash-flow net après IS : ~132 000 €/an · patrimoine total créé sur 20 ans : ~3 730 000 €
        </p>
      </div>

      {/* CTA FINAL */}
      <div style={{ background: "#1A1814", borderRadius: 16, padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#B4B2A9", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Guide PDF · {PRODUCT.price}
        </div>
        <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#F7F4EE", fontWeight: 400, marginBottom: 8 }}>
          Téléchargement immédiat après paiement
        </h3>
        <p style={{ fontSize: 13, color: "#888780", marginBottom: 24, lineHeight: 1.5 }}>
          {PRODUCT.guarantee}
        </p>
        <CTAButton onClick={handleCheckout} loading={loading} dark />
        <p style={{ fontSize: 12, color: "#666460", marginTop: 16 }}>
          Paiement sécurisé par Stripe · CB · Apple Pay · Google Pay
        </p>
      </div>

    </div>
  )
}

function CTAButton({ onClick, loading, dark }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        background: dark ? "#C4973A" : "#1A1814",
        color: dark ? "#1A1814" : "#F7F4EE",
        border: "none",
        borderRadius: 40,
        padding: "14px 32px",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "DM Sans, sans-serif",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        transition: "opacity 0.2s",
        letterSpacing: "0.04em",
      }}
    >
      {loading ? "Redirection..." : `Obtenir le guide pour 29 € →`}
    </button>
  )
}
```

---

## 5. Vercel Function — Création de la session Stripe

Créer `api/create-checkout-session.js` à la racine du projet :

```javascript
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" })
  }

  const { priceId, productName } = req.body

  if (!priceId) {
    return res.status(400).json({ error: "Price ID manquant" })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.VITE_BASE_URL}/guides/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_BASE_URL}/guides/pdf-immeuble-rapport-paris`,
      metadata: {
        productName,
        type: "pdf_guide",
      },
      // Collecte de l'email pour la livraison
      customer_email: undefined, // Stripe le collecte automatiquement
      billing_address_collection: "auto",
      // Optimisation mobile
      phone_number_collection: { enabled: false },
    })

    return res.status(200).json({ sessionId: session.id })

  } catch (err) {
    console.error("Stripe error:", err)
    return res.status(500).json({ error: err.message })
  }
}
```

---

## 6. Page de succès + livraison du PDF

Créer `src/pages/GuidePDFSuccess.jsx` :

```jsx
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function GuidePDFSuccess() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState("loading")
  const [downloadUrl, setDownloadUrl] = useState(null)
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      return
    }

    // Vérifier le paiement et récupérer le lien de téléchargement
    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setDownloadUrl(data.downloadUrl)
          setStatus("success")
        } else {
          setStatus("error")
        }
      })
      .catch(() => setStatus("error"))
  }, [sessionId])

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 48px", textAlign: "center", fontFamily: "DM Sans, sans-serif" }}>

      {status === "loading" && (
        <p style={{ color: "#4A4540" }}>Vérification du paiement...</p>
      )}

      {status === "success" && (
        <>
          <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 400, color: "#1A1814", marginBottom: 16 }}>
            Merci pour votre achat
          </h1>
          <p style={{ fontSize: 16, color: "#4A4540", lineHeight: 1.7, marginBottom: 32 }}>
            Votre guide PDF est prêt. Un email de confirmation avec le lien de téléchargement vous a également été envoyé.
          </p>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              style={{
                display: "inline-block",
                background: "#1A1814",
                color: "#F7F4EE",
                borderRadius: 40,
                padding: "14px 32px",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              Télécharger le guide PDF →
            </a>
          )}
          <p style={{ fontSize: 13, color: "#8A8580", marginTop: 32 }}>
            Un problème ? Contactez-nous : contact@prestige-immo.fr
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 400, color: "#1A1814", marginBottom: 16 }}>
            Une erreur est survenue
          </h1>
          <p style={{ fontSize: 15, color: "#4A4540", marginBottom: 24 }}>
            Si vous avez été débité, contactez-nous à contact@prestige-immo.fr — nous vous enverrons le guide manuellement dans les 2 heures.
          </p>
        </>
      )}

    </div>
  )
}
```

---

## 7. Vercel Function — Vérification du paiement

Créer `api/verify-payment.js` :

```javascript
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ error: "session_id manquant" })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status === "paid") {
      // Générer un lien de téléchargement signé (temporaire)
      // Option A : URL S3 pré-signée (recommandée)
      // Option B : URL statique avec token (simple)
      const downloadUrl = process.env.PDF_DOWNLOAD_URL

      // Envoyer l'email de confirmation (via Brevo ou Resend)
      await sendConfirmationEmail(session.customer_details.email, downloadUrl)

      return res.status(200).json({ paid: true, downloadUrl })
    }

    return res.status(200).json({ paid: false })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

async function sendConfirmationEmail(email, downloadUrl) {
  // Avec Brevo (anciennement Sendinblue)
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "Prestige Immo", email: "contact@prestige-immo.fr" },
      to: [{ email }],
      subject: "Votre guide PDF — Immeuble de rapport à Paris",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
          <h1 style="font-size: 24px; color: #1A1814; margin-bottom: 16px;">
            Votre guide est prêt
          </h1>
          <p style="font-size: 15px; color: #4A4540; line-height: 1.7; margin-bottom: 24px;">
            Merci pour votre achat. Voici votre lien de téléchargement :
          </p>
          <a href="${downloadUrl}"
             style="display: inline-block; background: #1A1814; color: #F7F4EE;
                    border-radius: 40px; padding: 14px 28px; font-size: 14px;
                    text-decoration: none; font-weight: 500;">
            Télécharger le guide PDF →
          </a>
          <p style="font-size: 13px; color: #8A8580; margin-top: 32px;">
            Ce lien est valable 30 jours. Pour toute question : contact@prestige-immo.fr
          </p>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    console.error("Erreur envoi email:", await response.text())
  }
}
```

---

## 8. Hébergement du PDF

### Option A — AWS S3 (recommandée)

```bash
# Installer AWS CLI
npm install -g aws-cli

# Uploader le PDF
aws s3 cp immeuble-rapport-paris.pdf s3://prestige-immo-guides/

# Générer une URL présignée (valable 30 jours)
aws s3 presign s3://prestige-immo-guides/immeuble-rapport-paris.pdf --expires-in 2592000
```

### Option B — Vercel Blob (simple)

```bash
npm install @vercel/blob
```

```javascript
// api/upload-pdf.js (à exécuter une seule fois)
import { put } from "@vercel/blob"
import fs from "fs"

const file = fs.readFileSync("./immeuble-rapport-paris.pdf")
const blob = await put("guides/immeuble-rapport-paris.pdf", file, {
  access: "public",
  contentType: "application/pdf",
})
console.log("URL du PDF :", blob.url)
// Copier cette URL dans VITE_PDF_DOWNLOAD_URL
```

---

## 9. Checklist de mise en service

### Phase 1 — Stripe (30 min)
- [ ] Créer le compte Stripe (ou utiliser l'existant)
- [ ] Activer les paiements en production
- [ ] Créer le produit "Guide PDF" à 29 €
- [ ] Copier le Price ID dans les variables d'environnement

### Phase 2 — PDF (15 min)
- [ ] Exporter S·10 en PDF depuis Markdown (via Pandoc ou un outil en ligne)
- [ ] Ajouter une couverture au format du blog (titre + logo Prestige Immo)
- [ ] Uploader sur S3 ou Vercel Blob
- [ ] Copier l'URL dans `PDF_DOWNLOAD_URL`

### Phase 3 — Code (1h)
- [ ] Installer `stripe` : `npm install stripe @stripe/stripe-js`
- [ ] Créer `api/create-checkout-session.js`
- [ ] Créer `api/verify-payment.js`
- [ ] Créer `src/pages/GuidePDFImmeuble.jsx`
- [ ] Créer `src/pages/GuidePDFSuccess.jsx`
- [ ] Ajouter les routes dans React Router

### Phase 4 — Email (30 min)
- [ ] Créer un compte Brevo (gratuit jusqu'à 300 emails/jour)
- [ ] Récupérer la clé API Brevo
- [ ] Tester l'envoi d'email en mode test Stripe

### Phase 5 — Test complet (30 min)
- [ ] Effectuer un achat test avec la carte Stripe `4242 4242 4242 4242`
- [ ] Vérifier la redirection vers la page de succès
- [ ] Vérifier la réception de l'email avec le lien PDF
- [ ] Vérifier le téléchargement du PDF
- [ ] Tester le remboursement depuis le dashboard Stripe

---

## 10. Variables d'environnement complètes

```env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXX
STRIPE_PRICE_ID_PDF_IMMEUBLE=price_1XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX

# PDF
PDF_DOWNLOAD_URL=https://votre-bucket.s3.amazonaws.com/guides/immeuble-rapport-paris.pdf

# Email
BREVO_API_KEY=xkeysib-XXXXXXXXXXXXXXXX

# Base URL
VITE_BASE_URL=https://votre-domaine.vercel.app
```

---

## 11. Extensions possibles (phase 2)

- **Webhook Stripe** — pour gérer les remboursements automatiquement
- **Accès membres** — Supabase Auth + liste des achats par utilisateur
- **Second guide PDF** — même structure pour S·17 (11e arrondissement) ou A·05 (SCI)
- **Bundle** — 3 guides pour 59 € (vs 29 € × 3 = 87 €)

---

*Document créé : session de monétisation*
*À placer dans le dépôt GitHub : /docs/stripe-pdf-setup.md*