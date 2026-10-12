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
  cart, totalPrice, discountApplied, discountCode, discountPercent,
  discountAmount, adapterAdded, adapterPrice, finalTotal,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5 lg:sticky lg:top-24 text-sm">
      <h2 className="text-base font-bold text-gray-900 mb-3 sm:mb-4">Zhrnutie</h2>

      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <img
              src={item.images?.[0] || ''}
              alt={item.name}
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain bg-gray-50 rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 leading-snug text-xs sm:text-sm">{item.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.capacity} • {item.color}</p>
            </div>
            <div className="font-bold text-blue-600 flex-shrink-0 text-sm">€{item.price}</div>
          </div>
        ))}

        {adapterAdded && (
          <div className="flex gap-3 items-center bg-orange-50 rounded-xl px-3 py-2 border border-orange-200">
            <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-100 rounded-lg flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 leading-snug text-xs sm:text-sm">Nabíjací adaptér 20W</p>
              <p className="text-xs text-gray-500 mt-0.5">USB-C Power Adapter</p>
            </div>
            <div className="font-bold text-orange-600 flex-shrink-0 text-sm">€{adapterPrice}</div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-1.5">
        <div className="flex justify-between text-gray-600">
          <span>Medzisúčet:</span>
          <span className="font-semibold text-gray-800">€{totalPrice.toFixed(2)}</span>
        </div>

        {adapterAdded && (
          <div className="flex justify-between text-orange-600">
            <span>Adaptér 20W:</span>
            <span className="font-semibold">+€{adapterPrice.toFixed(2)}</span>
          </div>
        )}

        {discountApplied && (
          <div className="flex justify-between text-green-600">
            <span className="truncate mr-2">Zľava ({discountCode} -{discountPercent}%):</span>
            <span className="font-semibold flex-shrink-0">-€{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-green-600">
          <span>Doprava:</span>
          <span className="font-semibold">ZADARMO ✅</span>
        </div>

        <div className="flex justify-between text-base sm:text-lg font-black text-blue-600 pt-2 border-t border-gray-200">
          <span>Celkom:</span>
          <span>€{finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}