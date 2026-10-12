import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import ProductCard from './ProductCard';
import Navbar from '../Navbar';
import CookieBanner from '../CookieBanner';
import GoogleAnalytics from '../GoogleAnalytics';
import { supabase } from '../../lib/supabase';

type PhoneType = 'iphone' | 'android';

const PHONE_TYPES: { value: PhoneType; label: string }[] = [
  { value: 'iphone', label: 'iPhone' },
  { value: 'android', label: 'Android' },
];

// Typ odvodíme z názvu – všetko, čo nie je iPhone, je Android
const getType = (p: any): PhoneType => (/iphone/i.test(p.name ?? '') ? 'iphone' : 'android');

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter je v URL (?typ=android) – ostane zachovaný po návrate z detailu
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get('typ');
  const typeFilter: PhoneType | '' =
    rawType === 'iphone' || rawType === 'android' ? rawType : '';

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

  const counts = useMemo(() => {
    const c: Record<PhoneType, number> = { iphone: 0, android: 0 };
    for (const p of products) c[getType(p)]++;
    return c;
  }, [products]);

  const filtered = useMemo(
    () => (typeFilter ? products.filter((p) => getType(p) === typeFilter) : products),
    [products, typeFilter]
  );

  // Klik na aktívne tlačidlo filter zruší → zobrazia sa všetky telefóny
  const toggleType = (type: PhoneType) => {
    const next = new URLSearchParams(searchParams);
    if (typeFilter === type) next.delete('typ');
    else next.set('typ', type);
    setSearchParams(next, { replace: true });
  };

  const activeLabel = PHONE_TYPES.find((t) => t.value === typeFilter)?.label;

  return (
    <>
      <GoogleAnalytics />
      <Navbar />
      <section id="products" className="pb-16 bg-gray-50 pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">E-shop Fixanto – repasované telefóny iPhone a Android</h1>

          {/* ── Výber typu telefónu ── */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 sm:mb-10">
            {PHONE_TYPES.map(({ value, label }) => {
              const active = typeFilter === value;
              const n = counts[value];
              const disabled = !loading && n === 0;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => toggleType(value)}
                  className={`flex items-center justify-center gap-2 h-12 sm:h-14 rounded-full border-2 font-bold text-base sm:text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-700 text-white shadow-lg shadow-blue-200'
                      : 'bg-white border-gray-200 text-gray-800 shadow-sm hover:border-blue-400 hover:text-blue-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 flex-shrink-0" />
                  <span>{label}</span>
                  {!loading && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {n}
                    </span>
                  )}
                </button>
              );
            })}
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
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    {activeLabel
                      ? `Momentálne nemáme na sklade žiadny ${activeLabel}.`
                      : 'Momentálne nemáme žiadne produkty na sklade.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((product) => (
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