


import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

function Home({ loading, error, filtered }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (filtered && filtered.length > 0) {
      const results = filtered.filter(property =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProperties(results);
    } else {
      setFilteredProperties(filtered);
    }
  }, [searchTerm, filtered]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-blue-600 animate-pulse">⏳ Chargement des biens...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 p-4">
        <p className="text-2xl mb-4">❌ Erreur : {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl overflow-hidden mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 py-20 px-6 sm:px-12 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Trouvez la <span className="text-yellow-300">maison</span> de vos rêves
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-100">
            Découvrez une sélection exclusive de biens d'exception, du studio au grand appartement, dans les meilleurs quartiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/achat"
              className="bg-white text-blue-900 font-semibold py-4 px-8 rounded-full shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
            >
              Voir les biens à vendre
            </a>
            <a
              href="/estimation"
              className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
            >
              Estimation gratuite
            </a>
          </div>
        </div>
      </section>

      
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Nos biens immobiliers</h2>
          <input
            type="text"
            placeholder="🔍 Rechercher par ville ou titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-full w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.location.href = '/'}
            className={`px-5 py-2 rounded-full font-medium transition ${
              true ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>
          
        </div>
      </section>

      {/* Grille des biens avec style mosaïque pro */}
      {!filteredProperties || filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Aucun bien trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
