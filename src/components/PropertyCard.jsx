import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const imageUrl = property.images?.[0] || '/images/placeholder.jpg';
  const rooms = property.rooms || '?';
  const area = property.area || '?';

  return (
    <Link to ={`/biens/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.type}
        </div>

        {property.isExclusive && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            ⭐ Exclusivité
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition">
          {property.title}
        </h3>
        <p className="text-2xl font-bold text-blue-800 mb-2">
          {property.operation === 'Vente'
            ? `${property.price.toLocaleString('fr-FR')} €`
            : `${property.price} €/mois`}
        </p>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{area} m²</span>
          <span className="mx-2">•</span>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 7 7 7-7 2 2" />
          </svg>
          <span>{rooms} pièces</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{property.city}</span>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;

