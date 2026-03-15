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

  // Kontrola skladových zásob pri otvorení košíka
  useEffect(() => {
    if (isOpen && cart.length > 0) {
      checkStock();
    }
  }, [isOpen, cart]);

  const checkStock = async () => {
    setChecking(true);
    const warnings: Record<string, string> = {};

    for (const item of cart) {
      // Načítaj aktuálny stav produktu z Supabase
      const { data: product } = await supabase
        .from('products')
        .select('stock, stock_status')
        .eq('slug', item.id)
        .single();

      if (product) {
        // Kontrola, či je produkt rezervovaný alebo vypredaný
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
    // Skontroluj, či niektorý produkt nemá problém so skladom
    const hasStockIssues = Object.keys(stockWarnings).length > 0;
    
    if (hasStockIssues) {
      alert('Niektoré produkty v košíku sú nedostupné. Odstráňte ich pred pokračovaním.');
      return;
    }

    onClose();
    navigate('/store/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Cart Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Košík</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
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
              {/* Stock checking indicator */}
              {checking && (
                <div className="mb-4 text-center text-sm text-gray-500">
                  Kontrolujem dostupnosť...
                </div>
              )}

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const hasWarning = stockWarnings[item.id];
                  
                  return (
                    <div
                      key={item.id}
                      className={`flex gap-4 p-4 rounded-xl ${
                        hasWarning ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'
                      }`}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg bg-white"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23e5e7eb"/%3E%3C/svg%3E';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {item.name} ({item.capacity})
                        </h3>
                        <p className="text-sm text-gray-600">{item.color}</p>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          €{item.price}
                        </p>
                        
                        {/* Stock warning */}
                        {hasWarning && (
                          <p className="text-xs text-red-600 font-semibold mt-2">
                            ⚠️ {hasWarning}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 self-start"
                        aria-label="Odstrániť"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Medzisúčet:</span>
                  <span className="text-xl font-bold">€{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Doprava a platba budú vypočítané pri objednávke
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={Object.keys(stockWarnings).length > 0}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700"
              >
                Pokračovať na doručenie
              </button>

              {Object.keys(stockWarnings).length > 0 && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  Odstráňte nedostupné produkty pred pokračovaním
                </p>
              )}

              <button
                onClick={onClose}
                className="w-full mt-3 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Pokračovať v nákupe
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}