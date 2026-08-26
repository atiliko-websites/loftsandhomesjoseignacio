import React from 'react';
import { Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';
import { PROPERTIES } from '../data/properties';

export default function Footer({ onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ocean-950 text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                LOFTS & HOMES
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-terracotta-400 font-semibold">
                José Ignacio • Uruguay
              </span>
            </div>

            <p className="text-sand-200/80 text-sm font-light leading-relaxed max-w-md">
              Colección exclusiva de lofts y casas de madera y diseño sustentable en La Juanita, José Ignacio. Tu refugio privado a pasos de la laguna, el bosque y el océano Atlántico.
            </p>

            <div className="pt-2 text-xs text-sand-300">
              Atención personalizada por Ale Dellepiane.
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-sand-200/70 font-light">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-terracotta-400 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('alojamientos')} className="hover:text-terracotta-400 transition-colors">
                  Alojamientos
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('concepto')} className="hover:text-terracotta-400 transition-colors">
                  Concepto Sustentable
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('el-lugar')} className="hover:text-terracotta-400 transition-colors">
                  El Lugar (Guía)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contacto')} className="hover:text-terracotta-400 transition-colors">
                  Contacto Directo
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Properties (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              Alojamientos
            </h4>
            <ul className="space-y-2 text-sm text-sand-200/70 font-light">
              {PROPERTIES.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button 
                    onClick={() => scrollTo('alojamientos')}
                    className="hover:text-terracotta-400 transition-colors text-left"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              Ubicación & Contacto
            </h4>
            <div className="space-y-2.5 text-xs text-sand-200/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>La Juanita, José Ignacio, Maldonado, Uruguay</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <span>(+598) 94 422 598</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <span>aledellepiane7@hotmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-300/60 gap-4">
          <div>
            © {new Date().getFullYear()} Lofts & Homes José Ignacio. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-2">
            <span>Hecho para José Ignacio con dedicación</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-sand-200 hover:text-terracotta-400 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
