"use client";

import React, { useState } from "react";

export default function FormularioPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    // Message validation
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje no puede estar vacío.";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje es muy corto (mínimo 10 caracteres).";
    }

    // Terms validation
    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default HTML5 submission
    setSuccessMessage("");

    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage("¡Formulario enviado con éxito!");
        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
          aceptaTerminos: false,
        });
      }, 1500);
    } else {
      // Add a shake animation to the form if there are errors (we'll implement this via CSS class toggle if needed, or rely on individual error messages)
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold mb-2">Contacto</h1>
          <p className="text-blue-100">
            Llena el siguiente formulario para ponerte en contacto con nosotros. (Validación JS pura)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
          {successMessage && (
            <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.nombre ? "border-red-500 bg-red-50 focus:ring-red-500" : "border-gray-300 bg-gray-50 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
              placeholder="Ej. Juan Pérez"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1">{errors.nombre}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500 bg-red-50 focus:ring-red-500" : "border-gray-300 bg-gray-50 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.mensaje ? "border-red-500 bg-red-50 focus:ring-red-500" : "border-gray-300 bg-gray-50 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none`}
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1">{errors.mensaje}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  errors.aceptaTerminos ? "border-red-500 bg-red-50" : "border-gray-300 group-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600"
                }`}>
                  <svg className={`w-3 h-3 text-white transition-opacity ${formData.aceptaTerminos ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className={`text-sm select-none ${errors.aceptaTerminos ? "text-red-600 font-medium" : "text-gray-700"}`}>
                Acepto los términos y condiciones
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
