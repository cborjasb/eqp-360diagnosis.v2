/**
 * Capa RAG sobre Gemini File Search (Semantic Retrieval).
 *
 * Indexamos los 168 informes de perdurabilidad en un File Search Store y aquí
 * exponemos el "tool" que el modelo usa para recuperar pasajes relevantes al
 * generar cada informe.
 *
 * FALLBACK: si la variable GEMINI_FILE_SEARCH_STORE no está configurada (aún
 * no se han subido los informes), las funciones devuelven undefined y el motor
 * de informe sigue funcionando sin RAG. NO depende de NotebookLM.
 *
 * Variables de entorno:
 *  - GEMINI_FILE_SEARCH_STORE   nombre del store (ej. "fileSearchStores/xxxx")
 *  - RAG_TOP_K                  nº de pasajes a recuperar (def. 8)
 *  - RAG_FILTER_BY_SECTOR       'true' para filtrar por metadata de sector
 */

/**
 * Tool de File Search en formato REST (snake_case) de la API generateContent.
 * NOTA: usamos la API REST vía fetch (no el SDK) porque el SDK @google/genai,
 * al ejecutarse dentro del runtime de Next 16, devuelve respuestas vacías al
 * adjuntar el tool fileSearch. La REST funciona correctamente. Ver route.ts.
 */
export interface RestFileSearchTool {
  file_search: {
    file_search_store_names: string[];
    top_k?: number;
    metadata_filter?: string;
  };
}

export function isRagConfigured(): boolean {
  return Boolean(process.env.GEMINI_FILE_SEARCH_STORE);
}

/**
 * Devuelve el/los tools de File Search (formato REST) para generateContent, o
 * undefined si el RAG no está configurado.
 */
export function getFileSearchTools(sectorId?: string | null): RestFileSearchTool[] | undefined {
  const store = process.env.GEMINI_FILE_SEARCH_STORE;
  if (!store) return undefined;

  const file_search: RestFileSearchTool['file_search'] = {
    file_search_store_names: [store],
    top_k: Number(process.env.RAG_TOP_K ?? 8),
  };

  // Filtrado opcional por sector (requiere que los documentos estén etiquetados
  // con customMetadata { key: 'sector', stringValue: <sectorId> } al indexar).
  if (process.env.RAG_FILTER_BY_SECTOR === 'true' && sectorId) {
    file_search.metadata_filter = `sector = "${sectorId}"`;
  }

  return [{ file_search }];
}

/** Instrucción que se añade al prompt cuando el RAG está activo. */
export const RAG_GROUNDING_INSTRUCTION = `
FUENTES (RAG): Tienes acceso a una base de conocimiento con 168 informes reales
de perdurabilidad empresarial. Úsala para fundamentar tus observaciones con
hallazgos, patrones y datos de esos informes cuando sean pertinentes al sector
del cliente. Prioriza evidencia de la base sobre afirmaciones genéricas. No
inventes cifras: si un dato no está en las fuentes ni en el contexto provisto,
no lo afirmes como hecho.`;
