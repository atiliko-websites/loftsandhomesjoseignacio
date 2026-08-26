import React from 'react';
import { Leaf, ShieldCheck, MapPin, Waves, Sun, Sparkles } from 'lucide-react';

export default function ConceptSection() {
  const pillars = [
    {
      icon: Leaf,
      title: 'Arquitectura Sustentable',
      description: 'Estructuras en contenedores marítimos reciclados y maderas nobles tratadas, en armonía absoluta con la flora autóctona.'
    },
    {
      icon: MapPin,
      title: 'La Juanita & José Ignacio',
      description: 'Ubicación inmejorable: a metros del mar, la boca de la laguna y los polos gastronómicos más reconocidos de la región.'
    },
    {
      icon: Sun,
      title: 'Confort & Decks Privados',
      description: 'Espacios de 50m² a 80m² con decks exteriores, aire acondicionado frío/calor, WiFi de alta velocidad y cocinas integradas.'
    },
    {
      icon: ShieldCheck,
      title: 'Trato Directo con su Dueña',
      description: 'Atención cálida, personalizada y sin comisiones de plataformas intermediarias. Asesoramiento local para tu estadía.'
    }
  ];

  return (
    <section id="concepto" className="py-16 sm:py-20 bg-[#F4EFE6] border-y border-sand-200 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta-600 mb-3 block">
            Nuestra Filosofía
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950 mb-6 leading-tight">
            El encuentro entre el diseño moderno y la naturaleza virgen
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Nuestros lofts y casas nacieron de una visión ecológica: crear un turismo consciente donde la arquitectura de vanguardia conviva con el silencio del bosque y la brisa del Atlántico.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-sand-200/80 shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center text-terracotta-500 mb-6 group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-ocean-950 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
