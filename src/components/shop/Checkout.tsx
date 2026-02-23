import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Package, CreditCard, User, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../Navbar';
import Footer from '../Footer';

const IBAN = 'LT563250034704761008';
const IBAN_DISPLAY = 'LT56 3250 0347 0476 1008';
const RECIPIENT_NAME = 'Fixanto';

const SHIPPING_OPTIONS = [
  { id: 'packeta', label: 'Packeta – výdajné miesto', price: 5.5 },
  { id: 'gls', label: 'GLS – doručenie na adresu', price: 7 },
  { id: 'posta', label: 'Slovenská pošta – doručenie na adresu', price: 7 },
];

function generateOrderId(): string {
  return Date.now().toString().slice(-8);
}

// EPC QR code – funguje vo všetkých EU bankových appkách (SK, LT, CZ…)
async function generateEpcQR(iban: string, amount: number, reference: string, recipientName: string): Promise<string> {
  const epcData = [
    'BCD',          // Service Tag
    '002',          // Version
    '1',            // Encoding: UTF-8
    'SCT',          // Identification: SEPA Credit Transfer
    '',             // BIC (optional, leave empty)
    recipientName,
    iban.replace(/\s/g, ''),
    `EUR${amount.toFixed(2)}`,
    '',             // Purpose (optional)
    reference,      // Remittance Reference
    '',             // Remittance Information
  ].join('\n');

  return QRCode.toDataURL(epcData, {
    errorCorrectionLevel: 'M',
    width: 300,
    margin: 2,
    color: { dark: '#0d47a1', light: '#ffffff' },
  });
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + selectedShipping.price;
  const orderId = generateOrderId();

  useEffect(() => {
    if (cart.length === 0) navigate('/store');
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.city.trim() &&
    form.zip.trim();

  const handleSubmit = async () => {
    if (!isFormValid) { setError('Prosím vyplňte všetky polia.'); return; }
    setSubmitting(true);
    setError('');

    try {
      const qrCodeDataUrl = await generateEpcQR(IBAN, total, orderId, RECIPIENT_NAME);

      const orderData = {
        orderId,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        city: form.city,
        zip: form.zip,
        shipping: selectedShipping.label,
        shippingPrice: selectedShipping.price,
        total,
        products: cart,
        iban: IBAN_DISPLAY,
        variableSymbol: orderId,
      };

      // Uložiť do localStorage pre OrderConfirmation stránku
      localStorage.setItem('lastOrder', JSON.stringify({ ...orderData, qrCodeDataUrl }));

      // Poslať emaily cez Netlify Function
      const res = await fetch('/.netlify/functions/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Email sa nepodarilo odoslať');

      clearCart();
      navigate(`/store/confirmation/${orderId}`);
    } catch (err: any) {
      // Aj keby email zlyhal, prejdeme na potvrdenie (objednávka je uložená)
      const qrCodeDataUrl = await generateEpcQR(IBAN, total, orderId, RECIPIENT_NAME);
      const orderData = {
        orderId,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        city: form.city,
        zip: form.zip,
        shipping: selectedShipping.label,
        shippingPrice: selectedShipping.price,
        total,
        products: cart,
        iban: IBAN_DISPLAY,
        variableSymbol: orderId,
        qrCodeDataUrl,
      };
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      clearCart();
      navigate(`/store/confirmation/${orderId}`);
    } finally {
      setSubmitting(false);
    }
  };

  // ── ORDER SUMMARY ──────────────────────────────────────────────────────
  const OrderSummary = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-28">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Zhrnutie objednávky</h3>
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-14 h-14 object-contain rounded-lg bg-gray-100"
              onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Crect width="56" height="56" fill="%23e5e7eb"/%3E%3C/svg%3E'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{item.name} {item.capacity}</p>
              <p className="text-xs text-gray-500">{item.color}</p>
            </div>
            <span className="font-bold text-blue-600">€{item.price}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Produkty</span>
          <span>€{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Doprava</span>
          <span>€{selectedShipping.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-black text-blue-600 border-t pt-2">
          <span>CELKOM</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/store')}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Späť na obchod
          </button>

          <h1 className="text-3xl font-black text-gray-900 mb-8">Dokončiť objednávku</h1>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mb-10">
            {[
              { n: 1, icon: <Package className="w-5 h-5" />, label: 'Doprava' },
              { n: 2, icon: <User className="w-5 h-5" />, label: 'Vaše údaje' },
              { n: 3, icon: <CreditCard className="w-5 h-5" />, label: 'Platba' },
            ].map(({ n, icon, label }) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    step === n
                      ? 'bg-blue-600 text-white shadow-lg'
                      : step > n
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > n ? <Check className="w-5 h-5" /> : icon}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {n < 3 && <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

              {/* ── KROK 1: DOPRAVA ── */}
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Package className="w-7 h-7 text-blue-600" />
                    Zvoľte spôsob dopravy
                  </h2>
                  <div className="space-y-3">
                    {SHIPPING_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedShipping.id === opt.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={selectedShipping.id === opt.id}
                          onChange={() => setSelectedShipping(opt)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="flex-1 font-semibold text-gray-900">{opt.label}</span>
                        <span className="font-bold text-blue-600">€{opt.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Pokračovať <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* ── KROK 2: ÚDAJE ── */}
              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <User className="w-7 h-7 text-blue-600" />
                    Vaše kontaktné údaje
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Meno a priezvisko', placeholder: 'Ján Novák', colSpan: true },
                      { name: 'email', label: 'Email', placeholder: 'jan@email.sk', colSpan: true },
                      { name: 'phone', label: 'Telefón', placeholder: '+421 900 000 000', colSpan: false },
                      { name: 'city', label: 'Mesto', placeholder: 'Trenčín', colSpan: false },
                      { name: 'zip', label: 'PSČ', placeholder: '911 01', colSpan: false },
                    ].map(({ name, label, placeholder, colSpan }) => (
                      <div key={name} className={colSpan ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                        <input
                          type="text"
                          name={name}
                          value={form[name as keyof typeof form]}
                          onChange={handleInput}
                          placeholder={placeholder}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" /> Späť
                    </button>
                    <button
                      onClick={() => {
                        if (!isFormValid) { setError('Vyplňte prosím všetky polia.'); return; }
                        setError('');
                        setStep(3);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      Pokračovať <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  {error && <p className="mt-3 text-red-500 text-sm text-center">{error}</p>}
                </div>
              )}

              {/* ── KROK 3: PLATBA ── */}
              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-7 h-7 text-blue-600" />
                    Platba prevodom
                  </h2>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-900 text-lg">Bankový prevod (ZADARMO)</p>
                        <p className="text-blue-700 text-sm">Po odoslaní objednávky dostanete email s platobnými údajmi a QR kódom</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">IBAN:</span>
                        <span className="font-mono font-bold text-blue-900">{IBAN_DISPLAY}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variabilný symbol:</span>
                        <span className="font-bold text-blue-900">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Suma:</span>
                        <span className="font-bold text-xl text-blue-900">€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
                    📱 QR kód na rýchlu platbu dostanete na stránke potvrdenia objednávky aj v emaili.
                  </div>

                  {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-4 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" /> Späť
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-black text-lg shadow-xl hover:from-green-700 hover:to-green-800 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          Odosielam...
                        </span>
                      ) : (
                        '✅ ODOSLAŤ OBJEDNÁVKU'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}