import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productsData from '../../data/products.json';
import Navbar from '../Navbar';

export default function ProductGrid() {
  const [visibleCount, setVisibleCount] = useState(3);
  const products = productsData.products;

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount(prev => Math.min(prev + 3, products.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <Navbar />
      <section id="products" className="py-16 bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Dostupné zariadenia
            </h2>
            <p className="text-xl text-gray-600">
              Všetky telefóny sú overené, testované a v perfektnom stave
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                capacity={product.capacity}
                color={product.color}
                price={product.price}
                image={product.images[0]}
                grade={product.grade}
                stock={product.stock}
              />
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 3, products.length))}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
              >
                Zobraziť viac
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}