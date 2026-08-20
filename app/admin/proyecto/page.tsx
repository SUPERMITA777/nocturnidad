import type { Metadata } from "next";
import AdminProyectoEditor from "@/components/AdminProyectoEditor";

export const metadata: Metadata = {
  title: "Editor del Proyecto de Ordenanza | Admin Nocturnidad Segura",
  description: "Editor administrativo en tiempo real del articulado y considerandos de la reforma.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProyectoPage() {
  return <AdminProyectoEditor />;
}
