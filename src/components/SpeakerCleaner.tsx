import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AudioCard } from './AudioCard';
import { Video, ChevronDown } from 'lucide-react';
import GoogleAnalytics from './GoogleAnalytics';

const audioTracks = [
  {
    id: 'water',
    title: 'Hĺbkové čistenie',
    emoji: '🧼',
    audioFile: '/voda.mp3',
    duration: 74,
    color: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
  {
    id: 'dust',
    title: 'Expresné čistenie',
    emoji: '⚡',
    audioFile: '/prach.aac',
    duration: 60,
    color: 'bg-gradient-to-br from-orange-100 to-orange-200',
  },
  {
    id: 'vibration',
    title: 'Vibračný tón',
    emoji: '🔊',
    audioFile: '/vibracia.mp3',
    duration: 60,
    color: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
];

export default function SpeakerCleaner() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    document.title = 'Bonusy - Fixanto';

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const handlePlay = (trackId: string) => {
    if (currentTrack === trackId) {
      setCurrentTrack(null);
    } else {
      setCurrentTrack(trackId);
    }
  };

  const scrollToVideos = () => {
    videoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <>
      {/* MINIMALISTICKÝ NAVBAR - LEN LOGO */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Link
              to="/"
              className="text-white font-bold text-xl sm:text-2xl cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-3xl">🔧</span>
              Fixanto
            </Link>
          </div>
        </div>
      </nav>

      <GoogleAnalytics />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Ďakujeme za stiahnutie! 🎉
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Získal si triky na predĺženie životnosti elektroniky, ktoré servisní technici nechcú,
              aby si vedel. Ako bonus máš{' '}
              <span className="font-bold text-blue-600">zvukové nástroje na profesionálne čistenie reproduktorov</span>.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                Vyber typ čistenia
              </h2>
              
              {/* BUTTON 1: Pri nadpise */}
              <button
                onClick={scrollToVideos}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Video size={20} />
                Pozri video návody
                <ChevronDown size={18} className="animate-bounce" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {audioTracks.map((track) => (
                <AudioCard
                  key={track.id}
                  title={track.title}
                  emoji={track.emoji}
                  audioFile={track.audioFile}
                  duration={track.duration}
                  color={track.color}
                  isPlaying={currentTrack === track.id}
                  onPlay={() => handlePlay(track.id)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ktorý zvuk použiť?</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="text-xl font-bold text-purple-600 mb-2">🧼 Hĺbkové čistenie (74 s)</h3>
                <p className="text-gray-700 text-lg mb-3">
                  Na veľmi špinavý alebo dlho tlmený reprák, aj po kontakte s vodou. Kvapni trochu izopropylu 99 % na mriežku, pusti zvuk a jemne čisti mäkkou kefkou.
                </p>
                
                {/* BUTTON 2: Pri hĺbkovom čistení */}
                <button
                  onClick={scrollToVideos}
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-base transition-colors duration-200 group"
                >
                  💡 Video návod nájdeš na konci stránky
                  <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>

              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="text-xl font-bold text-orange-600 mb-2">⚡ Expresné čistenie (60 s)</h3>
                <p className="text-gray-700 text-lg">
                  Na rýchle „prečistenie" prachu, keď reprák hrá horšie, ale nie je úplne upchatý. Vhodné ako občasná údržba.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-xl font-bold text-blue-600 mb-2">🔊 Vibračný tón – univerzálne čistenie (60 s)</h3>
                <p className="text-gray-700 text-lg">
                  Pomáha vytriasť zvyšné kvapky vody a nečistoty. Použi, ak prvé dva zvuky nestačili, mobil drž displejom dole a nechaj tón dohrať.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Dôležité tipy:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Zvýš hlasitosť na 80-100% (ale nie tak, aby ti to škodilo ušiam)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Nechaj zvuk hrať priamo z reproduktora telefónu - nepoužívaj slúchadlá</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Pri hĺbkovom čistení používaj izopropyl 99% (nie bežný lieh!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Kefka musí byť mäkká (ideálne detská zubná kefka)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Ak to nepomôže napoprvé, opakuj proces 2-3 krát</span>
                </li>
              </ul>
            </div>
          </div>

          {/* VIDEO SEKCIA - TVOJE 3 VIDEÁ */}
          <div 
            ref={videoSectionRef}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 sm:p-8 shadow-2xl text-white scroll-mt-20"
          >
            <div className="text-center mb-8">
              <Video size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                Ako na to? Pozri si video návod!
              </h2>
              <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-2">
                Presný postup hĺbkového čistenia reproduktora s izopropylom a kefkou.
              </p>
            </div>

            {/* GRID S 3 VIDEAMI - RESPONZÍVNY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* VIDEO 1: Reproduktor */}
              <div className="flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white text-center">
                    🔊 Ako vyčistiť reproduktor
                  </h3>
                </div>
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                    src="https://www.youtube.com/embed/V9RAWe_U0iI"
                    title="Ako vyčistiť reproduktor"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* VIDEO 2: Lightning konektor */}
              <div className="flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white text-center">
                    🍎 Lightning konektor (iPhone)
                  </h3>
                </div>
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                    src="https://www.youtube.com/embed/TJxIoEMg0Gs"
                    title="Ako vyčistiť Lightning konektor"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* VIDEO 3: USB-C konektor */}
              <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white text-center">
                    🔌 USB-C konektor
                  </h3>
                </div>
                <div className="relative w-full max-w-md mx-auto sm:max-w-none" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                    src="https://www.youtube.com/embed/VzKaMwDzNg0"
                    title="Ako vyčistiť USB-C konektor"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* TIP BADGE */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 sm:p-5 max-w-2xl mx-auto border-2 border-white/40">
              <p className="text-base sm:text-lg font-bold text-white text-center">
                💡 TIP: Postupuj presne podľa videa pre najlepší výsledok!
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
