import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { VIDEO_TOURS, PROPERTIES } from '../data/properties';

export default function VideoReelsSection({ onSelectProperty }) {
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const carouselRef = useRef(null);
  const videoRef = useRef(null);

  const activeReel = activeReelIndex !== null ? VIDEO_TOURS[activeReelIndex] : null;

  // Handle keyboard navigation for the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNextReel();
      if (e.key === 'ArrowLeft') handlePrevReel();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, isPlaying]);

  // Lock body scroll when reel modal is open
  useEffect(() => {
    if (activeReelIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeReelIndex]);

  // Auto-play when active reel changes
  useEffect(() => {
    if (videoRef.current && activeReelIndex !== null) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeReelIndex]);

  const handleOpenReel = (index) => {
    setActiveReelIndex(index);
    setProgress(0);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveReelIndex(null);
    setIsPlaying(false);
  };

  const handleNextReel = () => {
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => (prev === VIDEO_TOURS.length - 1 ? 0 : prev + 1));
  };

  const handlePrevReel = () => {
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => (prev === 0 ? VIDEO_TOURS.length - 1 : prev - 1));
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const offset = direction === 'left' ? -340 : 340;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleGoToProperty = (propertyId) => {
    handleCloseModal();
    const prop = PROPERTIES.find((p) => p.id === propertyId);
    if (prop && onSelectProperty) {
      onSelectProperty(prop);
    } else {
      const el = document.getElementById('alojamientos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="recorridos" className="py-16 sm:py-24 bg-ocean-950 text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-terracotta-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-forest-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sand-200 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
              Experiencia en Primera Persona
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Recorré los Lofts & Casas en Video
            </h2>
            <p className="text-sand-200/80 text-sm sm:text-base mt-2 font-light max-w-xl">
              Caminá por los ambientes, apreciá la calidez de la madera y sentí la atmósfera de cada espacio a través de recorridos grabados por su dueña.
            </p>
          </div>

          {/* Carousel Arrows (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Anterior reel"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Siguiente reel"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Reels Horizontal Scroll Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {VIDEO_TOURS.map((reel, index) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(index)}
              className="group relative flex-none w-64 sm:w-72 aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer snap-start bg-ocean-900 border border-white/15 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-terracotta-400/80"
            >
              {/* Poster Image */}
              <img
                src={reel.poster}
                alt={reel.propertyName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 group-hover:via-black/20 transition-colors" />

              {/* Top Badge: Category & Duration */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-ocean-950/70 backdrop-blur-md border border-white/15 text-white text-[10px] uppercase tracking-wider font-semibold">
                  {reel.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-sand-200 text-[11px] font-mono">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-terracotta-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-terracotta-500 transition-all duration-300">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-sand-100 transition-colors">
                  {reel.propertyName}
                </h3>
                <p className="text-sand-300 text-xs font-light line-clamp-1 mt-0.5">
                  {reel.tagline}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-sand-200 font-medium">
                  <span>Ver recorrido</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen / Modal Reel Player */}
      {activeReel && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={handleCloseModal}
        >
          {/* Main Reel Card Container */}
          <div 
            className="relative w-full max-w-sm sm:max-w-md h-[88vh] max-h-[820px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Reel Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div 
                className="h-full bg-terracotta-500 transition-all duration-100" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            {/* Top Floating Controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 text-white">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sand-300 block">
                  {activeReel.category}
                </span>
                <h4 className="font-serif text-base font-bold text-white truncate drop-shadow-md">
                  {activeReel.propertyName}
                </h4>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCloseModal}
                  aria-label="Cerrar reproductor"
                  className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Element */}
            <div 
              className="relative w-full h-full flex items-center justify-center cursor-pointer select-none bg-black"
              onClick={togglePlayPause}
            >
              <video
                ref={videoRef}
                src={activeReel.videoSrc}
                poster={activeReel.poster}
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              />

              {/* Center Play/Pause Indicator when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-terracotta-600/90 text-white flex items-center justify-center shadow-xl">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Next / Prev Floating Arrows (desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevReel(); }}
              aria-label="Video anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center z-20 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNextReel(); }}
              aria-label="Video siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center z-20 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Actions Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 space-y-2.5">
              <p className="text-sand-200 text-xs font-light line-clamp-1">
                {activeReel.tagline}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {/* View Details button */}
                <button
                  onClick={() => handleGoToProperty(activeReel.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ver Ficha
                </button>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/59894422598?text=${encodeURIComponent(
                    `¡Hola Ale! Vi el video tour de *${activeReel.propertyName}* y quisiera consultar disponibilidad.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Consultar
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
