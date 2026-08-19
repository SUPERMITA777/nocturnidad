/**
 * Script para crear los índices de Firestore via REST API
 * usando las credenciales de Service Account
 * 
 * Ejecutar: node scripts/deploy-indexes.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar .env.local
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...valueParts] = trimmed.split("=");
  const value = valueParts.join("=").replace(/^"(.*)"$/, "$1");
  process.env[key.trim()] = value;
}

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

const admin = (await import("firebase-admin")).default;

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const token = await app.options.credential.getAccessToken();
const accessToken = token.access_token;

console.log("🔐 Token de autenticación obtenido");
console.log("📊 Creando índices de Firestore...\n");

// Índices a crear
const indexes = [
  {
    description: "firmas ordenadas por fecha (para exportación CSV)",
    body: {
      queryScope: "COLLECTION",
      fields: [
        { fieldPath: "createdAt", order: "ASCENDING" },
      ],
    },
  },
  {
    description: "firmas por barrio + fecha (para estadísticas)",
    body: {
      queryScope: "COLLECTION",
      fields: [
        { fieldPath: "barrio", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
      ],
    },
  },
  {
    description: "firmas por rol + fecha (para estadísticas)",
    body: {
      queryScope: "COLLECTION",
      fields: [
        { fieldPath: "rol", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
      ],
    },
  },
];

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/collectionGroups/firmas/indexes`;

for (const idx of indexes) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idx.body),
  });

  if (res.ok) {
    const data = await res.json();
    console.log(`✅ Índice creado: ${idx.description}`);
    console.log(`   Estado: ${data.state || "CREATING"} (puede tardar unos minutos)`);
  } else {
    const err = await res.json();
    if (err.error?.status === "ALREADY_EXISTS") {
      console.log(`⏭️  Ya existe: ${idx.description}`);
    } else {
      console.warn(`⚠️  ${idx.description}: ${err.error?.message}`);
    }
  }
}

console.log("\n🎉 Índices de Firestore configurados correctamente");
console.log("   Los índices pueden tardar 2-5 minutos en estar activos.");
console.log("\n🔍 Verificar en:");
console.log(`   https://console.firebase.google.com/project/${PROJECT_ID}/firestore/indexes`);

process.exit(0);
