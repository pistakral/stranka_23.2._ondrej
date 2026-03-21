import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from '../Navbar';
import CookieBanner from '../CookieBanner';
import GoogleAnalytics from '../GoogleAnalytics';
import { supabase } from '../../lib/supabase';

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          setError('Nepodarilo sa načítať produkty.');
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Chyba pri načítavaní produktov.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <Navbar />
      <section id="products" className="py-16 bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Vyber si svoj iPhone
            </h2>
            <p className="text-xl text-gray-600">
              Všetky telefóny sú testované a plne funkčné.
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Načítavam produkty...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
              >
                Skúsiť znova
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Momentálne nemáme žiadne produkty na sklade.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.slug}
                      name={product.name}
                      capacity={product.capacity}
                      color={product.color}
                      price={product.price}
                      image={product.main_image}
                      grade={product.grade}
                      stock={product.stock}
                      stockStatus={product.stock_status}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <CookieBanner />
    </>
  );
}