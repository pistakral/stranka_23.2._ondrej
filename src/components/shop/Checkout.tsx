import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../Navbar';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  
  const [shipping, setShipping] = useState<'packeta' | 'gls' | 'posta'>('packeta');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
  });

  const shippingPrices = {
    packeta: 5.50,
    gls: 7,
    posta: 7,
  };

  const shippingLabels = {
    packeta: 'Packeta',
    gls: 'GLS',
    posta: 'Slovenská pošta',
  };

  const shippingPrice = shippingPrices[shipping];
  const total = totalPrice + shippingPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = Date.now().toString();

    // Save order details to localStorage for confirmation page
    const orderDetails = {
      orderId,
      cart,
      shipping,
      shippingPrice,
      total,
      formData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`order-${orderId}`, JSON.stringify(orderDetails));

    // Email content for admin
    const adminEmailBody = `
NOVÁ OBJEDNÁVKA Z FIXANTO E-SHOPU
═══════════════════════════════════

ČÍSLO OBJEDNÁVKY: #${orderId}
DÁTUM: ${new Date().toLocaleString('sk-SK')}

PRODUKTY:
${cart.map(item => `• ${item.name} (${item.capacity}) ${item.color} - €${item.price}`).join('\n')}

SÚČET PRODUKTOV: €${totalPrice.toFixed(2)}
DOPRAVA (${shippingLabels[shipping]}): €${shippingPrice.toFixed(2)}
CELKOM K ÚHRADE: €${total.toFixed(2)}

ZÁKAZNÍK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Meno: ${formData.name}
Email: ${formData.email}
Telefón: ${formData.phone}
Adresa: ${formData.city}, ${formData.zip}

PLATBA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spôsob: Prevodom (QR kód)
IBAN: SK31 1100 0000 0029 4803 7511
Variabilný symbol: ${orderId}
Suma: €${total.toFixed(2)}

QR kód na platbu bol odoslaný zákazníkovi na email.
Po úhrade zásielku pripravte a odošlite cez ${shippingLabels[shipping]}.
    `.trim();

    // Email content for customer
    const customerEmailBody = `
Ďakujeme za objednávku!
═══════════════════════════════════

ČÍSLO OBJEDNÁVKY: #${orderId}

Produkty:
${cart.map(item => `${item.name} (${item.capacity}) ${item.color} - €${item.price}`).join('\n')}

Doprava: ${shippingLabels[shipping]} - €${shippingPrice.toFixed(2)}
Celkom: €${total.toFixed(2)}

PLATBA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zaplaťte prosím bankovým prevodom:

IBAN: SK31 1100 0000 0029 4803 7511
Variabilný symbol: ${orderId}
Suma: €${total.toFixed(2)}
Príjemca: Štefan Hupčík - Fixanto

Po pripísaní platby vám pošleme zásielku.

Kontakt:
📞 0949 344 600
✉️ phoneservissk@gmail.com
💬 WhatsApp: wa.me/421949344600

S pozdravom,
Fixanto tím
    `.trim();

    // Send emails using MailerLite or simple mailto (fallback)
    try {
      // Simple email notification (you can replace with actual API call)
      console.log('Admin email:', adminEmailBody);
      console.log('Customer email:', customerEmailBody);

      // TODO: Implement actual email sending via MailerLite API or EmailJS
      // Example with EmailJS:
      // await emailjs.send('service_id', 'template_id', {
      //   to_email: 'phoneservissk@gmail.com',
      //   customer_email: formData.email,
      //   order_details: adminEmailBody,
      // });

    } catch (error) {
      console.error('Email sending failed:', error);
    }

    // Clear cart and redirect
    clearCart();
    navigate(`/store/confirmation/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Váš košík je prázdny</h1>
            <button
              onClick={() => navigate('/store')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Pokračovať v nákupe
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Dokončenie objednávky</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Doprava
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'packeta', label: 'Packeta', price: 5.50 },
                    { value: 'gls', label: 'GLS', price: 7 },
                    { value: 'posta', label: 'Slovenská pošta', price: 7 },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all"
                      style={{
                        borderColor: shipping === option.value ? '#2563eb' : '#e5e7eb',
                      }}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.value}
                        checked={shipping === option.value}
                        onChange={(e) => setShipping(e.target.value as any)}
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-gray-900">{option.label}</span>
                        <span className="text-gray-500 ml-2">Doručenie 1-2 dni</span>
                      </div>
                      <span className="font-bold text-blue-600">€{option.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Payment */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Platba
                </h2>
                <div className="p-4 border-2 border-blue-600 rounded-xl bg-blue-50">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked readOnly className="w-5 h-5" />
                    <div className="flex-1">
                      <span className="font-bold text-gray-900">Prevodom cez QR kód</span>
                      <p className="text-sm text-gray-600 mt-1">
                        QR kód na platbu vám príde na email
                      </p>
                    </div>
                    <span className="font-bold text-green-600">ZADARMO</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Customer Info */}
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Vaše údaje
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefón *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mesto *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PSČ *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Odoslať objednávku
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Zhrnutie objednávky</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.capacity} • {item.color}</p>
                        <p className="text-sm font-bold text-blue-600">€{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Produkty:</span>
                    <span className="font-bold">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Doprava ({shippingLabels[shipping]}):</span>
                    <span className="font-bold">€{shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Platba:</span>
                    <span className="font-bold text-green-600">ZADARMO</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Celkom k úhrade:</span>
                    <span className="text-blue-600">€{total.toFixed(2)}</span>
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