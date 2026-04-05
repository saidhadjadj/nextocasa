


import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// Données de l’équipe (à adapter avec tes vraies photos)
const team = [
  {
    name: 'Jean Dupont',
    role: 'Fondateur & Agent immobilier',
    bio: 'Expert en transactions immobilières depuis 15 ans, Jean accompagne ses clients avec passion et rigueur.',
    image: '/images/team/jean.jpg' // place une vraie image dans public/images/team/
  },
  {
    name: 'Marie Martin',
    role: 'Conseillère en immobilier',
    bio: 'Spécialiste des quartiers résidentiels, Marie trouve le bien qui correspond parfaitement à vos envies.',
    image: '/images/team/marie.jpg'
  },
  {
    name: 'Pierre Lefebvre',
    role: 'Expert en estimation',
    bio: 'Pierre analyse le marché pour vous proposer l’estimation la plus juste de votre bien.',
    image: '/images/team/pierre.jpg'
  }
];

function About() {
  return (
    <>
      <Helmet>
        <title>NextoCasa — À propos de l’agence</title>
        <meta name="description" content="Découvrez notre agence immobilière NextoCasa : histoire, valeurs, équipe passionnée. Une approche humaine et professionnelle." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              À propos de <span className="text-blue-600">NextoCasa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre partenaire immobilier de confiance, expert dans les transactions immobilières et l’estimation de biens.
            </p>
          </div>

          {/* Notre histoire */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre histoire</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Fondée en 2020, NextoCasa est née de la passion de ses fondateurs pour l’immobilier et le service client d’exception. Notre mission est d’accompagner nos clients dans leurs projets de vie en leur proposant des biens de qualité, des conseils personnalisés et une transparence totale à chaque étape.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  En quelques années, nous sommes devenus un acteur incontournable de la région grâce à notre expertise locale et notre approche humaine.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Nos valeurs</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🤝</span>
                    <div>
                      <h4 className="font-bold text-lg">Confiance</h4>
                      <p className="text-gray-600">La transparence et l’écoute sont au cœur de nos relations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">✨</span>
                    <div>
                      <h4 className="font-bold text-lg">Excellence</h4>
                      <p className="text-gray-600">Nous sélectionnons avec soin chaque bien pour garantir qualité et authenticité.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🌍</span>
                    <div>
                      <h4 className="font-bold text-lg">Proximité</h4>
                      <p className="text-gray-600">Implantés localement, nous connaissons chaque quartier sur le bout des doigts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline (étapes clés) */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Notre parcours</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full hidden md:block"></div>
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center md:justify-between">
                  <div className="md:w-5/12 text-center md:text-right mb-6 md:mb-0">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <span className="text-blue-600 font-bold text-2xl">2020</span>
                      <h3 className="text-xl font-bold mt-2">Création de NextoCasa</h3>
                      <p className="text-gray-600 mt-2">L’agence ouvre ses portes avec une vision moderne de l’immobilier.</p>
                    </div>
                  </div>
                  <div className="relative z-10 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-md hidden md:flex">
                    1
                  </div>
                  <div className="md:w-5/12"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:justify-between">
                  <div className="md:w-5/12"></div>
                  <div className="relative z-10 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-md hidden md:flex">
                    2
                  </div>
                  <div className="md:w-5/12 text-center md:text-left mt-6 md:mt-0">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <span className="text-blue-600 font-bold text-2xl">2026</span>
                      <h3 className="text-xl font-bold mt-2">Lancement de notre plateforme digitale</h3>
                      <p className="text-gray-600 mt-2">Une expérience en ligne fluide pour nos clients.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:justify-between">
                  <div className="md:w-5/12 text-center md:text-right mb-6 md:mb-0">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <span className="text-blue-600 font-bold text-2xl">Aujourd’hui</span>
                      <h3 className="text-xl font-bold mt-2">Une équipe passionnée</h3>
                      <p className="text-gray-600 mt-2">Des experts à votre écoute pour réaliser vos projets immobiliers.</p>
                    </div>
                  </div>
                  <div className="relative z-10 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-md hidden md:flex">
                    3
                  </div>
                  <div className="md:w-5/12"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Équipe */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Notre équipe</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-6xl">👤</span>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à réaliser votre projet immobilier ?</h2>
            <p className="text-xl mb-8 opacity-90">Contactez notre équipe dès aujourd’hui pour un accompagnement personnalisé.</p>
            <Link
              to="/contact"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-4 px-10 rounded-full shadow-xl transition transform hover:scale-105"
            >
              📞 Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;