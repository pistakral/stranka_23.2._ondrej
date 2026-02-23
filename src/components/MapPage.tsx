import { useEffect } from 'react';

export default function MapPage() {
  useEffect(() => {
    window.location.href = 'https://maps.app.goo.gl/FMqHYdQ2p6br5DJ99';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <p className="text-xl text-gray-700 mb-2">Presmerovávam na Google mapy...</p>
        <p className="text-sm text-gray-500">Ďakujem za tvoj čas! 🙏</p>
      </div>
    </div>
  );
}
