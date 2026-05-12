'use client';

import { useState } from 'react';
import Image from 'next/image';

// ============================================================
//  ADD YOUR PHOTOS
//  1. Drop image files into the  public/images/  folder
//  2. Add an entry here for each photo
// ============================================================
const IMAGES: { src: string; caption: string }[] = [
  // { src: '/images/photo1.jpg', caption: 'Our first day together' },
  // { src: '/images/photo2.jpg', caption: 'That perfect coffee date' },
  // Add as many as you like!
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
        <h2 className="font-serif text-3xl text-rose-deep font-bold text-center mb-6">
          Our Moments Together
        </h2>
        <div className="h-72 flex flex-col items-center justify-center bg-rose-50/60 rounded-2xl border-2 border-dashed border-petal gap-4">
          <span className="text-6xl animate-heartbeat select-none">♥</span>
          <p className="font-serif italic text-rose-deep text-lg">Your photos go here</p>
          <p className="text-gray-400 text-sm text-center px-6">
            Drop images into <code className="bg-gray-100 px-1 rounded">public/images/</code> and
            uncomment entries in <code className="bg-gray-100 px-1 rounded">src/components/Slideshow.tsx</code>
          </p>
        </div>
      </section>
    );
  }

  const img = IMAGES[currentIndex];

  return (
    <section className="w-full">
      <h2 className="font-serif text-3xl text-rose-deep font-bold text-center mb-6">
        Our Moments Together
      </h2>

      <div className="relative">
        {/* Image container */}
        <div className="relative h-72 md:h-[440px] rounded-2xl overflow-hidden shadow-lg bg-rose-50">
          <Image
            key={currentIndex}
            src={img.src}
            alt={img.caption}
            fill
            className={`object-cover ${direction === 'left' ? 'animate-slideLeft' : 'animate-slideRight'}`}
            sizes="(max-width: 768px) 100vw, 672px"
          />

          {/* Gradient overlay at bottom for caption */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl" />

          {/* Prev button */}
          <button
            onClick={() => navigate('right')}
            disabled={isAnimating}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/75 backdrop-blur hover:bg-white transition-colors flex items-center justify-center text-rose-deep font-bold text-lg shadow disabled:opacity-50"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={() => navigate('left')}
            disabled={isAnimating}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/75 backdrop-blur hover:bg-white transition-colors flex items-center justify-center text-rose-deep font-bold text-lg shadow disabled:opacity-50"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

        {/* Caption */}
        <p className="font-serif italic text-velvet text-center mt-3 text-base">
          {img.caption}
        </p>

        {/* Dot indicators */}
        {IMAGES.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
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
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-rose-deep' : 'bg-petal'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
