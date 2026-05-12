import HeroMessage from '@/components/HeroMessage';
import Slideshow from '@/components/Slideshow';
import WordleGame from '@/components/wordle/WordleGame';
import WelcomeOverlay from '@/components/WelcomeOverlay';

// ============================================================
//  EDIT HER NAME — shown in the footer
// ============================================================
const HER_NAME = 'Riya';
// ============================================================

function Divider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-petal" />
      <span className="text-petal-dark text-base select-none">♥</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-petal" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <WelcomeOverlay />

      <main className="min-h-screen">
        {/* Header */}
        <header className="w-full bg-gradient-to-r from-rose-deep via-velvet to-petal-dark text-white py-8 sm:py-12 px-4 text-center shadow-lg">
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] opacity-75 mb-2">
            Six months and counting
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md leading-tight">
            Six Months of Us
          </h1>
          <div className="mt-3 text-3xl sm:text-4xl animate-heartbeat inline-block select-none">♥</div>
        </header>

        {/* Page content */}
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-8 sm:py-12 flex flex-col gap-10 sm:gap-14">
          <HeroMessage />
          <Divider />
          <Slideshow />
          <Divider />
          <WordleGame />
        </div>

        {/* Footer */}
        <footer className="text-center py-10 px-4">
          <p className="font-serif italic text-gold text-lg sm:text-xl">
            Happy 6 months, {HER_NAME} ♥
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Made with love, just for you.
          </p>
        </footer>
      </main>
    </>
  );
}
