import { Phone, MapPin, Clock, Package, Star } from "lucide-react";

export default function Contact() {
  const reviews = [
    {
      id: 1,
      author: "Ľ. L.",
      rating: 5,
      text: "Oprava prebehla bez problémov, Fixanto Trenčín vrelo odporúčam."
    },
    {
      id: 2,
      author: "M. G.",
      rating: 5,
      text: "Rýchly servis, spokojnosť"
    },
    {
      id: 3,
      author: "M. M.",
      rating: 5,
      text: "Celkovo som bol veľmi spokojný. Oprava bola rýchla, detaily sa dali dohodnúť dopredu, všetko k mojej spokojnosti."
    },
    {
      id: 4,
      author: "N. V.",
      rating: 5,
      text: "Rýchle vybavenie, osobný prístup. 👍"
    }
  ];

  return (
    <section id="kontakt" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Kontaktujte nás
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Najrýchlejšie nás zastihnete cez <strong>WhatsApp</strong> alebo <strong>Facebook</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Ľavý stĺpec – kontaktné údaje v kartách */}
          <div className="flex">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 w-full p-7 sm:p-8 flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Kontaktné údaje
              </h3>

              <div className="space-y-4 flex-1">
                {/* Telefón */}
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                  <div className="flex-shrink-0 w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] uppercase tracking-wide text-blue-500 font-semibold">
                      Telefón
                    </p>
                    <a
                      href="tel:0949344600"
                      className="text-blue-700 hover:text-blue-800 font-semibold text-lg sm:text-xl"
                    >
                      0949 344 600
                    </a>
                  </div>
                </div>

                {/* Adresa */}
                <div className="flex items-start gap-3 bg-blue-50 rounded-xl px-4 py-3">
                  <div className="flex-shrink-0 w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] uppercase tracking-wide text-blue-500 font-semibold">
                      Adresa
                    </p>
                    <p className="text-gray-800 text-sm sm:text-base leading-snug">
                      <strong>Fixanto Trenčín</strong>
                      <br />
                      Servis, výkup, predaj mobilov
                      <br />
                      Dolná Súča 877
                      <br />
                      913 32 Dolná Súča
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                      (15 min. od centra Trenčína)
                    </p>
                  </div>
                </div>

                {/* Otváracie hodiny */}
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                  <div className="flex-shrink-0 w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] uppercase tracking-wide text-blue-500 font-semibold">
                      Otváracie hodiny
                    </p>
                    <p className="text-gray-800 text-sm sm:text-base">
                      <strong>Online:</strong> 24/7 (WhatsApp, Facebook)
                    </p>
                  </div>
                </div>

                {/* Vyzdvihnutie a doručenie */}
                <div className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                  <div className="flex-shrink-0 w-11 h-11 bg-green-600 text-white rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-[13px] uppercase tracking-wide text-green-600 font-semibold">
                      Vyzdvihnutie a doručenie
                    </p>
                    <p className="text-gray-800 text-sm sm:text-base">
                      Trenčín a okolie
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] sm:text-xs text-gray-500">príplatok</p>
                    <p className="font-bold text-green-600 text-lg sm:text-xl">+15€</p>
                  </div>
                </div>
              </div>

              {/* CTA tlačidlá */}
              <div className="mt-7 pt-5 border-t border-blue-100 space-y-3">
                <a
                  href="tel:0949344600"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  📞 Zavolať teraz
                </a>
                <a
                  href="https://wa.me/421949344600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 text-white text-center px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-600 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Pravá strana - Mapa + Recenzie */}
          <div className="flex flex-col gap-4">
            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100 flex flex-col w-full">
              <div className="w-full h-[360px] sm:h-[380px] lg:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.4168122230353!2d18.02851766968206!3d48.957703778799996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47149f2d2c46f0b3%3A0xa1aedf06402b0fc4!2zRml4YW50byBUcmVuxI3DrW4g4oCTIFNlcnZpcywgdsO9a3VwLCBwcmVkYWogbW9iaWxvdiwgZWxla3Ryb25pa3k!5e1!3m2!1ssk!2ssk!4v1764524066866!5m2!1ssk!2ssk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fixanto Trenčín - Mapa"
                ></iframe>
              </div>
              <div className="p-4 flex justify-center border-t border-gray-200 bg-white">
                <a
                  href="https://maps.app.goo.gl/GGBewDBR787dkxaC7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  📍 Otvoriť v Google Maps
                </a>
              </div>
            </div>

            {/* KOMPAKTNÉ RECENZIE */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-5">
              {/* Header s hviezdami */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-blue-600 text-blue-600" />
                  ))}
                </div>
                <div className="text-gray-900 font-black text-base sm:text-lg">
                  Overené spokojnými zákazníkmi
                </div>
              </div>

              {/* Kompaktný zoznam recenzií */}
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-blue-600 pl-3 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-snug">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">Overené recenzie z Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
