import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { ChevronUp, MessageCircle, Phone } from 'lucide-react';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';

export default function VykupApplePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ✅ GOOGLE ANALYTICS */}
      <GoogleAnalytics />

      {/* ✅ MINIMÁLNY NAVBAR NA MOBILE */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-md backdrop-blur-sm bg-opacity-90">
        <div className="px-4 py-3">
          <Link 
            to="/" 
            className="text-white font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <span className="text-3xl">🔧</span>
            Fixanto
          </Link>
        </div>
      </div>

      {/* PLNÝ NAVBAR NA DESKTOP */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white pt-20 lg:pt-0">
        
        {/* HERO SEKCIA */}
        <section className="py-20 sm:py-28 lg:pt-32 relative overflow-hidden">
          {/* Apple logo efekt v pozadí */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 text-9xl animate-pulse">🍎</div>
            <div className="absolute bottom-10 left-10 text-9xl animate-pulse" style={{ animationDelay: '1s' }}>🍎</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] animate-pulse" style={{ animationDelay: '2s' }}>🍎</div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
            
            {/* Hlavný nadpis */}
            <div className="mb-12">
              <div className="inline-block bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-black px-10 py-5 rounded-full font-black text-3xl mb-8 shadow-2xl hover:scale-105 transition-transform">
                🍎 VÝKUP APPLE ZARIADENÍ 🍎
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Máte doma starý <span className="text-red-500">POŠKODENÝ</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300">
                  iPhone, MacBook alebo iPad?
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8">
                Kúpime ho od vás za férovú cenu - aj keď je rozbitý!
              </p>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Neváhajte a premeňte svoje staré Apple zariadenie na hotovosť. 
                Ponuku dostanete za pár minút - stačí nám poslať fotky.
              </p>
            </div>

            {/* CTA tlačidlá */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="https://wa.me/421949344600?text=Ahoj,%20chcel%20by%20som%20predať%20Apple%20zariadenie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-black text-2xl shadow-2xl hover:from-green-600 hover:to-green-700 transition transform hover:scale-105"
              >
                <MessageCircle className="w-8 h-8" />
                Napísať na WhatsApp
              </a>
              <a
                href="tel:0949344600"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-400 to-gray-500 text-black px-10 py-5 rounded-xl font-black text-2xl shadow-2xl hover:from-gray-300 hover:to-gray-400 transition transform hover:scale-105"
              >
                <Phone className="w-8 h-8" />
                Zavolať: 0949 344 600
              </a>
            </div>

          </div>
        </section>

        {/* APPLE PRODUKTY GRID */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">
              Ktoré zariadenia vykupujeme?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              
              {/* iPhone */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:from-gray-600 hover:to-gray-700 transition transform hover:scale-105 shadow-2xl border border-gray-600">
                <div className="text-7xl mb-4">📱</div>
                <h3 className="text-3xl font-black mb-3 text-yellow-400">iPhone</h3>
                <p className="text-gray-300 mb-4 font-semibold">Od iPhone 8 (2017) až po iPhone 17 Pro Max</p>
                <ul className="text-sm text-gray-400 space-y-1 text-left">
                  <li>✓ Rozbitý displej</li>
                  <li>✓ Nefunkčný</li>
                  <li>✓ Utopený</li>
                  <li>✓ Slabá batéria</li>
                </ul>
              </div>

              {/* MacBook */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:from-gray-600 hover:to-gray-700 transition transform hover:scale-105 shadow-2xl border border-gray-600">
                <div className="text-7xl mb-4">💻</div>
                <h3 className="text-3xl font-black mb-3 text-yellow-400">MacBook</h3>
                <p className="text-gray-300 mb-4 font-semibold">Air, Pro - od roku 2016</p>
                <ul className="text-sm text-gray-400 space-y-1 text-left">
                  <li>✓ Poškodený displej</li>
                  <li>✓ Nefunkčný</li>
                  <li>✓ Problém s WiFi/Bluetooth</li>
                  <li>✓ Utopený</li>
                </ul>
              </div>

              {/* Apple Watch */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:from-gray-600 hover:to-gray-700 transition transform hover:scale-105 shadow-2xl border border-gray-600">
                <div className="text-7xl mb-4">⌚</div>
                <h3 className="text-3xl font-black mb-3 text-yellow-400">Apple Watch</h3>
                <p className="text-gray-300 mb-4 font-semibold">Všetky série (1-10, Ultra)</p>
                <ul className="text-sm text-gray-400 space-y-1 text-left">
                  <li>✓ Rozbitý displej</li>
                  <li>✓ Nefunkčné</li>
                  <li>✓ Poškriabané</li>
                  <li>✓ Stará batéria</li>
                </ul>
              </div>

              {/* iPad */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:from-gray-600 hover:to-gray-700 transition transform hover:scale-105 shadow-2xl border border-gray-600">
                <div className="text-7xl mb-4">📱</div>
                <h3 className="text-3xl font-black mb-3 text-yellow-400">iPad</h3>
                <p className="text-gray-300 mb-4 font-semibold">Od iPad Air 2 (2014) - Mini, Air, Pro</p>
                <ul className="text-sm text-gray-400 space-y-1 text-left">
                  <li>✓ Rozbitý displej</li>
                  <li>✓ Nefunkčný</li>
                  <li>✓ Ohnutý</li>
                  <li>✓ Nefunguje nabíjanie</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* AKO TO FUNGUJE */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">
              Ako to funguje?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-black shadow-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3">Pošlite fotky</h3>
                <p className="text-gray-400">
                  Odfotite zariadenie zo všetkých strán a pošlite nám na WhatsApp
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-black text-black shadow-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3">Dostanete ponuku</h3>
                <p className="text-gray-400">
                  Za pár minút vám pošleme ponuku na výkup
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-black shadow-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3">Dostanete peniaze</h3>
                <p className="text-gray-400">
                  Prevezmeme osobne, alebo pošlete poštou a ihneď zaplatíme
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ANDROID INFO */}
        <section className="py-12 bg-blue-900/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-blue-900/50 border-2 border-blue-700 rounded-2xl p-8 text-center">
              <h3 className="text-3xl font-black mb-4">📱 Android zariadenia</h3>
              <p className="text-xl text-blue-200">
                Vykupujeme len poškodené zariadenia novšie ako 3 roky
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-12">
              Časté otázky
            </h2>
            <div className="space-y-6">
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3">💰 Ako zistím, koľko mi zaplatíte?</h3>
                <p className="text-gray-400">
                  Stačí nám poslať fotky zariadenia a popis stavu. Ponuku dostanete za pár minút.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3">📦 Ako vám zariadenie doručím?</h3>
                <p className="text-gray-400">
                  Môžete prísť osobne do servisu v Trenčíne alebo poslať poštou (po dohode).
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3">🔒 Čo s mojimi dátami?</h3>
                <p className="text-gray-400">
                  Zariadenia idú vymazať z iCloud účtu aj na diaľku. Ak sú nefunkčné, vymazanie údajov zabezpečíme my, prípadne spolu so zálohovaním na USB/iCloud.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ZÁVEREČNÉ CTA */}
        <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Neváhajte a kontaktujte nás ešte dnes!
            </h2>
            <p className="text-2xl mb-10 text-green-100">
              Premeňte svoje staré Apple zariadenie na hotovosť za pár minút
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/421949344600?text=Ahoj,%20chcel%20by%20som%20predať%20Apple%20zariadenie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-green-800 px-10 py-5 rounded-xl font-black text-2xl shadow-2xl hover:bg-green-50 transition transform hover:scale-105"
              >
                <MessageCircle className="w-8 h-8" />
                Napísať na WhatsApp
              </a>
              <a
                href="tel:0949344600"
                className="inline-flex items-center gap-3 bg-yellow-400 text-green-900 px-10 py-5 rounded-xl font-black text-2xl shadow-2xl hover:bg-yellow-300 transition transform hover:scale-105"
              >
                <Phone className="w-8 h-8" />
                Zavolať: 0949 344 600
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ✅ COOKIE BANNER KOMPONENT */}
      <CookieBanner />

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 md:bottom-8 md:right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-7 h-7" />
        </button>
      )}
    </>
  );
}
