import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Load order details from localStorage
    const savedOrder = localStorage.getItem(`order-${orderId}`);
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, [orderId]);

  if (!orderDetails) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Načítavam objednávku...</p>
          </div>
        </div>
      </>
    );
  }

  const { cart, shipping, shippingPrice, total, formData } = orderDetails;

  const shippingLabels = {
    packeta: 'Packeta - Výdajné miesto',
    gls: 'GLS - Výdajné miesto',
    posta: 'Slovenská pošta',
  };

  // Generate QR code data URL (placeholder - replace with real QR generation)
  const qrCodeData = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23fff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23333'%3EQR KÓD%0AIBAN%0ASK31 1100 0000%0AVS: ${orderId}%3C/text%3E%3C/svg%3E`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Objednávka odoslaná</h1>
                <p className="text-green-100 text-lg">
                  Ďakujeme za Vašu objednávku číslo <span className="font-black">{orderId}</span>.
                </p>
              </div>
            </div>
            <p className="text-green-100">
              Rekapituláciu Vám zasielame aj e-mailom na <span className="font-bold">{formData.email}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Payment & Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Platba a doručenie */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CreditCard className="w-7 h-7 text-blue-600" />
                  Platba a doručenie
                </h2>

                <div className="space-y-6">
                  {/* Doprava */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Zvolená doprava:</p>
                    <p className="text-lg font-bold text-gray-900">{shippingLabels[shipping as keyof typeof shippingLabels]}</p>
                  </div>

                  {/* Platba */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Zvolená platba:</p>
                    <p className="text-lg font-bold text-gray-900">Prevodom na účet (platba vopred)</p>
                  </div>

                  {/* Suma */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Čiastka k úhrade:</p>
                    <p className="text-4xl font-black text-blue-600">€{total.toFixed(2)}</p>
                  </div>

                  {/* Bankové údaje */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Údaje na platbu:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-600 font-semibold">IBAN:</span>
                        <span className="font-mono font-bold text-gray-900">SK31 1100 0000 0029 4803 7511</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-600 font-semibold">Variabilný symbol:</span>
                        <span className="font-mono font-bold text-blue-600 text-xl">{orderId}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="text-gray-600 font-semibold">Suma:</span>
                        <span className="font-bold text-gray-900 text-xl">€{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-semibold">Príjemca:</span>
                        <span className="font-bold text-gray-900">Štefan Hupčík - Fixanto</span>
                      </div>
                    </div>
                  </div>

                  {/* Instrukcie */}
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-6 h-6 text-yellow-600" />
                      Ďalšie kroky:
                    </h3>
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                      <li>Zaplaťte pomocou QR kódu alebo bankovým prevodom</li>
                      <li>Po pripísaní platby vám zašleme zásielku</li>
                      <li>Sledujte stav zásielky cez tracking číslo v emaili</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Obsah objednávky */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Obsah objednávky</h2>
                
                <div className="space-y-4">
                  {cart.map((item: any) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {item.name} ({item.capacity})
                        </h3>
                        <p className="text-sm text-gray-600">{item.color}</p>
                        <p className="text-lg font-bold text-blue-600 mt-1">€{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">1 ks</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 mt-6 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Produkty:</span>
                    <span className="font-bold">€{(total - shippingPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Doprava:</span>
                    <span className="font-bold">€{shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-blue-600 pt-2 border-t-2">
                    <span>Celkom:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Kontakt */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Potrebujete pomoc?</h3>
                <p className="text-gray-700 mb-4">
                  Máte otázky k objednávke? Kontaktujte nás:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    📞 Telefón:{' '}
                    <a href="tel:0949344600" className="text-blue-600 hover:underline font-semibold">
                      0949 344 600
                    </a>
                  </p>
                  <p className="text-gray-700">
                    ✉️ Email:{' '}
                    <a href="mailto:phoneservissk@gmail.com" className="text-blue-600 hover:underline font-semibold">
                      phoneservissk@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    💬 WhatsApp:{' '}
                    <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                      Napísať správu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  QR kód na platbu
                </h3>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
                  <img
                    src={qrCodeData}
                    alt="QR kód"
                    className="w-full max-w-[200px] h-auto"
                  />
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Variabilný symbol:</p>
                  <p className="text-2xl font-black text-blue-600">{orderId}</p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Suma k úhrade:</p>
                  <p className="text-3xl font-black text-gray-900">€{total.toFixed(2)}</p>
                </div>

                <p className="text-xs text-gray-500 text-center mb-4">
                  Naskenujte QR kód v bankovej aplikácii alebo zaplaťte manuálne pomocou údajov vyššie
                </p>

                <Link
                  to="/store"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Pokračovať v nákupe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}