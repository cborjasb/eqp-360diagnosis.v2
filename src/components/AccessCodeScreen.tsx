'use client';

import { useState } from 'react';
import { LayoutDashboard, KeyRound, Loader2, AlertCircle } from 'lucide-react';
import { VendorData } from '../lib/types';

interface AccessCodeScreenProps {
  onValidCode: (vendor: VendorData) => void;
}

export const AccessCodeScreen: React.FC<AccessCodeScreenProps> = ({ onValidCode }) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsValidating(true);
    setError('');

    try {
      const res = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: code.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        onValidCode(data.vendor);
      } else {
        setError(data.message || 'Código no válido. Verifique e intente nuevamente.');
      }
    } catch {
      setError('Servicio temporalmente no disponible. Intenta en unos minutos.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-8 sm:p-10">
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xs">
            <LayoutDashboard className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Diagnóstico de Perdurabilidad 360°
          </h1>
          <p className="text-blue-100 text-base font-light">
            Ingrese su código de acceso para comenzar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Código de Ejecutivo de Cuenta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(''); }}
                placeholder="Ej: EQP-2025-001"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center text-lg font-mono tracking-wider uppercase"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-left animate-fade-in">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isValidating || !code.trim()}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold py-4 px-6 rounded-xl shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isValidating ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Verificando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>

          <p className="mt-6 text-xs text-gray-400">
            Si no tiene un código de acceso, contacte a su representante comercial.
          </p>
        </form>
      </div>
    </div>
  );
};
