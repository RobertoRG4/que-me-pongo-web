"use client";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/que-me-pongo/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error al iniciar sesión');
        setIsLoading(false);
        return;
      }

      // Redirigir según el rol
      if (data.user.role === 'ADMIN') {
        globalThis.location.href = "/que-me-pongo/panel";
      } else {
        globalThis.location.href = "/que-me-pongo/dashboard";
      }
    } catch (err) {
      setError("Error de red. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (email) {
      alert(`Se enviará un enlace de recuperación a: ${email}`);
    } else {
      alert("Por favor ingresa tu correo electrónico primero");
    }
  };

  const handleSignup = () => {
    globalThis.location.href = "/que-me-pongo/register";
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Panel Izquierdo - Animado y Moderno */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-[#050B14] justify-center items-center">
        
        {/* Pro Animated Aurora/Fluid Background */}
        <div className="absolute -inset-[100%] opacity-80">
          <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] animate-fluid-1"></div>
          <div className="absolute top-[40%] right-[30%] w-[35vw] h-[35vw] bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] animate-fluid-2"></div>
          <div className="absolute bottom-[30%] left-[40%] w-[45vw] h-[45vw] bg-violet-700 rounded-full mix-blend-screen filter blur-[80px] animate-fluid-3"></div>
        </div>
        
        {/* Glass Overlay para oscurecer y proteger el contraste del texto */}
        <div className="absolute inset-0 bg-[#050B14]/60 backdrop-blur-[40px] z-0"></div>

        {/* Shooting Stars / Rayos de luz - Tonos suaves */}
        <div className="absolute top-0 left-1/4 w-[250px] h-[1px] bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent opacity-0 animate-shooting-star" style={{ transform: "rotate(-45deg)" }}></div>
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[1px] bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent opacity-0 animate-shooting-star" style={{ transform: "rotate(-45deg)", animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-1/2 left-0 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-violet-300/50 to-transparent opacity-0 animate-shooting-star" style={{ transform: "rotate(-45deg)", animationDelay: "3s" }}></div>
        <div className="absolute top-3/4 right-1/4 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-teal-300/50 to-transparent opacity-0 animate-shooting-star" style={{ transform: "rotate(-45deg)", animationDelay: "4.5s" }}></div>

        {/* Patrón de malla fina pro */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-40 z-0" style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}></div>

        <div className="relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000 w-full">
          <div className="flex flex-col justify-center px-16 text-white max-w-xl mx-auto animate-float">
            {/* Logo */}
            <div className="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-4xl mb-10 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-110 hover:bg-white/10 transition-all duration-500 cursor-default">
              🌤️
            </div>

            {/* Título */}
            <h1 className="text-5xl font-black mb-6 tracking-tight leading-tight">
              Descubre tu estilo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 animate-gradient-x">
                según el clima
              </span>
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-md">
              Planifica tu outfit con inteligencia meteorológica. Datos en tiempo real para mantenerte fresco, abrigado y con estilo en México.
            </p>

            {/* Features Restaurados y Mejorados */}
            <div className="space-y-6 w-full">
              {[
                {
                  icon: "🗺️",
                  title: "Mapa Interactivo",
                  desc: "Explora el clima en cualquier estado del país al instante",
                  delay: "0.2s",
                },
                {
                  icon: "👕",
                  title: "Recomendaciones Smart",
                  desc: "Sugerencias de prendas adaptadas a la temperatura actual",
                  delay: "0.4s",
                },
                {
                  icon: "📊",
                  title: "Estadísticas Precisas",
                  desc: "Humedad, viento e índice UV para que nada te sorprenda",
                  delay: "0.6s",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center opacity-0 animate-fadeInUp group p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  style={{
                    animationDelay: feature.delay,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mr-5 text-2xl flex-shrink-0 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1 tracking-wide group-hover:text-emerald-300 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho - Formulario */}
      <div className="flex-1 flex justify-center items-center p-10 bg-white relative">
        <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000">
          
          {/* Logo Móvil */}
          <div className="lg:hidden w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto shadow-inner">
            🌤️
          </div>

          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              Bienvenido
            </h2>
            <p className="text-slate-500 font-medium">
              Ingresa tus credenciales para continuar a al panel de administración.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-blue-600"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none group-focus-within:text-blue-500 transition-colors">
                  ✉️
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="nombre@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-blue-600"
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none group-focus-within:text-blue-500 transition-colors">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-2 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold text-base tracking-wide shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 transition-all duration-300 ${isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-1"
                } relative overflow-hidden group`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
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
                "Ingresar al Panel de Administración"
              )}
            </button>
          </form>

          
            {/*<div className="text-center text-sm text-slate-500 pt-10 flex justify-center gap-2 font-medium">
            ¿Aún no tienes una cuenta?
            <button
              onClick={handleSignup}
              className="text-blue-600 hover:text-blue-800 font-bold transition-colors hover:underline"
            >
              Regístrate aquí
            </button>
          </div>/*/}
        </div>
      </div>

      <style>{`
        @keyframes fluid-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30%, -30%) scale(1.3); }
          66% { transform: translate(-25%, 25%) scale(0.8); }
        }
        @keyframes fluid-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30%, 30%) scale(0.8); }
          66% { transform: translate(30%, -25%) scale(1.3); }
        }
        @keyframes fluid-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(25%, 30%) scale(1.4); }
          66% { transform: translate(-30%, -30%) scale(0.7); }
        }
        .animate-fluid-1 { animation: fluid-1 8s ease-in-out infinite; }
        .animate-fluid-2 { animation: fluid-2 10s ease-in-out infinite; }
        .animate-fluid-3 { animation: fluid-3 12s ease-in-out infinite; }

        @keyframes shooting-star {
          0% { transform: translateX(-500px) translateY(-500px) rotate(-45deg); opacity: 0; }
          2% { opacity: 1; }
          8% { transform: translateX(1200px) translateY(1200px) rotate(-45deg); opacity: 0; }
          100% { transform: translateX(1200px) translateY(1200px) rotate(-45deg); opacity: 0; }
        }
        .animate-shooting-star {
          animation: shooting-star 5s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 2s linear infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
