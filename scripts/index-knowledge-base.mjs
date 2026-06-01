/**
 * Indexa los 168 informes de perdurabilidad en un Gemini File Search Store.
 *
 * USO (una sola vez, desde la carpeta del proyecto):
 *
 *   1) Coloca los archivos (PDF/DOCX/TXT/MD) en ./knowledge-base
 *   2) (Opcional) crea ./knowledge-base/manifest.json con:
 *        { "nombre-archivo.pdf": "logistica-cadena-suministro", ... }
 *      para etiquetar cada informe con su sectorId (permite filtrar por sector).
 *   3) Asegúrate de tener GEMINI_API_KEY en el entorno (con facturación activa).
 *   4) Ejecuta:
 *        node scripts/index-knowledge-base.mjs ./knowledge-base
 *
 *   Al terminar imprime el nombre del store. Cópialo en .env.local como:
 *        GEMINI_FILE_SEARCH_STORE=fileSearchStores/xxxxxxxx
 *
 *   Para AÑADIR archivos a un store existente, exporta antes:
 *        GEMINI_FILE_SEARCH_STORE=fileSearchStores/xxxx node scripts/index-knowledge-base.mjs ./mas-informes
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { GoogleGenAI } from '@google/genai';

const SUPPORTED = new Set(['.pdf', '.txt', '.md', '.docx', '.html', '.json', '.csv']);
const MIME = {
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.md': 'text/md',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.html': 'text/html',
  '.csv': 'text/csv',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// El displayName viaja en un header HTTP (ByteString = solo ASCII). Los nombres
// con acentos/diacríticos rompen la subida, así que los normalizamos a ASCII.
// El contenido del archivo NO se altera; solo la etiqueta.
const toAscii = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\x00-\x7F]/g, '_');

// Nº de subidas concurrentes (acelera la indexación de muchos archivos).
const CONCURRENCY = Number(process.env.INDEX_CONCURRENCY ?? 8);

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Falta GEMINI_API_KEY en el entorno.');
    process.exit(1);
  }

  const dir = process.argv[2] || './knowledge-base';
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    console.error(`❌ No existe la carpeta: ${dir}`);
    console.error('   Crea ./knowledge-base y coloca ahí los 168 informes.');
    process.exit(1);
  }

  // Manifest opcional: nombre-archivo -> sectorId
  let manifest = {};
  const manifestPath = join(dir, 'manifest.json');
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      console.log(`📋 manifest.json cargado (${Object.keys(manifest).length} etiquetas de sector).`);
    } catch {
      console.warn('⚠️  manifest.json ilegible; se ignora el etiquetado por sector.');
    }
  }

  let files = readdirSync(dir)
    .filter((f) => SUPPORTED.has(extname(f).toLowerCase()) && f !== 'manifest.json')
    .map((f) => join(dir, f));

  if (files.length === 0) {
    console.error(`❌ No se encontraron archivos soportados en ${dir}.`);
    console.error(`   Formatos: ${[...SUPPORTED].join(', ')}`);
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  // Reusar store existente o crear uno nuevo.
  let storeName = process.env.GEMINI_FILE_SEARCH_STORE;
  if (storeName) {
    console.log(`♻️  Usando store existente: ${storeName}`);
  } else {
    const store = await ai.fileSearchStores.create({
      config: { displayName: 'Perdurabilidad - 168 informes' },
    });
    storeName = store.name;
    console.log(`🆕 Store creado: ${storeName}`);
  }

  // Idempotencia: omitir archivos ya indexados (por displayName). Permite
  // reanudar una indexación interrumpida sin duplicar. (pageSize máx = 20.)
  let skipped = 0;
  try {
    const existing = new Set();
    let token = '';
    do {
      const url = `https://generativelanguage.googleapis.com/v1beta/${storeName}/documents?pageSize=20${token ? `&pageToken=${encodeURIComponent(token)}` : ''}&key=${apiKey}`;
      const r = await fetch(url, { cache: 'no-store' });
      const j = await r.json();
      (j.documents || []).forEach((d) => d.displayName && existing.add(d.displayName));
      token = j.nextPageToken || '';
    } while (token);
    if (existing.size) {
      const before = files.length;
      files = files.filter((fp) => !existing.has(toAscii(basename(fp))));
      skipped = before - files.length;
      console.log(`↩️  Ya indexados (se omiten): ${skipped}`);
    }
  } catch {
    console.warn('⚠️  No se pudo listar documentos existentes; se intentará subir todos.');
  }

  const total = files.length;
  console.log(`⬆️  Subiendo ${total} archivo(s) (concurrencia ${CONCURRENCY})...\n`);

  let ok = 0;
  let fail = 0;

  // Subimos el archivo como Blob (no como ruta) para evitar que nombres con
  // acentos rompan el header HTTP (ByteString solo ASCII). El displayName y el
  // mimeType van explícitos.
  async function processFile(filePath, idx) {
    const name = basename(filePath);
    const ext = extname(name).toLowerCase();
    const sectorId = manifest[name];
    const mime = MIME[ext] || 'application/octet-stream';
    const label = `[${idx + 1}/${total}] ${name}${sectorId ? ` (sector: ${sectorId})` : ''}`;
    try {
      const blob = new Blob([readFileSync(filePath)], { type: mime });
      let op = await ai.fileSearchStores.uploadToFileSearchStore({
        fileSearchStoreName: storeName,
        file: blob,
        config: {
          displayName: toAscii(name),
          mimeType: mime,
          ...(sectorId
            ? { customMetadata: [{ key: 'sector', stringValue: sectorId }] }
            : {}),
        },
      });

      // Polling hasta que la indexación termine.
      let waited = 0;
      while (!op.done && waited < 120000) {
        await sleep(3000);
        waited += 3000;
        op = await ai.operations.get({ operation: op });
      }

      if (op.error) throw new Error(JSON.stringify(op.error));
      console.log(`✅ ${label}`);
      ok++;
    } catch (err) {
      console.error(`❌ ${label} — ${err?.message || err}`);
      fail++;
    }
  }

  // Pool de concurrencia.
  let cursor = 0;
  async function worker() {
    while (cursor < total) {
      const idx = cursor++;
      await processFile(files[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, total) }, () => worker()),
  );

  console.log(`\n———————————————————————————————`);
  console.log(`Indexados: ${ok}  |  Fallidos: ${fail}`);
  console.log(`\n👉 Añade esto a tu .env.local:\n`);
  console.log(`GEMINI_FILE_SEARCH_STORE=${storeName}\n`);
}

main().catch((e) => {
  console.error('Error fatal:', e);
  process.exit(1);
});
