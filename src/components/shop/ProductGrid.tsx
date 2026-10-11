import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from './ProductCard';
import Navbar from '../Navbar';
import CookieBanner from '../CookieBanner';
import GoogleAnalytics from '../GoogleAnalytics';
import { supabase } from '../../lib/supabase';

// ── Pomocné funkcie pre filter ──────────────────────────────────────
type PhoneType = 'iphone' | 'android';

const PHONE_TYPES: PhoneType[] = ['iphone', 'android'];
const TYPE_LABELS: Record<PhoneType, string> = { iphone: 'iPhone', android: 'Android' };
const GRADE_ORDER = ['A+', 'A', 'B', 'C'];

// Typ odvodíme z názvu – všetko, čo nie je iPhone, je Android
const getType = (p: any): PhoneType => (/iphone/i.test(p.name ?? '') ? 'iphone' : 'android');
// Model = názov produktu (napr. "iPhone 15", "iPhone 13 mini")
const getModel = (p: any): string => (p.name ?? '').trim();
// "128 GB" aj "128GB" berieme ako to isté
const normCapacity = (c: string | null | undefined): string =>
  (c ?? '').replace(/\s+/g, '').toUpperCase();
const capacityToGB = (c: string): number => {
  const n = parseFloat(c);
  return /TB/.test(c) ? n * 1024 : n;
};
const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, 'sk', { numeric: true, sensitivity: 'base' });
const gradeRank = (g: string) => {
  const i = GRADE_ORDER.indexOf(g);
  return i === -1 ? 99 : i;
};

function countBy(list: any[], key: (p: any) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const p of list) {
    const k = key(p);
    if (!k) continue;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}

// Zoznam možností – vybraná hodnota ostane viditeľná aj keď má 0 kusov
function buildOptions(
  counts: Map<string, number>,
  selected: string,
  sort: (a: string, b: string) => number,
  label: (value: string) => string = (v) => v
) {
  const keys = new Set(counts.keys());
  if (selected) keys.add(selected);
  return [...keys].sort(sort).map((value) => ({
    value,
    label: `${label(value)} (${counts.get(value) ?? 0})`,
  }));
}

function phonesLabel(n: number) {
  if (n === 1) return '1 telefón';
  if (n >= 2 && n <= 4) return `${n} telefóny`;
  return `${n} telefónov`;
}

// ── Select komponent ────────────────────────────────────────────────
interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

function FilterSelect({
  id, label, value, placeholder, options, onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border-2 pl-3 sm:pl-4 pr-9 py-3 text-base font-semibold cursor-pointer truncate transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            value
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

// ── Stránka ─────────────────────────────────────────────────────────
export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtre sú v URL (?typ=iphone&model=iPhone+15...) – ostanú zachované
  // po návrate z detailu produktu a dá sa na ne poslať odkaz
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get('typ') ?? '';
  const typeFilter: PhoneType | '' = PHONE_TYPES.includes(rawType as PhoneType)
    ? (rawType as PhoneType)
    : '';
  const modelFilter = searchParams.get('model') ?? '';
  const capacityFilter = searchParams.get('kapacita') ?? '';
  const gradeFilter = searchParams.get('trieda') ?? '';
  const hasFilters = Boolean(typeFilter || modelFilter || capacityFilter || gradeFilter);

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

  const updateFilters = (changes: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, val] of Object.entries(changes)) {
      if (val) next.set(key, val);
      else next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () =>
    updateFilters({ typ: '', model: '', kapacita: '', trieda: '' });

  const handleTypeChange = (type: string) => {
    // ak vybraný model nepatrí k novému typu, zrušíme ho
    const keepModel =
      !type ||
      products.some((p) => getModel(p) === modelFilter && getType(p) === type);
    updateFilters({ typ: type, model: keepModel ? modelFilter : '' });
  };

  // ── Postupné filtrovanie: typ → model → kapacita + trieda ──
  const typeCounts = useMemo(() => countBy(products, getType), [products]);

  const byType = useMemo(
    () => (typeFilter ? products.filter((p) => getType(p) === typeFilter) : products),
    [products, typeFilter]
  );

  const byModel = useMemo(
    () => (modelFilter ? byType.filter((p) => getModel(p) === modelFilter) : byType),
    [byType, modelFilter]
  );

  const matchesCapacity = (p: any) =>
    !capacityFilter || normCapacity(p.capacity) === capacityFilter;
  const matchesGrade = (p: any) => !gradeFilter || p.grade === gradeFilter;

  const filtered = useMemo(
    () => byModel.filter((p) => matchesCapacity(p) && matchesGrade(p)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [byModel, capacityFilter, gradeFilter]
  );

  const typeOptions: FilterOption[] = PHONE_TYPES.map((t) => {
    const n = typeCounts.get(t) ?? 0;
    return {
      value: t,
      label: n > 0 ? `${TYPE_LABELS[t]} (${n})` : `${TYPE_LABELS[t]} (čoskoro)`,
      disabled: n === 0 && typeFilter !== t,
    };
  });

  const modelOptions = buildOptions(countBy(byType, getModel), modelFilter, naturalSort);

  const capacityOptions = buildOptions(
    countBy(byModel.filter(matchesGrade), (p) => normCapacity(p.capacity)),
    capacityFilter,
    (a, b) => capacityToGB(a) - capacityToGB(b)
  );

  const gradeOptions = buildOptions(
    countBy(byModel.filter(matchesCapacity), (p) => p.grade ?? ''),
    gradeFilter,
    (a, b) => gradeRank(a) - gradeRank(b),
    (g) => `Trieda ${g}`
  );

  return (
    <>
      <GoogleAnalytics />
      <Navbar />
      <section id="products" className="py-16 bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Vyber si svoj telefón
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Všetky telefóny sú testované a plne funkčné.
            </p>
          </div>

          {/* ── Filter ── */}
          {!loading && !error && products.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Filtrovať telefóny</h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <FilterSelect
                  id="filter-typ"
                  label="Typ telefónu"
                  value={typeFilter}
                  placeholder="Všetky typy"
                  options={typeOptions}
                  onChange={handleTypeChange}
                />
                <FilterSelect
                  id="filter-model"
                  label="Model"
                  value={modelFilter}
                  placeholder="Všetky modely"
                  options={modelOptions}
                  onChange={(v) => updateFilters({ model: v })}
                />
                <FilterSelect
                  id="filter-kapacita"
                  label="Úložisko"
                  value={capacityFilter}
                  placeholder="Všetky"
                  options={capacityOptions}
                  onChange={(v) => updateFilters({ kapacita: v })}
                />
                <FilterSelect
                  id="filter-trieda"
                  label="Trieda"
                  value={gradeFilter}
                  placeholder="Všetky triedy"
                  options={gradeOptions}
                  onChange={(v) => updateFilters({ trieda: v })}
                />
              </div>

              <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100 text-sm">
                <span className="text-gray-600">
                  Zobrazujem <strong className="text-gray-900">{phonesLabel(filtered.length)}</strong>
                </span>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Zrušiť filtre
                  </button>
                )}
              </div>
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
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Momentálne nemáme žiadne produkty na sklade.</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    Žiadny telefón nezodpovedá zvoleným filtrom.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
                  >
                    Zrušiť filtre
                  </button>
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