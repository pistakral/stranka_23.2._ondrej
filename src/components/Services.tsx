import { Smartphone, Tv, Cpu, Laptop, X } from 'lucide-react';
import { useState } from 'react';

// Import fotiek
import phoneRepairImage from '../assets/images/telefon-bateria.jpg';
import tvRepairImage from '../assets/images/televizor.jpg';
import notebookRepairImage from '../assets/images/notebook.jpg';
import electronicsRepairImage from '../assets/images/elektronika.jpg';

const services = [
  {
    icon: Smartphone,
    title: 'Opravy mobilných telefónov',
    description:
      'Servis mobilov v Trenčíne a okolí – špecializujeme sa na opravy iPhonov, Samsung, Xiaomi a ďalších smartfónov. Výmena displejov, batérií, konektorov a ďalších komponentov.',
    isPrimary: true,
    image: phoneRepairImage,
    imagePosition: 'center 35%',
  },
  {
    icon: Tv,
    title: 'Opravy televízorov',
    description:
      'Servis televízorov pre Trenčín a okolie. Riešime problémy s obrazom, zvukom, napájaním aj softvérom pri moderných TV.',
    isPrimary: true,
    image: tvRepairImage,
    imagePosition: 'center center',
  },
  {
    icon: Cpu,
    title: 'Opravy elektroniky',
    description:
      'Servis elektronických zariadení – tablety, herné konzoly, audio zariadenia a ďalšia spotrebná elektronika. Diagnostika a oprava na mieru.',
    isPrimary: true,
    image: electronicsRepairImage,
    imagePosition: 'center center',
  },
  {
    icon: Laptop,
    title: 'Opravy notebookov',
    description:
      'Servis notebookov všetkých značiek. Čistenie a údržba, výmena komponentov, zrýchlenie systému a preinštalovanie Windowsu.',
    isPrimary: false,
    image: notebookRepairImage,
    imagePosition: 'center 60%',
  },
];

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="sluzby" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Naše služby
            </h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Poskytujeme komplexný servis mobilov, televízorov, notebookov a elektroniky v Trenčíne a okolí
              s dôrazom na kvalitu, rýchlosť a spoľahlivosť.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    service.isPrimary ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  {service.isPrimary && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      HLAVNÉ
                    </div>
                  )}

                  {/* Fotka alebo gradient pozadie */}
                  {service.image ? (
                    <div
                      className="relative h-64 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(service.image)}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: service.imagePosition }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>

                      <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Klikni pre zväčšenie
                      </div>
                    </div>
                  ) : (
                    <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Icon className="w-7 h-7" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal pre zväčšenú fotku */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Zavrieť"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Zväčšená fotka"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
