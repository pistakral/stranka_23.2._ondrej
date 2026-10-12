import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from './ProductCard';
import Navbar from '../Navbar';
import CookieBanner from '../CookieBanner';
import GoogleAnalytics from '../GoogleAnalytics';
import { supabase } from '../../lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  display_order: number | null;
}

// Záloha, keby sa tabuľka categories nenačítala (napr. kvôli RLS)
const FALLBACK_CATEGORIES: Category[] = [
  { id: 'iphone', name: 'iPhone', slug: 'iphone', icon: '📱', display_order: 1 },
  { id: 'android', name: 'Android', slug: 'android', icon: '🤖', display_order: 5 },
];

// Kategória produktu z DB; ak chýba, odvodíme ju z názvu
const getCategorySlug = (p: any): string =>
  p.category?.slug ?? (/iphone/i.test(p.name ?? '') ? 'iphone' : 'android');

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter je v URL (?typ=android) – ostane zachovaný po návrate z detailu
  const [searchParams, setSearchParams] = useSearchParams();
  const typParam = searchParams.get('typ') ?? '';

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          supabase
            .from('products')
            .select('*, category:categories(slug)')
            .eq('is_active', true)
            .order('created_at', { ascending: false }),
          supabase
            .from('categories')
            .select('id, name, slug, icon, display_order')
            .eq('is_active', true)
            .order('display_order', { ascending: true }),
        ]);

        if (productsRes.error) {
          console.error('Supabase error:', productsRes.error);
          setError('Nepodarilo sa načítať produkty.');
        } else {
          setProducts(productsRes.data || []);
        }

        if (categoriesRes.error) {
          console.error('Categories error:', categoriesRes.error);
        }
        setCategories(
          categoriesRes.data && categoriesRes.data.length > 0
            ? categoriesRes.data
            : FALLBACK_CATEGORIES
        );
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Chyba pri načítavaní produktov.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of products) {
      const slug = getCategorySlug(p);
      c[slug] = (c[slug] ?? 0) + 1;
    }
    return c;
  }, [products]);

  // Tlačidlá len pre kategórie, v ktorých niečo predávaš
  // (keď pridáš iPad alebo MacBook, tlačidlo sa objaví samo)
  const visibleCategories = useMemo(
    () => categories.filter((c) => (counts[c.slug] ?? 0) > 0),
    [categories, counts]
  );

  const activeCategory = visibleCategories.find((c) => c.slug === typParam);
  const typeFilter = activeCategory?.slug ?? '';

  const filtered = useMemo(
    () => (typeFilter ? products.filter((p) => getCategorySlug(p) === typeFilter) : products),
    [products, typeFilter]
  );

  // Klik na aktívne tlačidlo filter zruší → zobrazia sa všetky produkty
  const toggleCategory = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (typeFilter === slug) next.delete('typ');
    else next.set('typ', slug);
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>E-shop – repasované iPhony a Android telefóny so zárukou | Fixanto</title>
        <meta
          name="description"
          content="E-shop Fixanto: repasované iPhony, Samsung a Xiaomi telefóny otestované v servise v Trenčíne. Záruka 12 mesiacov, 14 dní na vrátenie, doprava zadarmo."
        />
        <link rel="canonical" href="https://fixanto.sk/eshop" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fixanto.sk/eshop" />
        <meta property="og:title" content="E-shop Fixanto – repasované telefóny so zárukou" />
        <meta
          property="og:description"
          content="Repasované iPhony a Android telefóny otestované v servise Fixanto. Záruka 12 mesiacov, doprava zadarmo."
        />
        <meta property="og:image" content="https://fixanto.sk/images/baner1.png" />
      </Helmet>
      <GoogleAnalytics />
      <Navbar />
      <section id="products" className="pb-16 bg-gray-50 pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">E-shop Fixanto – repasované telefóny iPhone a Android</h1>

          {/* ── Výber kategórie ── */}
          {!loading && !error && visibleCategories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8 sm:mb-10">
              {visibleCategories.map((cat) => {
                const active = typeFilter === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(cat.slug)}
                    className={`flex-1 basis-[140px] max-w-[220px] flex items-center justify-center gap-2 h-12 sm:h-14 rounded-full border-2 font-bold text-base sm:text-lg transition-all ${
                      active
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-700 text-white shadow-lg shadow-blue-200'
                        : 'bg-white border-gray-200 text-gray-800 shadow-sm hover:border-blue-400 hover:text-blue-700'
                    }`}
                  >
                    {cat.icon && <span className="text-xl leading-none" aria-hidden="true">{cat.icon}</span>}
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {counts[cat.slug]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

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
                  <p className="text-gray-600 text-lg">Momentálne nemáme žiadne produkty na sklade.</p>
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