# Diagnóstico por Sector — Guía de configuración

La app ahora genera diagnósticos **específicos por sector** (9 sectores, 52 subsectores),
con cuestionarios e informes adaptados a cada rubro, control de acceso de dos niveles
y base de conocimiento RAG opcional sobre los 168 informes de perdurabilidad.

## 1. Arquitectura (dónde está cada cosa)

| Módulo | Archivo |
|---|---|
| Catálogo de sectores/subsectores | `src/lib/sectors/catalog.ts` |
| Tipos de cuestionario | `src/lib/sectors/questionnaire-types.ts` |
| Dimensiones base (perdurabilidad) | `src/lib/sectors/questionnaires/base.ts` |
| Cuestionarios por sector (9) | `src/lib/sectors/questionnaires/*.ts` |
| Registro / resolución de cuestionario | `src/lib/sectors/registry.ts` |
| Capa RAG (Gemini File Search) | `src/lib/rag/file-search.ts` |
| Selección de sector (UI) | `src/components/SectorSelectionScreen.tsx` |
| Iconos | `src/lib/icons.ts` |

**Para añadir/editar un sector:** crea/edita su archivo en `questionnaires/` y
regístralo en `registry.ts`. No hace falta tocar UI ni API.

## 2. Códigos de autorización — dos niveles (Google Sheets)

En la hoja **`Vendedores`**, además de las columnas existentes (A: código, B: nombre,
C: email, D: empresa, E: estado), añade:

- **F: `nivel_acceso`** → `completo` o `limitado`.
  - Vacío o `completo` ⇒ acceso a **todos** los sectores.
  - `limitado` ⇒ solo los sectores de la columna G.
- **G: `sectores_permitidos`** → ids de sector separados por coma o punto y coma.
  Ej.: `logistica-cadena-suministro, retail-comercio`

> Los códigos existentes sin columnas F/G siguen funcionando como **completo**
> (retrocompatible). Un código `limitado` nunca puede generar un diagnóstico
> fuera de sus sectores: el resto ni aparece en la selección.

**Ids de sector válidos** (columna G):
`produccion-primaria`, `industria-manufactura`, `servicios-publicos-energia`,
`logistica-cadena-suministro`, `retail-comercio`, `servicios-financieros-profesionales`,
`tecnologia-telecomunicaciones`, `hospitalidad-turismo-entretenimiento`,
`salud-bienestar-servicios`.

La hoja **`Registro`** sumará automáticamente dos columnas: **R: sector** (etiqueta legible)
y **S: sector_id**.

## 3. Base de conocimiento RAG (168 informes)

### Estado actual (COMPLETO)
- Corpus fuente: `EQP/Estudios/` (172 PDFs de perdurabilidad: PwC, Deloitte, EY, IESA, encuestas de empresa familiar, etc.).
- Store activo: `fileSearchStores/perdurabilidad-168-informes-gd369lkk4516` (ya en `.env.local`).
- **✅ 172 de 172 informes indexados** (únicos, sin duplicados ni faltantes). Corpus completo y permanente.
- Grounding verificado end-to-end: el informe se fundamenta en el corpus vía RAG (citas PwC, Family Firm Institute, sucesión, etc.).

### 💳 Saldo prepago (para operar)
El proyecto **EqP Consulting** ya está en **tier de pago** (esto desbloqueó la indexación, que requirió >1 GB de storage). OJO: la indexación de los 172 PDFs **consumió el saldo prepago**; cada generación de informe y consulta RAG **tiene costo por uso**, así que para que la app genere informes en producción debe **mantener saldo prepago disponible** (recargar en [AI Studio](https://ai.studio/projects) / Cloud Billing). Si el saldo se agota, `generate-analysis` devuelve 500 con "prepayment credits are depleted".

### Reanudar / re-indexar (idempotente)
El script omite los ya indexados; reanudar o añadir es un solo comando:
```bash
GEMINI_FILE_SEARCH_STORE=fileSearchStores/perdurabilidad-168-informes-gd369lkk4516 \
  node scripts/index-knowledge-base.mjs "/Users/macuser/Desktop/TODO ESCRITORIO/Carlos/EQP/Estudios"
```

### Para crear una base nueva desde cero

1. Coloca los 168 informes (PDF/DOCX/TXT/MD) en `./knowledge-base/`.
2. (Opcional) crea `./knowledge-base/manifest.json` mapeando archivo → sectorId
   para poder filtrar por sector:
   ```json
   { "informe-transporte-01.pdf": "logistica-cadena-suministro" }
   ```
3. Asegúrate de tener `GEMINI_API_KEY` con **facturación activa**.
4. Ejecuta una sola vez:
   ```bash
   node scripts/index-knowledge-base.mjs ./knowledge-base
   ```
5. Copia el `GEMINI_FILE_SEARCH_STORE=fileSearchStores/xxxx` que imprime al
   final dentro de `.env.local`.

Variables de entorno relacionadas (`.env.local`):

```
GEMINI_FILE_SEARCH_STORE=fileSearchStores/xxxx   # activa el RAG
RAG_TOP_K=8                                       # pasajes a recuperar (opcional)
RAG_FILTER_BY_SECTOR=true                         # filtra por metadata de sector (opcional)
```

## 4. Códigos de prueba (solo cuando Google Sheets NO está configurado)

`TEST-001` (completo), `TEST-LOG` (limitado a Logística), `TEST-OFF` (suspendido).
Con Sheets configurado, se usan los códigos reales de la hoja.

## 5. Nota técnica importante (RAG vía REST, no SDK)

El motor de informe llama a Gemini por **API REST con `fetch`** (no por el SDK
`@google/genai`). Motivo: el SDK, dentro del runtime de Next 16, devuelve
**contenido vacío** al adjuntar el tool `fileSearch` (mismo código funciona en
Node puro). La REST funciona correctamente. El SDK se sigue usando solo en
`scripts/index-knowledge-base.mjs`, que corre en Node puro.

El tool REST usa snake_case: `{ file_search: { file_search_store_names, top_k } }`.

## 6. Estado de verificación

- `next build` ✅ — compila y tipa todo (9 sectores + registry + rutas).
- 9 sectores con cuestionario específico; cada dimensión con 4 preguntas.
- `validate-code` probado en runtime (consulta el Sheet real).
- `generate-analysis` probado en `next start` (HTTP 200, informe sectorial 7k+ chars).
- **RAG COMPLETO y verificado**: 172/172 informes de `EQP/Estudios` indexados;
  informe de Logística generado (6.7k chars) fundamentado en el corpus (señales
  PwC, Family Firm Institute, sucesión…). Para operar requiere saldo prepago (§3).
- Salvaguarda: si el RAG devolviera vacío, el route reintenta sin tools (informe
  sectorial garantizado).
