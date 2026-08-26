import React, { useState } from 'react';
import { Users, Maximize2, Bed, Bath, ArrowRight, Phone, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function PropertyCard({ property, onSelect }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const images = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.featuredImage];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Ale! Quisiera consultar disponibilidad y tarifas para ${property.name} en José Ignacio.`
  );

  return (
    <div 
      onClick={() => onSelect(property)}
      className="group bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
    >
      {/* Image Container with Slider Controls */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        <img
          src={images[currentImageIdx]}
          alt={property.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-ocean-950/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
            {property.category}
          </span>
        </div>

        {/* Gallery count */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
            📷 {images.length}
          </span>
        </div>

        {/* Image Arrows (visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.slice(0, 6).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? 'w-4 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location / Tagline */}
          <div className="text-[11px] uppercase tracking-wider font-semibold text-terracotta-600 mb-1">
            {property.location}
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-ocean-950 mb-2 group-hover:text-terracotta-600 transition-colors">
            {property.name}
          </h3>

          {/* Description snippet */}
          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-4">
            {property.description}
          </p>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-sand-200 text-slate-700 text-xs mb-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Hasta {property.guests} pers.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-ocean-600" />
              <span>{property.bedrooms} dorm.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-forest-600" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Highlights mini list */}
          <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
            {property.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                <span className="truncate">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sand-100 hover:bg-sand-200 text-ocean-950 font-semibold text-xs transition-colors"
          >
            <span>Ver Fotos & Info</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/59894422598?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center p-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white transition-colors shadow-sm"
            title="Consultar por WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
