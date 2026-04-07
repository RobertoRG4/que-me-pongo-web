"use client";
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">
          ☁️
        </div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">
          🌤️
        </div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-20 animate-float">
          🌧️
        </div>
        <div className="absolute bottom-40 right-1/3 text-6xl opacity-20 animate-float-delayed">
          ⛅
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icono 404 */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-8xl">🌫️</span>
          <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            404
          </div>
          <span className="text-8xl">🌫️</span>
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ¡Clima Despejado, Página Perdida!
        </h1>

        {/* Descripción */}
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Parece que esta página se perdió en las nubes. No podemos encontrar el
          pronóstico que buscas.
        </p>

        {/* Card con información */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🧭</span>
            <h2 className="text-2xl font-semibold text-gray-800">
              ¿Te perdiste?
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            No te preocupes, aquí hay algunas opciones para volver al rumbo:
          </p>

          {/* Botones de navegación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Volver al Inicio
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-md hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Página Anterior
            </button>
          </div>
        </div>

        {/* Enlaces útiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🗺️", label: "Mapa", href: "/dashboard" },
            { icon: "👤", label: "Perfil", href: "/profile" },
            { icon: "⭐", label: "Favoritos", href: "/favorites" },
            { icon: "⚙️", label: "Ajustes", href: "/settings" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-4 transition-all hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {item.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Mensaje adicional */}
        <div className="mt-8 text-sm text-gray-500">
          ¿Necesitas ayuda? Contacta a{" "}
          <a
            href="mailto:soporte@quemepongomx.com"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            soporte@quemepongomx.com
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
