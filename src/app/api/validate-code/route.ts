import { NextRequest, NextResponse } from 'next/server';
import { getSheets, getSpreadsheetId } from '../../../lib/google-sheets';

// TODO: Eliminar este código de prueba cuando Google Sheets esté configurado
const TEST_VENDORS = [
  { codigo: 'TEST-001', nombre: 'Carlos Borjas (Prueba)', email: 'carlos@test.com', empresa: 'Empresas que Perduran', estado: 'activo' },
  { codigo: 'TEST-002', nombre: 'Vendedor Demo', email: 'demo@test.com', empresa: 'Demo Corp', estado: 'activo' },
  { codigo: 'TEST-OFF', nombre: 'Vendedor Suspendido', email: 'off@test.com', empresa: 'Suspendida LLC', estado: 'suspendido' },
];

export async function POST(request: NextRequest) {
  try {
    const { codigo } = await request.json();

    if (!codigo || typeof codigo !== 'string') {
      return NextResponse.json(
        { valid: false, message: 'Debe ingresar un código de acceso.' },
        { status: 400 }
      );
    }

    // --- Modo prueba: si Google Sheets no está configurado, usar datos de prueba ---
    const sheetsConfigured = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SPREADSHEET_ID;

    if (!sheetsConfigured) {
      const testMatch = TEST_VENDORS.find(
        (v) => v.codigo.toUpperCase() === codigo.trim().toUpperCase()
      );
      if (!testMatch) {
        return NextResponse.json(
          { valid: false, message: 'Código no encontrado. Prueba con: TEST-001 o TEST-002' },
          { status: 200 }
        );
      }
      if (testMatch.estado !== 'activo') {
        return NextResponse.json(
          { valid: false, message: 'Este código se encuentra suspendido. Contacte a su administrador.' },
          { status: 200 }
        );
      }
      return NextResponse.json({ valid: true, vendor: testMatch });
    }
    // --- Fin modo prueba ---

    const sheets = getSheets();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Vendedores!A:E',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return NextResponse.json(
        { valid: false, message: 'No se encontraron registros de vendedores.' },
        { status: 404 }
      );
    }

    // Skip header row, find matching code (case-insensitive)
    const match = rows.slice(1).find(
      (row) => row[0]?.toString().trim().toUpperCase() === codigo.trim().toUpperCase()
    );

    if (!match) {
      return NextResponse.json(
        { valid: false, message: 'Código no encontrado. Verifique que esté bien escrito e intente nuevamente.' },
        { status: 200 }
      );
    }

    const estado = (match[4] || '').toString().trim().toLowerCase();

    if (estado !== 'activo') {
      return NextResponse.json(
        { valid: false, message: 'Este código se encuentra suspendido. Contacte a su administrador.' },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      vendor: {
        codigo: match[0]?.toString().trim() || '',
        nombre: match[1]?.toString().trim() || '',
        email: match[2]?.toString().trim() || '',
        empresa: match[3]?.toString().trim() || '',
        estado: 'activo',
      },
    });
  } catch (error) {
    console.error('Error validating code:', error);
    return NextResponse.json(
      { valid: false, message: 'Servicio temporalmente no disponible. Intenta en unos minutos.' },
      { status: 500 }
    );
  }
}
