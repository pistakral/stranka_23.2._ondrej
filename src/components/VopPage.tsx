import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import {
  Shield,
  FileText,
  AlertCircle,
  Info,
  Scale,
  Building2,
  CheckCircle,
  Clock,
  Euro,
  Package,
  Phone,
  Mail,
  Home,
  ChevronUp,
  Smartphone,
  Database,
  Lock,
  Eye,
  UserCheck,
  Server,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';

export default function VopPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: 'Môžem odstúpiť od zmluvy po oprave telefónu?',
      a: 'Áno, ale iba v prípade online objednávky (uzavretej na diaľku) máte právo odstúpiť od zmluvy do 14 dní od prevzatia opraveného zariadenia bez udania dôvodu, pokiaľ oprava ešte nebola úplne vykonaná. Ak bola oprava dokončená s vaším výslovným súhlasom, právo na odstúpenie zaniká. Pri osobnej návšteve servisu právo na odstúpenie nevzniká.',
    },
    {
      q: 'Môžem vrátiť zakúpený iPhone z e-shopu?',
      a: 'Áno, pri online nákupe cez e-shop (web, WhatsApp alebo email) máte právo vrátiť iPhone bez udania dôvodu do 14 kalendárnych dní od prevzatia. iPhone musí byť v pôvodnom stave, nepoškodený, s príslušenstvom. Pri osobnom nákupe v servise právo na vrátenie nevzniká.',
    },
    {
      q: 'Čo ak sa vada vyskytne viackrát?',
      a: 'Ak sa tá istá vada vyskytne viac ako 2-krát po oprave, máte právo požadovať výmenu zariadenia alebo odstúpiť od zmluvy a získať vrátenie peňazí. Toto platí podľa § 623 Občianskeho zákonníka.',
    },
    {
      q: 'Kto znáša náklady na vrátenie tovaru?',
      a: 'Kupujúci znáša náklady spojené s vrátením tovaru pri odstúpení od zmluvy. Tovar je potrebné vrátiť v pôvodnom stave vrátane všetkého príslušenstva.',
    },
    {
      q: 'Zodpovedáte za stratu dát v telefóne?',
      a: 'Nie, poskytovateľ nenesie zodpovednosť za stratu dát uložených v zariadení. Zákazník je zodpovedný za vytvorenie zálohy dát pred odovzdaním zariadenia na opravu.',
    },
    {
      q: 'Ako uplatniť reklamáciu?',
      a: 'Reklamáciu uplatníte kontaktovaním poskytovateľa na tel. 0949 344 600 alebo emailom na phoneservissk@gmail.com. Reklamácia bude potvrdená písomne s primeranou lehotou na vybavenie, najneskôr do 30 dní. Bez dokladu o kúpe nie je možné reklamáciu prijať.',
    },
    {
      q: 'Kde môžem riešiť spor mimosúdne?',
      a: 'Máte právo na mimosúdne riešenie sporu podľa zákona č. 391/2015 Z.z. prostredníctvom platformy Európskej komisie pre alternatívne riešenie spotrebiteľských sporov online (ADR) alebo cez SOI Trenčín.',
    },
    {
      q: 'Ako požiadam o vymazanie svojich osobných údajov?',
      a: 'Môžete kedykoľvek emailom (phoneservissk@gmail.com) požiadať o vymazanie vašich osobných údajov z našej databázy. Vymazanie vykonáme do 30 dní, pokiaľ nám zákon neukladá povinnosť uchovávania (napr. účtovné doklady — 10 rokov).',
    },
    {
      q: 'Čo je nabíjací adaptér 20W ako doplnok?',
      a: 'Pri objednaní iPhonu cez e-shop je možné dokúpiť nabíjací adaptér USB-C 20W za 15 €. Ide o nový doplnkový tovar — vzťahuje sa naň zákonná zodpovednosť za vady 24 mesiacov',
    },
    {
      q: 'Sú predávané iPhony repasované?',
      a: 'Každý predávaný iPhone bol pred predajom skontrolovaný, otestovaný a prípadne opravený v našom servise. Ide o použitý tovar — zákazník je vopred informovaný o kategórii stavu (A+/A/B), zdraví batérie a prípadných viditeľných vadách. Záručná doba je 12 mesiacov.',
    },
  ];

  return (
    <>
      <GoogleAnalytics />
      <CookieBanner />
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-20">

        {/* HERO */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <FileText className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Všeobecné obchodné podmienky
            </h1>
            <p className="text-gray-300 text-sm mb-1">Platné od 22. decembra 2025 | Verzia 3.0</p>
            <p className="text-gray-400 text-xs">
              Komplexné informácie o vašich právach a našich povinnostiach v súlade s platnou legislatívou SR a nariadeniami EÚ
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

          {/* 1. IDENTIFIKÁCIA */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <h2 className="font-bold text-sm">1. Identifikácia predávajúceho / poskytovateľa</h2>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p><span className="font-semibold">Obchodné meno:</span> Štefan Hupčík – Fixanto</p>
                <p><span className="font-semibold">Sídlo:</span> Dolná Súča 877, 913 32 Dolná Súča</p>
                <p><span className="font-semibold">IČO:</span> 57310998</p>
                <p><span className="font-semibold">DIČ:</span> 1130682366</p>
                <p className="text-orange-600 text-xs font-medium">⚠️ Poskytovateľ nie je platcom DPH</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /><a href="tel:+421949344600" className="text-blue-600 hover:underline">0949 344 600</a></p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /><a href="mailto:phoneservissk@gmail.com" className="text-blue-600 hover:underline">phoneservissk@gmail.com</a></p>
                <p className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /><a href="https://www.fixanto.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fixanto.sk</a></p>
                <p className="flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-blue-500" /><a href="https://www.fixanto.sk/eshop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">fixanto.sk/eshop (e-shop)</a></p>
              </div>
            </div>
          </section>

          {/* 2. PREHĽAD PRÁV */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-blue-700 text-white px-5 py-3 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <h2 className="font-bold text-sm">2. Prehľad kľúčových práv zákazníka</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Právo zákazníka</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Lehota / Podmienka</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Právny základ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Odstúpenie od zmluvy – online nákup / oprava', '14 dní od prevzatia', '§ 19 zák. č. 108/2024 Z.z.'],
                    ['Záruka na nové displeje', '24 mesiacov', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na prácu servisu', '3 mesiace', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na batérie – funkčnosť', '24 mesiacov', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na batérie – kapacita', '6 mesiacov', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na nový iPhone', '24 mesiacov', '§ 609 Občianskeho zákonníka'],
                    ['Záruka na použitý iPhone (A+/A/B)', '12 mesiacov (skrátená dohodou)', '§ 612 ods. 4 Občianskeho zákonníka'],
                    ['Záruka na nabíjací adaptér (nový tovar)', '24 mesiacov', '§ 609 Občianskeho zákonníka'],
                    ['Vybavenie reklamácie', 'Primeraná lehota, max. 30 dní', 'Zákon č. 108/2024 Z.z.'],
                    ['Dodacia lehota – oprava', '0–5 pracovných dní', 'Obchodné podmienky'],
                    ['Dodacia lehota – e-shop iPhone', '1–3 pracovné dni od platby', 'Obchodné podmienky'],
                    ['Bezplatná diagnostika', 'Pri súhlase s opravou / 15 € pri odmietnutí', 'Obchodné podmienky'],
                    ['Vrátenie sumy pri online odstúpení', '14 dní od doručenia vráteného tovaru', 'Zákon č. 108/2024 Z.z.'],
                    ['Neprevzaté zariadenie zo servisu', 'Poplatok 1 €/deň po 60 dňoch od výzvy', 'Obchodné podmienky'],
                  ].map(([pravo, lehota, zaklad]) => (
                    <tr key={pravo} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-800">{pravo}</td>
                      <td className="p-3 text-blue-700 font-medium">{lehota}</td>
                      <td className="p-3 text-gray-500 text-xs">{zaklad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. OPRAVY */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              <h2 className="font-bold text-sm">3. Podmienky poskytovania opráv</h2>
            </div>
            <div className="p-5 space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: '📱', label: 'Displeje (nové)', value: '24 mesiacov' },
                  { icon: '🔧', label: 'Práca servisu', value: '3 mesiace' },
                  { icon: '🔋', label: 'Batéria – funkčnosť', value: '24 mesiacov' },
                  { icon: '🔋', label: 'Batéria – kapacita', value: '6 mesiacov' },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className="font-bold text-blue-600">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p><strong>3.1</strong> Cena opravy je dohodnutá pred začatím opravy. Zákazník bude o cene informovaný po diagnostike a môže opravu odmietnuť.</p>
                <p><strong>3.2</strong> Diagnostika je bezplatná pri súhlase s opravou. Pri odmietnutí opravy po vykonaní diagnostiky sa účtuje poplatok <strong>15 €</strong>. Zákazník je o tomto poplatku informovaný pred začatím diagnostiky.</p>
                <p><strong>3.3</strong> O dokončení opravy bude zákazník informovaný telefonicky, WhatsApp alebo emailom.</p>
                <p><strong>3.4</strong> Zariadenie neprevzaté do <strong>60 dní</strong> od výzvy na prevzatie — predávajúci účtuje poplatok za uskladnenie <strong>1 €/deň</strong>. Zariadenie neprevzaté do 180 dní môže byť po písomnom upozornení predané alebo zlikvidované.</p>
                <p><strong>3.5</strong> Poskytovateľ nezodpovedá za stratu dát. Zákazník je povinný zálohovať dáta pred odovzdaním zariadenia. Maximálna výška náhrady škody za poškodenie vinou servisu je obmedzená na cenu vykonanej opravy alebo trhovú hodnotu zariadenia v čase odovzdania — podľa toho, ktorá suma je nižšia.</p>
                <p><strong>3.6</strong> Poskytovateľ nezodpovedá za softvérové problémy existujúce pred opravou ani za softvérové problémy nesúvisiace so servisným zásahom.</p>
              </div>
            </div>
          </section>

          {/* 4. E-SHOP */}
          <section className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white px-5 py-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <h2 className="font-bold text-sm">4. Podmienky nákupu cez e-shop (fixanto.sk/store)</h2>
            </div>
            <div className="p-5 space-y-4 text-sm text-gray-700">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                <strong>4.0</strong> E-shop na adrese fixanto.sk/store umožňuje online nákup použitých iPhonov
                a doplnkového príslušenstva. Všetky nákupy cez e-shop sú zmluvami uzavretými na diaľku
                podľa § 19 zákona č. 108/2024 Z.z. — zákazník má právo na 14-dňové vrátenie tovaru.
              </div>
              <div className="space-y-2">
                <p><strong>4.1 Uzavretie zmluvy.</strong> Zmluva je uzavretá okamihom odoslania potvrdenia objednávky predávajúcim na emailovú adresu zákazníka. Pred uzavretím zmluvy je zákazník povinný oboznámiť sa s týmito VOP a reklamačným poriadkom.</p>
                <p><strong>4.2 Platba.</strong> Objednávky cez e-shop sú hradené <strong>výlučne bankovým prevodom vopred</strong>. Zákazník obdrží platobné údaje (IBAN, variabilný symbol) v potvrdzovacom emaili. Platba musí byť pripísaná do <strong>48 hodín</strong>, inak je rezervácia zrušená.</p>
                <p><strong>4.3 Expedícia.</strong> iPhone je expedovaný do <strong>1–3 pracovných dní</strong> od pripísania platby. Zákazník obdrží tracking číslo emailom.</p>
                <p><strong>4.4 Doprava.</strong> Doprava Slovenskou poštou je zadarmo. Zákazník je povinný skontrolovať obsah zásielky pri prevzatí a prípadné poškodenie prepravou oznámiť doručovateľovi na mieste.</p>
                <p><strong>4.5 Rezervácia.</strong> Produkt je rezervovaný od odoslania objednávky. Ak platba nie je prijatá do 48 hodín, rezervácia zaniká.</p>
                <p><strong>4.6 Nedostupnosť tovaru.</strong> Ak iPhone nie je k dispozícii po potvrdení objednávky, predávajúci zákazníka bezodkladne informuje a prípadná platba bude vrátená do 5 pracovných dní.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  4.7 Doplnkový tovar — Nabíjací adaptér 20W
                </h3>
                <p className="text-xs text-orange-800">
                  Pri objednaní iPhonu je možné dokúpiť <strong>nabíjací adaptér USB-C 20W za 15 €</strong>.
                  Adaptér je <strong>nový tovar</strong> — vzťahuje sa naň zákonná zodpovednosť za vady{' '}
                  <strong>24 mesiacov</strong> (na nový tovar nie je možné záručnú dobu skrátiť).
                  Zľavový kód sa vzťahuje na celkovú sumu objednávky vrátane adaptéra.
                </p>
              </div>
            </div>
          </section>

          {/* 5. PREDAJ IPHONOV */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <h2 className="font-bold text-sm">5. Podmienky predaja iPhonov</h2>
            </div>
            <div className="p-5 space-y-4 text-sm text-gray-700">

              {/* Kľúčová veta o kontrole */}
              <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-900 mb-1">Každý predávaný iPhone bol pred predajom skontrolovaný, otestovaný a prípadne opravený v našom servise.</p>
                    <p className="text-xs text-green-800">
                      Ide o <strong>použitý tovar</strong> — zákazník je pred kúpou vždy informovaný o kategórii stavu
                      (A+/A/B), zdraví batérie v % a prípadných viditeľných vadách. Záručná doba na použitý iPhone
                      je <strong>12 mesiacov</strong> (skrátená dohodou podľa § 612 ods. 4 Občianskeho zákonníka).
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Nový iPhone', value: '24 mesiacov', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
                  { label: 'Použitý iPhone (A+/A/B)', value: '12 mesiacov', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                  { label: 'Vrátenie – e-shop', value: '14 dní', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} border ${item.border} rounded-lg p-3 text-center`}>
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Kategórie stavu */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-700 text-white px-4 py-2">
                  <p className="text-xs font-semibold">Kategórie stavu predávaných iPhonov</p>
                </div>
                {[
                  {
                    label: 'Trieda A+ – ako nový',
                    color: 'bg-blue-100 text-blue-700',
                    desc: 'Bez viditeľných stôp použitia. Stav ako nový, bez škrabancov na ráme ani displeji. Skontrolovaný a otestovaný v servise.',
                  },
                  {
                    label: 'Trieda A – výborný',
                    color: 'bg-yellow-100 text-yellow-700',
                    desc: 'Minimálne stopy používania, plná funkčnosť. Prípadné drobné stopy sú vždy popísané v ponuke. Skontrolovaný a otestovaný v servise.',
                  },
                  {
                    label: 'Trieda B – dobrý',
                    color: 'bg-orange-100 text-orange-700',
                    desc: 'Viditeľné škrabance alebo kozmetické poškodenia, plná funkčnosť. Všetky nedostatky sú popísané a nafotené v ponuke pred kúpou — zákazník s nimi súhlasí dokončením objednávky. Na tieto vady sa zodpovednosť za vady nevzťahuje.',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 border-b last:border-b-0 border-gray-100">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${item.color}`}>
                      {item.label}
                    </span>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p><strong>5.1</strong> Zákonná zodpovednosť za vady je pri použitom tovare skrátená dohodou na <strong>12 mesiacov</strong> podľa § 612 ods. 4 Občianskeho zákonníka. </p>
                <p><strong>5.2</strong> Pri každom predávanom iPhone predávajúci povinne uvádza: <strong>kategóriu stavu (A+/A/B)</strong>, <strong>zdravie batérie v %</strong>, popis všetkých viditeľných vád a obsah balenia. Zákazník súhlasom s objednávkou potvrdzuje, že bol s týmito informáciami oboznámený.</p>
                <p><strong>5.3</strong> Predávajúci nezodpovedá za vady, ktoré boli zákazníkovi <strong>výslovne oznámené pred kúpou</strong> a zákazník s nimi súhlasil (napr. kozmetické poškodenia triedy B popísané a nafotené v ponuke).</p>
                <p><strong>5.4</strong> Predávajúci si vyhradzuje právo odmietnuť objednávku, ak iPhone medzičasom nie je k dispozícii. Prípadná platba bude vrátená do 5 pracovných dní.</p>
                <p><strong>5.5</strong> Predávajúci nezodpovedá za softvérové problémy vzniknuté po prevzatí zariadenia — vrátane problémov spôsobených aktualizáciami iOS, aplikáciami tretích strán alebo obnovou zo zálohy zákazníka. iPhone je plne funkčný v čase odovzdania — táto skutočnosť je overená pred expedíciou.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-xs font-medium">
                  ⚠️ Právo na 14-dňové vrátenie platí <strong>iba pri online nákupe cez e-shop</strong>.
                  Pri osobnom nákupe v servise toto právo nevzniká.
                </p>
              </div>
            </div>
          </section>

          {/* 6. PLATBY */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Euro className="w-4 h-4" />
              <h2 className="font-bold text-sm">6. Platobné podmienky</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    E-shop (online objednávky)
                  </p>
                  <div className="space-y-1 text-xs text-blue-800">
                    <p>🏦 <strong>Bankový prevod vopred</strong> — výlučný spôsob platby</p>
                    <p>⏱️ Splatnosť: <strong>48 hodín</strong> od objednávky</p>
                    <p>📧 Platobné údaje v potvrdzovacom emaili</p>
                    <p>🚚 Expedícia po pripísaní platby (1–3 prac. dni)</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Servis (osobný odber)
                  </p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>💵 Hotovosť pri prevzatí</p>
                    <p>💳 Platobná karta pri prevzatí</p>
                    <p>🏦 Bankový prevod (dohodou)</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                📋 Doklad o zaplatení (faktúra / email s potvrdením objednávky) slúži zároveň ako záručný list.
                <strong> Bez dokladu o kúpe nie je možné uplatniť reklamáciu.</strong>
              </p>
            </div>
          </section>

          {/* 7. DODACIE LEHOTY */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <h2 className="font-bold text-sm">7. Dodacie lehoty</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Opravy – servis</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Štandardná oprava', value: '0–5 pracovných dní' },
                      { label: 'Pri objednávke dielov', value: '+1–2 pracovné dni' },
                      { label: 'Maximálna zákonná lehota', value: '30 dní' },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 text-xs">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">E-shop – iPhone</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Expedícia po platbe', value: '1–3 pracovné dni' },
                      { label: 'Doručenie (Slovenská pošta)', value: '1–3 pracovné dni' },
                      { label: 'Doprava', value: 'ZADARMO' },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center bg-blue-50 rounded-lg px-3 py-2 text-xs">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-blue-700">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">🔔 O dokončení opravy / odoslaní tovaru informujeme cez WhatsApp, telefón alebo email.</p>
            </div>
          </section>

          {/* 8. GDPR */}
          <section className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
            <div className="bg-purple-700 text-white px-5 py-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <h2 className="font-bold text-sm">8. Ochrana osobných údajov (GDPR)</h2>
            </div>
            <div className="p-5 space-y-5 text-sm text-gray-700">

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  8.1 Prevádzkovateľ osobných údajov
                </h3>
                <p>
                  Prevádzkovateľom osobných údajov v zmysle čl. 4 ods. 7 nariadenia GDPR je:{' '}
                  <strong>Štefan Hupčík – Fixanto</strong>, Dolná Súča 877, 913 32 Dolná Súča,
                  IČO: 57310998, email: phoneservissk@gmail.com.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  8.2 Aké osobné údaje spracúvame
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2">Pri odoslaní objednávky cez webový formulár zhromažďujeme:</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {[
                      ['Meno a priezvisko', 'identifikácia zákazníka'],
                      ['Telefónne číslo', 'komunikácia ohľadom objednávky'],
                      ['Emailová adresa', 'potvrdenie objednávky, reklamačná komunikácia'],
                      ['Adresa doručenia', 'pri zaslaní zakúpeného iPhonu alebo opraveného zariadenia'],
                      ['Popis zariadenia a závady', 'technické informácie pre vybavenie opravy'],
                      ['Informácie o objednávke', 'typ produktu, cena, dátum, zľavový kód'],
                    ].map(([field, desc]) => (
                      <li key={field} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>{field}</strong> – {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  8.3 Účel a právny základ spracúvania
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-2 font-semibold text-gray-700">Účel</th>
                        <th className="text-left p-2 font-semibold text-gray-700">Právny základ (GDPR)</th>
                        <th className="text-left p-2 font-semibold text-gray-700">Doba uchovávania</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ['Vybavenie objednávky / opravy', 'Čl. 6 ods. 1 písm. b) – plnenie zmluvy', 'Po dobu záručnej doby + 1 rok'],
                        ['Komunikácia so zákazníkom', 'Čl. 6 ods. 1 písm. b) – plnenie zmluvy', 'Po dobu záručnej doby + 1 rok'],
                        ['Vedenie účtovných dokladov', 'Čl. 6 ods. 1 písm. c) – zákonná povinnosť', '10 rokov (zákon o účtovníctve)'],
                        ['Riešenie reklamácií a sporov', 'Čl. 6 ods. 1 písm. c) + f)', 'Po dobu reklamačného konania + 3 roky'],
                      ].map(([ucel, zaklad, doba], i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                          <td className="p-2">{ucel}</td>
                          <td className="p-2 text-purple-700 font-medium">{zaklad}</td>
                          <td className="p-2">{doba}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" />
                  8.4 Technické spracúvanie údajov – Supabase
                </h3>
                <p className="text-xs text-blue-800 mb-3">
                  Osobné údaje zadané prostredníctvom objednávkového formulára e-shopu sú ukladané do databázy
                  prevádzkovanej službou <strong>Supabase</strong> (sprostredkovateľ osobných údajov podľa čl. 28 GDPR).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: '📍 Sídlo', content: 'Supabase Inc., San Francisco, CA, USA', link: { href: 'https://supabase.com/privacy', label: 'supabase.com/privacy' } },
                    { title: '🖥️ Servery', content: 'Dáta ukladané v Európskej únii (AWS EU región) — súlad s GDPR.', link: null },
                    { title: '📄 DPA', content: 'Uzavretá Zmluva o spracúvaní osobných údajov podľa čl. 28 GDPR.', link: null },
                    { title: '🔒 Prenosy mimo EÚ', content: 'Využívajú sa štandardné zmluvné doložky (SCC) Európskej komisie.', link: null },
                  ].map(item => (
                    <div key={item.title} className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="text-xs font-semibold text-gray-800 mb-1">{item.title}</p>
                      <p className="text-xs text-gray-600">{item.content}</p>
                      {item.link && <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{item.link.label}</a>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  8.5 Vaše práva ako dotknutej osoby
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { icon: '👁️', title: 'Právo na prístup', desc: 'Kedykoľvek môžete požiadať o informáciu, aké údaje o vás spracúvame.' },
                    { icon: '✏️', title: 'Právo na opravu', desc: 'Môžete požiadať o opravu nesprávnych alebo neúplných údajov.' },
                    { icon: '🗑️', title: 'Právo na vymazanie', desc: 'Môžete požiadať o vymazanie údajov, ak pominul účel spracúvania.' },
                    { icon: '⏸️', title: 'Právo na obmedzenie', desc: 'Môžete požiadať o dočasné obmedzenie spracúvania vašich údajov.' },
                    { icon: '📦', title: 'Právo na prenosnosť', desc: 'Môžete požiadať o poskytnutie údajov v strojovo čitateľnom formáte.' },
                    { icon: '🚫', title: 'Právo namietať', desc: 'Môžete namietať voči spracúvaniu na základe oprávneného záujmu.' },
                  ].map(item => (
                    <div key={item.title} className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-xs">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-xs text-purple-800">
                    📧 Žiadosť zasielajte na:{' '}
                    <a href="mailto:phoneservissk@gmail.com" className="font-semibold hover:underline">phoneservissk@gmail.com</a>
                    {' '}– odpovieme do <strong>30 dní</strong>. Sťažnosť môžete podať na{' '}
                    <strong>ÚOOÚ SR</strong>, Hraničná 12, 820 07 Bratislava —{' '}
                    <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">www.dataprotection.gov.sk</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  8.6 Cookies a analytika
                </h3>
                <p className="text-xs text-gray-600">
                  Webová stránka www.fixanto.sk používa <strong>Google Analytics</strong> na analýzu návštevnosti.
                  Google Analytics zbiera anonymizované údaje o správaní návštevníkov. Tieto údaje neumožňujú
                  identifikáciu konkrétnej osoby. Súhlas s analytickými cookies môžete kedykoľvek odvolať
                  cez cookie banner na stránke.
                </p>
              </div>
            </div>
          </section>

          {/* 9. ALTERNATÍVNE RIEŠENIE SPOROV */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <h2 className="font-bold text-sm">9. Alternatívne riešenie sporov</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-3">
              <p>V prípade sporu má zákazník právo na mimosúdne riešenie podľa zákona č. 391/2015 Z.z.:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-1">🏛️ Inšpektorát SOI pre Trenčiansky kraj</p>
                  <p className="text-xs text-gray-600">Hurbanova 59, 911 01 Trenčín</p>
                  <p className="text-xs text-gray-600">Tel: 032/640 01 09 | Email: tn@soi.sk</p>
                  <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">www.soi.sk</a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-1">🇪🇺 Platforma EÚ – ADR</p>
                  <p className="text-xs text-gray-600 mb-1">Online riešenie spotrebiteľských sporov</p>
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">ec.europa.eu/consumers/odr</a>
                </div>
              </div>
            </div>
          </section>

          {/* 10. FAQ */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <h2 className="font-bold text-sm">10. Časté otázky (FAQ)</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
                    <ChevronUp className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-0' : 'rotate-180'}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 11. ZÁVEREČNÉ USTANOVENIA */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <h2 className="font-bold text-sm">11. Záverečné ustanovenia</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '✓ Zákon č. 108/2024 Z.z. o ochrane spotrebiteľa',
                  '✓ Zákon č. 40/1964 Zb. – Občiansky zákonník',
                  '✓ Zákon č. 18/2018 Z.z. o ochrane osobných údajov',
                  '✓ Nariadenie EÚ 2016/679 (GDPR)',
                  '✓ Zákon č. 22/2004 Z.z. o elektronickom obchode',
                  '✓ Zákon č. 391/2015 Z.z. o alternatívnom riešení sporov',
                ].map(item => (
                  <div key={item} className="bg-green-50 text-green-800 text-xs rounded-lg px-3 py-2">{item}</div>
                ))}
              </div>
              <p className="text-xs text-gray-500 pt-2">
                Tieto VOP nadobúdajú účinnosť <strong>22. decembra 2025</strong>. Na objednávky zadané pred
                zmenou VOP sa vzťahuje verzia platná v čase uzavretia zmluvy. Predávajúci si vyhradzuje
                právo na zmenu; aktuálne znenie je vždy dostupné na{' '}
                <a href="https://www.fixanto.sk" className="text-blue-600 hover:underline">www.fixanto.sk</a>
              </p>
            </div>
          </section>

          {/* Rýchly prehľad */}
          <section className="bg-blue-600 text-white rounded-xl p-5 shadow-md">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Rýchly prehľad
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { icon: '📱', label: 'Displeje (nové)', value: '24 mes.' },
                { icon: '🔧', label: 'Práca servisu', value: '3 mes.' },
                { icon: '📦', label: 'Použitý iPhone', value: '12 mes.' },
                { icon: '⚡', label: 'Adaptér 20W', value: '24 mes.' },
                { icon: '🔍', label: 'Diagnostika', value: 'Zadarmo / 15 €' },
                { icon: '📋', label: 'Reklamácia', value: 'max 30 dní' },
                { icon: '🔄', label: 'Vrátenie e-shop', value: '14 dní' },
                { icon: '🔒', label: 'Databáza', value: 'Supabase EU' },
              ].map(item => (
                <div key={item.label} className="bg-blue-700 rounded-lg p-2">
                  <div className="text-lg">{item.icon}</div>
                  <div className="text-xs text-blue-200 mt-0.5">{item.label}</div>
                  <div className="font-bold text-xs mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-blue-200">
              <span>📞 0949 344 600</span>
              <span>✉️ phoneservissk@gmail.com</span>
              <span>🌐 www.fixanto.sk</span>
            </div>
          </section>

          <div className="text-center text-xs text-gray-400 pb-6">
            <p>VOP v. 3.0 — účinnosť od 22. decembra 2025</p>
            <p className="mt-1">© 2025 Štefan Hupčík – Fixanto. Všetky práva vyhradené.</p>
          </div>

        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="fixed bottom-6 right-6 bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors z-50"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}