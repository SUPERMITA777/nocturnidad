"use server";

import { cookies } from "next/headers";
import { getFirestore } from "@/lib/firebase-admin";
import crypto from "crypto";

const ADMIN_COOKIE_NAME = "admin_auth_token";

// Función auxiliar para generar token HMAC firmado
function generateSessionToken(secret: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac("sha256", secret).update(timestamp).digest("hex");
  return `${timestamp}.${signature}`;
}

// Función auxiliar para validar token HMAC firmado
function verifySessionToken(token: string, secret: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    // Verificar expiración (7 días)
    const tokenTime = parseInt(timestamp, 10);
    if (isNaN(tokenTime) || Date.now() - tokenTime > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const expectedSignature = crypto.createHmac("sha256", secret).update(timestamp).digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

// Comparación segura contra ataques de temporización
function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

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

function getAdminUsers(): Array<{ email: string; password: string }> {
  const list: Array<{ email: string; password: string }> = [];

  // Usuario Principal
  const adminEmail = (process.env.ADMIN_EMAIL || "emanuel.cotta@gmail.com").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "SoleyEma2711";
  list.push({ email: adminEmail, password: adminPassword });

  // Usuario Admin 2 (Cristian Caram)
  const admin2Email = (process.env.ADMIN_USER_2_EMAIL || "cristiancaram19@hotmail.com").toLowerCase().trim();
  const admin2Password = process.env.ADMIN_USER_2_PASSWORD || "1929";
  list.push({ email: admin2Email, password: admin2Password });

  // Soporte para JSON dinámico en env ADMIN_USERS_JSON='[{"email":"...","password":"..."}]'
  if (process.env.ADMIN_USERS_JSON) {
    try {
      const parsed = JSON.parse(process.env.ADMIN_USERS_JSON);
      if (Array.isArray(parsed)) {
        parsed.forEach((u) => {
          if (u.email && u.password) {
            list.push({ email: String(u.email).toLowerCase().trim(), password: String(u.password) });
          }
        });
      }
    } catch {}
  }

  return list;
}

// Verificar credenciales de admin (email + password) o clave secreta directa
export async function loginAdmin(
  emailOrPassword: string,
  password?: string
): Promise<{ success: boolean; error?: string }> {
  const expectedKey = process.env.ADMIN_SECRET_KEY || "NocturnidadFV_Admin_2026_Seguro!";

  let isValid = false;
  const adminUsers = getAdminUsers();

  // Si se pasan ambos (usuario + password)
  if (password !== undefined && password !== "") {
    const inputEmail = emailOrPassword.toLowerCase().trim();
    for (const user of adminUsers) {
      if (safeCompare(inputEmail, user.email) && safeCompare(password, user.password)) {
        isValid = true;
        break;
      }
    }
    // O si la contraseña enviada coincide con la clave maestra
    if (safeCompare(password, expectedKey)) {
      isValid = true;
    }
  } else {
    // Si solo se pasó un campo (clave maestra o password de alguno de los admins)
    for (const user of adminUsers) {
      if (safeCompare(emailOrPassword, user.password)) {
        isValid = true;
        break;
      }
    }
    if (safeCompare(emailOrPassword, expectedKey)) {
      isValid = true;
    }
  }

  if (!isValid) {
    return { success: false, error: "Usuario o contraseña de administrador incorrectos." };
  }

  // Generar token de sesión firmado con HMAC
  const sessionToken = generateSessionToken(expectedKey);

  // Guardar cookie de sesión (httpOnly, segura, sameSite strict)
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
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
  if (!token) return false;

  return verifySessionToken(token, expectedKey);
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
