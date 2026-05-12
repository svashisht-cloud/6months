import HeroMessage from '@/components/HeroMessage';
import Slideshow from '@/components/Slideshow';
import WordleGame from '@/components/wordle/WordleGame';

// ============================================================
//  EDIT HER NAME — shown in the footer
// ============================================================
const HER_NAME = '[Her Name]';
// ============================================================

function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-petal" />
      <span className="text-petal-dark text-lg select-none">♥</span>
      <div className="flex-1 h-px bg-petal" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-rose-deep via-velvet to-petal-dark text-white py-10 px-4 text-center shadow-md">
        <p className="font-sans text-sm uppercase tracking-widest opacity-80 mb-2">
          Six months and counting
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold drop-shadow">
          Six Months of Us
        </h1>
        <div className="mt-4 text-4xl animate-heartbeat inline-block">♥</div>
      </header>

      {/* Page content */}
      <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-14">
        <HeroMessage />
        <Divider />
        <Slideshow />
        <Divider />
        <WordleGame />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="font-serif italic text-gold text-lg">
          Happy 6 months, {HER_NAME} ♥
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Made with love, just for you.
        </p>
      </footer>
    </main>
  );
}
