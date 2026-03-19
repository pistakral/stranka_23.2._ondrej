import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';
import { Shield, FileText, AlertCircle, ChevronRight, Lock, Smartphone } from 'lucide-react';

export default function LegalInfoPage() {
  const cards = [
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: 'Ochrana osobných údajov (GDPR)',
      desc: 'Informácie o spracúvaní vašich údajov vrátane databázy Supabase, vašich právach a dobe uchovávania.',
      link: '/vop',
      anchor: '#gdpr',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      icon: <FileText className="w-8 h-8 text-gray-600" />,
      title: 'Všeobecné obchodné podmienky',
      desc: 'Pravidlá pre objednávku opravy aj kúpu iPhonu, platby, záruky, dodacie lehoty a zodpovednosť.',
      link: '/vop',
      anchor: '',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: 'Podmienky predaja iPhonov',
      desc: 'Záručná doba, kategórie stavu (A/B/Repasovaný), zdravie batérie a 14-dňové vrátenie pri online nákupe.',
      link: '/vop',
      anchor: '',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: 'Reklamačný poriadok',
      desc: 'Postup pri reklamácii opravy aj zakúpeného iPhonu s garantovanou kvalitou a jasnými lehotami.',
      link: '/reklamacia',
      anchor: '',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  ];

  return (
    <>
      <GoogleAnalytics />
      <CookieBanner />
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Právne informácie</h1>
            <p className="text-gray-300 text-sm">
              Dôležité dokumenty a pravidlá pre našu spoluprácu
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link + card.anchor}
              className={`flex items-start gap-4 ${card.bg} border ${card.border} rounded-xl p-5 hover:shadow-md transition-shadow group`}
            >
              <div className="flex-shrink-0 mt-0.5">{card.icon}</div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
            </Link>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <p className="text-xs text-blue-700 text-center">
              Všetky dokumenty sú v súlade so zákonom č. 108/2024 Z.z., GDPR (nariadenie EÚ 2016/679)
              a zákonom č. 18/2018 Z.z. o ochrane osobných údajov.
            </p>
          </div>

          <div className="text-center text-xs text-gray-400 pt-4">
            <p>© 2025 Štefan Hupčík – Fixanto | phoneservissk@gmail.com | 0949 344 600</p>
          </div>
        </div>
      </div>
    </>
  );
}
