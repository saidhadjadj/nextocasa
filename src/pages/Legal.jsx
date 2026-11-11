export default function Legal() {
  return (
    <div className="bg-[#f7f5f1] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="mb-10">
          <p className="text-xs tracking-[0.18em] uppercase text-stone-400 font-light mb-3">
            Informations légales
          </p>
          <h1 className="font-serif text-4xl font-light text-stone-800">
            Mentions légales
          </h1>
        </div>

        <div className="space-y-8 text-stone-600 font-light text-sm leading-relaxed">

          {/* Éditeur */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong className="font-medium text-stone-700">nextocasa.com</strong> est
              édité à titre personnel par son créateur, dans le cadre d'un projet
              de plateforme éditoriale indépendante dédiée au marché immobilier parisien.
            </p>
            <p className="mt-3">
              <strong className="font-medium text-stone-700">Hébergement :</strong>{" "}
              Vercel Inc. — 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis.{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"
                className="text-[#0022d2] hover:underline">vercel.com</a>
            </p>
          </section>

          {/* Nature du site */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              2. Nature du site — déclaration expresse
            </h2>
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <p className="text-stone-700">
                <strong className="font-medium">NextoCasa est une plateforme éditoriale indépendante.</strong>
              </p>
              <p className="mt-3">
                NextoCasa <strong className="font-medium text-stone-700">n'est pas une agence immobilière</strong>,
                ne détient pas la carte professionnelle T prévue par la loi Hoguet
                (loi n° 70-9 du 2 janvier 1970), et <strong className="font-medium text-stone-700">ne réalise
                aucune transaction immobilière</strong> — ni vente, ni achat, ni location,
                ni mise en relation entre acheteurs et vendeurs, ni mandat de quelque nature que ce soit.
              </p>
              <p className="mt-3">
                Les contenus publiés sur ce site — analyses de marché, guides pratiques,
                données chiffrées — sont fournis à titre <strong className="font-medium text-stone-700">purement informatif
                et éditorial</strong>. Ils ne constituent pas un conseil en investissement,
                une offre de service immobilier, ni une recommandation personnalisée.
              </p>
              <p className="mt-3">
                Pour tout projet immobilier, le lecteur est invité à consulter
                un professionnel titulaire de la carte T, un notaire ou un conseiller
                en gestion de patrimoine agréé.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus publiés sur nextocasa.com — textes, analyses,
              structures éditoriales — est la propriété exclusive de l'éditeur du site.
              Toute reproduction, même partielle, sans autorisation écrite préalable
              est interdite.
            </p>
            <p className="mt-3">
              Les données chiffrées citées dans les articles sont issues de sources
              officielles publiques (Notaires du Grand Paris, DVF/data.gouv.fr,
              Banque de France, INSEE, BCE) et sont mentionnées avec leur référence.
              Ces données appartiennent à leurs sources respectives.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              4. Données personnelles
            </h2>
            <p>
              NextoCasa ne collecte aucune donnée personnelle auprès de ses lecteurs : ni compte, ni formulaire, ni newsletter, ni commentaires.
            </p>
            <p className="mt-3">
              Comme tout site web, celui-ci repose sur des services techniques. L'hébergeur (Vercel) peut enregistrer des journaux de connexion standard (adresse IP, pages consultées), les articles sont servis par Sanity et certaines images par Unsplash : votre navigateur communique donc avec ces services lors de la consultation. L'éditeur n'exploite aucune de ces données à des fins publicitaires.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              5. Cookies
            </h2>
            <p>
              Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers.
              Des cookies techniques strictement nécessaires au fonctionnement
              du site peuvent être déposés.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              6. Limitation de responsabilité
            </h2>
            <p>
              Les analyses et informations publiées sur nextocasa.com sont rédigées
              avec soin et fondées sur des données officielles. Elles reflètent
              l'état du marché au moment de leur publication et peuvent évoluer.
            </p>
            <p className="mt-3">
              L'éditeur ne saurait être tenu responsable des décisions prises
              par les lecteurs sur la base des contenus publiés. Toute décision
              d'achat, de vente ou d'investissement immobilier doit être prise
              après consultation de professionnels qualifiés.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-serif text-xl font-light text-stone-800 mb-3 pb-2 border-b border-stone-200">
              7. Signalement et droit de réponse
            </h2>
            <p>
              Ce site est une publication éditoriale sans service client, sans formulaire de contact et sans adresse de messagerie publique. L'éditeur est une personne physique qui agit à titre non professionnel et qui a communiqué son identité à l'hébergeur (article 1), conformément à l'article 6 de la loi du 21 juin 2004 (LCEN). Toute demande d'ordre légal (signalement d'un contenu, droit de réponse) peut être adressée à l'hébergeur indiqué à l'article 1.
            </p>
          </section>

          <p className="text-stone-400 text-xs pt-4 border-t border-stone-200">
            Dernière mise à jour : novembre 2026
          </p>

        </div>
      </div>
    </div>
  );
}
