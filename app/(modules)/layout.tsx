"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";
import { usePathname } from "next/navigation";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-24 overflow-y-auto bg-gray-50/50 relative">
        {isDashboard ? (
          children
        ) : (
          <div className="p-4 md:p-8 pt-16 md:pt-8 w-full max-w-7xl mx-auto">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
