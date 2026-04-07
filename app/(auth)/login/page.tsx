"use client";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    setIsLoading(true);
    if (email === "admin@admin.com" && password === "admin") {
      setTimeout(() => {
        console.log("Login attempt:", { email, password, remember });
        globalThis.location.href = "/que-me-pongo/panel";
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        console.log("Login attempt:", { email, password, remember });
        globalThis.location.href = "/que-me-pongo/";
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Iniciar sesión con ${provider} - Funcionalidad próximamente`);
  };

  const handleForgotPassword = () => {
    if (email) {
      alert(`Se enviará un enlace de recuperación a: ${email}`);
    } else {
      alert("Por favor ingresa tu correo electrónico primero");
    }
  };

  const handleSignup = () => {
    alert("Redirigiendo a página de registro...");
    // window.location.href = '/registro';
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Panel Izquierdo */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-slate-800 to-blue-500 relative overflow-hidden">
        {/* Patrón de fondo animado */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "movePattern 20s linear infinite",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center px-16 text-white max-w-md mx-auto">
          {/* Logo */}
          <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl mb-8 border-2 border-white/20">
            🌤️
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-5 tracking-tight">
            Que Me Pongo MX
          </h1>
          <p className="text-lg text-center opacity-95 font-light leading-relaxed mb-12">
            Descubre el outfit perfecto según el clima de tu ciudad. Planifica
            tu estilo con inteligencia meteorológica.
          </p>

          {/* Features */}
          <div className="space-y-5 w-full">
            {/*[
              {
                icon: "🗺️",
                title: "Mapa Interactivo",
                desc: "Selecciona cualquier estado de México",
                delay: "0.2s",
              },
              {
                icon: "🌡️",
                title: "Clima en Tiempo Real",
                desc: "Información actualizada al instante",
                delay: "0.4s",
              },
              {
                icon: "👔",
                title: "Recomendaciones Personalizadas",
                desc: "Sugerencias de vestimenta inteligentes",
                delay: "0.6s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: feature.delay,
                  animationFillMode: "forwards",
                }}
              >
                <div className="w-11 h-11 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 text-xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.desc}</p>
                </div>
              </div>
            ))*/}
          </div>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="flex-1 flex justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-600 text-sm">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                  ✉️
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="nombre@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors p-1"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 bg-gradient-to-r from-blue-500 to-slate-800 text-white rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all ${
                isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/35"
              } ${isLoading ? "relative" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 pt-10 flex justify-center gap-2">
            ¿No tienes una cuenta?
            <button
              onClick={handleSignup}
              className="text-blue-500 hover:text-blue-700 font-semibold transition-colors"
            >
              Regístrate gratis
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes movePattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
