import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { DEFAULT_PROYECTO_LEY } from "../lib/proyecto-schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar .env.local
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
  console.error("❌ No se encontró .env.local.");
  process.exit(1);
}

const admin = (await import("firebase-admin")).default;

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore(app);

console.log("🔥 Actualizando configuracion/proyecto_ley en Firestore...");

await db.collection("configuracion").doc("proyecto_ley").set({
  ...DEFAULT_PROYECTO_LEY,
  ultimaActualizacion: admin.firestore.FieldValue.serverTimestamp(),
});

console.log("✅ Proyecto de Ordenanza (Modificación Ord. 10.339/23) sincronizado exitosamente en Firestore.");
process.exit(0);
