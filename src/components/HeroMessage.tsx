// ============================================================
//  EDIT THIS MESSAGE — just change the text inside the string
// ============================================================
const PERSONAL_MESSAGE = `Six months ago, something wonderful began, and every single day since has felt like a gift I never expected to receive.

You came into my life and made everything brighter, softer, and so much more meaningful. The way you laugh, the way you care, the way you make even ordinary moments feel extraordinary. I am really grateful for it and I thank god everyday that you came into my life.

These six months have held some of my favorite memories, and I can not wait to make a thousand more with you.

Thank you for being you. Thank you for being mine.`;
// ============================================================

//  EDIT YOUR NAME — change the string below
const YOUR_NAME = 'Shubhy';
// ============================================================

export default function HeroMessage() {
  const paragraphs = PERSONAL_MESSAGE.split('\n\n').filter(Boolean);

  return (
    <section className="w-full">
      <h2 className="font-serif font-light italic text-3xl sm:text-4xl text-rose-deep text-center mb-5 tracking-wide">
        A Letter to You
      </h2>

      <div className="relative bg-white/75 backdrop-blur-sm rounded-2xl shadow-md border border-petal/50 px-5 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 animate-fadeIn overflow-hidden">
        {/* Decorative opening quote */}
        <span
          className="absolute top-0 left-4 font-serif text-9xl leading-none text-petal/40 select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Left gold accent line */}
        <div className="border-l-2 border-gold/70 pl-4 sm:pl-6 ml-2 sm:ml-3 pt-5">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif font-light text-gray-600 leading-loose text-lg sm:text-xl mb-5 last:mb-0"
            >
              {para}
            </p>
          ))}

          <p className="font-script text-xl sm:text-2xl text-gold text-right mt-6">
            — {YOUR_NAME}
          </p>
        </div>
      </div>
    </section>
  );
}
