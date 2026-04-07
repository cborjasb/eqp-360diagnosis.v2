import { DimensionDef, ScoresState } from './types';

export const DIMENSIONS: DimensionDef[] = [
  {
    key: 'finanzas',
    label: 'Finanzas',
    iconName: 'Banknote',
    questions: [
      { id: 1, text: '¿Alguien en la dirección entiende bien los números del negocio y tienen un plan financiero escrito y al día?' },
      { id: 2, text: '¿Saben en todo momento cuánto dinero entra y cuánto sale, y tienen claro qué hacer si los números no cuadran?' },
      { id: 3, text: '¿Tienen dinero guardado para emergencias y saben cuándo y cómo usarlo si algo sale mal?' },
      { id: 4, text: '¿Tienen un plan claro y actualizado de hacia dónde va el negocio en los próximos años?' }
    ]
  },
  {
    key: 'operaciones',
    label: 'Operaciones',
    iconName: 'Settings',
    questions: [
      { id: 1, text: '¿El proceso completo desde que reciben un pedido hasta que lo entregan funciona sin problemas ni retrasos?' },
      { id: 2, text: '¿Están escritos paso a paso los procesos más importantes del negocio, de modo que cualquiera pueda seguirlos?' },
      { id: 3, text: 'Si mañana les llegan el doble de clientes, ¿su equipo e instalaciones podrían responder sin colapsar?' },
      { id: 4, text: '¿El negocio puede seguir funcionando normalmente si una persona clave falta por una semana?' }
    ]
  },
  {
    key: 'riesgos',
    label: 'Riesgos',
    iconName: 'ShieldAlert',
    questions: [
      { id: 1, text: '¿Tienen una lista clara de las cosas que podrían salir mal en el negocio (perder un cliente grande, una demanda, un problema de dinero)?' },
      { id: 2, text: 'Para cada riesgo importante, ¿tienen un plan B definido de qué hacer si ocurre?' },
      { id: 3, text: '¿Se reúnen regularmente para revisar si los riesgos del negocio han cambiado o si hay nuevos?' },
      { id: 4, text: '¿Entienden bien de dónde vienen los problemas que amenazan al negocio (competencia, proveedores, regulaciones, etc.)?' }
    ]
  },
  {
    key: 'talento',
    label: 'Talento',
    iconName: 'Users',
    questions: [
      { id: 1, text: 'Si el dueño o líder principal decide retirarse mañana, ¿hay un plan claro de quién toma las riendas?' },
      { id: 2, text: '¿Le preguntan a sus empleados periódicamente cómo se sienten trabajando ahí y qué mejorarían?' },
      { id: 3, text: '¿Tienen una forma organizada de contratar gente, evaluar su desempeño y capacitarla?' },
      { id: 4, text: '¿Saben qué habilidades le faltan a su equipo clave y tienen un plan para desarrollarlas?' }
    ]
  },
  {
    key: 'mercadeo',
    label: 'Mercadeo',
    iconName: 'Megaphone',
    questions: [
      { id: 1, text: '¿Su publicidad y promoción realmente les trae clientes nuevos?' },
      { id: 2, text: '¿Tienen una estrategia de marketing organizada y escrita, o hacen publicidad "sobre la marcha"?' },
      { id: 3, text: '¿Saben exactamente quién es su cliente ideal y qué tipo de clientes les genera más ganancia?' },
      { id: 4, text: '¿Consiguen clientes nuevos gracias a su marketing, o dependen casi totalmente del boca a boca?' }
    ]
  },
  {
    key: 'gobernanza',
    label: 'Gobernanza',
    iconName: 'Gavel',
    questions: [
      { id: 1, text: '¿Tienen un grupo de asesores o directivos que se reúna regularmente para guiar las decisiones importantes del negocio?' },
      { id: 2, text: '¿Las decisiones grandes se toman con datos y análisis, o se decide "por instinto"?' },
      { id: 3, text: '¿Cada socio tiene claro cuál es su rol y responsabilidad dentro del negocio?' },
      { id: 4, text: '¿Tienen reglas claras y escritas sobre cómo trabajar con familiares (quién puede entrar, cuánto gana, cómo resolver conflictos)?' }
    ]
  },
  {
    key: 'tecnologia',
    label: 'Tecnología',
    iconName: 'Cpu',
    questions: [
      { id: 1, text: '¿Tienen las computadoras, software y herramientas tecnológicas que el negocio necesita para funcionar bien?' },
      { id: 2, text: '¿Tienen procedimientos claros para manejar su tecnología (respaldos de datos, soporte técnico, actualizaciones)?' },
      { id: 3, text: '¿La información que generan (ventas, inventario, clientes) es confiable y está protegida contra pérdida o robo?' },
      { id: 4, text: '¿Han usado tecnología para dejar de hacer tareas repetitivas a mano (facturación, reportes, inventarios)?' }
    ]
  }
];

export const INITIAL_SCORES: ScoresState = {
  finanzas: [0, 0, 0, 0],
  operaciones: [0, 0, 0, 0],
  riesgos: [0, 0, 0, 0],
  talento: [0, 0, 0, 0],
  mercadeo: [0, 0, 0, 0],
  gobernanza: [0, 0, 0, 0],
  tecnologia: [0, 0, 0, 0]
};
