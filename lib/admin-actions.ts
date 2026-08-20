"use server";

import { cookies } from "next/headers";
import { getFirestore } from "@/lib/firebase-admin";

const ADMIN_COOKIE_NAME = "admin_auth_token";

export interface AdminFirma {
  id: string; // DNI
  nombreCompleto: string;
  dni: string;
  barrio: string;
  email: string;
  telefono?: string | null;
  rol: string;
  problemasIdentificados: string[];
  propuestaMejora?: string | null;
  sugerenciaArticulado?: string | null;
  deseaNovedades: boolean;
  consentimientoLegal: boolean;
  createdAt?: string | null;
}

// Verificar contraseña de admin
export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  const expectedKey = process.env.ADMIN_SECRET_KEY;
  if (!expectedKey) {
    return { success: false, error: "ADMIN_SECRET_KEY no configurado en el servidor." };
  }

  if (password !== expectedKey) {
    return { success: false, error: "Contraseña de administrador incorrecta." };
  }

  // Guardar cookie de sesión (httpOnly, segura)
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, expectedKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  return { success: true };
}

// Cerrar sesión
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

// Verificar si está autenticado
export async function isAdminAuthenticated(): Promise<boolean> {
  const expectedKey = process.env.ADMIN_SECRET_KEY;
  if (!expectedKey) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token === expectedKey;
}

// Obtener listado de firmas
export async function getAdminFirmas(): Promise<{ success: boolean; data?: AdminFirma[]; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "No autorizado." };
  }

  try {
    const db = getFirestore();
    const snapshot = await db.collection("firmas").orderBy("createdAt", "desc").get();

    const firmas: AdminFirma[] = [];
    snapshot.forEach((doc) => {
      const d = doc.data();
      firmas.push({
        id: doc.id,
        nombreCompleto: d.nombreCompleto || "",
        dni: d.dni || doc.id,
        barrio: d.barrio || "",
        email: d.email || "",
        telefono: d.telefono || null,
        rol: d.rol || "",
        problemasIdentificados: d.problemasIdentificados || [],
        propuestaMejora: d.propuestaMejora || null,
        sugerenciaArticulado: d.sugerenciaArticulado || null,
        deseaNovedades: !!d.deseaNovedades,
        consentimientoLegal: !!d.consentimientoLegal,
        createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : null,
      });
    });

    return { success: true, data: firmas };
  } catch (error: any) {
    console.error("Error obteniendo firmas en admin:", error);
    return { success: false, error: "Error al cargar las firmas." };
  }
}

// Actualizar una firma existente
export async function updateAdminFirma(
  id: string,
  data: Partial<AdminFirma>
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "No autorizado." };

  try {
    const db = getFirestore();
    const docRef = db.collection("firmas").doc(id);

    const updatePayload: Record<string, any> = {};
    if (data.nombreCompleto !== undefined) updatePayload.nombreCompleto = data.nombreCompleto.trim();
    if (data.barrio !== undefined) updatePayload.barrio = data.barrio;
    if (data.email !== undefined) updatePayload.email = data.email.trim();
    if (data.telefono !== undefined) updatePayload.telefono = data.telefono ? data.telefono.trim() : null;
    if (data.rol !== undefined) updatePayload.rol = data.rol;
    if (data.propuestaMejora !== undefined) updatePayload.propuestaMejora = data.propuestaMejora ? data.propuestaMejora.trim() : null;
    if (data.sugerenciaArticulado !== undefined) updatePayload.sugerenciaArticulado = data.sugerenciaArticulado ? data.sugerenciaArticulado.trim() : null;

    await docRef.update(updatePayload);
    return { success: true };
  } catch (error: any) {
    console.error("Error actualizando firma:", error);
    return { success: false, error: "Error al actualizar la firma." };
  }
}

// Eliminar una firma y decrementar el contador
export async function deleteAdminFirma(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "No autorizado." };

  try {
    const db = getFirestore();
    const docRef = db.collection("firmas").doc(id);
    const counterRef = db.collection("metadata").doc("firmas_counter");

    await db.runTransaction(async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists) {
        throw new Error("NOT_FOUND");
      }
      transaction.delete(docRef);

      // Decrementar contador si existe
      const counterSnap = await transaction.get(counterRef);
      if (counterSnap.exists) {
        const currentCount = counterSnap.data()?.count || 1;
        transaction.update(counterRef, {
          count: Math.max(0, currentCount - 1),
        });
      }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return { success: false, error: "La firma no existe." };
    }
    console.error("Error eliminando firma:", error);
    return { success: false, error: "Error al eliminar la firma." };
  }
}
