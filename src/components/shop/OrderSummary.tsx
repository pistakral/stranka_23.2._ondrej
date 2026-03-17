import { Zap } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  capacity: string;
  color: string;
  price: number;
  images?: string[];
}

interface OrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
  discountApplied: boolean;
  discountCode: string;
  discountPercent: number;
  discountAmount: number;
  adapterAdded: boolean;
  adapterPrice: number;
  finalTotal: number;
}

export default function OrderSummary({
  cart,
  totalPrice,
  discountApplied,
  discountCode,
  discountPercent,
  discountAmount,
  adapterAdded,
  adapterPrice,
  finalTotal,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Zhrnutie</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.images?.[0] || ''}
              alt={item.name}
              className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.capacity} • {item.color}
              </p>
            </div>
            <div className="font-bold text-blue-600">€{item.price}</div>
          </div>
        ))}

        {/* Adapter v zhrnutí */}
        {adapterAdded && (
          <div className="flex gap-4 bg-orange-50 rounded-xl p-3 border border-orange-200">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-lg flex-shrink-0">
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Nabíjací adaptér 20W</h3>
              <p className="text-sm text-gray-600">Apple USB-C Power Adapter</p>
            </div>
            <div className="font-bold text-orange-600">€{adapterPrice}</div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Medzisúčet:</span>
          <span className="font-semibold">€{totalPrice.toFixed(2)}</span>
        </div>

        {adapterAdded && (
          <div className="flex justify-between text-orange-600">
            <span>Nabíjací adaptér 20W:</span>
            <span className="font-bold">+€{adapterPrice.toFixed(2)}</span>
          </div>
        )}

        {discountApplied && (
          <div className="flex justify-between text-green-600">
            <span>
              Zľava ({discountCode} -{discountPercent}%):
            </span>
            <span className="font-bold">-€{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-green-600">
          <span>Doprava:</span>
          <span className="font-bold">ZADARMO ✅</span>
        </div>

        <div className="flex justify-between text-2xl font-black text-blue-600 pt-3 border-t border-gray-200">
          <span>Celkom:</span>
          <span>€{finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}