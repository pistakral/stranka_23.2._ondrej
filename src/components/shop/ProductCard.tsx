import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  capacity: string;
  color: string;
  price: number;
  image: string;
  grade: string;
  stock: number;
  stockStatus?: string;
}

export default function ProductCard({ 
  id, name, capacity, color, price, image, grade, stock, stockStatus 
}: ProductCardProps) {
  
  const isReserved = stockStatus === 'reserved';
  const isSoldOut = stockStatus === 'sold_out' || stock === 0;
  const isAvailable = !isReserved && !isSoldOut;
  
  return (
    <Link
      to={isAvailable ? `/eshop/${id}` : '#'}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group ${
        isAvailable ? 'hover:shadow-2xl hover:scale-105' : 'opacity-75 cursor-not-allowed'
      }`}
      onClick={(e) => {
        if (!isAvailable) {
          e.preventDefault();
        }
      }}
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={`${name} ${capacity} ${color}`}
          className={`w-full h-72 object-contain p-4 transition-transform duration-500 ${
            isAvailable ? 'group-hover:scale-110' : 'grayscale'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%239ca3af"%3EPlaceholder%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* TRIEDA badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
          TRIEDA {grade}
        </div>
        
        {/* STATUS badges */}
        {isReserved && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-xs animate-pulse">
            REZERVOVANÉ ⏰
          </div>
        )}
        
        {isSoldOut && (
          <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded-lg font-bold text-xs">
            VYPREDANÉ ❌
          </div>
        )}
        
        {isAvailable && stock <= 2 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-xs">
            Posledné kusy
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {name} ({capacity})
        </h3>
        <p className="text-lg text-gray-600 mb-4">{color}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-4xl font-black text-blue-600">€{price}</span>
          </div>
          <div className="text-sm text-gray-500">
            {isReserved && <span className="text-orange-600 font-bold">Rezervované</span>}
            {isSoldOut && <span className="text-gray-600 font-bold">Vypredané</span>}
            {isAvailable && <span>Skladom: {stock} ks</span>}
          </div>
        </div>
        
        <button 
          className={`mt-6 w-full px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
            isAvailable 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
        >
          {isReserved && '⏰ Rezervované'}
          {isSoldOut && '❌ Vypredané'}
          {isAvailable && 'Zobraziť detail'}
        </button>
      </div>
    </Link>
  );
}