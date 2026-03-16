import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import Navbar from '../Navbar';

export default function ProductDetail() {
  const { id } = useParams(); // id = slug
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Fetch produkt z Supabase
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

  // Loading state
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

  // Product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Produkt nenájdený</h1>
            <button
              onClick={() => navigate('/store')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Späť na obchod
            </button>
          </div>
        </div>
      </>
    );
  }

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Použiť images array alebo fallback na main_image
  const displayImages = (product.images && product.images.length > 0) 
    ? product.images 
    : [product.main_image];

  return (
    <>
      <Helmet>
        <title>
          {product.meta_title || `${product.name} ${product.capacity} ${product.color} | Fixanto`}
        </title>
        <meta 
          name="description" 
          content={product.meta_description || product.description?.substring(0, 155) || `${product.name} ${product.capacity} ${product.color} - Prémiový iPhone`}
        />
      </Helmet>

      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/store')}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Späť na obchod
          </button>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* LEFT: Image Carousel */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative aspect-square bg-gray-50">
                  <img
                    key={displayImages[currentImageIndex]}
                    src={displayImages[currentImageIndex]}
                    alt={`${product.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-8 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%239ca3af"%3EPlaceholder%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* Počítadlo fotografií */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>

                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {displayImages.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                        index === currentImageIndex
                          ? 'border-blue-600 shadow-lg shadow-blue-200'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} náhľad ${index + 1}`}
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

            {/* RIGHT: Product Info */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold text-sm mb-4">
                  TRIEDA {product.grade}
                </div>

                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  {product.name} ({product.capacity})
                </h1>
                <p className="text-2xl text-gray-600 mb-6">{product.color}</p>

                <div className="text-5xl font-black text-blue-600 mb-8">
                  €{product.price}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-lg">Trieda: {product.grade} ✅</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-lg">Batéria: {product.condition_battery_percent}% ⚡</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-lg">Záruka: {product.warranty} 🛡️</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="text-lg">Skladom: {product.stock} ks 📦</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-xl font-black text-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  🛒 PRIDAŤ DO KOŠÍKA
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Doprava zadarmo nad 500€
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Stav zariadenia</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Vzhľad</h3>
                <p className="text-gray-700">{product.condition_appearance}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Displej</h3>
                <p className="text-gray-700">{product.condition_display}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Funkčnosť</h3>
                <p className="text-gray-700">{product.condition_functionality}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Batéria</h3>
                <p className="text-gray-700">{product.condition_battery_percent}% - Výborný stav</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technické špecifikácie</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700 w-1/2 capitalize">{key}:</span>
                    <span className="text-gray-600 w-1/2">{String(value)}</span>
                  </div>
                ))}
                {product.serial_number && (
                  <div className="flex border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700 w-1/2">Sériové číslo:</span>
                    <span className="text-gray-600 w-1/2">{product.serial_number}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6" />
            <span className="font-bold">Pridané do košíka!</span>
          </div>
        </div>
      )}
    </>
  );
}