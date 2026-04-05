
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Icons = {
  Bath: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Bed: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 8v8h16V8" />
    </svg>
  ),
  Area: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16v14H4z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Email: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
};

function ImageGallery({ images }) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl flex items-center justify-center h-80 mb-8">
        <span className="text-gray-400">Aucune image disponible</span>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden group">
        <img
          src={images[selected]}
          alt={`Photo ${selected + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition"
              onClick={() => setSelected((selected - 1 + images.length) % images.length)}
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition"
              onClick={() => setSelected((selected + 1) % images.length)}
              aria-label="Image suivante"
            >
              ›
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((src, idx) => (
            <button
              key={idx}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-3 transition ${
                selected === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => setSelected(idx)}
              aria-label={`Voir la photo ${idx + 1}`}
            >
              <img
                src={src}
                alt={`Miniature ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 
function LocationMap({ address }) {
  if (!address) return null;
  const query = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden my-8 shadow-lg">
      <iframe
        src={src}
        title="Localisation"
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}


function SimilarProperties({ all, currentProperty }) {
  const navigate = useNavigate();

  const similars = useMemo(() => {
    if (!all || !currentProperty) return [];
    return all
      .filter(p => p.type === currentProperty.type && p.id !== currentProperty.id)
      .slice(0, 3);
  }, [all, currentProperty]);

  if (!similars.length) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Biens similaires</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {similars.map(property => (
          <div
            key={property.id}
            onClick={() => navigate(`/biens/${property.id}`)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={property.images?.[0] || '/placeholder.jpg'}
                alt={property.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2 truncate">{property.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Icons.Location />
                <span>{property.city}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-blue-600">
                  {property.operation === 'Vente'
                    ? `${property.price.toLocaleString('fr-FR')} €`
                    : `${property.price} €/mois`}
                </p>
                <span className="text-sm text-gray-500">{property.area} m²</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function PropertyDetail({ properties }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!properties) return;
    setLoading(true);
    const found = properties.find(p => String(p.id) === String(id));
    if (!found) {
      setError('Bien introuvable.');
      setProperty(null);
    } else {
      setProperty(found);
      setError('');
    }
    setLoading(false);
  }, [id, properties]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-blue-600 animate-pulse">⏳ Chargement des détails...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 p-4">
        <p className="text-2xl mb-4">❌ {error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!property) return null;

  const priceDisplay =
    property.operation === 'Vente'
      ? `${property.price.toLocaleString('fr-FR')} €`
      : `${property.price} €/mois`;

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => navigate('/')}
          className="group mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <Icons.ArrowLeft />
          <span>Retour à la liste</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Galerie */}
          <ImageGallery images={property.images} />

      
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icons.Location />
                  <span className="text-lg">{property.city}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-4xl font-bold text-blue-600">{priceDisplay}</p>
                <p className="text-sm text-gray-500 mt-1">{property.operation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2 text-blue-600">
                  <Icons.Area />
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.area} m²</p>
                <p className="text-sm text-gray-600">Surface</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2 text-blue-600">
                  <Icons.Bed />
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.rooms}</p>
                <p className="text-sm text-gray-600">Pièces</p>
              </div>
              {property.bedrooms && (
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2 text-blue-600">
                    <Icons.Bed />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                  <p className="text-sm text-gray-600">Chambres</p>
                </div>
              )}
              {property.bathrooms && (
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2 text-blue-600">
                    <Icons.Bath />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                  <p className="text-sm text-gray-600">Salles de bain</p>
                </div>
              )}
            </div>

            {property.description && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </section>
            )}

            {(property.floor || property.year || property.parking || property.cellar) && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Détails du bien</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.floor && (
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Étage</p>
                      <p className="text-xl font-bold">{property.floor}</p>
                    </div>
                  )}
                  {property.year && (
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Année</p>
                      <p className="text-xl font-bold">{property.year}</p>
                    </div>
                  )}
                  {property.parking && (
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Parking</p>
                      <p className="text-xl font-bold">✓ Inclus</p>
                    </div>
                  )}
                  {property.cellar && (
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Cave</p>
                      <p className="text-xl font-bold">✓ Inclus</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <LocationMap address={property.city} />

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => navigate('/contact')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3"
              >
                <Icons.Phone />
                Contacter l'agence
              </button>
              <button
                onClick={() => window.location.href = `mailto:contact@immoplus.fr?subject=${encodeURIComponent(`Question concernant ${property.title}`)}`}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl text-lg shadow hover:shadow-md transition flex items-center justify-center gap-3"
              >
                <Icons.Email />
                Envoyer un email
              </button>
            </div>
          </div>
        </div>

        <SimilarProperties all={properties} currentProperty={property} />
      </div>
    </main>
  );
}

export default PropertyDetail;