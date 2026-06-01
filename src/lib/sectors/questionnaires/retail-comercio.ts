/**
 * Cuestionario — Comercio al Detalle / Retail (B2C).
 *
 * Diseñado específicamente para tiendas, puntos de venta y comercios que
 * venden directamente al consumidor final. Las dimensiones y preguntas
 * reflejan los KPIs y riesgos propios del retail: rotación de inventario,
 * margen y ticket promedio, gestión de punto de venta, experiencia del
 * cliente, mermas y robos, surtido y proveedores, omnicanalidad y capital
 * de trabajo.
 *
 * Mantiene el lenguaje sencillo orientado a dueños de PyME, pero NO es
 * la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-retail',
    label: 'Finanzas y Margen',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Conocen el margen de ganancia real de cada categoría de productos, más allá del precio de compra versus el precio de venta?' },
      { id: 2, text: '¿Saben cuál es su ticket promedio por cliente y han tomado acciones concretas para aumentarlo?' },
      { id: 3, text: '¿Tienen suficiente capital de trabajo para reponer inventario sin endeudarse en condiciones desfavorables cuando la venta sube?' },
      { id: 4, text: '¿Revisan mensualmente sus ventas, costos y ganancias por producto, línea o área del negocio?' },
    ],
  },
  {
    key: 'inventario-rotacion',
    label: 'Inventario y Rotación',
    iconName: 'Boxes',
    questions: [
      { id: 1, text: '¿Saben qué productos rotan rápido y cuáles tienen dinero "dormido" en el estante sin venderse?' },
      { id: 2, text: '¿Tienen un punto de reorden definido para cada producto, de modo que no se queden sin stock ni acumulen excesos?' },
      { id: 3, text: '¿Llevan un control del inventario que cuadre lo que tiene el sistema con lo que hay físicamente en el local?' },
      { id: 4, text: '¿Hacen conteos periódicos y saben con certeza cuánto pierden por vencimiento, daño o mercancía en mal estado?' },
    ],
  },
  {
    key: 'punto-de-venta',
    label: 'Punto de Venta',
    iconName: 'Store',
    questions: [
      { id: 1, text: '¿El local está organizado y exhibe los productos de forma que facilita la compra y motiva a llevar más de lo planeado?' },
      { id: 2, text: '¿Tienen un sistema de caja o punto de venta (POS) que registre cada transacción y reduzca errores y diferencias de caja?' },
      { id: 3, text: '¿Controlan las mermas y los robos (hurto interno y externo) con procedimientos claros y registros de diferencias?' },
      { id: 4, text: '¿Miden el tráfico de personas que entran al local y la tasa de conversión (cuántos de los que entran realmente compran)?' },
    ],
  },
  {
    key: 'experiencia-cliente',
    label: 'Experiencia del Cliente',
    iconName: 'HeartPulse',
    questions: [
      { id: 1, text: '¿Sus clientes reciben una atención consistente y agradable sin importar quién los atienda o qué día de la semana sea?' },
      { id: 2, text: '¿Recogen de forma sistemática la opinión de sus clientes (encuestas, reseñas) y actúan sobre lo que dicen?' },
      { id: 3, text: '¿Tienen un proceso claro para manejar quejas, cambios y devoluciones que deje al cliente satisfecho?' },
      { id: 4, text: '¿Conocen a sus clientes más fieles, saben qué compran con más frecuencia y tienen alguna forma de recompensarlos?' },
    ],
  },
  {
    key: 'surtido-proveedores',
    label: 'Surtido y Proveedores',
    iconName: 'Handshake',
    questions: [
      { id: 1, text: '¿Su surtido de productos responde a lo que sus clientes buscan, o lo define más la disponibilidad del proveedor que la demanda real?' },
      { id: 2, text: '¿Tienen acuerdos de plazo de pago con sus proveedores que les permitan vender antes de tener que pagar?' },
      { id: 3, text: '¿Dependen de uno o dos proveedores clave, lo que pondría en riesgo el abastecimiento si fallaran?' },
      { id: 4, text: '¿Negocian condiciones (descuentos por volumen, exclusividades, apoyo en publicidad) o simplemente aceptan las condiciones que les ofrecen?' },
    ],
  },
  {
    key: 'omnicanalidad',
    label: 'Omnicanalidad',
    iconName: 'Globe',
    questions: [
      { id: 1, text: '¿Además del local físico, tienen presencia activa y organizada en canales digitales (redes sociales, tienda online, WhatsApp) que generen ventas reales?' },
      { id: 2, text: '¿Cuando un cliente compra por redes o WhatsApp, el proceso de pago, preparación y entrega es tan fluido como si viniera al local?' },
      { id: 3, text: '¿El inventario que muestran en línea refleja en todo momento lo que realmente tienen disponible en el local?' },
      { id: 4, text: '¿Han probado estrategias digitales para atraer clientes al local físico (promociones online, reservas, citas previas)?' },
    ],
  },
  {
    key: 'ubicacion-trafico',
    label: 'Ubicación y Tráfico',
    iconName: 'MapPin',
    questions: [
      { id: 1, text: '¿Su ubicación actual sigue siendo competitiva o hay cambios en el entorno (nuevos competidores, cambios de flujo) que estén afectando las ventas?' },
      { id: 2, text: '¿Hacen acciones concretas para atraer más personas al local (vitrina, señalización, promociones externas, eventos)?' },
      { id: 3, text: '¿Saben en qué horarios y días concentran la mayor parte de sus ventas, y ajustan el personal y el surtido según esos picos?' },
      { id: 4, text: '¿Han evaluado si vale la pena abrir otro punto de venta o si el modelo actual ya está aprovechado al máximo?' },
    ],
  },
  {
    key: 'talento-retail',
    label: 'Talento y Equipo',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Su equipo de ventas sabe cómo ofrecer productos adicionales, manejar objeciones y cerrar una venta con naturalidad?' },
      { id: 2, text: '¿Tienen baja rotación de personal de tienda, o constantemente están entrenando gente nueva que aún no conoce bien los productos?' },
      { id: 3, text: '¿Si el encargado principal falta, el resto del equipo puede abrir, operar y cerrar el local sin problemas?' },
      { id: 4, text: '¿Evalúan el desempeño de cada vendedor con indicadores claros (ventas, ticket promedio, satisfacción del cliente) y lo comunican de forma constructiva?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'consumo-masivo': [
    {
      key: 'gestion-perecederos',
      label: 'Gestión de Perecederos y Abasto',
      iconName: 'Egg',
      questions: [
        { id: 1, text: '¿Tienen un control de fechas de vencimiento y rotación PEPS (lo primero que entra es lo primero que sale) para reducir la merma de perecederos?' },
        { id: 2, text: '¿Sus pedidos a proveedores de productos frescos (lácteos, frutas, carnes) se hacen con la frecuencia correcta para evitar excesos o quiebres?' },
        { id: 3, text: '¿Controlan la temperatura de almacenamiento de los productos que lo requieren y tienen respaldo ante fallas de equipos de frío?' },
        { id: 4, text: '¿Negocian con sus proveedores condiciones de devolución o reposición cuando la mercancía llega en mal estado o cerca del vencimiento?' },
      ],
    },
  ],
  'automotriz-retail': [
    {
      key: 'gestion-repuestos-prueba',
      label: 'Repuestos, Prueba y Financiamiento',
      iconName: 'Car',
      questions: [
        { id: 1, text: '¿Tienen un inventario de repuestos o accesorios organizado por referencia que les permita atender al cliente sin demoras ni errores de surtido?' },
        { id: 2, text: '¿Ofrecen opciones de financiamiento claras y competitivas que faciliten la decisión de compra del cliente?' },
        { id: 3, text: '¿Realizan seguimiento posventa (llamadas, revisiones) para fidelizar al comprador y generarle futuras compras o referidos?' },
        { id: 4, text: '¿Cuentan con un proceso de valuación y recepción de vehículos usados que proteja el margen y evite adquirir unidades problemáticas?' },
      ],
    },
  ],
  'ferreteria-hogar': [
    {
      key: 'asesoría-proyecto',
      label: 'Asesoría y Venta por Proyecto',
      iconName: 'Hammer',
      questions: [
        { id: 1, text: '¿Su equipo está capacitado para orientar al cliente sobre qué materiales, cantidades y herramientas necesita para su proyecto?' },
        { id: 2, text: '¿Ofrecen servicios de corte, mezcla, entrega a domicilio u otros que aumenten la compra y la fidelidad del cliente?' },
        { id: 3, text: '¿Tienen acuerdos con constructores, contratistas o maestros de obra que generen compras recurrentes de mayor volumen?' },
        { id: 4, text: '¿Controlan el inventario de materiales a granel (cemento, arena, pinturas) para evitar mermas por humedad, caducidad o mal manejo?' },
      ],
    },
  ],
  'salud-cuidado-personal': [
    {
      key: 'cumplimiento-regulatorio-salud',
      label: 'Cumplimiento Regulatorio y Dispensación',
      iconName: 'Pill',
      questions: [
        { id: 1, text: '¿Cuentan con todos los permisos sanitarios vigentes y el personal habilitado requerido para dispensar medicamentos sin riesgo de sanciones?' },
        { id: 2, text: '¿Tienen un control de estupefacientes, controlados y productos de cadena de frío que cumpla con la normativa sanitaria?' },
        { id: 3, text: '¿El personal que atiende al cliente está capacitado para orientar sobre el uso correcto de medicamentos o productos de salud sin incurrir en prácticas no autorizadas?' },
        { id: 4, text: '¿Cuentan con un protocolo para gestionar productos próximos a vencer, recalls o alertas sanitarias de proveedores o autoridades?' },
      ],
    },
  ],
  'moda-accesorios': [
    {
      key: 'gestion-temporada-coleccion',
      label: 'Temporada y Gestión de Colección',
      iconName: 'Shirt',
      questions: [
        { id: 1, text: '¿Planifican las compras de cada colección o temporada con antelación, alineando el surtido con las tendencias y el perfil de su cliente?' },
        { id: 2, text: '¿Tienen una estrategia de liquidación (rebajas, outlets) para salir del inventario de la temporada anterior sin sacrificar demasiado el margen?' },
        { id: 3, text: '¿Controlan el surtido por talla, color y modelo para no quedarse con referencias que no rotan y perder ventas por falta de las que sí se piden?' },
        { id: 4, text: '¿Usan redes sociales o colaboraciones con influencers para lanzar nuevas colecciones y generar tráfico tanto al local como a su canal online?' },
      ],
    },
  ],
  'tecnologia-electrodomesticos': [
    {
      key: 'garantia-posventa-tech',
      label: 'Garantía y Posventa',
      iconName: 'Tv',
      questions: [
        { id: 1, text: '¿Tienen un proceso claro y ágil para manejar garantías y reparaciones que no lastre su capital de trabajo con equipos inmovilizados?' },
        { id: 2, text: '¿Ofrecen planes de financiamiento o crédito propio que hagan accesible la compra de equipos de alto valor y aumenten la conversión?' },
        { id: 3, text: '¿El equipo de ventas conoce las especificaciones técnicas de los equipos lo suficiente para guiar al cliente hacia el producto correcto para su necesidad?' },
        { id: 4, text: '¿Llevan un registro de los clientes y los equipos que compraron para hacer seguimiento y ofrecerles accesorios, upgrades o renovación oportuna?' },
      ],
    },
  ],
  'comercio-electronico': [
    {
      key: 'operaciones-ecommerce',
      label: 'Operaciones E-commerce y Logística',
      iconName: 'ShoppingCart',
      questions: [
        { id: 1, text: '¿El tiempo desde que el cliente hace el pedido hasta que lo recibe cumple con las expectativas de entrega prometidas en su tienda o marketplace?' },
        { id: 2, text: '¿Tienen integrado el inventario de su tienda online con su stock real para evitar vender productos que no tienen disponibles?' },
        { id: 3, text: '¿Miden la tasa de carritos abandonados y han implementado acciones para recuperar esas ventas perdidas?' },
        { id: 4, text: '¿Gestionan las devoluciones y quejas online de forma rápida y organizada, protegiendo su reputación en plataformas de reseñas y marketplaces?' },
      ],
    },
  ],
};

export const RETAIL_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'retail-comercio',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en COMERCIO AL DETALLE / RETAIL (B2C).
Aspectos críticos de perdurabilidad en este sector:
- La ROTACIÓN DE INVENTARIO y el control de mermas determinan si el capital de trabajo trabaja a favor o en contra; el dinero "dormido" en estantes es el enemigo silencioso del retail.
- El MARGEN REAL por categoría y el TICKET PROMEDIO son los dos palancas de rentabilidad más directas; su monitoreo frecuente es señal de madurez gerencial.
- La EXPERIENCIA DEL CLIENTE en el punto de venta (atención, layout, disponibilidad de producto) define la tasa de recompra y la diferenciación frente a competidores y plataformas digitales.
- Las MERMAS Y ROBOS (internos y externos) pueden erosionar silenciosamente el margen; sin controles de inventario y caja el negocio sangra sin saberlo.
- La OMNICANALIDAD (local físico + digital) ya no es diferenciador: es higiene competitiva para capturar al consumidor donde esté y no perder ventas frente a marketplaces.
- La relación con PROVEEDORES (plazos, condiciones, exclusividades) y la concentración de abastecimiento son fuentes de fragilidad o ventaja según cómo se gestionen.
- La UBICACIÓN Y EL TRÁFICO siguen siendo determinantes en retail físico; la conversión (visitantes que compran) revela si el modelo de tienda y el equipo de ventas están funcionando.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del comercio minorista.`,
};
