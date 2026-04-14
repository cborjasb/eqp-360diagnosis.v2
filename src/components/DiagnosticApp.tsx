'use client';

import { useState, useMemo, useRef } from 'react';
import { DIMENSIONS, INITIAL_SCORES } from '../lib/constants';
import { ScoreInput } from './ScoreInput';
import { RadarReport } from './RadarReport';
import { AnalysisSection } from './AnalysisSection';
import { LeadFormModal } from './LeadFormModal';
import { AccessCodeScreen } from './AccessCodeScreen';
import { ScoresState, DimensionKey, ChartDataPoint, LeadFormData, VendorData } from '../lib/types';
import { LayoutDashboard, FileText, Sparkles, CheckCircle, Info, PlayCircle, Loader2, UserCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import { GoogleGenAI } from "@google/genai";

type ViewState = 'access' | 'welcome' | 'assessment' | 'success';

export const DiagnosticApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('access');
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [scores, setScores] = useState<ScoresState>(INITIAL_SCORES);
  const [openSection, setOpenSection] = useState<DimensionKey | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [lastFormData, setLastFormData] = useState<LeadFormData | null>(null);
  const [isContacting, setIsContacting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleValidCode = (vendorData: VendorData) => {
    setVendor(vendorData);
    setCurrentView('welcome');
  };

  const handleScoreChange = (dimKey: DimensionKey, index: number, value: number) => {
    setScores(prev => ({
      ...prev,
      [dimKey]: prev[dimKey].map((s, i) => i === index ? value : s)
    }));
  };

  const toggleSection = (key: DimensionKey) => {
    setOpenSection(openSection === key ? null : key);
  };

  const reportData: ChartDataPoint[] = useMemo(() => {
    return DIMENSIONS.map(dim => {
      const dimScores = scores[dim.key];
      const average = dimScores.reduce((a, b) => a + b, 0) / dimScores.length;
      return {
        subject: dim.label,
        actual: parseFloat(average.toFixed(1)),
        ideal: 5.0,
        fullMark: 5
      };
    });
  }, [scores]);

  const overallScore = reportData.reduce((acc, curr) => acc + curr.actual, 0) / reportData.length;

  const generateAIAnalysis = async (formData: LeadFormData, data: ChartDataPoint[]) => {
    try {
      const res = await fetch('/api/gemini-key');
      const { key } = await res.json();
      if (!key) return "Análisis no disponible (Falta API Key).";

      const nameParts = formData.nombre.trim().split(' ');
      const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : formData.nombre;

      const ai = new GoogleGenAI({ apiKey: key });
      const scoresSummary = data.map(d => `- ${d.subject}: ${d.actual}/5.0`).join('\n');

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
        Puntaje Global: ${overallScore.toFixed(1)} / 5.0.

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
        model: 'gemini-1.5-pro',
        contents: prompt,
        config: { systemInstruction, temperature: 0.7 },
      });

      return response.text;
    } catch (error) {
      console.error("Error IA:", error);
      return "No se pudo conectar con la IA para generar el análisis narrativo. Sin embargo, los datos numéricos son válidos y precisos.";
    }
  };

  const registerReport = async (formData: LeadFormData) => {
    if (!vendor) return;
    try {
      await fetch('/api/register-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendedor: vendor,
          cliente: {
            nombre: formData.nombre,
            email: formData.email,
            empresa: formData.empresa,
          },
          scores,
          puntuacion_global: overallScore.toFixed(1),
          puntuaciones_dimensiones: Object.fromEntries(
            reportData.map(d => [d.subject.toLowerCase(), d.actual.toFixed(1)])
          ),
        }),
      });
    } catch (error) {
      console.error("Error registrando informe:", error);
    }
  };

  const handleProcessReport = async (formData: LeadFormData) => {
    setIsProcessing(true);
    setLoadingMessage('Analizando datos...');
    setLastFormData(formData);

    try {
      setLoadingMessage('Consultando a la IA Experta...');
      const aiAnalysisText = await generateAIAnalysis(formData, reportData);

      setLoadingMessage('Generando PDF...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text('Informe Diagnóstico 360', margin, 17);
      pdf.setFontSize(10);
      pdf.text(`Empresa: ${formData.empresa}`, pageWidth - margin, 17, { align: 'right' });

      pdf.setTextColor(40, 40, 40);
      pdf.setFontSize(12);
      pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, 35);
      pdf.text(`Puntaje Global: ${overallScore.toFixed(1)} / 5.0`, pageWidth - margin, 35, { align: 'right' });

      let chartImageHeight = 0;
      if (chartRef.current) {
        const chartCanvas = await html2canvas(chartRef.current, { scale: 2, backgroundColor: '#ffffff' });
        const imgData = chartCanvas.toDataURL('image/png');
        const imgWidth = 140;
        chartImageHeight = (chartCanvas.height * imgWidth) / chartCanvas.width;
        const x = (pageWidth - imgWidth) / 2;
        pdf.addImage(imgData, 'PNG', x, 45, imgWidth, chartImageHeight);
      }

      let currentY = 45 + chartImageHeight + 10;
      pdf.setFontSize(14);
      pdf.setTextColor(23, 37, 84);
      pdf.text("Resumen de Métricas", margin, currentY);
      currentY += 8;
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      reportData.forEach((item) => {
        pdf.text(`${item.subject}`, margin, currentY);
        pdf.text(`${item.actual.toFixed(1)}`, pageWidth - margin - 20, currentY, { align: 'right' });
        currentY += 6;
      });

      pdf.addPage();
      pdf.setFillColor(240, 249, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      pdf.setTextColor(20, 20, 20);
      pdf.setFontSize(16);
      pdf.text('Análisis Estratégico', margin, 20);
      pdf.setFontSize(11);

      const analysisText = aiAnalysisText ?? '';
      const splitAnalysis = pdf.splitTextToSize(analysisText, pageWidth - (margin * 2));
      let textY = 35;
      splitAnalysis.forEach((line: string) => {
        if (textY > pageHeight - margin) { pdf.addPage(); textY = 20; }
        pdf.text(line, margin, textY);
        textY += 6;
      });

      setLoadingMessage('Enviando reportes...');

      const serviceID = 'service_okaskrg';
      const templateID = 'template_f7f6xho';
      const publicKey = 'E5gBaI4olllFQ0BLk';

      const clientBody = `Hola ${formData.titulo} ${formData.nombre.split(' ')[0]},\n\nGracias por realizar el Diagnóstico para ${formData.empresa}.\n\nAdjunto encontrarás el informe detallado generado por nuestra IA especializada.\n\nAtentamente,\nEquipo de Perdurabilidad.`;
      const adminBody = `NUEVO LEAD (Diagnóstico Completado):\nNombre: ${formData.titulo} ${formData.nombre}\nEmpresa: ${formData.empresa}\nEmail: ${formData.email}\nCelular: ${formData.celular}\nPuntaje Global: ${overallScore.toFixed(1)}\nVendedor: ${vendor?.nombre || 'N/A'} (${vendor?.codigo || 'N/A'})`;

      await Promise.all([
        emailjs.send(serviceID, templateID, {
          to_email: formData.email,
          name: formData.nombre,
          email: formData.email,
          message: clientBody,
          company_name: formData.empresa
        }, publicKey).catch(e => console.error("FALLÓ Email Cliente.", e)),
        emailjs.send(serviceID, templateID, {
          to_email: 'empresasqueperduran@gmail.com',
          name: "Sistema de Alertas",
          email: formData.email,
          message: adminBody,
          company_name: formData.empresa
        }, publicKey).catch(e => console.error("FALLÓ Email Admin.", e))
      ]);

      pdf.save(`Diagnostico_${formData.empresa.replace(/\s+/g, '_')}.pdf`);

      // Register report AFTER successful generation
      await registerReport(formData);

      setCurrentView('success');

    } catch (error) {
      console.error("Error general:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      alert(`Ocurrió un error: ${errMsg}. Por favor intente nuevamente.`);
    } finally {
      setIsProcessing(false);
      setIsLeadFormOpen(false);
      setLoadingMessage('');
    }
  };

  const handleContactRequest = async () => {
    if (!lastFormData) return;
    setIsContacting(true);

    const serviceID = 'service_okaskrg';
    const templateID = 'template_f7f6xho';
    const publicKey = 'E5gBaI4olllFQ0BLk';

    const emailSubject = `LEAD: ${lastFormData.nombre} - ${lastFormData.empresa}`;
    const messageBody = `SOLICITUD DE PROPUESTA PERSONALIZADA\n--------------------------------------\nEl cliente (${lastFormData.titulo} ${lastFormData.nombre}) ha solicitado ser contactado por un consultor especializado.\n\nDETALLES DEL CLIENTE:\nNombre: ${lastFormData.nombre}\nEmpresa: ${lastFormData.empresa}\nEmail: ${lastFormData.email}\nCelular: ${lastFormData.celular}\nSitio Web: ${lastFormData.website || 'No registrado'}\n\nRESUMEN DEL DIAGNÓSTICO:\nPuntaje Global: ${overallScore.toFixed(1)} / 5.0\n${reportData.map(d => `${d.subject}: ${d.actual}`).join('\n')}\n\nVendedor: ${vendor?.nombre || 'N/A'} (${vendor?.codigo || 'N/A'})`;

    try {
      await emailjs.send(serviceID, templateID, {
        to_email: 'empresasqueperduran@gmail.com',
        name: lastFormData.nombre,
        email: lastFormData.email,
        message: `${emailSubject}\n\n${messageBody}`,
        company_name: lastFormData.empresa
      }, publicKey);

      setContactSuccess(true);
    } catch (error) {
      console.error("Error enviando solicitud de contacto:", error);
      alert("Hubo un error al enviar la solicitud. Por favor intente nuevamente.");
    } finally {
      setIsContacting(false);
    }
  };

  // --- VISTA 0: CÓDIGO DE ACCESO ---
  if (currentView === 'access') {
    return <AccessCodeScreen onValidCode={handleValidCode} />;
  }

  // --- VISTA 1: BIENVENIDA ---
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-8 sm:p-12">
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xs">
              <LayoutDashboard className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Diagnóstico de Perdurabilidad 360°
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl font-light">
              Descubra en menos de 5 minutos qué tan preparada está su empresa para el futuro.
            </p>
          </div>
          <div className="p-8 sm:p-12 bg-white">
            {vendor && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                Consultor: <strong>{vendor.nombre}</strong> — {vendor.empresa}
              </div>
            )}
            <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">Rápido</div>
                <p className="text-sm text-slate-600">Evalúe 7 dimensiones clave de forma ágil.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">Visual</div>
                <p className="text-sm text-slate-600">Obtenga un radar de vulnerabilidad instantáneo.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">IA Expert</div>
                <p className="text-sm text-slate-600">Reciba un análisis estratégico personalizado.</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('assessment')}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold py-4 px-10 rounded-xl shadow-lg shadow-slate-900/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 mx-auto"
            >
              <PlayCircle size={24} />
              Generar Informe Personalizado
            </button>
            <p className="mt-6 text-xs text-gray-400">
              Herramienta gratuita basada en la metodología de Empresas que Perduran.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA 3: ÉXITO ---
  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            ¡Informe Generado con Éxito!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Hemos enviado el <strong>análisis estratégico detallado</strong> a su correo electrónico y se ha descargado una copia en su dispositivo.
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-left mb-8 shadow-xs">
            <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
              <Info size={20} />
              ¿Qué sigue ahora?
            </h3>
            <p className="text-blue-800 text-base mb-6 leading-relaxed">
              Revise las recomendaciones de este informe personalizado.
            </p>

            <p className="text-gray-600 text-sm mb-4 italic border-l-4 border-blue-300 pl-3">
              &ldquo;Haga click aquí si desea que le contacte un consultor especializado, quien diseñará una propuesta personalizada, adaptada a su situación particular, sin compromiso.&rdquo;
            </p>

            {!contactSuccess ? (
              <button
                onClick={handleContactRequest}
                disabled={isContacting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isContacting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <UserCheck size={18} />
                    Solicitar Consultoría Personalizada
                  </>
                )}
              </button>
            ) : (
              <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg text-sm flex items-start gap-3 animate-fade-in">
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">¡Solicitud Enviada!</span>
                  Un consultor analizará su caso y le contactará pronto.
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setScores(INITIAL_SCORES);
              setOpenSection(null);
              setContactSuccess(false);
              setLastFormData(null);
              setCurrentView('welcome');
            }}
            className="text-gray-500 hover:text-gray-900 font-medium text-sm underline underline-offset-4"
          >
            Generar Otro Diagnóstico
          </button>
        </div>
      </div>
    );
  }

  // --- VISTA 2: EVALUACIÓN (Dashboard Principal) ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <LeadFormModal
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        onSubmit={handleProcessReport}
        isProcessing={isProcessing}
        loadingMessage={loadingMessage}
      />

      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-900/50 shadow-md">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight">Diagnóstico 360°</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {vendor && (
              <span className="hidden md:inline text-xs text-gray-400">
                Consultor: {vendor.nombre}
              </span>
            )}
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">Puntaje Global</span>
              <span className={`font-bold text-lg ${overallScore > 4 ? 'text-green-400' : overallScore > 2.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                {overallScore.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Evaluación</h2>
              <span className="text-sm text-gray-500">7 Dimensiones</span>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <h3 className="text-blue-900 font-bold text-sm flex items-center gap-2 mb-2">
                <Info size={16} />
                ¿Cómo funciona?
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 ml-1">
                <li className="flex gap-2">
                  <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Haga clic en cada una de las cajas de abajo (ej. Finanzas) para desplegar las preguntas.</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Mueva el círculo azul para calificar su empresa del <strong>0</strong> (Crítico) al <strong>5</strong> (Excelente).</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span>Cuando termine las 7 áreas, presione el botón <strong>&ldquo;Crear Informe&rdquo;</strong> en la parte inferior de la pantalla.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              {DIMENSIONS.map(dim => (
                <ScoreInput
                  key={dim.key}
                  dimension={dim}
                  scores={scores[dim.key]}
                  onChange={handleScoreChange}
                  isOpen={openSection === dim.key}
                  onToggle={() => toggleSection(dim.key)}
                />
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-7 space-y-6 bg-white p-6 rounded-xl shadow-none lg:shadow-xs"
            id="report-content"
          >
            <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Resultados en Tiempo Real
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4" ref={chartRef}>
              <div className="mb-4 text-center">
                <h3 className="text-gray-500 text-sm uppercase tracking-wide font-semibold">Mapa de Vulnerabilidad</h3>
              </div>
              <RadarReport data={reportData} />
              <div className="mt-4 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 opacity-50"></span>
                  <span className="text-gray-600">Su Empresa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-gray-400 border-dashed"></span>
                  <span className="text-gray-600">Benchmark Institucional</span>
                </div>
              </div>
            </div>

            <AnalysisSection data={reportData} />
          </div>
        </div>
      </main>

      {/* Botón fijo inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block text-sm text-gray-500">
            Complete las 7 dimensiones y genere su informe estratégico
          </div>
          <button
            onClick={() => setIsLeadFormOpen(true)}
            className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <Sparkles size={18} className="text-yellow-300" />
            Crear Informe
          </button>
        </div>
      </div>
    </div>
  );
};
