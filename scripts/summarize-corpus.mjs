/**
 * Resume cada PDF del corpus de perdurabilidad con Gemini y guarda un resumen
 * estructurado en .md. Los resúmenes (texto, sin imágenes) ocupan una fracción
 * del espacio de embeddings, lo que permite indexar los 168+ informes dentro
 * del tier gratuito de File Search (1 GB).
 *
 * USO:  GEMINI_API_KEY=... node scripts/summarize-corpus.mjs <dir-pdfs> <dir-salida>
 *   ej: node scripts/summarize-corpus.mjs "/.../EQP/Estudios" ./knowledge-base-resumenes
 *
 * Idempotente: omite los PDFs cuyo resumen .md ya existe (permite reanudar).
 */

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { GoogleGenAI } from '@google/genai';

const CONCURRENCY = Number(process.env.SUMMARY_CONCURRENCY ?? 5);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const toAscii = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\x00-\x7F]/g, '_');

const PROMPT = `Eres analista experto en perdurabilidad empresarial y empresa familiar.
Resume el documento adjunto en ESPAÑOL para una base de conocimiento (RAG) que
fundamentará diagnósticos empresariales. Estructura:

TÍTULO Y FUENTE: (título del estudio, autor/firma y año si aparecen)
TEMAS: (sectores/áreas que cubre: gobernanza, sucesión, finanzas, talento, riesgos, etc.)
HALLAZGOS CLAVE: (8-15 viñetas con los hallazgos más importantes; CONSERVA TODAS las
  cifras, porcentajes y estadísticas con su fuente; son lo más valioso)
CONCLUSIONES / IMPLICACIONES para la perdurabilidad de las empresas.

Sé denso y fiel a los datos. Máximo ~700 palabras. No inventes cifras que no estén
en el documento. Devuelve SOLO el resumen, sin preámbulo.`;

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { console.error('❌ Falta GEMINI_API_KEY'); process.exit(1); }

  const srcDir = process.argv[2];
  const outDir = process.argv[3] || './knowledge-base-resumenes';
  if (!srcDir || !existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
    console.error(`❌ Carpeta de PDFs inválida: ${srcDir}`);
    process.exit(1);
  }
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });
  const files = readdirSync(srcDir).filter((f) => extname(f).toLowerCase() === '.pdf');
  const total = files.length;
  console.log(`📄 ${total} PDFs → resúmenes en ${outDir} (concurrencia ${CONCURRENCY})\n`);

  let ok = 0, skip = 0, fail = 0;

  async function processOne(name, idx) {
    const outPath = join(outDir, toAscii(name).replace(/\.pdf$/i, '') + '.md');
    const label = `[${idx + 1}/${total}] ${name.slice(0, 50)}`;
    if (existsSync(outPath)) { skip++; return; }
    let uploaded;
    try {
      const blob = new Blob([readFileSync(join(srcDir, name))], { type: 'application/pdf' });
      uploaded = await ai.files.upload({ file: blob, config: { mimeType: 'application/pdf', displayName: toAscii(name) } });
      // esperar a que el archivo esté ACTIVE
      let w = 0;
      while (uploaded.state && uploaded.state !== 'ACTIVE' && w < 90000) {
        await sleep(2000); w += 2000;
        uploaded = await ai.files.get({ name: uploaded.name });
      }
      if (uploaded.state === 'FAILED') throw new Error('file processing FAILED');

      const resp = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [
          { fileData: { fileUri: uploaded.uri, mimeType: 'application/pdf' } },
          { text: PROMPT },
        ] }],
      });
      const summary = (resp.text || '').trim();
      if (!summary) throw new Error('resumen vacío');
      writeFileSync(outPath, `# Fuente: ${name}\n\n${summary}\n`);
      ok++; console.log(`✅ ${label}`);
    } catch (err) {
      fail++; console.error(`❌ ${label} — ${(err?.message || err).toString().slice(0, 100)}`);
    } finally {
      if (uploaded?.name) { try { await ai.files.delete({ name: uploaded.name }); } catch {} }
    }
  }

  let cursor = 0;
  async function worker() { while (cursor < total) { const i = cursor++; await processOne(files[i], i); } }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total) }, () => worker()));

  console.log(`\n———————————————————————————————`);
  console.log(`Resúmenes OK: ${ok} | Omitidos(ya existían): ${skip} | Fallidos: ${fail}`);
}

main().catch((e) => { console.error('Error fatal:', e); process.exit(1); });
