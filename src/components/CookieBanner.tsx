import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  useEffect(() => {
    // Skontrolujeme localStorage hneď pri načítaní
    const consent = localStorage.getItem('cookieConsent');
    
    // Ak už je rozhodnuté, banner vôbec nezobrazujeme
    const banner = document.getElementById('cookie-banner-fixanto');
    if (!banner) return;
    
    if (consent) {
      banner.style.display = 'none';
      
      // Ak bol accepted, zapneme GA
      if (consent === 'accepted' && typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    } else {
      banner.style.display = 'block';
    }
  }, []);

  const handleAccept = () => {
    // 1. OKAMŽITE skryť banner - priamy DOM
    const banner = document.getElementById('cookie-banner-fixanto');
    if (banner) {
      banner.style.display = 'none';
    }
    
    // 2. Uložiť do localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    
    // 3. Povoliť Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleReject = () => {
    // 1. OKAMŽITE skryť banner
    const banner = document.getElementById('cookie-banner-fixanto');
    if (banner) {
      banner.style.display = 'none';
    }

    // 2. Uložiť do localStorage
    localStorage.setItem('cookieConsent', 'rejected');
    
    // 3. Zamietnuť Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  // VŽDY renderujeme, ale kontrolujeme cez CSS display
  return (
    <div 
      id="cookie-banner-fixanto"
      style={{ display: 'none' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-6 sm:p-4 shadow-lg md:text-sm text-base"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-300 text-center sm:text-left leading-relaxed">
          Tento web používa súbory cookie. Ďalším prechádzaním tohto webu vyjadrujete súhlas s ich používaním. 
          Viac informácií{' '}
          <Link
            to="/ochrana-osobnych-udajov"
            className="underline hover:text-white font-semibold"
          >
            tu
          </Link>.
        </p>
        <div className="flex gap-3 whitespace-nowrap">
          <button
            type="button"
            onClick={handleReject}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Odmietnuť
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Súhlasím
          </button>
        </div>
      </div>
    </div>
  );
}
