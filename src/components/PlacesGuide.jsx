import React, { useState } from 'react';
import { PLACES } from '../data/places';
import { MapPin, Utensils, Waves, Sun, Sparkles, ExternalLink } from 'lucide-react';

export default function PlacesGuide() {
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);

  return (
    <section id="el-lugar" className="py-16 sm:py-24 bg-ocean-950 text-white relative overflow-hidden w-full max-w-full">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta-400 mb-3 block">
            Guía de Experiencias
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            El Lugar: La Magia de José Ignacio & La Juanita
          </h2>
          <p className="text-sand-200 text-sm sm:text-base font-light leading-relaxed">
            Conocido como el "Saint-Tropez de América del Sur", José Ignacio conserva su esencia de pueblo de pescadores con un sofisticado encanto bohemio chic. Playas vírgenes, gastronomía de culto internacional y atardeceres sobre la laguna.
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACES.map((place) => (
            <div
              key={place.id}
              className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-terracotta-400/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-sand-200">
                    {place.category}
                  </span>
                </div>

                {/* Text body */}
                <div className="p-6">
                  <span className="text-[11px] text-terracotta-400 font-semibold uppercase tracking-wider block mb-1">
                    {place.highlight}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-sand-200 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-sand-200/80 text-xs sm:text-sm font-light leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-sand-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>José Ignacio • Uruguay</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Recommendation Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-terracotta-900/60 to-ocean-900/60 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-white">
              ¿Querés recomendaciones personalizadas para tu estadía?
            </h4>
            <p className="text-sand-200 text-sm font-light">
              Al hospedarte en Lofts & Homes, Ale te comparte su guía secreta de mesas reservadas, alquiler de tablas de surf y paseos únicos.
            </p>
          </div>
          <a
            href="https://wa.me/59894422598?text=Hola%20Ale!%20Quiero%20conocer%20m%C3%A1s%20sobre%20los%20alojamientos%20y%20el%20lugar%20en%20Jos%C3%A9%20Ignacio."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md"
          >
            Hablar con la dueña
          </a>
        </div>

      </div>
    </section>
  );
}
