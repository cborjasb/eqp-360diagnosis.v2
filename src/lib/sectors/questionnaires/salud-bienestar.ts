/**
 * Cuestionario — Salud, Bienestar y Servicios Esenciales.
 *
 * Diseñado específicamente para el sector: las dimensiones y preguntas
 * reflejan los KPIs, riesgos y operativa propios de clínicas, laboratorios,
 * gimnasios, peluquerías, veterinarias, talleres y demás negocios de salud,
 * bienestar y servicios esenciales para personas (calidad clínica, bioseguridad,
 * cumplimiento sanitario, gestión de agenda, recurrencia del cliente, etc.).
 *
 * Mantiene el lenguaje sencillo orientado a dueños de PyME que usan el
 * diagnóstico, pero NO es la plantilla genérica renombrada.
 */

import { SectorQuestionnaire, DiagDimension } from '../questionnaire-types';

const SECTOR_DIMENSIONS: DiagDimension[] = [
  {
    key: 'finanzas-servicios',
    label: 'Finanzas del Servicio',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Saben con precisión cuánto les cuesta atender a cada cliente o paciente, incluyendo insumos, personal y equipos?' },
      { id: 2, text: '¿Tienen un plan financiero actualizado y alguien en la dirección que entienda bien los números del negocio?' },
      { id: 3, text: '¿Cuentan con reservas de caja para sostener la operación al menos un mes si bajan drásticamente los clientes o se presenta una emergencia?' },
      { id: 4, text: '¿Conocen qué servicios o tratamientos les dejan mayor margen real, y priorizan su oferta en función de eso?' },
    ],
  },
  {
    key: 'calidad-seguridad-servicio',
    label: 'Calidad y Seguridad del Servicio',
    iconName: 'ShieldCheck',
    questions: [
      { id: 1, text: '¿Tienen protocolos escritos para los procedimientos más importantes que garanticen que el servicio se entregue igual de bien cada vez, sin importar quién lo preste?' },
      { id: 2, text: '¿Registran y revisan quejas, errores o incidentes para corregir los procesos y evitar que se repitan?' },
      { id: 3, text: '¿Miden de alguna forma la satisfacción del cliente después de recibir el servicio y usan esa información para mejorar?' },
      { id: 4, text: 'Si el servicio que prestan implica algún riesgo para el cliente o el paciente, ¿tienen un plan de acción claro para actuar de inmediato ante una complicación?' },
    ],
  },
  {
    key: 'cumplimiento-sanitario',
    label: 'Cumplimiento Sanitario',
    iconName: 'ClipboardList',
    questions: [
      { id: 1, text: '¿Tienen al día todos los permisos, habilitaciones y registros sanitarios exigidos por la autoridad para operar sin riesgo de cierre o multas?' },
      { id: 2, text: '¿El personal que presta servicios que requieren licencia o certificación la tiene vigente y actualizada?' },
      { id: 3, text: '¿Alguien en su empresa se encarga de hacer seguimiento a los cambios normativos del sector para anticiparse y cumplir a tiempo?' },
      { id: 4, text: '¿Tienen documentación organizada de su operación (registros de atención, informes de sanidad, inventarios) lista para una inspección o auditoría?' },
    ],
  },
  {
    key: 'agenda-ocupacion',
    label: 'Agenda y Ocupación',
    iconName: 'Calendar',
    questions: [
      { id: 1, text: '¿Saben en todo momento qué porcentaje de su capacidad (citas, cupos, espacios) está siendo utilizado y trabajan para optimizarlo?' },
      { id: 2, text: '¿Tienen un sistema para gestionar citas o turnos que reduzca los "no-shows", los tiempos muertos y las esperas largas?' },
      { id: 3, text: '¿Pueden anticipar qué días u horas habrá mayor o menor demanda, y ajustan su personal y recursos en consecuencia?' },
      { id: 4, text: '¿Miden cuánto tiempo espera el cliente desde que agenda hasta que es atendido, y tienen una meta para mantenerlo bajo control?' },
    ],
  },
  {
    key: 'talento-profesional',
    label: 'Talento y Certificaciones',
    iconName: 'Users',
    questions: [
      { id: 1, text: 'Si el profesional o técnico más importante de su equipo renuncia o se ausenta, ¿el servicio puede continuar sin que el cliente lo sufra?' },
      { id: 2, text: '¿Tienen un proceso ordenado para contratar, verificar credenciales y capacitar al personal que presta el servicio al cliente?' },
      { id: 3, text: '¿Se aseguran de que su equipo se actualice continuamente (cursos, certificaciones, nuevas técnicas) y que esa capacitación esté al día?' },
      { id: 4, text: '¿Miden el desempeño individual de cada persona del equipo con criterios claros, y les dan retroalimentación regular?' },
    ],
  },
  {
    key: 'experiencia-confianza-cliente',
    label: 'Experiencia y Fidelización',
    iconName: 'HeartPulse',
    questions: [
      { id: 1, text: '¿Tienen identificado qué porcentaje de sus clientes regresa o consume más de un servicio, y qué acciones concretas realizan para aumentar esa recurrencia?' },
      { id: 2, text: '¿La experiencia del cliente (desde que llega o agenda hasta que se va) está pensada para generar confianza y comodidad en cada paso?' },
      { id: 3, text: '¿Tienen algún programa o estrategia (membresías, seguimiento posventa, recordatorios) para mantener el vínculo con el cliente entre visitas?' },
      { id: 4, text: '¿Sus clientes los recomiendan activamente, y tienen una manera de medir o aprovechar ese boca a boca?' },
    ],
  },
  {
    key: 'insumos-equipos',
    label: 'Insumos y Equipos',
    iconName: 'Wrench',
    questions: [
      { id: 1, text: '¿Tienen control del inventario de insumos críticos para evitar que una falta de materiales les impida prestar el servicio?' },
      { id: 2, text: '¿Sus equipos principales (médicos, de belleza, de ejercicio, técnicos) tienen un plan de mantenimiento preventivo y lo cumplen?' },
      { id: 3, text: '¿Saben cuándo conviene reparar y cuándo reemplazar un equipo, y tienen un presupuesto o plan para esa renovación?' },
      { id: 4, text: '¿Cuentan con proveedores de respaldo para insumos clave, de modo que un desabastecimiento no pare su operación?' },
    ],
  },
  {
    key: 'bioseguridad-higiene',
    label: 'Bioseguridad e Higiene',
    iconName: 'Thermometer',
    questions: [
      { id: 1, text: '¿Tienen protocolos de limpieza, desinfección y esterilización escritos y aplicados de forma rutinaria en todas las áreas donde se atiende al cliente?' },
      { id: 2, text: '¿El personal utiliza de forma correcta y consistente los elementos de protección personal necesarios para el tipo de servicio que presta?' },
      { id: 3, text: '¿Tienen un manejo adecuado y seguro de los residuos que genera su operación (biológicos, químicos, comunes), cumpliendo las normas aplicables?' },
      { id: 4, text: '¿Sus instalaciones permiten la atención en condiciones seguras para el cliente y el personal (ventilación, distanciamiento, señalización)?' },
    ],
  },
];

const SUBSECTOR_DIMENSIONS: Record<string, DiagDimension[]> = {
  'atencion-medica': [
    {
      key: 'gestion-clinica-paciente',
      label: 'Gestión Clínica del Paciente',
      iconName: 'Stethoscope',
      questions: [
        { id: 1, text: '¿Llevan una historia clínica organizada y actualizada de cada paciente que permita dar continuidad a su tratamiento sin depender de la memoria del médico?' },
        { id: 2, text: '¿Tienen protocolos definidos para el triaje, la priorización de urgencias y la derivación a especialistas o centros de mayor complejidad cuando es necesario?' },
        { id: 3, text: '¿Se aseguran de que el paciente comprenda claramente su diagnóstico, tratamiento y las instrucciones para el cuidado en casa antes de retirarse?' },
        { id: 4, text: '¿Hacen seguimiento activo (llamada, mensaje) a los pacientes después de procedimientos importantes para verificar su evolución?' },
      ],
    },
  ],
  'laboratorios-diagnostico': [
    {
      key: 'confiabilidad-resultados',
      label: 'Confiabilidad de Resultados',
      iconName: 'Microscope',
      questions: [
        { id: 1, text: '¿Tienen un programa de control de calidad interno y externo (calibración, controles de referencia) que garantice la exactitud de sus resultados?' },
        { id: 2, text: '¿Sus equipos de diagnóstico están calibrados y en condiciones certificadas para dar resultados confiables?' },
        { id: 3, text: '¿Tienen trazabilidad completa de cada muestra, desde la toma hasta la emisión del resultado, que evite errores de identidad o contaminación?' },
        { id: 4, text: '¿Los tiempos de entrega de resultados que prometen se cumplen de forma consistente, o hay retrasos frecuentes que generan quejas?' },
      ],
    },
  ],
  'servicios-funerarios': [
    {
      key: 'gestion-servicio-exequial',
      label: 'Servicio Exequial y Previsión',
      iconName: 'Stamp',
      questions: [
        { id: 1, text: '¿Tienen procesos claros y sensibles para acompañar a las familias en el momento de mayor vulnerabilidad, asegurando que cada detalle del servicio se cumple sin fallos?' },
        { id: 2, text: '¿Sus planes de previsión exequial están respaldados financieramente, y los clientes pueden confiar en que el servicio será honrado en cualquier momento futuro?' },
        { id: 3, text: '¿Cumplen con todos los requisitos legales y sanitarios para el manejo, traslado y disposición de restos mortales?' },
        { id: 4, text: '¿Tienen convenios o capacidad para atender servicios en distintas ciudades o regiones cuando la familia lo necesita?' },
      ],
    },
  ],
  'educacion-formacion': [
    {
      key: 'calidad-educativa-resultados',
      label: 'Calidad Educativa y Resultados',
      iconName: 'GraduationCap',
      questions: [
        { id: 1, text: '¿Miden si sus estudiantes o participantes realmente aprenden y aplican lo que enseñan (tasas de graduación, resultados de evaluación, empleabilidad)?' },
        { id: 2, text: '¿Sus programas y contenidos están actualizados respecto a lo que el mercado laboral o la vida real exigen hoy?' },
        { id: 3, text: '¿Tienen procesos claros para detectar y apoyar a los estudiantes en riesgo de deserción antes de que abandonen?' },
        { id: 4, text: '¿La satisfacción de estudiantes y padres (o empresas cliente) se mide de forma sistemática y orienta mejoras concretas?' },
      ],
    },
  ],
  'entrenamiento-fisico': [
    {
      key: 'retencion-miembros',
      label: 'Retención de Miembros',
      iconName: 'Dumbbell',
      questions: [
        { id: 1, text: '¿Saben cuántos miembros abandonan cada mes y qué razones los llevan a no renovar, y tienen acciones concretas para reducir esa deserción?' },
        { id: 2, text: '¿Hacen seguimiento personalizado al progreso de los miembros (peso, metas, asistencia) para que sientan que el servicio les funciona?' },
        { id: 3, text: '¿Sus instalaciones y equipos están en buen estado, limpios y disponibles en los horarios pico, de modo que el miembro no se frustre al venir?' },
        { id: 4, text: '¿Tienen planes, paquetes o beneficios que incentiven al miembro a renovar y a traer a otras personas?' },
      ],
    },
  ],
  'cuidado-personal-estetica': [
    {
      key: 'fidelizacion-estetica',
      label: 'Fidelización y Experiencia Estética',
      iconName: 'Scissors',
      questions: [
        { id: 1, text: '¿Llevan un registro del historial de cada cliente (qué servicio recibió, preferencias, productos usados) para ofrecer una atención personalizada cada vez que regresa?' },
        { id: 2, text: '¿Tienen un sistema de recordatorio (mensaje, llamada) para que el cliente vuelva en el tiempo adecuado según el servicio recibido?' },
        { id: 3, text: '¿Sus profesionales están formados y actualizados en las últimas tendencias y técnicas del sector, y esa formación es constante?' },
        { id: 4, text: '¿La experiencia sensorial del espacio (limpieza, ambiente, comodidad) refuerza la percepción de calidad que el cliente paga?' },
      ],
    },
  ],
  'servicios-veterinarios': [
    {
      key: 'atencion-salud-animal',
      label: 'Atención y Salud Animal',
      iconName: 'Dog',
      questions: [
        { id: 1, text: '¿Llevan una historia clínica completa por cada paciente animal, con vacunación, tratamientos y alertas de próximas visitas?' },
        { id: 2, text: '¿Tienen protocolos de manejo seguro de animales para proteger tanto al paciente como al personal y al dueño durante la consulta o procedimiento?' },
        { id: 3, text: '¿Sus medicamentos e insumos veterinarios se almacenan en las condiciones correctas (temperatura, control de vencimientos) y con los registros exigidos?' },
        { id: 4, text: '¿El dueño de la mascota recibe instrucciones claras al final de cada consulta y pueden contactarlos si surgen dudas en casa?' },
      ],
    },
  ],
  'mantenimiento-reparacion': [
    {
      key: 'calidad-taller-tecnico',
      label: 'Calidad Técnica y Garantía',
      iconName: 'Cog',
      questions: [
        { id: 1, text: '¿Tienen un proceso de diagnóstico estandarizado que permita identificar correctamente el problema antes de reparar, para no cobrar trabajos innecesarios?' },
        { id: 2, text: '¿Ofrecen garantía sobre los trabajos realizados y la cumplen de forma sistemática cuando hay una reclamación válida?' },
        { id: 3, text: '¿El cliente recibe una cotización clara y por escrito antes de autorizar el trabajo, y el precio final no tiene sorpresas frente a lo acordado?' },
        { id: 4, text: '¿Llevan un registro de cada servicio realizado por equipo o vehículo que les permita hacer seguimiento y ofrecer mantenimiento preventivo en el futuro?' },
      ],
    },
  ],
  'seguridad-privada': [
    {
      key: 'operacion-seguridad-privada',
      label: 'Operación y Confiabilidad',
      iconName: 'Lock',
      questions: [
        { id: 1, text: '¿Todo su personal operativo tiene la habilitación, capacitación y certificaciones exigidas por la autoridad competente para prestar servicios de seguridad privada?' },
        { id: 2, text: '¿Tienen protocolos de respuesta definidos para los incidentes más frecuentes (intento de robo, emergencia médica, incendio) y su personal los conoce y practica?' },
        { id: 3, text: '¿Monitorean en tiempo real los puestos de vigilancia o escoltas para detectar anomalías y coordinar respuesta sin depender solo de la comunicación por radio?' },
        { id: 4, text: '¿Los informes de incidentes y novedades que entregan al cliente son claros, puntuales y les generan confianza de que el servicio está siendo prestado correctamente?' },
      ],
    },
  ],
};

export const SALUD_BIENESTAR_QUESTIONNAIRE: SectorQuestionnaire = {
  sectorId: 'salud-bienestar-servicios',
  dimensions: SECTOR_DIMENSIONS,
  subsectorDimensions: SUBSECTOR_DIMENSIONS,
  reportContext: `El cliente opera en SALUD, BIENESTAR Y SERVICIOS ESENCIALES.
Aspectos críticos de perdurabilidad en este sector:
- La calidad y la seguridad del servicio son activos reputacionales determinantes: un error clínico, técnico o de higiene puede cerrar el negocio de golpe o generar demandas.
- El cumplimiento sanitario y normativo (permisos, habilitaciones, certificaciones del personal) no es opcional; operar sin él expone a sanciones, cierres e inhabilita para contratar con aseguradoras o entes públicos.
- La gestión de agenda y ocupación define la rentabilidad real: un consultorio o gimnasio con baja ocupación sangra caja aunque el precio sea adecuado.
- La fidelización y la recurrencia del cliente (membresías, planes, seguimiento) son el principal motor de ingresos sostenibles; adquirir clientes nuevos en este sector es costoso.
- La dependencia de uno o pocos profesionales clave (médico estrella, estilista principal, técnico especializado) es el riesgo operativo más frecuente y subestimado.
- La bioseguridad e higiene —más allá de ser exigencia legal— genera confianza directa en el cliente; su ausencia es visible y destructiva para la reputación.
- El control de insumos y equipos (mantenimiento, vencimientos, proveedores de respaldo) evita paras operativas que el cliente percibe como falta de profesionalismo.
- Los subsectores más regulados (atención médica, laboratorios, funerarios, seguridad privada) requieren atención especial a trazabilidad documental y protocolos formales.
Usa este contexto para interpretar los puntajes con lenguaje y ejemplos propios del sector salud, bienestar y servicios esenciales.`,
};
