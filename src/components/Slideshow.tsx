'use client';

import { useState } from 'react';
import Image from 'next/image';

// ============================================================
//  YOUR PHOTOS — edit captions here. Add/remove entries to
//  match the files in public/images/ (photo-01.jpeg … )
// ============================================================
const IMAGES: { src: string; caption: string }[] = [
  { src: '/images/photo-01.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-02.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-03.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-04.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-05.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-06.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-07.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-08.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-09.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-10.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-11.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-12.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-13.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-14.jpeg', caption: 'Us ♥' },
  { src: '/images/photo-15.jpeg', caption: 'Us ♥' },
];
// ============================================================

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);

  function navigate(dir: 'left' | 'right') {
    if (isAnimating || IMAGES.length <= 1) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrentIndex(prev =>
      dir === 'left'
        ? (prev + 1) % IMAGES.length
        : (prev - 1 + IMAGES.length) % IMAGES.length
    );
    setTimeout(() => setIsAnimating(false), 420);
  }

  if (IMAGES.length === 0) {
    return (
      <section className="w-full">
        <SectionHeading />
        <div className="h-64 flex flex-col items-center justify-center bg-rose-50/60 rounded-2xl border-2 border-dashed border-petal gap-4">
          <span className="text-6xl animate-heartbeat select-none">♥</span>
          <p className="font-serif italic text-rose-deep text-lg">Your photos go here</p>
        </div>
      </section>
    );
  }

  const img = IMAGES[currentIndex];

  return (
    <section className="w-full">
      <SectionHeading />

      <div className="relative">
        {/* Image container */}
        <div className="relative h-72 sm:h-96 md:h-[460px] rounded-2xl overflow-hidden shadow-xl bg-white">
          <Image
            key={currentIndex}
            src={img.src}
            alt={img.caption}
            fill
            priority={currentIndex === 0}
            className={`object-contain ${direction === 'left' ? 'animate-slideLeft' : 'animate-slideRight'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 672px"
          />

          {/* Bottom gradient for caption */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Caption on top of image */}
          <p className="absolute bottom-3 inset-x-0 text-center font-serif italic text-white/90 text-sm px-4 drop-shadow">
            {img.caption}
          </p>

          {/* Prev */}
          <button
            onClick={() => navigate('right')}
            disabled={isAnimating}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center text-rose-deep font-bold text-2xl shadow-md disabled:opacity-40 touch-manipulation"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={() => navigate('left')}
            disabled={isAnimating}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center text-rose-deep font-bold text-2xl shadow-md disabled:opacity-40 touch-manipulation"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-gray-400 mt-2">
          {currentIndex + 1} / {IMAGES.length}
        </p>

        {/* Dot indicators — max 15 dots, scrollable on overflow */}
        <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === currentIndex || isAnimating) return;
                setDirection(i > currentIndex ? 'left' : 'right');
                setIsAnimating(true);
                setCurrentIndex(i);
                setTimeout(() => setIsAnimating(false), 420);
              }}
              className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                i === currentIndex ? 'bg-rose-deep scale-125' : 'bg-petal'
              }`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl text-rose-deep font-bold text-center mb-5">
      Our Moments Together
    </h2>
  );
}
