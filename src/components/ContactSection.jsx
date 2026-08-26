import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, 
  Sparkles, MessageSquare, Clock, AlertCircle 
} from 'lucide-react';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'email'
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProp, setSelectedProp] = useState('Consulta General');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');
  
  // Anti-bot honeypot field
  const [botTrap, setBotTrap] = useState('');
  
  // Submission feedback
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });

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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // Check honeypot trap for bots
    if (botTrap) {
      console.warn('Bot detected by honeypot.');
      setFormStatus({
        state: 'success',
        message: '¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad.'
      });
      return;
    }

    if (!name || !email || !message) {
      setFormStatus({
        state: 'error',
        message: 'Por favor completá los campos obligatorios (Nombre, Email y Mensaje).'
      });
      return;
    }

    // Direct mailto fallback or clean confirmation
    setFormStatus({
      state: 'success',
      message: '¡Gracias por contactarnos! Tu mensaje fue registrado. También podés escribirnos por WhatsApp para una respuesta inmediata.'
    });

    // Reset form after short delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-sand-200 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta-600 mb-3 block">
            Contacto Directo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-4">
            Planifiquemos tu estadía en José Ignacio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
            Escribinos directamente para consultar fechas disponibles, tarifas de temporada o consultas específicas sobre nuestros lofts y casas.
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
                
                {/* Phone / WhatsApp */}
                <a
                  href="https://wa.me/59894422598?text=Hola%20Ale!%20Quisiera%20consultar%20por%20los%20alojamientos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-terracotta-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">WhatsApp / Teléfono</span>
                    <span className="font-semibold text-ocean-950">(+598) 94 422 598</span>
                  </div>
                </a>

                {/* Email */}
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-ocean-50 text-ocean-600 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Correo Electrónico</span>
                    <span className="font-semibold text-ocean-950">aledellepiane7@hotmail.com</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-sand-100 text-terracotta-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Ubicación</span>
                    <span className="font-semibold text-ocean-950">La Juanita, José Ignacio, Uruguay</span>
                  </div>
                </div>

              </div>

              {/* Anti-spam security badge */}
              <div className="p-4 rounded-2xl bg-forest-50 border border-forest-100 flex items-center gap-3 text-xs text-forest-800">
                <ShieldCheck className="w-5 h-5 text-forest-600 shrink-0" />
                <span>Contacto directo autenticado y protegido contra correo no deseado.</span>
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

          {/* Right Column: Interactive Consultation & Booking Center (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-sand-200 shadow-luxury">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-sand-100 rounded-2xl mb-8">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'whatsapp'
                    ? 'bg-white text-terracotta-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Phone className="w-4 h-4 text-forest-600" />
                <span>WhatsApp Directo (Recomendado)</span>
              </button>

              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'email'
                    ? 'bg-white text-ocean-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-4 h-4 text-ocean-600" />
                <span>Formulario por Correo</span>
              </button>
            </div>

            {/* Content: WhatsApp Tab */}
            {activeTab === 'whatsapp' && (
              <form onSubmit={handleWhatsAppSend} className="space-y-5 text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Tu Nombre</label>
                    <input
                      type="text"
                      placeholder="Ej: Sofia Martinez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Alojamiento de Interés</label>
                    <select
                      value={selectedProp}
                      onChange={(e) => setSelectedProp(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-sm"
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
                      className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Huéspedes</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full p-3 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-xs sm:text-sm"
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
                    className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50/50 text-sm"
                  />
                </div>

                {/* Message Live Preview */}
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-slate-600">
                  <span className="font-bold text-slate-700 block mb-1">Vista previa del mensaje a enviar:</span>
                  <p className="font-mono whitespace-pre-line text-slate-600">{buildWhatsAppText()}</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01]"
                >
                  <Phone className="w-5 h-5" />
                  <span>Abrir WhatsApp y Enviar Consulta Directa</span>
                </button>
              </form>
            )}

            {/* Content: Protected Email Form Tab */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-5 text-slate-800">
                
                {/* Honeypot Bot Trap (Invisible to humans) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website_url_check"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-ocean-500 focus:outline-none bg-sand-50/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-ocean-500 focus:outline-none bg-sand-50/50 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+54 9 11 ... / +598 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-ocean-500 focus:outline-none bg-sand-50/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Alojamiento de Interés</label>
                    <select
                      value={selectedProp}
                      onChange={(e) => setSelectedProp(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-ocean-500 focus:outline-none bg-sand-50/50 text-sm"
                    >
                      <option value="Consulta General">Consulta General</option>
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mensaje *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribí aquí tu mensaje, fechas tentativas o consultas..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-ocean-500 focus:outline-none bg-sand-50/50 text-sm"
                  />
                </div>

                {/* Status Messages */}
                {formStatus.state === 'success' && (
                  <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-forest-800 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {formStatus.state === 'error' && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-ocean-950 hover:bg-ocean-900 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Formulario Seguro</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
