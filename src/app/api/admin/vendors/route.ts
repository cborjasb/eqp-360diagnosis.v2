import { NextRequest, NextResponse } from 'next/server';
import { getSheets, getSpreadsheetId } from '../../../../lib/google-sheets';

/**
 * API de administración de códigos (nivel de acceso por sector).
 * Protegido con ADMIN_PASSWORD (header x-admin-key). Si la variable no está
 * configurada en el servidor, el panel queda deshabilitado (fail-closed).
 */

function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function authorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return req.headers.get('x-admin-key') === expected;
}

function normalizeNivel(raw: unknown): 'completo' | 'limitado' {
  return String(raw ?? '').trim().toLowerCase() === 'limitado' ? 'limitado' : 'completo';
}

// GET: lista de códigos con su nivel y sectores permitidos.
export async function GET(request: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'El panel de administración no está configurado (falta ADMIN_PASSWORD en el servidor).' },
      { status: 503 },
    );
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }
  try {
    const sheets = getSheets();
    const spreadsheetId = getSpreadsheetId();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Vendedores!A:G',
    });
    const rows = res.data.values || [];
    const vendors = rows
      .filter((r) => {
        const c = (r[0] || '').toString().trim().toLowerCase();
        return c && c !== 'codigo';
      })
      .map((r) => {
        const nivelAcceso = normalizeNivel(r[5]);
        return {
          codigo: (r[0] || '').toString().trim(),
          nombre: (r[1] || '').toString().trim(),
          estado: (r[4] || '').toString().trim(),
          nivelAcceso,
          sectoresPermitidos:
            nivelAcceso === 'limitado'
              ? (r[6] || '')
                  .toString()
                  .split(/[,;]+/)
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : [],
        };
      });
    return NextResponse.json({ vendors });
  } catch (error) {
    console.error('admin/vendors GET error:', error);
    return NextResponse.json({ error: 'No se pudo leer la hoja de códigos.' }, { status: 500 });
  }
}

// POST: actualiza nivel_acceso (F) y sectores_permitidos (G) de un código.
export async function POST(request: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: 'Panel no configurado (falta ADMIN_PASSWORD).' }, { status: 503 });
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }
  try {
    const { codigo, nivelAcceso, sectoresPermitidos } = await request.json();
    if (!codigo || typeof codigo !== 'string') {
      return NextResponse.json({ error: 'Falta el código.' }, { status: 400 });
    }
    const nivel = normalizeNivel(nivelAcceso);
    const sectores =
      nivel === 'limitado' && Array.isArray(sectoresPermitidos)
        ? sectoresPermitidos.filter(Boolean).join(', ')
        : '';

    const sheets = getSheets();
    const spreadsheetId = getSpreadsheetId();

    // Encontrar la fila del código en la columna A.
    const colA = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Vendedores!A:A' });
    const rows = colA.data.values || [];
    let rowNum = -1;
    for (let i = 0; i < rows.length; i++) {
      if ((rows[i][0] || '').toString().trim().toLowerCase() === codigo.trim().toLowerCase()) {
        rowNum = i + 1; // 1-based
        break;
      }
    }
    if (rowNum === -1) {
      return NextResponse.json({ error: 'Código no encontrado en la hoja.' }, { status: 404 });
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Vendedores!F${rowNum}:G${rowNum}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[nivel, sectores]] },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('admin/vendors POST error:', error);
    return NextResponse.json({ error: 'No se pudo guardar el cambio.' }, { status: 500 });
  }
}
