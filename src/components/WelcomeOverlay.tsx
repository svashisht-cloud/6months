'use client';

import { useState, useRef, useEffect } from 'react';

// ============================================================
//  MUSIC — drop your .mp3 into public/music/song.mp3
// ============================================================
const SONG_SRC = '/music/song.mp3';
const HER_NAME = 'Riya';
// ============================================================

export default function WelcomeOverlay() {
  const [dismissed, setDismissed] = useState(false);
  const [fading, setFading]       = useState(false);
  const [playing, setPlaying]     = useState(false);
  const [hasSong, setHasSong]     = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(SONG_SRC, { method: 'HEAD' })
      .then(r => setHasSong(r.ok))
      .catch(() => setHasSong(false));
  }, []);

  function handleOpen() {
    setFading(true);
    if (hasSong && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
    setTimeout(() => setDismissed(true), 600);
  }

  function toggleMusic() {
    if (!audioRef.current || !hasSong) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <>
      {hasSong && (
        <audio ref={audioRef} src={SONG_SRC} loop preload="auto" />
      )}

      {/* Floating music toggle */}
      {dismissed && hasSong && (
        <button
          onClick={toggleMusic}
          title={playing ? 'Pause music' : 'Play music'}
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-rose-deep to-velvet text-white shadow-lg flex items-center justify-center text-xl hover:scale-110 active:scale-95 transition-transform touch-manipulation"
        >
          {playing ? '⏸' : '▶'}
        </button>
      )}

      {/* Welcome overlay */}
      {!dismissed && (
        <div
          className={`
            fixed inset-0 z-50 flex flex-col items-center justify-center
            bg-gradient-to-br from-rose-deep via-velvet to-petal-dark
            transition-opacity duration-500
            ${fading ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {/* Floating hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
            {['top-[10%] left-[8%]','top-[20%] right-[12%]','top-[55%] left-[5%]',
              'top-[70%] right-[8%]','bottom-[10%] left-[20%]','bottom-[15%] right-[20%]',
              'top-[35%] left-[50%]'].map((pos, i) => (
              <span
                key={i}
                className={`absolute text-white/15 text-5xl animate-heartbeat ${pos}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                ♥
              </span>
            ))}
          </div>

          <div className="text-center px-8 z-10">
            <div className="text-6xl mb-5 animate-heartbeat">♥</div>

            <p className="font-sans text-white/60 text-xs uppercase tracking-[0.3em] mb-4">
              a little something for
            </p>

            <h1 className="font-script text-6xl sm:text-7xl text-white drop-shadow-lg mb-1">
              {HER_NAME}
            </h1>

            <p className="font-serif italic text-white/75 text-xl sm:text-2xl mt-2 mb-10 font-light">
              six months of us
            </p>

            <button
              onClick={handleOpen}
              className="
                px-10 py-4 rounded-full
                bg-white text-rose-deep font-sans font-semibold text-base
                shadow-2xl hover:shadow-white/20
                hover:scale-105 active:scale-95
                transition-all duration-200
                touch-manipulation tracking-wide
              "
            >
              {hasSong ? 'Open with music ♪' : 'Open ♥'}
            </button>

            {!hasSong && (
              <p className="font-sans text-white/35 text-xs mt-4">
                Drop song.mp3 into public/music/ to add music
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
