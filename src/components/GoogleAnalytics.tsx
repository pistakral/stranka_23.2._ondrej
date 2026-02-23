import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    setHasConsent(consent === 'accepted');
  }, []);

  if (!hasConsent) return null;

  return (
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XQ3BME152G"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });
          
          gtag('config', 'G-XQ3BME152G');
        `}
      </script>
    </Helmet>
  );
}
