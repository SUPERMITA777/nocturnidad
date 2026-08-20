"use server";

import { getFirestore, admin } from "@/lib/firebase-admin";
import {
  DEFAULT_PROYECTO_LEY,
  proyectoLeySchema,
  type ProyectoLey,
} from "@/lib/proyecto-schema";
import { isAdminAuthenticated } from "@/lib/admin-actions";

/**
 * Obtiene el proyecto de ley dinámicamente desde Firestore (configuracion/proyecto_ley).
 * Si no existe aún en Firestore, retorna los datos estructurados por defecto y crea el documento.
 */
export async function getProyectoLey(): Promise<ProyectoLey> {
  try {
    const db = getFirestore();
    const docRef = db.collection("configuracion").doc("proyecto_ley");
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      const parsed = proyectoLeySchema.safeParse(data);
      if (parsed.success) {
        // Asegurar que sea un objeto plano serializable para Client Components (eliminar clases Timestamp)
        const cleanData = { ...parsed.data };
        delete cleanData.ultimaActualizacion;
        return JSON.parse(JSON.stringify(cleanData));
      }
    }

    // Si no existe, inicializar con el contenido oficial actualizado
    try {
      await docRef.set({
        ...DEFAULT_PROYECTO_LEY,
        ultimaActualizacion: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (e) {
      console.warn("No se pudo persistir el default de proyecto_ley en Firestore:", e);
    }

    return JSON.parse(JSON.stringify(DEFAULT_PROYECTO_LEY));
  } catch (error) {
    console.error("Error al obtener proyecto_ley de Firestore:", error);
    return JSON.parse(JSON.stringify(DEFAULT_PROYECTO_LEY));
  }
}

/**
 * Actualiza el texto estructurado del proyecto de ley desde el panel de admin.
 */
export async function updateProyectoLey(
  data: ProyectoLey
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "No autorizado." };

  const parsed = proyectoLeySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Datos del proyecto de ley inválidos." };
  }

  try {
    const db = getFirestore();
    const docRef = db.collection("configuracion").doc("proyecto_ley");
    await docRef.set({
      ...parsed.data,
      ultimaActualizacion: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error guardando proyecto_ley:", error);
    return { success: false, error: "Error al actualizar en Firestore." };
  }
}
