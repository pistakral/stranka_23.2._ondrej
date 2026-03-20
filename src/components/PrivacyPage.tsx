import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import {
  Shield,
  Lock,
  FileText,
  Mail,
  CheckCircle,
  ChevronUp,
  Database,
  Users,
  Server
} from 'lucide-react';

export default function OchranaOsobnychUdajov() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
            <p className="text-xl text-gray-600 mb-4">Platné od 22. decembra 2025 | Verzia 3.0</p>
            <p className="text-lg text-gray-500">
              V súlade s Nariadením GDPR (EÚ) 2016/679 a zákonom č. 18/2018 Z. z. o ochrane osobných údajov
            </p>
          </div>

          {/* Zjednodušený prehľad */}
          <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Zjednodušený prehľad spracúvania údajov
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Spracúvame iba údaje nevyhnutné na opravu vášho zariadenia, vybavenie objednávky z e-shopu a komunikáciu. Nikdy ich nepredávame!
            </p>
            <div className="space-y-4 text-gray-800 text-lg">
              {[
                'Vaše údaje sú chránené HTTPS šifrovaním a GDPR',
                'Objednávky z e-shopu sú ukladané v zabezpečenej databáze (Supabase, servery EÚ)',
                'Google Analytics a MailerLite len so súhlasom',
                'Môžete kedykoľvek požiadať o vymazanie údajov',
                'Kontakty: 0949 344 600 | WhatsApp | Email',
              ].map((text) => (
                <div key={text} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">

            {/* 1. PREVÁDZKOVATEĽ */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                1. Prevádzkovateľ osobných údajov
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Prevádzkovateľ:</strong> Štefan Hupčík – Fixanto
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Sídlo:</strong> Dolná Súča 877, 913 32 Dolná Súča, Slovenská republika
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">IČO:</strong> 57310998
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong className="text-gray-900">Kontakt:</strong>{' '}
                  <a href="tel:0949344600" className="text-blue-600 hover:underline">0949 344 600</a>
                  {' | '}
                  <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp</a>
                  {' | '}
                  <a href="mailto:phoneservissk@gmail.com" className="text-blue-600 hover:underline">phoneservissk@gmail.com</a>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Web:</strong>{' '}
                  <a href="https://fixanto.sk" className="text-blue-600 hover:underline">fixanto.sk</a>
                  {' | '}
                  <a href="https://fixanto.sk/eshop" className="text-blue-600 hover:underline">fixanto.sk/eshop (e-shop)</a>
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
                Vaše osobné údaje spracúvame len v rozsahu nevyhnutnom na splnenie nižšie uvedených účelov, vždy na základe príslušného právneho základu podľa čl. 6 GDPR.
              </p>

              <div className="space-y-6">

                {/* a) Servisné služby */}
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔧 a) Poskytnutie servisných služieb (opravy a diagnostika)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Meno a priezvisko, telefónne číslo, e-mail, prípadne adresa, typ a model zariadenia, popis závady, servisná história
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zmluvy (čl. 6 ods. 1 písm. b GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu záručnej lehoty + 1 rok; účtovné doklady 10 rokov
                  </p>
                </div>

                {/* b) E-shop — NOVÉ */}
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🛒 b) Vybavenie objednávky cez e-shop (fixanto.sk/eshop)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Meno a priezvisko, telefónne číslo, e-mail, adresa doručenia, obsah objednávky (produkt, cena, prípadný zľavový kód)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zmluvy (čl. 6 ods. 1 písm. b GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Ukladanie:</strong> Údaje z objednávkového formulára sú ukladané do zabezpečenej databázy <strong>Supabase</strong> (servery v EÚ). Podrobnosti v sekcii 3.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu záručnej lehoty + 1 rok; účtovné doklady 10 rokov
                  </p>
                </div>

                {/* c) Reklamácie */}
                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📋 c) Reklamácie, záručný a pozáručný servis</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Údaje z bodu a) alebo b) + údaje o reklamovanom zariadení/tovare, dátum reklamácie, popis závady a spôsob vybavenia
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zákonnej povinnosti (čl. 6 ods. 1 písm. c GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu záručnej lehoty + 1 rok; účtovné doklady 10 rokov
                  </p>
                </div>

                {/* d) Komunikácia */}
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">💬 d) Komunikácia, dopyty a zákaznícka podpora</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Meno alebo prezývka, kontaktné údaje (telefón, e-mail, účet WhatsApp/Facebook/Instagram), obsah správy
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Oprávnený záujem – vybavenie dopytu (čl. 6 ods. 1 písm. f GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Doba uchovávania:</strong> Po dobu nevyhnutnú na vybavenie dopytu
                  </p>
                  <p className="text-gray-700 text-sm mt-3 bg-white/50 p-3 rounded">
                    ℹ️ Pri komunikácii cez WhatsApp, Facebook alebo Instagram sú tieto platformy samostatnými prevádzkovateľmi (Meta Platforms Ireland Limited).
                  </p>
                </div>

                {/* e) Newsletter */}
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📬 e) Newsletter a marketingové e-maily (MailerLite)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> E-mailová adresa, meno (ak ho uvediete), informácia o otvorení e-mailu a kliknutí na odkazy
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Súhlas (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Spracovateľ:</strong> MailerLite (UAB "MailerLite", Vilnius, Litva – GDPR compliant)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Do odvolania súhlasu alebo odhlásenia z odberu
                  </p>
                </div>

                {/* f) Analytika */}
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📊 f) Štatistika a analýza návštevnosti (Google Analytics)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Anonymizovaná IP adresa, typ zariadenia a prehliadača, navštívené stránky, čas návštevy, zdroj návštevnosti
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Súhlas (čl. 6 ods. 1 písm. a GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Spracovateľ:</strong> Google Ireland Limited / Google LLC (certifikovaný podľa EU-U.S. Data Privacy Framework)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Doba uchovávania:</strong> Max. 26 mesiacov od poslednej návštevy
                  </p>
                  <p className="text-gray-700 text-sm mt-3 bg-white/50 p-3 rounded font-semibold text-blue-900">
                    ⚠️ Bez vášho súhlasu sa analytické cookies nenačítajú a údaje sa nespracúvajú.
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Viac info: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Google Privacy Policy</a>
                  </p>
                </div>

                {/* g) Právne nároky */}
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">⚖️ g) Uplatňovanie právnych nárokov</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Identifikačné a kontaktné údaje, údaje o poskytnutých službách, komunikácia, fakturačné údaje
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Oprávnený záujem (čl. 6 ods. 1 písm. f GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Po dobu premlčacích lehôt (spravidla 3–10 rokov)
                  </p>
                </div>

                {/* h) Zákonné povinnosti */}
                <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📑 h) Plnenie zákonných povinností</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Rozsah údajov:</strong> Údaje potrebné na splnenie povinností podľa zákona o účtovníctve, zákona o ochrane spotrebiteľa a pod.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>Právny základ:</strong> Plnenie zákonnej povinnosti (čl. 6 ods. 1 písm. c GDPR)
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Doba uchovávania:</strong> Spravidla 10 rokov (účtovné doklady)
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
                  Vaše osobné údaje spracúvame primárne my ako prevádzkovateľ. S externými partnermi spolupracujeme len v nevyhnutnom rozsahu a na základe zmluvy o spracúvaní.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold text-lg">
                  Vaše údaje <strong className="text-red-600">NEPREDÁVAME ani NEPRENAJÍMAME</strong> tretím stranám na marketingové účely.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                  {/* Supabase — NOVÉ */}
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <h3 className="font-bold text-gray-900 mb-2">🗄️ Supabase (e-shop databáza)</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Supabase Inc., San Francisco, USA — sprostredkovateľ podľa čl. 28 GDPR. Ukladá objednávky z e-shopu (meno, email, telefón, adresa, obsah objednávky).
                    </p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>🖥️ Servery: <strong>Európska únia</strong> (AWS EU región)</p>
                      <p>📄 DPA: uzavretá zmluva podľa čl. 28 GDPR</p>
                      <p>🔒 Prenosy mimo EÚ: štandardné zmluvné doložky (SCC)</p>
                    </div>
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-2 block">supabase.com/privacy</a>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">📧 MailerLite</h3>
                    <p className="text-sm text-gray-700">UAB "MailerLite", Vilnius, Litva (EÚ) – zasielanie newslettera (len so súhlasom)</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">📊 Google Analytics</h3>
                    <p className="text-sm text-gray-700">Google Ireland Limited / Google LLC, USA – analýza návštevnosti webu (len so súhlasom)</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-900 mb-2">🌐 Netlify</h3>
                    <p className="text-sm text-gray-700">Netlify Inc., San Francisco, USA – hosting webovej stránky a serverových funkcií (technické logy prístupu)</p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h3 className="font-bold text-gray-900 mb-2">💰 Banky a platobné inštitúcie</h3>
                    <p className="text-sm text-gray-700">Spracovanie platieb (bankové prevody)</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h3 className="font-bold text-gray-900 mb-2">🧾 Účtovná firma</h3>
                    <p className="text-sm text-gray-700">Spracovanie účtovných dokladov (zákonná povinnosť)</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h3 className="font-bold text-gray-900 mb-2">📦 Dopravcovia</h3>
                    <p className="text-sm text-gray-700">Len ak je potrebné doručiť zariadenie alebo tovar na vašu adresu (Slovenská pošta)</p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2">🏛️ Orgány verejnej moci</h3>
                    <p className="text-sm text-gray-700">Daňový úrad, polícia, súdy – len ak to vyžaduje zákon</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mt-4 border border-green-200">
                  <p className="text-gray-700 leading-relaxed">
                    ✅ <strong>Všetci spracovávatelia v EÚ sú GDPR compliant.</strong> S partnermi mimo EÚ (Google, Netlify, Supabase) máme zabezpečené zodpovedajúce záruky podľa čl. 46 GDPR (štandardné zmluvné doložky, EU-U.S. Data Privacy Framework).
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
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: <Lock className="w-5 h-5 text-blue-600" />, title: 'Šifrované pripojenie HTTPS', desc: 'Všetka komunikácia medzi vašim prehliadačom a našou stránkou je šifrovaná.' },
                  { icon: <Users className="w-5 h-5 text-blue-600" />, title: 'Obmedzený prístup', desc: 'Prístup k údajom majú len oprávnené osoby (majiteľ, účtovník).' },
                  { icon: <Server className="w-5 h-5 text-blue-600" />, title: 'Databáza v EÚ (Supabase)', desc: 'Objednávky z e-shopu sú ukladané na serveroch v Európskej únii s Row Level Security (RLS).' },
                  { icon: <Shield className="w-5 h-5 text-blue-600" />, title: 'Bezpečný hosting (Netlify)', desc: 'Webová stránka beží na zabezpečenom cloude. Serverové funkcie spracúvajú citlivé operácie mimo prehliadača.' },
                ].map(item => (
                  <div key={item.title} className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. VAŠE PRÁVA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                5. Vaše práva podľa GDPR
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: '✅', title: 'Právo na prístup', desc: 'Získať informácie o tom, aké údaje o vás spracúvame, na aký účel a komu ich poskytujeme.' },
                  { icon: '✏️', title: 'Právo na opravu', desc: 'Opraviť nesprávne, neúplné alebo neaktuálne osobné údaje.' },
                  { icon: '🗑️', title: 'Právo na vymazanie', desc: 'Požiadať o vymazanie vašich údajov (výnimka: zákonná povinnosť uchovávania).' },
                  { icon: '🚫', title: 'Právo na obmedzenie', desc: 'Obmedziť spracovanie vašich údajov (napr. počas preverenia správnosti).' },
                  { icon: '📦', title: 'Právo na prenosnosť', desc: 'Získať vaše údaje v štruktúrovanom, strojovo čitateľnom formáte.' },
                  { icon: '❌', title: 'Právo namietať', desc: 'Namietať proti spracovaniu na marketingové účely alebo na základe oprávneného záujmu.' },
                ].map(item => (
                  <div key={item.title} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-2">{item.icon} {item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600 mb-4">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">📝 Ako uplatniť svoje práva?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Telefonicky: <a href="tel:0949344600" className="text-blue-600 hover:underline font-semibold">0949 344 600</a></li>
                  <li>WhatsApp: <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Napísať správu</a></li>
                  <li>E-mailom: <a href="mailto:phoneservissk@gmail.com" className="text-blue-600 hover:underline font-semibold">phoneservissk@gmail.com</a></li>
                  <li>Písomne: na adresu sídla prevádzkovateľa</li>
                </ul>
                <p className="text-gray-700 mt-4 pt-4 border-t border-yellow-200">
                  <strong>Lehota na odpoveď:</strong> Do <strong>30 dní</strong> od doručenia žiadosti.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">⚠️ Právo podať sťažnosť</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ak sa domnievate, že pri spracúvaní osobných údajov došlo k porušeniu vašich práv, máte právo podať sťažnosť na:
                </p>
                <div className="mt-3 bg-white rounded-lg p-4">
                  <p className="text-gray-900 font-semibold">Úrad na ochranu osobných údajov Slovenskej republiky</p>
                  <p className="text-gray-700 mt-1">Web: <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">dataprotection.gov.sk</a></p>
                  <p className="text-gray-700">Email: <a href="mailto:statny.dozor@pdp.gov.sk" className="text-blue-600 underline">statny.dozor@pdp.gov.sk</a></p>
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
                  Naša webová stránka používa cookies na zlepšenie vášho zážitku a analýzu návštevnosti.
                </p>

                {[
                  {
                    color: 'border-gray-500 bg-gray-50',
                    title: '🔹 Technické cookies (nevyhnutné)',
                    content: 'Potrebné pre správne fungovanie webu (zapamätanie súhlasu s cookies, košík e-shopu).',
                    basis: 'Oprávnený záujem (čl. 6 ods. 1 písm. f GDPR)',
                    note: null,
                  },
                  {
                    color: 'border-blue-600 bg-blue-50',
                    title: '🔹 Analytické cookies (Google Analytics)',
                    content: 'Pomáhajú nám pochopiť, ako návštevníci používajú náš web (počet návštevníkov, zdroj návštevnosti).',
                    basis: 'Váš súhlas (čl. 6 ods. 1 písm. a GDPR)',
                    note: '⚠️ Aktivácia len po vašom súhlase v cookie banneri.',
                  },
                  {
                    color: 'border-yellow-600 bg-yellow-50',
                    title: '🔹 Marketingové cookies (MailerLite)',
                    content: 'Sledujeme aktivitu prihlásených odberateľov newslettera (otvorenie emailov, kliky).',
                    basis: 'Váš súhlas (čl. 6 ods. 1 písm. a GDPR)',
                    note: null,
                  },
                ].map(item => (
                  <div key={item.title} className={`rounded-lg p-6 border-l-4 ${item.color}`}>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">{item.content}</p>
                    <p className="text-gray-700 text-sm"><strong>Právny základ:</strong> {item.basis}</p>
                    {item.note && <p className="text-gray-700 text-sm font-semibold mt-2 text-blue-900">{item.note}</p>}
                  </div>
                ))}

                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">✅ Ako spravovať cookies?</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Súhlas odvolajte vymazaním cookies v prehliadači (História → Vymazať údaje prehliadania)</li>
                    <li>Zmeňte nastavenia priamo v cookie banneri na stránke</li>
                    <li>Viac info: <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutcookies.org</a></li>
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
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🤖 Automatizované rozhodovanie</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Nevykonávame</strong> automatizované individuálne rozhodovanie ani profilovanie podľa čl. 22 GDPR. Všetky rozhodnutia sú vykonávané ľudským personálom.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">👶 Ochrana detí</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Naše služby nie sú určené osobám mladším ako 16 rokov. Ak zistíme, že sme získali údaje dieťaťa bez súhlasu rodiča, tieto údaje bezodkladne vymažeme.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">📄 Zdroj osobných údajov</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Všetky osobné údaje získavame <strong>priamo od vás</strong> — prostredníctvom webovej stránky, e-shopu, e-mailu, telefónu, WhatsApp alebo pri osobnom kontakte. Nepoužívame údaje z komerčných databáz.
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">🔄 Aktualizácia zásad</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Vyhradzujeme si právo tieto Zásady kedykoľvek upraviť. V prípade významných zmien vás budeme informovať na webovej stránke alebo e-mailom. Odporúčame pravidelne navštíviť túto stránku.
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
                  <span className="text-2xl">📧</span>
                  <span><strong>Email:</strong> <a href="mailto:phoneservissk@gmail.com" className="underline hover:text-blue-200 font-semibold">phoneservissk@gmail.com</a></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span><strong>Adresa:</strong> Dolná Súča 877, 913 32 Dolná Súča</span>
                </p>
              </div>
              <p className="text-sm mt-4 pt-4 border-t border-white/20">
                Ďakujeme, že dôverujete Fixantu so svojimi zariadeniami aj údajmi. 💙
              </p>
            </div>

            <div className="bg-blue-800 text-white rounded-2xl shadow-lg p-10 text-center">
              <p className="text-2xl font-bold mb-4">
                Zásady ochrany osobných údajov v. 3.0 — účinnosť od 22. decembra 2025
              </p>
              <p className="text-xl mb-4">© 2025 Štefan Hupčík – Fixanto. Všetky práva vyhradené.</p>
              <p className="text-lg">Vaše údaje sú u nás v bezpečí. 🔒</p>
            </div>

          </div>
        </div>
      </div>

      <CookieBanner />

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="fixed bottom-20 right-5 md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all"
          aria-label="Späť hore"
        >
          <ChevronUp className="w-7 h-7" />
        </button>
      )}
    </>
  );
}