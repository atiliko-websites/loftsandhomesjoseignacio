import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Compass, Home, MessageSquare, MapPin } from 'lucide-react';

export default function Navbar({ onSelectCategory, onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-soft py-3 border-b border-sand-200/50' 
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="group flex flex-col tracking-wider"
        >
          <span className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] transition-colors ${
            isScrolled ? 'text-ocean-950 group-hover:text-terracotta-600' : 'text-white group-hover:text-sand-200'
          }`}>
            LOFTS & HOMES
          </span>
          <span className={`text-[10px] tracking-[0.3em] uppercase -mt-1 font-semibold ${
            isScrolled ? 'text-terracotta-600' : 'text-sand-300'
          }`}>
            José Ignacio • Uruguay
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollTo('alojamientos')}
            className={`text-sm font-medium transition-colors hover:text-terracotta-500 ${
              isScrolled ? 'text-slate-700' : 'text-white/90'
            }`}
          >
            Alojamientos
          </button>

          <button 
            onClick={() => scrollTo('concepto')}
            className={`text-sm font-medium transition-colors hover:text-terracotta-500 ${
              isScrolled ? 'text-slate-700' : 'text-white/90'
            }`}
          >
            Concepto
          </button>

          <button 
            onClick={() => scrollTo('el-lugar')}
            className={`text-sm font-medium transition-colors hover:text-terracotta-500 ${
              isScrolled ? 'text-slate-700' : 'text-white/90'
            }`}
          >
            El Lugar
          </button>

          <button 
            onClick={() => scrollTo('contacto')}
            className={`text-sm font-medium transition-colors hover:text-terracotta-500 ${
              isScrolled ? 'text-slate-700' : 'text-white/90'
            }`}
          >
            Contacto & Reservas
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/59894422598?text=Hola!%20Quisiera%20consultar%20disponibilidad%20para%20los%20alojamientos%20en%20Jos%C3%A9%20Ignacio."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Consultar (+598) 94 422 598</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-800 hover:bg-sand-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-sand-200 px-6 py-6 space-y-4 animate-fadeIn text-slate-800 shadow-xl">
          <button
            onClick={() => scrollTo('alojamientos')}
            className="flex items-center gap-3 w-full py-2 text-left font-medium text-slate-800 hover:text-terracotta-600"
          >
            <Home className="w-5 h-5 text-terracotta-500" />
            <span>Nuestras Propiedades</span>
          </button>
          
          <button
            onClick={() => scrollTo('concepto')}
            className="flex items-center gap-3 w-full py-2 text-left font-medium text-slate-800 hover:text-terracotta-600"
          >
            <Compass className="w-5 h-5 text-ocean-600" />
            <span>Concepto Sustentable</span>
          </button>

          <button
            onClick={() => scrollTo('el-lugar')}
            className="flex items-center gap-3 w-full py-2 text-left font-medium text-slate-800 hover:text-terracotta-600"
          >
            <MapPin className="w-5 h-5 text-forest-600" />
            <span>El Lugar (Guía José Ignacio)</span>
          </button>

          <button
            onClick={() => scrollTo('contacto')}
            className="flex items-center gap-3 w-full py-2 text-left font-medium text-slate-800 hover:text-terracotta-600"
          >
            <MessageSquare className="w-5 h-5 text-terracotta-500" />
            <span>Contacto y Reservas</span>
          </button>

          <div className="pt-4 border-t border-sand-200">
            <a
              href="https://wa.me/59894422598?text=Hola!%20Quisiera%20consultar%20disponibilidad%20para%20los%20alojamientos%20en%20Jos%C3%A9%20Ignacio."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-terracotta-500 text-white font-semibold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp (+598) 94 422 598</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
