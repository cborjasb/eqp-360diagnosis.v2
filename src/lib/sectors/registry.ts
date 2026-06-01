/**
 * Registro central de cuestionarios por sector.
 *
 * - `getQuestionnaire(sectorId, subsectorId?)` resuelve la lista de dimensiones
 *   final que verá el usuario: dimensiones del sector + (si aplica) las
 *   específicas del subsector.
 * - Si un sector aún no tiene cuestionario propio, cae al set BASE de
 *   perdurabilidad para no romper la app mientras se completan los 9 sectores.
 *
 * Para añadir un sector: crear su archivo en `questionnaires/` y registrarlo
 * en QUESTIONNAIRES. No requiere tocar UI ni API.
 */

import { DiagDimension, SectorQuestionnaire, DynamicScores } from './questionnaire-types';
import { BASE_DIMENSIONS } from './questionnaires/base';
import { LOGISTICA_QUESTIONNAIRE } from './questionnaires/logistica';
import { PRODUCCION_PRIMARIA_QUESTIONNAIRE } from './questionnaires/produccion-primaria';
import { INDUSTRIA_MANUFACTURA_QUESTIONNAIRE } from './questionnaires/industria-manufactura';
import { SERVICIOS_PUBLICOS_QUESTIONNAIRE } from './questionnaires/servicios-publicos-energia';
import { RETAIL_QUESTIONNAIRE } from './questionnaires/retail-comercio';
import { SERVICIOS_FINANCIEROS_QUESTIONNAIRE } from './questionnaires/servicios-financieros';
import { TECNOLOGIA_TELECOM_QUESTIONNAIRE } from './questionnaires/tecnologia-telecom';
import { HOSPITALIDAD_QUESTIONNAIRE } from './questionnaires/hospitalidad-turismo';
import { SALUD_BIENESTAR_QUESTIONNAIRE } from './questionnaires/salud-bienestar';
import { getSector, getSubsector } from './catalog';

/** Sectores con cuestionario específico ya redactado (los 9). */
const QUESTIONNAIRES: Record<string, SectorQuestionnaire> = {
  [LOGISTICA_QUESTIONNAIRE.sectorId]: LOGISTICA_QUESTIONNAIRE,
  [PRODUCCION_PRIMARIA_QUESTIONNAIRE.sectorId]: PRODUCCION_PRIMARIA_QUESTIONNAIRE,
  [INDUSTRIA_MANUFACTURA_QUESTIONNAIRE.sectorId]: INDUSTRIA_MANUFACTURA_QUESTIONNAIRE,
  [SERVICIOS_PUBLICOS_QUESTIONNAIRE.sectorId]: SERVICIOS_PUBLICOS_QUESTIONNAIRE,
  [RETAIL_QUESTIONNAIRE.sectorId]: RETAIL_QUESTIONNAIRE,
  [SERVICIOS_FINANCIEROS_QUESTIONNAIRE.sectorId]: SERVICIOS_FINANCIEROS_QUESTIONNAIRE,
  [TECNOLOGIA_TELECOM_QUESTIONNAIRE.sectorId]: TECNOLOGIA_TELECOM_QUESTIONNAIRE,
  [HOSPITALIDAD_QUESTIONNAIRE.sectorId]: HOSPITALIDAD_QUESTIONNAIRE,
  [SALUD_BIENESTAR_QUESTIONNAIRE.sectorId]: SALUD_BIENESTAR_QUESTIONNAIRE,
};

/** ¿El sector tiene cuestionario propio (no usa el fallback base)? */
export function hasSpecificQuestionnaire(sectorId: string): boolean {
  return Boolean(QUESTIONNAIRES[sectorId]);
}

/**
 * Devuelve las dimensiones finales para un sector (+ subsector opcional).
 * Cae al set BASE si el sector no tiene cuestionario propio.
 */
export function getQuestionnaireDimensions(
  sectorId: string,
  subsectorId?: string,
): DiagDimension[] {
  const q = QUESTIONNAIRES[sectorId];
  if (!q) return BASE_DIMENSIONS;

  const dims = [...q.dimensions];
  if (subsectorId && q.subsectorDimensions?.[subsectorId]) {
    dims.push(...q.subsectorDimensions[subsectorId]);
  }
  return dims;
}

/** Contexto experto para el prompt del informe; '' si el sector usa el base. */
export function getReportContext(sectorId: string): string {
  return QUESTIONNAIRES[sectorId]?.reportContext ?? '';
}

/** Estado inicial de puntajes (todos en 0) para un conjunto de dimensiones. */
export function buildInitialScores(dimensions: DiagDimension[]): DynamicScores {
  return Object.fromEntries(
    dimensions.map((d) => [d.key, d.questions.map(() => 0)]),
  );
}

/**
 * Etiqueta legible "Sector › Subsector" para encabezados e informes.
 * Devuelve null si el sector no existe.
 */
export function getSelectionLabel(sectorId: string, subsectorId?: string): string | null {
  const sector = getSector(sectorId);
  if (!sector) return null;
  if (subsectorId) {
    const sub = getSubsector(sectorId, subsectorId);
    if (sub) return `${sector.shortLabel} › ${sub.label}`;
  }
  return sector.label;
}
