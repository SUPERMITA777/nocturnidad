"use server";

import { headers } from "next/headers";
import { getFirestore, admin } from "@/lib/firebase-admin";
import { firmaSchema, type FirmaInput } from "@/lib/schemas";

// ─── Tipos de Respuesta ───────────────────────────────────────────────────────

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// ─── Verificación de Turnstile ────────────────────────────────────────────────

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY no está configurado.");
    return false;
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData }
    );
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verificando Turnstile:", error);
    return false;
  }
}

// ─── Server Action: Enviar Firma ──────────────────────────────────────────────

export async function submitSignature(
  data: FirmaInput,
  turnstileToken: string
): Promise<ActionResult> {
  // 1. Verificar token anti-bot
  const isHuman = await verifyTurnstile(turnstileToken);
  if (!isHuman) {
    return {
      success: false,
      error: "La verificación de seguridad falló. Por favor, recargá la página e intentá nuevamente.",
    };
  }

  // 2. Validar datos con Zod
  const parsed = firmaSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return {
      success: false,
      error: "Hay errores en el formulario. Revisá los campos marcados.",
      fieldErrors,
    };
  }

  const validData = parsed.data;
  const cleanDNI = validData.dni.replace(/\D/g, "");

  // 3. Obtener info del request (IP y User-Agent)
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "desconocida";
  const userAgent = headersList.get("user-agent") || "desconocido";

  // 4. Escribir en Firestore con DNI como ID (garantía de unicidad)
  const db = getFirestore();
  const docRef = db.collection("firmas").doc(cleanDNI);

  try {
    await db.runTransaction(async (transaction) => {
      const docSnap = await transaction.get(docRef);

      if (docSnap.exists) {
        throw new Error("DNI_DUPLICADO");
      }

      const firmaDoc = {
        nombreCompleto: validData.nombreCompleto.trim(),
        dni: cleanDNI,
        barrio: validData.barrio,
        email: validData.email.toLowerCase().trim(),
        telefono: validData.telefono?.trim() || null,
        rol: validData.rol,
        problemasIdentificados: validData.problemasIdentificados,
        propuestaMejora: validData.propuestaMejora?.trim() || null,
        sugerenciaArticulado: validData.sugerenciaArticulado?.trim() || null,
        consentimientoLegal: validData.consentimientoLegal,
        deseaNovedades: validData.deseaNovedades,
        ipAddress,
        userAgent,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      transaction.set(docRef, firmaDoc);
    });

    return {
      success: true,
      message:
        "¡Gracias por tu adhesión! Tu firma fue registrada exitosamente. Juntos por una Nocturnidad Segura en Florencio Varela.",
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "DNI_DUPLICADO") {
      return {
        success: false,
        error:
          "Este DNI ya emitió su adhesión. Cada vecino puede firmar una sola vez.",
      };
    }
    console.error("Error guardando firma en Firestore:", error);
    return {
      success: false,
      error:
        "Ocurrió un error interno al guardar tu firma. Por favor, intentá nuevamente en unos minutos.",
    };
  }
}

// ─── Server Action: Obtener Conteo de Firmas ─────────────────────────────────

export async function getSignatureCount(): Promise<number> {
  try {
    const db = getFirestore();
    // Usamos un documento contador para evitar leer toda la colección
    const counterRef = db.collection("metadata").doc("firmas_counter");
    const counterSnap = await counterRef.get();

    if (counterSnap.exists) {
      return counterSnap.data()?.count ?? 0;
    }

    // Fallback: contar documentos directamente (sólo para inicialización)
    const snapshot = await db.collection("firmas").count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error("Error obteniendo conteo de firmas:", error);
    return 0;
  }
}
