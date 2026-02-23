import { Zap, Shield, Smartphone, MessageCircle, CheckCircle, Gift, Wrench } from 'lucide-react';

export default function Benefits() {
  return (
    <section id="vyhody" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NADPIS */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Prečo Fixanto?
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* 3 BENEFITY - KOMPAKTNÉ HORIZONTÁLNE KARTY */}
        <div className="grid grid-cols-1 gap-3 mb-10 max-w-3xl mx-auto">
          
          {/* BENEFIT 1 - MODRÁ */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-black mb-0.5">
                Rýchla oprava
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Väčšina opráv v ten istý deň, displej za 1–2 hodiny
              </p>
            </div>
          </div>

          {/* BENEFIT 2 - ZELENÁ */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-black mb-0.5">
                2 roky záruka
              </h3>
              <p className="text-xs sm:text-sm text-green-100">
                2 roky na diely, 3 mesiace na prácu
              </p>
            </div>
          </div>

          {/* BENEFIT 3 - ORANŽOVÁ */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-black mb-0.5">
                Náhradný telefón
              </h3>
              <p className="text-xs sm:text-sm text-orange-100">
                Telefón zadarmo počas opravy
              </p>
            </div>
          </div>

        </div>

        {/* AKO TO FUNGUJE - INTEGROVANÉ */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Ako prebieha oprava?
            </h3>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* ZELENÝ BANNER – DIAGNOSTIKA (zostáva zelený - pasuje k "zadarmo") */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-5 sm:p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Gift className="w-8 h-8 text-yellow-300" />
              </div>
              <h4 className="text-lg sm:text-xl font-black mb-2">
                Diagnostika ZADARMO pri oprave
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed mb-2">
                Po diagnostike vám povieme cenu a vy sa rozhodnete.
                Ak sa rozhodnete pre opravu u nás, diagnostiku neplatíte – platíte <strong>iba za opravu</strong>.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 bg-white/15 rounded-lg px-3 py-1.5">
                <CheckCircle className="w-4 h-4" />
                <span className="font-bold text-xs sm:text-sm">Férové ceny</span>
              </div>
            </div>
            <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2">
              💡 Ak sa rozhodnete neopravovať, diagnostika stojí 15 € za náš čas a prácu.
            </p>
          </div>

          {/* 3 KROKY - NOVÉ FARBY BEZ DUPLICÍT */}
          <div className="space-y-3 mb-6">
            
            {/* KROK 1 - INDIGO (namiesto modrá) */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white">
                1
              </div>
              <div className="text-white flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <MessageCircle className="w-4 h-4" />
                  <h4 className="text-sm sm:text-base font-black">
                    Napíšte alebo zavolajte
                  </h4>
                </div>
                <p className="text-xs text-indigo-100">
                  WhatsApp, Facebook alebo telefonicky
                </p>
              </div>
            </div>

            {/* KROK 2 - FIALOVÁ (zostáva) */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white">
                2
              </div>
              <div className="text-white flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <CheckCircle className="w-4 h-4" />
                  <h4 className="text-sm sm:text-base font-black">
                    Dohodneme opravu
                  </h4>
                </div>
                <p className="text-xs text-purple-100">
                  Povieme cenu a termín. Zariadenie prinesiete alebo vyzdvihneme
                </p>
              </div>
            </div>

            {/* KROK 3 - TEAL (namiesto zelená) */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white">
                3
              </div>
              <div className="text-white flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <Wrench className="w-4 h-4" />
                  <h4 className="text-sm sm:text-base font-black">
                    Opravíme a odovzdáme
                  </h4>
                </div>
                <p className="text-xs text-teal-100">
                  Väčšina opráv v ten istý deň. Displej za 1–2 hodiny
                </p>
              </div>
            </div>

          </div>

          {/* CTA - EMERALD (odlíšený od ostatných zelených) */}
          <div className="text-center">
            <a
              href="https://wa.me/421949344600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-black text-base sm:text-lg shadow-xl hover:bg-emerald-600 transition transform hover:scale-110"
            >
              <MessageCircle className="w-5 h-5" />
              Napíšte nám na WhatsApp
            </a>
            <p className="text-xs sm:text-sm text-gray-600 mt-3">
              Odpovieme čo najskôr a dohodneme ďalší postup.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
