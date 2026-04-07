import { NextRequest, NextResponse } from 'next/server';
import { getSheets, getSpreadsheetId } from '../../../lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendedor, cliente, scores, puntuacion_global, puntuaciones_dimensiones } = body;

    const sheets = getSheets();
    const spreadsheetId = getSpreadsheetId();

    const now = new Date();
    const fecha = now.toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const dims = puntuaciones_dimensiones || {};

    const row = [
      fecha,                                    // A: fecha_generacion
      vendedor?.codigo || '',                   // B: codigo_vendedor
      vendedor?.nombre || '',                   // C: nombre_vendedor
      vendedor?.email || '',                    // D: email_vendedor
      vendedor?.empresa || '',                  // E: empresa_vendedor
      cliente?.nombre || '',                    // F: nombre_cliente
      cliente?.email || '',                     // G: email_cliente
      cliente?.empresa || '',                   // H: empresa_cliente
      JSON.stringify(scores || {}),             // I: datos_formulario
      puntuacion_global || '',                  // J: puntuacion_global
      dims.finanzas ?? '',                      // K: finanzas
      dims.operaciones ?? '',                   // L: operaciones
      dims.riesgos ?? '',                       // M: riesgos
      dims.talento ?? '',                       // N: talento
      dims.mercadeo ?? '',                      // O: mercadeo
      dims.gobernanza ?? '',                    // P: gobernanza
      dims.tecnologia ?? '',                    // Q: tecnologia
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Registro!A:Q',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering report:', error);
    return NextResponse.json(
      { success: false, message: 'Error al registrar el informe.' },
      { status: 500 }
    );
  }
}
