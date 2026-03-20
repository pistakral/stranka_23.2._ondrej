import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [stockWarnings, setStockWarnings] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (isOpen && cart.length > 0) {
      checkStock();
    }
  }, [isOpen, cart]);

  const checkStock = async () => {
    setChecking(true);
    const warnings: Record<string, string> = {};
    for (const item of cart) {
      const { data: product } = await supabase
        .from('products')
        .select('stock, stock_status')
        .eq('slug', item.id)
        .single();
      if (product) {
        if (product.stock_status === 'reserved') {
          warnings[item.id] = 'Tento produkt je momentálne rezervovaný';
        } else if (product.stock_status === 'sold_out' || product.stock === 0) {
          warnings[item.id] = 'Tento produkt je vypredaný';
        }
      }
    }
    setStockWarnings(warnings);
    setChecking(false);
  };

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (Object.keys(stockWarnings).length > 0) {
      alert('Niektoré produkty v košíku sú nedostupné. Odstráňte ich pred pokračovaním.');
      return;
    }
    onClose();
    navigate('/eshop/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Cart Modal — full screen on mobile, max-md on desktop */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex flex-col h-full">
          {/* Header — fixed */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Košík</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Váš košík je prázdny</p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Pokračovať v nákupe
                </button>
              </div>
            ) : (
              <>
                {checking && (
                  <div className="mb-4 text-center text-sm text-gray-500">
                    Kontrolujem dostupnosť...
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {cart.map((item) => {
                    const hasWarning = stockWarnings[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`flex gap-3 p-3 rounded-xl ${
                          hasWarning ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'
                        }`}
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-lg bg-white flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23e5e7eb"/%3E%3C/svg%3E';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm leading-snug">
                            {item.name} ({item.capacity})
                          </h3>
                          <p className="text-xs text-gray-600 mt-0.5">{item.color}</p>
                          <p className="text-base font-bold text-blue-600 mt-1">
                            €{item.price}
                          </p>
                          {hasWarning && (
                            <p className="text-xs text-red-600 font-semibold mt-1">
                              ⚠️ {hasWarning}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1.5 self-start flex-shrink-0"
                          aria-label="Odstrániť"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium">Medzisúčet:</span>
                    <span className="text-xl font-bold">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Doprava a platba budú vypočítané pri objednávke
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer buttons — fixed at bottom */}
          {cart.length > 0 && (
            <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-100 space-y-2 bg-white">
              <button
                onClick={handleCheckout}
                disabled={Object.keys(stockWarnings).length > 0}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-base shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pokračovať na doručenie
              </button>

              {Object.keys(stockWarnings).length > 0 && (
                <p className="text-sm text-red-600 text-center">
                  Odstráňte nedostupné produkty pred pokračovaním
                </p>
              )}

              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm"
              >
                Pokračovať v nákupe
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}