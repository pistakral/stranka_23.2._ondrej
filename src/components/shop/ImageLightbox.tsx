import { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  productName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  productName,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const prev = () =>
    onNavigate((currentIndex - 1 + images.length) % images.length);
  const next = () =>
    onNavigate((currentIndex + 1) % images.length);

  // Klávesové skratky
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    },
    [currentIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Zatvoriť */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Zavrieť"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Počítadlo */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Hlavný obrázok — maximálna kvalita */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: '100vw', height: '100vh', padding: '60px 80px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={`lb-${currentIndex}`}
          src={images[currentIndex]}
          alt={`${productName} ${currentIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            imageRendering: 'high-quality',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23222"/%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Šípky */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
            aria-label="Predchádzajúca"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
            aria-label="Ďalšia"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-3 bg-black/60 backdrop-blur-sm rounded-2xl overflow-x-auto max-w-[92vw]"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white scale-110 shadow-lg shadow-white/20'
                  : 'border-white/25 opacity-55 hover:opacity-90 hover:scale-105'
              }`}
            >
              <img
                src={src}
                alt={`náhľad ${index + 1}`}
                className="w-full h-full object-contain bg-gray-900 p-0.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <div className="absolute bottom-5 right-5 text-white/25 text-xs hidden md:block select-none">
        ← → navigácia &nbsp;·&nbsp; ESC zavrieť
      </div>
    </div>
  );
}