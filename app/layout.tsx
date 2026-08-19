import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nocturnidad Segura - Florencio Varela | Proyecto de Ordenanza",
  description:
    "Sumá tu firma al proyecto de reforma del Código de Faltas (Ord. 442/77) para terminar con la clandestinidad, cuidar a los jóvenes y formalizar la actividad comercial y cultural nocturna en Florencio Varela.",
  keywords: [
    "Florencio Varela",
    "nocturnidad",
    "ordenanza",
    "reforma",
    "participación ciudadana",
    "HCD",
    "Concejo Deliberante",
    "fiestas clandestinas",
    "trabajo local",
    "seguridad nocturna",
  ],
  openGraph: {
    title: "Nocturnidad Segura en Florencio Varela",
    description:
      "Sumate al proyecto de reforma para una nocturnidad regulada, segura y con trabajo local.",
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
