import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import {
  AlertCircle,
  ChevronUp,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function ReklamaciePage() {
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
              <AlertCircle className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">
                Reklamačný poriadok
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">Platné od 22.decembra 2025 | Verzia 1.0</p>
            <p className="text-lg text-gray-500">
              V súlade so zákonom č. 108/2024 Z.z. o ochrane spotrebiteľa a Občianskym zákonníkom č. 40/1964 Zb.
            </p>
          </div>

          {/* Zjednodušený reklamačný poriadok */}
          <div className="mb-12 p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              Zjednodušený reklamačný poriadok
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Ak máte problém s našou opravou, ihneď nás kontaktujte – radi to vyriešime!
            </p>
            <div className="space-y-4 text-gray-800 text-lg">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Reklamáciu podajte <strong>bezodkladne</strong> po zistení vady</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Stačí zavolať, napísať na WhatsApp alebo email</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Vybavíme ju <strong>do 30 dní</strong> (väčšinou oveľa skôr)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <span>Ak bola chyba naša – opravíme zadarmo</span>
              </div>
            </div>
          </div>

          {/* ZÁRUČNÉ DOBY */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Záručné doby podľa typu opravy/dielu</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">📱 Displeje (nové diely)</h3>
                <p className="text-gray-700 mb-2"><strong className="text-blue-600">Záruka: 24 mesiacov</strong></p>
                <p className="text-sm text-gray-600">Platí na nový displej namontovaný v servise. Záruka sa vzťahuje na funkčnosť a výrobné vady. Nevzťahuje sa na mechanické poškodenie, prasknutie, škrabance alebo poškodenie tekutinou.</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔧 Práca servisu (opravy)</h3>
                <p className="text-gray-700 mb-2"><strong className="text-blue-600">Záruka: 3 mesiace</strong></p>
                <p className="text-sm text-gray-600">Ide o záruku na vykonanú prácu. Platí len na konkrétnu opravu, nie na celý telefón.</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔋 Batérie (funkčnosť)</h3>
                <p className="text-gray-700 mb-2"><strong className="text-blue-600">Záruka na funkčnosť: 24 mesiacov</strong></p>
                <p className="text-sm text-gray-600">Platí na nabíjanie a vypínanie zariadenia. Batéria sa musí správne nabíjať a nesmie sa samovoľne vypínať.</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔋 Batérie (kapacita)</h3>
                <p className="text-gray-700 mb-2"><strong className="text-orange-600">Záruka na kapacitu: 6 mesiacov</strong></p>
                <p className="text-sm text-gray-600">⚠️ Kapacita batérie je spotrebný materiál - prirodzené znižovanie kapacity nie je vada. Vada sa uznáva, ak batéria má výrazne nízku kapacitu krátko po výmene (prvých 6 mesiacov).</p>
              </div>
            </div>
          </div>

          {/* Postup krok za krokom */}
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Postup reklamácie krok za krokom</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-2xl font-bold mb-3">Podáte reklamáciu</h3>
              <p className="text-gray-700">Zavoláte, napíšete alebo prídete osobne s popisom problému a záručným listom.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-2xl font-bold mb-3">Skontrolujeme zariadenie</h3>
              <p className="text-gray-700">Opätovná diagnostika a zistenie príčiny vady (zvyčajne do 48 hodín).</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-green-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-2xl font-bold mb-3">Vyberieme riešenie</h3>
              <p className="text-gray-700">Oprava zdarma, výmena dielu, primeraná zľava alebo vrátenie peňazí (podľa vašej voľby).</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-green-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="text-2xl font-bold mb-3">Prevezmete si zariadenie</h3>
              <p className="text-gray-700">S novým záručným listom a úsmevom na tvári 😊</p>
            </div>
          </div>

          {/* Detailný reklamačný poriadok */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">I. VŠEOBECNÉ USTANOVENIA</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>1.1</strong> Tento reklamačný poriadok upravuje podmienky a spôsob uplatnenia práv zákazníka z vadného plnenia (ďalej len "reklamácia") na služby a použité náhradné diely, ktoré boli poskytnuté poskytovateľom Štefan Hupčík - Fixanto (ďalej len "poskytovateľ").</p>
                <p><strong>1.2</strong> Záručná doba je doba, počas ktorej má zákazník právo uplatniť reklamáciu. Záručná doba začína plynúť dňom prevzatia opraveného zariadenia zákazníkom.</p>
                <p><strong>1.3</strong> Poskytovateľ zodpovedá za to, že opravené zariadenie je pri prevzatí zákazníkom bez vád a má požadované vlastnosti a funkčnosť.</p>
                <p><strong>1.4</strong> Reklamovať je možné len tovar/službu, ktorá bola zakúpená u poskytovateľa a ktorá je vlastníctvom zákazníka.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">II. PODMIENKY UPLATNENIA REKLAMÁCIE</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>2.1</strong> Kupujúci je povinný reklamáciu uplatniť <strong>bezodkladne</strong> u poskytovateľa, a to hneď po zistení vady.</p>
                <p><strong>2.2</strong> Reklamáciu je možné uplatniť u poskytovateľa písomne, telefonicky (+421 949 344 600), elektronicky (phoneservissk@gmail.com), prostredníctvom WhatsApp alebo osobne v sídle poskytovateľa.</p>
                <p><strong>2.3</strong> Pri podaní reklamácie musí zákazník preukázať uzatvorenie zmluvy predložením dokladu o poskytnutí služby (záručný list, faktúra, doklad o zaplatení).</p>
                <p><strong>2.4</strong> Zákazník je povinný popísať vadu zariadenia, spôsob jej prejavenia a uviesť, ktoré zo svojich práv podľa § 622 a § 623 Občianskeho zákonníka uplatňuje.</p>
                <p><strong>2.5</strong> Reklamovaný tovar je potrebné doručiť poskytovateľovi osobne alebo zaslať na adresu poskytovateľa (nie na dobierku). Tovar je potrebné vhodne zabaliť a odporúčame zaslať ako poistenú zásielku.</p>
                <p><strong>2.6</strong> Pri prevzatí reklamovaného zariadenia poskytovateľ vydá zákazníkovi potvrdenie o uplatnení reklamácie vo vhodnej forme (email alebo písomne), v ktorom presne označí reklamované vady.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">III. LEHOTA NA VYBAVENIE REKLAMÁCIE</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>3.1</strong> Poskytovateľ je povinný určiť spôsob vybavenia reklamácie ihneď, v zložitých prípadoch do <strong>3 dní</strong> odo dňa uplatnenia reklamácie, v odôvodnených prípadoch najneskôr do <strong>30 dní</strong> odo dňa uplatnenia reklamácie podľa § 18 zákona č. 108/2024 Z.z.</p>
                <p><strong>3.2</strong> Po určení spôsobu vybavenia reklamácie poskytovateľ reklamáciu vybaví ihneď, v odôvodnených prípadoch možno reklamáciu vybaviť aj neskôr. Vybavenie reklamácie však nesmie trvať dlhšie ako <strong>30 dní</strong> odo dňa uplatnenia reklamácie.</p>
                <p><strong>3.3</strong> Po uplynutí 30-dňovej lehoty na vybavenie reklamácie má zákazník právo od zmluvy odstúpiť a bude mu vrátená plná suma za službu alebo má právo na výmenu tovaru za nový.</p>
                <p><strong>3.4</strong> Po vybavení reklamácie je poskytovateľ povinný vydať zákazníkovi písomný doklad o spôsobe vybavenia reklamácie najneskôr do 30 dní odo dňa uplatnenia reklamácie.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                IV. PRÁVA ZÁKAZNÍKA PRI REKLAMÁCII
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>4.1</strong> Kupujúci má právo na bezplatné odstránenie vady, včas a riadne, pokiaľ ide o vadu, ktorú možno odstrániť (§ 622 ods. 1 Občianskeho zákonníka). Poskytovateľ je povinný vadu bez zbytočného odkladu odstrániť.</p>
                
                <p><strong>4.2</strong> Namiesto odstránenia vady môže kupujúci požadovať <strong>výmenu dielu</strong>, pokiaľ tým poskytovateľovi nevzniknú neprimerané náklady vzhľadom na cenu služby alebo závažnosť vady (§ 622 ods. 2 Občianskeho zákonníka).</p>
                
                <p><strong>4.3</strong> Poskytovateľ môže namiesto odstránenia vady vymeniť vadný diel za diel bez vád, pokiaľ to kupujúcemu nespôsobí závažné ťažkosti (§ 622 ods. 3 Občianskeho zákonníka).</p>
                
                <p><strong>4.4</strong> Ak ide o <strong>neodstrániteľnú vadu</strong>, ktorá bráni riadnemu používaniu zariadenia, má kupujúci právo (§ 623 ods. 1 Občianskeho zákonníka):</p>
                <ul className="list-disc ml-8 space-y-2">
                  <li>na <strong>výmenu dielu</strong> za nový funkčný diel, alebo</li>
                  <li>na <strong>odstúpenie od zmluvy</strong> a vrátenie peňazí</li>
                </ul>
                
                <p><strong>4.5</strong> Tie isté práva má kupujúci, ak ide síce o odstrániteľné vady, ale kupujúci nemôže pre <strong>opätovné vyskytnutie sa vady po oprave</strong> (viac ako 2-krát) alebo pre <strong>väčší počet vád</strong> (viac ako 3 rôzne vady súčasne) zariadenie riadne užívať (§ 623 ods. 2 Občianskeho zákonníka).</p>
                
                <p><strong>4.6</strong> V prípade iných neodstrániteľných vád má kupujúci právo na <strong>primeranú zľavu z ceny služby</strong> (§ 623 ods. 3 Občianskeho zákonníka).</p>

                <p><strong>4.7</strong> V prípade záručnej opravy sa záručná doba predlžuje o čas, počas ktorého kupujúci nemohol zariadenie používať.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-600">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-700">
                <XCircle className="w-8 h-8 text-red-600" />
                V. VYLÚČENIE ZODPOVEDNOSTI
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>5.1</strong> Poskytovateľ nezodpovedá za vady tovaru/služby, ak:</p>
                <ul className="list-disc ml-8 space-y-3">
                  <li><strong>Kupujúci neuplatnil</strong> svoje právo týkajúce sa zodpovednosti poskytovateľa za vadu do konca záručnej doby</li>
                  <li>Ide o <strong>mechanické poškodenie</strong> zariadenia spôsobené kupujúcim (pád, náraz, lámanie)</li>
                  <li>Vada vznikla <strong>poškodením tekutinami</strong> (voda, káva, atď.)</li>
                  <li>Vada vznikla používaním zariadenia v <strong>nevhodných podmienkach</strong> (vlhkosť, teplota, chemické vplyvy)</li>
                  <li>Vada vznikla <strong>nesprávnym zaobchádzaním</strong>, neodbornou obsluhou alebo zanedbaním starostlivosti</li>
                  <li>Vada vznikla <strong>nadmerným zaťažovaním</strong> alebo používaním v rozpore s návodom</li>
                  <li>Vada vznikla <strong>zásahom tretej osoby</strong> (neautorizovaný servis, vlastná oprava)</li>
                  <li>Vada vznikla <strong>vyššou mocou</strong> (požiar, povodeň, živelné pohromy)</li>
                  <li>Ide o <strong>naturálne opotrebenie</strong> zariadenia alebo jeho častí</li>
                  <li>Ide o <strong>softvérové problémy</strong> existujúce pred opravou alebo nespôsobené opravou</li>
                </ul>
                
                <p className="mt-6"><strong>5.2</strong> Poskytovateľ <strong>nenesie zodpovednosť za stratu dát</strong> uložených v zariadení. Zákazník je zodpovedný za vytvorenie zálohy dát pred odovzdaním zariadenia na opravu.</p>
                
                <p><strong>5.3</strong> Záruka na displeje sa nevzťahuje na mechanické poškodenie, prasknutie, škrabance alebo poškodenie tekutinou.</p>
                
                <p><strong>5.4</strong> Záruka na kapacitu batérie (6 mesiacov) sa nevzťahuje na prirodzené opotrebenie - postupné znižovanie kapacity je normálny jav a nie je považované za vadu.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">VI. VYBAVENIE REKLAMÁCIE</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>6.1</strong> Reklamácia sa považuje za vybavenú, ak sa skončí reklamačné konanie jedným z nasledujúcich spôsobov:</p>
                <ul className="list-disc ml-8 space-y-2">
                  <li><strong>Odstránením vady</strong> (oprava)</li>
                  <li><strong>Výmenou vadného dielu</strong> za bezchybný</li>
                  <li><strong>Vrátením kúpnej ceny</strong> služby</li>
                  <li><strong>Poskytnutím primeranej zľavy</strong> z ceny služby</li>
                  <li><strong>Písomnou výzvou</strong> na prevzatie poskytovateľom určeného plnenia</li>
                  <li><strong>Odôvodneným zamietnutím</strong> reklamácie</li>
                </ul>
                
                <p><strong>6.2</strong> O výsledku vybavenia reklamácie bude poskytovateľ informovať zákazníka bezprostredne po ukončení reklamačného konania telefonicky alebo emailom a zároveň mu bude doručený doklad o vybavení reklamácie.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">VII. MIMOSÚDNE RIEŠENIE SPOROV</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>7.1</strong> Poskytovateľ a zákazník sa zaväzujú riešiť všetky spory prednostne dohodou.</p>
                
                <p><strong>7.2</strong> V prípade, že nedôjde k dohode, je zákazník oprávnený obrátiť sa na:</p>
                <div className="ml-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="font-bold text-lg mb-2">Slovenská obchodná inšpekcia (SOI)</p>
                  <p><strong>Inšpektorát SOI pre Trenčiansky kraj</strong></p>
                  <p>Hurbanova 59, 911 01 Trenčín</p>
                  <p>Tel: 032/640 01 09</p>
                  <p>Email: tn@soi.sk</p>
                  <p className="mt-2">Web: <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.soi.sk</a></p>
                </div>
                
                <p><strong>7.3</strong> Zákazník môže taktiež využiť platformu Európskej komisie pre alternatívne riešenie spotrebiteľských sporov online podľa zákona č. 391/2015 Z.z.:</p>
                <p className="ml-6"><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">https://ec.europa.eu/consumers/odr</a></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6">VIII. ZÁVEREČNÉ USTANOVENIA</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p><strong>8.1</strong> Vzťahy neupravené týmto reklamačným poriadkom sa riadia platnými právnymi predpismi Slovenskej republiky, najmä:</p>
                <ul className="list-disc ml-8 space-y-2">
                  <li>Zákon č. 40/1964 Zb. Občiansky zákonník (§ 622, § 623)</li>
                  <li>Zákon č. 108/2024 Z.z. o ochrane spotrebiteľa (§ 18)</li>
                  <li>Zákon č. 391/2015 Z.z. o alternatívnom riešení sporov</li>
                </ul>
                
                <p><strong>8.2</strong> Poskytovateľ si vyhradzuje právo na zmenu tohto reklamačného poriadku. Aktuálne znenie je vždy dostupné na webovej stránke <a href="https://www.fixanto.sk" className="text-blue-600 hover:underline">www.fixanto.sk</a></p>
                
                <p><strong>8.3</strong> Tento reklamačný poriadok nadobúda účinnosť <strong>22.decembra 2025</strong>.</p>
                
                <p><strong>8.4</strong> Tieto reklamačné podmienky sú neoddeliteľnou súčasťou všeobecných obchodných podmienok.</p>
              </div>
            </div>

            <div className="bg-blue-800 text-white rounded-2xl shadow-lg p-10 text-center">
              <p className="text-2xl font-bold mb-4">
                Tento reklamačný poriadok nadobúda účinnosť 22.decembra 2025
              </p>
              <p className="text-xl mb-6">
                © 2025 Štefan Hupčík - Fixanto. Všetky práva vyhradené.
              </p>
              <p className="text-lg">
                Ďakujeme, že ste si vybrali Fixanto. Robíme všetko pre to, aby ste boli spokojní.
              </p>
            </div>
          </div>

          {/* Kontaktný box */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-2xl text-center">
            <h3 className="text-3xl font-bold mb-6">Máte problém s opravou?</h3>
            <p className="text-xl mb-8">Neváhajte nás kontaktovať – sme tu pre vás</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-2xl font-bold">
              <a href="tel:0949344600" className="hover:text-yellow-300 transition">📞 0949 344 600</a>
              <span className="hidden sm:inline">•</span>
              <a href="https://wa.me/421949344600" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">💬 WhatsApp</a>
              <span className="hidden sm:inline">•</span>
              <a href="mailto:phoneservissk@gmail.com" className="hover:text-yellow-300 transition">✉️ Email</a>
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
