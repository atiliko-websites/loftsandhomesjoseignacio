import React, { useState } from 'react';
import { PROPERTIES, CATEGORIES } from '../data/properties';
import PropertyCard from './PropertyCard';
import { Filter, Users, Sparkles, RefreshCw } from 'lucide-react';

export default function PropertyCatalog({ activeFilter, onSelectProperty }) {
  const [selectedCategory, setSelectedCategory] = useState(activeFilter?.category || 'Todos');
  const [selectedGuests, setSelectedGuests] = useState(activeFilter?.guests || 0);

  // Sync with hero filter if changed
  React.useEffect(() => {
    if (activeFilter?.category) {
      setSelectedCategory(activeFilter.category);
    }
    if (activeFilter?.guests) {
      setSelectedGuests(activeFilter.guests);
    }
  }, [activeFilter]);

  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesGuests = selectedGuests === 0 || p.guests >= selectedGuests;
    return matchesCategory && matchesGuests;
  });

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setSelectedGuests(0);
  };

  return (
    <section id="alojamientos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-terracotta-600 mb-2 block">
            Catálogo Exclusivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-950">
            Nuestros Alojamientos
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light mt-2 max-w-xl">
            Cada espacio ha sido diseñado con maderas nobles, ventanales luminosos y decks privados para vivir José Ignacio a tu propio ritmo.
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-2 self-start md:self-end px-4 py-2 rounded-full bg-sand-100 border border-sand-200 text-slate-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
          <span>Mostrando {filteredProperties.length} de {PROPERTIES.length} propiedades</span>
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-sand-200 shadow-soft mb-12 space-y-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-ocean-950 text-white shadow-sm'
                  : 'bg-sand-50 hover:bg-sand-100 text-slate-600 border border-sand-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subfilters: Guests & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sand-100 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Users className="w-4 h-4 text-terracotta-500" />
              <span>Capacidad:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {[0, 2, 4, 5].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGuests(g)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedGuests === g
                      ? 'bg-terracotta-500 text-white'
                      : 'bg-sand-100 text-slate-700 hover:bg-sand-200'
                  }`}
                >
                  {g === 0 ? 'Cualquiera' : `${g}+ personas`}
                </button>
              ))}
            </div>
          </div>

          {(selectedCategory !== 'Todos' || selectedGuests !== 0) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-terracotta-600 hover:text-terracotta-700 font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          )}
        </div>

      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-sand-50 rounded-3xl p-12 text-center border border-dashed border-sand-300">
          <p className="text-slate-600 font-serif text-lg mb-4">
            No se encontraron alojamientos con los filtros seleccionados.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-ocean-950 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Ver todos los alojamientos
          </button>
        </div>
      )}

    </section>
  );
}
