import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { 
  Phone, MapPin, ShieldCheck, Sparkles, MessageCircle, Clock, Check
} from 'lucide-react';

export default function ContactSection() {
  // Form state
  const [name, setName] = useState('');
  const [selectedProp, setSelectedProp] = useState('Consulta General');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');

  const buildWhatsAppText = () => {
    let text = `¡Hola Ale! Mi nombre es ${name || 'un huésped interesado'}.`;
    if (selectedProp && selectedProp !== 'Consulta General') {
      text += `\n🏠 Alojamiento: *${selectedProp}*`;
    }
    if (checkIn && checkOut) {
      text += `\n📅 Estadía: del ${checkIn} al ${checkOut}`;
    }
    text += `\n👥 Huéspedes: ${guests} persona(s)`;
    if (message) {
      text += `\n💬 Consulta: ${message}`;
    }
    return text;
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const text = buildWhatsAppText();
    const url = `https://wa.me/59894422598?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-sand-200 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta-600 mb-3 block">
            Contacto & Reservas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-4">
            Planifiquemos tu estadía en José Ignacio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
            Trato directo con su dueña a través de WhatsApp. Consultá fechas disponibles, tarifas de temporada o hacé tus consultas sin comisiones de plataformas intermediarias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Host Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Host Card */}
            <div className="bg-white p-8 rounded-3xl border border-sand-200 shadow-soft space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-sand-200 border-2 border-terracotta-400 overflow-hidden flex items-center justify-center text-ocean-950 font-serif text-2xl font-bold">
                  AD
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-terracotta-600 block">
                    Anfitriona & Propietaria
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ocean-950">
                    Ale Dellepiane
                  </h3>
                  <span className="text-xs text-slate-500">Lofts & Homes José Ignacio</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm font-light leading-relaxed">
                "Vivo en José Ignacio y me encanta recibir huéspedes de todas partes del mundo, brindándoles un espacio cálido, respetuoso con el entorno y con los mejores datos locales."
              </p>

              <div className="space-y-4 pt-4 border-t border-sand-100 text-sm">
                
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/59894422598?text=Hola%20Ale!%20Quisiera%20consultar%20por%20los%20alojamientos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-terracotta-600 transition-colors group p-2 rounded-2xl hover:bg-sand-50"
                >
                  <div className="w-11 h-11 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-colors shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Canal de Contacto Exclusivo</span>
                    <span className="font-semibold text-ocean-950 text-base">WhatsApp: (+598) 94 422 598</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 text-slate-700 p-2">
                  <div className="w-11 h-11 rounded-xl bg-sand-100 text-terracotta-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Ubicación</span>
                    <span className="font-semibold text-ocean-950">La Juanita, José Ignacio, Uruguay</span>
                  </div>
                </div>

              </div>

              {/* Direct host benefits badge */}
              <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-100/80 space-y-2 text-xs text-forest-900">
                <div className="flex items-center gap-2 font-bold text-forest-800">
                  <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Beneficios de la reserva directa:</span>
                </div>
                <ul className="space-y-1 text-forest-700 pl-6 list-disc">
                  <li>Respuesta inmediata por WhatsApp con su dueña.</li>
                  <li>Sin comisiones adicionales ni recargos de plataformas.</li>
                  <li>Asesoramiento local personalizado para tu estadía.</li>
                </ul>
              </div>

            </div>

            {/* Map Card */}
            <div className="bg-white p-4 rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-sand-100">
                <iframe
                  title="Ubicación La Juanita Jose Ignacio"
                  src="https://maps.google.com/maps?q=La%20Juanita,%20Jose%20Ignacio,%20Uruguay&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-3 text-center text-xs text-slate-500">
                A 400 metros de la playa de La Juanita y 3 minutos del pueblo de José Ignacio.
              </div>
            </div>

          </div>

          {/* Right Column: WhatsApp Booking & Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-sand-200 shadow-luxury">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ocean-950">
                    Consulta por WhatsApp
                  </h3>
                  <p className="text-xs text-slate-500">
                    Completá tus datos para armar tu mensaje y consultar disponibilidad al instante
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleWhatsAppSend} className="space-y-5 text-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Sofia Martinez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Alojamiento de Interés
                  </label>
                  <select
                    value={selectedProp}
                    onChange={(e) => setSelectedProp(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-sm"
                  >
                    <option value="Consulta General">Todos / Consulta General</option>
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} ({p.category})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Huéspedes</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
                  >
                    <option value="1">1 Huésped</option>
                    <option value="2">2 Huéspedes</option>
                    <option value="3">3 Huéspedes</option>
                    <option value="4">4 Huéspedes</option>
                    <option value="5">5 Huéspedes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Consulta Adicional</label>
                <textarea
                  rows={3}
                  placeholder="¿Alguna preferencia o duda especial sobre tu estadía?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest-500 focus:outline-none bg-sand-50/50 text-sm"
                />
              </div>

              {/* Message Live Preview */}
              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-slate-600">
                <span className="font-bold text-slate-700 block mb-1">Vista previa del mensaje que se abrirá en WhatsApp:</span>
                <p className="font-mono whitespace-pre-line text-slate-600">{buildWhatsAppText()}</p>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-forest-600 hover:bg-forest-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Abrir WhatsApp y Enviar Consulta Directa</span>
              </button>

              <div className="pt-2 text-center">
                <a
                  href="https://wa.me/59894422598?text=¡Hola%20Ale!%20Quisiera%20consultar%20por%20los%20alojamientos%20en%20José%20Ignacio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-forest-600 underline font-medium"
                >
                  ¿Preferís chatear directamente sin completar los campos? Hacé clic acá
                </a>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
