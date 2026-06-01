/**
 * Cuestionario — Servicios Financieros y Profesionales.
 *
 * Dimensiones y preguntas específicamente diseñadas para empresas de servicios
 * financieros, consultoría, seguros, inmobiliario y agencias; reflejan los
 * riesgos, KPIs y lenguaje propios del sector: gestión de riesgo y compliance,
 * concentración de cartera, confianza reputacional, honorarios/comisiones,
 * protección de datos y gobierno corporativo.
 *
 * Mantiene el lenguaje sencillo orientado a dueños de PyME; NO es la plantilla
 * genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-honorarios',
    label: 'Finanzas y Honorarios',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Conocen el margen real de cada servicio o línea de negocio, más allá de los ingresos totales de la empresa?' },
      { id: 2, text: '¿Tienen un modelo de tarifas o comisiones claro, escrito y comunicado, que les permita ajustarlo cuando cambian sus costos?' },
      { id: 3, text: '¿Cuentan con reservas de caja para operar varios meses si un cliente grande retrasa pagos o cancela el contrato?' },
      { id: 4, text: '¿Tienen proyecciones financieras actualizadas que les muestren hacia dónde va el negocio en el próximo año?' },
    ],
  },
  {
    key: 'riesgo-cumplimiento',
    label: 'Riesgo y Cumplimiento',
    iconName: 'ShieldAlert',
    questions: [
      { id: 1, text: '¿Conocen con claridad las regulaciones que aplican a su actividad y tienen a alguien responsable de que se cumplan?' },
      { id: 2, text: '¿Realizan debida diligencia (verificación de identidad y origen de fondos) sobre sus clientes antes de comenzar una relación comercial?' },
      { id: 3, text: '¿Tienen un proceso documentado para detectar y reportar operaciones sospechosas o inusuales, si corresponde a su actividad?' },
      { id: 4, text: '¿Se mantienen actualizados ante cambios en normativas, impuestos o regulaciones que afecten su sector?' },
    ],
  },
  {
    key: 'reputacion-confianza',
    label: 'Reputación y Confianza',
    iconName: 'ShieldCheck',
    questions: [
      { id: 1, text: '¿Sus clientes los recomiendan activamente a otros, y tienen formas de medir y fomentar esa recomendación?' },
      { id: 2, text: '¿Tienen un proceso definido para atender quejas o situaciones donde el cliente no quedó satisfecho con el servicio?' },
      { id: 3, text: '¿Cuidan activamente su reputación en canales digitales (redes, reseñas, menciones en medios)?' },
      { id: 4, text: '¿Su empresa tiene una propuesta de valor diferenciada que los clientes reconocen claramente, más allá del precio?' },
    ],
  },
  {
    key: 'cartera-concentracion',
    label: 'Cartera y Concentración',
    iconName: 'PiggyBank',
    questions: [
      { id: 1, text: '¿Conocen qué porcentaje de sus ingresos depende de su cliente más grande, y tienen plan si ese cliente se va?' },
      { id: 2, text: '¿Tienen una cartera activa de clientes diversificada, o dependen de dos o tres cuentas para sostener el negocio?' },
      { id: 3, text: '¿Miden la rentabilidad de cada cliente o cuenta, y saben cuáles realmente les generan ganancia?' },
      { id: 4, text: '¿Tienen estrategias activas para conseguir clientes nuevos sin depender solo del boca a boca o de referidos?' },
    ],
  },
  {
    key: 'talento-experto',
    label: 'Talento Profesional',
    iconName: 'GraduationCap',
    questions: [
      { id: 1, text: '¿El conocimiento y las relaciones clave del negocio están en manos de varias personas, o todo depende del dueño o de uno o dos expertos?' },
      { id: 2, text: '¿Tienen un plan para desarrollar el talento interno y mantener las certificaciones o licencias profesionales al día?' },
      { id: 3, text: '¿Pueden mantener el servicio a sus clientes si una persona clave renuncia o cae enferma por varias semanas?' },
      { id: 4, text: '¿Tienen mecanismos para retener a sus profesionales clave (compensación, desarrollo, ambiente) y reducir la rotación?' },
    ],
  },
  {
    key: 'proteccion-datos',
    label: 'Protección de Datos',
    iconName: 'Lock',
    questions: [
      { id: 1, text: '¿Tienen políticas claras sobre quién puede acceder a la información confidencial de clientes y cómo se protege?' },
      { id: 2, text: '¿Sus colaboradores conocen sus obligaciones de confidencialidad y han firmado acuerdos de no divulgación?' },
      { id: 3, text: '¿Tienen respaldos seguros de la información de clientes y un plan para recuperarse si sufren una pérdida o un ataque digital?' },
      { id: 4, text: '¿Cumplen con las leyes de protección de datos personales que aplican en los países donde operan?' },
    ],
  },
  {
    key: 'operaciones-servicio',
    label: 'Operaciones y Entrega',
    iconName: 'Settings',
    questions: [
      { id: 1, text: '¿Tienen procesos documentados para prestar sus servicios de manera consistente, sin que la calidad dependa solo de quién lo ejecuta?' },
      { id: 2, text: '¿Miden la satisfacción del cliente al cierre de cada proyecto o relación, y usan ese resultado para mejorar?' },
      { id: 3, text: '¿Pueden incorporar nuevos proyectos o clientes sin que ello comprometa la calidad de los servicios actuales?' },
      { id: 4, text: '¿Tienen herramientas de gestión (CRM, plataformas de proyecto, sistemas de documentación) que hagan la operación más ágil y trazable?' },
    ],
  },
  {
    key: 'gobernanza-profesional',
    label: 'Gobernanza Corporativa',
    iconName: 'Gavel',
    questions: [
      { id: 1, text: '¿Las decisiones importantes del negocio se toman con información y datos, o principalmente por intuición del dueño o socio principal?' },
      { id: 2, text: '¿Tienen contratos formales con sus clientes que definen claramente el alcance, los honorarios y la forma de resolver conflictos?' },
      { id: 3, text: '¿Cada socio o directivo tiene claro su rol y hay reglas escritas sobre cómo resolver desacuerdos entre socios?' },
      { id: 4, text: '¿Cuentan con asesoría legal y contable externa que revise periódicamente el estado del negocio y sus obligaciones?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'banca-finanzas': [
    {
      key: 'gestion-credito-liquidez',
      label: 'Crédito y Liquidez',
      iconName: 'CreditCard',
      questions: [
        { id: 1, text: '¿Tienen políticas claras para evaluar a quién le otorgan crédito o financiamiento, y miden la tasa de morosidad de su cartera?' },
        { id: 2, text: '¿Controlan los índices de liquidez y solvencia, y tienen alertas tempranas si los niveles bajan de lo aceptable?' },
        { id: 3, text: '¿Cuentan con provisiones suficientes para cubrir la cartera vencida sin afectar la operación?' },
        { id: 4, text: '¿Sus procesos de captación y colocación cumplen con las normas del regulador financiero que los supervisa?' },
      ],
    },
  ],
  'gestion-patrimonial': [
    {
      key: 'gestion-portafolios',
      label: 'Portafolios e Inversiones',
      iconName: 'LineChart',
      questions: [
        { id: 1, text: '¿Tienen una metodología clara y documentada para construir y gestionar los portafolios de sus clientes según su perfil de riesgo?' },
        { id: 2, text: '¿Informan a sus clientes periódicamente sobre el rendimiento de sus inversiones de forma transparente y comprensible?' },
        { id: 3, text: '¿Sus asesores cuentan con las certificaciones y habilitaciones exigidas por el regulador para prestar servicios de inversión?' },
        { id: 4, text: '¿Tienen controles para evitar conflictos de interés al recomendar productos financieros a sus clientes?' },
      ],
    },
  ],
  'seguros': [
    {
      key: 'suscripcion-siniestros',
      label: 'Suscripción y Siniestros',
      iconName: 'FileCheck',
      questions: [
        { id: 1, text: '¿Tienen criterios claros de suscripción que les permitan evaluar el riesgo de cada cliente antes de emitir una póliza?' },
        { id: 2, text: '¿Miden la siniestralidad de su cartera y detectan tendencias que podrían afectar la rentabilidad del negocio?' },
        { id: 3, text: '¿Sus procesos de atención de siniestros son rápidos, transparentes y cumplen los plazos regulatorios de respuesta?' },
        { id: 4, text: '¿Cuentan con reaseguro o mecanismos para proteger a la empresa ante siniestros de alta severidad?' },
      ],
    },
  ],
  'inmobiliario': [
    {
      key: 'gestion-proyectos-inmobiliarios',
      label: 'Proyectos Inmobiliarios',
      iconName: 'Building2',
      questions: [
        { id: 1, text: '¿Tienen un proceso riguroso de evaluación financiera y legal antes de comprometerse con un proyecto o inversión inmobiliaria?' },
        { id: 2, text: '¿Controlan el avance, el presupuesto y los permisos de los proyectos en desarrollo para evitar sobrecostos o paralizaciones?' },
        { id: 3, text: '¿Tienen relaciones consolidadas con instituciones financieras para obtener crédito puente o hipotecario de manera ágil?' },
        { id: 4, text: '¿Sus contratos de venta, arrendamiento o administración protegen a la empresa ante incumplimientos de compradores o inquilinos?' },
      ],
    },
  ],
  'consultoria-estrategica': [
    {
      key: 'entrega-proyectos',
      label: 'Entrega y Metodología',
      iconName: 'Target',
      questions: [
        { id: 1, text: '¿Tienen metodologías estandarizadas para gestionar proyectos que aseguren entregas a tiempo y dentro del alcance acordado?' },
        { id: 2, text: '¿Documentan el trabajo realizado de forma que el cliente pueda entender y aplicar los resultados sin depender de ustedes permanentemente?' },
        { id: 3, text: '¿Miden el impacto real que sus servicios tienen en el negocio del cliente, y usan esos resultados para ganar nuevos contratos?' },
        { id: 4, text: '¿Tienen controles de calidad internos antes de entregar cualquier producto (informe, estrategia, diseño de sistema) al cliente?' },
      ],
    },
  ],
  'publicidad-marketing': [
    {
      key: 'resultados-creatividad',
      label: 'Resultados y Creatividad',
      iconName: 'Palette',
      questions: [
        { id: 1, text: '¿Miden el retorno que generan sus campañas para los clientes, y usan esos datos para justificar sus honorarios y renovar contratos?' },
        { id: 2, text: '¿Tienen procesos claros de briefing, aprobación y producción que eviten retrabajos y conflictos con los clientes?' },
        { id: 3, text: '¿Protegen la propiedad intelectual de las ideas y materiales creativos que producen para sus clientes?' },
        { id: 4, text: '¿Tienen acceso a talento creativo y técnico actualizado (diseño digital, pauta programática, IA) para mantener la competitividad de sus propuestas?' },
      ],
    },
  ],
};

export const SERVICIOS_FINANCIEROS_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'servicios-financieros-profesionales',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en SERVICIOS FINANCIEROS Y PROFESIONALES.
Aspectos críticos de perdurabilidad en este sector:
- La gestión de riesgo y cumplimiento regulatorio (compliance, prevención de lavado de activos) es una obligación no negociable; el incumplimiento puede significar la cancelación de licencias o sanciones que pongan fin al negocio.
- La confianza y la reputación son el activo más valioso: un solo escándalo ético o una brecha de confidencialidad puede destruir relaciones construidas durante años.
- La concentración de cartera (dependencia de pocos clientes o cuentas grandes) es el riesgo estructural más frecuente y menos reconocido por los dueños.
- El conocimiento experto y las relaciones clave suelen estar concentradas en una o dos personas (dueño o socio principal); esto representa un riesgo severo de continuidad.
- La protección de datos personales y financieros de clientes es una obligación legal y un diferenciador competitivo; la negligencia expone a la empresa a demandas y pérdida de contratos.
- El modelo de honorarios o comisiones debe estar bien estructurado para proteger márgenes ante la presión de precio de mercado y la informalidad de algunos subsectores.
- El gobierno corporativo —contratos claros, roles definidos entre socios, asesoría legal actualizada— determina la capacidad de escalar y resistir disputas internas.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios de empresas de servicios financieros y profesionales.`,
};
