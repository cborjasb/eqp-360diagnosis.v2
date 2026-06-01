'use client';

import { useState } from 'react';
import { SECTORS } from '../../lib/sectors/catalog';
import { ShieldCheck, KeyRound, Loader2, Check, Save, AlertCircle, Lock, Unlock } from 'lucide-react';

type Nivel = 'completo' | 'limitado';

interface Vendor {
  codigo: string;
  nombre: string;
  estado: string;
  nivelAcceso: Nivel;
  sectoresPermitidos: string[];
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [savingCode, setSavingCode] = useState<string | null>(null);
  const [savedCode, setSavedCode] = useState<string | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/vendors', { headers: { 'x-admin-key': adminKey } });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No autorizado.');
      } else {
        setVendors(data.vendors || []);
        setAuthed(true);
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const updateVendor = (codigo: string, patch: Partial<Vendor>) => {
    setVendors((prev) => prev.map((v) => (v.codigo === codigo ? { ...v, ...patch } : v)));
    setSavedCode(null);
  };

  const toggleSector = (v: Vendor, sectorId: string) => {
    const has = v.sectoresPermitidos.includes(sectorId);
    const next = has
      ? v.sectoresPermitidos.filter((s) => s !== sectorId)
      : [...v.sectoresPermitidos, sectorId];
    updateVendor(v.codigo, { sectoresPermitidos: next });
  };

  const save = async (v: Vendor) => {
    setSavingCode(v.codigo);
    setError('');
    setSavedCode(null);
    try {
      const res = await fetch('/api/admin/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({
          codigo: v.codigo,
          nivelAcceso: v.nivelAcceso,
          sectoresPermitidos: v.sectoresPermitidos,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'No se pudo guardar.');
      else setSavedCode(v.codigo);
    } catch {
      setError('Error de conexión al guardar.');
    } finally {
      setSavingCode(null);
    }
  };

  // --- Pantalla de acceso ---
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">Administración de Códigos</h1>
            <p className="text-blue-100 text-sm mt-2">Gestione el acceso por sector de cada código</p>
          </div>
          <form onSubmit={login} className="p-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de administrador</label>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => { setAdminKey(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                autoFocus
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
                <AlertCircle size={18} className="shrink-0 mt-0.5" /> {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !adminKey.trim()}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Verificando…</> : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Panel de gestión ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-slate-900 text-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-400" />
            <h1 className="font-bold">Administración de Códigos</h1>
          </div>
          <span className="text-xs text-gray-400">{vendors.length} códigos</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0 mt-0.5" /> {error}
          </div>
        )}

        {vendors.map((v) => (
          <div key={v.codigo} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <span className="font-mono font-bold text-gray-900">{v.codigo}</span>
                <span className="text-gray-500 ml-2">{v.nombre}</span>
                {v.estado && v.estado.toLowerCase() !== 'activo' && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{v.estado}</span>
                )}
              </div>
            </div>

            {/* Nivel de acceso */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => updateVendor(v.codigo, { nivelAcceso: 'completo' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  v.nivelAcceso === 'completo'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                }`}
              >
                <Unlock size={15} /> Acceso completo (todos los sectores)
              </button>
              <button
                onClick={() => updateVendor(v.codigo, { nivelAcceso: 'limitado' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  v.nivelAcceso === 'limitado'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <Lock size={15} /> Limitado a ciertos sectores
              </button>
            </div>

            {/* Checkboxes de sectores (solo si limitado) */}
            {v.nivelAcceso === 'limitado' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                {SECTORS.map((s) => {
                  const checked = v.sectoresPermitidos.includes(s.id);
                  return (
                    <label
                      key={s.id}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm border transition-all ${
                        checked ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-200'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                          checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                        }`}
                      >
                        {checked && <Check size={14} className="text-white" />}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleSector(v, s.id)}
                      />
                      {s.shortLabel}
                    </label>
                  );
                })}
              </div>
            )}

            {v.nivelAcceso === 'limitado' && v.sectoresPermitidos.length === 0 && (
              <p className="text-xs text-amber-600 mb-3 flex items-center gap-1">
                <AlertCircle size={13} /> Sin sectores seleccionados: este código no podrá generar ningún diagnóstico.
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => save(v)}
                disabled={savingCode === v.codigo}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2 disabled:opacity-60"
              >
                {savingCode === v.codigo ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Guardar
              </button>
              {savedCode === v.codigo && (
                <span className="text-green-600 text-sm flex items-center gap-1 animate-fade-in">
                  <Check size={15} /> Guardado
                </span>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
