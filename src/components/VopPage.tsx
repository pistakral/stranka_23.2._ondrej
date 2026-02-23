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
  ChevronUp
} from 'lucide-react';

export default function VopPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ✅ GOOGLE ANALYTICS */}
      <GoogleAnalytics />

      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-20 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* HLAVIČKA */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">
                Právne informácie
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">Platné od 22.decembra 2025 | Verzia 1.0</p>
            <p className="text-lg text-gray-500">
              Komplexné informácie o vašich právach a našich povinnostiach v súlade s platnou legislatívou Slovenskej republiky a nariadeniami Európskej únie
            </p>
          </div>

          {/* IDENTIFIKAČNÉ ÚDAJE POSKYTOVATEĽA */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-blue-600" />
              Identifikačné údaje poskytovateľa
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-lg"><strong className="text-gray-700">Obchodné meno:</strong> Štefan Hupčík - Fixanto</p>
                <p className="text-lg"><strong className="text-gray-700">Sídlo:</strong> Dolná Súča 877, 913 32 Dolná Súča</p>
                <p className="text-lg"><strong className="text-gray-700">IČO:</strong> 57310998</p>
                <p className="text-lg"><strong className="text-gray-700">DIČ:</strong> 1130682366</p>
                <p className="text-sm text-gray-500 italic">Poskytovateľ nie je platcom DPH</p>
              </div>
              <div className="space-y-3">
                <p className="text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <strong className="text-gray-700">Telefón:</strong> 
                  <a href="tel:0949344600" className="text-blue-600 hover:underline">0949 344 600</a>
                </p>
                <p className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <strong className="text-gray-700">Email:</strong> 
                  <a href="mailto:phoneservissk@gmail.com" className="text-blue-600 hover:underline">phoneservissk@gmail.com</a>
                </p>
                <p className="text-lg"><strong className="text-gray-700">Web:</strong> www.fixanto.sk</p>
              </div>
            </div>
          </div>

          {/* ZHRNUTIE PRÁV ZÁKAZNÍKA - TABUĽKA */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
              Prehľad práv zákazníka
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 font-bold text-gray-900">Právo zákazníka</th>
                  <th className="border border-gray-300 px-4 py-3 font-bold text-gray-900">Lehota / Podmienka</th>
                  <th className="border border-gray-300 px-4 py-3 font-bold text-gray-900">Právny základ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Právo na odstúpenie od zmluvy (online objednávka/oprava)</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>14 dní</strong> od prevzatia tovaru/služby</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 7 zákona č. 108/2024 Z.z.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Záručná doba na nové displeje</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>24 mesiacov</strong> (funkčnosť a výrobné vady)</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 620 Občianskeho zákonníka</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Záručná doba na prácu servisu (opravy)</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>3 mesiace</strong></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 620 Občianskeho zákonníka</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Záručná doba na batérie - funkčnosť</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>24 mesiacov</strong> (nabíjanie, vypínanie)</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 620 Občianskeho zákonníka</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Záručná doba na batérie - kapacita</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>6 mesiacov</strong> (výrazné zníženie kapacity)</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 620 Občianskeho zákonníka</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Vybavenie reklamácie</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>Do 30 dní</strong> od uplatnenia</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 18 zákona č. 108/2024 Z.z.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Dodacia lehota tovaru/služby</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>0-5 pracovných dní</strong> (bežne)</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">Obchodné podmienky</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Bezplatná diagnostika</td>
                  <td className="border border-gray-300 px-4 py-3">Pri pristúpení k oprave / <strong>15 EUR</strong> pri odmietnutí</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">Obchodné podmienky</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Vrátenie už zaplatenej sumy (online objednávka)</td>
                  <td className="border border-gray-300 px-4 py-3"><strong>14 dní</strong> od odstúpenia</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">§ 10 zákona č. 108/2024 Z.z.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DETAILNÉ VYSVETLENIE ZÁRUČNÝCH DÔB */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailné vysvetlenie záručných dôb</h2>
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  📱 Displeje (nový diel)
                </h3>
                <p className="text-gray-700 mb-3"><strong className="text-blue-600">Záruka: 24 mesiacov</strong></p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
                  <li>Platí, ak ide o <strong>nový displej</strong> namontovaný v servise</li>
                  <li>Záruka sa vzťahuje na <strong>funkčnosť a výrobné vady</strong></li>
                  <li><strong>Nevzťahuje sa na:</strong> mechanické poškodenie, prasknutie, škrabance, poškodenie tekutinou</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  🔧 Opravy (práca servisu)
                </h3>
                <p className="text-gray-700 mb-3"><strong className="text-blue-600">Záruka: 3 mesiace</strong></p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
                  <li>Ide o záruku na <strong>vykonanú prácu</strong></li>
                  <li>Platí len na <strong>konkrétnu opravu</strong>, nie na celý telefón</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  🔋 Batérie
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong className="text-blue-600">Záruka na funkčnosť: 24 mesiacov</strong><br/>
                  <strong className="text-orange-600">Záruka na kapacitu: 6 mesiacov</strong>
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
                  <li>Platí, ak ide o <strong>novú batériu</strong></li>
                  <li>⚠️ <strong>Kapacita batérie</strong> je spotrebný materiál - prirodzené znižovanie kapacity nie je vada</li>
                  <li>Zvyčajne sa uznáva vada, ak:
                    <ul className="list-circle ml-6 mt-2 space-y-1">
                      <li>Batéria má výrazne nízku kapacitu krátko po výmene (prvých 6 mesiacov)</li>
                      <li>Batéria sa vypína alebo nenabíja správne (24 mesiacov)</li>
                    </ul>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* PLATOBNÉ A DODACIE PODMIENKY - ZHRNUTIE */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Euro className="w-6 h-6 text-green-600" />
                Platobné podmienky
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Hotovosť</strong> pri osobnom prevzatí</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Platobná karta</strong> pri prevzatí</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Bankový prevod</strong> (na účet pred expedíciou)</span>
                </p>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-gray-600">
                    📋 <strong>Doklad o zaplatení</strong> slúži zároveň ako záručný list
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    💳 <strong>Splatnosť:</strong> Pri prevzatí tovaru (ak nie je dohodnuté inak)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Package className="w-6 h-6 text-blue-600" />
                Dodacie podmienky
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Štandardná lehota:</strong> 0-5 pracovných dní</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Pri objednávke dielov:</strong> +1-2 pracovné dni</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Maximálna lehota:</strong> 30 dní (zákonná)</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Náhradné zariadenie:</strong> Bezplatne na dobu opravy (podľa dostupnosti)</span>
                </p>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm text-gray-600">
                    📦 <strong>Upozornenie:</strong> Zariadenie neprevzaté do 90 dní môže byť zlikvidované
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    🔔 <strong>Notifikácia:</strong> O dokončení opravy informujeme WhatsApp/telefón/email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ČASTO KLADENÉ OTÁZKY - FAQ */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Často kladené otázky (FAQ)</h2>
            <div className="space-y-6">
              
              <div className="border-l-4 border-blue-500 pl-5 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Môžem odstúpiť od zmluvy po tom, čo už bola oprava vykonaná?</h3>
                <p className="text-gray-700">
                  Áno, ale <strong>iba v prípade online objednávky</strong> máte právo odstúpiť od zmluvy do <strong>14 dní</strong> od prevzatia opraveného zariadenia bez udania dôvodu. Právo na odstúpenie nevzniká v prípade služby, ktorá bola úplne vykonaná s vaším výslovným súhlasom. Pri osobnej návšteve servisu právo na odstúpenie nie je.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-5 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Čo ak sa vada opakuje aj po oprave?</h3>
                <p className="text-gray-700">
                  Ak sa tá istá vada vyskytne viac ako <strong>2-krát</strong> po oprave, máte právo požadovať výmenu zariadenia alebo odstúpiť od zmluvy a získať vrátenie peňazí. Toto platí podľa § 623 Občianskeho zákonníka.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-5 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Kto platí náklady na vrátenie tovaru pri odstúpení?</h3>
                <p className="text-gray-700">
                  Kupujúci znáša náklady spojené s vrátením tovaru pri odstúpení od zmluvy. Tovar je potrebné vrátiť v pôvodnom stave vrátane všetkých vymenených dielov.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-5 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Zodpovedáte za stratu dát v mojom zariadení?</h3>
                <p className="text-gray-700">
                  <strong>Nie</strong>, poskytovateľ nenesie zodpovednosť za stratu dát uložených v zariadení. Zákazník je zodpovedný za vytvorenie zálohy dát pred odovzdaním zariadenia na opravu.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-5 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Ako môžem uplatniť reklamáciu?</h3>
                <p className="text-gray-700">
                  Reklamáciu uplatníte kontaktovaním poskytovateľa na tel. <strong>0949 344 600</strong> alebo emailom na <strong>phoneservissk@gmail.com</strong>. Tovar zašlite s popisom vady a záručným listom. Reklamácia bude vybavená do 30 dní.
                </p>
              </div>

            </div>
          </div>

          {/* ALTERNATÍVNE RIEŠENIE SPOROV A ORGÁNY DOZORU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Alternatívne riešenie sporov
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Máte právo na mimosúdne riešenie sporu podľa zákona č. 391/2015 Z.z. prostredníctvom platformy Európskej komisie pre alternatívne riešenie spotrebiteľských sporov online (ADR).
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors no-underline text-sm"
              >
                Platforma EC pre riešenie sporov ↗
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Slovenská obchodná inšpekcia
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Inšpektorát SOI pre Trenčiansky kraj</strong></p>
                <p>Hurbanova 59, 911 01 Trenčín</p>
                <p className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span>032/640 01 09</span>
                </p>
                <p className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span>tn@soi.sk</span>
                </p>
                <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.soi.sk ↗
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-lg mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Úrad na ochranu osobných údajov
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>ÚOOÚ SR</strong></p>
                <p>Hraničná 12, 820 07 Bratislava</p>
                <p className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span>02/3231 3214</span>
                </p>
                <p className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-orange-600" />
                  <span>statny.dozor@pdp.gov.sk</span>
                </p>
                <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.dataprotection.gov.sk ↗
                </a>
              </div>
            </div>
          </div>

          {/* DÔLEŽITÉ INFORMÁCIE PRE ZÁKAZNÍKOV */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-12 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Info className="w-7 h-7" />
              Kľúčové informácie v skratke
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-bold text-lg mb-3 border-b border-blue-400 pb-2">Záručné doby</h4>
                <p>📱 <strong>Displeje (nové):</strong> 24 mesiacov</p>
                <p>🔧 <strong>Práca servisu:</strong> 3 mesiace</p>
                <p>🔋 <strong>Batéria (funkčnosť):</strong> 24 mesiacov</p>
                <p>🔋 <strong>Batéria (kapacita):</strong> 6 mesiacov</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-lg mb-3 border-b border-blue-400 pb-2">Lehoty a platby</h4>
                <p>⏱️ <strong>Dodacia lehota:</strong> 0-5 dní</p>
                <p>🔍 <strong>Diagnostika:</strong> Bezplatná / 15 EUR</p>
                <p>📋 <strong>Reklamácia:</strong> Vybavenie do 30 dní</p>
                <p>🔄 <strong>Odstúpenie:</strong> 14 dní (online objednávka)</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-lg mb-3 border-b border-blue-400 pb-2">Kontakt</h4>
                <p>📞 <strong>Telefón:</strong> 0949 344 600</p>
                <p>✉️ <strong>Email:</strong> phoneservissk@gmail.com</p>
                <p>🌐 <strong>Web:</strong> www.fixanto.sk</p>
              </div>
            </div>
          </div>

          {/* LEGISLATÍVNY ZÁKLAD */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Legislatívny rámec našich služieb</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p>✓ <strong>Zákon č. 108/2024 Z.z.</strong> o ochrane spotrebiteľa</p>
                <p>✓ <strong>Zákon č. 40/1964 Zb.</strong> Občiansky zákonník</p>
                <p>✓ <strong>Zákon č. 18/2018 Z.z.</strong> o ochrane osobných údajov</p>
              </div>
              <div className="space-y-2">
                <p>✓ <strong>Nariadenie EÚ 2016/679</strong> (GDPR)</p>
                <p>✓ <strong>Zákon č. 22/2004 Z.z.</strong> o elektronickom obchode</p>
                <p>✓ <strong>Zákon č. 391/2015 Z.z.</strong> o alternatívnom riešení sporov</p>
              </div>
            </div>
          </div>

          {/* KONTAKTNÁ CTA SEKCIA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-10 shadow-2xl mb-8">
            <h3 className="text-3xl font-bold mb-4">Máte otázky k právnym dokumentom?</h3>
            <p className="text-xl mb-8 opacity-90">Kontaktujte nás kedykoľvek</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a 
                href="tel:0949344600" 
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl no-underline inline-flex items-center gap-3 text-lg"
              >
                <Phone className="w-6 h-6" />
                0949 344 600
              </a>
              <a 
                href="mailto:phoneservissk@gmail.com" 
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl no-underline inline-flex items-center gap-3 text-lg"
              >
                <Mail className="w-6 h-6" />
                phoneservissk@gmail.com
              </a>
            </div>
            <p className="mt-6 text-sm opacity-75">
              WhatsApp • Messenger • Instagram • Email • Telefón
            </p>
          </div>

          {/* SPÄŤ NA HLAVNÚ STRÁNKU */}
          <div className="text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg no-underline"
            >
              <Home className="w-6 h-6" />
              Späť na hlavnú stránku
            </Link>
          </div>

        </div>
      </div>

      {/* ✅ COOKIE BANNER */}
      <CookieBanner />

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-7 h-7" />
        </button>
      )}
    </>
  );
}
