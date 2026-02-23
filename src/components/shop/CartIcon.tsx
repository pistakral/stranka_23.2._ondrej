import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-blue-700 rounded-lg transition-all"
      aria-label="Košík"
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {totalItems}
        </span>
      )}
    </button>
  );
}