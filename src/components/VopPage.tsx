import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Trash2,
  UserCheck,
  Server
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
      a: 'Áno, ale iba v prípade online objednávky máte právo odstúpiť od zmluvy do 14 dní od prevzatia opraveného zariadenia bez udania dôvodu. Právo na odstúpenie nevzniká v prípade služby, ktorá bola úplne vykonaná s vaším výslovným súhlasom. Pri osobnej návšteve servisu právo na odstúpenie nie je.',
    },
    {
      q: 'Môžem vrátiť zakúpený iPhone?',
      a: 'Áno, pri online nákupe (cez web, WhatsApp alebo email) máte právo vrátiť iPhone bez udania dôvodu do 14 kalendárnych dní od prevzatia. iPhone musí byť v pôvodnom stave, nepoškodený, s príslušenstvom. Pri osobnom nákupe v servise právo na vrátenie nevzniká.',
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
      a: 'Reklamáciu uplatníte kontaktovaním poskytovateľa na tel. 0949 344 600 alebo emailom na phoneservissk@gmail.com. Tovar zašlite s popisom vady a záručným listom. Reklamácia bude vybavená v primeranej lehote, najneskôr do 30 dní.',
    },
    {
      q: 'Kde môžem riešiť spor mimosúdne?',
      a: 'Máte právo na mimosúdne riešenie sporu podľa zákona č. 391/2015 Z.z. prostredníctvom platformy Európskej komisie pre alternatívne riešenie spotrebiteľských sporov online (ADR) alebo cez SOI Trenčín.',
    },
    {
      q: 'Ako požiadam o vymazanie svojich osobných údajov?',
      a: 'Môžete kedykoľvek písomne alebo emailom (phoneservissk@gmail.com) požiadať o vymazanie vašich osobných údajov z našej databázy. Vymazanie vykonáme do 30 dní, pokiaľ nám zákon neukladá povinnosť uchovávania (napr. účtovné doklady).',
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
            <p className="text-gray-300 text-sm mb-1">Platné od 22. decembra 2025 | Verzia 2.0</p>
            <p className="text-gray-400 text-xs">
              Komplexné informácie o vašich právach a našich povinnostiach v súlade s platnou legislatívou SR a nariadeniami EÚ
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

          {/* ── IDENTIFIKÁCIA PREDÁVAJÚCEHO ── */}
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
              </div>
            </div>
          </section>

          {/* ── PREHĽAD PRÁV – TABUĽKA ── */}
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
                    ['Odstúpenie od zmluvy – online oprava / nákup', '14 dní od prevzatia', '§ 19 zák. č. 108/2024 Z.z.'],
                    ['Záruka na nové displeje', '24 mesiacov (funkčnosť a výrobné vady)', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na prácu servisu', '3 mesiace', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na batérie – funkčnosť', '24 mesiacov', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na batérie – kapacita', '6 mesiacov', '§ 620 Občianskeho zákonníka'],
                    ['Záruka na nový iPhone', '24 mesiacov', '§ 609 Občianskeho zákonníka'],
                    ['Záruka na použitý iPhone', '12 mesiacov (skrátená dohodou)', '§ 612 ods. 4 Občianskeho zákonníka'],
                    ['Vybavenie reklamácie', 'Primeraná lehota, max. 30 dní', '§ zákon č. 108/2024 Z.z.'],
                    ['Dodacia lehota', '0–5 pracovných dní (bežne)', 'Obchodné podmienky'],
                    ['Bezplatná diagnostika', 'Pri pristúpení k oprave / 15 € pri odmietnutí', 'Obchodné podmienky'],
                    ['Vrátenie sumy pri online odstúpení', '14 dní od doručenia vráteného tovaru', '§ zákon č. 108/2024 Z.z.'],
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

          {/* ── OPRAVY ── */}
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
              <div className="space-y-2 pt-2">
                <p><strong>3.1</strong> Cena opravy je dohodnutá pred začatím opravy. Zákazník bude o cene informovaný po diagnostike a môže opravu odmietnuť.</p>
                <p><strong>3.2</strong> Bezplatná diagnostika pri súhlase s opravou. Pri odmietnutí opravy po diagnostike sa účtuje diagnostický poplatok <strong>15 €</strong>.</p>
                <p><strong>3.3</strong> O dokončení opravy bude zákazník informovaný telefonicky, WhatsApp alebo emailom.</p>
                <p><strong>3.4</strong> Zariadenie neprevzaté do <strong>90 dní</strong> od dokončenia opravy môže byť po predchádzajúcom upozornení zlikvidované.</p>
                <p><strong>3.5</strong> Poskytovateľ nezodpovedá za stratu dát. Zákazník je povinný zálohovať dáta pred odovzdaním zariadenia.</p>
              </div>
            </div>
          </section>

          {/* ── PREDAJ IPHONOV ── */}
          <section className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
            <div className="bg-blue-700 text-white px-5 py-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <h2 className="font-bold text-sm">4. Podmienky predaja iPhonov</h2>
            </div>
            <div className="p-5 space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Nový iPhone', value: '24 mesiacov', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
                  { label: 'Použitý iPhone', value: '12 mesiacov', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                  { label: 'Vrátenie – online', value: '14 dní', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} border ${item.border} rounded-lg p-3 text-center`}>
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <p><strong>4.1</strong> Predávajúci predáva <strong>prevažne použité iPhony</strong>. Zákonná zodpovednosť za vady je pri použitom tovare skrátená dohodou na <strong>12 mesiacov</strong> podľa § 612 ods. 4 Občianskeho zákonníka. Toto je zákonom stanovené minimum – kratšiu dobu nie je možné dohodnúť.</p>
                <p><strong>4.2</strong> Pri každom predávanom iPhone predávajúci povinne uvádza: <strong>kategóriu stavu (A/B/Repasovaný)</strong>, <strong>zdravie batérie v %</strong>, popis všetkých viditeľných vád a obsah balenia.</p>
                <p><strong>4.3</strong> Predávajúci nezodpovedá za vady, ktoré boli zákazníkovi <strong>výslovne oznámené pred kúpou</strong> a zákazník s nimi výslovne súhlasil (napr. kozmetické poškodenia popísané a nafotené v inzeráte).</p>
                <p><strong>4.4</strong> Zmluva je uzavretá okamihom potvrdenia objednávky zo strany predávajúceho. Kúpna cena je splatná pri prevzatí alebo vopred bankovým prevodom.</p>
                <p><strong>4.5</strong> Predávajúci si vyhradzuje právo odmietnuť objednávku, ak iPhone medzičasom nie je k dispozícii. V takom prípade bude zákazník bezodkladne informovaný a prípadná platba vrátená.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-xs font-medium">
                  ⚠️ Právo na 14-dňové vrátenie (§ 19 zák. č. 108/2024 Z.z.) platí <strong>iba pri online nákupe</strong> (cez web, WhatsApp, email). Pri osobnom nákupe v servise toto právo nevzniká.
                </p>
              </div>
            </div>
          </section>

          {/* ── PLATBY ── */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Euro className="w-4 h-4" />
              <h2 className="font-bold text-sm">5. Platobné podmienky</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: '💵', label: 'Hotovosť', desc: 'Pri osobnom prevzatí' },
                  { icon: '💳', label: 'Platobná karta', desc: 'Pri prevzatí' },
                  { icon: '🏦', label: 'Bankový prevod', desc: 'Na účet pred expedíciou' },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-semibold text-gray-800 text-xs">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">📋 Doklad o zaplatení slúži zároveň ako záručný list. Splatnosť: pri prevzatí tovaru/služby, ak nie je dohodnuté inak.</p>
            </div>
          </section>

          {/* ── DODACIE LEHOTY ── */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <h2 className="font-bold text-sm">6. Dodacie lehoty</h2>
            </div>
            <div className="p-5 text-sm text-gray-700 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {[
                  { label: 'Štandardná lehota', value: '0–5 pracovných dní' },
                  { label: 'Pri objednávke dielov', value: '+1–2 pracovné dni' },
                  { label: 'Maximálna lehota', value: '30 dní (zákonná)' },
                  { label: 'Náhradné zariadenie', value: 'Bezplatne (podľa dostupnosti)' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">🔔 O dokončení opravy / odoslaní tovaru informujeme cez WhatsApp, telefón alebo email.</p>
            </div>
          </section>

          {/* ── OCHRANA OSOBNÝCH ÚDAJOV / GDPR + SUPABASE ── */}
          <section className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
            <div className="bg-purple-700 text-white px-5 py-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <h2 className="font-bold text-sm">7. Ochrana osobných údajov (GDPR)</h2>
            </div>
            <div className="p-5 space-y-5 text-sm text-gray-700">

              {/* Prevádzkovateľ */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  7.1 Prevádzkovateľ osobných údajov
                </h3>
                <p>
                  Prevádzkovateľom osobných údajov v zmysle čl. 4 ods. 7 nariadenia GDPR je:{' '}
                  <strong>Štefan Hupčík – Fixanto</strong>, Dolná Súča 877, 913 32 Dolná Súča,
                  IČO: 57310998, email: phoneservissk@gmail.com.
                </p>
              </div>

              {/* Aké údaje zbierame */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  7.2 Aké osobné údaje spracúvame
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-gray-500 mb-2">Pri odoslaní objednávky (opravy alebo kúpy iPhonu) cez webový formulár zhromažďujeme:</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Meno a priezvisko</strong> – identifikácia zákazníka</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Telefónne číslo</strong> – komunikácia ohľadom objednávky</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Emailová adresa</strong> – potvrdenie objednávky, reklamačná komunikácia</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Adresa doručenia</strong> – pri zaslaní opraveného zariadenia alebo zakúpeného iPhonu</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Popis zariadenia a závady</strong> – technické informácie pre vybavenie opravy</span></li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" /><span><strong>Informácie o objednávke</strong> – typ opravy/produktu, cena, dátum</span></li>
                  </ul>
                </div>
              </div>

              {/* Účel a právny základ */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  7.3 Účel a právny základ spracúvania
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
                      <tr>
                        <td className="p-2">Vybavenie objednávky / opravy</td>
                        <td className="p-2 text-purple-700 font-medium">Čl. 6 ods. 1 písm. b) – plnenie zmluvy</td>
                        <td className="p-2">Po dobu trvania záručnej doby + 1 rok</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-2">Komunikácia so zákazníkom</td>
                        <td className="p-2 text-purple-700 font-medium">Čl. 6 ods. 1 písm. b) – plnenie zmluvy</td>
                        <td className="p-2">Po dobu trvania záručnej doby + 1 rok</td>
                      </tr>
                      <tr>
                        <td className="p-2">Vedenie účtovných dokladov</td>
                        <td className="p-2 text-purple-700 font-medium">Čl. 6 ods. 1 písm. c) – zákonná povinnosť</td>
                        <td className="p-2">10 rokov (zákon o účtovníctve)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-2">Riešenie reklamácií a sporov</td>
                        <td className="p-2 text-purple-700 font-medium">Čl. 6 ods. 1 písm. c) + f) – zákonná povinnosť / oprávnený záujem</td>
                        <td className="p-2">Po dobu reklamačného konania + 3 roky</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Supabase – sprostredkovateľ */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" />
                  7.4 Technické spracúvanie údajov – Supabase
                </h3>
                <p className="text-xs text-blue-800 mb-3">
                  Osobné údaje zadané prostredníctvom objednávkového formulára sú ukladané do databázy
                  prevádzkovanej službou <strong>Supabase</strong>. Supabase vystupuje ako{' '}
                  <strong>sprostredkovateľ osobných údajov</strong> (data processor) v zmysle čl. 28 GDPR.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-semibold text-gray-800 mb-1">📍 Sídlo prevádzkovateľa služby</p>
                    <p className="text-xs text-gray-600">Supabase Inc., San Francisco, CA, USA</p>
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">supabase.com/privacy</a>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-semibold text-gray-800 mb-1">🖥️ Umiestnenie serverov</p>
                    <p className="text-xs text-gray-600">Dáta sú ukladané na serveroch v <strong>Európskej únii</strong> (AWS EU región). Výber EU regiónu zabezpečuje súlad s požiadavkami GDPR na ukladanie dát.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-semibold text-gray-800 mb-1">📄 Zmluva o spracúvaní (DPA)</p>
                    <p className="text-xs text-gray-600">S poskytovateľom Supabase je uzavretá <strong>Zmluva o spracúvaní osobných údajov (DPA)</strong> v súlade s čl. 28 GDPR. Supabase spracúva údaje výlučne na základe pokynov prevádzkovateľa.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <p className="text-xs font-semibold text-gray-800 mb-1">🔒 Prenosy mimo EÚ</p>
                    <p className="text-xs text-gray-600">V prípade prípadného prenosu osobných údajov mimo EÚ/EHP využíva Supabase <strong>štandardné zmluvné doložky (SCC)</strong> schválené Európskou komisiou.</p>
                  </div>
                </div>
                <div className="mt-3 bg-blue-100 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>Čo Supabase uchováva:</strong> Objednávkové formuláre obsahujú meno, telefón, email,
                    adresu doručenia a popis závady/objednávky. Tieto údaje slúžia <strong>výlučne na vybavenie
                    vašej objednávky alebo opravy</strong> a nie sú poskytované tretím stranám na marketingové účely.
                  </p>
                </div>
              </div>

              {/* Práva dotknutej osoby */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  7.5 Vaše práva ako dotknutej osoby
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { icon: '👁️', title: 'Právo na prístup', desc: 'Kedykoľvek môžete požiadať o informáciu, aké údaje o vás spracúvame.' },
                    { icon: '✏️', title: 'Právo na opravu', desc: 'Môžete požiadať o opravu nesprávnych alebo neúplných údajov.' },
                    { icon: '🗑️', title: 'Právo na vymazanie', desc: 'Môžete požiadať o vymazanie údajov (právo na zabudnutie), ak pominul účel spracúvania.' },
                    { icon: '⏸️', title: 'Právo na obmedzenie', desc: 'Môžete požiadať o dočasné obmedzenie spracúvania vašich údajov.' },
                    { icon: '📦', title: 'Právo na prenosnosť', desc: 'Môžete požiadať o poskytnutie údajov v štruktúrovanom, strojovo čitateľnom formáte.' },
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
                    📧 Žiadosť o uplatnenie práv zasielajte na:{' '}
                    <a href="mailto:phoneservissk@gmail.com" className="font-semibold hover:underline">
                      phoneservissk@gmail.com
                    </a>{' '}
                    – odpovieme do <strong>30 dní</strong>. Ak nie ste spokojní s vybavením, máte právo podať
                    sťažnosť na <strong>Úrad na ochranu osobných údajov SR</strong> (ÚOOÚ), Hraničná 12,
                    820 07 Bratislava,{' '}
                    <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">
                      www.dataprotection.gov.sk
                    </a>
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  7.6 Cookies a analytika
                </h3>
                <p className="text-xs text-gray-600">
                  Webová stránka www.fixanto.sk používa <strong>Google Analytics</strong> na analýzu návštevnosti.
                  Google Analytics zbiera anonymizované údaje o správaní návštevníkov (počet návštev, zdroje
                  návštevnosti, zariadenia). Tieto údaje neumožňujú identifikáciu konkrétnej osoby. Súhlas
                  s analytickými cookies môžete kedykoľvek odvolať cez cookie banner na stránke.
                </p>
              </div>

            </div>
          </section>

          {/* ── ALTERNATÍVNE RIEŠENIE SPOROV ── */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <h2 className="font-bold text-sm">8. Alternatívne riešenie sporov</h2>
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

          {/* ── FAQ ── */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <h2 className="font-bold text-sm">9. Časté otázky (FAQ)</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
                    <ChevronUp
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
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

          {/* ── ZÁVEREČNÉ USTANOVENIA ── */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <h2 className="font-bold text-sm">10. Záverečné ustanovenia</h2>
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
                Tieto VOP nadobúdajú účinnosť <strong>22. decembra 2025</strong>. Predávajúci si vyhradzuje
                právo na ich zmenu; aktuálne znenie je vždy dostupné na{' '}
                <a href="https://www.fixanto.sk" className="text-blue-600 hover:underline">www.fixanto.sk</a>
              </p>
            </div>
          </section>

          {/* Sticky sidebar summary */}
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
                { icon: '⏱️', label: 'Dodacia lehota', value: '0–5 dní' },
                { icon: '🔍', label: 'Diagnostika', value: 'Zadarmo / 15 €' },
                { icon: '📋', label: 'Reklamácia', value: 'max 30 dní' },
                { icon: '🔄', label: 'Vrátenie online', value: '14 dní' },
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
            <p className="text-center text-xs text-blue-300 mt-3">
              Kontaktujte nás: WhatsApp • Messenger • Instagram • Email • Telefón
            </p>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pb-6">
            <p>© 2025 Štefan Hupčík – Fixanto. Všetky práva vyhradené.</p>
            <p className="mt-1 text-gray-500">
              Ďakujeme, že ste si vybrali Fixanto. Sme tu pre vás.
            </p>
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
