import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qué me pongo | Outfits según clima y ocasión - México",
  description:
    "Descubre qué ponerte hoy con recomendaciones de outfits personalizadas según el clima, la ocasión y tu estilo en México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
