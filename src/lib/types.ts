export type DimensionKey =
  | 'finanzas'
  | 'operaciones'
  | 'riesgos'
  | 'talento'
  | 'mercadeo'
  | 'gobernanza'
  | 'tecnologia';

export interface SubQuestion {
  id: number;
  text: string;
}

export interface DimensionDef {
  key: DimensionKey;
  label: string;
  iconName: string;
  questions: SubQuestion[];
}

export type ScoresState = Record<DimensionKey, number[]>;

export interface ChartDataPoint {
  subject: string;
  actual: number;
  ideal: number;
  fullMark: number;
}

export interface LeadFormData {
  titulo: string;
  nombre: string;
  empresa: string;
  website: string;
  email: string;
  celular: string;
}

/**
 * Nivel de acceso de un código de autorización:
 *  - 'completo': puede generar diagnóstico de CUALQUIER sector.
 *  - 'limitado': solo los sectores listados en `sectoresPermitidos`.
 */
export type AccessLevel = 'completo' | 'limitado';

export interface VendorData {
  codigo: string;
  nombre: string;
  email: string;
  empresa: string;
  estado: string;
  /** Nivel de acceso del código. Por defecto 'completo' (retrocompat). */
  nivelAcceso: AccessLevel;
  /**
   * Ids de sector habilitados cuando nivelAcceso === 'limitado'.
   * Vacío/ignorado cuando es 'completo'.
   */
  sectoresPermitidos: string[];
}

/** Sector (+ subsector opcional) elegido para el diagnóstico. */
export interface SectorSelection {
  sectorId: string;
  subsectorId?: string;
}
