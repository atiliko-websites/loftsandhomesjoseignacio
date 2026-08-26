import React, { useState } from 'react';
import { Calendar, Users, Home, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/properties';

export default function Hero({ onSearch }) {
  const [category, setCategory] = useState('Todos');
  const [guests, setGuests] = useState('2');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ category, guests: Number(guests), checkIn, checkOut });
    }
    const element = document.getElementById('alojamientos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden w-full max-w-full">
      {/* Background Image with warm coastal overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/properties/beach-design-two/beach-design-two_01.jpg"
          alt="José Ignacio Costa"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/80 via-ocean-950/60 to-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white mt-6 sm:mt-8 w-full">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sand-200 text-xs sm:text-sm font-medium mb-4 sm:mb-6 tracking-wide shadow-sm max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
          <span className="truncate">La Juanita & José Ignacio • Alquileres Exclusivos</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
          El refugio perfecto entre <br className="hidden sm:block" />
          <span className="italic font-normal text-sand-200">la laguna, el bosque y el mar</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-sand-100 font-light leading-relaxed mb-8 sm:mb-10 px-2">
          Lofts en contenedores de diseño ecológico, casas de madera noble y refugios costeros creados para conectar con la naturaleza de José Ignacio.
        </p>

        {/* Interactive Booking / Filter Bar */}
        <form 
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3 text-slate-800 border border-white/40 w-full"
        >
          {/* Category Selector */}
          <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:border-r border-slate-200 bg-sand-50/60 sm:bg-transparent rounded-xl sm:rounded-none">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500 shrink-0" />
            <div className="text-left w-full min-w-0">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Tipo de Espacio</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="text-slate-800">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Guests Selector */}
          <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:border-r border-slate-200 bg-sand-50/60 sm:bg-transparent rounded-xl sm:rounded-none">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500 shrink-0" />
            <div className="text-left w-full min-w-0">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Huéspedes</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="1">1 Huésped</option>
                <option value="2">2 Huéspedes</option>
                <option value="3">3 Huéspedes</option>
                <option value="4">4 Huéspedes</option>
                <option value="5">5 Huéspedes</option>
              </select>
            </div>
          </div>

          {/* Dates or Range preview */}
          <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-sand-50/60 sm:bg-transparent rounded-xl sm:rounded-none">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500 shrink-0" />
            <div className="text-left w-full min-w-0">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Temporada</label>
              <span className="block text-xs sm:text-sm font-semibold text-slate-800 truncate">Verano / Todo el año</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <span>Explorar Alojamientos</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </form>

        {/* Quick features counter */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6 border-t border-white/15 text-sand-100 text-xs sm:text-sm w-full">
          <div className="p-2">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">13</span>
            <span className="text-sand-300 font-light text-[11px] sm:text-xs">Alojamientos Exclusivos</span>
          </div>
          <div className="p-2">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">100%</span>
            <span className="text-sand-300 font-light text-[11px] sm:text-xs">Diseño Sustentable</span>
          </div>
          <div className="p-2">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">400m</span>
            <span className="text-sand-300 font-light text-[11px] sm:text-xs">Del Mar y La Laguna</span>
          </div>
          <div className="p-2">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">Directo</span>
            <span className="text-sand-300 font-light text-[11px] sm:text-xs">Sin intermediarios</span>
          </div>
        </div>

      </div>
    </section>
  );
}
