import { NextResponse } from "next/server";

/**
 * Endpoint para descargar / visualizar el PDF oficial del proyecto de ordenanza.
 * 
 * Coloca el archivo PDF en public/proyecto-ordenanza.pdf
 * y este endpoint lo servirá con las cabeceras correctas.
 * 
 * Alternativamente, podés redirigir a un Google Drive o URL externa.
 */
export async function GET() {
  // Opción 1: Redirigir a URL externa (Google Drive, etc.)
  // return NextResponse.redirect("https://drive.google.com/file/d/TU_ID_AQUI/view");

  // Opción 2: Servir desde /public/proyecto-ordenanza.pdf
  // El archivo estático en /public ya es accesible directamente en /proyecto-ordenanza.pdf
  // Este endpoint simplemente redirige al archivo estático con nombre descriptivo.
  return NextResponse.redirect(
    new URL("/proyecto-ordenanza.pdf", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  );
}
