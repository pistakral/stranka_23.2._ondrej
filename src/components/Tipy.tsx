import { Link } from 'react-router-dom';
import { ChevronDown, Download, Shield, Zap } from 'lucide-react';
import foto from '../assets/images/foto.png';

export default function Tipy() {
  const scrollToForm = () => {
    const formElement = document.querySelector('#form-section');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <section
      id="tipy"
      className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden"
      aria-labelledby="tipy-heading"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        {/* HERO SEKCIA */}
        <div className="text-center text-white mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 border-2 border-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl mb-6 group hover:scale-105 transition-all duration-300 mx-auto max-w-md">
            <span className="text-3xl group-hover:scale-110 transition-transform">📱</span>
            <span className="text-base sm:text-lg text-blue-50 font-semibold tracking-wide">
              Technici to používajú denne • Teraz zadarmo pre vás
            </span>
          </div>

          <h2 id="tipy-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight max-w-3xl mx-auto">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              7 TRIKOV
            </span>
            <br />
            <span className="text-white">SERVISNÝCH TECHNIKOV</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-blue-100">
              Ktoré vám uľahčia život a zachránia Vás v krízových situáciach
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
            Ušetrite{' '}
            <span className="font-bold text-yellow-300 text-2xl sm:text-3xl">150-400€ na opravách</span>
          </p>

          <button
            onClick={scrollToForm}
            className="group bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 text-slate-900 font-black text-base sm:text-lg py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all inline-flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            ODOMKNÚŤ 7 TRIKOV ZADARMO
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* MARKETINGOVÝ FLOW - VSETKO POD SEBOU (PC + MOBILE) */}
        <div className="space-y-8 max-w-3xl mx-auto">

          {/* 1. AUTORITA + 7 TRIKOV */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-6 lg:mb-8">
              <div className="lg:w-64 mb-6 lg:mb-0">
                <div className="relative group cursor-pointer w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm transform transition-all duration-500 group-hover:scale-110 group-hover:border-yellow-400 p-3">
                    <img
                      src={foto}
                      alt="Štefan Hupčík - Fixanto"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-white text-center lg:text-left lg:flex-1">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-white">Prečo vás to učím práve ja?</h3>
                <p className="text-lg sm:text-xl italic text-blue-200 mb-6 max-w-lg mx-auto lg:mx-0">
                  Neučte sa opravovať mobily od niekoho, kto sa telefónu dotkol len raz…
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Ahoj, volám sa <strong className="text-yellow-300 text-xl">Štefan Hupčík</strong>. Som servisný technik, ktorý denne rieši desiatky problémov s mobilmi a elektronikou pre zákazníkov Fixanto.
                </p>
                <p className="text-lg font-semibold">
                  Vidím, za čo ľudia zbytočne platia <strong className="text-yellow-300 text-xl">60–300 €</strong>, hoci by to vedeli vyriešiť sami za pár minút.
                </p>
              </div>
            </div>

            {/* 7 TRIKOV BOX */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 text-center hover:scale-105 transition-all duration-300 mt-8">
              <p className="font-black text-2xl sm:text-3xl mb-4 text-white">7 trikov = menej porúch, viac istoty</p>
              <p className="text-xl text-orange-100">Väčšina ľudí zaplatí za problém, ktorý by vyriešili za 5 minút. Vy to nemusíte.</p>
            </div>
          </div>

          {/* 2. ČO ZÍSKATE */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-200/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl sm:text-4xl font-black mb-6 text-yellow-300 text-center">
              Čo získate v týchto trikoch?
            </h3>
            <div className="text-center mb-8">
              <p className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                „Tipy, ktoré servisy radšej nehovoria"
              </p>
              <p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto">
                Overené postupy, ako zastaviť predčasné opotrebovanie a vyhnúť sa zbytočným opravám za stovky eur.
              </p>
            </div>

            {/* 5 TIPOV - UPRAVENÉ TEXTY */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-4 p-6 bg-white/15 backdrop-blur-sm rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="text-3xl font-black text-blue-300 mt-1 flex-shrink-0">✓</span>
                <span className="text-lg leading-relaxed">
                  Ako nabíjať telefón tak, aby batéria vydržala aj dvojnásobok bežnej životnosti.
                </span>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white/15 backdrop-blur-sm rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="text-3xl font-black text-blue-300 mt-1 flex-shrink-0">✓</span>
                <span className="text-lg leading-relaxed">
                  Čo spraviť, keď telefón „občas nabíja, občas nie" – bez rozoberania.
                </span>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white/15 backdrop-blur-sm rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="text-3xl font-black text-blue-300 mt-1 flex-shrink-0">✓</span>
                <span className="text-lg leading-relaxed">
                  Jednoduchý trik, ktorý vie zrýchliť spomalený telefón bez kupovania nového.
                </span>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white/15 backdrop-blur-sm rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <span className="text-3xl font-black text-blue-300 mt-1 flex-shrink-0">✓</span>
                <span className="text-lg leading-relaxed">
                  Vodeodolný neznamená vodotesný – čo robiť a NEROBIŤ po utopení telefónu.
                </span>
              </div>
              <div className="md:col-span-2 flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300 border border-white/30">
                <span className="text-3xl font-black mt-1 flex-shrink-0">⚡</span>
                <span className="text-lg leading-relaxed font-semibold">
                  Ako zálohovať kontakty, aby ste ich nestratili pri rozbití alebo strate telefónu.
                </span>
              </div>
            </div>
            {/* ŠTATISTIKY */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 rounded-xl p-6 mx-auto max-w-md hover:scale-105 transition-all duration-300">
                <p className="font-black text-xl sm:text-2xl mb-2">Už si to stiahlo viac ako 487 ľudí</p>
                <p className="text-lg">
                  Priemerná úspora: <span className="text-yellow-300 font-black text-xl sm:text-2xl">230€ za rok</span>
                </p>
              </div>
            </div>
          </div>

          {/* 3. BONUSY */}
          <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-300/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl sm:text-4xl font-black mb-6 text-yellow-300 text-center">
              Bonusy 🎁
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300">
                <p className="font-black text-xl mb-3">Bonus #1: Zvuky na čistenie reproduktorov</p>
                <p className="text-yellow-300 font-bold text-lg mb-3">Hodnota: 12,99 €</p>
                <p className="text-lg">3 špeciálne zvuky na vyčistenie reproduktorov od vody a nečistôt.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300">
                <p className="font-black text-xl mb-3">Bonus #2: Video návody na čistenie telefónu</p>
                <p className="text-yellow-300 font-bold text-lg mb-3">Hodnota: 12,00 €</p>
                <p className="text-lg">Krátke návody na čistenie horného/spodného reproduktoru a nabíjacieho konektora.</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center text-slate-900 mx-auto max-w-lg">
              <p className="font-black text-xl mb-3">Dostaneš:</p>
              <p className="text-lg mb-4 text-center">
                • PDF: 7 trikov (15,00 €)<br/>
                • Zvuky na čistenie (12,99 €)<br/>
                • Video návody (12,00 €)
              </p>
              <p className="font-black text-2xl sm:text-3xl">Spolu: 39,99 € – všetko ZADARMO!</p>
            </div>
          </div>

          {/* 4. FORM SECTION - OPRAVENÝ PRE IPHONE */}
          <div id="form-section" className="scroll-mt-4">
            
            {/* CTA NAD FORMULÁROM */}
            <div className="text-center mb-8">
              <p className="text-4xl sm:text-5xl mb-4 animate-bounce">👇</p>
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-slate-900 px-6 py-4 rounded-2xl font-black text-xl sm:text-2xl shadow-2xl mx-auto max-w-md mb-6">
                🔓 Odomkni 7 trikov zadarmo
              </div>
            </div>

            {/* FORMULÁR - ZJEDNODUŠENÝ PRE IPHONE */}
            <div className="mx-auto max-w-md">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                <iframe
                  src="https://preview.mailerlite.io/forms/1953614/172475491924575429/share"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  scrolling="yes"
                  style={{ 
                    border: 'none',
                    display: 'block',
                    minHeight: '800px',
                    maxHeight: '1000px'
                  }}
                  title="E-book formulár"
                  allow="autoplay"
                />
              </div>
            </div>
          </div>

          {/* 5. VÝKUP APPLE - CTA na konci */}
          <Link
            to="/vykup-apple"
            className="block bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-xl overflow-hidden relative hover:shadow-2xl transition-all hover:scale-105 duration-300 text-center p-8"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-8 text-6xl animate-pulse">🍎</div>
              <div className="absolute bottom-4 left-8 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>🍎</div>
            </div>
            <div className="relative text-white">
              <div className="inline-flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full mb-6 mx-auto max-w-sm">
                <span className="text-yellow-400 text-2xl">💰</span>
                <span className="text-sm sm:text-base font-bold uppercase tracking-wide">Férové výkupné ceny</span>
              </div>
              <h3 className="font-black text-2xl sm:text-3xl mb-4 leading-tight">
                Prečo hádzať prachy do koša? Váš starý iPhone má hodnotu!
              </h3>
              <p className="text-xl text-orange-100 mb-6">
                Vykúpime aj rozbité Apple zariadenia. <strong>Hotovosť OKAMŽITE!</strong>
              </p>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 py-4 px-8 rounded-xl font-black text-xl mx-auto max-w-sm">
                💰 Koľko stojí môj Apple?
              </div>
              <p className="text-orange-100 text-sm sm:text-base mt-4">
                iPhone MacBook iPad AirPods
              </p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
