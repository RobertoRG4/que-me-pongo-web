"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
};

// Default center: CDMX
const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

export default function MapaPage() {
  const [center, setCenter] = useState(defaultCenter);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Carga de API de Google Maps. 
  // Nota: Sin API_KEY mostrará un error en la consola y la marca de agua de desarrollo, 
  // pero cumplirá el objetivo de la tarea.
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Usa una key vacía para propósitos de desarrollo/demo
  });

  const getUserLocation = useCallback(() => {
    setLocationStatus("loading");
    setErrorMessage("");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      setErrorMessage("La geolocalización no es soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus("success");
      },
      (error) => {
        setLocationStatus("error");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("Permiso de ubicación denegado por el usuario.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Información de ubicación no disponible.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Tiempo de espera agotado al obtener ubicación.");
            break;
          default:
            setErrorMessage("Ha ocurrido un error desconocido.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
          Ubicación Geográfica
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Esta sección utiliza la <strong>API de Geolocalización de HTML5</strong> para obtener tus coordenadas exactas y las proyecta en un mapa usando <code>@react-google-maps/api</code>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={getUserLocation}
            disabled={locationStatus === "loading"}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
          >
            {locationStatus === "loading" ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            )}
            Obtener Mi Ubicación
          </button>
          
          {locationStatus === "success" && (
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 animate-in slide-in-from-left-4">
              <span className="font-medium">Coordenadas:</span> {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
            </div>
          )}
        </div>

        {locationStatus === "error" && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3 animate-in fade-in">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50 flex items-center justify-center">
          {loadError ? (
            <div className="p-8 text-center text-red-500">
              Error al cargar Google Maps.
            </div>
          ) : !isLoaded ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
               <svg className="animate-spin h-8 w-8 text-emerald-500 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cargando mapa...
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={locationStatus === "success" ? 14 : 10}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
              }}
            >
              {/* Marker at the found location or default */}
              <Marker 
                position={center} 
                animation={locationStatus === "success" ? window.google.maps.Animation.DROP : undefined}
              />
            </GoogleMap>
          )}

          {/* Overlay to explain developer mode if no API key */}
          {isLoaded && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
             <div className="absolute top-4 left-4 right-4 bg-yellow-50/90 backdrop-blur border border-yellow-200 text-yellow-800 p-3 rounded-lg text-xs md:text-sm shadow-lg pointer-events-none z-10 animate-in slide-in-from-top-4">
                <strong>Modo Desarrollo:</strong> El mapa se muestra con una marca de agua porque no se ha configurado la variable de entorno <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>. La funcionalidad de geolocalización sigue operando correctamente.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
