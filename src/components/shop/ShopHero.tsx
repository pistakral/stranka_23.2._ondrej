export default function ShopHero() {
  return (
    <section className="min-h-[60vh] relative text-white overflow-hidden pt-32 pb-20 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-950/95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center mx-auto max-w-4xl">
          <h1 className="mb-4 drop-shadow-2xl">
            <span className="block text-white font-black text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
              Prémiové iPhone zariadenia
            </span>
            <span className="block text-yellow-400 mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Overené • Záruka 12 mesiacov
            </span>
          </h1>

          <p className="text-blue-100 text-lg sm:text-xl md:text-2xl font-bold mb-8 drop-shadow-lg">
            Doprava zadarmo nad 500€
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-5 py-3 border border-white/30 shadow-xl inline-flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-white text-base font-bold">Overená kvalita</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-5 py-3 border border-white/30 shadow-xl inline-flex items-center gap-2">
              <span className="text-2xl">🔋</span>
              <span className="text-white text-base font-bold">Batéria 100%</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-5 py-3 border border-white/30 shadow-xl inline-flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-white text-base font-bold">Záruka 12 mesiacov</span>
            </div>
          </div>

          <a
            href="#products"
            className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-blue-900 px-10 py-5 rounded-xl font-black text-xl shadow-2xl hover:bg-yellow-300 transition transform hover:scale-105"
          >
            Prejsť na telefóny 📱
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}