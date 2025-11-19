import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-blue-950 to-black transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="text-6xl md:text-8xl font-bold text-white tracking-wider">
          <span className="inline-block animate-pulse">V</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>e</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>d</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>s</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>e</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>e</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>m</span>
        </div>
        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
