import React, { useState, useEffect } from 'react';
import { 
  X, Users, Maximize2, Bed, Bath, MapPin, Check, 
  Calendar, Phone, ShieldCheck, ChevronLeft, ChevronRight, Share2, Sparkles, Video, Play
} from 'lucide-react';

export default function PropertyDetailModal({ property, onClose }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [mediaTab, setMediaTab] = useState('photos'); // 'photos' | 'video'
  const [activeVideo, setActiveVideo] = useState(property?.video || null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(property?.guests || 2);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (property?.video) {
      setActiveVideo(property.video);
    }
    setMediaTab('photos');
  }, [property]);

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!property) return null;

  const images = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.featuredImage];

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Mirá este alojamiento en José Ignacio: ${property.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    let text = `¡Hola Ale! Me interesa consultar disponibilidad para *${property.name}* en José Ignacio.`;
    if (checkIn && checkOut) {
      text += `\n📅 Fechas: del ${checkIn} al ${checkOut}`;
    }
    text += `\n👥 Huéspedes: ${guests} persona(s)`;
    if (notes) {
      text += `\n💬 Consulta: ${notes}`;
    }
    const url = `https://wa.me/59894422598?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ocean-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-sand-300 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-sand-200 bg-white sticky top-0 z-20">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-terracotta-600 block">
              {property.category}
            </span>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-ocean-950 truncate">
              {property.name}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-sand-100 text-slate-600 transition-colors"
              title="Compartir"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-sand-100 text-slate-600 transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
          
          {/* Media Switcher & Viewer */}
          <div className="space-y-3">
            
            {/* Tab Bar: Photos vs Video Tour */}
            {property.video && (
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-sand-200">
                <div className="inline-flex p-1 bg-sand-200/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMediaTab('photos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      mediaTab === 'photos'
                        ? 'bg-white text-ocean-950 shadow-sm'
                        : 'text-slate-600 hover:text-ocean-950'
                    }`}
                  >
                    📷 Fotos ({images.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      mediaTab === 'video'
                        ? 'bg-terracotta-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-ocean-950'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    Video Tour {property.video.duration ? `(${property.video.duration})` : ''}
                  </button>
                </div>

                {/* Sub-tabs for properties with multiple videos (e.g. Tizon Woodhouse) */}
                {mediaTab === 'video' && property.video?.extraVideos && property.video.extraVideos.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveVideo(property.video)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        activeVideo?.src === property.video.src 
                          ? 'bg-terracotta-100 border-terracotta-500 text-terracotta-800' 
                          : 'bg-white border-sand-200 text-slate-600 hover:bg-sand-50'
                      }`}
                    >
                      Interior & Deck
                    </button>
                    {property.video.extraVideos.map((ev, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveVideo(ev)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          activeVideo?.src === ev.src 
                            ? 'bg-terracotta-100 border-terracotta-500 text-terracotta-800' 
                            : 'bg-white border-sand-200 text-slate-600 hover:bg-sand-50'
                        }`}
                      >
                        {ev.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Video Tour Player View */}
            {mediaTab === 'video' && activeVideo ? (
              <div className="relative w-full bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-3 sm:p-6 min-h-[420px] sm:min-h-[500px]">
                <div className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/20">
                  <video
                    key={activeVideo.src}
                    src={activeVideo.src}
                    poster={activeVideo.poster}
                    controls
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3.5 flex items-center gap-2 text-sand-200 text-xs font-light text-center px-4">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                  <span>Grabado en el lugar por su dueña • Recorrido real sin filtros</span>
                </div>
              </div>
            ) : (
              /* Photo Gallery Main Viewer & Thumbnails */
              <div className="space-y-2.5 sm:space-y-3">
                <div className="relative aspect-[16/9] w-full bg-sand-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={images[activeImageIdx]}
                    alt={`${property.name} - foto ${activeImageIdx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs px-2.5 py-1 rounded-full">
                    {activeImageIdx + 1} / {images.length} fotos
                  </div>
                </div>

                {/* Thumbnails row */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 transition-all ${
                          idx === activeImageIdx 
                            ? 'ring-2 ring-terracotta-500 scale-105 opacity-100' 
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Banner to switch to video if available */}
                {property.video && (
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    className="w-full py-2 px-3 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-terracotta-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Video className="w-4 h-4 text-terracotta-600" />
                    <span>¿Querés ver cómo es por dentro? Mirá el <strong>Video Tour</strong> de este alojamiento ({property.video.duration})</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Details & Booking Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left: Info, Specs & Amenities (2 cols) */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* Key Specs Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-white rounded-2xl border border-sand-200 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sand-100 text-terracotta-600 shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Capacidad</span>
                    <span className="text-xs sm:text-sm font-bold text-ocean-950">Hasta {property.guests} pers.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sand-100 text-ocean-600 shrink-0">
                    <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Dormitorios</span>
                    <span className="text-xs sm:text-sm font-bold text-ocean-950">{property.bedrooms} hab.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sand-100 text-forest-600 shrink-0">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Baño</span>
                    <span className="text-xs sm:text-sm font-bold text-ocean-950">{property.bathrooms} baño</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sand-100 text-amber-600 shrink-0">
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Superficie</span>
                    <span className="text-xs sm:text-sm font-bold text-ocean-950">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2.5 bg-white p-4 sm:p-6 rounded-2xl border border-sand-200 shadow-soft">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-ocean-950">
                  Sobre el Alojamiento
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3 bg-white p-4 sm:p-6 rounded-2xl border border-sand-200 shadow-soft">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-ocean-950">
                  Comodidades y Servicios
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-forest-50 text-forest-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location badge */}
              <div className="flex items-start sm:items-center gap-2.5 p-3.5 bg-ocean-50 rounded-2xl border border-ocean-100 text-ocean-950 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong>Ubicación:</strong> La Juanita, José Ignacio, Maldonado, Uruguay. A metros de la playa.
                </span>
              </div>

            </div>

            {/* Right: Instant WhatsApp Booking Calculator (1 col) */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-terracotta-200/80 shadow-luxury flex flex-col justify-between h-fit sticky top-4">
              <div>
                <div className="flex items-center gap-2 text-terracotta-600 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Reserva Directa</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ocean-950 mb-1">
                  Consultar Estadía
                </h3>
                <p className="text-[11px] text-slate-500 mb-4 sm:mb-6">
                  Hablá directo con Ale Dellepiane sin comisiones extras.
                </p>

                <form onSubmit={handleWhatsAppBooking} className="space-y-3.5 text-xs">
                  {/* Dates input */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50 text-xs"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Huéspedes</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50 text-xs"
                    >
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'huésped' : 'huéspedes'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mensaje o duda</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="Ej: ¿Aceptan mascotas? ¿Horario de check-in?"
                      className="w-full p-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-sand-50 text-xs"
                    />
                  </div>

                  {/* Submit WhatsApp */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Consultar por WhatsApp</span>
                  </button>
                </form>
              </div>

              {/* Trust disclaimer */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-sand-100 flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Trato directo con la dueña • Mejor precio</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
