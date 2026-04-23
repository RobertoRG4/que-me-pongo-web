"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      id: "formulario",
      name: "Contacto",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: "/formulario",
    },
    {
      id: "multimedia",
      name: "Multimedia",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/multimedia",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-md shadow-md text-gray-600 hover:text-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[40] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed h-screen z-50 w-24 bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col items-center py-6 space-y-6 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform p-2 mb-2"
        >
          <div className="text-3xl">🚀</div>
        </Link>

        <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Navigation Items */}
        <nav className="flex flex-col items-center space-y-4 flex-1 w-full">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex flex-col items-center relative w-full group transition-all duration-300 ${isActive(item.href)
                ? "text-blue-600"
                : "text-gray-400 hover:text-blue-500"
                }`}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-1 transition-all duration-300 ${isActive(item.href)
                  ? "bg-blue-100 shadow-inner shadow-blue-200/50 scale-105"
                  : "group-hover:bg-gray-50 group-hover:scale-105"
                  }`}
              >
                <div className={`${isActive(item.href) ? "animate-pulse" : "group-hover:animate-bounce"}`}>
                  {item.icon}
                </div>
              </div>
              <span className="text-[10px] font-semibold tracking-wide uppercase">{item.name}</span>

              {/* Active Indicator */}
              {isActive(item.href) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 rounded-r-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Logout Button */}
        <button
          onClick={() => {
            window.location.href = "/que-me-pongo/login";
          }}
          className="flex flex-col items-center w-full group text-gray-400 hover:text-red-500 transition-colors"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl group-hover:bg-red-50 mb-1 transition-all group-hover:scale-105 group-hover:rotate-12">
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
          <span className="text-[10px] font-semibold tracking-wide uppercase">Salir</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
