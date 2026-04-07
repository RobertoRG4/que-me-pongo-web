"use client";

import React, { useState } from "react";
import Image from "next/image";

interface OutfitRecommendation {
  id: string;
  state: string;
  minTemp: number;
  maxTemp: number;
  recommendation: string;
  images: string[];
  createdAt: Date;
}

const AdminPanel: React.FC = () => {
  const [recommendations, setRecommendations] = useState<
    OutfitRecommendation[]
  >([
    {
      id: "1",
      state: "Oaxaca",
      minTemp: 25,
      maxTemp: 35,
      recommendation:
        "Hace calor. Usa ropa fresca como playera de algodón, shorts o pantalón ligero.",
      images: [],
      createdAt: new Date(),
    },
    {
      id: "2",
      state: "CDMX",
      minTemp: 18,
      maxTemp: 24,
      recommendation:
        "Clima templado. Usa pantalón de mezclilla, camisa o playera manga larga.",
      images: [],
      createdAt: new Date(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    state: "",
    minTemp: "",
    maxTemp: "",
    recommendation: "",
    images: [] as string[],
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const mexicanStates = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "CDMX",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        newImages.push(result);
        if (newImages.length === files.length) {
          setUploadedImages([...uploadedImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const openModal = (recommendation?: OutfitRecommendation) => {
    if (recommendation) {
      setEditingId(recommendation.id);
      setFormData({
        state: recommendation.state,
        minTemp: recommendation.minTemp.toString(),
        maxTemp: recommendation.maxTemp.toString(),
        recommendation: recommendation.recommendation,
        images: recommendation.images,
      });
      setUploadedImages(recommendation.images);
    } else {
      setEditingId(null);
      setFormData({
        state: "",
        minTemp: "",
        maxTemp: "",
        recommendation: "",
        images: [],
      });
      setUploadedImages([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      state: "",
      minTemp: "",
      maxTemp: "",
      recommendation: "",
      images: [],
    });
    setUploadedImages([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecommendation: OutfitRecommendation = {
      id: editingId || Date.now().toString(),
      state: formData.state,
      minTemp: parseFloat(formData.minTemp),
      maxTemp: parseFloat(formData.maxTemp),
      recommendation: formData.recommendation,
      images: uploadedImages,
      createdAt: new Date(),
    };

    if (editingId) {
      setRecommendations(
        recommendations.map((rec) =>
          rec.id === editingId ? newRecommendation : rec,
        ),
      );
    } else {
      setRecommendations([...recommendations, newRecommendation]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta recomendación?")) {
      setRecommendations(recommendations.filter((rec) => rec.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-4xl">⚙️</span>
              Panel de Administración
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona las recomendaciones de outfit por estado y temperatura
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg flex items-center gap-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Recomendación
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Total Recomendaciones
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {recommendations.length}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Estados Cubiertos</p>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(recommendations.map((r) => r.state)).size}
              </p>
            </div>
            <div className="text-4xl">🗺️</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Imágenes Subidas</p>
              <p className="text-3xl font-bold text-gray-900">
                {recommendations.reduce(
                  (acc, rec) => acc + rec.images.length,
                  0,
                )}
              </p>
            </div>
            <div className="text-4xl">🖼️</div>
          </div>
        </div>
      </div>

      {/* Recommendations Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rango Temperatura
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Recomendación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Imágenes
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recommendations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-6xl">📭</span>
                        <p className="text-gray-500 font-medium">
                          No hay recomendaciones aún
                        </p>
                        <p className="text-sm text-gray-400">
                          Crea tu primera recomendación haciendo clic en el
                          botón de arriba
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recommendations.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🏙️</span>
                          <span className="font-medium text-gray-900">
                            {rec.state}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🌡️</span>
                          <span className="text-gray-700 font-semibold">
                            {rec.minTemp}° - {rec.maxTemp}°
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                          {rec.recommendation}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {rec.images.length > 0 ? (
                            <>
                              <div className="flex -space-x-2">
                                {rec.images.slice(0, 3).map((img, idx) => (
                                  <div
                                    key={idx}
                                    className="w-10 h-10 rounded-lg border-2 border-white overflow-hidden bg-gray-100"
                                  >
                                    <img
                                      src={img}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                              {rec.images.length > 3 && (
                                <span className="text-xs text-gray-500 font-medium">
                                  +{rec.images.length - 3}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Sin imágenes
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(rec)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(rec.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">{editingId ? "✏️" : "➕"}</span>
                {editingId ? "Editar Recomendación" : "Nueva Recomendación"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                >
                  <option value="">Selecciona un estado</option>
                  {mexicanStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rango de Temperatura */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Temperatura Mínima (°C){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.minTemp}
                    onChange={(e) =>
                      setFormData({ ...formData, minTemp: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Ej: 18"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Temperatura Máxima (°C){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.maxTemp}
                    onChange={(e) =>
                      setFormData({ ...formData, maxTemp: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Ej: 25"
                    required
                  />
                </div>
              </div>

              {/* Recomendación */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recomendación de Outfit{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.recommendation}
                  onChange={(e) =>
                    setFormData({ ...formData, recommendation: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                  placeholder="Ej: Hace calor. Usa ropa fresca como playera de algodón, shorts o pantalón ligero."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Escribe una recomendación clara y útil para el usuario
                </p>
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imágenes de Referencia (Opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl">📸</span>
                      <span className="text-sm font-medium text-gray-700">
                        Haz clic para subir imágenes
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, WEBP hasta 5MB
                      </span>
                    </div>
                  </label>
                </div>

                {/* Preview Images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
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
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                >
                  {editingId ? "Actualizar" : "Crear"} Recomendación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
