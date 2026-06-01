/**
 * Cuestionario PILOTO — Logística, Transporte y Cadena de Suministro (B2B).
 *
 * Diseñado específicamente para el sector: las dimensiones y preguntas
 * reflejan los KPIs, riesgos y operativa propios de empresas de transporte,
 * distribución y almacenamiento (OTIF, costo por km, siniestralidad,
 * trazabilidad, concentración de clientes, cadena de frío, etc.).
 *
 * Mantiene el mismo lenguaje sencillo orientado a dueños de PyME que el resto
 * del diagnóstico, pero NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas',
    label: 'Finanzas y Costeo',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Saben con precisión cuánto les cuesta mover cada kilómetro o cada tonelada, incluyendo combustible, mantenimiento y peajes?' },
      { id: 2, text: 'Cuando sube el combustible o los repuestos, ¿tienen una fórmula clara para ajustar sus tarifas sin perder clientes?' },
      { id: 3, text: '¿Tienen reservas de caja para sostener la operación si un cliente grande se atrasa 60 o 90 días en pagar?' },
      { id: 4, text: '¿Conocen la rentabilidad real de cada ruta, cliente o vehículo, o trabajan con un promedio general?' },
    ],
  },
  {
    key: 'flota-activos',
    label: 'Flota y Activos',
    iconName: 'Truck',
    questions: [
      { id: 1, text: '¿Tienen un plan de mantenimiento preventivo por unidad (no esperan a que se dañe) y lo cumplen?' },
      { id: 2, text: '¿Saben la edad, el estado y el costo de operar cada vehículo o activo, y cuándo conviene reemplazarlo?' },
      { id: 3, text: '¿Cuentan con un plan para renovar la flota o los equipos antes de que el deterioro afecte el servicio?' },
      { id: 4, text: '¿Tienen control de repuestos, llantas y combustible que evite robos, desperdicio o paradas por falta de inventario?' },
    ],
  },
  {
    key: 'operaciones-entregas',
    label: 'Operaciones y Cumplimiento',
    iconName: 'Route',
    questions: [
      { id: 1, text: '¿Miden qué porcentaje de sus entregas llegan completas y a tiempo (OTIF), y trabajan para mejorarlo?' },
      { id: 2, text: '¿Planifican rutas y cargas para aprovechar al máximo cada viaje y reducir los kilómetros en vacío?' },
      { id: 3, text: '¿Tienen procesos escritos para la carga, el despacho y la entrega que cualquier operador pueda seguir?' },
      { id: 4, text: 'Si se daña un vehículo o falta un conductor, ¿pueden reasignar la operación sin que el cliente lo note?' },
    ],
  },
  {
    key: 'talento-conductores',
    label: 'Talento y Conductores',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Tienen baja rotación de conductores y operadores, o constantemente están reemplazando personal clave?' },
      { id: 2, text: '¿Capacitan a sus conductores en manejo seguro, atención al cliente y cuidado de la carga?' },
      { id: 3, text: 'Si su mejor conductor o jefe de operaciones renuncia mañana, ¿el servicio sigue funcionando igual?' },
      { id: 4, text: '¿Tienen una forma clara de contratar, evaluar y reconocer al personal según su desempeño y seguridad?' },
    ],
  },
  {
    key: 'riesgos-seguridad',
    label: 'Riesgos y Seguridad',
    iconName: 'ShieldAlert',
    questions: [
      { id: 1, text: '¿Tienen pólizas de seguro vigentes y suficientes para la flota, la carga y la responsabilidad ante terceros?' },
      { id: 2, text: '¿Miden y controlan la siniestralidad (accidentes, robos de carga, multas) con metas para reducirla?' },
      { id: 3, text: '¿Tienen un plan de acción definido para robos de carga, accidentes graves o bloqueos de vías?' },
      { id: 4, text: '¿Dependen de pocos clientes o pocas rutas, lo que pondría en riesgo el negocio si uno se cae?' },
    ],
  },
  {
    key: 'tecnologia-trazabilidad',
    label: 'Tecnología y Trazabilidad',
    iconName: 'Satellite',
    questions: [
      { id: 1, text: '¿Pueden rastrear en tiempo real dónde está cada vehículo y cada envío (GPS / seguimiento)?' },
      { id: 2, text: '¿Usan un sistema (TMS u otro) para gestionar pedidos, rutas y entregas, en lugar de hojas de cálculo sueltas?' },
      { id: 3, text: '¿Pueden darle al cliente información del estado de su envío sin tener que llamar al conductor?' },
      { id: 4, text: '¿La información de viajes, costos y combustible es confiable y está protegida contra pérdida o manipulación?' },
    ],
  },
  {
    key: 'comercial-clientes',
    label: 'Comercial y Clientes',
    iconName: 'Handshake',
    questions: [
      { id: 1, text: '¿Tienen contratos formales con sus clientes que aseguren volúmenes y tarifas, o trabajan "por viaje suelto"?' },
      { id: 2, text: '¿Conocen el nivel de satisfacción de sus clientes y por qué los elegirían a usted sobre la competencia?' },
      { id: 3, text: '¿Consiguen clientes nuevos de forma planificada, o dependen casi solo de referidos y del boca a boca?' },
      { id: 4, text: '¿Qué tan expuestos están si su cliente más grande decide montar su propia flota o cambiar de proveedor?' },
    ],
  },
  {
    key: 'gobernanza-cumplimiento',
    label: 'Gobernanza y Cumplimiento',
    iconName: 'Gavel',
    questions: [
      { id: 1, text: '¿Tienen al día todos los permisos, licencias y requisitos legales para operar el transporte sin riesgo de sanciones?' },
      { id: 2, text: '¿Las decisiones importantes se toman con datos de la operación, o "por instinto" del dueño?' },
      { id: 3, text: '¿Cada socio o directivo tiene claro su rol, y hay reglas escritas para el manejo de familiares en el negocio?' },
      { id: 4, text: '¿Cuentan con asesoría o un grupo que revise periódicamente el rumbo del negocio y su cumplimiento normativo?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'transporte-carga': [
    {
      key: 'gestion-carga',
      label: 'Gestión de Carga',
      iconName: 'PackageCheck',
      questions: [
        { id: 1, text: '¿Tienen control del peso y la ocupación de cada viaje para no transportar "aire" ni sobrecargar las unidades?' },
        { id: 2, text: '¿Documentan el estado de la carga al recibir y entregar, para evitar reclamos por daños o faltantes?' },
        { id: 3, text: '¿Optimizan los viajes de retorno para no volver vacíos después de una entrega?' },
        { id: 4, text: '¿Manejan combustible con controles (tarjetas, bitácoras) que eviten desvíos y consumos no justificados?' },
      ],
    },
  ],
  'transporte-pasajeros': [
    {
      key: 'seguridad-servicio-pasajeros',
      label: 'Seguridad y Servicio al Pasajero',
      iconName: 'BusFront',
      questions: [
        { id: 1, text: '¿Tienen protocolos y revisiones para garantizar la seguridad de los pasajeros en cada trayecto?' },
        { id: 2, text: '¿Controlan la puntualidad y el cumplimiento de horarios y rutas establecidas?' },
        { id: 3, text: '¿Recogen quejas y sugerencias de los pasajeros y las usan para mejorar el servicio?' },
        { id: 4, text: '¿Sus unidades cumplen con las condiciones de comodidad, limpieza y accesibilidad que esperan los pasajeros?' },
      ],
    },
  ],
  'distribucion-mayorista': [
    {
      key: 'inventario-capital-trabajo',
      label: 'Inventario y Capital de Trabajo',
      iconName: 'Boxes',
      questions: [
        { id: 1, text: '¿Saben qué productos rotan rápido y cuáles tienen "dormido" su dinero en el almacén?' },
        { id: 2, text: '¿Manejan niveles de inventario que eviten tanto los quiebres de stock como el exceso de mercancía?' },
        { id: 3, text: '¿Tienen acuerdos de plazo con proveedores alineados con lo que tardan en cobrar a sus clientes?' },
        { id: 4, text: '¿Controlan el vencimiento, la merma y el deterioro de la mercancía que distribuyen?' },
      ],
    },
  ],
  'almacenamiento': [
    {
      key: 'gestion-almacen-frio',
      label: 'Gestión de Almacén y Cadena de Frío',
      iconName: 'Warehouse',
      questions: [
        { id: 1, text: '¿Tienen el almacén organizado (ubicaciones, identificación) para localizar y despachar mercancía rápido y sin errores?' },
        { id: 2, text: '¿Controlan y registran la temperatura cuando manejan productos que requieren cadena de frío?' },
        { id: 3, text: '¿Cuentan con respaldo (plantas eléctricas, equipos redundantes) para no perder mercancía ante una falla?' },
        { id: 4, text: '¿Llevan control de las entradas y salidas que cuadre el inventario físico con el del sistema?' },
      ],
    },
  ],
  'servicios-aduaneros': [
    {
      key: 'cumplimiento-aduanero',
      label: 'Cumplimiento Aduanero y Documentación',
      iconName: 'FileCheck',
      questions: [
        { id: 1, text: '¿Tienen los procesos y el personal certificado para gestionar la documentación aduanera sin errores ni demoras?' },
        { id: 2, text: '¿Se mantienen actualizados ante cambios en normativa, aranceles y requisitos de aduana?' },
        { id: 3, text: '¿Tienen trazabilidad documental de cada operación que respalde una auditoría o inspección?' },
        { id: 4, text: '¿Coordinan eficazmente con puertos, transportistas y autoridades para evitar sobrecostos por almacenaje o retención?' },
      ],
    },
  ],
};

export const LOGISTICA_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'logistica-cadena-suministro',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en LOGÍSTICA, TRANSPORTE Y CADENA DE SUMINISTRO (B2B).
Aspectos críticos de perdurabilidad en este sector:
- La rentabilidad se define en el COSTO POR KM/TONELADA y el control de combustible y mantenimiento; márgenes estrechos castigan el costeo deficiente.
- La concentración de clientes y la informalidad contractual ("viaje suelto") son una fuente típica de fragilidad estructural.
- La siniestralidad (accidentes, robo de carga) y el subaseguramiento pueden quebrar el negocio de golpe.
- La gestión de flota/activos (mantenimiento preventivo, renovación, depreciación) determina la continuidad operativa.
- La trazabilidad (GPS/TMS) y el cumplimiento OTIF son hoy higiene competitiva exigida por clientes corporativos.
- El cumplimiento regulatorio (permisos, licencias) y la dependencia de personal clave (conductores, jefe de operaciones) son riesgos recurrentes.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos del rubro logístico.`,
};
