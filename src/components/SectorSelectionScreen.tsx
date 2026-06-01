'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Lock } from 'lucide-react';
import { SECTORS } from '../lib/sectors/catalog';
import { hasSpecificQuestionnaire } from '../lib/sectors/registry';
import { getIcon } from '../lib/icons';
import { VendorData, SectorSelection } from '../lib/types';

interface SectorSelectionScreenProps {
  vendor: VendorData;
  onSelect: (selection: SectorSelection) => void;
  onBack: () => void;
}

export const SectorSelectionScreen: React.FC<SectorSelectionScreenProps> = ({
  vendor,
  onSelect,
  onBack,
}) => {
  const [openSectorId, setOpenSectorId] = useState<string | null>(null);
  const [subsectorId, setSubsectorId] = useState<string | undefined>(undefined);

  // Filtrado por nivel de acceso del código.
  const availableSectors = useMemo(() => {
    if (vendor.nivelAcceso === 'completo') return SECTORS;
    const allowed = new Set(vendor.sectoresPermitidos);
    return SECTORS.filter((s) => allowed.has(s.id));
  }, [vendor]);

  const openSector = availableSectors.find((s) => s.id === openSectorId) ?? null;

  const handlePickSector = (sectorId: string) => {
    setOpenSectorId(sectorId);
    setSubsectorId(undefined);
  };

  const handleConfirm = () => {
    if (!openSector) return;
    onSelect({ sectorId: openSector.id, subsectorId });
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-6"
        >
          <ArrowLeft size={16} /> Volver
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            ¿En qué sector opera la empresa?
          </h1>
          <p className="text-slate-300 text-lg font-light">
            Elija el sector para abrir un diagnóstico específico, con preguntas e informe adaptados a su rubro.
          </p>
          {vendor.nivelAcceso === 'limitado' && (
            <div className="mt-4 inline-flex items-center gap-2 text-amber-300 text-sm bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
              <Lock size={14} />
              Su código tiene acceso a {availableSectors.length}{' '}
              {availableSectors.length === 1 ? 'sector' : 'sectores'}.
            </div>
          )}
        </div>

        {availableSectors.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-slate-300">
            Su código no tiene sectores habilitados. Contacte a su administrador.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSectors.map((sector) => {
              const Icon = getIcon(sector.iconName);
              const isOpen = openSectorId === sector.id;
              const specialized = hasSpecificQuestionnaire(sector.id);
              return (
                <button
                  key={sector.id}
                  onClick={() => handlePickSector(sector.id)}
                  className={`text-left rounded-xl p-5 border transition-all ${
                    isOpen
                      ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-lg ${
                        isOpen ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    {specialized && (
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          isOpen ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-300'
                        }`}
                      >
                        <Sparkles size={10} /> Especializado
                      </span>
                    )}
                  </div>
                  <h3 className={`font-bold mb-1 ${isOpen ? 'text-white' : 'text-slate-100'}`}>
                    {sector.shortLabel}
                  </h3>
                  <p className={`text-xs ${isOpen ? 'text-blue-100' : 'text-slate-400'}`}>
                    {sector.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Panel de subsector + confirmación */}
        {openSector && (
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {openSector.label}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Opcional: precise el subsector para afinar aún más el diagnóstico.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSubsectorId(undefined)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  subsectorId === undefined
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-slate-400'
                }`}
              >
                {subsectorId === undefined && <Check size={14} className="inline mr-1" />}
                General (todo el sector)
              </button>
              {openSector.subsectors.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSubsectorId(sub.id)}
                  title={sub.examples}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    subsectorId === sub.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {subsectorId === sub.id && <Check size={14} className="inline mr-1" />}
                  {sub.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              Comenzar diagnóstico
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
