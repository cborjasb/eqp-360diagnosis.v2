/**
 * Modelo de cuestionario por sector.
 *
 * Un cuestionario es una lista de DIMENSIONES; cada dimensión tiene
 * preguntas que el usuario califica de 0 a 5 (autoevaluación).
 *
 * Compatibilidad: la forma (key/label/iconName/questions) es idéntica a la
 * de `DimensionDef` en lib/types.ts, por lo que los componentes existentes
 * (ScoreInput, RadarReport) funcionan sin cambios — solo que ahora las
 * dimensiones son dinámicas según el sector elegido.
 */

export interface DiagQuestion {
  id: number;
  text: string;
}

export interface DiagDimension {
  /** key estable kebab-case, único dentro del cuestionario */
  key: string;
  label: string;
  /** Nombre de icono de lucide-react */
  iconName: string;
  questions: DiagQuestion[];
}

export interface SectorQuestionnaire {
  sectorId: string;
  /** Dimensiones a nivel sector (aplican a todos sus subsectores). */
  dimensions: DiagDimension[];
  /**
   * Dimensiones adicionales específicas de un subsector.
   * Se anexan a `dimensions` cuando el usuario elige ese subsector.
   * Clave = subsectorId.
   */
  subsectorDimensions?: Record<string, DiagDimension[]>;
  /**
   * Contexto experto que se inyecta en el prompt del informe para este
   * sector (KPIs, riesgos y lenguaje propios del rubro).
   */
  reportContext: string;
}

/** Scores dinámicos: clave = dimension.key, valor = puntaje por pregunta. */
export type DynamicScores = Record<string, number[]>;
