/**
 * Cuestionario — Servicios Públicos, Energía e Infraestructura.
 *
 * Diseñado para empresas que operan redes, plantas y obras de infraestructura
 * crítica: generadoras y distribuidoras de energía, operadores de acueductos,
 * constructoras de obra pública y gestores de residuos. Las dimensiones reflejan
 * los riesgos y KPIs propios del sector: continuidad del servicio, activos de larga
 * vida útil, contratos/licitaciones con entes públicos, cobranza con alto nivel de
 * morosidad, seguridad industrial y cumplimiento regulatorio-ambiental estricto.
 *
 * Mantiene el mismo lenguaje sencillo orientado a dueños de PyME que el resto del
 * diagnóstico, pero NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-cobranza',
    label: 'Finanzas y Cobranza',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Conocen con exactitud el costo real de operar y mantener sus redes o plantas, incluyendo depreciación y reservas para reposición de activos?' },
      { id: 2, text: '¿Tienen un proceso claro para cobrar a tiempo y controlar la morosidad, de modo que los atrasos no pongan en riesgo el flujo de caja?' },
      { id: 3, text: '¿Cuentan con reservas o líneas de crédito disponibles para sostener la operación mientras esperan pagos de contratos públicos o licitaciones?' },
      { id: 4, text: '¿Saben qué proyectos, contratos o zonas de servicio les generan utilidad real, y cuáles operan a pérdida o muy cerca del límite?' },
    ],
  },
  {
    key: 'continuidad-servicio',
    label: 'Continuidad del Servicio',
    iconName: 'Zap',
    questions: [
      { id: 1, text: '¿Tienen un plan de contingencia probado para mantener el servicio si falla un equipo crítico (transformador, bomba, generador)?' },
      { id: 2, text: '¿Miden el tiempo que el servicio estuvo interrumpido por mes (horas fuera de servicio) y trabajan para reducirlo?' },
      { id: 3, text: '¿Cuentan con equipos o sistemas de respaldo (redundancias) que entren en operación automáticamente ante una falla grave?' },
      { id: 4, text: '¿Tienen acuerdos con proveedores de repuestos y contratistas de emergencia que garanticen reacción rápida ante una avería crítica?' },
    ],
  },
  {
    key: 'activos-infraestructura',
    label: 'Activos e Infraestructura',
    iconName: 'Factory',
    questions: [
      { id: 1, text: '¿Tienen un inventario actualizado de todos sus activos (redes, plantas, maquinaria, vehículos) con su estado, vida útil restante y costo de reposición?' },
      { id: 2, text: '¿Ejecutan un plan de mantenimiento preventivo por activo y llevan registro de cada intervención, o esperan a que el equipo falle para actuar?' },
      { id: 3, text: '¿Tienen un programa de renovación de infraestructura que evite llegar al punto en que las fallas frecuentes afecten la calidad del servicio?' },
      { id: 4, text: '¿Controlan el consumo de insumos (combustible, químicos, repuestos) con registros que permitan detectar desperdicios o usos no autorizados?' },
    ],
  },
  {
    key: 'cumplimiento-regulatorio-ambiental',
    label: 'Regulatorio y Ambiental',
    iconName: 'ShieldCheck',
    questions: [
      { id: 1, text: '¿Tienen al día todos los permisos, licencias ambientales y autorizaciones de operación que exige la regulación, sin riesgo de suspensión?' },
      { id: 2, text: '¿Cuentan con alguien responsable de monitorear los cambios regulatorios y ambientales que puedan afectar su operación o sus contratos?' },
      { id: 3, text: '¿Registran y reportan los indicadores ambientales que exige la autoridad (emisiones, vertimientos, residuos) dentro de los plazos establecidos?' },
      { id: 4, text: '¿Tienen plan de respuesta ante un incidente ambiental (derrame, vertimiento, emisión fuera de norma) que minimice sanciones y daño a la comunidad?' },
    ],
  },
  {
    key: 'contratos-licitaciones',
    label: 'Contratos y Licitaciones',
    iconName: 'Gavel',
    questions: [
      { id: 1, text: '¿Analizan a fondo los pliegos antes de presentar una oferta, asegurándose de que las condiciones económicas y técnicas sean viables para su empresa?' },
      { id: 2, text: '¿Tienen un proceso de seguimiento a cada contrato público que controle avances, anticipos recibidos, actas y posibles multas por incumplimiento?' },
      { id: 3, text: '¿Su cartera de contratos está diversificada, o dependen de uno o dos clientes/entidades que representan la mayor parte de sus ingresos?' },
      { id: 4, text: '¿Cuentan con asesoría legal especializada en contratación pública que les ayude a gestionar reclamaciones, adiciones o eventuales disputas contractuales?' },
    ],
  },
  {
    key: 'seguridad-industrial',
    label: 'Seguridad Industrial',
    iconName: 'HardHat',
    questions: [
      { id: 1, text: '¿Tienen un programa de seguridad y salud en el trabajo activo, con protocolos claros para trabajos de alto riesgo (altura, electricidad, espacios confinados)?' },
      { id: 2, text: '¿Registran y analizan todos los incidentes y casi-accidentes para encontrar causas raíz y evitar que se repitan?' },
      { id: 3, text: '¿Su personal de campo cuenta con los elementos de protección personal adecuados y recibe capacitación periódica en seguridad?' },
      { id: 4, text: '¿Cumplen con los requisitos de seguridad exigidos en sus contratos y por la normativa vigente, sin necesidad de improvisar ante una auditoría?' },
    ],
  },
  {
    key: 'talento-tecnico',
    label: 'Talento Técnico',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Cuentan con personal técnico certificado para operar y mantener sus equipos y redes, o dependen de pocos especialistas difíciles de reemplazar?' },
      { id: 2, text: '¿Si su operador de planta, ingeniero de red o supervisor de campo principal no puede trabajar mañana, hay alguien preparado para asumir sus funciones sin que el servicio se afecte?' },
      { id: 3, text: '¿Invierten en capacitación técnica y certificaciones para que su equipo esté al día con las tecnologías y normativas del sector?' },
      { id: 4, text: '¿Tienen una política clara para contratar, evaluar y retener al personal técnico especializado, considerando que es escaso y costoso en el mercado?' },
    ],
  },
  {
    key: 'gestion-proyectos-obra',
    label: 'Gestión de Proyectos y Obra',
    iconName: 'ClipboardList',
    questions: [
      { id: 1, text: '¿Planifican sus proyectos de obra o ampliación de infraestructura con cronogramas, presupuestos y responsables definidos desde el inicio?' },
      { id: 2, text: '¿Controlan el avance real de obra frente al programado, y actúan a tiempo cuando detectan retrasos o sobrecostos?' },
      { id: 3, text: '¿Gestionan los riesgos de cada proyecto (demoras en permisos, cambios de diseño, subcontratistas) con planes de contingencia específicos?' },
      { id: 4, text: '¿Al cerrar un proyecto, documentan las lecciones aprendidas para que el siguiente sea más eficiente y rentable?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'energetico': [
    {
      key: 'operacion-red-electrica',
      label: 'Operación de Red Eléctrica',
      iconName: 'Flame',
      questions: [
        { id: 1, text: '¿Monitorean en tiempo real la calidad del voltaje y la frecuencia en su red para detectar y corregir anomalías antes de que afecten a los usuarios?' },
        { id: 2, text: '¿Controlan las pérdidas técnicas y no técnicas (hurto de energía) y tienen un plan activo para reducirlas?' },
        { id: 3, text: '¿Tienen acuerdos de nivel de servicio (tiempos máximos de restablecimiento) y los cumplen ante las autoridades reguladoras?' },
        { id: 4, text: '¿Gestionan la demanda en horas pico para evitar sobrecargas que dañen la infraestructura y generen penalizaciones?' },
      ],
    },
  ],
  'agua-saneamiento': [
    {
      key: 'calidad-agua-redes',
      label: 'Calidad del Agua y Redes',
      iconName: 'Droplets',
      questions: [
        { id: 1, text: '¿Realizan análisis de calidad del agua (potable y tratada) con la frecuencia que exige la norma y llevan los registros al día?' },
        { id: 2, text: '¿Tienen un mapa actualizado de la red de tuberías y conocen en qué estado se encuentra cada tramo para priorizar reparaciones?' },
        { id: 3, text: '¿Controlan las pérdidas de agua en la red (agua no facturada) y tienen un programa de detección y corrección de fugas?' },
        { id: 4, text: '¿Sus plantas de tratamiento de agua residual cumplen los parámetros de descarga que exige la autoridad ambiental sin incurrir en multas?' },
      ],
    },
  ],
  'construccion-civil': [
    {
      key: 'ejecucion-obra-publica',
      label: 'Ejecución de Obra Pública',
      iconName: 'Hammer',
      questions: [
        { id: 1, text: '¿Controlan los volúmenes de obra ejecutados y los comparan con lo pactado en el contrato para evitar diferencias que generen conflictos con el interventor?' },
        { id: 2, text: '¿Tienen un proceso riguroso de selección y supervisión de subcontratistas para garantizar calidad y cumplimiento de plazos?' },
        { id: 3, text: '¿Gestionan el flujo de caja del proyecto teniendo en cuenta los tiempos de aprobación de actas y pago por parte del contratante público?' },
        { id: 4, text: '¿Sus frentes de obra cumplen con las medidas de seguridad vial, señalización y protección a terceros que exige la ley?' },
      ],
    },
  ],
  'gestion-ambiental': [
    {
      key: 'operacion-residuos',
      label: 'Operación y Tratamiento de Residuos',
      iconName: 'Recycle',
      questions: [
        { id: 1, text: '¿Tienen trazabilidad documental de cada tipo de residuo que recogen, transportan o tratan, cumpliendo con los manifiestos y registros que exige la norma?' },
        { id: 2, text: '¿Controlan las rutas y frecuencias de recolección para optimizar el recorrido y reducir el costo por tonelada recogida?' },
        { id: 3, text: '¿Sus instalaciones de disposición final o tratamiento cuentan con los permisos ambientales vigentes y operan dentro de los parámetros autorizados?' },
        { id: 4, text: '¿Miden el porcentaje de residuos aprovechados frente al total recolectado y tienen metas para aumentar el aprovechamiento y reducir lo que va a relleno?' },
      ],
    },
  ],
};

export const SERVICIOS_PUBLICOS_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'servicios-publicos-energia',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en SERVICIOS PÚBLICOS, ENERGÍA E INFRAESTRUCTURA.
Aspectos críticos de perdurabilidad en este sector:
- La CONTINUIDAD DEL SERVICIO es la métrica de reputación más importante: las interrupciones generan sanciones regulatorias, pérdida de contratos y daño a la comunidad; se mide en horas fuera de servicio y tiempos de restablecimiento.
- La gestión de ACTIVOS DE LARGA VIDA ÚTIL (redes, plantas, maquinaria pesada) exige mantenimiento preventivo riguroso y planes de renovación, pues el deterioro es silencioso pero el colapso es repentino y costoso.
- El CUMPLIMIENTO REGULATORIO Y AMBIENTAL es no negociable: licencias vencidas, vertimientos fuera de norma o incumplimiento de estándares de calidad pueden detener la operación de un día para otro.
- Los ingresos dependen en gran medida de CONTRATOS Y LICITACIONES PÚBLICAS, lo que introduce riesgos de concentración, demoras en cobro, anticipos mal administrados y penalizaciones por incumplimiento de plazo.
- La COBRANZA Y MOROSIDAD (especialmente en servicios domiciliarios y tarifas reguladas) es una fuente crónica de estrés financiero; el control de pérdidas técnicas y no técnicas determina la rentabilidad real.
- La SEGURIDAD INDUSTRIAL es crítica: trabajos en altura, electricidad de alta tensión, espacios confinados y manejo de químicos exponen al personal a riesgos graves; un accidente puede paralizar la operación y generar pasivos legales cuantiosos.
- La GESTIÓN DE PROYECTOS DE OBRA PÚBLICA requiere control de cronograma, presupuesto y calidad en entornos complejos con interventorías estrictas, cambios de diseño frecuentes y pagos demorados.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del sector de servicios públicos, energía e infraestructura.`,
};
