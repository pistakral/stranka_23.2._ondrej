import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import { ChevronUp, ChevronDown, Download, Shield, Zap, ArrowRight, Flame } from 'lucide-react';
import rozopraty from '../assets/images/rozobraty.jpg';
import foto from '../assets/images/foto.png';

export default function TipyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById('form-section');
    if (formElement) {
      const formTop = formElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: formTop - 100,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <>
      <GoogleAnalytics />

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="px-4 py-3">
          <Link
            to="/"
            className="text-white font-bold text-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 w-full justify-center sm:justify-start"
          >
            <span className="text-3xl">🔧</span> Fixanto
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="min-h-screen">

        {/* HERO - S ROZOBRATÝM TELEFÓNOM */}
        <section
          id="hero-section"
          className="pt-16 sm:pt-20 pb-8 lg:pt-28 lg:pb-16 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(59,130,246,0.85) 50%, rgba(147,51,234,0.9) 100%), url(${rozopraty})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/30 to-indigo-900/40 backdrop-blur-sm"></div>

          <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 border-2 border-white/20 backdrop-blur-xl px-8 py-6 sm:py-7 rounded-2xl shadow-2xl mb-6 max-w-lg mx-auto group hover:scale-105 transition-all duration-300">
              <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">📱</span>
              <span className="text-lg sm:text-xl text-blue-50 font-semibold tracking-wide leading-tight">
                Technici to používajú denne • Teraz zadarmo pre vás
              </span>
            </div>

            {/* Headline - TVOJE ÚPRAVY */}
            <div className="space-y-3 mb-8 px-2 sm:px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl leading-tight tracking-tight">
                7 TRIKOV
                <br className="sm:hidden" />
                <span className="block text-5xl sm:text-6xl lg:text-[4rem]">SERVISNÝCH TECHNIKOV</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-lg mt-4">
                Ktoré vám uľahčia život a zachránia Vás v krízových situáciach
              </p>

              <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-lg">
                Ušetrite{' '}
                <span className="font-bold text-yellow-300 block text-2xl sm:text-3xl lg:text-4xl drop-shadow-2xl">150-400€ na opravách</span>
              </p>
            </div>

            {/* CTA */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
              <button
                onClick={scrollToForm}
                className="group w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 text-slate-900 font-black text-lg sm:text-xl py-6 sm:py-7 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 backdrop-blur-md border-4 border-yellow-300/50"
              >
                <Download className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
                <span>ODOMKNÚŤ 7 TRIKOV ZADARMO</span>
                <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-y-1 transition-transform flex-shrink-0 ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* ŠTEFAN SEKCIA - HNEĎ PO HERO */}
        <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-700/50 shadow-2xl text-white">
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 leading-tight text-center">
                Prečo vás to učím práve ja?
              </h2>

              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-6">
                {/* FOTKA */}
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

                {/* TEXT */}
                <div className="lg:flex-1 space-y-4 text-base sm:text-lg leading-relaxed">
                  <p className="italic text-blue-200">
                    Neučte sa opravovať mobily od niekoho, kto sa telefónu dotkol len raz…
                  </p>

                  <p>
                    Ahoj, volám sa <strong className="text-yellow-300 text-xl">Štefan Hupčík</strong>. Som zakladateľ servisu Fixanto a servisný technik, ktorý denne rieši desiatky problémov s mobilmi a elektronikou.
                  </p>

                  <p className="text-xl sm:text-2xl font-semibold">
                    Vidím, za čo ľudia zbytočne platia <strong className="text-yellow-300 text-xl sm:text-2xl">60–300 €</strong>, hoci by to vedeli vyriešiť doma za pár minút.
                  </p>
                </div>
              </div>

              {/* ORANŽOVÝ BOX */}
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 mt-8">
                <p className="font-black text-xl sm:text-2xl lg:text-3xl mb-3 leading-tight">
                  7 trikov = menej porúch, menej nervov, menej účtov zo servisu
                </p>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-orange-100">
                  Väčšina ľudí zaplatí za problém, ktorý by vyriešili za 5 minút. Vy nie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEKCIA - ČO ZÍSKATE V TRIKOCH */}
        <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-blue-200/50 shadow-2xl">

              <div className="max-w-3xl mx-auto space-y-5 text-center">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl leading-tight mb-4">
                  Čo získate v týchto trikoch?
                </h2>

                <div className="bg-gradient-to-r from-slate-900/5 to-blue-900/5 backdrop-blur-xl border-2 border-indigo-200/50 rounded-2xl p-6 sm:p-10 shadow-xl">
                  <p className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-5 leading-tight drop-shadow-lg">
                    „Tipy, ktoré servisy radšej nehovoria"
                  </p>

                  <p className="text-base sm:text-2xl text-slate-800 font-semibold mb-6 leading-relaxed">
                    Presné postupy, ako zastaviť predčasné opotrebovanie a vyhnúť sa zbytočným opravám za stovky eur.
                  </p>

                  {/* 5 TIPOV - GRID DIZAJN */}
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
                  {/* ZELENÝ BOX */}
                  <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-emerald-400/50 hover:scale-105 transition-all duration-300 group">
                    <p className="font-black text-xl sm:text-2xl lg:text-3xl mb-3 leading-tight group-hover:scale-105 transition-transform">
                      Už si to stiahlo viac ako 487 ľudí
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                      Priemerná úspora: <span className="text-yellow-300 text-lg sm:text-xl font-black drop-shadow-lg">230€ za rok</span> podľa našich zákazníkov
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEKCIA - BONUSY */}
        <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-purple-300/30 shadow-2xl hover:scale-105 transition-all duration-300">
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 text-center text-white drop-shadow-2xl">
                Bonusy 🎁
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8 text-white">
                <div className="bg-white/10 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20">
                  <p className="font-black text-xl sm:text-2xl mb-3">Bonus #1: Zvuky na čistenie reproduktorov</p>
                  <p className="text-yellow-300 font-bold text-lg sm:text-xl mb-3">Hodnota: 12,99 €</p>
                  <p className="text-base sm:text-lg leading-relaxed">3 špeciálne zvuky na vyčistenie reproduktorov od vody a nečistôt.</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20">
                  <p className="font-black text-xl sm:text-2xl mb-3">Bonus #2: Video návody na čistenie telefónu</p>
                  <p className="text-yellow-300 font-bold text-lg sm:text-xl mb-3">Hodnota: 12,00 €</p>
                  <p className="text-base sm:text-lg leading-relaxed">Krátke návody na čistenie horného/spodného reproduktoru a nabíjacieho konektora.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center text-slate-900 mx-auto max-w-2xl shadow-2xl hover:scale-105 transition-all duration-300">
                <p className="font-black text-xl sm:text-2xl mb-4">Dostaneš:</p>
                <p className="text-base sm:text-lg lg:text-xl mb-6 leading-relaxed">
                  • PDF: 7 trikov (15,00 €)<br/>
                  • Zvuky na čistenie (12,99 €)<br/>
                  • Video návody (12,00 €)
                </p>
                <p className="font-black text-2xl sm:text-3xl lg:text-4xl drop-shadow-xl">Spolu: 39,99 € – všetko ZADARMO!</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM SECTION */}
        <section
          id="form-section"
          className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
          style={{
            backgroundImage: `url(${rozopraty})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70 sm:bg-slate-900/65 lg:bg-slate-900/55"></div>

          {/* MOBILNÁ VERZIA */}
          <div className="lg:hidden relative z-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6 sm:space-y-8 text-white">

              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-black leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Zadaj email a dostaneš 7 trikov ZADARMO
                </h2>
              </div>

              {/* CTA NAD FORMULÁROM */}
              <div className="text-center mb-8">
                <p className="text-4xl sm:text-5xl mb-4 animate-bounce">👇</p>
                <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-slate-900 px-6 py-4 rounded-2xl font-black text-xl sm:text-2xl shadow-2xl mx-auto max-w-md mb-6">
                  🔓 Odomkni 7 trikov zadarmo
                </div>
              </div>

              {/* FORMULÁR - OPRAVENÝ PRE IPHONE */}
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

              {/* VÝKUP MOBILOV - PLNÁ ŠÍRKA */}
              <div className="w-full mt-8">
                <Link
                  to="/vykup-apple"
                  className="group block bg-gradient-to-br from-orange-500 via-red-500/90 to-orange-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-orange-400/30"
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-4 text-4xl sm:text-6xl animate-pulse">🍎</div>
                    <div className="absolute bottom-2 left-4 text-4xl sm:text-6xl animate-pulse" style={{ animationDelay: '1s' }}>
                      🍎
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-8">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-2.5 rounded-full mb-6 mx-auto max-w-max shadow-lg hover:scale-105 transition-all group-hover:scale-105">
                      <span className="text-yellow-400 text-lg sm:text-xl drop-shadow-lg">💰</span>
                      <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wide drop-shadow-md">
                        Férové výkupné ceny
                      </span>
                    </div>

                    <h3 className="text-white font-black text-lg sm:text-xl lg:text-2xl mb-4 leading-tight text-center drop-shadow-2xl">
                      Prečo hádzať prachy do koša? <br className="sm:hidden"/>Váš starý iPhone má hodnotu!
                    </h3>

                    <p className="text-orange-100 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-center drop-shadow-lg">
                      Vykúpime aj rozbité Apple zariadenia. <strong>Hotovosť OKAMŽITE!</strong>
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:scale-105 transition-all">
                        <span className="text-yellow-400 text-lg sm:text-xl drop-shadow-lg">💰</span>
                        <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">Hotovosť ihneď</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:scale-105 transition-all">
                        <span className="text-yellow-400 text-lg sm:text-xl drop-shadow-lg">✓</span>
                        <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">Aj poškodené</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:scale-105 transition-all">
                        <span className="text-yellow-400 text-lg sm:text-xl drop-shadow-lg">⚡</span>
                        <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">Do 24h</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:scale-105 transition-all">
                        <span className="text-yellow-400 text-lg sm:text-xl drop-shadow-lg">🔒</span>
                        <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">Diskrétne</span>
                      </div>
                    </div>

                    <button className="w-full block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 py-4 px-6 rounded-2xl font-black text-base sm:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all border-2 border-yellow-300/50 drop-shadow-xl">
                      💰 Koľko stojí môj Apple?
                    </button>

                    <p className="text-orange-100 text-xs sm:text-sm text-center font-semibold mt-4 drop-shadow-md">
                      iPhone MacBook iPad AirPods
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP VERZIA */}
          <div className="hidden lg:block relative z-10">
            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 gap-16 items-start text-white">

              <div className="sticky top-20 space-y-6">
                <h2 className="text-5xl xl:text-6xl font-black leading-tight mb-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Zadaj email a dostaneš 7 trikov ZADARMO
                </h2>

                {/* CTA DESKTOP */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">👉</span>
                    <div className="flex-1">
                      <p className="font-black text-2xl text-yellow-400 mb-2">Vyplň formulár vedľa</p>
                      <p className="text-lg">Triky prídú na tvoj email do 1 minúty • 100% zadarmo</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80 text-center">
                    <Link to="/ochrana-osobnych-udajov" className="underline hover:text-yellow-300">
                      Ochrana osobných údajov
                    </Link>
                  </p>
                </div>

                {/* VÝKUP APPLE BOX - NAMIESTO FOTKY */}
                <div className="w-full">
                  <Link
                    to="/vykup-apple"
                    className="group block bg-gradient-to-br from-orange-500 via-red-500/90 to-orange-600 rounded-3xl shadow-2xl overflow-hidden relative hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-orange-400/30"
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 right-4 text-6xl animate-pulse">🍎</div>
                      <div className="absolute bottom-2 left-4 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>
                        🍎
                      </div>
                    </div>

                    <div className="relative p-8">
                      <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-2.5 rounded-full mb-6 mx-auto max-w-max shadow-lg hover:scale-105 transition-all group-hover:scale-105">
                        <span className="text-yellow-400 text-xl drop-shadow-lg">💰</span>
                        <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                          Férové výkupné ceny
                        </span>
                      </div>

                      <h3 className="text-white font-black text-2xl mb-6 leading-tight text-center drop-shadow-2xl">
                        Prečo hádzať prachy do koša? <br />Váš starý iPhone má hodnotu!
                      </h3>

                      <p className="text-orange-100 text-lg mb-8 leading-relaxed text-center drop-shadow-lg">
                        Vykúpime aj rozbité Apple zariadenia. <strong>Hotovosť OKAMŽITE!</strong>
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md hover:scale-105 transition-all">
                          <span className="text-yellow-400 text-xl drop-shadow-lg">💰</span>
                          <span className="text-white font-bold text-base drop-shadow-md">Hotovosť ihneď</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md hover:scale-105 transition-all">
                          <span className="text-yellow-400 text-xl drop-shadow-lg">✓</span>
                          <span className="text-white font-bold text-base drop-shadow-md">Aj poškodené</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md hover:scale-105 transition-all">
                          <span className="text-yellow-400 text-xl drop-shadow-lg">⚡</span>
                          <span className="text-white font-bold text-base drop-shadow-md">Do 24h</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-xl px-4 py-3 shadow-md hover:scale-105 transition-all">
                          <span className="text-yellow-400 text-xl drop-shadow-lg">🔒</span>
                          <span className="text-white font-bold text-base drop-shadow-md">Diskrétne</span>
                        </div>
                      </div>

                      <button className="w-full block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 py-4 px-6 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all border-2 border-yellow-300/50 drop-shadow-xl">
                        💰 Koľko stojí môj Apple?
                      </button>

                      <p className="text-orange-100 text-sm text-center font-semibold mt-4 drop-shadow-md">
                        iPhone MacBook iPad AirPods
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="space-y-12">
                {/* FORMULÁR - DESKTOP */}
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
            </div>
          </div>
        </section>

      </div>

      <CookieBanner />

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl z-50 hover:scale-110 transition-all backdrop-blur-xl border border-white/30 drop-shadow-2xl"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}
    </>
  );
}
