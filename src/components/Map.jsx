import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// Icône par défaut (corrige l’affichage des marqueurs)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function Map({ properties, center = [48.8566, 2.3522], zoom = 10 }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!properties.length) return;

    const map = L.map("map").setView(center, zoom);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);

    properties.forEach((property) => {
      // On devrait ajouter des coordonnées lat/lng dans properties.json
      // Pour l’instant, on simule avec un offset
      const lat = center[0] + (Math.random() - 0.5) * 0.05;
      const lng = center[1] + (Math.random() - 0.5) * 0.05;

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`
        <b>${property.title}</b><br/>
        ${property.city}<br/>
        ${property.price.toLocaleString("fr-FR")} €
        <br/>
        <a href="/biens/${property.id}" style="display:inline-block;margin-top:5px;background:#2563eb;color:white;padding:4px 8px;border-radius:8px;text-decoration:none;">Voir le bien</a>
      `);
    });

    return () => map.remove();
  }, [properties, center, zoom, navigate]);

  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "16px",
        marginBottom: "2rem",
      }}
    />
  );
}

export default Map;
