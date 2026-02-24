import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, Shield, Menu, X, ShoppingBag } from 'lucide-react';
import CartIcon from './shop/CartIcon';
import Cart from './shop/Cart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      id: 'sluzby', 
      label: 'Služby', 
      icon: <Wrench className="w-5 h-5" />, 
      highlight: false, 
      highlightColor: '', 
      href: '/#sluzby', 
      external: false 
    },
    { 
      id: 'vyhody', 
      label: 'Prečo my?', 
      icon: <Shield className="w-5 h-5" />, 
      highlight: false, 
      highlightColor: '', 
      href: '/#vyhody', 
      external: false 
    },
    { 
      id: 'tipy', 
      label: '🎁 7 TRIKOV ZADARMO', 
      icon: null, 
      highlight: true, 
      highlightColor: 'yellow',
      href: '/tipy', 
      external: true 
    },
    { 
      id: 'vykup-apple', 
      label: '🍎 VÝKUP APPLE', 
      icon: null, 
      highlight: true, 
      highlightColor: 'orange',
      href: '/vykup-apple', 
      external: true 
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  const getButtonClasses = (highlight: boolean, color: string) => {
    if (!highlight) {
      return 'bg-blue-700 hover:bg-blue-600 text-white hover:scale-105';
    }
    
    if (color === 'yellow') {
      const shouldPulse = location.pathname !== '/tipy';
      return `bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400 hover:scale-110 font-black shadow-lg shadow-yellow-500/50 ${shouldPulse ? 'animate-pulse' : ''}`;
    }
    
    if (color === 'orange') {
      const shouldBounce = location.pathname !== '/vykup-apple';
      return `bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500 hover:scale-110 font-black shadow-lg shadow-orange-500/50 ${shouldBounce ? 'animate-bounce' : ''}`;
    }
    
    return 'bg-blue-700 hover:bg-blue-600 text-white';
  };

  const getMobileButtonClasses = (highlight: boolean, color: string) => {
    if (!highlight) {
      return 'bg-blue-800 hover:bg-blue-700 text-white';
    }
    
    if (color === 'yellow') {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400 font-black shadow-md';
    }
    
    if (color === 'orange') {
      return 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500 font-black shadow-md';
    }
    
    return 'bg-blue-800 hover:bg-blue-700 text-white';
  };

  const handleNavClick = (href: string, id: string, external: boolean) => {
    if (external) {
      return;
    }

    if (location.pathname === '/') {
      scrollToSection(id);
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <Link
              to="/"
              className="text-white font-bold text-xl sm:text-2xl cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-3xl">🔧</span>
              Fixanto
            </Link>

            <div className="md:hidden flex items-center gap-2">
              {/* MOBILE - E-shop vždy žlté */}
              <Link
                to="/store"
                className="bg-yellow-400 text-blue-900 px-2 py-2 rounded-lg font-black text-xs transition-all shadow-md hover:scale-105 whitespace-nowrap"
              >
                🛒 E-shop
              </Link>
              <Link
                to="/tipy"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-3 py-2 rounded-lg font-black text-xs hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-md hover:scale-105 whitespace-nowrap"
              >
                🎁 7 TRIKOV
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map(({ id, label, icon, highlight, highlightColor, href, external }) => (
                external ? (
                  <Link
                    key={id}
                    to={href}
                    className={`
                      flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-lg transition-all duration-300
                      ${getButtonClasses(highlight, highlightColor)}
                    `}
                  >
                    {icon}
                    {label}
                  </Link>
                ) : (
                  <button
                    key={id}
                    onClick={() => handleNavClick(href, id, external)}
                    className={`
                      flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-lg transition-all duration-300
                      ${getButtonClasses(highlight, highlightColor)}
                    `}
                  >
                    {icon}
                    {label}
                  </button>
                )
              ))}
              
              {/* E-SHOP TLAČIDLO - vždy žlté */}
              <Link
                to="/store"
                className="flex items-center gap-2 px-5 py-2 rounded-full font-black shadow-lg transition-all duration-300 bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:scale-110"
              >
                <ShoppingBag className="w-5 h-5" />
                E-shop
              </Link>

              {/* KOŠÍK IKONA */}
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none hover:bg-blue-700 p-2 rounded-lg transition ml-2"
                aria-label="Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-900 to-blue-950 border-t border-blue-700 shadow-xl">
            <div className="flex flex-col space-y-2 px-4 py-4">
              {/* MOBILE MENU - E-shop vždy žlté */}
              <Link
                to="/store"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-black transition-all hover:scale-105 bg-yellow-400 text-blue-900 hover:bg-yellow-300"
              >
                <ShoppingBag className="w-5 h-5" />
                E-shop
              </Link>
              
              {navItems.map(({ id, label, icon, highlight, highlightColor, href, external }) => {
                if (id === 'tipy') return null;
                
                return external ? (
                  <Link
                    key={id}
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105
                      ${getMobileButtonClasses(highlight, highlightColor)}
                    `}
                  >
                    {icon}
                    {label}
                  </Link>
                ) : (
                  <button
                    key={id}
                    onClick={() => {
                      handleNavClick(href, id, external);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 text-left
                      ${getMobileButtonClasses(highlight, highlightColor)}
                    `}
                  >
                    {icon}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}