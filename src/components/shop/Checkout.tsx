import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { supabase } from '../../lib/supabase';
import Navbar from '../Navbar';

// Rate limiting konstanta
const RATE_LIMIT_KEY = 'last_order_attempt';
const RATE_LIMIT_COOLDOWN = 60000; // 1 minúta

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'packeta', name: 'Packeta (výdajné miesto)', price: 5.5 },
  { id: 'gls', name: 'GLS (kuriér)', price: 7 },
  { id: 'posta', name: 'Slovenská pošta', price: 7 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
    shippingMethod: 'packeta',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ak je košík prázdny, redirect späť
  if (items.length === 0) {
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
  const finalTotal = totalPrice + shippingPrice;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // ============================================
    // RATE LIMITING - Kontrola
    // ============================================
    const lastAttempt = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastAttempt) {
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
      if (timeSinceLastAttempt < RATE_LIMIT_COOLDOWN) {
        const remainingSeconds = Math.ceil((RATE_LIMIT_COOLDOWN - timeSinceLastAttempt) / 1000);
        setError(`Počkajte prosím ${remainingSeconds} sekúnd pred ďalšou objednávkou.`);
        return;
      }
    }

    // Validácia
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.zip) {
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

    setLoading(true);

    try {
      // ============================================
      // 1. VYTVOR OBJEDNÁVKU V SUPABASE
      // ============================================
      const orderId = Date.now().toString();

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderId,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_city: formData.city,
          customer_zip: formData.zip,
          subtotal: totalPrice,
          shipping_price: shippingPrice,
          total_price: finalTotal,
          shipping_method: formData.shippingMethod,
          payment_method: 'bank_transfer',
          status: 'pending',
          customer_notes: formData.notes || null,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Nepodarilo sa vytvoriť objednávku. Skúste to prosím znova.');
      }

      // ============================================
      // 2. VYTVOR POLOŽKY OBJEDNÁVKY
      // ============================================
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: null, // Môžeš doplniť UUID produktu ak chceš
        product_name: item.name,
        product_capacity: item.capacity,
        product_color: item.color,
        product_image: item.images?.[0] || '',
        quantity: 1,
        unit_price: item.price,
        total_price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        // Pokračuj aj tak - hlavná objednávka je vytvorená
      }

      // ============================================
      // 3. VYTVOR REZERVÁCIE PRE PRODUKTY (48h systém)
      // ============================================
      for (const item of items) {
        // Nájdi produkt v databáze podľa slug
        const { data: productData } = await supabase
          .from('products')
          .select('id')
          .eq('slug', item.id)
          .single();

        if (productData) {
          await supabase.from('reservations').insert({
            product_id: productData.id,
            customer_email: formData.email,
            customer_name: formData.name,
            customer_phone: formData.phone,
            status: 'pending',
            notes: `Objednávka #${orderId}`,
          });

          // Označ produkt ako rezervovaný
          await supabase
            .from('products')
            .update({ stock_status: 'reserved' })
            .eq('id', productData.id);
        }
      }

      // ============================================
      // 4. ULOŽ RATE LIMITING TIMESTAMP
      // ============================================
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      // ============================================
      // 5. ULOŽ OBJEDNÁVKU DO LOCALSTORAGE (pre confirmation page)
      // ============================================
      const orderForLocalStorage = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerCity: formData.city,
        customerZip: formData.zip,
        items,
        subtotal: totalPrice,
        shippingMethod: selectedShipping.name,
        shippingPrice,
        totalPrice: finalTotal,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`order-${orderId}`, JSON.stringify(orderForLocalStorage));

      // ============================================
      // 6. POŠLI EMAIL NOTIFIKÁCIU (TODO: implementovať MailerLite/EmailJS)
      // ============================================
      console.log('📧 EMAIL NOTIFICATION (TODO):');
      console.log('To:', formData.email);
      console.log('Subject:', `Objednávka #${orderId} - Fixanto.sk`);
      console.log('Body:', `
Ďakujeme za objednávku!

Číslo objednávky: ${orderId}
Meno: ${formData.name}
Email: ${formData.email}
Telefón: ${formData.phone}

Produkty:
${items.map((item) => `- ${item.name} (${item.capacity}) ${item.color} - €${item.price}`).join('\n')}

Doprava: ${selectedShipping.name} - €${shippingPrice}
Celková suma: €${finalTotal}

Platbu zašlite na účet:
IBAN: SK31 1100 0000 0029 4803 7511
Variabilný symbol: ${orderId}

Platba musí byť pripísaná do 48 hodín, inak bude rezervácia zrušená.

Ďakujeme!
Fixanto.sk
      `);

      // ============================================
      // 7. VYČISTI KOŠÍK A REDIRECT
      // ============================================
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
            {/* LEFT: Formulár */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontaktné údaje</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meno a priezvisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ján Novák"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jan.novak@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefón *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0949 123 456"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mesto *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Trenčín"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PSČ *</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="911 01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Spôsob doručenia *
                  </label>
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
                        style={{
                          borderColor: formData.shippingMethod === method.id ? '#2563eb' : '#e5e7eb',
                        }}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                          className="w-5 h-5 text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{method.name}</div>
                        </div>
                        <div className="font-bold text-blue-600">€{method.price.toFixed(2)}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Poznámka k objednávke
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Napr. preferovaný čas doručenia..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-xl font-black text-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Spracovávam...
                    </div>
                  ) : (
                    '🛒 Odoslať objednávku'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Platba prevodom. Údaje na úhradu dostanete na email.
                </p>
              </form>
            </div>

            {/* RIGHT: Zhrnutie */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Zhrnutie</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.images?.[0] || ''}
                        alt={item.name}
                        className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.capacity} • {item.color}
                        </p>
                      </div>
                      <div className="font-bold text-blue-600">€{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Medzisúčet:</span>
                    <span className="font-semibold">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Doprava:</span>
                    <span className="font-semibold">€{shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-blue-600 pt-3 border-t border-gray-200">
                    <span>Celkom:</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}