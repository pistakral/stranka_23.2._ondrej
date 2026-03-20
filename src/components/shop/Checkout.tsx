import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../Navbar';
import OrderSummary from './OrderSummary';

const RATE_LIMIT_KEY = 'last_order_attempt';
const RATE_LIMIT_COOLDOWN = 60000;
const ADAPTER_PRICE = 15;
const ADAPTER_NAME = 'Nabíjací adaptér 20W (USB-C Power Adapter)';

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'posta', name: 'Slovenská pošta – doručenie na adresu', price: 0 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', zip: '',
    shippingMethod: 'posta', notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [adapterAdded, setAdapterAdded] = useState(false);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Košík je prázdny</h1>
            <button onClick={() => navigate('/eshop')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
              Späť na obchod
            </button>
          </div>
        </div>
      </>
    );
  }

  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === formData.shippingMethod)!;
  const shippingPrice = selectedShipping.price;
  const adapterPrice = adapterAdded ? ADAPTER_PRICE : 0;
  const subtotalWithAdapter = totalPrice + adapterPrice;
  const discountAmount = (subtotalWithAdapter * discountPercent) / 100;
  const finalTotal = subtotalWithAdapter - discountAmount + shippingPrice;

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) { setCodeError('Zadajte zľavový kód'); return; }
    setCheckingCode(true);
    setCodeError(null);
    try {
      const res = await fetch('/.netlify/functions/verify-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCodeError(data.message || 'Neplatný kód');
        setDiscountApplied(false);
        setDiscountPercent(0);
      } else {
        setDiscountPercent(data.discount_percent);
        setDiscountApplied(true);
        setCodeError(null);
      }
    } catch (err) {
      console.error('Discount code error:', err);
      setCodeError('Chyba pri overovaní kódu');
    } finally {
      setCheckingCode(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const lastAttempt = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastAttempt) {
      const elapsed = Date.now() - parseInt(lastAttempt);
      if (elapsed < RATE_LIMIT_COOLDOWN) {
        const remaining = Math.ceil((RATE_LIMIT_COOLDOWN - elapsed) / 1000);
        setError(`Počkajte prosím ${remaining} sekúnd pred ďalšou objednávkou.`);
        return;
      }
    }

    if (!formData.name || !formData.email || !formData.phone ||
        !formData.street || !formData.city || !formData.zip) {
      setError('Vyplňte prosím všetky povinné polia.'); return;
    }
    if (!formData.email.includes('@')) { setError('Zadajte platný email.'); return; }
    if (formData.phone.length < 9) { setError('Zadajte platné telefónne číslo.'); return; }

    const dangerousPattern = /(<script|javascript:|onerror=|DROP|DELETE|INSERT|UPDATE|SELECT|;--|\/\*)/gi;
    const allInputs = [formData.name, formData.email, formData.phone, formData.street, formData.city, formData.zip, formData.notes].join(' ');
    if (dangerousPattern.test(allInputs)) { setError('Neplatné znaky v údajoch. Skúste znova bez špeciálnych znakov.'); return; }
    if (formData.name.length > 100 || formData.street.length > 200 || formData.notes.length > 500) { setError('Niektoré polia sú príliš dlhé.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerStreet: formData.street,
          customerCity: formData.city,
          customerZip: formData.zip,
          shippingMethod: selectedShipping.name,
          shippingPrice,
          notes: formData.notes || null,
          items: cart.map((item) => ({
            name: item.name, capacity: item.capacity, color: item.color,
            price: item.price, image: item.images?.[0] || '', slug: item.id,
          })),
          subtotal: subtotalWithAdapter,
          totalPrice: finalTotal,
          discountCode: discountApplied ? discountCode : null,
          discountPercent: discountApplied ? discountPercent : 0,
          discountAmount: discountApplied ? discountAmount : 0,
          adapterAdded,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'Nastala chyba. Skúste to prosím znova.');

      const orderId = result.orderId;
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      localStorage.setItem(`order-${orderId}`, JSON.stringify({
        orderId,
        customerName: formData.name, customerEmail: formData.email,
        customerPhone: formData.phone, customerStreet: formData.street,
        customerCity: formData.city, customerZip: formData.zip,
        items: [
          ...cart,
          ...(adapterAdded ? [{ id: 'adapter-20w', name: ADAPTER_NAME, capacity: '', color: '', price: ADAPTER_PRICE, images: [] }] : []),
        ],
        subtotal: subtotalWithAdapter,
        shippingMethod: selectedShipping.name, shippingPrice,
        totalPrice: finalTotal,
        discountCode: discountApplied ? discountCode : null,
        discountPercent: discountApplied ? discountPercent : 0,
        discountAmount: discountApplied ? discountAmount : 0,
        adapterAdded,
        adapterPrice: adapterAdded ? ADAPTER_PRICE : 0,
        createdAt: new Date().toISOString(),
      }));

      clearCart();
      navigate(`/eshop/confirmation/${orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Nastala chyba. Skúste to prosím znova.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 sm:mb-8">Pokladňa</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-5">
              <p className="font-semibold text-sm sm:text-base">❌ {error}</p>
            </div>
          )}

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Zhrnutie — na mobile hore */}
            <div className="lg:hidden">
              <OrderSummary
                cart={cart} totalPrice={totalPrice}
                discountApplied={discountApplied} discountCode={discountCode}
                discountPercent={discountPercent} discountAmount={discountAmount}
                adapterAdded={adapterAdded} adapterPrice={ADAPTER_PRICE}
                finalTotal={finalTotal}
              />
            </div>

            {/* Formulár */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Kontaktné údaje</h2>

                <div>
                  <label className={labelClass}>Meno a priezvisko *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} placeholder="Ján Novák" />
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} placeholder="jan.novak@gmail.com" />
                </div>

                <div>
                  <label className={labelClass}>Telefón *</label>
                  <input type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass} placeholder="0949 123 456" />
                </div>

                <div>
                  <label className={labelClass}>Ulica a číslo domu *</label>
                  <input type="text" required value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className={inputClass} placeholder="Hlavná 42" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={labelClass}>Mesto *</label>
                    <input type="text" required value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={inputClass} placeholder="Trenčín" />
                  </div>
                  <div>
                    <label className={labelClass}>PSČ *</label>
                    <input type="text" required value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className={inputClass} placeholder="911 01" />
                  </div>
                </div>

                {/* Zľavový kód */}
                <div>
                  <label className={labelClass}>Zľavový kód (voliteľné)</label>
                  <div className="flex gap-2">
                    <input type="text" value={discountCode}
                      onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountApplied(false); setCodeError(null); }}
                      className={`${inputClass} flex-1 uppercase`}
                      placeholder="Zadajte kód" disabled={discountApplied} />
                    <button type="button" onClick={applyDiscountCode}
                      disabled={checkingCode || discountApplied || !discountCode.trim()}
                      className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap">
                      {checkingCode ? '...' : discountApplied ? '✓' : 'Použiť'}
                    </button>
                  </div>
                  {codeError && <p className="text-sm text-red-600 mt-2">❌ {codeError}</p>}
                  {discountApplied && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                      <span className="text-sm font-semibold">✅ Zľava {discountPercent}% aplikovaná!</span>
                      <button type="button"
                        onClick={() => { setDiscountCode(''); setDiscountPercent(0); setDiscountApplied(false); }}
                        className="text-xs text-blue-600 hover:underline">Odstrániť</button>
                    </div>
                  )}
                </div>

                {/* Nabíjací adaptér */}
                <div>
                  <label className={labelClass}>Doplnkové príslušenstvo</label>
                  <label className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    adapterAdded ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}>
                    <input type="checkbox" checked={adapterAdded}
                      onChange={(e) => setAdapterAdded(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 flex-shrink-0" />
                    <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${adapterAdded ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <Zap className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${adapterAdded ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">Nabíjací adaptér 20W</p>
                      <p className="text-xs sm:text-sm text-gray-500">USB-C Power Adapter</p>
                    </div>
                    <div className={`font-black text-base sm:text-lg flex-shrink-0 transition-colors ${adapterAdded ? 'text-orange-600' : 'text-gray-700'}`}>
                      +€{ADAPTER_PRICE}
                    </div>
                  </label>
                </div>

                {/* Spôsob doručenia */}
                <div>
                  <label className={labelClass}>Spôsob doručenia *</label>
                  {SHIPPING_METHODS.map((method) => (
                    <label key={method.id} className="flex items-center gap-3 p-3 sm:p-4 border-2 border-green-500 bg-green-50 rounded-xl cursor-pointer">
                      <input type="radio" name="shipping" value={method.id} checked={true} readOnly className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{method.name}</div>
                      </div>
                      <div className="font-bold text-green-600 text-sm sm:text-lg flex-shrink-0">ZADARMO ✅</div>
                    </label>
                  ))}
                </div>

                {/* Poznámka */}
                <div>
                  <label className={labelClass}>Poznámka k objednávke</label>
                  <textarea value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={inputClass} rows={3} />
                </div>

                {/* ── Súhlas s podmienkami ── */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  Odoslaním objednávky potvrdzujete, že ste sa oboznámili s{' '}
                  <Link
                    to="/vseobecne-obchodne-podmienky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-700 transition-colors"
                  >
                    Všeobecnými obchodnými podmienkami
                  </Link>
                  {' '}a{' '}
                  <Link
                    to="/ochrana-osobnych-udajov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-700 transition-colors"
                  >
                    Zásadami ochrany osobných údajov
                  </Link>
                  {' '}a súhlasíte s nimi.
                </p>

                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-xl font-black text-lg sm:text-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Spracovávam...
                    </div>
                  ) : '🛒 Odoslať objednávku'}
                </button>

                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Platba prevodom. Údaje na úhradu dostanete na email.
                </p>
              </form>
            </div>

            {/* Zhrnutie — na desktop vpravo */}
            <div className="hidden lg:block">
              <OrderSummary
                cart={cart} totalPrice={totalPrice}
                discountApplied={discountApplied} discountCode={discountCode}
                discountPercent={discountPercent} discountAmount={discountAmount}
                adapterAdded={adapterAdded} adapterPrice={ADAPTER_PRICE}
                finalTotal={finalTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}