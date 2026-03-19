import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import {
  AlertCircle,
  ChevronUp,
  CheckCircle,
  Smartphone,
  Wrench,
  RotateCcw,
  ShoppingBag,
  Shield,
  Clock,
  Info,
  Battery,
  Tag,
  AlertTriangle,
  FileText,
} from 'lucide-react';

export default function ReklamaciePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState<'predaj' | 'opravy'>('predaj');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <CookieBanner />
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-20">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-blue-200" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Reklamačný poriadok</h1>
            <p className="text-blue-100 text-sm mb-1">Platné od 22. decembra 2025 | Verzia 3.0</p>
            <p className="text-blue-200 text-xs">
              V súlade so zákonom č. 108/2024 Z.z. o ochrane spotrebiteľa a Občianskym zákonníkom č. 40/1964 Zb.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* INFO BANNER */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-green-800 text-sm">
              Ak máte problém s reklamáciou alebo chcete vrátiť tovar, kontaktujte nás ihneď – radi to vyriešime!
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-8 bg-white shadow-sm">
            <button
              onClick={() => setActiveTab('predaj')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold transition-colors ${
                activeTab === 'predaj' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Predaj iPhonov
            </button>
            <button
              onClick={() => setActiveTab('opravy')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold transition-colors ${
                activeTab === 'opravy' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Opravy telefónov
            </button>
          </div>

          {/* ===== PREDAJ IPHONOV ===== */}
          {activeTab === 'predaj' && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Záruky na predávané iPhony
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Použitý iPhone */}
                <div className="bg-white rounded-xl p-5 border-2 border-blue-400 shadow-sm relative">
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                    Bežný prípad
                  </span>
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-800">Použitý iPhone</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-1">12 mesiacov</p>
                  <p className="text-xs text-gray-500">
                    Zákonná zodpovednosť za vady skrátená dohodou na 12 mesiacov podľa § 612 ods. 4
                    Občianskeho zákonníka. Skrátenie je potvrdené súhlasom zákazníka pri kúpe.
                    Platí pre všetky použité iPhony predávané cez Fixanto.
                  </p>
                </div>

                {/* Nový iPhone */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-800">Nový / nerozbalený iPhone</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-1">24 mesiacov</p>
                  <p className="text-xs text-gray-500">
                    Zákonná zodpovednosť za vady 24 mesiacov podľa § 609 Občianskeho zákonníka.
                    Predávajúci zodpovedá za každú vadu, ktorú mal iPhone v čase dodania.
                  </p>
                </div>

                {/* Online nákup – 14 dní */}
                <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <RotateCcw className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Vrátenie tovaru – online nákup</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-1">14 dní</p>
                  <p className="text-xs text-gray-500 mb-2">
                    Právo na vrátenie bez udania dôvodu platí <strong>výlučne pri zmluvách uzavretých na diaľku</strong> —
                    t.j. keď k celkovému uzavretiu kúpnej zmluvy (vrátane potvrdenia ceny a podmienok) došlo
                    prostredníctvom internetu, e-mailu alebo správy (napr. WhatsApp), <strong>bez fyzickej
                    prítomnosti zákazníka na predajnom mieste</strong>.
                  </p>
                  <p className="text-xs text-gray-500">
                    Toto právo <strong>nevzniká</strong>, ak zákazník prišiel osobne na predajné miesto
                    a zmluva bola uzavretá pri osobnom stretnutí — bez ohľadu na to, či predchádzala
                    komunikácia cez telefón alebo správy.
                  </p>
                  <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800 text-xs">
                      ⚠️ iPhone musí byť vrátený <strong>nepoškodený, kompletný, s príslušenstvom</strong>.
                      Zákazník zodpovedá za zníženie hodnoty spôsobené zaobchádzaním nad rámec bežného
                      zoznámenia sa s tovarom.
                    </p>
                  </div>
                </div>
              </div>

              {/* ČO MUSÍ BYŤ NA KAŽDOM PRODUKTE */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 mb-8">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Čo je povinne uvedené pri každom produkte
                </h3>
                <p className="text-xs text-blue-700 mb-3">
                  Zákon vyžaduje, aby predávajúci <strong>pred kúpou informoval kupujúceho o všetkých
                  známych vadách</strong>. Zákazník svojím súhlasom potvrdzuje, že bol s týmito informáciami
                  oboznámený. Na vady výslovne oznámené pred kúpou sa zodpovednosť za vady <strong>nevzťahuje</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-800">Kategória stavu</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      <strong>A+ – ako nový</strong>: bez stôp použitia<br />
                      <strong>A – výborný</strong>: minimálne stopy použitia<br />
                      <strong>B – dobrý</strong>: viditeľné škrabance<br />
                      Všetky viditeľné vady sú popísané a/alebo nafotené.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Battery className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-800">Zdravie batérie</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Pri každom použitom iPhone je uvedená <strong>aktuálna kapacita batérie v %</strong>.
                      Prirodzené opotrebenie batérie nie je vada. Kapacita batérie sa časom
                      prirodzene znižuje — zákazník s tým uzavretím zmluvy súhlasí.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-800">Príslušenstvo</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Je vždy uvedené, čo je súčasťou balenia. Ak príslušenstvo nie je originálne
                      alebo chýba, je to explicitne uvedené pred kúpou.
                    </p>
                  </div>
                </div>
              </div>

              {/* Softvér */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Softvér a iOS — dôležité upozornenie
                </h3>
                <p className="text-xs text-orange-800">
                  Predávajúci nezodpovedá za <strong>softvérové problémy</strong> vzniknuté po prevzatí
                  zariadenia — vrátane problémov spôsobených aktualizáciami iOS, inštaláciou aplikácií
                  treťou stranou, resetom zariadenia alebo obnovením zo zálohy zákazníka. Predávajúci tiež
                  nezodpovedá za <strong>kompatibilitu so softvérom alebo aplikáciami tretích strán</strong>.
                  Predaný iPhone je plne funkčný v čase odovzdania — táto skutočnosť je overená pred expedíciou.
                </p>
              </div>

              {/* Kategórie stavu */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">Kategórie stavu predávaných iPhonov</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                {[
                  {
                    label: 'Nový',
                    color: 'bg-green-100 text-green-700',
                    desc: 'Nerozbalený iPhone. Zodpovednosť za vady 24 mesiacov.',
                  },
                  {
                    label: 'Použitý – ako nový (A+)',
                    color: 'bg-blue-100 text-blue-700',
                    desc: 'Bez viditeľných stôp použitia, stav ako nový. Zdravie batérie vždy uvedené. Zodpovednosť za vady 12 mesiacov.',
                  },
                  {
                    label: 'Použitý – výborný (A)',
                    color: 'bg-yellow-100 text-yellow-700',
                    desc: 'Minimálne stopy používania, plná funkčnosť. Zdravie batérie vždy uvedené v %. Zodpovednosť za vady 12 mesiacov.',
                  },
                  {
                    label: 'Použitý – dobrý (B)',
                    color: 'bg-orange-100 text-orange-700',
                    desc: 'Viditeľné škrabance alebo kozmetické poškodenia, plná funkčnosť. Všetky nedostatky sú popísané a nafotené v ponuke. Zákazník s nimi bol oboznámený pred kúpou — na tieto vady sa zodpovednosť nevzťahuje. Zodpovednosť za vady 12 mesiacov.',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 border-b last:border-b-0 border-gray-100">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${item.color}`}>
                      {item.label}
                    </span>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Postup reklamácie */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">Postup pri reklamácii alebo vrátení iPhonu</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                {[
                  {
                    step: '1',
                    title: 'Kontaktujte nás',
                    desc: 'Telefonicky, emailom, WhatsApp alebo osobne – popíšte problém alebo oznámte zámer vrátiť tovar.',
                  },
                  {
                    step: '2',
                    title: 'Potvrdenie vytknutia vady',
                    desc: 'Bezodkladne vám vystavíme písomné potvrdenie o vytknutí vady s primeranou lehotou na jej odstránenie (povinnosť podľa zákona č. 108/2024 Z.z.).',
                  },
                  {
                    step: '3',
                    title: 'Riešenie',
                    desc: 'Podľa závažnosti vady: bezplatná oprava alebo výmena → primeraná zľava → odstúpenie od zmluvy a vrátenie peňazí.',
                  },
                  {
                    step: '4',
                    title: 'Vyriešené',
                    desc: 'Vrátenie peňazí do 14 dní od doručenia vráteného tovaru, alebo vydanie opraveného / vymeneného iPhonu s novým dokladom.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-5 border-b last:border-b-0 border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== OPRAVY ===== */}
          {activeTab === 'opravy' && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                Záruky na opravy
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-800">Displej</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">24 mesiacov</p>
                  <p className="text-xs text-gray-500">
                    Platí na nový displej namontovaný v servise. Vzťahuje sa na funkčnosť a výrobné vady.
                    Nevzťahuje sa na mechanické poškodenie, prasknutie, škrabance alebo poškodenie tekutinou.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-800">Práca / oprava</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">3 mesiace</p>
                  <p className="text-xs text-gray-500">
                    Záruka na vykonanú prácu. Platí len na konkrétnu opravu, nie na celý telefón.
                    Maximálna výška náhrady škody je obmedzená na cenu vykonanej opravy.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-800">Batéria – funkčnosť</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-1">24 mesiacov</p>
                  <p className="text-xs text-gray-500">
                    Platí na nabíjanie a vypínanie zariadenia. Batéria sa musí správne nabíjať
                    a nesmie sa samovoľne vypínať.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-800">Batéria – kapacita</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500 mb-1">6 mesiacov</p>
                  <p className="text-xs text-gray-500">
                    ⚠️ Kapacita batérie je spotrebný materiál – prirodzené znižovanie kapacity nie je vada.
                    Vada sa uznáva, ak batéria má výrazne nízku kapacitu krátko po výmene (prvých 6 mesiacov).
                  </p>
                </div>
              </div>

              {/* Zariadenie v servise */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Odovzdanie zariadenia do servisu — dôležité
                </h3>
                <div className="space-y-2 text-xs text-red-800">
                  <p>
                    <strong>Záloha dát:</strong> Zákazník je <strong>výlučne zodpovedný</strong> za zálohu
                    všetkých dát pred odovzdaním zariadenia. Predávajúci nezodpovedá za stratu, poškodenie
                    alebo zničenie dát počas opravy, a to ani v prípade chyby na strane servisu.
                  </p>
                  <p>
                    <strong>Stav pred opravou:</strong> Zákazník odovzdaním zariadenia potvrdzuje jeho stav
                    v čase odovzdania. Predávajúci zodpovedá len za škody preukázateľne spôsobené servisným
                    zásahom, nie za predchádzajúce poškodenia.
                  </p>
                  <p>
                    <strong>Obmedzenie zodpovednosti:</strong> V prípade poškodenia zariadenia vinou servisu
                    je maximálna výška náhrady škody obmedzená na <strong>cenu vykonanej opravy</strong>,
                    prípadne na <strong>trhovú hodnotu zariadenia</strong> v stave v akom bolo odovzdané —
                    podľa toho, ktorá suma je nižšia.
                  </p>
                  <p>
                    <strong>Neprevzaté zariadenia:</strong> Ak si zákazník neprevezme zariadenie do
                    <strong> 60 dní</strong> od výzvy na prevzatie, predávajúci si vyhradzuje právo účtovať
                    poplatok za uskladnenie vo výške 1 €/deň po uplynutí tejto lehoty.
                  </p>
                </div>
              </div>

              {/* Softvér – opravy */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Softvér — vylúčenie zodpovednosti
                </h3>
                <p className="text-xs text-orange-800">
                  Predávajúci nezodpovedá za <strong>softvérové problémy</strong> existujúce pred opravou
                  ani za softvérové problémy vzniknuté po oprave hardvéru, ak nesúvisia priamo so servisným
                  zásahom. Záruka sa nevzťahuje na problémy spôsobené aktualizáciami operačného systému,
                  aplikáciami tretích strán alebo nesprávnym používaním zariadenia zákazníkom po oprave.
                </p>
              </div>

              {/* Postup reklamácie – Opravy */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">Postup reklamácie opravy</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                {[
                  {
                    step: '1',
                    title: 'Kontaktujte nás',
                    desc: 'Zavoláte, napíšete alebo prídete osobne s popisom problému a záručným listom.',
                  },
                  {
                    step: '2',
                    title: 'Potvrdenie a diagnostika',
                    desc: 'Bezodkladne vám vystavíme potvrdenie o vytknutí vady s lehotou opravy. Diagnostika zvyčajne do 48 hodín.',
                  },
                  {
                    step: '3',
                    title: 'Riešenie',
                    desc: 'Oprava zdarma, výmena dielu, primeraná zľava alebo vrátenie peňazí podľa závažnosti vady a vašej voľby.',
                  },
                  {
                    step: '4',
                    title: 'Prevzatie',
                    desc: 'S novým záručným listom a úsmevom na tvári 😊',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-5 border-b last:border-b-0 border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== PRÁVNE SEKCIE (spoločné) ===== */}
          <div className="space-y-6">

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">1. Rozsah platnosti reklamačného poriadku</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>1.1</strong> Tento reklamačný poriadok upravuje podmienky uplatnenia práv zákazníka
                  z vadného plnenia na <strong>opravy zariadení, použité náhradné diely aj predávaný tovar</strong>{' '}
                  (najmä použité iPhony), ktoré boli poskytnuté alebo predané predávajúcim{' '}
                  <strong>Štefan Hupčík – Fixanto</strong>.
                </p>
                <p>
                  <strong>1.2</strong> Záručná doba začína plynúť dňom prevzatia tovaru zákazníkom.
                </p>
                <p>
                  <strong>1.3</strong> Predávajúci zodpovedá za to, že predaný tovar je pri prevzatí bez vád,
                  má dohodnuté vlastnosti a zodpovedá popisu a fotografiám v ponuke.
                </p>
                <p>
                  <strong>1.4</strong> Pri <strong>použitých iPhonoch</strong> predávajúci nezodpovedá za vady,
                  ktoré boli zákazníkovi <strong>výslovne oznámené pred kúpou</strong> (napr. kozmetické
                  poškodenia kategórie B popísané a nafotené v inzeráte alebo na webe) a zákazník s nimi
                  súhlasil. Súhlas zákazníka je potvrdený dokončením kúpy.
                </p>
                <p>
                  <strong>1.5</strong> Záručný list alebo doklad o kúpe musí obsahovať: identifikáciu zariadenia
                  (model, sériové číslo ak je dostupné), popis stavu, zdravie batérie v %, dátum predaja,
                  cenu a záručnú dobu. Bez tohto dokladu nie je možné uplatniť reklamáciu.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">2. Uplatnenie reklamácie</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>2.1</strong> Kupujúci je povinný vytknúť vadu u predávajúceho{' '}
                  <strong>do dvoch mesiacov od jej zistenia</strong>, najneskôr do uplynutia záručnej doby.
                  Na neskôr uplatnené reklamácie nie je možné prihliadnuť.
                </p>
                <p>
                  <strong>2.2</strong> Reklamáciu je možné uplatniť telefonicky <strong>+421 949 344 600</strong>,
                  emailom <strong>phoneservissk@gmail.com</strong>, cez WhatsApp alebo osobne.
                </p>
                <p>
                  <strong>2.3</strong> Pri podaní reklamácie musí zákazník preukázať kúpu predložením dokladu
                  (faktúra, záručný list, doklad o zaplatení). <strong>Bez dokladu o kúpe nie je možné
                  reklamáciu prijať.</strong>
                </p>
                <p>
                  <strong>2.4</strong> Zákazník je povinný popísať vadu, spôsob jej prejavenia a uviesť,
                  ktoré práva uplatňuje (§ 622 alebo § 623 Občianskeho zákonníka).
                </p>
                <p>
                  <strong>2.5</strong> Reklamovaný tovar je potrebné doručiť osobne alebo zaslať na adresu
                  predávajúceho (nie na dobierku), vhodne zabalený. Odporúčame zaslať ako poistenú zásielku.
                  Náklady na dopravu reklamovaného tovaru k predávajúcemu znáša zákazník.
                </p>
                <p>
                  <strong>2.6</strong> Bezodkladne po vytknutí vady predávajúci vydá zákazníkovi{' '}
                  <strong>písomné potvrdenie o jej vytknutí s primeranou lehotou</strong> na odstránenie vady.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">3. Lehoty na vybavenie reklamácie</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>3.1</strong> Predávajúci je povinný vystaviť potvrdenie o vytknutí vady s{' '}
                  <strong>primeranou lehotou na jej odstránenie</strong>, ktorá nesmie byť dlhšia ako{' '}
                  <strong>30 dní</strong>, s výnimkou objektívnych dôvodov, ktoré predávajúci nemôže
                  ovplyvniť (napr. nedostupnosť náhradného dielu).
                </p>
                <p>
                  <strong>3.2</strong> Ak predávajúci nevybaví reklamáciu v stanovenej lehote, má zákazník
                  právo od zmluvy odstúpiť a bude mu vrátená plná kúpna cena, alebo má právo na výmenu
                  tovaru.
                </p>
                <p>
                  <strong>3.3</strong> Po vybavení reklamácie predávajúci vydá zákazníkovi{' '}
                  <strong>písomný doklad o spôsobe vybavenia reklamácie</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">4. Práva kupujúceho pri vadnom tovare</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>4.1</strong> Ak predávajúci zodpovedá za vadu, kupujúci má právo na{' '}
                  <strong>bezplatné odstránenie vady opravou alebo výmenou</strong> tovaru (§ 622 ods. 1
                  Občianskeho zákonníka).
                </p>
                <p>
                  <strong>4.2</strong> Ak odstránenie vady nie je možné alebo by bolo pre predávajúceho
                  neprimerané, kupujúci má právo na <strong>primeranú zľavu z kúpnej ceny</strong>.
                </p>
                <p>
                  <strong>4.3</strong> Ak ide o <strong>neodstrániteľnú vadu</strong> brániacu riadnemu
                  používaniu, má kupujúci právo na{' '}
                  <strong>odstúpenie od zmluvy a vrátenie kúpnej ceny</strong> (§ 623 ods. 1 Občianskeho
                  zákonníka).
                </p>
                <p>
                  <strong>4.4</strong> Tie isté práva má kupujúci pri opakovanej vade po oprave (viac ako
                  2×) alebo väčšom počte vád (viac ako 3 rôzne vady súčasne) – § 623 ods. 2 Občianskeho
                  zákonníka.
                </p>
                <p>
                  <strong>4.5</strong> V prípade záručnej opravy sa záručná doba predlžuje o čas, počas
                  ktorého kupujúci nemohol tovar používať.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
              <div className="bg-green-700 text-white px-5 py-3">
                <h3 className="font-bold text-sm">5. Odstúpenie od zmluvy uzavretej na diaľku (online nákup)</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>5.1</strong> Právo odstúpiť od zmluvy bez udania dôvodu do 14 dní platí{' '}
                  <strong>výlučne pri zmluvách uzavretých na diaľku</strong> — t.j. keď k uzavretiu kúpnej
                  zmluvy vrátane potvrdenia ceny, stavu a podmienok došlo prostredníctvom internetu, e-mailu
                  alebo správy, <strong>bez fyzickej prítomnosti zákazníka na predajnom mieste v čase
                  uzavretia zmluvy</strong> (§ 19 zákona č. 108/2024 Z.z.).
                </p>
                <p>
                  <strong>5.2</strong> Toto právo <strong>nevzniká</strong>, ak zákazník prišiel osobne na
                  predajné miesto a zmluva bola uzavretá pri osobnom stretnutí.
                </p>
                <p>
                  <strong>5.3</strong> Zákazník je povinný vrátiť tovar do 14 dní odo dňa odstúpenia.
                  Náklady na vrátenie znáša zákazník.
                </p>
                <p>
                  <strong>5.4</strong> Predávajúci vráti všetky platby{' '}
                  <strong>do 14 dní odo dňa doručenia vráteného tovaru</strong> — nie odo dňa oznámenia
                  o odstúpení.
                </p>
                <p>
                  <strong>5.5</strong> Zákazník zodpovedá za <strong>zníženie hodnoty tovaru</strong> nad
                  rámec bežného zoznámenia sa s jeho povahou, vlastnosťami a funkčnosťou. Predávajúci je
                  oprávnený jednostranne započítať nárok na náhradu škody voči nároku zákazníka na vrátenie
                  kúpnej ceny.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                  <p className="text-yellow-800 text-xs font-medium">
                    ⚠️ Právo na odstúpenie sa <strong>nevzťahuje</strong> na nákup pri osobnej návšteve
                    servisu / výdajného miesta.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">6. Výluky zo zodpovednosti za vady</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p><strong>6.1</strong> Predávajúci <strong>nezodpovedá za vady</strong>, ak:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li>vadu spôsobil zákazník nesprávnym používaním alebo zanedbaním starostlivosti,</li>
                  <li>zariadenie bolo mechanicky poškodené (náraz, prasknutie displeja, ohnutý rám),</li>
                  <li>zariadenie bolo poškodené tekutinou,</li>
                  <li>na zariadení vykonal neoprávnený zásah zákazník alebo tretia osoba po prevzatí,</li>
                  <li>vada vznikla v dôsledku živelnej udalosti alebo iných vonkajších vplyvov,</li>
                  <li>zákazník uplatňuje reklamáciu po uplynutí záručnej doby,</li>
                  <li>zákazník neuplatnil reklamáciu do 2 mesiacov od zistenia vady,</li>
                  <li>ide o vadu výslovne oznámenú zákazníkovi pred kúpou (kozmetické poškodenia
                    v inzeráte / na webe),</li>
                  <li>ide o prirodzené opotrebenie zariadenia alebo jeho súčastí (vrátane batérie),</li>
                  <li>ide o softvérové problémy nesúvisiace so servisným zásahom,</li>
                  <li>zákazník nepredložil doklad o kúpe.</li>
                </ul>
                <p>
                  <strong>6.2</strong> Predávajúci nenesie zodpovednosť za stratu dát. Zákazník je
                  zodpovedný za zálohu dát pred odovzdaním zariadenia na opravu.
                </p>
                <p>
                  <strong>6.3</strong> Maximálna výška náhrady škody je obmedzená na cenu vykonanej opravy,
                  prípadne na trhovú hodnotu zariadenia v stave v akom bolo odovzdané — podľa toho, ktorá
                  suma je nižšia.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">7. Spôsoby vybavenia reklamácie</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p><strong>7.1</strong> Reklamácia sa považuje za vybavenú jedným z nasledujúcich spôsobov:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li>opravením vady,</li>
                  <li>výmenou tovaru alebo dielu za bezchybný,</li>
                  <li>poskytnutím primeranej zľavy z kúpnej ceny,</li>
                  <li>vrátením kúpnej ceny pri odstúpení od zmluvy,</li>
                  <li>odôvodneným zamietnutím reklamácie.</li>
                </ul>
                <p>
                  <strong>7.2</strong> O výsledku vybavenia reklamácie bude predávajúci informovať zákazníka
                  telefonicky alebo emailom a vydá písomný doklad o spôsobe jej vybavenia.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm">8. Alternatívne riešenie sporov</h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>8.1</strong> Predávajúci a zákazník sa zaväzujú riešiť všetky spory prednostne
                  dohodou.
                </p>
                <p><strong>8.2</strong> V prípade nedohody je zákazník oprávnený obrátiť sa na:</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-1">Slovenská obchodná inšpekcia (SOI)</p>
                  <p className="text-xs text-gray-600">Inšpektorát SOI pre Trenčiansky kraj</p>
                  <p className="text-xs text-gray-600">Hurbanova 59, 911 01 Trenčín</p>
                  <p className="text-xs text-gray-600">Tel: 032/640 01 09 | Email: tn@soi.sk</p>
                  <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline">www.soi.sk</a>
                </div>
                <p>
                  <strong>8.3</strong> Online platforma EÚ pre riešenie sporov:{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 hover:underline">
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-800 text-white px-5 py-3">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  9. Záverečné ustanovenia
                </h3>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-700">
                <p><strong>9.1</strong> Vzťahy neupravené týmto poriadkom sa riadia:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li>Zákon č. 108/2024 Z.z. o ochrane spotrebiteľa (účinný od 1.7.2024),</li>
                  <li>Občiansky zákonník č. 40/1964 Zb. (§ 609–627),</li>
                  <li>Zákon č. 391/2015 Z.z. o alternatívnom riešení spotrebiteľských sporov,</li>
                  <li>Zákon č. 22/2004 Z.z. o elektronickom obchode.</li>
                </ul>
                <p>
                  <strong>9.2</strong> Predávajúci si vyhradzuje právo na zmenu tohto reklamačného poriadku.
                  Aktuálne znenie je vždy dostupné na{' '}
                  <a href="https://www.fixanto.sk" className="text-blue-600 hover:underline">
                    www.fixanto.sk
                  </a>. Na reklamácie uplatnené pred zmenou poriadku sa vzťahuje verzia platná v čase kúpy.
                </p>
                <p>
                  <strong>9.3</strong> Tento reklamačný poriadok nadobúda účinnosť{' '}
                  <strong>22. decembra 2025</strong>.
                </p>
                <p>
                  <strong>9.4</strong> Tieto reklamačné podmienky sú neoddeliteľnou súčasťou všeobecných
                  obchodných podmienok.
                </p>
              </div>
            </div>

          </div>

          {/* Kontakt */}
          <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-3">Máte otázku alebo problém?</h3>
            <p className="text-blue-100 text-sm mb-5">Neváhajte nás kontaktovať – sme tu pre vás</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-bold">
              <a href="tel:0949344600" className="hover:text-yellow-300 transition">📞 0949 344 600</a>
              <span className="hidden sm:inline text-blue-300">•</span>
              <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer"
                className="hover:text-green-300 transition">💬 WhatsApp</a>
              <span className="hidden sm:inline text-blue-300">•</span>
              <a href="mailto:phoneservissk@gmail.com" className="hover:text-yellow-300 transition">
                ✉️ phoneservissk@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Reklamačný poriadok v. 3.0 — účinnosť od 22. decembra 2025</p>
            <p className="mt-1">© 2025 Štefan Hupčík – Fixanto. Všetky práva vyhradené.</p>
          </div>

        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}