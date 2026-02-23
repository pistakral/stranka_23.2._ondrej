import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Facebook, Instagram } from 'lucide-react';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import Navbar from '../components/Navbar';
import uvodna1 from '../assets/images/uvodna1.jpg';
import uvodna2 from '../assets/images/uvodna2.jpg';
import uvodna3 from '../assets/images/uvodna3.jpg';
import uvodna4 from '../assets/images/uvodna4.jpg';
import uvodna5 from '../assets/images/uvodna5.jpg';
import rozobraty from '../assets/images/rozobraty.jpg';

function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [uvodna2, uvodna3, uvodna4, uvodna5, rozobraty];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 w-[320px] h-[400px] rounded-2xl overflow-hidden shadow-2xl border-3 border-white/30">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Servis ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1.5 rounded-full">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentImage ? 'bg-white w-6' : 'bg-white/50 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

export default function Hero() {
  return (
    <>
      <GoogleAnalytics />
      <ScrollToTop />
      <Navbar />
      
      <section
        id="hero"
        className="min-h-screen relative text-white overflow-hidden pt-16 pb-32 flex items-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${uvodna1})`,
            filter: 'brightness(0.4) blur(1px)',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-950/85" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

        <ImageCarousel />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="text-center mx-auto max-w-4xl">
            
            <h1 className="mb-3 sm:mb-4 drop-shadow-2xl" style={{fontFamily: '"Inter", "Helvetica Neue", system-ui, -apple-system, sans-serif'}}>
              <span className="block text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
                Servis mobilov a elektroniky
              </span>
              <span className="block text-yellow-400 mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                v Trenčíne
              </span>
            </h1>

            <p className="text-blue-100 text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
              iPhone | Samsung | Xiaomi | TV | Notebooky
            </p>

            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-relaxed">
              Rozbitý displej? Pokazená TV? Pomalý notebook?
            </p>

            <p className="text-blue-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-semibold max-w-2xl mx-auto drop-shadow-lg">
              Napíšte a poradíme vám rýchlo online.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-8 max-w-3xl mx-auto">
              <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 shadow-xl inline-flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-white text-sm sm:text-base font-bold">2 roky záruka na diely</span>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 shadow-xl inline-flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span className="text-white text-sm sm:text-base font-bold">Náhradný telefón počas opravy zadarmo</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8">
              <a
                href="https://wa.me/421949344600"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl shadow-2xl hover:bg-green-600 transition transform hover:scale-110"
              >
                <MessageCircle className="w-6 h-6" />
                Napísať na WhatsApp
              </a>

              <a
                href="tel:0949344600"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-110"
              >
                📞 Zavolať: 0949 344 600
              </a>
            </div>

            <p className="text-sm sm:text-base text-blue-100 mb-6 bg-black/40 backdrop-blur-sm inline-block px-4 py-2 rounded-lg leading-relaxed">
              📍 <strong className="text-white">Trenčín a okolie</strong>
              <span className="text-xs sm:text-sm text-blue-200 block sm:inline mt-1 sm:mt-0 sm:ml-1">
                (Dubnica, Ilava, Nemšová, Dolná Súča, Horná Súča)
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl mx-auto">
              <Link
                to="/tipy"
                className="bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 backdrop-blur-sm text-blue-900 px-4 py-3 rounded-lg font-bold text-sm shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition-all hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🎁</span>
                  <div className="text-left">
                    <div className="text-sm font-black">7 TRIKOV ZADARMO</div>
                    <div className="text-xs font-normal text-blue-800">Predĺžte životnosť o 3 roky</div>
                  </div>
                </div>
              </Link>

              <Link
                to="/vykup-apple"
                className="bg-gradient-to-r from-orange-500/90 to-red-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-bold text-sm shadow-lg hover:from-orange-400 hover:to-red-500 transition-all hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🍎</span>
                  <div className="text-left">
                    <div className="text-sm font-black">VÝKUP APPLE</div>
                    <div className="text-xs font-normal text-orange-100">iPhone, MacBook, iPad</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <a
                href="https://www.facebook.com/fixanto/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-semibold text-xs shadow transition hover:bg-blue-600/70"
              >
                <Facebook className="w-3.5 h-3.5" />
                Facebook
              </a>

              <a
                href="https://www.instagram.com/opravamobilov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-semibold text-xs shadow transition hover:from-pink-500/70 hover:via-red-500/70 hover:to-yellow-500/70"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <CookieBanner />
    </>
  );
}
