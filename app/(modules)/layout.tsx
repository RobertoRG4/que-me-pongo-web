import Sidebar from "@/components/Sidebar";
import React from "react";

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-20 overflow-auto">{children}</main>
    </div>
  );
}
