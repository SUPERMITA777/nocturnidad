/**
 * Script para deployar las Firestore Security Rules via REST API
 * usando las credenciales de Service Account (sin necesitar Firebase CLI login)
 * 
 * Ejecutar: node scripts/deploy-rules.mjs
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

// Cargar las reglas de Firestore
const rulesContent = readFileSync(resolve(__dirname, "../firestore.rules"), "utf-8");

// Importar firebase-admin para obtener un access token
const admin = (await import("firebase-admin")).default;

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

// Obtener access token de la service account
const token = await app.options.credential.getAccessToken();
const accessToken = token.access_token;

console.log("🔐 Token de autenticación obtenido");
console.log("📋 Deployando Firestore Security Rules...");

// ─── Crear el Ruleset ────────────────────────────────────────────────────────
const createRulesetRes = await fetch(
  `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: {
        files: [
          {
            name: "firestore.rules",
            content: rulesContent,
          },
        ],
      },
    }),
  }
);

if (!createRulesetRes.ok) {
  const err = await createRulesetRes.text();
  console.error("❌ Error creando ruleset:", err);
  process.exit(1);
}

const ruleset = await createRulesetRes.json();
const rulesetName = ruleset.name;
console.log("✅ Ruleset creado:", rulesetName);

// ─── Obtener el Release de Firestore ────────────────────────────────────────
const releaseName = `projects/${PROJECT_ID}/releases/cloud.firestore`;

// Intentar actualizar el release existente (patch), o crear uno nuevo
const patchRes = await fetch(
  `https://firebaserules.googleapis.com/v1/${releaseName}`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      release: {
        name: releaseName,
        rulesetName: rulesetName,
      },
    }),
  }
);

if (patchRes.ok) {
  console.log("✅ Rules release actualizado exitosamente");
} else {
  // Si no existe, crear nuevo release
  const createRes = await fetch(
    `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/releases`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: releaseName,
        rulesetName: rulesetName,
      }),
    }
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error("❌ Error creando release:", err);
    process.exit(1);
  }
  console.log("✅ Rules release creado exitosamente");
}

console.log("\n🎉 Firestore Security Rules deployadas:");
console.log("   → allow read, write: if false (solo acceso via firebase-admin)");
console.log("\n🔍 Verificar en:");
console.log(`   https://console.firebase.google.com/project/${PROJECT_ID}/firestore/rules`);

process.exit(0);
