import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface OrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  zip: string;
  shipping: string;
  shippingPrice: number;
  total: number;
  products: { id: string; name: string; capacity: string; color: string; price: number; images: string[] }[];
  iban: string;
  variableSymbol: string;
  qrCodeDataUrl?: string;
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = localStorage.getItem('lastOrder');
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      navigate('/store');
    }
  }, []);

  if (!order) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* SUCCESS HEADER */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-center text-white mb-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-200" />
            <h1 className="text-3xl sm:text-4xl font-black mb-2">Objednávka odoslaná!</h1>
            <p className="text-green-100 text-lg">
              Ďakujeme za vašu objednávku číslo{' '}
              <strong className="text-white text-xl">#{order.orderId}</strong>
            </p>
            <p className="text-green-100 mt-2">
              Rekapituláciu sme zaslali na <strong className="text-white">{order.customerEmail}</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT – PLATOBNÉ ÚDAJE + QR */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">💳 Platba a doručenie</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Zvolená doprava:</span>
                    <span className="font-semibold text-gray-900">{order.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Zvolená platba:</span>
                    <span className="font-semibold text-gray-900">Prevodom na účet (vopred)</span>
                  </div>
                  <div className="flex justify-between text-lg font-black border-t pt-2 mt-2">
                    <span className="text-gray-700">Čiastka k úhrade:</span>
                    <span className="text-blue-600">€{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bankový účet:</span>
                    <span className="font-mono font-bold text-blue-900 text-xs sm:text-sm">{order.iban}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variabilný symbol:</span>
                    <span className="font-bold text-blue-900 text-lg">{order.variableSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Suma:</span>
                    <span className="font-black text-blue-900 text-xl">€{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  ⚠️ Nezabudnite uviesť variabilný symbol – objednávku spárujeme podľa neho.
                </p>
              </div>

              {/* QR KÓD */}
              {order.qrCodeDataUrl && (
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">📱 QR kód na platbu</h2>
                  <p className="text-gray-500 text-sm mb-4">Naskenujte v mobilnej appke vašej banky</p>
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-2xl shadow-inner border-2 border-blue-100 inline-block">
                      <img src={order.qrCodeDataUrl} alt="QR kód na platbu" className="w-56 h-56" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    EPC / SEPA QR kód – funguje v appkách všetkých bánk
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT – OBSAH OBJEDNÁVKY + INFO */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📦 Obsah objednávky</h2>
                <div className="space-y-3">
                  {order.products.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-14 h-14 object-contain rounded-xl bg-gray-100"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56"%3E%3Crect width="56" height="56" fill="%23e5e7eb"/%3E%3C/svg%3E'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{p.name} {p.capacity}</p>
                        <p className="text-sm text-gray-500">{p.color} • Záruka 12 mesiacov</p>
                      </div>
                      <span className="font-bold text-blue-600">€{p.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 space-y-1 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Doprava ({order.shipping})</span>
                    <span>€{order.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-xl text-blue-600">
                    <span>CELKOM</span>
                    <span>€{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* ADRESA DORUČENIA */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🚚 Adresa doručenia</h2>
                <div className="text-sm space-y-1 text-gray-700">
                  <p><strong>{order.customerName}</strong></p>
                  <p>{order.street}</p>
                  <p>{order.zip} {order.city}</p>
                  <p className="text-gray-500 pt-1">📞 {order.customerPhone}</p>
                </div>
              </div>

              {/* ĎALŠIE KROKY */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Čo bude ďalej?</h2>
                <ol className="space-y-3">
                  {[
                    { n: 1, text: 'Uhraďte objednávku prevodom na účet (QR kód vľavo)' },
                    { n: 2, text: 'Po prijatí platby vám zašleme potvrdzujúci email' },
                    { n: 3, text: 'Zásielku expedujeme do 1-2 pracovných dní' },
                    { n: 4, text: 'Dostanete tracking číslo pre sledovanie balíka' },
                  ].map(({ n, text }) => (
                    <li key={n} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {n}
                      </span>
                      <span className="text-gray-700 text-sm">{text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* KONTAKT */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center text-sm text-blue-800">
                <p className="font-semibold mb-1">Potrebujete pomoc?</p>
                <p>Email: <a href="mailto:phoneservissk@gmail.com" className="font-bold underline">phoneservissk@gmail.com</a></p>
                <p>Web: <a href="https://fixanto.sk" className="font-bold underline">fixanto.sk</a></p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  <Home className="w-5 h-5" /> Domov
                </button>
                <button onClick={() => navigate('/store')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
                  <ShoppingBag className="w-5 h-5" /> E-shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}