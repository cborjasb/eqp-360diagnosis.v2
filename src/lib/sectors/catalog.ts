/**
 * Catálogo maestro de sectores y subsectores para el Diagnóstico de Perdurabilidad por sector.
 *
 * Estructura:
 *   - 9 GRUPOS macro (el "sector" que el usuario selecciona).
 *   - Cada grupo contiene varios subsectores (refinamiento opcional).
 *
 * El campo `examples` conserva el detalle de referencia de cada subsector
 * (lo que antes vivía en un sectores.md aparte) para alimentar la
 * personalización de preguntas e informes.
 *
 * Los `id` son kebab-case estables: NO renombrar sin migrar datos/Sheets.
 */

export interface SubsectorDef {
  /** id estable kebab-case, único dentro del sector */
  id: string;
  label: string;
  /** Detalle/ejemplos de referencia del subsector */
  examples: string;
}

export interface SectorDef {
  /** id estable kebab-case, único en todo el catálogo */
  id: string;
  /** Número de grupo 1..9 (orden de presentación) */
  group: number;
  label: string;
  /** Etiqueta corta para chips/botones */
  shortLabel: string;
  /** Nombre de icono de lucide-react */
  iconName: string;
  /** Naturaleza comercial dominante, informativa */
  b2x: 'B2B' | 'B2C' | 'Mixto';
  /** Descripción de una línea del sector */
  tagline: string;
  subsectors: SubsectorDef[];
}

export const SECTORS: SectorDef[] = [
  {
    id: 'produccion-primaria',
    group: 1,
    label: 'Producción Primaria (Extracción y Origen)',
    shortLabel: 'Producción Primaria',
    iconName: 'Sprout',
    b2x: 'B2B',
    tagline: 'Extracción y origen: agro, pecuario, pesca, minería e hidrocarburos.',
    subsectors: [
      { id: 'agricola', label: 'Agrícola', examples: 'Cultivos de ciclo corto, ciclo largo y silvicultura.' },
      { id: 'pecuario-avicola', label: 'Pecuario y Avícola', examples: 'Cría de ganado bovino, porcino, aves y apicultura.' },
      { id: 'pesquero-acuicola', label: 'Pesquero y Acuícola', examples: 'Pesca marítima, fluvial y cría en estanques.' },
      { id: 'extractivo-mineria', label: 'Extractivo (Minería)', examples: 'Extracción de minerales metálicos y no metálicos.' },
      { id: 'hidrocarburos', label: 'Hidrocarburos', examples: 'Exploración y extracción de petróleo y gas natural.' },
    ],
  },
  {
    id: 'industria-manufactura',
    group: 2,
    label: 'Industria y Manufactura (Transformación)',
    shortLabel: 'Industria y Manufactura',
    iconName: 'Factory',
    b2x: 'B2B',
    tagline: 'Transformación de materia prima en productos terminados.',
    subsectors: [
      { id: 'alimentaria-bebidas', label: 'Industria Alimentaria y Bebidas', examples: 'Procesadoras, empaquetadoras, frigoríficos, licores y embotelladoras.' },
      { id: 'metalmecanica-siderurgica', label: 'Metalmecánica y Siderúrgica', examples: 'Fundición, perfilería y fabricación de piezas metálicas.' },
      { id: 'quimica-petroquimica', label: 'Química y Petroquímica', examples: 'Refinación, plásticos, fertilizantes y productos de limpieza.' },
      { id: 'farmaceutica', label: 'Farmacéutica', examples: 'Laboratorios de fabricación de medicamentos e insumos médicos.' },
      { id: 'manufactura-ligera', label: 'Manufactura Ligera', examples: 'Textil, confección, calzado y marroquinería.' },
      { id: 'automotriz-ensamblaje', label: 'Automotriz y Ensamblaje', examples: 'Fabricación o ensamblaje de vehículos y maquinaria pesada.' },
      { id: 'papel-carton-empaques', label: 'Papel, Cartón y Empaques', examples: 'Producción de embalajes, celulosa y artes gráficas.' },
      { id: 'materiales-construccion', label: 'Materiales de Construcción', examples: 'Cementeras, cerámicas, vidrieras y prefabricados.' },
    ],
  },
  {
    id: 'servicios-publicos-energia',
    group: 3,
    label: 'Servicios Públicos, Energía e Infraestructura',
    shortLabel: 'Energía e Infraestructura',
    iconName: 'Zap',
    b2x: 'Mixto',
    tagline: 'Energía, agua, infraestructura civil y gestión ambiental.',
    subsectors: [
      { id: 'energetico', label: 'Energético', examples: 'Generación y distribución de energía eléctrica.' },
      { id: 'agua-saneamiento', label: 'Agua y Saneamiento', examples: 'Tratamiento de aguas, acueductos y gestión de aguas residuales.' },
      { id: 'construccion-civil', label: 'Construcción Civil', examples: 'Desarrollo de obras públicas, infraestructura e ingeniería pesada.' },
      { id: 'gestion-ambiental', label: 'Gestión Ambiental', examples: 'Recolección de residuos, reciclaje y tratamiento de desechos.' },
    ],
  },
  {
    id: 'logistica-cadena-suministro',
    group: 4,
    label: 'Logística, Transporte y Cadena de Suministro',
    shortLabel: 'Logística y Transporte',
    iconName: 'Truck',
    b2x: 'B2B',
    tagline: 'Movimiento, almacenamiento y distribución de bienes y personas.',
    subsectors: [
      { id: 'transporte-carga', label: 'Transporte de Carga', examples: 'Terrestre (gandolas, camiones), marítimo y aéreo.' },
      { id: 'transporte-pasajeros', label: 'Transporte de Pasajeros', examples: 'Aerolíneas, transporte público urbano y extraurbano, servicios ejecutivos.' },
      { id: 'distribucion-mayorista', label: 'Distribución Mayorista', examples: 'Compra en gran volumen a la industria para abastecer cadenas minoristas (alimentos, repuestos, insumos).' },
      { id: 'almacenamiento', label: 'Almacenamiento', examples: 'Depósitos, centros de distribución y cadena de frío.' },
      { id: 'servicios-aduaneros', label: 'Servicios Aduaneros', examples: 'Agenciamiento aduanal, logística portuaria y consolidación de carga.' },
    ],
  },
  {
    id: 'retail-comercio',
    group: 5,
    label: 'Comercio al Detalle o Retail (B2C)',
    shortLabel: 'Comercio / Retail',
    iconName: 'ShoppingCart',
    b2x: 'B2C',
    tagline: 'Venta al consumidor final, presencial y online.',
    subsectors: [
      { id: 'consumo-masivo', label: 'Consumo Masivo', examples: 'Supermercados, hipermercados, abastos y bodegones.' },
      { id: 'automotriz-retail', label: 'Automotriz', examples: 'Concesionarios de vehículos (nuevos y usados), venta de repuestos y autoperiquitos.' },
      { id: 'ferreteria-hogar', label: 'Ferretería y Mejoras del Hogar', examples: 'Materiales, herramientas y decoración.' },
      { id: 'salud-cuidado-personal', label: 'Salud y Cuidado Personal', examples: 'Farmacias, perfumerías y cosmética.' },
      { id: 'moda-accesorios', label: 'Moda y Accesorios', examples: 'Tiendas de ropa, zapaterías y joyería.' },
      { id: 'tecnologia-electrodomesticos', label: 'Tecnología y Electrodomésticos', examples: 'Venta de equipos informáticos, telefonía y línea blanca.' },
      { id: 'comercio-electronico', label: 'Comercio Electrónico', examples: 'Marketplaces y tiendas de venta exclusiva online.' },
    ],
  },
  {
    id: 'servicios-financieros-profesionales',
    group: 6,
    label: 'Servicios Financieros y Profesionales',
    shortLabel: 'Financieros y Profesionales',
    iconName: 'Landmark',
    b2x: 'Mixto',
    tagline: 'Banca, inversión, seguros, inmobiliario y consultoría.',
    subsectors: [
      { id: 'banca-finanzas', label: 'Banca y Finanzas', examples: 'Bancos universales, microfinancieras y casas de bolsa.' },
      { id: 'gestion-patrimonial', label: 'Gestión Patrimonial e Inversiones', examples: 'Wealth management, fideicomisos y fondos de inversión.' },
      { id: 'seguros', label: 'Seguros', examples: 'Aseguradoras de personas, patrimoniales, fianzas y corretaje.' },
      { id: 'inmobiliario', label: 'Inmobiliario y Bienes Raíces', examples: 'Promotoras, constructoras privadas, corretaje y administración de condominios.' },
      { id: 'consultoria-estrategica', label: 'Consultoría Estratégica', examples: 'Arquitectura de sistemas, transformación digital, asesoría legal, contable y fiscal.' },
      { id: 'publicidad-marketing', label: 'Publicidad y Marketing', examples: 'Agencias creativas, relaciones públicas, investigación de mercado y medios impresos/digitales.' },
    ],
  },
  {
    id: 'tecnologia-telecomunicaciones',
    group: 7,
    label: 'Tecnología y Telecomunicaciones',
    shortLabel: 'Tecnología y Telecom',
    iconName: 'Cpu',
    b2x: 'Mixto',
    tagline: 'Conectividad, software e infraestructura digital.',
    subsectors: [
      { id: 'telecomunicaciones', label: 'Telecomunicaciones', examples: 'Proveedores de internet (ISP), telefonía móvil y fija, transmisión satelital.' },
      { id: 'desarrollo-it-software', label: 'Desarrollo IT y Software', examples: 'Creación de aplicaciones, gestión de repositorios, integración de APIs y automatización.' },
      { id: 'infraestructura-digital', label: 'Infraestructura Digital', examples: 'Alojamiento web, servidores, centros de datos y ciberseguridad.' },
    ],
  },
  {
    id: 'hospitalidad-turismo-entretenimiento',
    group: 8,
    label: 'Hospitalidad, Turismo y Entretenimiento',
    shortLabel: 'Hospitalidad y Turismo',
    iconName: 'Hotel',
    b2x: 'B2C',
    tagline: 'Alojamiento, gastronomía, turismo, eventos y medios.',
    subsectors: [
      { id: 'alojamiento', label: 'Alojamiento', examples: 'Hoteles, posadas, resorts y alquileres a corto plazo.' },
      { id: 'gastronomia-horeca', label: 'Gastronomía (Canal HORECA)', examples: 'Restaurantes, franquicias de comida rápida, food trucks, cafés y servicios de catering.' },
      { id: 'turismo', label: 'Turismo', examples: 'Agencias de viaje, operadores turísticos y parques temáticos.' },
      { id: 'eventos-espectaculos', label: 'Eventos y Espectáculos', examples: 'Productoras, organización de eventos, alquiler de locaciones y servicios de DJ/audiovisuales.' },
      { id: 'medios-comunicacion', label: 'Medios de Comunicación', examples: 'Televisión, radio, productoras de cine y plataformas de streaming.' },
    ],
  },
  {
    id: 'salud-bienestar-servicios',
    group: 9,
    label: 'Salud, Bienestar y Servicios Esenciales',
    shortLabel: 'Salud y Servicios',
    iconName: 'HeartPulse',
    b2x: 'B2C',
    tagline: 'Salud, educación, estética, veterinaria, mantenimiento y seguridad.',
    subsectors: [
      { id: 'atencion-medica', label: 'Atención Médica Integral', examples: 'Clínicas, hospitales privados, ambulatorios y odontología.' },
      { id: 'laboratorios-diagnostico', label: 'Laboratorios y Diagnóstico', examples: 'Centros de imagenología, laboratorios clínicos y bancos de sangre.' },
      { id: 'servicios-funerarios', label: 'Servicios Funerarios', examples: 'Funerarias, cementerios, crematorios y previsión exequial.' },
      { id: 'educacion-formacion', label: 'Educación y Formación', examples: 'Colegios, universidades, institutos técnicos, academias de idiomas y capacitación corporativa.' },
      { id: 'entrenamiento-fisico', label: 'Entrenamiento Físico', examples: 'Gimnasios, centros de calistenia, clubes deportivos y estudios de artes marciales.' },
      { id: 'cuidado-personal-estetica', label: 'Cuidado Personal y Estética', examples: 'Peluquerías, barberías, spas y centros dermatológicos.' },
      { id: 'servicios-veterinarios', label: 'Servicios Veterinarios', examples: 'Clínicas veterinarias, distribución de fármacos animales y guarderías caninas.' },
      { id: 'mantenimiento-reparacion', label: 'Mantenimiento y Reparación', examples: 'Talleres mecánicos, latonería y pintura, servicio técnico de equipos.' },
      { id: 'seguridad-privada', label: 'Seguridad Privada', examples: 'Escoltas, vigilancia de instalaciones, blindaje y sistemas de alarmas.' },
    ],
  },
];

// ---- Índices y helpers de acceso ----

export const SECTORS_BY_ID: Record<string, SectorDef> = Object.fromEntries(
  SECTORS.map((s) => [s.id, s]),
);

export function getSector(sectorId: string): SectorDef | undefined {
  return SECTORS_BY_ID[sectorId];
}

export function getSubsector(sectorId: string, subsectorId: string): SubsectorDef | undefined {
  return getSector(sectorId)?.subsectors.find((sub) => sub.id === subsectorId);
}

/** Lista plana de todos los ids de sector válidos. */
export const ALL_SECTOR_IDS: string[] = SECTORS.map((s) => s.id);

/** Total de subsectores en el catálogo (52). */
export const TOTAL_SUBSECTORS: number = SECTORS.reduce((acc, s) => acc + s.subsectors.length, 0);
