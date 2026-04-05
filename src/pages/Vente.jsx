
import { Link } from 'react-router-dom';

const Icons = {
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Euro: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Document: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

function Vente() {
  const steps = [
    {
      icon: Icons.Home,
      title: "Estimation gratuite",
      description: "Nos experts évaluent votre bien sans engagement, en se basant sur une analyse approfondie du marché local."
    },
    {
      icon: Icons.Euro,
      title: "Fixation du prix",
      description: "Nous déterminons ensemble le prix optimal pour une vente rapide au meilleur prix."
    },
    {
      icon: Icons.Chart,
      title: "Mise en marché",
      description: "Votre bien est diffusé sur toutes les grandes plateformes immobilières et notre réseau d'acheteurs."
    },
    {
      icon: Icons.Document,
      title: "Accompagnement juridique",
      description: "Nous vous guidons à travers toutes les étapes administratives et juridiques jusqu'à la signature."
    }
  ];

  const benefits = [
    "Estimation gratuite et sans engagement",
    "Visites organisées par nos soins",
    "Accompagnement juridique et administratif",
    "Diffusion sur les plus grandes plateformes",
    "Réseau d'acheteurs qualifiés",
    "Suivi personnalisé jusqu'à la vente"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Vendez votre bien avec <span className="text-yellow-300">NextoCasa</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-100">
            Confiez-nous la vente de votre appartement, maison ou local commercial. Notre équipe d'experts vous accompagne à chaque étape.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-yellow-300 transition transform hover:scale-105"
          >
            <Icons.Phone />
            Contactez-nous pour une estimation
          </Link>
        </div>
      </section>

      {/* Notre approche */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre approche en 4 étapes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple et transparent pour vendre votre bien dans les meilleures conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="mb-6 text-blue-600">
                <step.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi nous confier votre vente ?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chez NextoCasa, nous mettons toute notre expertise à votre service pour une vente rapide et au meilleur prix. Notre équipe d'experts vous accompagne à chaque étape avec transparence et professionnalisme.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">
                      <Icons.Check />
                    </span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Une équipe à votre écoute</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nos conseillers sont disponibles 7j/7 pour répondre à toutes vos questions et vous accompagner dans votre projet de vente.
              </p>
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/agent1.jpg"
                    alt="Jean Dupont"
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/64'}
                  />
                  <div>
                    <h4 className="font-bold text-lg">Jean Dupont</h4>
                    <p className="text-sm text-gray-600">Expert en vente</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Notre priorité : vous offrir un service personnalisé et transparent pour une vente réussie."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prêt à vendre votre bien ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous dès maintenant pour une estimation gratuite et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Demander une estimation
            </Link>
            <Link
              to="/estimation"
              className="bg-white text-blue-600 font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 border-2 border-blue-600"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vente;