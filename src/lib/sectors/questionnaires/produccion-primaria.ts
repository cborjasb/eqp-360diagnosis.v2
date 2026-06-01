/**
 * Cuestionario — Producción Primaria (Extracción y Origen).
 *
 * Diseñado específicamente para el sector: las dimensiones y preguntas
 * reflejan los KPIs, riesgos y operativa propios de empresas agrícolas,
 * pecuarias, pesqueras, mineras y de hidrocarburos (rendimiento por hectárea/
 * cabeza/pozo, sanidad, estacionalidad, precios de commodities, mermas,
 * certificaciones fitosanitarias, dependencia de insumos importados, etc.).
 *
 * Mantiene el mismo lenguaje sencillo orientado a dueños de PyME que el resto
 * del diagnóstico, pero NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-commodities',
    label: 'Finanzas y Precios',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Conocen el costo real de producir una unidad (tonelada, cabeza, barril) incluyendo insumos, mano de obra y pérdidas por merma o mortalidad?' },
      { id: 2, text: 'Cuando el precio del commodity cae, ¿tienen un nivel de costo mínimo calculado que les diga con cuánto margen pueden aguantar?' },
      { id: 3, text: '¿Tienen reservas de caja o acceso a crédito para sostener la operación entre una cosecha/zafra y el cobro efectivo de la venta?' },
      { id: 4, text: '¿Han evaluado contratos de precio fijo, seguros agrícolas o coberturas para reducir el impacto de la volatilidad de precios?' },
    ],
  },
  {
    key: 'produccion-rendimiento',
    label: 'Producción y Rendimiento',
    iconName: 'Tractor',
    questions: [
      { id: 1, text: '¿Miden el rendimiento productivo por unidad (toneladas/hectárea, kg/cabeza, litros/pozo) y lo comparan con el promedio del sector?' },
      { id: 2, text: '¿Tienen un calendario de producción escrito con fechas clave (siembra, cosecha, partos, mantenimiento de pozos) y lo cumplen?' },
      { id: 3, text: '¿Controlan y registran las mermas, pérdidas o mortalidades para saber exactamente cuánto se pierde y por qué?' },
      { id: 4, text: 'Si aumenta la demanda o los precios suben, ¿pueden escalar la producción sin comprometer la calidad ni agotar los suelos, pastizales o reservorios?' },
    ],
  },
  {
    key: 'sanidad-inocuidad',
    label: 'Sanidad e Inocuidad',
    iconName: 'Leaf',
    questions: [
      { id: 1, text: '¿Tienen un programa preventivo (vacunación, control fitosanitario, monitoreo de plagas) y lo ejecutan antes de que aparezca el problema?' },
      { id: 2, text: '¿Llevan registros de aplicación de agroquímicos, medicamentos o tratamientos que puedan presentar ante una auditoría o certificación?' },
      { id: 3, text: 'Si detectan una plaga, enfermedad o contaminación, ¿tienen un protocolo claro de cuarentena y control para evitar que se expanda?' },
      { id: 4, text: '¿Sus productos cumplen las normas sanitarias y de trazabilidad exigidas por sus compradores o por la normativa nacional?' },
    ],
  },
  {
    key: 'riesgos-climaticos',
    label: 'Riesgos Climáticos y Naturales',
    iconName: 'ShieldAlert',
    questions: [
      { id: 1, text: '¿Han identificado los riesgos climáticos que más amenazan su operación (sequía, heladas, inundaciones, huracanes) y estimado su impacto?' },
      { id: 2, text: '¿Tienen seguro agrícola, pecuario o de activos que cubra pérdidas por fenómenos naturales relevantes para su zona?' },
      { id: 3, text: '¿Tienen fuentes alternativas de agua (pozos, reservorios, sistemas de riego) para mantener la producción en época seca?' },
      { id: 4, text: '¿Han adaptado variedades, razas o técnicas de extracción para reducir la exposición a la variabilidad climática o al agotamiento de recursos?' },
    ],
  },
  {
    key: 'insumos-proveedores',
    label: 'Insumos y Proveedores',
    iconName: 'Warehouse',
    questions: [
      { id: 1, text: '¿Dependen de insumos importados (semillas, fertilizantes, aditivos, repuestos) que podrían escasear o encarecerse de golpe?' },
      { id: 2, text: '¿Tienen al menos dos proveedores para los insumos más críticos, o si su proveedor principal falla no podrían producir?' },
      { id: 3, text: '¿Compran insumos con anticipación cuando los precios son favorables, o compran "al día" y pagan lo que esté?' },
      { id: 4, text: '¿Verifican la calidad y autenticidad de los insumos que reciben (semillas certificadas, medicamentos originales, combustible sin adulteración)?' },
    ],
  },
  {
    key: 'talento-campo',
    label: 'Talento y Personal de Campo',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Tienen personal técnico (agrónomo, veterinario, geólogo, técnico de pozo) propio o contratado para guiar las decisiones de producción?' },
      { id: 2, text: 'Si el encargado de campo o el técnico principal falta durante una semana clave, ¿la operación puede continuar sin pérdidas graves?' },
      { id: 3, text: '¿Capacitan regularmente a los operadores en buenas prácticas, manejo seguro de equipos y uso correcto de insumos?' },
      { id: 4, text: 'En temporadas altas (cosecha, partos, zafra), ¿pueden conseguir mano de obra suficiente y entrenada sin que la producción se atrase?' },
    ],
  },
  {
    key: 'comercializacion-acceso',
    label: 'Comercialización y Acceso al Mercado',
    iconName: 'TrendingUp',
    questions: [
      { id: 1, text: '¿Venden su producción a un solo comprador o intermediario, lo que les obliga a aceptar el precio que él imponga?' },
      { id: 2, text: '¿Han explorado canales de venta directa, agroindustria o exportación para obtener mejor precio que el mercado spot local?' },
      { id: 3, text: '¿Sus productos cuentan con certificaciones (orgánico, GlobalG.A.P., Rainforest, Fairtrade, ISO) que les permitan acceder a mercados premium?' },
      { id: 4, text: '¿Tienen contratos de compra-venta firmados antes de producir, o venden siempre a precio y comprador inciertos al momento de la cosecha?' },
    ],
  },
  {
    key: 'tecnologia-campo',
    label: 'Tecnología Productiva',
    iconName: 'Cpu',
    questions: [
      { id: 1, text: '¿Usan datos de suelo, agua o subsuelo (análisis de laboratorio, sensores, imágenes satelitales) para tomar decisiones de producción?' },
      { id: 2, text: '¿Tienen maquinaria, equipos o sistemas de riego en buen estado, con mantenimiento preventivo, que no frenen la operación en momentos críticos?' },
      { id: 3, text: '¿Registran los datos de producción (fechas, insumos, rendimientos, incidencias) de forma organizada y consultable, o solo en la memoria del dueño?' },
      { id: 4, text: '¿Han evaluado tecnologías que mejoren su eficiencia (fertirriego, inseminación artificial, drones de monitoreo, trazabilidad digital)?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'agricola': [
    {
      key: 'gestion-suelo-agua',
      label: 'Gestión de Suelo y Agua',
      iconName: 'Sprout',
      questions: [
        { id: 1, text: '¿Realizan análisis de suelo al menos cada dos años para ajustar la fertilización y no agotar ni desperdiciar los nutrientes?' },
        { id: 2, text: '¿Tienen un plan de rotación de cultivos que proteja la fertilidad del suelo y reduzca la presión de plagas y enfermedades?' },
        { id: 3, text: '¿Miden la eficiencia del riego (litros por kilogramo producido) y ajustan los sistemas para no desperdiciar agua en épocas de escasez?' },
        { id: 4, text: '¿Cuentan con prácticas de conservación de suelos (cubiertas vegetales, terrazas, barreras) para evitar erosión y pérdida de productividad?' },
      ],
    },
  ],
  'pecuario-avicola': [
    {
      key: 'bienestar-productividad-animal',
      label: 'Bienestar y Productividad Animal',
      iconName: 'Beef',
      questions: [
        { id: 1, text: '¿Llevan registros individuales o por lote de peso, producción (leche, huevos, carne) y eventos sanitarios de sus animales?' },
        { id: 2, text: '¿Tienen indicadores de productividad (conversión alimenticia, intervalo entre partos, mortalidad) y los comparan con estándares del rubro?' },
        { id: 3, text: '¿Sus instalaciones (corrales, galpones, bebederos) cumplen condiciones de bienestar animal que exigen los compradores y la normativa vigente?' },
        { id: 4, text: '¿Controlan los tiempos de retiro de medicamentos antes del sacrificio o la producción de leche/huevos para cumplir los límites de residuos?' },
      ],
    },
  ],
  'pesquero-acuicola': [
    {
      key: 'recursos-acuaticos-biomasa',
      label: 'Recursos Acuáticos y Biomasa',
      iconName: 'Fish',
      questions: [
        { id: 1, text: '¿Monitorean la biomasa disponible (cuotas, densidades de estanque) para no sobreexplotar el recurso ni subutilizar la capacidad instalada?' },
        { id: 2, text: '¿Cuentan con permisos y cuotas de pesca o acuicultura vigentes y en regla, y controlan no superarlas para evitar sanciones?' },
        { id: 3, text: '¿Controlan la calidad del agua (oxígeno, pH, temperatura, salinidad) y tienen alertas o respaldos cuando los parámetros salen del rango óptimo?' },
        { id: 4, text: '¿Tienen cadena de frío garantizada desde la captura o cosecha hasta la entrega al comprador para proteger la inocuidad del producto?' },
      ],
    },
  ],
  'extractivo-mineria': [
    {
      key: 'seguridad-ambiental-minera',
      label: 'Seguridad y Gestión Ambiental',
      iconName: 'HardHat',
      questions: [
        { id: 1, text: '¿Cumplen los estándares de seguridad industrial (EPP, procedimientos, capacitación) y miden la tasa de accidentes e incidentes?' },
        { id: 2, text: '¿Tienen los permisos ambientales y mineros vigentes, y un plan de manejo de residuos y efluentes que evite sanciones o cierres?' },
        { id: 3, text: '¿Calculan la vida útil de la reserva que explotan y tienen un plan de exploración para garantizar continuidad operativa a largo plazo?' },
        { id: 4, text: '¿Mantienen buenas relaciones con las comunidades cercanas y tienen mecanismos para prevenir conflictos que puedan paralizar las operaciones?' },
      ],
    },
  ],
  'hidrocarburos': [
    {
      key: 'gestion-pozos-reservas',
      label: 'Gestión de Pozos y Reservas',
      iconName: 'Fuel',
      questions: [
        { id: 1, text: '¿Monitorizan la presión, el caudal y la declinación de sus pozos para anticipar intervenciones antes de que la producción caiga de golpe?' },
        { id: 2, text: '¿Tienen estimaciones actualizadas de reservas probadas y probables que les permitan planificar inversiones y compromisos de entrega?' },
        { id: 3, text: '¿Cumplen la normativa de seguridad, medio ambiente y salud ocupacional exigida por la autoridad regulatoria del sector en su país?' },
        { id: 4, text: '¿Tienen controles para detectar y reparar fugas, derrames o emisiones que puedan generar sanciones, pasivos ambientales o daño reputacional?' },
      ],
    },
  ],
};

export const PRODUCCION_PRIMARIA_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'produccion-primaria',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en PRODUCCIÓN PRIMARIA (EXTRACCIÓN Y ORIGEN).
Aspectos críticos de perdurabilidad en este sector:
- La rentabilidad está atada al COSTO DE PRODUCCIÓN POR UNIDAD (tonelada, cabeza, barril) y al precio del commodity, que el productor no controla; el único margen de maniobra es la eficiencia interna y la reducción de mermas y mortalidades.
- La concentración de compradores e intermediarios y la venta "en el momento de cosecha" sin precio acordado de antemano son fuentes típicas de fragilidad estructural.
- Los riesgos climáticos (sequía, heladas, inundaciones) y sanitarios (plagas, enfermedades, brotes) pueden destruir una zafra entera o una piara en días; el subaseguramiento y la ausencia de planes de contingencia amplifican el daño.
- La dependencia de insumos importados (semillas certificadas, fertilizantes, medicamentos, repuestos de maquinaria) expone al negocio a disrupciones de cadena de suministro y devaluaciones cambiarias.
- El acceso a mercados diferenciados (certificaciones orgánicas, GlobalG.A.P., Fairtrade, trazabilidad digital) es la palanca más potente para escapar del precio spot y mejorar márgenes de forma sostenida.
- La gestión del recurso base (suelo, agua, biomasa, reserva mineral) determina la vida útil del negocio; quien agota el recurso sin reposición destruye el activo principal.
- El cumplimiento normativo (permisos ambientales, cuotas, registros sanitarios, licencias mineras) y la relación con comunidades locales son riesgos de continuidad operativa que pueden paralizar la operación de un día para otro.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del sector primario: habla de cosechas, zafras, lotes, cabezas de ganado, pozos, cuotas de pesca, análisis de suelo, cadena de frío y precios FOB o en finca.`,
};
