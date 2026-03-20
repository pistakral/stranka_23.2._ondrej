import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Check, HelpCircle, Gift, ZoomIn } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import Navbar from '../Navbar';
import GradeInfoModal from './GradeInfoModal';
import ImageLightbox from './ImageLightbox';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', id)
        .eq('is_active', true)
        .single();
      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Produkt nenájdený</h1>
            <button onClick={() => navigate('/store')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
              Späť na obchod
            </button>
          </div>
        </div>
      </>
    );
  }

  const displayImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.main_image];

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      capacity: product.capacity,
      color: product.color,
      price: product.price,
      images: product.images || [product.main_image],
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextCarousel = () =>
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  const prevCarousel = () =>
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);

  return (
    <>
      <Helmet>
        <title>
          {product.meta_title || `${product.name} ${product.capacity} ${product.color} | Fixanto`}
        </title>
        <meta
          name="description"
          content={
            product.meta_description ||
            product.description?.substring(0, 155) ||
            `${product.name} ${product.capacity} ${product.color} - Prémiový iPhone`
          }
        />
      </Helmet>

      <Navbar />
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-50">
        {/* max-w-2xl na mobile aby sa obsah nestlačil, 7xl na desktop */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate('/store')}
            className="mb-4 sm:mb-6 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            Späť na obchod
          </button>

          {/* Na mobile: stĺpec, na lg: 2 stĺpce vedľa seba */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 mb-8 sm:mb-12 gap-5">

            {/* ── Carousel ── */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div
                  className="relative bg-gray-50 group cursor-zoom-in"
                  style={{ aspectRatio: '1 / 1' }}
                  onClick={() => openLightbox(currentImageIndex)}
                >
                  <img
                    key={displayImages[currentImageIndex]}
                    src={displayImages[currentImageIndex]}
                    alt={`${product.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-4 sm:p-8 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23e5e7eb"/%3E%3C/svg%3E';
                    }}
                  />

                  {/* Počítadlo */}
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full select-none">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>

                  {/* Zoom hint — skrytý */}

                  {/* Šípky */}
                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevCarousel(); }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
                        aria-label="Predchádzajúca"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextCarousel(); }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
                        aria-label="Ďalšia"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {displayImages.map((src: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-600 shadow-lg shadow-blue-200'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`náhľad ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50 p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3C/svg%3E';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info panel ── */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">

                {/* Trieda + "Čo je trieda?" — vždy na jednom riadku, wrap ak treba */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="bg-yellow-400 text-blue-900 px-3 py-1.5 rounded-lg font-bold text-sm whitespace-nowrap">
                    TRIEDA {product.grade}
                  </span>
                  <button
                    onClick={() => setShowGradeModal(true)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    aria-label="Čo znamená trieda?"
                  >
                    <HelpCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Čo znamená táto trieda?</span>
                  </button>
                </div>

                {/* Darček banner — bez hover scale na mobile (spôsobuje overflow) */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 shadow-lg sm:hover:scale-105 sm:hover:shadow-xl transition-transform duration-200 cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 sm:p-2.5 rounded-xl flex-shrink-0">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-green-900 text-sm sm:text-lg leading-tight">DARČEK ZADARMO! 🎁</p>
                      <p className="text-xs sm:text-sm text-green-700 mt-0.5">
                        Ochranný kryt a nabíjací kábel v hodnote{' '}
                        <span className="font-black text-green-900">€10</span> k telefónu
                      </p>
                      <p className="text-xs text-green-600 mt-1 opacity-75">
                        * Príslušenstvo je plne kompatibilné, nemusí ísť o originálne príslušenstvo Apple.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Názov */}
                <h1 className="text-lg sm:text-3xl font-black text-gray-900 mb-1 leading-tight">
                  {product.name} ({product.capacity})
                </h1>
                <p className="text-sm sm:text-xl text-gray-600 mb-3 sm:mb-6">{product.color}</p>

                {/* Cena */}
                <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1 sm:mb-2">
                  €{product.price}
                </div>
                <p className="text-xs text-gray-400 mb-4 sm:mb-8">(Predajca nie je platca DPH)</p>

                {/* Vlastnosti */}
                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                  {[
                    { label: `Trieda: ${product.grade}`, suffix: '✅' },
                    { label: `Batéria: ${product.condition_battery_percent}%`, suffix: '⚡' },
                    { label: `Záruka: ${product.warranty}`, suffix: '🛡️' },
                    { label: `Skladom: ${product.stock} ks`, suffix: '📦' },
                  ].map(({ label, suffix }) => (
                    <div key={label} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base leading-snug">
                        {label} {suffix}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tlačidlo */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl font-black text-base sm:text-lg shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all sm:hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
                >
                  🛒 PRIDAŤ DO KOŠÍKA
                </button>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
                  Doprava zadarmo
                </p>
              </div>
            </div>
          </div>

          {/* Stav zariadenia */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-5 sm:mb-8">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Stav zariadenia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: 'Vzhľad', value: product.condition_appearance },
                { label: 'Displej', value: product.condition_display },
                { label: 'Funkčnosť', value: product.condition_functionality },
                { label: 'Batéria', value: `${product.condition_battery_percent}%` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 className="text-sm sm:text-lg font-bold text-blue-600 mb-1 sm:mb-2">{label}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technické špecifikácie */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Technické špecifikácie
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700 w-1/2 capitalize text-xs sm:text-base pr-2">{key}:</span>
                    <span className="text-gray-600 w-1/2 text-xs sm:text-base">{String(value)}</span>
                  </div>
                ))}
                {product.serial_number && (
                  <div className="flex border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700 w-1/2 text-xs sm:text-base">Sériové číslo:</span>
                    <span className="text-gray-600 w-1/2 text-xs sm:text-base">{product.serial_number}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-5 leading-relaxed">
                Predávané ako použitý/repasovaný tovar skontrolovaný v servise Fixanto (§ 612 ods. 4 OZ). Zdravie batérie platí v čase predaja — prirodzené znižovanie kapacity nie je vada. Záruka 12 mesiacov (skrátená dohodou). Možnosť vrátenia do 14 dní platí pre online nákup.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {showNotification && (
        <div className="fixed top-20 sm:top-24 right-3 sm:right-4 bg-green-600 text-white px-4 py-3 rounded-xl shadow-2xl z-50 max-w-[calc(100vw-24px)]">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold text-sm">Pridané do košíka!</span>
          </div>
        </div>
      )}

      <GradeInfoModal isOpen={showGradeModal} onClose={() => setShowGradeModal(false)} />

      {lightboxOpen && (
        <ImageLightbox
          images={displayImages}
          currentIndex={lightboxIndex}
          productName={product.name}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}