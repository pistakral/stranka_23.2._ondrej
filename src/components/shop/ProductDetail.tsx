import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import productsData from '../../data/products.json';
import Navbar from '../Navbar';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const product = productsData.products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      id: product.id,
      name: product.name,
      capacity: product.capacity,
      color: product.color,
      price: product.price,
      images: product.images,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
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
                <div className="relative aspect-square">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%239ca3af"%3EPlaceholder Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail dots */}
              {product.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                      }`}
                    />
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
                    <span className="text-lg">Batéria: {product.condition.battery} ⚡</span>
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
                <p className="text-gray-700">{product.condition.appearance}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Displej</h3>
                <p className="text-gray-700">{product.condition.display}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Funkčnosť</h3>
                <p className="text-gray-700">{product.condition.functionality}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">Batéria</h3>
                <p className="text-gray-700">{product.condition.battery}</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technické špecifikácie</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-700 w-1/2">{key}:</span>
                  <span className="text-gray-600 w-1/2">{value}</span>
                </div>
              ))}
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-1/2">Sériové číslo:</span>
                <span className="text-gray-600 w-1/2">{product.serialNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in-right">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6" />
            <span className="font-bold">Pridané do košíka!</span>
          </div>
        </div>
      )}
    </>
  );
}