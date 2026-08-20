/**
 * Crea los índices compuestos de Firestore directamente via REST API
 * usando las credenciales de Service Account (con rol Service Usage Consumer)
 *
 * Ejecutar: node scripts/create-indexes-direct.mjs
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
const DATABASE = "(default)";

// Inicializar Firebase Admin para obtener token
const admin = (await import("firebase-admin")).default;
const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const tokenObj = await app.options.credential.getAccessToken();
const accessToken = tokenObj.access_token;
console.log("🔐 Token obtenido\n");

// ─── Definición de índices ───────────────────────────────────────────────────
const INDEXES = [
  {
    label: "firmas — createdAt ASC (exportación CSV)",
    collectionId: "firmas",
    fields: [
      { fieldPath: "createdAt", order: "ASCENDING" },
    ],
  },
  {
    label: "firmas — barrio ASC + createdAt DESC",
    collectionId: "firmas",
    fields: [
      { fieldPath: "barrio",    order: "ASCENDING" },
      { fieldPath: "createdAt", order: "DESCENDING" },
    ],
  },
  {
    label: "firmas — rol ASC + createdAt DESC",
    collectionId: "firmas",
    fields: [
      { fieldPath: "rol",       order: "ASCENDING" },
      { fieldPath: "createdAt", order: "DESCENDING" },
    ],
  },
];

// ─── Crear cada índice ───────────────────────────────────────────────────────
for (const idx of INDEXES) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE}/collectionGroups/${idx.collectionId}/indexes`;

  const body = {
    queryScope: "COLLECTION",
    fields: idx.fields.map((f) => ({
      fieldPath: f.fieldPath,
      order: f.order,
    })),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`✅ Creando: ${idx.label}`);
      console.log(`   Operación: ${data.name}`);
      console.log(`   Estado: ${data.state ?? "CREATING"}\n`);
    } else if (data.error?.status === "ALREADY_EXISTS") {
      console.log(`⏭️  Ya existe: ${idx.label}\n`);
    } else {
      console.error(`❌ Error en: ${idx.label}`);
      console.error(`   ${data.error?.message}\n`);
    }
  } catch (err) {
    console.error(`❌ Excepción: ${idx.label}`, err.message);
  }
}

console.log("════════════════════════════════════════");
console.log("Los índices tardan 2-5 minutos en activarse.");
console.log("Verificar en:");
console.log(`https://console.firebase.google.com/project/${PROJECT_ID}/firestore/indexes`);

process.exit(0);
