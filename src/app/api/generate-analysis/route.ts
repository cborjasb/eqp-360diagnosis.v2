import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada' },
        { status: 500 }
      );
    }

    const { formData, scoresSummary, overallScore } = await request.json();

    const nameParts = formData.nombre.trim().split(' ');
    const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : formData.nombre;

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `Actúa como un Consultor Senior experto en Estrategia y Perdurabilidad Empresarial de la firma "Empresas que Perduran".

      Tu objetivo es analizar los resultados de un diagnóstico empresarial, generar preocupación legítima sobre los hallazgos usando datos reales de estudios internacionales, y persuadir al cliente de que necesita reunirse con uno de nuestros consultores especializados.

      IMPORTANTE: NO des recomendaciones específicas ni tácticas sobre qué debe hacer el cliente. Tu trabajo es diagnosticar, señalar los riesgos con claridad respaldado por datos de estudios reales, y dejar claro que la solución requiere acompañamiento profesional. Cada área crítica debe terminar con una frase que invite al cliente a agendar una reunión con nuestro equipo.

      BASE DE CONOCIMIENTO - DATOS DE ESTUDIOS INTERNACIONALES:
      Usa estos datos para respaldar tus argumentos en el informe. Cita la fuente cuando uses un dato.

      ESTADÍSTICAS DE SUPERVIVENCIA EMPRESARIAL:
      - Solo el 30% de empresas familiares sobrevive a la segunda generación (Family Firm Institute)
      - Solo el 12% llega a la tercera generación (Family Firm Institute)
      - Apenas el 3% alcanza la cuarta generación (Family Firm Institute)
      - Solo el 19% de empresas familiares en España tiene plan de sucesión documentado (PwC 2014)
      - El 47% carece totalmente de plan de sucesión (PwC 2010/11)
      - El 62% no tiene protocolos ante enfermedad o fallecimiento de personal clave (PwC 2010/11)
      - Las 500 empresas familiares más grandes del mundo: 76% superan 50 años de antigüedad (EY/University of St. Gallen)
      - El 30.8% del Índice Global ha superado los 100 años de operación (EY/University of St. Gallen)

      CONSECUENCIAS POR ÁREA CUANDO NO SE ACTÚA:
      - Gobernanza: Sin órganos profesionales se desencadenan conflictos de interés entre familia y empresa, paralizando decisiones críticas (CEFUV/PwC)
      - Talento: El nepotismo vulnera la moral del equipo y genera tensiones de rendimiento al carecer de métricas objetivas (PwC)
      - Finanzas: Sin valoración profesional de activos, la empresa se vuelve incapaz de liquidar participaciones sin descapitalizar la operación (PwC)
      - Riesgos: La omisión de planes de contingencia ante muerte o incapacidad del líder amenaza la viabilidad inmediata, exponiendo al negocio a un vacío de poder irreversible (PwC)
      - Operaciones: La carencia de sistematización asfixia la rentabilidad y condena al propietario a una operatividad perpetua que impide la visión estratégica (EqP)
      - Tecnología y Mercadeo: Ignorar la transformación digital invisibiliza la marca y obsoleta la propuesta de valor (PwC/EqP)

      FRASES DE IMPACTO (usa al menos 2 en el informe):
      - "Creemos que el trabajo de toda una vida no debería perderse por falta de estructura y planificación." — Empresas que Perduran
      - "La verdadera solidez empresarial nace de sustituir la gestión empírica por una Arquitectura Profesional." — Empresas que Perduran
      - "Lo que funcionó para arrancar, no sirve para escalar." — Empresas que Perduran
      - "Un enfrentamiento familiar puede llevar a una empresa a la ruina." — PwC
      - "Las empresas familiares de mayor éxito son aquellas en las que existe un óptimo equilibrio entre los tres círculos: familia, propiedad y empresa." — PwC

      Reglas de Estilo:
      1. Tono: Profesional, empático, ligeramente urgente pero sin ser alarmista. Orientado a generar acción.
      2. Personalización: Usa la segunda persona ("su empresa", "usted", "sus resultados"). Haz que el cliente sienta que le hablas directamente a él.
      3. Extensión: Sé detallado y explicativo (mínimo 2 párrafos por sección). Justifica tus observaciones con los datos del diagnóstico Y con estadísticas de los estudios.
      4. Enfoque persuasivo: Si hay puntajes bajos en Riesgos o Gobernanza, menciona el concepto de "Fragilidad Estructural". Haz que el cliente entienda que sin intervención profesional, estos problemas tienden a agravarse.
      5. Cierre comercial: Siempre cierra cada sección crítica sugiriendo que un consultor de Empresas que Perduran puede ayudarle a resolver esto de forma personalizada.
      6. Uso de datos: Integra naturalmente las estadísticas y citas en el texto. No las listes como bullets sino como parte de la narrativa persuasiva.`;

    const prompt = `
        Analiza el siguiente diagnóstico de la empresa "${formData.empresa}".
        Puntaje Global: ${overallScore} / 5.0.

        Desglose de áreas:
        ${scoresSummary}

        Genera el contenido del informe con la siguiente estructura estricta (usa texto plano, párrafos bien redactados):

        ENCABEZADO:
        "Estimado ${formData.titulo} ${lastName},"

        1. Opinión Ejecutiva (Mínimo 200 palabras): Un análisis profundo de la situación actual. Conecta las fortalezas con las debilidades. Usa estadísticas de los estudios de PwC, EY, Family Firm Institute para contextualizar la situación de esta empresa frente a la realidad del mercado. Haz que el cliente entienda la gravedad de no actuar a tiempo. Incluye al menos una frase de impacto de la base de conocimiento.

        2. Áreas Críticas (Identifica las 2 más bajas): Para cada una:
           - Explica claramente el riesgo concreto de no atenderla usando datos reales de los estudios internacionales.
           - Menciona qué pasa en otras empresas que ignoran esta área (consecuencias documentadas).
           - NO des recomendaciones específicas de qué hacer.
           - Cierra con una frase persuasiva invitando a reunirse con nuestros consultores, por ejemplo: "Este es exactamente el tipo de situación donde nuestros consultores diseñan planes a la medida" o "Le recomendamos agendar una sesión estratégica con nuestro equipo para abordar este punto de forma prioritaria."

        3. Conclusión y Llamado a la Acción: Reconoce el valor de haber hecho el diagnóstico. Usa la estadística de que solo el 30% sobrevive a la segunda generación para generar urgencia. Deja claro que el diagnóstico por sí solo no resuelve los problemas. Incluye la frase: "El primer paso ya lo dio. Ahora permítanos acompañarlo en el camino hacia una empresa verdaderamente perdurable." Invita a reunirse con un consultor de Empresas que Perduran para una propuesta personalizada sin compromiso.

        FIRMA (Copia esto exactamente al final):
        Equipo de Consultoría Estratégica
        Empresas que Perduran
        www.empresasqueperduran.com
        +1 (305) 564-5805
      `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { systemInstruction, temperature: 0.7 },
    });

    return NextResponse.json({ text: response.text || '' });
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}
