/**
 * Cuestionario — Hospitalidad, Turismo y Entretenimiento.
 *
 * Las dimensiones y preguntas reflejan los KPIs, riesgos y operativa propios
 * del sector: ocupación/estacionalidad, reputación online, gestión de canales
 * y reservas (OTAs), calidad del personal de contacto, control de costos de
 * alimentos e insumos, picos de demanda, sanidad/higiene y fidelización.
 *
 * Autoevaluación 0-5. Lenguaje sencillo para dueños de PyME; tono uniforme
 * con el resto del diagnóstico ("usted/su empresa").
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-costos',
    label: 'Finanzas y Control de Costos',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Conocen con precisión cuánto les cuesta producir cada servicio (habitación, plato, evento) y si el precio que cobran les deja ganancia real?' },
      { id: 2, text: '¿Tienen reservas de caja para sostener la operación durante los meses de temporada baja sin endeudarse?' },
      { id: 3, text: '¿Monitorean mensualmente los costos de alimentos, bebidas e insumos para detectar desperdicios o desvíos a tiempo?' },
      { id: 4, text: '¿Tienen un plan financiero que contemple las variaciones de ingresos entre temporada alta y baja, con acciones concretas para cada escenario?' },
    ],
  },
  {
    key: 'ocupacion-demanda',
    label: 'Ocupación y Demanda',
    iconName: 'Calendar',
    questions: [
      { id: 1, text: '¿Conocen su tasa de ocupación o de uso por temporada y tienen estrategias definidas para mejorarla en los períodos de menor demanda?' },
      { id: 2, text: '¿Ajustan sus tarifas o precios según la demanda esperada (temporada alta, eventos locales, fin de semana) de forma planificada?' },
      { id: 3, text: '¿Cuando hay picos de demanda (feriados, festivales), pueden atender el volumen máximo sin que la calidad del servicio se deteriore?' },
      { id: 4, text: '¿Tienen alianzas o paquetes que les generen ingresos en épocas flojas, por ejemplo con grupos corporativos, escuelas o eventos locales?' },
    ],
  },
  {
    key: 'reputacion-digital',
    label: 'Reputación y Presencia Digital',
    iconName: 'Globe',
    questions: [
      { id: 1, text: '¿Monitorean activamente sus reseñas en Google, TripAdvisor, Booking u otras plataformas y responden a todas, tanto positivas como negativas?' },
      { id: 2, text: '¿Su calificación promedio en las principales plataformas de reseñas está por encima de la de sus competidores directos?' },
      { id: 3, text: '¿Tienen una estrategia para pedirle a los clientes satisfechos que dejen una reseña, y un protocolo para manejar quejas antes de que lleguen a publicarse?' },
      { id: 4, text: '¿Su sitio web y redes sociales muestran de forma atractiva y actualizada lo que su empresa ofrece, con fotos, precios y formas de contacto claras?' },
    ],
  },
  {
    key: 'canales-reservas',
    label: 'Canales y Gestión de Reservas',
    iconName: 'CreditCard',
    questions: [
      { id: 1, text: '¿Tienen un sistema centralizado que muestre en tiempo real la disponibilidad y evite dobles reservas, ya sea que el cliente llegue por OTA, teléfono, web o presencialmente?' },
      { id: 2, text: '¿Conocen cuánto les cuesta cada canal de venta (comisión de OTA, costo de publicidad directa) y si la mezcla de canales les deja margen?' },
      { id: 3, text: '¿Cuentan con un canal de reserva directa (web, WhatsApp, teléfono) que les permita vender sin depender completamente de intermediarios?' },
      { id: 4, text: '¿El proceso de reserva, confirmación y cobro es sencillo para el cliente y no genera errores ni reclamos frecuentes?' },
    ],
  },
  {
    key: 'calidad-servicio-personal',
    label: 'Calidad de Servicio y Personal de Contacto',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Su personal que atiende directamente al cliente (recepción, meseros, guías, anfitriones) recibe capacitación continua en servicio y en los estándares de la empresa?' },
      { id: 2, text: '¿Tienen procesos escritos de atención al cliente (saludo, manejo de quejas, protocolos de servicio) que todo el equipo conoce y aplica?' },
      { id: 3, text: '¿Miden la satisfacción del cliente durante o después de la visita (encuestas, conversación directa) y usan esa información para mejorar?' },
      { id: 4, text: 'Si un miembro clave de su equipo de atención falta, ¿el nivel de servicio que recibe el cliente se mantiene igual?' },
    ],
  },
  {
    key: 'sanidad-higiene',
    label: 'Sanidad e Higiene',
    iconName: 'ShieldCheck',
    questions: [
      { id: 1, text: '¿Tienen procedimientos escritos de limpieza, desinfección y manejo de alimentos que cumplan con las normas sanitarias vigentes?' },
      { id: 2, text: '¿El personal que manipula alimentos o espacios de uso común recibe capacitación en higiene y cuenta con sus certificaciones al día?' },
      { id: 3, text: '¿Tienen registros de las revisiones sanitarias y de las acciones correctivas tomadas cuando se detecta alguna falla?' },
      { id: 4, text: '¿Sus instalaciones (cocina, baños, habitaciones, áreas comunes) se mantienen en condiciones que superan las expectativas del cliente, no solo las mínimas legales?' },
    ],
  },
  {
    key: 'fidelizacion-experiencia',
    label: 'Fidelización y Experiencia del Cliente',
    iconName: 'Handshake',
    questions: [
      { id: 1, text: '¿Tienen una base de datos actualizada de sus clientes anteriores y les envían comunicaciones personalizadas para invitarlos a volver?' },
      { id: 2, text: '¿Ofrecen alguna forma de reconocer y premiar a los clientes frecuentes (descuentos, beneficios, upgrades, trato preferencial)?' },
      { id: 3, text: '¿El cliente percibe que la experiencia que usted ofrece es claramente diferente o mejor que la de sus competidores directos?' },
      { id: 4, text: '¿Miden qué porcentaje de sus clientes regresan o los recomiendan, y ese indicador está mejorando con el tiempo?' },
    ],
  },
  {
    key: 'operaciones-gobernanza',
    label: 'Operaciones y Gobernanza',
    iconName: 'Settings',
    questions: [
      { id: 1, text: '¿Los procesos operativos clave (apertura, cierre, compras, inventarios, mantenimiento) están documentados y cualquier persona puede seguirlos sin depender del dueño?' },
      { id: 2, text: '¿Tienen al día todos los permisos, licencias y obligaciones legales para operar sin riesgo de sanciones o cierres?' },
      { id: 3, text: '¿Las decisiones importantes del negocio se toman con datos (ocupación, costos, satisfacción) o principalmente por intuición del dueño?' },
      { id: 4, text: '¿Tienen un plan de contingencia para situaciones que puedan afectar la operación (falla eléctrica, ausencia de personal clave, emergencia sanitaria)?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'alojamiento': [
    {
      key: 'gestion-habitaciones',
      label: 'Gestión de Habitaciones y Propiedad',
      iconName: 'Bed',
      questions: [
        { id: 1, text: '¿Tienen un programa de mantenimiento preventivo de habitaciones e instalaciones que evite quejas por averías durante la estadía del huésped?' },
        { id: 2, text: '¿Controlan el RevPAR (ingreso por habitación disponible) o una medida equivalente que les diga si están maximizando el ingreso de su inventario?' },
        { id: 3, text: '¿El proceso de check-in y check-out es ágil, sin filas ni errores, y deja una primera y última impresión positiva en el huésped?' },
        { id: 4, text: '¿Tienen políticas claras de cancelación, depósitos y no-show que protejan sus ingresos sin alejar a los clientes?' },
      ],
    },
  ],
  'gastronomia-horeca': [
    {
      key: 'control-cocina-menu',
      label: 'Control de Cocina y Menú',
      iconName: 'UtensilsCrossed',
      questions: [
        { id: 1, text: '¿Tienen recetas estandarizadas con gramajes y costos calculados para cada plato, de modo que el margen sea predecible independientemente de quién cocine?' },
        { id: 2, text: '¿Controlan el costo de alimentos y bebidas (food cost) y saben si está dentro del rango aceptable para su tipo de negocio?' },
        { id: 3, text: '¿Gestionan las compras con proveedores fijos que garanticen calidad y precio estable, y comparan regularmente las cotizaciones?' },
        { id: 4, text: '¿Tienen indicadores de merma, desperdicio y rendimiento de los ingredientes que usan para reducir pérdidas en cocina?' },
      ],
    },
  ],
  'turismo': [
    {
      key: 'diseno-gestion-paquetes',
      label: 'Diseño y Gestión de Paquetes Turísticos',
      iconName: 'MapPin',
      questions: [
        { id: 1, text: '¿Sus paquetes y servicios turísticos están claramente diferenciados de la oferta de la competencia y responden a lo que el viajero de hoy está buscando?' },
        { id: 2, text: '¿Tienen alianzas formales con hoteles, transportistas y prestadores locales que garanticen disponibilidad, calidad y precio para sus paquetes?' },
        { id: 3, text: '¿Cuentan con un protocolo de contingencia para cuando algún componente del paquete falla (vuelo cancelado, proveedor indisponible, clima)?' },
        { id: 4, text: '¿Realizan seguimiento post-viaje al cliente para recoger su opinión y usarla en el diseño de nuevos paquetes o en la corrección de los actuales?' },
      ],
    },
  ],
  'eventos-espectaculos': [
    {
      key: 'produccion-logistica-eventos',
      label: 'Producción y Logística de Eventos',
      iconName: 'Calendar',
      questions: [
        { id: 1, text: '¿Cuentan con listas de verificación (checklists) detalladas para cada tipo de evento que eviten olvidos o improvisaciones el día del montaje?' },
        { id: 2, text: '¿Tienen proveedores de respaldo (audio, iluminación, catering, locaciones) para no quedar expuestos si alguno falla a último momento?' },
        { id: 3, text: '¿El presupuesto de cada evento se cierra con utilidad real, considerando todos los costos directos e indirectos, no solo los más visibles?' },
        { id: 4, text: '¿Recogen evidencia (fotos, video, testimonios) de cada evento que les sirva como portafolio comercial para atraer nuevos clientes?' },
      ],
    },
  ],
  'medios-comunicacion': [
    {
      key: 'contenido-audiencia',
      label: 'Contenido y Gestión de Audiencia',
      iconName: 'Film',
      questions: [
        { id: 1, text: '¿Tienen un plan editorial o de producción de contenidos con fechas, responsables y formatos definidos que se cumple de forma consistente?' },
        { id: 2, text: '¿Miden el alcance, la retención y el engagement de su audiencia, y usan esos datos para tomar decisiones de contenido y pauta?' },
        { id: 3, text: '¿Sus fuentes de ingresos (publicidad, suscripciones, licencias, patrocinios) están diversificadas para no depender de un solo cliente o canal?' },
        { id: 4, text: '¿Tienen protocolos para proteger la propiedad intelectual de sus contenidos y para gestionar las autorizaciones de uso de material de terceros?' },
      ],
    },
  ],
};

export const HOSPITALIDAD_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'hospitalidad-turismo-entretenimiento',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en HOSPITALIDAD, TURISMO Y ENTRETENIMIENTO.
Aspectos críticos de perdurabilidad en este sector:
- La ESTACIONALIDAD y los picos de demanda generan flujos de caja irregulares; la empresa que no planifica la temporada baja suele llegar a ella sin reservas y con deudas.
- La REPUTACIÓN ONLINE (reseñas en Google, TripAdvisor, Booking, OTAs) es hoy el principal factor de decisión del consumidor; una calificación baja destruye la demanda de forma sostenida.
- La GESTIÓN DE CANALES Y RESERVAS (dependencia de OTAs, doble booking, comisiones) puede comerse el margen si no se controla con un sistema centralizado y una estrategia de venta directa.
- La CALIDAD DEL PERSONAL DE CONTACTO (recepcionistas, meseros, guías, anfitriones) es la variable más difícil de escalar y la que más impacta la experiencia y la recomendación.
- El CONTROL DE COSTOS DE ALIMENTOS E INSUMOS (food cost, mermas, compras sin receta estandarizada) es la fuga de rentabilidad más frecuente en gastronomía y alojamiento.
- La SANIDAD E HIGIENE no es solo cumplimiento legal: una crisis sanitaria puede cerrar el negocio de forma definitiva y destruir años de reputación.
- La FIDELIZACIÓN (clientes recurrentes, programas de lealtad, base de datos activa) reduce la dependencia de canales pagos y OTAs, y mejora el margen a largo plazo.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del rubro: ocupación, RevPAR, food cost, ticket promedio, tasa de retorno de clientes, NPS y gestión de temporadas.`,
};
