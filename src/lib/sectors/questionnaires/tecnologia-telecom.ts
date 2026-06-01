/**
 * Cuestionario — Tecnología y Telecomunicaciones.
 *
 * Dimensiones y preguntas diseñadas para el sector: ingresos recurrentes,
 * churn, uptime/SLAs, ciberseguridad, escalabilidad técnica, dependencia de
 * talento especializado, gestión de proyectos/entregas y propiedad intelectual.
 *
 * Mantiene el lenguaje sencillo orientado a dueños de PyME del resto del
 * diagnóstico. NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-recurrencia',
    label: 'Finanzas y Recurrencia',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Saben qué porcentaje de sus ingresos es recurrente (suscripciones, contratos, licencias) versus ingresos de un solo pago?' },
      { id: 2, text: '¿Miden cuántos clientes cancelan o no renuevan cada mes o año, y tienen acciones concretas para reducir esa pérdida?' },
      { id: 3, text: '¿Conocen el costo real de adquirir un cliente nuevo y cuánto tiempo tardan en recuperar esa inversión con los ingresos que genera?' },
      { id: 4, text: '¿Tienen reservas de caja o línea de crédito para sostener la operación si un cliente grande cancela o se retrasa en pagar?' },
    ],
  },
  {
    key: 'disponibilidad-sla',
    label: 'Disponibilidad y SLAs',
    iconName: 'Server',
    questions: [
      { id: 1, text: '¿Miden el tiempo real en que sus sistemas o servicios están disponibles para los clientes, y saben si cumplen los niveles prometidos?' },
      { id: 2, text: '¿Tienen un plan de respuesta definido (tiempos, responsables, comunicación al cliente) cuando ocurre una falla o caída del servicio?' },
      { id: 3, text: '¿Sus acuerdos con clientes especifican con claridad qué pasa si no se cumple el nivel de servicio comprometido (penalidades, compensaciones)?' },
      { id: 4, text: '¿Cuentan con redundancia o copias de seguridad que permitan restablecer el servicio rápidamente ante una falla grave?' },
    ],
  },
  {
    key: 'ciberseguridad-datos',
    label: 'Ciberseguridad y Datos',
    iconName: 'ShieldCheck',
    questions: [
      { id: 1, text: '¿Tienen controles básicos de seguridad activos: antivirus, accesos con contraseña fuerte, actualizaciones de software al día y copias de seguridad automáticas?' },
      { id: 2, text: '¿Saben exactamente qué datos personales o confidenciales de sus clientes y empleados guardan, y tienen medidas para protegerlos según la ley?' },
      { id: 3, text: '¿Su equipo sabe qué hacer si reciben un correo sospechoso, si alguien intenta hackearlos o si sufren un robo de datos?' },
      { id: 4, text: '¿Revisan periódicamente quién tiene acceso a sus sistemas y qué puede hacer, retirando permisos cuando alguien sale de la empresa?' },
    ],
  },
  {
    key: 'escalabilidad-tecnica',
    label: 'Escalabilidad Técnica',
    iconName: 'Network',
    questions: [
      { id: 1, text: '¿Si mañana duplicaran el número de usuarios o clientes, su plataforma o infraestructura podría soportarlo sin caerse ni ralentizarse?' },
      { id: 2, text: '¿Pueden agregar nuevas funciones o productos sin tener que reescribir todo el sistema desde cero?' },
      { id: 3, text: '¿Sus costos de infraestructura (servidores, almacenamiento, ancho de banda) crecen de forma proporcional al crecimiento del negocio, o se disparan?' },
      { id: 4, text: '¿Tienen arquitectura o procesos que les permitan lanzar actualizaciones o correcciones de forma rápida y sin interrumpir el servicio a los clientes?' },
    ],
  },
  {
    key: 'talento-tecnico',
    label: 'Talento Técnico',
    iconName: 'Users',
    questions: [
      { id: 1, text: '¿Hay una o dos personas cuya salida dejaría el negocio sin poder operar o entregar servicio? ¿Tienen un plan para ese escenario?' },
      { id: 2, text: '¿Documentan el conocimiento técnico clave (código, configuraciones, procesos) de forma que otro miembro del equipo pueda tomarlo sin depender de quien lo creó?' },
      { id: 3, text: '¿Tienen una forma de retener a su talento técnico más valioso más allá del salario (desarrollo profesional, participación, proyecto motivador)?' },
      { id: 4, text: '¿Su equipo tiene las habilidades actualizadas que el mercado exige, o hay brechas técnicas que están afectando ya la calidad del servicio?' },
    ],
  },
  {
    key: 'entrega-proyectos',
    label: 'Entrega y Proyectos',
    iconName: 'ClipboardList',
    questions: [
      { id: 1, text: '¿Sus proyectos o desarrollos terminan en el plazo y presupuesto acordados con el cliente, o los retrasos y sobrecostos son frecuentes?' },
      { id: 2, text: '¿Tienen una metodología clara (ágil, iterativa u otra) para gestionar el trabajo, priorizar tareas y comunicar avances al cliente?' },
      { id: 3, text: '¿Revisan con el cliente periódicamente si el proyecto va por buen camino y hacen ajustes antes de que un problema pequeño se convierta en uno grande?' },
      { id: 4, text: '¿Al cerrar un proyecto, documentan lo que salió bien y lo que no, para mejorar la siguiente entrega?' },
    ],
  },
  {
    key: 'propiedad-intelectual',
    label: 'Propiedad Intelectual',
    iconName: 'Lock',
    questions: [
      { id: 1, text: '¿Tienen claridad legal sobre quién es dueño del software, código o desarrollos que producen: su empresa, sus empleados o sus clientes?' },
      { id: 2, text: '¿Sus contratos con empleados y contratistas establecen claramente que los productos del trabajo pertenecen a la empresa?' },
      { id: 3, text: '¿Protegen activamente sus activos de conocimiento (código fuente, algoritmos, bases de datos propias) contra copia o uso no autorizado?' },
      { id: 4, text: '¿Verifican que el software de terceros que usan (librerías, componentes) tenga las licencias adecuadas para el uso comercial que hacen?' },
    ],
  },
  {
    key: 'obsolescencia-innovacion',
    label: 'Obsolescencia e Innovación',
    iconName: 'Lightbulb',
    questions: [
      { id: 1, text: '¿Monitorean activamente si las tecnologías que usan o venden están siendo reemplazadas por alternativas más nuevas en el mercado?' },
      { id: 2, text: '¿Tienen un presupuesto o tiempo asignado para explorar tecnologías nuevas que podrían mejorar su servicio o abrirles nuevos mercados?' },
      { id: 3, text: '¿Sus clientes les piden funciones o capacidades que hoy no pueden entregar por limitaciones tecnológicas de su plataforma o equipo?' },
      { id: 4, text: '¿Tienen una hoja de ruta tecnológica de al menos un año que guíe hacia dónde debe evolucionar su producto o servicio?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'telecomunicaciones': [
    {
      key: 'infraestructura-red',
      label: 'Red e Infraestructura',
      iconName: 'Wifi',
      questions: [
        { id: 1, text: '¿Tienen un mapa actualizado de su red (fibra, antenas, nodos) que permita identificar y reparar fallas sin depender de la memoria de una sola persona?' },
        { id: 2, text: '¿Miden la calidad de la señal o conexión que reciben sus usuarios y actúan cuando baja de los niveles comprometidos?' },
        { id: 3, text: '¿Tienen capacidad para ampliar la cobertura o el ancho de banda sin interrumpir el servicio a los clientes actuales?' },
        { id: 4, text: '¿Revisan y mantienen el cumplimiento de los permisos y regulaciones de espectro, licencias y normativas del ente regulador?' },
      ],
    },
  ],
  'desarrollo-it-software': [
    {
      key: 'calidad-codigo',
      label: 'Calidad y Deuda Técnica',
      iconName: 'Database',
      questions: [
        { id: 1, text: '¿Tienen pruebas automáticas que detecten errores antes de publicar cambios en producción, reduciendo los bugs que llegan al cliente?' },
        { id: 2, text: '¿Llevan un registro de las partes del sistema que saben que están mal construidas y tienen un plan para corregirlas?' },
        { id: 3, text: '¿Usan control de versiones (Git u otro) y revisan el código entre compañeros antes de incorporar cambios al producto?' },
        { id: 4, text: '¿Sus integraciones con APIs o servicios de terceros tienen un plan de contingencia si el proveedor cambia, falla o cierra?' },
      ],
    },
  ],
  'infraestructura-digital': [
    {
      key: 'operaciones-centros-datos',
      label: 'Operaciones y Centros de Datos',
      iconName: 'Globe',
      questions: [
        { id: 1, text: '¿Tienen redundancia de energía, conectividad y refrigeración que garantice la continuidad ante una falla en el centro de datos o proveedor de nube?' },
        { id: 2, text: '¿Realizan pruebas periódicas de restauración de respaldos para confirmar que los datos realmente se pueden recuperar cuando se necesite?' },
        { id: 3, text: '¿Tienen un inventario actualizado de todos los servidores, equipos y servicios activos, incluyendo fechas de fin de vida y de renovación de licencias?' },
        { id: 4, text: '¿Sus clientes tienen contratos de servicio que definan claramente los tiempos de respuesta ante incidentes y las responsabilidades de cada parte?' },
      ],
    },
  ],
};

export const TECNOLOGIA_TELECOM_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'tecnologia-telecomunicaciones',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en TECNOLOGÍA Y TELECOMUNICACIONES.
Aspectos críticos de perdurabilidad en este sector:
- La base de ingresos recurrentes (MRR/ARR) y el control del churn determinan la estabilidad financiera; empresas con alta dependencia de proyectos únicos son frágiles ante la sequía de nuevos contratos.
- El uptime y el cumplimiento de SLAs son el principal activo reputacional; una falla grave o prolongada puede activar penalidades contractuales y pérdida de clientes.
- La ciberseguridad no es opcional: una brecha de datos o un ransomware pueden paralizar la operación y generar responsabilidades legales graves.
- La escalabilidad técnica (arquitectura, infraestructura elástica) define si la empresa puede crecer sin que los costos o la calidad se deterioren.
- La dependencia de talento técnico clave (el desarrollador que "sabe todo", el administrador de red único) es uno de los riesgos más subestimados en PyMEs del sector.
- La deuda técnica acumulada y la obsolescencia de plataformas frenan la innovación y generan costos crecientes de mantenimiento.
- La propiedad intelectual mal gestionada puede resultar en disputas sobre la titularidad del software o en exposición por licencias indebidas.
- La gestión de entregas (puntualidad, presupuesto, metodología) impacta directamente la renovación de contratos y las referencias comerciales.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del sector tecnológico y de telecomunicaciones.`,
};
