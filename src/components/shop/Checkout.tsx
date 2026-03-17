import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import Navbar from '../Navbar';
import OrderSummary from './OrderSummary';

// Rate limiting
const RATE_LIMIT_KEY = 'last_order_attempt';
const RATE_LIMIT_COOLDOWN = 60000;

// Platobné údaje
const IBAN_DISPLAY = 'SK48 0900 0000 0052 4269 0350';

// Adaptér
const ADAPTER_PRICE = 15;
const ADAPTER_NAME = 'Nabíjací adaptér 20W (Apple USB-C Power Adapter)';

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
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    shippingMethod: 'posta',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zľavový kód
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  // Adaptér
  const [adapterAdded, setAdapterAdded] = useState(false);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Košík je prázdny</h1>
            <button
              onClick={() => navigate('/store')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
            >
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
  // Zľava sa vzťahuje na celkovú sumu vrátane adaptéra
  const subtotalWithAdapter = totalPrice + adapterPrice;
  const discountAmount = (subtotalWithAdapter * discountPercent) / 100;
  const finalTotal = subtotalWithAdapter - discountAmount + shippingPrice;

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) {
      setCodeError('Zadajte zľavový kód');
      return;
    }
    setCheckingCode(true);
    setCodeError(null);
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('discount_percent, is_active, max_uses, current_uses, valid_until')
        .eq('code', discountCode.trim().toUpperCase())
        .maybeSingle();

      if (error || !data) {
        setCodeError('Neplatný kód');
        setDiscountApplied(false);
        setDiscountPercent(0);
        setCheckingCode(false);
        return;
      }
      if (!data.is_active) {
        setCodeError('Tento kód už nie je aktívny');
        setCheckingCode(false);
        return;
      }
      if (data.max_uses !== null && data.current_uses >= data.max_uses) {
        setCodeError('Kód bol už použitý maximálny počet krát');
        setCheckingCode(false);
        return;
      }
      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        setCodeError('Platnosť kódu vypršala');
        setCheckingCode(false);
        return;
      }
      setDiscountPercent(data.discount_percent);
      setDiscountApplied(true);
      setCodeError(null);
      setCheckingCode(false);
    } catch (err) {
      console.error('Discount code error:', err);
      setCodeError('Chyba pri overovaní kódu');
      setCheckingCode(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const lastAttempt = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastAttempt) {
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
      if (timeSinceLastAttempt < RATE_LIMIT_COOLDOWN) {
        const remainingSeconds = Math.ceil((RATE_LIMIT_COOLDOWN - timeSinceLastAttempt) / 1000);
        setError(`Počkajte prosím ${remainingSeconds} sekúnd pred ďalšou objednávkou.`);
        return;
      }
    }

    if (!formData.name || !formData.email || !formData.phone ||
        !formData.street || !formData.city || !formData.zip) {
      setError('Vyplňte prosím všetky povinné polia.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Zadajte platný email.');
      return;
    }
    if (formData.phone.length < 9) {
      setError('Zadajte platné telefónne číslo.');
      return;
    }

    const dangerousPattern = /(<script|javascript:|onerror=|DROP|DELETE|INSERT|UPDATE|SELECT|;--|\/\*)/gi;
    const allInputs = [
      formData.name, formData.email, formData.phone,
      formData.street, formData.city, formData.zip, formData.notes,
    ].join(' ');

    if (dangerousPattern.test(allInputs)) {
      setError('Neplatné znaky v údajoch. Skúste znova bez špeciálnych znakov.');
      return;
    }
    if (formData.name.length > 100 || formData.street.length > 200 || formData.notes.length > 500) {
      setError('Niektoré polia sú príliš dlhé.');
      return;
    }

    setLoading(true);
    try {
      const orderId = Date.now().toString();

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderId,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_street: formData.street,
          customer_city: formData.city,
          customer_zip: formData.zip,
          subtotal: subtotalWithAdapter,
          shipping_price: shippingPrice,
          total_price: finalTotal,
          shipping_method: formData.shippingMethod,
          payment_method: 'bank_transfer',
          status: 'pending',
          customer_notes: formData.notes || null,
          discount_code: discountApplied ? discountCode : null,
          discount_percent: discountApplied ? discountPercent : 0,
          discount_amount: discountApplied ? discountAmount : 0,
          has_adapter: adapterAdded,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Nepodarilo sa vytvoriť objednávku. Skúste to prosím znova.');
      }

      // Položky košíka + adaptér
      const orderItems = [
        ...cart.map((item) => ({
          order_id: orderData.id,
          product_id: null,
          product_name: item.name,
          product_capacity: item.capacity,
          product_color: item.color,
          product_image: item.images?.[0] || '',
          quantity: 1,
          unit_price: item.price,
          total_price: item.price,
        })),
        ...(adapterAdded
          ? [{
              order_id: orderData.id,
              product_id: null,
              product_name: ADAPTER_NAME,
              product_capacity: '',
              product_color: '',
              product_image: '',
              quantity: 1,
              unit_price: ADAPTER_PRICE,
              total_price: ADAPTER_PRICE,
            }]
          : []),
      ];

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) console.error('Order items error:', itemsError);

      // Rezervácie
      for (const item of cart) {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('id, slug, stock, stock_status, name')
          .eq('slug', item.id)
          .maybeSingle();

        if (productError || !productData) continue;

        const { error: reservationError } = await supabase
          .from('reservations')
          .insert({
            product_id: productData.id,
            customer_email: formData.email,
            customer_name: formData.name,
            customer_phone: formData.phone,
            status: 'pending',
            notes: `Objednávka #${orderId}`,
          });

        if (reservationError) console.error('Reservation error:', reservationError);

        if (productData.stock === 1) {
          const { error: reserveError } = await supabase.rpc('reserve_product', {
            product_slug: item.id,
          });
          if (reserveError) console.error('Reserve error:', reserveError);
        }
      }

      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      const orderForLocalStorage = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerStreet: formData.street,
        customerCity: formData.city,
        customerZip: formData.zip,
        items: [
          ...cart,
          ...(adapterAdded
            ? [{ id: 'adapter-20w', name: ADAPTER_NAME, capacity: '', color: '', price: ADAPTER_PRICE, images: [] }]
            : []),
        ],
        subtotal: subtotalWithAdapter,
        shippingMethod: selectedShipping.name,
        shippingPrice,
        totalPrice: finalTotal,
        discountCode: discountApplied ? discountCode : null,
        discountPercent: discountApplied ? discountPercent : 0,
        discountAmount: discountApplied ? discountAmount : 0,
        adapterAdded,
        adapterPrice: adapterAdded ? ADAPTER_PRICE : 0,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`order-${orderId}`, JSON.stringify(orderForLocalStorage));

      // Email
      try {
        const emailItems = [
          ...cart.map((item) => ({
            name: item.name,
            capacity: item.capacity,
            color: item.color,
            price: item.price,
          })),
          ...(adapterAdded
            ? [{ name: ADAPTER_NAME, capacity: '', color: '', price: ADAPTER_PRICE }]
            : []),
        ];

        const emailData = {
          orderId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerStreet: formData.street,
          customerCity: formData.city,
          customerZip: formData.zip,
          items: emailItems,
          subtotal: subtotalWithAdapter,
          discountCode: discountApplied ? discountCode : null,
          discountPercent: discountApplied ? discountPercent : 0,
          discountAmount: discountApplied ? discountAmount : 0,
          shippingMethod: selectedShipping.name,
          shippingPrice,
          totalPrice: finalTotal,
          iban: IBAN_DISPLAY,
          variableSymbol: orderId,
        };

        const emailRes = await fetch('/.netlify/functions/send-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData),
        });

        if (!emailRes.ok) console.error('Email sa nepodarilo odoslať');
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      clearCart();
      navigate(`/store/confirmation/${orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Nastala chyba. Skúste to prosím znova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Pokladňa</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6">
              <p className="font-semibold">❌ {error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontaktné údaje</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meno a priezvisko *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ján Novák" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jan.novak@gmail.com" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefón *</label>
                  <input type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0949 123 456" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ulica a číslo domu *</label>
                  <input type="text" required value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hlavná 42" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mesto *</label>
                    <input type="text" required value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Trenčín" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PSČ *</label>
                    <input type="text" required value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="911 01" />
                  </div>
                </div>

                {/* ── Zľavový kód ── */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Zľavový kód (voliteľné)</label>
                  <div className="flex gap-2">
                    <input
                      type="text" value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value.toUpperCase());
                        setDiscountApplied(false);
                        setCodeError(null);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                      placeholder="Zadajte kód"
                      disabled={discountApplied}
                    />
                    <button type="button" onClick={applyDiscountCode}
                      disabled={checkingCode || discountApplied || !discountCode.trim()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {checkingCode ? 'Overujem...' : discountApplied ? '✓ Použité' : 'Použiť'}
                    </button>
                  </div>
                  {codeError && <p className="text-sm text-red-600 mt-2">❌ {codeError}</p>}
                  {discountApplied && (
                    <div className="mt-2 flex items-center gap-2 text-green-600">
                      <span className="text-sm font-semibold">✅ Zľava {discountPercent}% aplikovaná!</span>
                      <button type="button"
                        onClick={() => { setDiscountCode(''); setDiscountPercent(0); setDiscountApplied(false); }}
                        className="text-xs text-blue-600 hover:underline">
                        Odstrániť
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Nabíjací adaptér ── */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doplnkové príslušenstvo
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    adapterAdded
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={adapterAdded}
                      onChange={(e) => setAdapterAdded(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 flex-shrink-0"
                    />
                    <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${adapterAdded ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      <Zap className={`w-6 h-6 transition-colors ${adapterAdded ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Nabíjací adaptér 20W</p>
                      <p className="text-sm text-gray-500">Apple USB-C Power Adapter – rýchle nabíjanie</p>
                    </div>
                    <div className={`font-black text-lg flex-shrink-0 transition-colors ${adapterAdded ? 'text-orange-600' : 'text-gray-700'}`}>
                      +€{ADAPTER_PRICE}
                    </div>
                  </label>
                </div>

                {/* ── Spôsob doručenia ── */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Spôsob doručenia *</label>
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-4 border-2 border-green-500 bg-green-50 rounded-xl cursor-pointer">
                        <input type="radio" name="shipping" value={method.id} checked={true} readOnly className="w-5 h-5 text-green-600" />
                        <div className="flex-1"><div className="font-semibold text-gray-900">{method.name}</div></div>
                        <div className="font-bold text-green-600 text-lg">ZADARMO ✅</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── Poznámka ── */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Poznámka k objednávke</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-xl font-black text-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Spracovávam...
                    </div>
                  ) : '🛒 Odoslať objednávku'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Platba prevodom. Údaje na úhradu dostanete na email.
                </p>
              </form>
            </div>

            {/* ── Sidebar ── */}
            <div>
              <OrderSummary
                cart={cart}
                totalPrice={totalPrice}
                discountApplied={discountApplied}
                discountCode={discountCode}
                discountPercent={discountPercent}
                discountAmount={discountAmount}
                adapterAdded={adapterAdded}
                adapterPrice={ADAPTER_PRICE}
                finalTotal={finalTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}