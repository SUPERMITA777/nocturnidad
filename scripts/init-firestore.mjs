/**
 * Script de inicialización de Firestore para Nocturnidad Segura FV
 * 
 * Ejecutar UNA SOLA VEZ después de crear el proyecto Firebase:
 * 
 *   node scripts/init-firestore.mjs
 * 
 * Requiere que FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y 
 * FIREBASE_PRIVATE_KEY estén definidos en .env.local
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar .env.local manualmente
const envPath = resolve(__dirname, "../.env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^"(.*)"$/, "$1");
    process.env[key.trim()] = value;
  }
} catch {
  console.error("❌ No se encontró .env.local. Copiá .env.example a .env.local y completalo.");
  process.exit(1);
}

// Importar firebase-admin dinámicamente
const admin = await import("firebase-admin").then((m) => m.default);

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore(app);

console.log("🔥 Conectado a Firebase proyecto:", process.env.FIREBASE_PROJECT_ID);

// 1. Crear el documento contador de firmas
await db.collection("metadata").doc("firmas_counter").set(
  { count: 0, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
  { merge: true }
);
console.log("✅ Documento metadata/firmas_counter creado (count: 0)");

// 2. Verificar que la colección 'firmas' no tenga documentos (base limpia)
const existingFirmas = await db.collection("firmas").limit(1).get();
if (existingFirmas.empty) {
  console.log("✅ Colección 'firmas' vacía y lista para recibir adhesiones");
} else {
  console.log("⚠️  La colección 'firmas' ya tiene documentos existentes");
}

console.log("\n🎉 Firestore inicializado correctamente para Nocturnidad Segura FV");
console.log("   Próximos pasos:");
console.log("   1. Deployar reglas: firebase deploy --only firestore:rules,firestore:indexes");
console.log("   2. Configurar variables en Vercel");
console.log("   3. Conectar el repo GitHub en vercel.com");

process.exit(0);
