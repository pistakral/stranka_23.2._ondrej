import { Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AudioCardProps {
  title: string;
  emoji: string;
  audioFile: string;
  duration: number;
  color: string;
  isPlaying: boolean;
  onPlay: () => void;
}

export function AudioCard({ title, emoji, audioFile, duration, color, isPlaying, onPlay }: AudioCardProps) {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.loop = true;
      audio.play().catch(console.error);
      
      if ('vibrate' in navigator && audioFile.includes('vibracia')) {
        navigator.vibrate([500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
      }
      
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
        if (duration > 0) {
          setProgress((elapsed / duration) * 100);
        }
        
        if (elapsed >= duration) {
          if ('vibrate' in navigator) {
            navigator.vibrate(0);
          }
          onPlay();
          setProgress(0);
          setElapsedTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
      };

      timerRef.current = window.setInterval(updateProgress, 100);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        if ('vibrate' in navigator) {
          navigator.vibrate(0);
        }
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      setProgress(0);
      setElapsedTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }
    }
  }, [isPlaying, onPlay, audioFile, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${color} ${
        isPlaying ? 'ring-4 ring-blue-400 shadow-2xl' : 'shadow-lg hover:shadow-xl'
      }`}
      onClick={onPlay}
    >
      <audio ref={audioRef} src={audioFile} />

      {isPlaying && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent animate-pulse"
          style={{
            width: `${progress}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{emoji}</span>
          <button
            className={`p-3 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-blue-500 text-white scale-110'
                : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 font-medium">
          {isPlaying ? formatTime(elapsedTime) : formatTime(duration)}
        </p>

        {isPlaying && (
          <div className="mt-4 h-1 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
