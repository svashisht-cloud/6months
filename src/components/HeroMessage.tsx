// ============================================================
//  EDIT THIS MESSAGE — just change the text inside the string
// ============================================================
const PERSONAL_MESSAGE = `Six months ago, something wonderful began — and every single day since has felt like a gift I never expected to receive.

You came into my life and made everything brighter, softer, and so much more meaningful. The way you laugh, the way you care, the way you make even ordinary moments feel extraordinary — I notice it all, and I am grateful for all of it.

These six months have held some of my favorite memories, and I can not wait to make a thousand more with you.

Thank you for being you. Thank you for being mine.`;
// ============================================================

//  EDIT YOUR NAME — change the string below
const YOUR_NAME = '[Your Name]';
// ============================================================

export default function HeroMessage() {
  const paragraphs = PERSONAL_MESSAGE.split('\n\n').filter(Boolean);

  return (
    <section className="w-full">
      <h2 className="font-serif text-3xl text-rose-deep font-bold text-center mb-6">
        A Letter to You
      </h2>

      <div className="relative bg-white/80 backdrop-blur rounded-2xl shadow-md border border-petal p-8 animate-fadeIn">
        {/* Decorative quote mark */}
        <span
          className="absolute top-4 left-5 font-serif text-8xl leading-none text-petal select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Left accent */}
        <div className="border-l-4 border-gold pl-6 ml-4">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif text-gray-700 leading-relaxed text-lg mb-4 last:mb-0"
            >
              {para}
            </p>
          ))}

          <p className="font-serif italic text-gold text-right mt-6 text-lg">
            — {YOUR_NAME}
          </p>
        </div>
      </div>
    </section>
  );
}
