// ─── NextoCasa — Données blog ─────────────────────────────────────────────────
// Source : document de continuité "Projet Agence Immo Blog & Templates éditorial"
// 14 articles : 6 piliers (A·) + 8 calendrier (S·)
// Données de référence maintenues cohérentes (cf. section 12 du document)

export const CATEGORIES = [
  { key: "all",           label: "Tous les articles",     icon: "🗂️"  },
  { key: "marche",        label: "Marché & tendances",    icon: "📊"  },
  { key: "achat",         label: "Achat premium",         icon: "🏛️" },
  { key: "investissement",label: "Investissement locatif",icon: "📈"  },
  { key: "financement",   label: "Financement & crédit",  icon: "💶"  },
  { key: "juridique",     label: "Juridique & fiscal",    icon: "⚖️" },
];

// ─── Données de référence (cohérence inter-articles) ─────────────────────────
export const DATA_REF = {
  prixMedianParis: "9 400 – 9 600 €/m²",
  correction: "−8 à −13 % selon arrondissements",
  tauxCredit20ans: "~3,8 %",
  rendementBrut: "3,5 – 4,8 %",
  rendementNet: "2,3 – 3,4 %",
  apportMinimum: "20 % (CDI) · 25–30 % (indépendant)",
  tauxEndettementMax: "35 % assurance incluse",
};

export const ARTICLES = [
  // ════════════════════════════════════════════════════════════════════════════
  // ARTICLES PILIERS (A·)
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 1,
    ref: "A·01",
    slug: "marche-immobilier-paris-2025",
    category: "marche",
    tag: "Marché & tendances",
    type: "pilier",
    featured: true,
    published: true, // ✅ Publié — visible sur le site
    title: "Marché immobilier à Paris en 2025 : état des lieux et perspectives",
    excerpt:
      "Après deux années de correction, le marché parisien amorce une stabilisation. Prix médian, volumes de transactions, taux d\'intérêt : notre analyse complète pour décider avec clarté.",
    body: `
Deux

 après le début de la remontée des taux directeurs de la BCE, le marché immobilier parisien présente un visage contrasté. La correction est réelle — entre −8 et −13 % selon les arrondissements — mais les signaux d'un plancher se multiplient depuis la fin 2024.

## Un prix médian qui se stabilise.

Le prix médian parisien s'établit autour de **9 400 – 9 600 €/m²** au quatrième trimestre 2024 (source : Notaires de Paris), contre un pic de 10 800 €/m² en 2021. Cette correction, significative en valeur absolue, reste modérée en comparaison des cycles précédents.

> **Chiffre clé** : −8 à −13 % de correction sur 24 mois selon les arrondissements (source : DVF)

Les arrondissements les plus touchés sont ceux qui avaient connu les hausses les plus spéculatives entre 2019 et 2021 : le 18ème, le 19ème et le 20ème, où la correction atteint 11 à 13 %. À l'inverse, le 6ème, le 7ème et le 8ème résistent mieux, portés par une demande internationale structurelle.

## Le rôle déterminant des taux

Les taux de crédit immobilier sur 20 ans s'établissent à **~3,8 % pour les meilleurs profils** au premier trimestre 2025 — en recul par rapport au pic de 4,5 % de fin 2023, mais encore loin des 1 % qui ont alimenté la bulle 2020–2022.

Cette détente redonne progressivement du pouvoir d'achat aux acquéreurs. Un ménage avec 4 000 €/mois de revenus nets peut désormais emprunter environ 280 000 € sur 20 ans, contre 230 000 € au plus fort de la crise des taux.

## Les volumes de transactions : toujours déprimés

Le volume annuel de transactions en Île-de-France reste inférieur de 20 à 25 % à la moyenne décennale. Ce creux de volume est un indicateur avancé : historiquement, les marchés qui rebondissent commencent par un retour du volume avant une hausse des prix.

## Les segments qui résistent

Le marché des biens d'exception — au-delà d'un million d'euros — affiche une résilience remarquable. Les acheteurs sur ce segment sont moins dépendants du crédit, et la rareté de l'offre prime sur les considérations macroéconomiques.

## Perspectives pour 2025

Trois scénarios sont envisageables pour le second semestre 2025 :

**Scénario central (60 %)** : stabilisation des prix, légère hausse des volumes à mesure que les taux reflux vers 3,3–3,5 %. Reprise progressive sur les secteurs premium.

**Scénario optimiste (25 %)** : accélération de la baisse des taux BCE, retour de la confiance des ménages, rebond des prix de 3 à 5 % sur les secteurs les mieux positionnés.

**Scénario pessimiste (15 %)** : instabilité politique ou monétaire, prolongation de la correction de 4 à 6 % supplémentaires sur les arrondissements périphériques.

Notre analyse privilégie le scénario central. Pour les acquéreurs dont le projet est mature, l'attente d'un hypothétique plancher supplémentaire présente plus de risques que d'avantages.

Pour aller plus loin : [Les quartiers de Paris où investir en 2025](/blog/quartiers-paris-investir-2025) · [Quel apport pour acheter dans le 8e, 16e ou 17e](/blog/apport-achat-arrondissements-paris)
    `.trim(),
    author: "Lajoie Hind",
    authorRole: "Fondatrice & Directrice",
    authorInitials: "LH",
    date: "12 mai 2025",
    readTime: "8 min",
    wordCount: 2250,
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "quartiers-paris-investir-2025",
      "apport-achat-arrondissements-paris",
      "investissement-locatif-paris-rentabilite",
    ],
  },

  {
    id: 2,
    ref: "A·02",
    slug: "acheter-bien-prestige-paris-etapes",
    category: "achat",
    tag: "Achat premium",
    type: "pilier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title: "Acheter un bien de prestige à Paris : les 7 étapes clés",
    excerpt:
      "De la définition du projet à la signature chez le notaire : les étapes incontournables d'un achat réussi dans le segment haut de gamme parisien. Méthode, pièges à éviter, conseils d'initiés.",
    body: `
Acheter un bien de prestige à Paris ne s'improvise pas. Le segment haut de gamme obéit à des règles spécifiques — délais, intermédiaires, négociation, financement — que les acquéreurs découvrent souvent trop tard. Voici la méthode complète pour aborder ce marché avec sérénité.

## Étape 1 : formaliser précisément votre projet

Avant la première visite, prenez le temps de rédiger un cahier des charges détaillé : arrondissement prioritaire et alternatives acceptées, surface minimale et idéale, nombre de pièces, étage et exposition souhaités, budget global (prix net vendeur + frais de notaire + travaux éventuels + frais d'agence).

> **Chiffre clé** : les frais annexes représentent 10 à 15 % du prix d'acquisition — à intégrer dès le départ.

Plus votre cahier des charges est précis, plus votre conseiller peut activer efficacement le réseau off-market — qui concentre les meilleures opportunités sur ce segment.

## Étape 2 : sécuriser le financement en amont

Sur le marché du prestige, les vendeurs et leurs agents qualifient les acquéreurs avant d'organiser les visites. Un accord de principe bancaire ou une simulation de courtier crédibilise votre dossier et vous permet de vous positionner rapidement.

Le taux d'endettement maximum fixé par le HCSF est de **35 % assurance incluse**. Sur les dossiers haut de gamme, les banques examinent également la stabilité des revenus, la qualité du patrimoine existant et l'historique bancaire.

## Étape 3 : structurer vos recherches

Trois canaux complémentaires : les portails en ligne (Bienici, SeLoger Luxe, Propriétés Le Figaro), les agences spécialisées (réseau off-market), et votre propre réseau. Sur ce dernier point, ne sous-estimez pas la valeur d'une conversation informelle — de nombreuses transactions de prestige se font avant toute mise en publicité.

## Étape 4 : conduire les visites avec méthode

Lors des premières visites, observez au-delà de l'esthétique : état de la copropriété, montant des charges, travaux votés, exposition et ensoleillement réel, niveau sonore à différentes heures. Demandez systématiquement le carnet d'entretien de l'immeuble et les trois derniers procès-verbaux d'assemblée générale.

## Étape 5 : formuler une offre stratégique

La marge de négociation varie fortement selon le secteur : 2 à 4 % dans le 6ème et 7ème, 5 à 8 % dans le 16ème et 17ème, 7 à 11 % dans le 18ème et 19ème. Une offre trop basse sur un bien bien positionné peut fermer définitivement la porte. Une offre raisonnée, accompagnée d'un dossier de financement solide, est souvent plus efficace.

## Étape 6 : le compromis de vente

Le compromis fixe les conditions définitives de la transaction. Les conditions suspensives standards (obtention du crédit, absence de servitudes) doivent être rédigées avec précision. Faites-le relire par votre notaire — pas seulement celui du vendeur.

## Étape 7 : l'acte authentique

Environ trois mois après le compromis. Les fonds sont versés par le notaire après vérification de l'ensemble des documents. Les clés vous sont remises à la signature. Le transfert de propriété est effectif.

Pour aller plus loin : [Négocier le prix d'un appartement à Paris](/blog/negocier-prix-appartement-paris) · [Acheter un Haussmannien : points de vigilance](/blog/acheter-haussmannien-paris-vigilance) · [Quel apport pour les arrondissements premium](/blog/apport-achat-arrondissements-paris)
    `.trim(),
    author: "Laure Lefebre",
    authorRole: "Conseillère senior",
    authorInitials: "LL",
    date: "28 avril 2025",
    readTime: "7 min",
    wordCount: 2200,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "negocier-prix-appartement-paris",
      "acheter-haussmannien-paris-vigilance",
      "apport-achat-arrondissements-paris",
    ],
  },

  {
    id: 3,
    ref: "A·03",
    slug: "investissement-locatif-paris-rentabilite",
    category: "investissement",
    tag: "Investissement locatif",
    type: "pilier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Rendement locatif à Paris en 2025 : brut, net, net-net — ce qui compte vraiment",
    excerpt:
      "Rendement brut affiché, rendement net réel, cash-flow après impôt : les trois indicateurs que tout investisseur parisien doit maîtriser avant de signer. Méthode et exemples chiffrés.",
    body: `
Le rendement locatif est l'indicateur le plus cité et le plus mal compris de l'investissement immobilier. Voici comment le calculer correctement, et ce qu'il révèle vraiment sur la qualité d'un investissement à Paris.

## Le rendement brut : un indicateur de premier filtre

Le rendement brut rapporte le loyer annuel au prix d'acquisition total (prix net vendeur + frais de notaire + travaux).

**Formule** : (Loyer annuel brut / Prix total d'acquisition) × 100

> **Référence Paris 2025** : rendement brut moyen **3,5 – 4,8 %** selon le secteur (source : calcul sur données DVF)

Un studio dans le 11ème acheté 380 000 € (frais inclus) et loué 1 350 €/mois affiche un rendement brut de 4,26 %. Un appartement familial dans le 16ème à 900 000 € loué 2 800 €/mois : 3,73 %.

## Le rendement net : la réalité des charges

Le rendement net intègre toutes les charges non récupérables : taxe foncière, charges de copropriété non récupérables, assurance propriétaire non occupant, frais de gestion locative (7 à 10 % du loyer), provision pour vacance locative (1 mois/an en moyenne à Paris), provision pour travaux et entretien.

**Règle empirique** : déduire 25 à 30 % du rendement brut pour obtenir le net. Notre studio à 4,26 % brut ressort à environ 3,0 – 3,2 % net.

> **Référence Paris 2025** : rendement net moyen **2,3 – 3,4 %** selon le secteur et la qualité de gestion

## Le rendement net-net : l'impact fiscal décisif

C'est l'indicateur que les vendeurs n'affichent jamais, et pourtant le seul qui compte pour votre patrimoine réel. Il intègre la fiscalité sur les revenus fonciers, qui dépend de votre tranche marginale d'imposition (TMI) et du régime choisi.

**Régime micro-foncier** : abattement forfaitaire de 30 %, simple mais souvent défavorable au-delà de 2 500 €/an de revenus fonciers.

**Régime réel** : déduction de toutes les charges réelles + intérêts d'emprunt. Quasi-systématiquement favorable pour les profils patrimoniaux.

**LMNP (Loueur Meublé Non Professionnel)** : amortissement comptable du bien, qui permet de neutraliser fiscalement une grande partie des revenus pendant 20 à 30 ans. Particulièrement adapté aux investisseurs avec une TMI de 30 % ou plus.

## Le cash-flow : la vraie question mensuelle

Le cash-flow est la différence entre le loyer perçu et l'ensemble des sorties mensuelles (mensualité de crédit, charges, impôts mensualisés). À Paris, le cash-flow est rarement positif sur les biens récents — l'investisseur parisien mise davantage sur la valorisation à long terme que sur le rendement immédiat.

## Notre analyse

Paris n'est pas le marché le plus rentable de France en termes de rendement locatif pur — les villes de taille moyenne offrent souvent 5 à 7 % brut. Mais la liquidité du marché parisien, la profondeur de la demande locative et la résilience des prix sur le long terme justifient un rendement inférieur. C'est un actif de patrimoine, pas un actif de rendement.

Pour aller plus loin : [SCI ou achat en nom propre](/blog/sci-vs-nom-propre-paris) · [LMNP à Paris en 2025](/blog/lmnp-paris-2025-rentable-reformes) · [Colocation haut de gamme](/blog/colocation-haut-de-gamme-paris-investissement)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "15 avril 2025",
    readTime: "8 min",
    wordCount: 2300,
    image:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "sci-vs-nom-propre-paris",
      "lmnp-paris-2025-rentable-reformes",
      "colocation-haut-de-gamme-paris-investissement",
    ],
  },

  {
    id: 4,
    ref: "A·04",
    slug: "apport-achat-arrondissements-paris",
    category: "financement",
    tag: "Financement & crédit",
    type: "pilier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Quel apport pour acheter dans le 8e, le 16e ou le 17e arrondissement ?",
    excerpt:
      "Les arrondissements premium parisiens imposent des niveaux d'apport spécifiques. Voici ce que les banques exigent vraiment — et comment optimiser votre dossier selon votre profil.",
    body: `
Acheter dans les arrondissements les plus prisés de Paris — le 8ème, le 16ème, le 17ème — implique des niveaux de financement significatifs. Les règles générales s'appliquent, mais les pratiques bancaires sur ce segment présentent des spécificités qu'il est essentiel de connaître.

## Ce que les chiffres disent

> **Prix médian 8ème (45 m²)** : ~549 000 € · **16ème** : ~513 000 € · **17ème** : ~459 000 €

Pour un appartement de 45 m² dans le 8ème à 549 000 €, les frais de notaire s'élèvent à environ 44 000 € (acte ancien). Le coût total d'acquisition approche donc **593 000 €**.

Avec un apport de 20 % (environ 110 000 €), le crédit nécessaire est de 483 000 €. Sur 20 ans à 3,8 %, la mensualité ressort à **~2 900 €**. Pour respecter le taux d'endettement HCSF de 35 %, les revenus nets mensuels du foyer doivent être d'au moins **8 300 €**.

## Les seuils d'apport selon le profil

**Salarié CDI, revenus stables** : 20 % minimum est le seuil d'entrée pour accéder aux conditions standards. En dessous, le risque de refus ou de conditions dégradées est réel.

**Indépendant, profession libérale, gérant** : les banques demandent systématiquement 25 à 30 % d'apport, et exigent 3 ans de bilans comptables. La stabilité des revenus prime sur leur niveau absolu.

**Investisseur (résidence secondaire ou locatif)** : 30 % minimum, souvent davantage. La banque intègre le risque de vacance locative dans son calcul.

## La stratégie de l'apport optimisé

Mobiliser tout son épargne en apport n'est pas toujours la meilleure décision patrimoniale. Sur les montants élevés, il peut être pertinent de conserver une réserve liquide — pour anticiper des travaux, saisir une opportunité ou maintenir une capacité d'emprunt future.

Les conseillers en gestion de patrimoine recommandent généralement de ne pas immobiliser plus de 60 à 70 % de son épargne disponible dans l'apport.

## Ce que les banques évaluent vraiment

Au-delà du montant de l'apport, les établissements bancaires examinent la traçabilité de l'épargne (3 mois de relevés minimum), la régularité des revenus, l'absence d'incidents bancaires, et la cohérence globale du projet.

Un apport de 30 % constitué d'une donation récente sera analysé différemment d'une épargne constituée sur 5 ans.

Pour aller plus loin : [Négocier son taux en 2025](/blog/negocier-prix-appartement-paris) · [Acheter un bien de prestige : les 7 étapes](/blog/acheter-bien-prestige-paris-etapes)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "5 avril 2025",
    readTime: "7 min",
    wordCount: 2200,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "negocier-prix-appartement-paris",
      "acheter-bien-prestige-paris-etapes",
      "credit-immobilier-haut-de-gamme-dossier",
    ],
  },

  {
    id: 5,
    ref: "A·05",
    slug: "sci-vs-nom-propre-paris",
    category: "juridique",
    tag: "Juridique & fiscal",
    type: "pilier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title: "SCI ou achat en nom propre : que choisir pour investir à Paris ?",
    excerpt:
      "La question revient sur tous les projets patrimoniaux. SCI à l'IR, SCI à l'IS, achat en nom propre : comparaison objective des trois options selon votre profil et vos objectifs.",
    body: `
La question de la structure juridique d'acquisition est souvent traitée trop tard — parfois après la signature du compromis. Or, le choix entre achat en nom propre et création d'une SCI a des implications fiscales, successorales et patrimoniales majeures qui méritent une analyse approfondie en amont.

## L'achat en nom propre : la simplicité avant tout

C'est la solution par défaut. Aucune démarche de création, pas de frais de constitution, gestion directe. Fiscalement, les revenus fonciers s'ajoutent aux revenus ordinaires et sont soumis à la TMI du foyer + 17,2 % de prélèvements sociaux.

> **Chiffre clé** : pour une TMI de 41 %, la fiscalité totale sur les revenus fonciers atteint 58,2 %.

L'achat en nom propre reste pertinent pour un premier investissement de montant modéré, un bien destiné à une occupation mixte (locatif puis résidence principale), ou un acheteur dont la TMI n'excède pas 11 %.

## La SCI à l'IR : la transmission facilitée

La Société Civile Immobilière soumise à l'impôt sur le revenu présente l'intérêt principal de la transmission : les parts sociales se donnent progressivement, avec des abattements tous les 15 ans, dans des conditions souvent plus favorables que la transmission du bien lui-même.

La SCI à l'IR est transparente fiscalement — les revenus remontent au niveau des associés proportionnellement à leurs parts. Elle n'offre pas d'avantage fiscal immédiat sur les revenus locatifs, mais simplifie considérablement la gestion d'un patrimoine multi-biens et la transmission intergénérationnelle.

## La SCI à l'IS : l'outil des investisseurs actifs

La SCI soumise à l'impôt sur les sociétés permet l'amortissement comptable du bien — un mécanisme qui réduit mécaniquement le résultat imposable pendant 20 à 30 ans. C'est l'outil privilégié des investisseurs qui cherchent à réinvestir les flux locatifs dans de nouveaux actifs.

L'inconvénient majeur : la plus-value à la revente est calculée sur la valeur nette comptable (après amortissements), ce qui génère une imposition potentiellement très élevée en cas de cession après plusieurs décennies.

## Notre recommandation

Il n'existe pas de réponse universelle. La structure optimale dépend de votre TMI actuelle et projetée, de votre horizon d'investissement, de votre objectif (rendement immédiat, capitalisation, transmission), et du nombre de biens envisagés.

Un entretien avec un notaire ou un conseiller en gestion de patrimoine avant toute décision est systématiquement recommandé.

Pour aller plus loin : [Rendement locatif à Paris](/blog/investissement-locatif-paris-rentabilite) · [Transmission d'un patrimoine immobilier parisien](/blog/transmission-patrimoine-immobilier-paris)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "28 mars 2025",
    readTime: "8 min",
    wordCount: 2400,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "investissement-locatif-paris-rentabilite",
      "transmission-patrimoine-immobilier-paris",
      "fiscalite-revenus-locatifs-paris",
    ],
  },

  {
    id: 6,
    ref: "A·06",
    slug: "quartiers-paris-investir-2025",
    category: "marche",
    tag: "Marché & tendances",
    type: "pilier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Les quartiers de Paris où investir en 2025 : notre sélection commentée",
    excerpt:
      "Belleville, Oberkampf, les Batignolles, le Canal Saint-Martin... Ces quartiers concentrent les meilleures dynamiques de 2025. Notre analyse secteur par secteur, avec chiffres et nuances.",
    body: `
Tous les quartiers parisiens ne se comportent pas de la même façon face aux cycles immobiliers. Certains résistent mieux à la correction, d'autres offrent encore des décotes intéressantes pour les investisseurs patients. Voici notre sélection commentée pour 2025.

## Le 11ème : la maturité d'un quartier devenu premium

Le 11ème arrondissement a achevé sa transformation. Ce qui était considéré comme un marché intermédiaire dans les années 2010 est aujourd'hui pleinement intégré aux secteurs recherchés. Les rues Oberkampf, Roquette et Saint-Maur concentrent une clientèle CSP+ qui valorise la mixité et la vie de quartier.

> **Prix médian 11ème (45 m²)** : ~441 000 € · Correction 2022–2024 : −9 %

La correction a créé une fenêtre d'entrée intéressante. Les appartements de caractère — ateliers réhabilités, anciens commerces convertis — continuent de se valoriser plus rapidement que la moyenne.

## Le 17ème nord : le bon rapport qualité-prix

Le secteur des Batignolles (17ème nord) bénéficie de l'effet TGV de la ligne 14 prolongée et de la requalification du quartier des Épinettes. Les prix restent 15 à 20 % inférieurs aux Batignolles proprement dits, pour une qualité de vie et des surfaces équivalentes.

> **Prix médian 17ème** : ~459 000 € · Marge de négociation : 5 à 8 %

## Le 9ème : l'arrondissement le plus résilient

Le 9ème présente un profil atypique : des prix qui ont peu corrigé (−6 % seulement), portés par une demande locative très forte de la part des actifs parisiens travaillant dans les 2ème et 3ème arrondissements. Le rendement brut y est l'un des plus élevés des arrondissements centraux : 4,2 à 4,6 %.

## Les Chartrons à Bordeaux : hors Paris, notre pick

Pour les investisseurs qui souhaitent diversifier leur patrimoine hors Paris, le quartier des Chartrons à Bordeaux offre un profil rare : immobilier de caractère (maisons de négoce, immeubles de pierre), demande locative solide, et prix encore accessibles malgré une hausse de 20 % sur cinq ans.

## Ce que nous déconseillons en 2025

Les arrondissements périphériques (18ème nord, 19ème est, 20ème) présentent encore un risque de correction résiduelle. La qualité de l'offre locative y est plus hétérogène, et la demande moins soutenue que dans les secteurs centraux.

Pour aller plus loin : [Marché immobilier Paris 2025](/blog/marche-immobilier-paris-2025) · [Investissement locatif : rendement réel](/blog/investissement-locatif-paris-rentabilite)
    `.trim(),
    author: "Lajoie Hind",
    authorRole: "Fondatrice & Directrice",
    authorInitials: "LH",
    date: "18 mars 2025",
    readTime: "8 min",
    wordCount: 2500,
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "marche-immobilier-paris-2025",
      "investissement-locatif-paris-rentabilite",
      "apport-achat-arrondissements-paris",
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ARTICLES CALENDRIER (S·)
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 7,
    ref: "S·01",
    slug: "negocier-prix-appartement-paris",
    category: "achat",
    tag: "Achat premium",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Négocier le prix d'un appartement à Paris : ce qui fonctionne vraiment",
    excerpt:
      "La négociation immobilière parisienne a ses règles non écrites. Timing, arguments, posture : les techniques qui aboutissent — et celles qui ferment des portes.",
    body: `
La négociation immobilière à Paris est un art délicat. Trop agressif, vous fermez la porte à des biens bien positionnés. Trop passif, vous laissez de l'argent sur la table. Voici ce qui fonctionne vraiment, sur la base de notre expérience de terrain.

## Comprendre les marges réelles par secteur

Les marges de négociation ne sont pas uniformes sur Paris. Elles dépendent du secteur, de la durée de mise en vente et de la motivation du vendeur.

> **Chiffre clé** : 2 à 4 % dans le 6ème/7ème · 5 à 8 % dans le 16ème/17ème · 7 à 11 % dans le 18ème/19ème

Un bien mis en vente depuis moins de 3 semaines dans un secteur tendu : la négociation doit être modérée (1 à 2 % maximum). Un bien présent depuis plus de 3 mois avec une ou deux baisses de prix déjà enregistrées : la marge est réelle, parfois au-delà des chiffres ci-dessus.

## Les arguments qui portent

**L'état du bien** : travaux à prévoir, DPE défavorable (F ou G), installation électrique vétuste — chaque défaut identifié est un argument chiffrable. Faites établir des devis avant de formuler votre offre.

**La rapidité** : proposer une signature rapide du compromis (15 jours) et un délai de réalisation court peut valoir 1 à 2 % sur le prix.

**Le financement solide** : un dossier de financement complet et présenté avec l'offre est un signal fort pour le vendeur — il réduit son risque de voir la vente capoter.

## Ce qui ne fonctionne pas

Les offres "ballon" à −20 % sur un bien correctement positionné ne font qu'irriter les vendeurs et leurs agents. Elles signalent une méconnaissance du marché et ferment souvent définitivement la négociation.

## La négociation sur les biens off-market

Sur les biens présentés en exclusivité ou en off-market, la logique est différente. Le vendeur a choisi la discrétion précisément pour éviter une mise en concurrence publique. La négociation y est possible mais doit être conduite avec davantage de finesse.

Pour aller plus loin : [Acheter un bien de prestige : les 7 étapes](/blog/acheter-bien-prestige-paris-etapes) · [Acheter un Haussmannien](/blog/acheter-haussmannien-paris-vigilance)
    `.trim(),
    author: "Laure Lefebre",
    authorRole: "Conseillère senior",
    authorInitials: "LL",
    date: "2 mai 2025",
    readTime: "5 min",
    wordCount: 1500,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "acheter-bien-prestige-paris-etapes",
      "acheter-haussmannien-paris-vigilance",
      "apport-achat-arrondissements-paris",
    ],
  },

  {
    id: 8,
    ref: "S·02",
    slug: "fiscalite-revenus-locatifs-paris",
    category: "juridique",
    tag: "Juridique & fiscal",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Fiscalité des revenus locatifs à Paris : régime micro vs réel en 2025",
    excerpt:
      "Micro-foncier ou régime réel : le choix de régime fiscal peut faire varier votre imposition de plusieurs milliers d'euros par an. Comparaison chiffrée et cas pratiques.",
    body: `
Le choix du régime fiscal pour vos revenus fonciers est l'une des décisions les plus impactantes de votre investissement locatif. Et pourtant, de nombreux propriétaires bailleurs restent au régime micro-foncier par inertie, en laissant filer un avantage fiscal significatif.

## Le régime micro-foncier : simple mais souvent insuffisant

Le micro-foncier s'applique automatiquement si vos revenus fonciers bruts annuels n'excèdent pas 15 000 €. Il offre un abattement forfaitaire de 30 % sur les revenus bruts, sans justification de charges.

> **Exemple** : 12 000 € de loyers annuels → base imposable de 8 400 €. Avec une TMI de 30 % + 17,2 % de prélèvements sociaux : imposition totale de **~3 990 €**.

C'est simple, mais c'est rarement optimal dès lors que les charges réelles dépassent 30 % des revenus — ce qui est fréquent à Paris (taxe foncière élevée, charges de copropriété importantes, travaux).

## Le régime réel : la déduction de toutes les charges

Le régime réel permet de déduire l'intégralité des charges réelles : intérêts d'emprunt, taxe foncière, charges de copropriété non récupérables, frais de gestion, assurances, travaux d'entretien et de réparation.

> **Même exemple au réel** : 12 000 € de loyers, 7 200 € de charges déductibles → base imposable de 4 800 €. Imposition totale : **~2 280 €**. Soit 1 710 € d'économie annuelle.

## Le déficit foncier : un outil puissant

Si vos charges dépassent vos revenus fonciers, vous créez un déficit foncier, imputable sur votre revenu global dans la limite de 10 700 € par an. L'excédent est reportable sur les revenus fonciers des 10 années suivantes.

C'est l'outil par excellence pour les acquéreurs de biens à rénover dans les arrondissements premium — qui combinent potentiel de valorisation et optimisation fiscale immédiate.

## Quand basculer au régime réel ?

Dès que vos charges réelles annuelles dépassent 30 % de vos revenus fonciers bruts, le passage au réel est mathématiquement avantageux. Le calcul prend 30 minutes avec un comptable — et peut générer plusieurs milliers d'euros d'économies annuelles.

Pour aller plus loin : [SCI ou nom propre](/blog/sci-vs-nom-propre-paris) · [Rendement net-net à Paris](/blog/investissement-locatif-paris-rentabilite)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "18 avril 2025",
    readTime: "5 min",
    wordCount: 1600,
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "sci-vs-nom-propre-paris",
      "investissement-locatif-paris-rentabilite",
      "lmnp-paris-2025-rentable-reformes",
    ],
  },

  {
    id: 9,
    ref: "S·03",
    slug: "credit-immobilier-haut-de-gamme-dossier",
    category: "financement",
    tag: "Financement & crédit",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Crédit immobilier haut de gamme à Paris : ce que les banques évaluent vraiment",
    excerpt:
      "Au-delà du taux d'endettement, les banques scrutent votre dossier sous des angles que la plupart des acquéreurs ignorent. Ce que les établissements premium regardent vraiment.",
    body: `
Obtenir un crédit immobilier pour un bien de prestige parisien n'est pas simplement une question de revenus suffisants. Les établissements bancaires qui financent ce segment — BNP Patrimoine, Société Générale Private Banking, Crédit Agricole Île-de-France — appliquent des grilles d'analyse spécifiques.

## Le taux d'endettement : la règle HCSF

Le Haut Conseil de Stabilité Financière (HCSF) plafonne le taux d'endettement à **35 % des revenus nets, assurance emprunteur incluse**. Cette règle s'applique sans dérogation depuis janvier 2022, sauf exceptions accordées discrétionnairement par les établissements (15 % maximum de la production).

> **Exemple concret** : pour financer 500 000 € sur 20 ans à 3,8 %, la mensualité assurance incluse ressort à ~3 150 €. Les revenus nets mensuels du foyer doivent être d'au moins **9 000 €**.

## Ce que les banques regardent vraiment

**La stabilité des revenus** prime sur leur niveau absolu. Un fonctionnaire gagnant 6 000 €/mois nets obtiendra souvent de meilleures conditions qu'un indépendant gagnant 12 000 €/mois avec une forte variabilité.

**La qualité du patrimoine existant** : un foyer propriétaire d'un bien sans charge résiduelle significative, disposant d'une épargne de précaution de 6 mois de charges, est perçu comme un profil premium.

**L'historique bancaire** des 3 derniers mois est systématiquement analysé. Découverts fréquents, virements atypiques, dépenses irrégulières — tout est lu.

**La cohérence du projet** : un dossier qui explique clairement la destination du bien (résidence principale, investissement locatif, résidence secondaire) et la stratégie patrimoniale associée est mieux accueilli.

## La stratégie du bon moment

Préparer son dossier 6 à 12 mois avant la recherche active permet d'optimiser sa situation : rembourser les crédits à la consommation résiduels, régulariser les flux bancaires, constituer l'épargne de précaution visible.

Pour aller plus loin : [Quel apport pour les arrondissements premium](/blog/apport-achat-arrondissements-paris) · [Négocier son taux](/blog/negocier-prix-appartement-paris)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "8 avril 2025",
    readTime: "5 min",
    wordCount: 1550,
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "apport-achat-arrondissements-paris",
      "negocier-prix-appartement-paris",
      "acheter-bien-prestige-paris-etapes",
    ],
  },

  {
    id: 10,
    ref: "S·04",
    slug: "colocation-haut-de-gamme-paris-investissement",
    category: "investissement",
    tag: "Investissement locatif",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Colocation haut de gamme à Paris : une stratégie d'investissement méconnue",
    excerpt:
      "La colocation premium — grandes surfaces, finition haut de gamme, colocataires sélectionnés — affiche des rendements 30 à 50 % supérieurs à la location classique. Mode d'emploi.",
    body: `
La colocation souffre d'une image qui ne correspond plus à la réalité du segment premium. Dans les grandes surfaces parisiennes — à partir de 120 m² — la colocation haut de gamme est devenue une stratégie d'investissement sophistiquée, prisée des patrimoniaux qui cherchent à optimiser leur rendement sans sacrifier la qualité de leur actif.

## Pourquoi le rendement est supérieur

La logique est simple : une grande surface divisée en plusieurs chambres génère un loyer global supérieur à celui d'une location classique à un seul ménage.

> **Exemple concret** : un appartement de 150 m² dans le 17ème, acheté 1 100 000 € (frais inclus), loué en colocation à 6 colocataires à 900 €/chambre : **5 400 €/mois** de loyer global, soit un rendement brut de **5,9 %** — contre ~3,8 % en location classique.

## Le profil type du colocataire premium

Jeunes cadres supérieurs (25–35 ans), expatriés en mission longue durée, étudiants de grandes écoles ou en master spécialisé. Ces profils valorisent la qualité du logement, la localisation centrale et la gestion professionnelle. Ils sont solvables, soigneux et souvent peu présents.

## Les contraintes à anticiper

La gestion d'une colocation est plus intensive qu'une location classique : turnover plus fréquent des colocataires, coordination entre occupants, entretien plus soutenu des parties communes. Ces contraintes justifient le recours à un gestionnaire spécialisé (7 à 10 % du loyer global).

La réglementation sur la colocation a évolué : contrat unique ou baux individuels, solidarité des colocataires, assurance habitation — ces points doivent être traités avec rigueur.

## Notre analyse

La colocation haut de gamme est une stratégie pertinente pour les grandes surfaces acquises dans les arrondissements centraux, à condition d'accepter une gestion active ou de la déléguer à un professionnel compétent.

Pour aller plus loin : [Rendement locatif Paris](/blog/investissement-locatif-paris-rentabilite) · [SCI ou nom propre](/blog/sci-vs-nom-propre-paris)
    `.trim(),
    author: "Laure Lefebre",
    authorRole: "Conseillère senior",
    authorInitials: "LL",
    date: "25 mars 2025",
    readTime: "5 min",
    wordCount: 1500,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "investissement-locatif-paris-rentabilite",
      "sci-vs-nom-propre-paris",
      "lmnp-paris-2025-rentable-reformes",
    ],
  },

  {
    id: 11,
    ref: "S·05",
    slug: "acheter-haussmannien-paris-vigilance",
    category: "achat",
    tag: "Achat premium",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Acheter un Haussmannien à Paris : les points de vigilance avant de signer",
    excerpt:
      "Parquet point de Hongrie, moulures, cheminées en marbre... Le Haussmannien fait rêver. Mais derrière la beauté des volumes se cachent des contraintes spécifiques à connaître absolument.",
    body: `
L'appartement haussmannien reste le produit immobilier le plus recherché du marché parisien premium. Sa rareté, ses volumes et son cachet architectural justifient une prime de prix significative. Mais cette typologie présente aussi des contraintes spécifiques que tout acquéreur doit évaluer avant de s'engager.

## L'état de la copropriété : la vérification prioritaire

Avant toute autre considération, demandez les trois derniers procès-verbaux d'assemblée générale et le carnet d'entretien de l'immeuble. Un immeuble haussmannien bien entretenu a fait l'objet de travaux réguliers : ravalement, toiture, ascenseur, parties communes. Un immeuble qui accumule les reports de travaux peut générer des appels de fonds importants dans les années suivant votre acquisition.

> **Chiffre clé** : les travaux de ravalement d'un immeuble haussmannien coûtent en moyenne 15 000 à 25 000 € par lot — à provisionner.

## Le DPE : une contrainte croissante

Les appartements haussmanniens sont fréquemment classés E, F ou G — murs en pierre massive, simple vitrage, absence d'isolation. La loi Climat impose progressivement l'interdiction de location des passoires thermiques : les F sont concernés dès 2025, les E à partir de 2034.

Si vous achetez pour louer, le DPE est un critère non négociable. Si vous achetez pour habiter, la rénovation thermique (double vitrage, isolation des combles, ventilation mécanique) représente un investissement de 30 000 à 80 000 € selon la surface.

## Les moulures et parquets : entre atout et contrainte

Le cachet haussmannien — parquet point de Hongrie, moulures, cheminées en marbre — est un atout incontestable à la revente. Mais leur restauration est coûteuse et spécialisée. Un parquet original en mauvais état coûte 80 à 150 €/m² à rénover par un artisan qualifié. Les boiseries et moulures : 50 à 120 €/ml selon la complexité.

## La question du bruit et de l'exposition

L'exposition et le niveau sonore varient considérablement selon l'étage et l'orientation. Un appartement en rez-de-chaussée sur cour peut être calme mais sombre. Un 4ème étage sur boulevard sans double vitrage : lumineux mais bruyant. Visitez à différentes heures, fenêtres ouvertes.

Pour aller plus loin : [Les 7 étapes d'un achat de prestige](/blog/acheter-bien-prestige-paris-etapes) · [Négocier le prix](/blog/negocier-prix-appartement-paris)
    `.trim(),
    author: "Lajoie Hind",
    authorRole: "Fondatrice & Directrice",
    authorInitials: "LH",
    date: "10 mars 2025",
    readTime: "5 min",
    wordCount: 1550,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "acheter-bien-prestige-paris-etapes",
      "negocier-prix-appartement-paris",
      "marche-immobilier-paris-2025",
    ],
  },

  {
    id: 12,
    ref: "S·06",
    slug: "transmission-patrimoine-immobilier-paris",
    category: "juridique",
    tag: "Juridique & fiscal",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "Transmission d'un patrimoine immobilier parisien : donation vs succession",
    excerpt:
      "Donner de son vivant ou laisser passer par la succession ? La réponse dépend de votre âge, de la valeur du patrimoine et de la structure familiale. Comparaison objective.",
    body: `
La transmission d'un patrimoine immobilier parisien est l'une des questions patrimoniales les plus complexes — et les plus coûteuses si elle est mal anticipée. Les droits de succession sur un bien parisien de 800 000 € peuvent dépasser 150 000 € en l'absence de préparation. Voici les leviers à connaître.

## Les droits de succession : l'enjeu chiffré

En ligne directe (parents vers enfants), chaque enfant bénéficie d'un abattement de 100 000 € tous les 15 ans. Au-delà, le barème progressif s'applique : 20 % jusqu'à 552 000 €, 30 % au-delà.

> **Exemple** : un bien parisien évalué à 900 000 €, transmis à deux enfants. Base taxable après abattements : 700 000 € (350 000 € par enfant). Droits totaux estimés : **~130 000 €**.

## La donation : anticiper pour optimiser

La donation permet de transmettre par anticipation, en utilisant les abattements de 100 000 € par enfant tous les 15 ans. Une donation réalisée aujourd'hui reconstitue l'abattement en 2040 — permettant une double transmission avantageuse sur une longue période.

La donation avec réserve d'usufruit (donation-partage) est particulièrement efficace : le donateur conserve l'usage du bien et les revenus locatifs, tandis que la nue-propriété est transmise. La valeur fiscale de la nue-propriété est réduite selon l'âge du donateur — de 50 % si le donateur a entre 51 et 60 ans.

## La SCI familiale : l'outil de la transmission progressive

La SCI permet de transmettre des parts sociales progressivement, avec une décote de 10 à 15 % appliquée sur la valeur des parts (pour tenir compte des contraintes de la structure). Cette décote, combinée aux abattements, optimise significativement la transmission sur le long terme.

## Notre recommandation

La transmission d'un patrimoine immobilier parisien se prépare idéalement 10 à 20 ans à l'avance. Un entretien avec un notaire spécialisé en droit patrimonial est le premier pas — et souvent le plus rentable.

Pour aller plus loin : [SCI ou nom propre](/blog/sci-vs-nom-propre-paris) · [Fiscalité des revenus locatifs](/blog/fiscalite-revenus-locatifs-paris)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "24 février 2025",
    readTime: "5 min",
    wordCount: 1500,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "sci-vs-nom-propre-paris",
      "fiscalite-revenus-locatifs-paris",
      "investissement-locatif-paris-rentabilite",
    ],
  },

  {
    id: 13,
    ref: "S·07",
    slug: "8e-arrondissement-paris-marche-2025",
    category: "marche",
    tag: "Marché & tendances",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title: "Le 8e arrondissement en 2025 : analyse du marché et opportunités",
    excerpt:
      "Triangle d'Or, Monceau, Miromesnil : le 8ème concentre certaines des adresses les plus convoitées de Paris. Notre analyse du marché, secteur par secteur.",
    body: `
Le 8ème arrondissement occupe une place à part dans la géographie immobilière parisienne. Ses trois micro-marchés — le Triangle d'Or, le secteur Monceau et les abords de Miromesnil — obéissent à des dynamiques distinctes que tout acquéreur ou investisseur doit comprendre.

## Le Triangle d'Or : la valeur refuge absolue

Les avenues Montaigne, Georges V et les Champs-Élysées concentrent les prix les plus élevés du 8ème : 14 000 à 18 000 €/m² selon l'étage et les prestations. Ce micro-marché est quasi-insensible aux cycles — la demande internationale (américaine, britannique, proche-orientale) y est structurellement excédentaire par rapport à l'offre.

> **Prix médian 8ème (45 m²)** : ~549 000 € · Marge de négociation : 2 à 4 %

La correction 2022–2024 a été ici de −5 % seulement, contre −10 % en moyenne parisienne. Les biens correctement présentés se vendent en moins de 3 semaines.

## Le secteur Monceau : l'élégance discrète

Le quartier Monceau — autour du parc éponyme et des rues de Courcelles, de Prony et Miromesnil — offre un profil différent : immeubles haussmanniens de standing, clientèle française patrimoniale, vie de quartier préservée. Les prix sont 15 à 20 % inférieurs au Triangle d'Or, pour une qualité de vie souvent supérieure.

C'est ici que l'on trouve les meilleures opportunités du 8ème en 2025 : des biens bien situés, légèrement décotés par la correction, dans un secteur à la demande locative solide.

## Les Champs-Élysées : un marché de bureaux qui se résidentialise

La tendance lourde des dernières années : la conversion d'anciens immeubles de bureaux en logements de standing. Cette résidentialisation apporte une offre nouvelle et souvent de haute qualité technique (isolation, domotique), mais avec des charges de copropriété supérieures à la moyenne.

## Notre verdict 2025

Le 8ème reste un arrondissement de conservation du capital plus que de rendement. Le rendement brut y est l'un des plus faibles de Paris (3,2 à 3,8 %), mais la liquidité et la résilience des prix justifient ce positionnement pour les profils patrimoniaux.

Pour aller plus loin : [Quartiers de Paris où investir](/blog/quartiers-paris-investir-2025) · [Quel apport pour le 8ème](/blog/apport-achat-arrondissements-paris)
    `.trim(),
    author: "Lajoie Hind",
    authorRole: "Fondatrice & Directrice",
    authorInitials: "LH",
    date: "10 février 2025",
    readTime: "5 min",
    wordCount: 1500,
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "quartiers-paris-investir-2025",
      "apport-achat-arrondissements-paris",
      "marche-immobilier-paris-2025",
    ],
  },

  {
    id: 14,
    ref: "S·08",
    slug: "lmnp-paris-2025-rentable-reformes",
    category: "juridique",
    tag: "Juridique & fiscal",
    type: "calendrier",
    featured: false,
    published: false, // 🔒 Brouillon — non visible
    title:
      "LMNP à Paris en 2025 : est-ce encore rentable après les réformes fiscales ?",
    excerpt:
      "La loi de finances 2024 a modifié les règles du LMNP. Amortissements, plus-values, régime micro-BIC : ce qui change concrètement et ce qui reste avantageux.",
    body: `
Le statut de Loueur en Meublé Non Professionnel (LMNP) a longtemps été considéré comme l'outil fiscal optimal pour l'investissement locatif à Paris. Les réformes introduites par la loi de finances 2024 en ont modifié l'équilibre. Voici ce qui change et ce qui reste pertinent.

## Ce que le LMNP offrait avant 2024

Le LMNP permettait de déduire l'amortissement comptable du bien (hors terrain) sur 20 à 40 ans, réduisant mécaniquement le résultat imposable à quasi-zéro pendant des décennies. À la revente, la plus-value était calculée sur le prix d'acquisition initial — sans réintégration des amortissements. C'était, pour faire simple, le meilleur des deux mondes.

> **Chiffre clé** : un appartement parisien de 600 000 € pouvait générer ~18 000 €/an d'amortissement déductible, neutralisant quasi-intégralement les revenus locatifs.

## Ce que la loi de finances 2024 change

La principale modification : à la revente d'un bien LMNP, les amortissements déduits pendant la période de détention sont désormais réintégrés dans le calcul de la plus-value imposable. En clair : l'avantage fiscal de l'amortissement est désormais différé, pas supprimé.

Pour un investisseur qui conserve son bien 20 ou 30 ans, l'impact reste limité — l'effet de levier temporel de l'économie fiscale annuelle compense largement la réintégration future, actualisée.

## Ce qui reste avantageux

Le LMNP conserve des atouts réels en 2025 : la possibilité de déduire toutes les charges réelles (au réel simplifié), l'amortissement sur le mobilier (5 à 7 ans), et la déduction des intérêts d'emprunt. Pour un investisseur avec une TMI de 30 % ou plus, le LMNP reste supérieur à la location nue dans la grande majorité des configurations.

## Pour qui reste-t-il pertinent ?

Le LMNP est particulièrement adapté aux investisseurs qui envisagent une détention longue (10 ans minimum), qui ont une TMI de 30 % ou plus, et qui acceptent une gestion plus active (mobilier, entretien, gestion des rotations de locataires).

Pour aller plus loin : [Fiscalité des revenus locatifs](/blog/fiscalite-revenus-locatifs-paris) · [SCI ou nom propre](/blog/sci-vs-nom-propre-paris) · [Rendement locatif Paris](/blog/investissement-locatif-paris-rentabilite)
    `.trim(),
    author: "Dupon Levine",
    authorRole: "Associé — Patrimoine",
    authorInitials: "DL",
    date: "27 janvier 2025",
    readTime: "6 min",
    wordCount: 1600,
    image:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=700&q=70&fm=webp&auto=format",
    interlinks: [
      "fiscalite-revenus-locatifs-paris",
      "sci-vs-nom-propre-paris",
      "investissement-locatif-paris-rentabilite",
    ],
  },
];

// ─── Bénéfices du blog ────────────────────────────────────────────────────────
export const BLOG_BENEFITS = [
  {
    icon: "📈",
    title: "Comprendre",
    desc: "Décrypter le marché avec précision Tendances,prix,opportunités.",
  },
  {
    icon: "✨",
    title: "Valoriser",
    desc: "Un contenu riche,une ligne éditoriale soignée",
  },
  {
    icon: "🤝",
    title: "Audience récurrente",
    desc: "Une communauté qui se construiit dans la confiance.",
  },
];
