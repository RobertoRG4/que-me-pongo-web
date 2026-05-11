"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  video?: string;
  outfitImages: string[];
}

const HOT_OUTFIT = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&q=80"
];

const MILD_OUTFIT = [
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400&h=300&fit=crop&q=80"
];

const RAIN_OUTFIT = [
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=300&fit=crop&q=80"
];

const VIDEO = [
  "https://www.pexels.com/download/video/17853969/",
  "https://www.pexels.com/download/video/15809009/",
  "https://www.pexels.com/download/video/7443231/",
  "https://www.pexels.com/download/video/6312199/",
  "https://www.pexels.com/download/video/28097318/",
  "https://www.pexels.com/download/video/30514501/",
  "https://www.pexels.com/download/video/30893943/",
  ""

]

const statesWeatherData: { [key: string]: WeatherData } = {
  "Aguascalientes": {
    city: "Capital de Aguascalientes",
    state: "Aguascalientes",
    temperature: 16,
    condition: "Fresco",
    humidity: 32,
    windSpeed: 14,
    uvIndex: 8,
    recommendation: "",
    icon: "🌤️",
    lat: 21.8853,
    lng: -102.2916,
    outfitImages: [],
  },
  "Baja California": {
    city: "Capital de Baja California",
    state: "Baja California",
    temperature: 25,
    condition: "Parcialmente nublado",
    humidity: 55,
    windSpeed: 14,
    uvIndex: 4,
    recommendation: "",
    icon: "⛅",
    lat: 30.8406,
    lng: -115.2838,
    outfitImages: [],
  },
  "Baja California Sur": {
    city: "Capital de Baja California Sur",
    state: "Baja California Sur",
    temperature: 18,
    condition: "Fresco",
    humidity: 72,
    windSpeed: 9,
    uvIndex: 8,
    recommendation: "",
    icon: "🌤️",
    lat: 26.0444,
    lng: -111.6661,
    outfitImages: [],
  },
  "Campeche": {
    city: "Capital de Campeche",
    state: "Campeche",
    temperature: 17,
    condition: "Fresco",
    humidity: 38,
    windSpeed: 9,
    uvIndex: 7,
    recommendation: "",
    icon: "🌤️",
    lat: 19.8301,
    lng: -90.5349,
    outfitImages: [],
  },
  "Chiapas": {
    city: "Capital de Chiapas",
    state: "Chiapas",
    temperature: 21,
    condition: "Fresco",
    humidity: 79,
    windSpeed: 18,
    uvIndex: 5,
    recommendation: "",
    icon: "🌤️",
    lat: 16.7569,
    lng: -93.1292,
    outfitImages: [],
  },
  "Chihuahua": {
    city: "Capital de Chihuahua",
    state: "Chihuahua",
    temperature: 20,
    condition: "Fresco",
    humidity: 58,
    windSpeed: 17,
    uvIndex: 9,
    recommendation: "",
    icon: "🌤️",
    lat: 28.633,
    lng: -106.0691,
    outfitImages: [],
  },
  "CDMX": {
    city: "Capital de CDMX",
    state: "CDMX",
    temperature: 23,
    condition: "Parcialmente nublado",
    humidity: 47,
    windSpeed: 13,
    uvIndex: 5,
    recommendation: "",
    icon: "⛅",
    lat: 19.4326,
    lng: -99.1332,
    outfitImages: [],
  },
  "Coahuila": {
    city: "Capital de Coahuila",
    state: "Coahuila",
    temperature: 19,
    condition: "Fresco",
    humidity: 56,
    windSpeed: 10,
    uvIndex: 7,
    recommendation: "",
    icon: "🌤️",
    lat: 27.0587,
    lng: -101.7068,
    outfitImages: [],
  },
  "Colima": {
    city: "Capital de Colima",
    state: "Colima",
    temperature: 28,
    condition: "Parcialmente nublado",
    humidity: 35,
    windSpeed: 7,
    uvIndex: 3,
    recommendation: "",
    icon: "⛅",
    lat: 19.2452,
    lng: -103.7241,
    outfitImages: [],
  },
  "Durango": {
    city: "Capital de Durango",
    state: "Durango",
    temperature: 26,
    condition: "Parcialmente nublado",
    humidity: 74,
    windSpeed: 17,
    uvIndex: 9,
    recommendation: "",
    icon: "⛅",
    lat: 24.0277,
    lng: -104.6532,
    outfitImages: [],
  },
  "Guanajuato": {
    city: "Capital de Guanajuato",
    state: "Guanajuato",
    temperature: 27,
    condition: "Parcialmente nublado",
    humidity: 62,
    windSpeed: 7,
    uvIndex: 5,
    recommendation: "",
    icon: "⛅",
    lat: 21.019,
    lng: -101.2574,
    outfitImages: [],
  },
  "Guerrero": {
    city: "Capital de Guerrero",
    state: "Guerrero",
    temperature: 24,
    condition: "Parcialmente nublado",
    humidity: 61,
    windSpeed: 18,
    uvIndex: 3,
    recommendation: "",
    icon: "⛅",
    lat: 17.5516,
    lng: -99.501,
    outfitImages: [],
  },
  "Hidalgo": {
    city: "Capital de Hidalgo",
    state: "Hidalgo",
    temperature: 29,
    condition: "Parcialmente nublado",
    humidity: 46,
    windSpeed: 19,
    uvIndex: 3,
    recommendation: "",
    icon: "⛅",
    lat: 20.0911,
    lng: -98.7624,
    outfitImages: [],
  },
  "Jalisco": {
    city: "Capital de Jalisco",
    state: "Jalisco",
    temperature: 16,
    condition: "Fresco",
    humidity: 51,
    windSpeed: 6,
    uvIndex: 6,
    recommendation: "",
    icon: "🌤️",
    lat: 20.6597,
    lng: -103.3496,
    outfitImages: [],
  },
  "México": {
    city: "Capital de México",
    state: "México",
    temperature: 33,
    condition: "Soleado",
    humidity: 51,
    windSpeed: 5,
    uvIndex: 10,
    recommendation: "",
    icon: "☀️",
    lat: 19.2826,
    lng: -99.6557,
    outfitImages: [],
  },
  "Michoacán": {
    city: "Capital de Michoacán",
    state: "Michoacán",
    temperature: 24,
    condition: "Parcialmente nublado",
    humidity: 74,
    windSpeed: 14,
    uvIndex: 10,
    recommendation: "",
    icon: "⛅",
    lat: 19.5665,
    lng: -101.7068,
    outfitImages: [],
  },
  "Morelos": {
    city: "Capital de Morelos",
    state: "Morelos",
    temperature: 30,
    condition: "Parcialmente nublado",
    humidity: 47,
    windSpeed: 18,
    uvIndex: 9,
    recommendation: "",
    icon: "⛅",
    lat: 18.9261,
    lng: -99.2308,
    outfitImages: [],
  },
  "Nayarit": {
    city: "Capital de Nayarit",
    state: "Nayarit",
    temperature: 22,
    condition: "Fresco",
    humidity: 40,
    windSpeed: 19,
    uvIndex: 10,
    recommendation: "",
    icon: "🌤️",
    lat: 21.504,
    lng: -104.8947,
    outfitImages: [],
  },
  "Nuevo León": {
    city: "Capital de Nuevo León",
    state: "Nuevo León",
    temperature: 27,
    condition: "Parcialmente nublado",
    humidity: 68,
    windSpeed: 19,
    uvIndex: 5,
    recommendation: "",
    icon: "⛅",
    lat: 25.6866,
    lng: -100.3161,
    outfitImages: [],
  },
  "Oaxaca": {
    city: "Capital de Oaxaca",
    state: "Oaxaca",
    temperature: 27,
    condition: "Parcialmente nublado",
    humidity: 73,
    windSpeed: 14,
    uvIndex: 9,
    recommendation: "",
    icon: "⛅",
    lat: 17.0732,
    lng: -96.7266,
    outfitImages: [],
  },
  "Puebla": {
    city: "Capital de Puebla",
    state: "Puebla",
    temperature: 23,
    condition: "Parcialmente nublado",
    humidity: 38,
    windSpeed: 6,
    uvIndex: 6,
    recommendation: "",
    icon: "⛅",
    lat: 19.0414,
    lng: -98.2063,
    outfitImages: [],
  },
  "Querétaro": {
    city: "Capital de Querétaro",
    state: "Querétaro",
    temperature: 30,
    condition: "Parcialmente nublado",
    humidity: 77,
    windSpeed: 11,
    uvIndex: 8,
    recommendation: "",
    icon: "⛅",
    lat: 20.5888,
    lng: -100.3899,
    outfitImages: [],
  },
  "Quintana Roo": {
    city: "Capital de Quintana Roo",
    state: "Quintana Roo",
    temperature: 35,
    condition: "Soleado",
    humidity: 61,
    windSpeed: 18,
    uvIndex: 4,
    recommendation: "",
    icon: "☀️",
    lat: 19.582,
    lng: -87.732,
    outfitImages: [],
  },
  "San Luis Potosí": {
    city: "Capital de San Luis Potosí",
    state: "San Luis Potosí",
    temperature: 34,
    condition: "Soleado",
    humidity: 76,
    windSpeed: 17,
    uvIndex: 5,
    recommendation: "",
    icon: "☀️",
    lat: 22.1565,
    lng: -100.9855,
    outfitImages: [],
  },
  "Sinaloa": {
    city: "Capital de Sinaloa",
    state: "Sinaloa",
    temperature: 16,
    condition: "Fresco",
    humidity: 72,
    windSpeed: 19,
    uvIndex: 4,
    recommendation: "",
    icon: "🌤️",
    lat: 25.1721,
    lng: -107.4795,
    outfitImages: [],
  },
  "Sonora": {
    city: "Capital de Sonora",
    state: "Sonora",
    temperature: 22,
    condition: "Fresco",
    humidity: 55,
    windSpeed: 12,
    uvIndex: 3,
    recommendation: "",
    icon: "🌤️",
    lat: 29.073,
    lng: -110.9559,
    outfitImages: [],
  },
  "Tabasco": {
    city: "Capital de Tabasco",
    state: "Tabasco",
    temperature: 27,
    condition: "Parcialmente nublado",
    humidity: 49,
    windSpeed: 13,
    uvIndex: 6,
    recommendation: "",
    icon: "⛅",
    lat: 17.9895,
    lng: -92.9281,
    outfitImages: [],
  },
  "Tamaulipas": {
    city: "Capital de Tamaulipas",
    state: "Tamaulipas",
    temperature: 32,
    condition: "Soleado",
    humidity: 41,
    windSpeed: 12,
    uvIndex: 6,
    recommendation: "",
    icon: "☀️",
    lat: 24.2669,
    lng: -98.8363,
    outfitImages: [],
  },
  "Tlaxcala": {
    city: "Capital de Tlaxcala",
    state: "Tlaxcala",
    temperature: 27,
    condition: "Parcialmente nublado",
    humidity: 52,
    windSpeed: 12,
    uvIndex: 6,
    recommendation: "",
    icon: "⛅",
    lat: 19.3139,
    lng: -98.2404,
    outfitImages: [],
  },
  "Veracruz": {
    city: "Capital de Veracruz",
    state: "Veracruz",
    temperature: 18,
    condition: "Fresco",
    humidity: 58,
    windSpeed: 18,
    uvIndex: 6,
    recommendation: "",
    icon: "🌤️",
    lat: 19.1738,
    lng: -96.1342,
    outfitImages: [],
  },
  "Yucatán": {
    city: "Capital de Yucatán",
    state: "Yucatán",
    temperature: 26,
    condition: "Parcialmente nublado",
    humidity: 71,
    windSpeed: 11,
    uvIndex: 6,
    recommendation: "",
    icon: "⛅",
    lat: 20.9674,
    lng: -89.5926,
    outfitImages: [],
  },
  "Zacatecas": {
    city: "Capital de Zacatecas",
    state: "Zacatecas",
    temperature: 33,
    condition: "Soleado",
    humidity: 55,
    windSpeed: 13,
    uvIndex: 5,
    recommendation: "",
    icon: "☀️",
    lat: 22.7709,
    lng: -102.5832,
    outfitImages: [],
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
  const [showChart, setShowChart] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [outfitSlide, setOutfitSlide] = useState(0);

  const [dbRecommendations, setDbRecommendations] = useState<any[]>([]);

  // Video player states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoVolume, setVideoVolume] = useState(1);

  useEffect(() => {
    fetch('/que-me-pongo/api/recommendations')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setDbRecommendations(data);
        }
      })
      .catch(console.error);
  }, []);

  // ── Configuración de Datos para el Gráfico ───────────────────────────────────
  const activeStatesWeatherData = Object.values(statesWeatherData).filter(data =>
    dbRecommendations.some(r => r.state === data.state)
  );

  const chartLabels = activeStatesWeatherData.map(d => d.state);
  const chartTemperatures = activeStatesWeatherData.map(d => d.temperature);
  const chartHumidities = activeStatesWeatherData.map(d => d.humidity);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: chartTemperatures,
        backgroundColor: "rgba(239, 159, 39, 0.7)",
        borderColor: "rgb(239, 159, 39)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Humedad (%)",
        data: chartHumidities,
        backgroundColor: "rgba(24, 95, 165, 0.7)",
        borderColor: "rgb(24, 95, 165)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
    setMapLoaded(true);
  }, []);

  // ── Sincronizar Marcadores con DB ──────────────────────────────────────────
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !window.google) return;
    const map = mapInstanceRef.current;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Dibujar marcadores solo para los estados que tengan recomendaciones en la DB
    Object.entries(statesWeatherData).forEach(([key, data]) => {
      const stateRecs = dbRecommendations.filter(r => r.state === data.state);
      if (stateRecs.length === 0) return; // Si no hay recomendación para este estado, no mostrar marcador

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
        // Encontrar recomendación que coincida con la temperatura actual
        const matchedRec = stateRecs.find(r =>
          data.temperature >= r.minTemp &&
          data.temperature <= r.maxTemp
        );

        // Si la temperatura no cuadra perfectamente, mostramos la primera por defecto para no dejarlo vacío
        const recToUse = matchedRec || stateRecs[0];

        const mergedData = { ...data };
        mergedData.recommendation = recToUse.recommendation;
        mergedData.outfitImages = recToUse.images.length > 0 ? recToUse.images : [];

        setSelectedWeather(mergedData);
        setShowCard(true);
        setOutfitSlide(0); // Reiniciar el slider
        map.panTo({ lat: data.lat, lng: data.lng });
      });

      markersRef.current.push(marker);
    });
  }, [mapLoaded, dbRecommendations]);

  // ── Solicitar ubicación del usuario de forma independiente ──────────────────
  const requestLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLocationStatus("loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus("success");
        },
        (error) => {
          console.warn("Geolocalización denegada o falló:", error.message);
          setLocationStatus("error");
        }
      );
    } else {
      setLocationStatus("error");
    }
  }, []);

  // Pedir permisos automáticamente al entrar al Dashboard
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Actualizar el mapa cuando se obtenga la ubicación
  useEffect(() => {
    if (mapLoaded && userLocation && mapInstanceRef.current && window.google) {
      const map = mapInstanceRef.current;
      map.setCenter(userLocation);
      map.setZoom(12);

      new window.google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 10,
        },
        title: "Tu ubicación actual",
      });
    }
  }, [mapLoaded, userLocation]);

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

  // ── Video player handlers ───────────────────────────────────────────────
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const dur = v.duration || 0;
    v.currentTime = Math.max(0, Math.min(dur, v.currentTime + seconds));
  };

  const handleSeek = (clientX: number, rect: DOMRect) => {
    if (!videoRef.current || !videoDuration) return;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    videoRef.current.currentTime = pct * videoDuration;
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => setVideoProgress((v.currentTime / Math.max(1, v.duration)) * 100);
    const onMeta = () => setVideoDuration(v.duration || 0);
    const onEnded = () => setVideoPlaying(false);

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnded);
    };
  }, [showVideo, videoRef.current]);

  // Sync volume state with the actual video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.volume = videoVolume;
      v.muted = videoVolume === 0;
    } catch (e) { }
  }, [videoVolume]);

  // Close video with Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showVideo) {
        if (videoRef.current) videoRef.current.pause();
        setShowVideo(false);
        setVideoPlaying(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showVideo]);

  // Simple public URL resolver. Set NEXT_PUBLIC_BASE_PATH in env when using next.config.basePath.
  const appBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const publicUrl = (p: string) => {
    if (!p) return p;
    if (/^https?:\/\//.test(p)) return p; // external URL
    const path = p.startsWith("/") ? p : `/${p}`;
    return `${appBasePath}${path}`;
  };

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
        <div className="absolute bottom-6 right-6 w-[26rem] bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-white/80 animate-in slide-in-from-bottom-12 fade-in zoom-in-95 duration-700 ease-out z-10 ring-1 ring-black/5">
          {/* Close */}
          <button
            onClick={() => {
              setShowCard(false);
              setSelectedWeather(null);
            }}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 z-40"
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
          <div className={`bg-gradient-to-br ${headerColor} p-6 text-white relative overflow-hidden`}>
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold">{selectedWeather.city}</h3>
                <p className="text-white/80 text-sm">{selectedWeather.state}</p>
              </div>
              <div className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
                {selectedWeather.icon}
              </div>
            </div>
            {/* Info button placed below the names */}
            <div className="mt-2">
              <button
                onClick={() => {
                  if (selectedWeather?.video) {
                    setShowVideo(true);
                    setVideoProgress(0);
                    setVideoDuration(0);
                    setVideoPlaying(false);
                  } else {
                    alert("No hay video disponible para esta ciudad");
                  }
                }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                </svg>
                <span>Ver video</span>
              </button>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-black tracking-tighter drop-shadow-md">
                {selectedWeather.temperature}°
              </span>
              <span className="text-xl text-white/90 font-medium mb-3 tracking-wide">
                {selectedWeather.condition}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center p-3 rounded-2xl bg-white/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default border border-transparent hover:border-blue-100">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">💧</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Humedad</div>
                <div className="font-black text-gray-900 text-lg">
                  {selectedWeather.humidity}%
                </div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-white/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default border border-transparent hover:border-blue-100">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">🌬️</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Viento</div>
                <div className="font-black text-gray-900 text-lg">
                  {selectedWeather.windSpeed} <span className="text-xs font-semibold">km/h</span>
                </div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-white/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default border border-transparent hover:border-blue-100">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">☀️</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Índice UV</div>
                <div className="font-black text-gray-900 text-lg">
                  {selectedWeather.uvIndex}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm border border-emerald-100/50 rounded-2xl p-4 mb-5 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0 animate-bounce mt-1">👕</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 tracking-tight">
                    Recomendación
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {selectedWeather.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Outfit Slider */}
            {selectedWeather.outfitImages && selectedWeather.outfitImages.length > 0 && (
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-lg group aspect-[4/3] w-full ring-1 ring-black/5">
                {selectedWeather.outfitImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${idx === outfitSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-110"
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Outfit ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}

                {/* Slider Controls */}
                <button
                  onClick={() => setOutfitSlide((prev) => (prev === 0 ? selectedWeather.outfitImages.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 backdrop-blur-md p-2.5 rounded-full text-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg -translate-x-4 group-hover:translate-x-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button
                  onClick={() => setOutfitSlide((prev) => (prev === selectedWeather.outfitImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 backdrop-blur-md p-2.5 rounded-full text-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg translate-x-4 group-hover:translate-x-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {selectedWeather.outfitImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOutfitSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === outfitSlide ? "bg-white w-6 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/50 hover:bg-white/90 w-1.5"
                        }`}
                    />
                  ))}
                </div>
              </div>
            )}
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

      {/* Botón para abrir Gráfico (Canvas) */}
      {mapLoaded && (
        <button
          onClick={() => setShowChart(true)}
          className="absolute top-68 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 border border-gray-200 z-10 font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <span className="hidden sm:inline">Ver Estadísticas</span>
        </button>
      )}

      {/* Botón para solicitar Ubicación Manualmente */}
      {mapLoaded && (
        <button
          onClick={requestLocation}
          disabled={locationStatus === "loading"}
          className="absolute top-50 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 border border-gray-200 z-10 font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {locationStatus === "loading" ? (
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          )}
          <span className="hidden sm:inline">Mi Ubicación</span>
        </button>
      )}

      {/* Modal del Gráfico Canvas */}
      {showChart && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 relative flex flex-col h-[80vh]">
            <button
              onClick={() => setShowChart(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Comparativa de Estados</h2>
            <p className="text-gray-500 mb-6">Gráfico interactivo renderizado en Canvas</p>

            <div className="flex-1 w-full relative">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Video Modal (reproductor propio) */}
      {showVideo && selectedWeather && selectedWeather.video && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center p-4 md:p-8">
          <div className="bg-[#4169E1] rounded-3xl shadow-2xl w-full max-w-3xl p-4 relative">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                setShowVideo(false);
                setVideoPlaying(false);
              }}
              className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black relative">
              {/* If video is YouTube link, render iframe embed, otherwise use native video */}
              {selectedWeather.video && /youtu/.test(selectedWeather.video) ? (
                <iframe
                  className="w-full h-full"
                  src={selectedWeather.video.includes("embed") ? selectedWeather.video : `https://www.youtube.com/embed/${selectedWeather.video.split("/").pop()}`}
                  title={`Video ${selectedWeather.city}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={publicUrl(selectedWeather.video ?? "")}
                    className="w-full h-full object-cover bg-black"
                    playsInline
                    preload="metadata"
                  />

                  {/* Center play overlay when not playing */}
                  {!videoPlaying && (
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.play();
                          setVideoPlaying(true);
                        }
                      }}
                      className="absolute inset-0 m-auto w-20 h-20 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-30 transition-transform transform hover:scale-105"
                      aria-label="Reproducir video"
                    >
                      <svg className="w-8 h-8 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9L5 3z" /></svg>
                    </button>
                  )}

                  {/* Custom Controls for native video */}
                  <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => skip(-10)}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-white"
                        aria-label="Rebobinar 10s"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19V5l-8 7 8 7zM20 19V5l-8 7 8 7z" /></svg>
                      </button>

                      <button
                        onClick={toggleVideoPlay}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-white"
                        aria-label={videoPlaying ? "Pausar video" : "Reproducir video"}
                      >
                        {videoPlaying ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18V6m12 12V6" /></svg>
                        ) : (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9L5 3z" /></svg>
                        )}
                      </button>

                      <button
                        onClick={() => skip(10)}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-white"
                        aria-label="Adelantar 10s"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19v-14l8 7-8 7zM13 19V5l8 7-8 7z" /></svg>
                      </button>

                      <div className="flex-1 ml-3">
                        <div
                          className="h-2 bg-white/20 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            handleSeek((e as React.MouseEvent).clientX, rect);
                          }}
                        >
                          <div
                            className="h-2 bg-amber-400 rounded-full"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Simple volume control */}
                      <div className="flex items-center gap-2 ml-3">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" /></svg>
                        <input
                          aria-label="Volumen del video"
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={videoVolume}
                          onChange={(e) => setVideoVolume(Number(e.target.value))}
                          className="w-24 accent-amber-400"
                        />
                      </div>

                    </div>
                  </div>
                </>
              )}
            </div>


            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                  setShowVideo(false);
                  setVideoPlaying(false);
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
