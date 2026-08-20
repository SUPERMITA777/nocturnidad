import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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

console.log("🔥 Consultando colección 'firmas' en Firestore...");

const countSnap = await db.collection("firmas").count().get();
const realCount = countSnap.data().count;
console.log(`📊 Firmas reales en la colección 'firmas': ${realCount}`);

const counterDoc = await db.collection("metadata").doc("firmas_counter").get();
console.log(`📌 Valor actual en metadata/firmas_counter:`, counterDoc.exists ? counterDoc.data() : "NO EXISTE");

// Listar DNIs registrados
const allDocs = await db.collection("firmas").get();
console.log(`📋 Lista de DNIs registrados:`);
allDocs.forEach((d) => {
  console.log(`   - DNI [${d.id}]: ${d.data().nombreCompleto} (${d.data().email})`);
});

// Sincronizar metadata/firmas_counter con el conteo real
await db.collection("metadata").doc("firmas_counter").set({
  count: realCount,
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
console.log(`✅ metadata/firmas_counter sincronizado con éxito al valor real: ${realCount}`);

process.exit(0);
