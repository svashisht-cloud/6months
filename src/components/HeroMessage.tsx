// ============================================================
//  EDIT THIS MESSAGE — just change the text inside the string
// ============================================================
const PERSONAL_MESSAGE = `Six months ago, something wonderful began, and every single day since has felt like a gift I never expected to receive.

You came into my life and made everything brighter, softer, and so much more meaningful. The way you laugh, the way you care, the way you make even ordinary moments feel extraordinary. I am really grateful for it and I thank god everyday that you came into my life.

These six months have held some of my favorite memories, and I can not wait to make a thousand more with you.

Thank you for being you. Thank you for being mine.`;
// ============================================================

//  EDIT YOUR NAME — change the string below
const YOUR_NAME = 'Shubh';
// ============================================================

export default function HeroMessage() {
  const paragraphs = PERSONAL_MESSAGE.split('\n\n').filter(Boolean);

  return (
    <section className="w-full">
      <h2 className="font-serif text-2xl sm:text-3xl text-rose-deep font-bold text-center mb-5">
        A Letter to You
      </h2>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-petal/60 p-5 sm:p-8 animate-fadeIn overflow-hidden">
        {/* Decorative quote mark */}
        <span
          className="absolute top-2 left-3 font-serif text-7xl sm:text-8xl leading-none text-petal/60 select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Left gold accent */}
        <div className="border-l-4 border-gold pl-4 sm:pl-6 ml-3 sm:ml-4 pt-4">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif text-gray-700 leading-relaxed text-base sm:text-lg mb-4 last:mb-0"
            >
              {para}
            </p>
          ))}

          <p className="font-serif italic text-gold text-right mt-5 text-base sm:text-lg">
            — {YOUR_NAME}
          </p>
        </div>
      </div>
    </section>
  );
}
