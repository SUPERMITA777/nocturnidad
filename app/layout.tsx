import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nocturnidad Segura - Florencio Varela | Proyecto de Ordenanza",
  description:
    "Sumá tu firma al proyecto de modificación de la Ordenanza N.º 10.339/23 para reconocer los Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos, impulsar la cultura, gastronomía y el trabajo local en Florencio Varela.",
  keywords: [
    "Florencio Varela",
    "nocturnidad",
    "ordenanza 10.339/23",
    "usos mixtos",
    "espacios culturales",
    "gastronomia",
    "musica en vivo",
    "participación ciudadana",
    "HCD",
    "Concejo Deliberante",
    "trabajo local",
  ],
  openGraph: {
    title: "Nocturnidad Segura y Espacios de Usos Mixtos en Florencio Varela",
    description:
      "Sumate al proyecto de modificación de la Ordenanza N.º 10.339/23 para el reconocimiento de Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos.",
    type: "website",
    locale: "es_AR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
