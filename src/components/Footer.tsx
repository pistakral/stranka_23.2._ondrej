import { Phone, MapPin, Mail, Facebook, Instagram, MessageCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* O nás */}
          <div>
            <div className="mb-6 group cursor-default">
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Fixanto
              </h3>
              <p className="text-2xl font-bold text-gray-100 transition-all duration-300 group-hover:text-blue-300">
                Štefan Hupčík
              </p>
              
              {/* Glass effect overlay pri hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/10 backdrop-blur-sm rounded-lg -z-10 pointer-events-none"></div>
            </div>
            
            <p className="text-gray-300 text-base leading-relaxed italic border-l-2 border-blue-400 pl-3 font-medium">
              Kde elektronika ožíva. Rýchlo, spoľahlivo a s citom pre detail.
            </p>

            {/* Sociálne siete */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/fixanto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/opravamobilov"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@fixanto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/421949344600"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:0949344600" className="hover:text-blue-400 transition-colors">
                  0949 344 600
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:phoneservissk@gmail.com" className="hover:text-blue-400 transition-colors">
                  phoneservissk@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                <span>Dolná Súča 877<br />913 32 Dolná Súča</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm">IČO: 57310998</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm">DIČ: 1130682366</span>
              </li>
            </ul>
          </div>

          {/* Služby */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Služby</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-400 transition-colors cursor-pointer group">
                <Link
                  to="/#how-it-works"
                  className="block hover:text-blue-400 transition-colors"
                >
                  Ako to funguje
                </Link>
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                Opravy mobilných telefónov
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                Opravy televízorov
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                Opravy elektroniky
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                Opravy notebookov
              </li>
            </ul>
          </div>
        </div>

        {/* Spodná časť */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Fixanto - Servis elektroniky. Všetky práva vyhradené.
            </p>

            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link
                to="/ochrana-osobnych-udajov"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Ochrana osobných údajov
              </Link>
              <Link
                to="/vseobecne-obchodne-podmienky"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                VOP
              </Link>
              <Link
                to="/reklamacny-poriadok"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Reklamačný poriadok
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
