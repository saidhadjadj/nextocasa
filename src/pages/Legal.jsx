


function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Mentions légales</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800">
          ⚠️ Cette page est un espace réservé destiné à recueillir les mentions légales de l'agence immobilière. 
          Il s'agit d'un modèle de démonstration ; les informations ci-dessous sont à compléter par l'agence lors d'une mise en production réelle.
        </p>
      </div>

      <p className="text-gray-700 mb-4">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), 
        le propriétaire du site devra renseigner les informations suivantes avant toute mise en ligne officielle :
      </p>

      <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
        <li><strong>Identité de l'éditeur</strong> : nom ou raison sociale, adresse, numéro de téléphone, adresse e-mail.</li>
        <li><strong>Numéro d'immatriculation</strong> (SIREN, SIRET, RCS) le cas échéant.</li>
        <li><strong>Directeur de la publication</strong> : nom du responsable.</li>
        <li><strong>Hébergement</strong> : nom, adresse et coordonnées de l'hébergeur.</li>
        <li><strong>Activité réglementée</strong> : pour une agence immobilière, mention de l'inscription au registre des agents immobiliers (si applicable).</li>
      </ul>

      <p className="text-gray-700">
        Ce site est une démonstration technique réalisée dans le cadre d'un projet de développement. 
      </p>
    </div>
  );
}

export default Legal;