"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface WeatherData {
  city: string;
  state: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  recommendation: string;
  icon: string;
  lat: number;
  lng: number;
}

const statesWeatherData: { [key: string]: WeatherData } = {
  Oaxaca: {
    city: "Oaxaca de Juárez",
    state: "Oaxaca",
    temperature: 29,
    condition: "Lluvia",
    humidity: 42,
    windSpeed: 7,
    uvIndex: 29,
    recommendation:
      "Hace calor. Usa ropa fresca como playera de algodón, shorts o pantalón ligero.",
    icon: "🌧️",
    lat: 17.0732,
    lng: -96.7266,
  },
  CDMX: {
    city: "Ciudad de México",
    state: "CDMX",
    temperature: 22,
    condition: "Nublado",
    humidity: 55,
    windSpeed: 12,
    uvIndex: 15,
    recommendation:
      "Clima templado. Usa pantalón de mezclilla, camisa o playera manga larga.",
    icon: "☁️",
    lat: 19.4326,
    lng: -99.1332,
  },
  Jalisco: {
    city: "Guadalajara",
    state: "Jalisco",
    temperature: 26,
    condition: "Soleado",
    humidity: 35,
    windSpeed: 8,
    uvIndex: 45,
    recommendation:
      "Día soleado. Usa playera ligera, shorts y no olvides gorra y lentes de sol.",
    icon: "☀️",
    lat: 20.6597,
    lng: -103.3496,
  },
  "Nuevo León": {
    city: "Monterrey",
    state: "Nuevo León",
    temperature: 32,
    condition: "Muy caluroso",
    humidity: 28,
    windSpeed: 5,
    uvIndex: 52,
    recommendation:
      "Mucho calor. Usa ropa muy ligera, shorts, playera sin mangas y protector solar.",
    icon: "🔥",
    lat: 25.6866,
    lng: -100.3161,
  },
  "Baja California": {
    city: "Tijuana",
    state: "Baja California",
    temperature: 18,
    condition: "Fresco",
    humidity: 65,
    windSpeed: 15,
    uvIndex: 12,
    recommendation:
      "Clima fresco. Usa pantalón largo, sudadera o chamarra ligera.",
    icon: "🌤️",
    lat: 32.5149,
    lng: -117.0382,
  },
  Yucatán: {
    city: "Mérida",
    state: "Yucatán",
    temperature: 34,
    condition: "Soleado y húmedo",
    humidity: 70,
    windSpeed: 10,
    uvIndex: 60,
    recommendation:
      "Calor intenso y humedad. Ropa muy ligera de tela transpirable, sombrero y protector solar.",
    icon: "🌞",
    lat: 20.9674,
    lng: -89.5926,
  },
  Sonora: {
    city: "Hermosillo",
    state: "Sonora",
    temperature: 36,
    condition: "Extremo calor",
    humidity: 18,
    windSpeed: 6,
    uvIndex: 65,
    recommendation:
      "Calor extremo. Usa ropa blanca y muy ligera, evita salir entre 11am y 3pm.",
    icon: "☀️",
    lat: 29.0729,
    lng: -110.9559,
  },
  Veracruz: {
    city: "Veracruz",
    state: "Veracruz",
    temperature: 30,
    condition: "Parcialmente nublado",
    humidity: 80,
    windSpeed: 18,
    uvIndex: 35,
    recommendation:
      "Calor húmedo. Ropa ligera y transpirable. Lleva paraguas por si acaso.",
    icon: "⛅",
    lat: 19.1738,
    lng: -96.1342,
  },
  Chihuahua: {
    city: "Chihuahua",
    state: "Chihuahua",
    temperature: 28,
    condition: "Soleado",
    humidity: 22,
    windSpeed: 9,
    uvIndex: 48,
    recommendation:
      "Día caluroso y seco. Usa ropa ligera, protector solar y mantente hidratado.",
    icon: "☀️",
    lat: 28.6329,
    lng: -106.0691,
  },
  Quintana_Roo: {
    city: "Cancún",
    state: "Quintana Roo",
    temperature: 33,
    condition: "Tropical",
    humidity: 85,
    windSpeed: 14,
    uvIndex: 70,
    recommendation:
      "Clima tropical intenso. Ropa de playa, protector solar alto y mucha agua.",
    icon: "🌴",
    lat: 21.1619,
    lng: -86.8515,
  },
};

// ─── Mapa de estilos personalizado (estilo limpio sin POIs) ───────────────────
const MAP_STYLES = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a2daf2" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f0" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4a90d9" }, { weight: 1.5 }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#185FA5" }, { weight: 0.8 }],
  },
];

const DashboardPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(
    null,
  );
  const [showCard, setShowCard] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // ── Inicializar mapa ────────────────────────────────────────────────────────
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.6345, lng: -102.5528 },
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      mapTypeId: "roadmap",
      styles: MAP_STYLES,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapInstanceRef.current = map;

    // ── Marcadores por estado ────────────────────────────────────────────────
    Object.entries(statesWeatherData).forEach(([key, data]) => {
      const tempColor =
        data.temperature >= 32
          ? "#E24B4A"
          : data.temperature >= 26
            ? "#EF9F27"
            : data.temperature >= 20
              ? "#185FA5"
              : "#1D9E75";

      const svgMarker = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: tempColor,
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 22,
      };

      const marker = new window.google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map,
        icon: svgMarker,
        label: {
          text: `${data.temperature}°`,
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "500",
        },
        title: data.city,
      });

      marker.addListener("click", () => {
        setSelectedWeather(data);
        setShowCard(true);
        map.panTo({ lat: data.lat, lng: data.lng });
      });

      markersRef.current.push(marker);
    });

    setMapLoaded(true);
  }, []);

  // ── Cargar SDK de Google Maps ────────────────────────────────────────────────
  useEffect(() => {
    // ⚠️  REEMPLAZA 'YOUR_API_KEY' con tu Google Maps API key
    const API_KEY = "AIzaSyACXptMqnheiB_WDXa9fjyhjG4NjMzt9iw";

    if (window.google) {
      initMap();
      return;
    }

    window.initMap = initMap;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&language=es&region=MX`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [initMap]);

  // ── Color del header según temperatura ──────────────────────────────────────
  const headerColor = selectedWeather
    ? selectedWeather.temperature >= 32
      ? "from-red-500 to-orange-500"
      : selectedWeather.temperature >= 26
        ? "from-orange-400 to-amber-500"
        : selectedWeather.temperature >= 20
          ? "from-blue-500 to-blue-600"
          : "from-teal-500 to-cyan-600"
    : "from-blue-500 to-blue-600";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Google Map container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
          <div className="text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <p className="text-gray-600 font-medium">Cargando mapa...</p>
            <p className="text-gray-400 text-sm mt-1">
              Inicializando Google Maps
            </p>
          </div>
        </div>
      )}

      {/* Weather Card */}
      {showCard && selectedWeather && (
        <div className="absolute bottom-6 right-6 w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-slideIn z-10">
          {/* Close */}
          <button
            onClick={() => {
              setShowCard(false);
              setSelectedWeather(null);
            }}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className={`bg-gradient-to-br ${headerColor} p-6 text-white`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedWeather.city}</h3>
                <p className="text-white/80 text-sm">{selectedWeather.state}</p>
              </div>
              <div className="text-5xl">{selectedWeather.icon}</div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-bold">
                {selectedWeather.temperature}°
              </span>
              <span className="text-xl text-white/80 mb-2">
                {selectedWeather.condition}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-1">💧</div>
                <div className="text-sm text-gray-500">Humedad</div>
                <div className="font-semibold text-gray-900">
                  {selectedWeather.humidity}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🌬️</div>
                <div className="text-sm text-gray-500">Viento</div>
                <div className="font-semibold text-gray-900">
                  {selectedWeather.windSpeed} km/h
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">☀️</div>
                <div className="text-sm text-gray-500">Índice UV</div>
                <div className="font-semibold text-gray-900">
                  {selectedWeather.uvIndex}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">👕</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Recomendación
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedWeather.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg">
              Ver outfit completo
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      {mapLoaded && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 border border-gray-200 z-10">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Temperatura
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { color: "#E24B4A", label: "≥ 32° Mucho calor" },
              { color: "#EF9F27", label: "26–31° Caluroso" },
              { color: "#185FA5", label: "20–25° Templado" },
              { color: "#1D9E75", label: "< 20° Fresco" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
