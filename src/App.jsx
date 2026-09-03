import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConceptSection from './components/ConceptSection';
import VideoReelsSection from './components/VideoReelsSection';
import PropertyCatalog from './components/PropertyCatalog';
import PropertyDetailModal from './components/PropertyDetailModal';
import PlacesGuide from './components/PlacesGuide';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

export default function App() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleHeroSearch = (filterData) => {
    setActiveFilter(filterData);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-terracotta-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Quick Availability Bar */}
      <Hero onSearch={handleHeroSearch} />

      {/* Sustainable Concept & Pillars */}
      <ConceptSection />

      {/* Video Walkthroughs / Reels Section */}
      <VideoReelsSection 
        onSelectProperty={(property) => setSelectedProperty(property)} 
      />

      {/* Property Catalog & Filters */}
      <PropertyCatalog 
        activeFilter={activeFilter}
        onSelectProperty={(property) => setSelectedProperty(property)}
      />

      {/* "El Lugar" - José Ignacio Destination & Gastronomy Guide */}
      <PlacesGuide />

      {/* Contact & WhatsApp Inquiry Center */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Property Lightbox & Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
