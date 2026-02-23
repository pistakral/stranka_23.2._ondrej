import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import CartIcon from './shop/CartIcon';
import Cart from './shop/Cart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isStorePage = location.pathname.startsWith('/store');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-blue-900/95 backdrop-blur-md shadow-xl'
            : 'bg-blue-900/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-black text-2xl hover:text-yellow-400 transition-colors"
            >
              <span>FIXANTO</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-white hover:text-yellow-400 font-semibold transition-colors"
              >
                Domov
              </Link>
              <Link
                to="/#how-it-works"
                className="text-white hover:text-yellow-400 font-semibold transition-colors"
              >
                Služby
              </Link>
              <Link
                to="/tipy"
                className="text-white hover:text-yellow-400 font-semibold transition-colors"
              >
                Tipy
              </Link>
              <Link
                to="/vykup-apple"
                className="text-white hover:text-yellow-400 font-semibold transition-colors"
              >
                Výkup Apple
              </Link>
              
              {/* E-SHOP TLAČIDLO */}
              <Link
                to="/store"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                  isStorePage
                    ? 'bg-yellow-400 text-blue-900'
                    : 'bg-white/10 text-white hover:bg-yellow-400 hover:text-blue-900'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                E-shop
              </Link>

              {/* KOŠÍK IKONA */}
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <CartIcon onClick={() => setIsCartOpen(true)} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Domov
              </Link>
              <Link
                to="/#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Služby
              </Link>
              <Link
                to="/tipy"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Tipy
              </Link>
              <Link
                to="/vykup-apple"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Výkup Apple
              </Link>
              <Link
                to="/store"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold transition-all hover:bg-yellow-300"
              >
                <ShoppingBag className="w-5 h-5" />
                E-shop
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}