import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import {
  Shield,
  Lock,
  FileText,
  Mail,
  AlertTriangle,
  CheckCircle,
  ChevronUp,
  Database,
  Users,
  Server
} from 'lucide-react';

export default function OchranaOsobnychUdajov() {
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

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">
                Ochrana osobných údajov (GDPR)
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">Platné od 22.decembra 2025 | Verzia 2.0</p>
            <p className="text-lg text-gray-500">
              V súlade s Nariadením GDPR (EÚ) 2016/679 a zákonom č. 18/2018 Z. z. o ochrane osobných údajov
            </p>
          </div>

          {/* Zjednodušený prehľad GDPR */}
          <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Zjednodušený prehľad spracúvania údajov
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Spracúvame iba údaje nevyhnutné na opravu vášho zariadenia a komunikáciu. Nikdy ich nepredávame!
            </p>
            <div className="space-y-4 text-gray-800 text-lg">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Vaše údaje sú chránené HTTPS šifrovaním a GDPR</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Google Analytics a MailerLite len so súhlasom</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Môžete kedykoľvek požiadať o vymazanie údajov</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Kontakty: 0949 344 600 | WhatsApp | Email</span>
              </div>
            </div>
          </div>

          {/* Detailný obsah */}
          <div className="space-y-8">

            {/* 1. PREVÁDZKOVATEĽ */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                1. Prevádzkovateľ osobných údajov
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Prevádzkovateľ:</strong> Fixanto – Servis mobilov a elektroniky
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Sídlo:</strong> Dolná Súča 877, Slovenská republika
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Kontakt:</strong> <a href="tel:0949344600" className="text-blue-600 hover:underline">0949 344 600</a> | <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp</a>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Web:</strong> <a href="https://fixanto.sk" className="text-blue-600 hover:underline">fixanto.sk</a>
                </p>
              </div>
            </div>

            {/* 2. ÚČELY SPRACÚVANIA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Database className="w-8 h-8 text-blue-600" />
                2. Účely spracúvania, právne základy a doba uchovávania
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Vaše osobné údaje spracúvame len v rozsahu, ktorý je nevyhnutný na splnenie nižšie uvedených účelov, a vždy na základe príslušného právneho základu podľa čl. 6 GDPR a zákona č. 18/2018 Z. z.
              </p>

              <div className="space-y-6">
                {/* a) Servisné služby */}
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    🔧 a) Poskytnutie servisných služieb (opravy a diagnostika)
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Meno a priezvisko, telefónne číslo, e-mail, prípadne adresa, typ a model zariadenia, popis závady, servisná história
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zmluvy a predzmluvné vzťahy (čl. 6 ods. 1 písm. b GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Počas trvania zmluvného vzťahu a záručnej lehoty (2 roky), následne po dobu nevyhnutnú na splnenie zákonných povinností (účtovníctvo – 10 rokov)
                  </p>
                </div>

                {/* b) Reklamácie */}
                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    📋 b) Reklamácie, záručný a pozáručný servis
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Údaje uvedené v bode a) + údaje o reklamovanom zariadení, dátum reklamácie, popis závady a spôsob vybavenia
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zákonnej povinnosti (čl. 6 ods. 1 písm. c GDPR; predpisy o ochrane spotrebiteľa)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu trvania záručnej lehoty (2 roky) a ďalej v súlade so zákonom o účtovníctve (10 rokov)
                  </p>
                </div>

                {/* c) Komunikácia */}
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    💬 c) Komunikácia, dopyty a zákaznícka podpora
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Meno alebo prezývka, kontaktné údaje (telefón, e-mail, účet na sociálnej sieti – WhatsApp, Facebook, Instagram), obsah správy a prípadné prílohy
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Oprávnený záujem – vybavenie vášho dopytu (čl. 6 ods. 1 písm. f GDPR), prípadne plnenie zmluvy (čl. 6 ods. 1 písm. b GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Doba uchovávania:</strong> Po dobu nevyhnutnú na vybavenie dopytu a prípadne po dobu trvania súvisiaceho zmluvného vzťahu
                  </p>
                  <p className="text-gray-700 text-sm mt-3 bg-white/50 p-3 rounded">
                    ℹ️ <strong>Upozornenie:</strong> Pri komunikácii cez WhatsApp, Facebook alebo Instagram sú tieto platformy samostatnými prevádzkovateľmi a údaje spracúvajú v súlade so svojimi podmienkami (Meta Platforms Ireland Limited).
                  </p>
                </div>

                {/* d) Newsletter */}
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    📬 d) Newsletter, marketingové a informačné e-maily (MailerLite)
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> E-mailová adresa, meno (ak ho uviedete), informácia o otvorení e-mailu a kliknutí na odkazy
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Súhlas (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Spracovateľ:</strong> MailerLite (UAB "MailerLite", J. Basanavičiaus 15, Vilnius, Litva – GDPR compliant)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Do odvolania súhlasu alebo odhlásenia sa z odberu (odkaz v pätičke každého e-mailu)
                  </p>
                </div>

                {/* e) Štatistika */}
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    📊 e) Štatistika a analýza návštevnosti webu (Google Analytics)
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Anonymizovaná IP adresa, typ zariadenia a prehliadača, navštívené stránky, čas návštevy, zdroj návštevnosti, približná poloha (krajina, mesto)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Súhlas prostredníctvom cookie lišty (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Spracovateľ:</strong> Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írsko) a Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA – certifikovaný podľa EU-U.S. Data Privacy Framework)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Doba uchovávania:</strong> Podľa nastavení Google Analytics (aktuálne najviac 26 mesiacov od poslednej návštevy)
                  </p>
                  <p className="text-gray-700 text-sm mt-3 bg-white/50 p-3 rounded">
                    ⚠️ <strong>Dôležité:</strong> Bez vášho súhlasu sa analytické cookies nenačítajú a údaje sa nespracúvajú. Súhlas môžete kedykoľvek odvolať vymazaním cookies vo vašom prehliadači alebo zmenou nastavení v cookie banneri.
                  </p>
                  <p className="text-gray-700 mt-3">
                    Viac info: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Google Privacy Policy</a>
                  </p>
                </div>

                {/* f) Právne nároky */}
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    ⚖️ f) Uplatňovanie právnych nárokov a ochrana práv
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Identifikačné a kontaktné údaje, údaje o poskytnutých službách, komunikácia, fakturačné a platobné údaje potrebné na prípadné uplatnenie alebo obranu právnych nárokov
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Oprávnený záujem prevádzkovateľa na ochrane svojich práv a nárokov (čl. 6 ods. 1 písm. f GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu trvania príslušných premlčacích lehôt (spravidla 3–10 rokov, pri súdnych sporoch dlhšie podľa trvania konania)
                  </p>
                </div>

                {/* g) Zákonné povinnosti */}
                <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    📑 g) Plnenie zákonných povinností
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Údaje uvedené v bodoch a) až f) potrebné na splnenie povinností podľa zákona o účtovníctve, zákona o DPH, zákona o dani z príjmov, zákona o ochrane spotrebiteľa a pod.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zákonnej povinnosti (čl. 6 ods. 1 písm. c GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu vyžadovanú príslušným právnym predpisom (spravidla 10 rokov pre účtovné doklady)
                  </p>
                </div>
              </div>
            </div>

            {/* 3. PRÍJEMCOVIA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                3. Príjemcovia a sprostredkovatelia osobných údajov
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Vaše osobné údaje spracúvame primárne my ako prevádzkovateľ. Ak spolupracujeme s externými partnermi, robíme to len v nevyhnutnom rozsahu a na základe zmluvy o spracúvaní osobných údajov.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold text-lg">
                  Vaše údaje <strong className="text-red-600">NEPREDÁVAME ani NEPRENAJÍMAME</strong> tretím stranám na marketingové účely.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4 mb-4 text-lg">
                  Osobné údaje môžu byť poskytnuté alebo sprístupnené týmto kategóriám príjemcov:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">📧 MailerLite</h3>
                    <p className="text-sm text-gray-700">UAB "MailerLite", Vilnius, Litva (EU) – zasielanie newslettera (len so súhlasom)</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">📊 Google Analytics</h3>
                    <p className="text-sm text-gray-700">Google Ireland Limited / Google LLC, USA – analýza návštevnosti webu (len so súhlasom)</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-900 mb-2">🌐 Netlify</h3>
                    <p className="text-sm text-gray-700">Netlify Inc., San Francisco, USA – hosting webovej stránky (technické cookies, logy prístupu)</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <h3 className="font-bold text-gray-900 mb-2">📨 Poskytovateľ e-mailu</h3>
                    <p className="text-sm text-gray-700">Poskytovateľ e-mailovej schránky a cloudového úložiska</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h3 className="font-bold text-gray-900 mb-2">💰 Banky a platobné inštitúcie</h3>
                    <p className="text-sm text-gray-700">Spracovanie platieb (prevody, prípadne platby kartou)</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h3 className="font-bold text-gray-900 mb-2">🧾 Účtovná firma</h3>
                    <p className="text-sm text-gray-700">Spracovanie účtovných dokladov a daňovej agendy (zákonná povinnosť)</p>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h3 className="font-bold text-gray-900 mb-2">📦 Dopravcovia/kuriéri</h3>
                    <p className="text-sm text-gray-700">Len ak je potrebné doručiť zariadenie alebo tovar na vašu adresu</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2">🏛️ Orgány verejnej moci</h3>
                    <p className="text-sm text-gray-700">Daňový úrad, polícia, súdy – len ak to vyžaduje osobitný právny predpis</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mt-6 border border-green-200">
                  <p className="text-gray-700 leading-relaxed">
                    ✅ <strong>Všetci spracovávatelia v EÚ sú GDPR compliant.</strong> S partnermi mimo EÚ (Google, Netlify) máme zabezpečené zodpovedajúce záruky podľa čl. 46 GDPR (certifikácia EU-U.S. Data Privacy Framework, štandardné zmluvné doložky).
                  </p>
                </div>
              </div>
            </div>

            {/* 4. ZABEZPEČENIE */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Lock className="w-8 h-8 text-green-600" />
                4. Ako chránime vaše údaje?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Vaše osobné údaje chránime pomocou primeraných technických a organizačných opatrení:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      Šifrované pripojenie HTTPS
                    </h3>
                    <p className="text-sm text-gray-700">Všetka komunikácia medzi vašim prehliadačom a našou stránkou je šifrovaná</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Obmedzený prístup
                    </h3>
                    <p className="text-sm text-gray-700">Prístup k údajom majú len oprávnené osoby (majiteľ, účtovník)</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Server className="w-5 h-5 text-blue-600" />
                      Pravidelné zálohovanie
                    </h3>
                    <p className="text-sm text-gray-700">Vaše údaje sú pravidelne zálohované na zabezpečených serveroch</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Bezpečné úložisko
                    </h3>
                    <p className="text-sm text-gray-700">Cloud s európskymi servermi (GDPR compliant hosting – Netlify)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. VAŠE PRÁVA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                5. Vaše práva podľa GDPR
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Ako dotknutá osoba máte nasledujúce práva:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">✅ Právo na prístup</h3>
                    <p className="text-gray-700 text-sm">
                      Získať informácie o tom, aké údaje o vás spracúvame, na aký účel, komu ich poskytujeme a ako dlho ich uchovávame
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">✏️ Právo na opravu</h3>
                    <p className="text-gray-700 text-sm">
                      Opraviť nesprávne, neúplné alebo neaktuálne osobné údaje
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">🗑️ Právo na vymazanie</h3>
                    <p className="text-gray-700 text-sm">
                      Požiadať o vymazanie vašich údajov (výnimka: ak ich musíme uchovávať podľa zákona – napr. účtovníctvo)
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">🚫 Právo na obmedzenie</h3>
                    <p className="text-gray-700 text-sm">
                      Obmedziť spracovanie vašich údajov (napr. počas preverenia správnosti údajov)
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">📦 Právo na prenosnosť</h3>
                    <p className="text-gray-700 text-sm">
                      Získať vaše údaje v štruktúrovanom, bežne používanom a strojovo čitateľnom formáte
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">❌ Právo namietať</h3>
                    <p className="text-gray-700 text-sm">
                      Namietať proti spracovaniu na marketingové účely alebo proti spracovaniu na základe oprávneného záujmu
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 mt-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📝 Ako uplatniť svoje práva?</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Svoje práva si môžete uplatniť kontaktovaním nás:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Telefonicky: <a href="tel:0949344600" className="text-blue-600 hover:underline font-semibold">0949 344 600</a></li>
                    <li>WhatsApp: <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Napísať správu</a></li>
                    <li>E-mailom: cez kontaktný formulár na <a href="https://fixanto.sk" className="text-blue-600 hover:underline">fixanto.sk</a></li>
                    <li>Písomne: na adresu sídla prevádzkovateľa (Trenčín)</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4 pt-4 border-t border-yellow-200">
                    <strong>Lehota na odpoveď:</strong> Na vašu žiadosť odpovieme spravidla <strong>do 30 dní</strong> od jej doručenia. V odôvodnených prípadoch (zložitá žiadosť, veľký počet žiadostí) môžeme lehotu predĺžiť o ďalšie dva mesiace, o čom vás vopred informujeme.
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-6 mt-4 border-l-4 border-red-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">⚠️ Právo podať sťažnosť</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ak sa domnievate, že pri spracúvaní osobných údajov došlo k porušeniu vašich práv, máte právo podať sťažnosť na:
                  </p>
                  <div className="mt-3 bg-white rounded-lg p-4">
                    <p className="text-gray-900 font-semibold">Úrad na ochranu osobných údajov Slovenskej republiky</p>
                    <p className="text-gray-700 mt-2">
                      Web: <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">dataprotection.gov.sk</a>
                    </p>
                    <p className="text-gray-700">
                      Email: <a href="mailto:statny.dozor@pdp.gov.sk" className="text-blue-600 underline hover:text-blue-800">statny.dozor@pdp.gov.sk</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. COOKIES */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-gray-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-gray-600" />
                6. Cookies a sledovacie technológie
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Naša webová stránka používa cookies (malé textové súbory uložené vo vašom prehliadači) na zlepšenie vášho zážitku a analýzu návštevnosti.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-500">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔹 Technické cookies (nevyhnutné)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Tieto cookies sú potrebné pre správne fungovanie webu (napr. zapamätanie vášho súhlasu s cookies, základná navigácia).
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Právny základ:</strong> Oprávnený záujem (čl. 6 ods. 1 písm. f GDPR)
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Príklady:</strong> Súhlas s cookie lištou (localStorage), session cookies pre správne fungovanie formulárov
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔹 Analytické cookies (Google Analytics)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Tieto cookies nám pomáhajú pochopiť, ako návštevníci používajú náš web, aby sme ho mohli zlepšovať (sledovanie počtu návštevníkov, najnavštevovanejších stránok, zdroja návštevnosti).
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Používané nástroje:</strong> Google Analytics (Google Ireland Limited)
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Právny základ:</strong> Váš súhlas (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                  <p className="text-gray-700 text-sm font-semibold text-blue-900">
                    ⚠️ <strong>Aktivácia:</strong> Len po vašom súhlase v cookie banneri. Bez súhlasu sa Google Analytics nenačíta.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔹 Marketingové cookies (MailerLite)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Sledujeme, kto sa prihlásil na odber newslettera a jeho aktivitu (otvorenie emailov, kliky na odkazy) – slúži na zlepšenie marketingovej komunikácie.
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Právny základ:</strong> Váš súhlas (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 mt-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">✅ Ako spravovať cookies?</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Svoj súhlas môžete kedykoľvek odvolať vymazaním cookies vo vašom prehliadači (History → Clear browsing data → Cookies)</li>
                    <li>Môžete blokovať cookies v nastaveniach prehliadača (Settings → Privacy → Cookies) – web môže fungovať obmedzene</li>
                    <li>V našom cookie banneri môžete kedykoľvek zmeniť svoje nastavenia (tlačidlo "Nastavenia cookies")</li>
                    <li>Viac info o cookies: <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">aboutcookies.org</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. DODATOČNÉ INFORMÁCIE */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                7. Dodatočné informácie
              </h2>
              <div className="space-y-6">
                
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🤖 Automatizované rozhodovanie a profilovanie</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Nevykonávame</strong> automatizované individuálne rozhodovanie ani profilovanie podľa čl. 22 GDPR. Všetky rozhodnutia (napr. o prijatí objednávky, cenovej ponuke, reklamácii) sú vykonávané ľudským personálom.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">👶 Ochrana detí</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Naše služby nie sú určené osobám mladším ako 16 rokov. Osobné údaje detí mladších ako 16 rokov aktívne nespracúvame. Ak zistíme, že sme neúmyselne získali údaje dieťaťa bez súhlasu rodiča/zákonného zástupcu, tieto údaje bezodkladne vymažeme.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📄 Zdroj osobných údajov</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Všetky osobné údaje získavame <strong>priamo od vás</strong> (prostredníctvom webovej stránky, e-mailovej komunikácie, telefónu, WhatsApp alebo pri osobnom kontakte). Nepoužívame údaje z verejne dostupných zdrojov ani komerčných databáz.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔄 Aktualizácia týchto zásad</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Vyhradzujeme si právo tieto Zásady ochrany osobných údajov kedykoľvek upraviť a zmeniť. V prípade významných zmien vás budeme informovať (napr. všeobecným oznámením na webovej stránke alebo e-mailom).
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Odporúčame</strong> pravidelne navštíviť túto stránku, aby ste boli informovaní o prípadných zmenách.
                  </p>
                </div>
              </div>
            </div>

            {/* 8. KONTAKT */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Mail className="w-7 h-7" />
                8. Kontakt pre otázky o ochrane údajov
              </h2>
              <div className="space-y-3">
                <p className="leading-relaxed text-lg">
                  Ak máte akékoľvek otázky o spracovaní vašich údajov, kontaktujte nás:
                </p>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">📞</span>
                    <span><strong>Telefón:</strong> <a href="tel:0949344600" className="underline hover:text-blue-200 font-semibold">0949 344 600</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">💬</span>
                    <span><strong>WhatsApp:</strong> <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200 font-semibold">Napísať správu</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    <span><strong>Web:</strong> <a href="https://fixanto.sk" className="underline hover:text-blue-200 font-semibold">fixanto.sk</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span><strong>Adresa:</strong> Dolná Súča 877, Slovenská republika</span>
                  </p>
                </div>
                <p className="text-sm mt-4 pt-4 border-t border-white/20">
                  Ďakujeme, že dôverujete Fixantu so svojimi zariadeniami aj údajmi. 💙
                </p>
              </div>
            </div>

            <div className="bg-blue-800 text-white rounded-2xl shadow-lg p-10 text-center mt-8">
              <p className="text-2xl font-bold mb-4">
                Tieto zásady ochrany osobných údajov nadobúdajú účinnosť 22.decembra 2025
              </p>
              <p className="text-xl mb-6">
                © 2025 Štefan Hupčík - Fixanto. Všetky práva vyhradené.
              </p>
              <p className="text-lg">
                Ďakujeme za dôveru. Vaše údaje sú u nás v bezpečí. 🔒
              </p>
            </div>

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
