import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebase-admin";
import { isAdminAuthenticated } from "@/lib/admin-actions";
import crypto from "crypto";

function safeCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Cabeceras para el archivo CSV
const CSV_HEADERS = [
  "numeroFolio",
  "nombreCompleto",
  "dni",
  "barrio",
  "email",
  "telefono",
  "rol",
  "problemasIdentificados",
  "propuestaMejora",
  "sugerenciaArticulado",
  "consentimientoLegal",
  "deseaNovedades",
  "fechaHora",
];

function escapeCSV(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escapar comillas dobles y envolver en comillas si contiene comas, saltos o comillas
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  // ─── Verificación de la autorización (Cookie de Admin O Clave Secreta) ───────
  const isAuthSession = await isAdminAuthenticated();

  const adminKey =
    request.headers.get("x-admin-key") ||
    request.nextUrl.searchParams.get("key");

  const expectedKey = process.env.ADMIN_SECRET_KEY;

  const isKeyValid = expectedKey && safeCompare(adminKey, expectedKey);

  if (!isAuthSession && !isKeyValid) {
    return NextResponse.json(
      {
        error: "No autorizado. Proveé la clave de administrador correcta o iniciá sesión.",
      },
      { status: 401 }
    );
  }

  try {
    const db = getFirestore();
    const snapshot = await db
      .collection("firmas")
      .orderBy("createdAt", "asc")
      .get();

    if (snapshot.empty) {
      return new NextResponse("No hay firmas registradas aún.", {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // BOM UTF-8 para compatibilidad con Excel en Windows
    const BOM = "\uFEFF";

    // Encabezado
    const rows: string[] = [CSV_HEADERS.join(",")];

    let folio = 1;
    snapshot.forEach((doc) => {
      const d = doc.data();

      const createdAt = d.createdAt?.toDate
        ? d.createdAt.toDate().toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      const row = [
        folio.toString().padStart(4, "0"),
        escapeCSV(d.nombreCompleto),
        escapeCSV(d.dni),
        escapeCSV(d.barrio),
        escapeCSV(d.email),
        escapeCSV(d.telefono),
        escapeCSV(d.rol),
        escapeCSV(
          Array.isArray(d.problemasIdentificados)
            ? d.problemasIdentificados.join(" | ")
            : ""
        ),
        escapeCSV(d.propuestaMejora),
        escapeCSV(d.sugerenciaArticulado),
        d.consentimientoLegal ? "SI" : "NO",
        d.deseaNovedades ? "SI" : "NO",
        escapeCSV(createdAt),
      ].join(",");

      rows.push(row);
      folio++;
    });

    const csvContent = BOM + rows.join("\r\n");

    const fecha = new Date().toISOString().split("T")[0];
    const filename = `nocturnidad-firmas-hcd-${fecha}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error exportando firmas:", error);
    return NextResponse.json(
      { error: "Error interno al generar el CSV." },
      { status: 500 }
    );
  }
}
