import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Tooltip dialog */}
      {tooltipOpen && (
        <div className="hidden sm:flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl border border-sand-200 animate-fadeIn text-xs text-slate-700 max-w-xs relative">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-sand-200 hover:bg-sand-300 rounded-full flex items-center justify-center text-slate-600"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="w-8 h-8 rounded-full bg-sand-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[10px] text-ocean-950">
            AD
          </div>
          <div>
            <p className="font-bold text-ocean-950">¿Tenés dudas sobre José Ignacio?</p>
            <p className="text-slate-500 text-[11px]">Escribile directo a Ale por WhatsApp.</p>
          </div>
        </div>
      )}

      {/* WhatsApp Pulse Trigger */}
      <a
        href="https://wa.me/59894422598?text=Hola%20Ale!%20Quisiera%20consultar%20disponibilidad%20para%20los%20alojamientos%20en%20Jos%C3%A9%20Ignacio."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group relative"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
