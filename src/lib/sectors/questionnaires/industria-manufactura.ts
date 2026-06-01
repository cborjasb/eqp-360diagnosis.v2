/**
 * Cuestionario — Industria y Manufactura (Transformación).
 *
 * Diseñado específicamente para el sector: las dimensiones y preguntas
 * reflejan los KPIs, riesgos y operativa propios de empresas de producción
 * y manufactura (OEE, mermas, control de calidad, capacidad instalada,
 * mantenimiento de maquinaria, costeo de producción, inventario de materia
 * prima, seguridad industrial, certificaciones, etc.).
 *
 * Mantiene el mismo lenguaje sencillo orientado a dueños de PyME que el resto
 * del diagnóstico, pero NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-costeo',
    label: 'Finanzas y Costeo',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Saben con precisión cuánto les cuesta producir cada unidad o lote, incluyendo materia prima, mano de obra directa, energía y gastos de fábrica?' },
      { id: 2, text: 'Cuando sube el precio de insumos o energía, ¿tienen una fórmula clara para ajustar sus precios de venta sin sacrificar el margen?' },
      { id: 3, text: '¿Cuentan con reservas de caja para sostener la producción si un cliente grande se atrasa en pagar o si hay un paro técnico inesperado?' },
      { id: 4, text: '¿Conocen la rentabilidad real de cada línea de producto o referencia, o trabajan con un promedio general de toda la planta?' },
    ],
  },
  {
    key: 'eficiencia-produccion',
    label: 'Eficiencia de Producción',
    iconName: 'Factory',
    questions: [
      { id: 1, text: '¿Miden qué porcentaje del tiempo sus máquinas y líneas están produciendo efectivamente (disponibilidad, rendimiento y calidad combinados — OEE u otro indicador similar)?' },
      { id: 2, text: '¿Tienen metas claras de producción por turno o por línea, y saben en tiempo real si las están cumpliendo?' },
      { id: 3, text: '¿Han identificado los cuellos de botella que limitan la capacidad de su planta y tienen un plan para resolverlos?' },
      { id: 4, text: 'Si mañana les llega un pedido el doble del tamaño habitual, ¿su planta podría responder sin colapsar la calidad ni los tiempos de entrega?' },
    ],
  },
  {
    key: 'calidad-control',
    label: 'Calidad y Control',
    iconName: 'ClipboardList',
    questions: [
      { id: 1, text: '¿Tienen un proceso formal de control de calidad que detecte defectos durante la producción (no solo al final) y registre los resultados?' },
      { id: 2, text: '¿Miden cuánto producto rechazan, reprocesna o devuelven los clientes, y trabajan activamente para reducirlo?' },
      { id: 3, text: '¿Cuentan con especificaciones técnicas escritas para cada producto que cualquier operario pueda seguir, garantizando la misma calidad en cada lote?' },
      { id: 4, text: '¿Sus clientes o el mercado les exigen certificaciones de calidad (ISO, HACCP, BPM u otras) y su empresa las cumple vigentemente?' },
    ],
  },
  {
    key: 'mantenimiento-activos',
    label: 'Mantenimiento y Activos',
    iconName: 'Wrench',
    questions: [
      { id: 1, text: '¿Tienen un plan de mantenimiento preventivo para su maquinaria y equipos (no esperan a que se dañen para actuar)?' },
      { id: 2, text: '¿Saben la vida útil y el costo de operar cada máquina o equipo principal, y cuándo conviene reemplazarla en lugar de seguir reparándola?' },
      { id: 3, text: '¿Tienen inventario de repuestos críticos para no parar la producción días o semanas esperando una pieza?' },
      { id: 4, text: '¿Registran los paros de maquinaria (causa, duración, costo) y usan esa información para mejorar el mantenimiento?' },
    ],
  },
  {
    key: 'materia-prima-inventario',
    label: 'Materias Primas e Inventario',
    iconName: 'Boxes',
    questions: [
      { id: 1, text: '¿Tienen niveles de inventario de materia prima que eviten tanto los paros por desabasto como el exceso de capital inmovilizado en bodega?' },
      { id: 2, text: '¿Conocen el tiempo de entrega real de sus proveedores clave y ajustan sus compras para no quedar desabastecidos?' },
      { id: 3, text: '¿Tienen al menos un proveedor alternativo para los insumos más críticos, en caso de que el principal falle o suba los precios de golpe?' },
      { id: 4, text: '¿Controlan las mermas, el desperdicio y los vencimientos de materia prima, y tienen metas para reducirlos?' },
    ],
  },
  {
    key: 'seguridad-industrial',
    label: 'Seguridad Industrial',
    iconName: 'HardHat',
    questions: [
      { id: 1, text: '¿Sus instalaciones y procesos cumplen con las normas de seguridad industrial vigentes, y tienen al día las inspecciones y certificados correspondientes?' },
      { id: 2, text: '¿Registran y analizan los incidentes y accidentes de trabajo para identificar causas y evitar que se repitan?' },
      { id: 3, text: '¿Sus operarios reciben capacitación regular en uso de EPP, manejo seguro de maquinaria y protocolos de emergencia?' },
      { id: 4, text: '¿Tienen un plan de emergencia documentado (incendios, derrames, fallas eléctricas) que el personal conoce y ha practicado?' },
    ],
  },
  {
    key: 'talento-planta',
    label: 'Talento de Planta',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Tienen baja rotación de operarios y técnicos clave, o constantemente están reemplazando personal con experiencia?' },
      { id: 2, text: '¿Capacitan regularmente a sus operarios en el manejo correcto de maquinaria, estándares de calidad y seguridad?' },
      { id: 3, text: 'Si su mejor técnico de producción o jefe de planta renuncia mañana, ¿la operación sigue funcionando sin que la calidad o la producción se vean afectadas?' },
      { id: 4, text: '¿Tienen una forma clara de contratar, evaluar y reconocer al personal de planta según su desempeño y cumplimiento de estándares?' },
    ],
  },
  {
    key: 'gobernanza-cumplimiento',
    label: 'Gobernanza y Cumplimiento',
    iconName: 'Gavel',
    questions: [
      { id: 1, text: '¿Tienen al día todos los permisos ambientales, sanitarios y de funcionamiento que exige la ley para operar la planta sin riesgo de sanciones o cierre?' },
      { id: 2, text: '¿Las decisiones de inversión en equipos, nuevas líneas o cambios de producto se toman con datos de costos y proyecciones, no solo por intuición del dueño?' },
      { id: 3, text: '¿Cada socio o directivo tiene claro su rol dentro de la empresa manufacturera, con reglas escritas para el manejo de familiares en el negocio?' },
      { id: 4, text: '¿Cuentan con asesoría o un grupo que revise periódicamente el rumbo de la empresa y su cumplimiento normativo (ambiental, laboral, fiscal)?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'alimentaria-bebidas': [
    {
      key: 'inocuidad-trazabilidad-alimentos',
      label: 'Inocuidad y Trazabilidad',
      iconName: 'Thermometer',
      questions: [
        { id: 1, text: '¿Aplican las Buenas Prácticas de Manufactura (BPM) y tienen registros que demuestren el control de puntos críticos (HACCP o equivalente)?' },
        { id: 2, text: '¿Pueden rastrear cada lote producido desde la materia prima hasta el consumidor final, para actuar rápido ante un retiro del mercado?' },
        { id: 3, text: '¿Controlan y registran temperaturas, tiempos y condiciones de proceso en cada etapa crítica de producción?' },
        { id: 4, text: '¿Tienen procedimientos claros para manejar alérgenos, contaminación cruzada y limpieza de equipos entre lotes?' },
      ],
    },
  ],
  'metalmecanica-siderurgica': [
    {
      key: 'precision-metrologia',
      label: 'Precisión y Metrología',
      iconName: 'Target',
      questions: [
        { id: 1, text: '¿Sus herramientas de medición (calibres, micrómetros, equipos de inspección) están calibradas y con trazabilidad metrológica vigente?' },
        { id: 2, text: '¿Miden y controlan las tolerancias dimensionales de las piezas durante el proceso para evitar reprocesos y chatarra?' },
        { id: 3, text: '¿Tienen fichas técnicas y planos actualizados para cada pieza o referencia que fabrican, accesibles en planta?' },
        { id: 4, text: '¿Controlan el rendimiento del material metálico (acero, aluminio, etc.) para reducir el desperdicio por corte o fundición?' },
      ],
    },
  ],
  'quimica-petroquimica': [
    {
      key: 'gestion-sustancias-peligrosas',
      label: 'Gestión de Sustancias Peligrosas',
      iconName: 'FlaskConical',
      questions: [
        { id: 1, text: '¿Tienen fichas de seguridad (MSDS/SDS) actualizadas para todos los productos químicos que manejan y el personal las conoce?' },
        { id: 2, text: '¿Cuentan con sistemas de contención, ventilación y EPP adecuados para prevenir exposición o derrames de sustancias peligrosas?' },
        { id: 3, text: '¿Tienen permisos y procedimientos vigentes para el almacenamiento, transporte y disposición final de residuos químicos?' },
        { id: 4, text: '¿Realizan simulacros regulares de emergencia química y tienen brigadas entrenadas para derrames o fugas?' },
      ],
    },
  ],
  'farmaceutica': [
    {
      key: 'buenas-practicas-manufactura-farmaceutica',
      label: 'BPM Farmacéutica y Regulatorio',
      iconName: 'Pill',
      questions: [
        { id: 1, text: '¿Sus instalaciones, equipos y procesos cumplen con las BPM farmacéuticas exigidas por la autoridad sanitaria del país, y tienen la última inspección aprobada?' },
        { id: 2, text: '¿Tienen un sistema de gestión de lotes que garantice la trazabilidad completa de cada producto desde las materias primas hasta la distribución?' },
        { id: 3, text: '¿Tienen un departamento o responsable de garantía de calidad independiente de producción, que aprueba o rechaza cada lote antes de liberar?' },
        { id: 4, text: '¿Sus procedimientos de estabilidad y control de producto terminado cumplen con los requisitos del registro sanitario vigente?' },
      ],
    },
  ],
  'manufactura-ligera': [
    {
      key: 'eficiencia-linea-confeccion',
      label: 'Eficiencia de Línea y Colecciones',
      iconName: 'Scissors',
      questions: [
        { id: 1, text: '¿Miden la eficiencia de sus líneas de costura o ensamble y tienen metas de piezas por hora por operaria que se monitorean en tiempo real?' },
        { id: 2, text: '¿Controlan el consumo de tela, cuero u otro material principal para reducir el desperdicio por corte o diseño de moldes?' },
        { id: 3, text: '¿Tienen una planeación de colecciones y capacidad que les permita cumplir los pedidos de temporada sin saturar la planta ni generar horas extra excesivas?' },
        { id: 4, text: '¿Garantizan la talla, el color y el acabado correcto en cada lote, con controles que eviten devoluciones por diferencias de producción?' },
      ],
    },
  ],
  'automotriz-ensamblaje': [
    {
      key: 'control-ensamble-proveedores',
      label: 'Control de Ensamble y Proveedores',
      iconName: 'Car',
      questions: [
        { id: 1, text: '¿Tienen un control de calidad por estaciones de ensamble que detecte defectos antes de pasar al siguiente paso, evitando costosos reprocesos al final de la línea?' },
        { id: 2, text: '¿Evalúan formalmente a sus proveedores de partes y componentes por calidad, entrega y precio, y tienen alternativas ante fallas de suministro?' },
        { id: 3, text: '¿Su planta puede ajustar el ritmo de producción (takt time) ante variaciones de demanda sin generar inventarios excesivos de vehículos o unidades terminadas?' },
        { id: 4, text: '¿Tienen trazabilidad de los números de serie y lotes de componentes instalados en cada unidad terminada, para gestionar garantías o llamados a revisión?' },
      ],
    },
  ],
  'papel-carton-empaques': [
    {
      key: 'rendimiento-fibra-impresion',
      label: 'Rendimiento de Fibra e Impresión',
      iconName: 'Newspaper',
      questions: [
        { id: 1, text: '¿Controlan el rendimiento del papel, cartón o fibra por orden de producción para reducir el desperdicio por corte, reproceso o mal ajuste de máquina?' },
        { id: 2, text: '¿Tienen control de color y registro de impresión que garantice que el empaque entregado cumpla con las especificaciones del cliente en cada tirada?' },
        { id: 3, text: '¿Gestionan el consumo de tintas, barnices y adhesivos para evitar desperdicios y variaciones de costo entre pedidos similares?' },
        { id: 4, text: '¿Pueden atender pedidos urgentes o de corta tirada sin que ello dispare el costo unitario o genere cuellos de botella en maquinaria de impresión o corte?' },
      ],
    },
  ],
  'materiales-construccion': [
    {
      key: 'control-mezcla-resistencia',
      label: 'Control de Mezcla y Resistencia',
      iconName: 'HardHat',
      questions: [
        { id: 1, text: '¿Realizan ensayos de resistencia, dureza o especificación técnica en cada lote de cemento, bloque, cerámica u otro material, y registran los resultados?' },
        { id: 2, text: '¿Controlan con precisión las proporciones de mezcla (agua, aditivos, áridos) para garantizar que el producto final cumpla las normas técnicas del país?' },
        { id: 3, text: '¿Tienen identificados y controlados los puntos del proceso donde el rechazo o la merma de material es más alto, y trabajan activamente para reducirlos?' },
        { id: 4, text: '¿Sus embalajes y condiciones de despacho protegen el producto hasta llegar al cliente, evitando rupturas, humedad o contaminación que generen devoluciones?' },
      ],
    },
  ],
};

export const INDUSTRIA_MANUFACTURA_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'industria-manufactura',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en INDUSTRIA Y MANUFACTURA (TRANSFORMACIÓN).
Aspectos críticos de perdurabilidad en este sector:
- La competitividad se juega en el COSTO DE PRODUCCIÓN POR UNIDAD y en la eficiencia de planta (OEE); márgenes estrechos penalizan el descontrol de mermas, energía y mano de obra ociosa.
- La calidad deficiente (rechazos, reprocesos, devoluciones) destruye margen y reputación; los sistemas de control en proceso son más baratos que corregir al final de la línea.
- El mantenimiento correctivo reactivo (esperar a que se dañe la máquina) genera paros de planta que pueden costar más que toda una campaña de mantenimiento preventivo anual.
- La concentración en pocos clientes o en un solo proveedor de insumos clave es una fuente típica de fragilidad estructural en manufactura.
- Las certificaciones (ISO 9001, HACCP, BPM, normas técnicas nacionales) son hoy requisito de entrada a cadenas de valor formales y clientes corporativos.
- La seguridad industrial deficiente expone a la empresa a accidentes, multas, cierres temporales y pérdida de personal clave entrenado.
- La gestión del inventario de materia prima (punto de reorden, cobertura, rotación) determina tanto la continuidad productiva como la eficiencia del capital de trabajo.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del sector manufacturero.`,
};
