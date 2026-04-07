"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "maps",
      name: "Mapa",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/dashboard",
    },
    /*{
      id: "profile",
      name: "Perfil",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/profile",
    },
    {
      id: "favorites",
      name: "Favoritos",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      href: "/favorites",
    },*/
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6 fixed h-screen z-50">
      {/* Menu Button / Logo */}
      <Link
        href="/dashboard"
        className="text-gray-600 hover:text-gray-900 transition-colors p-2 mb-2"
      >
        <div className="text-2xl">🌤️</div>
      </Link>

      <div className="h-px w-12 bg-gray-200" />

      {/* Navigation Items */}
      <nav className="flex flex-col items-center space-y-4 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center relative transition-colors ${
              isActive(item.href)
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl mb-1 transition-colors ${
                isActive(item.href) ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.name}</span>

            {/* Active Indicator */}
            {isActive(item.href) && (
              <div className="absolute -right-6 top-0 w-1 h-12 bg-blue-600 rounded-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Settings at bottom */}
      <div className="h-px w-12 bg-gray-200" />

      <Link
        href="/settings"
        className={`flex flex-col items-center transition-colors ${
          isActive("/settings")
            ? "text-blue-600"
            : "text-gray-400 hover:text-gray-900"
        }`}
      >
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl mb-1 ${
            isActive("/settings") ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-xs font-medium">Config</span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={() => {
          // Aquí iría la lógica de logout
          console.log("Logout");
        }}
        className="flex flex-col items-center text-gray-400 hover:text-red-600 transition-colors"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-red-50 mb-1">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
        <span className="text-xs font-medium">Salir</span>
      </button>
    </aside>
  );
};

export default Sidebar;
