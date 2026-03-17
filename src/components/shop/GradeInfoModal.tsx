import { X, CheckCircle } from 'lucide-react';

interface GradeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GradeInfoModal({ isOpen, onClose }: GradeInfoModalProps) {
  if (!isOpen) return null;

  const grades = [
    {
      name: 'A+',
      title: 'Ako nový',
      color: 'from-emerald-500 to-green-500',
      borderColor: 'border-emerald-500',
      features: [
        'Bez viditeľných poškodení',
        'Displej v perfektnom stave',
        'Rám bez škrabancov',
        'Batéria 100% zdravie',
        'Kompletne otestované',
      ],
    },
    {
      name: 'A',
      title: 'Vynikajúci stav',
      color: 'from-blue-500 to-indigo-500',
      borderColor: 'border-blue-500',
      features: [
        'Jemné známky opotrebenia',
        'Pár menších škrabancov na ráme a displeji',
        'Displej bez výrazných škrabancov',
        'Batéria v dobrom stave',
        'Plne funkčné',
      ],
    },
    {
      name: 'B',
      title: 'Veľmi dobrý stav',
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500',
      features: [
        'Viditeľné známky používania',
        'Viacero škrabancov na ráme/displeji',
        'Všetky funkcie 100% funkčné',
        'Batéria min. 80% zdravie',
        'Overené a testované',
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black mb-2">Čo znamená táto trieda?</h2>
                <p className="text-blue-100 text-sm">
                  Všetky zariadenia sú odskúšané, preverené a pripravené na používanie
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
                aria-label="Zavrieť"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {grades.map((grade) => (
              <div
                key={grade.name}
                className={`border-2 ${grade.borderColor} rounded-xl p-5 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`bg-gradient-to-r ${grade.color} text-white px-4 py-2 rounded-lg font-black text-lg shadow-lg`}
                  >
                    TRIEDA {grade.name}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{grade.title}</h3>
                  </div>
                </div>

                <ul className="space-y-2">
                  {grade.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Záruka info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900 text-center">
                <strong>✅ Všetky triedy:</strong> 12 mesiacov záruka • 14 dní na vrátenie •
                Doručenie zdarma
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}