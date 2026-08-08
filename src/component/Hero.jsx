import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import slider1 from "../assets/slider1.jpeg";
import slider2 from "../assets/slider2.jpeg";
import slider3 from "../assets/slider3.jpeg";

// ─── Slide data — AMESCO ──────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    bg: slider1,
    line1: "Service With",
    line2: "Humility",
    sub: "Armed Forces Senior High Technical School, Kumasi — shaping disciplined, brilliant minds since 1991.",
    cta: { label: "Join Our School", to: "/admissions/apply" },
    ctaSecondary: { label: "Explore Programmes", to: "/academics" },
  },
  {
    id: 2,
    bg: slider2,
    line1: "Excellence in",
    line2: "Education",
    sub: "From General Science to Technical programmes — find your calling and unlock your full potential.",
    cta: { label: "View Academics", to: "/academics" },
    ctaSecondary: { label: "Apply Now", to: "/admissions/apply" },
  },
  {
    id: 3,
    bg: slider3,
    eyebrow: "Campus Life",
    line1: "Discipline,",
    line2: "Character & Growth",
    sub: "A vibrant campus community that builds resilience, leadership, and a lifelong passion for learning.",
    cta: { label: "Explore School Life", to: "/school-life" },
    ctaSecondary: { label: "Gallery", to: "/school-life/gallery" },
  },
];

const AUTO_PLAY_MS = 6000;

// ─── Keyframes ────────────────────────────────────────────────────────────────
const KF = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(1.08); }
    to   { transform: scale(1); }
  }
  @keyframes progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes bounceX {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(5px); }
  }
  .anim-eyebrow  { animation: fadeSlideUp .7s  ease .1s  both; }
  .anim-line1    { animation: fadeSlideUp .7s  ease .25s both; }
  .anim-line2    { animation: fadeSlideUp .7s  ease .4s  both; }
  .anim-sub      { animation: fadeSlideUp .7s  ease .55s both; }
  .anim-btns     { animation: fadeSlideUp .7s  ease .7s  both; }
  .anim-bg       { animation: scaleIn 7s linear both; }
  .anim-fade     { animation: fadeIn .5s ease both; }
  .anim-progress { animation: progressBar ${AUTO_PLAY_MS}ms linear both; }
  .arrow-bounce  { animation: bounceX 1.2s ease infinite; }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoArrow = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" y1="8" x2="14" y2="8" />
    <polyline points="9,3 14,8 9,13" />
  </svg>
);
const IcoChevLeft = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IcoChevRight = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IcoPlay = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const IcoPause = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((next) => {
    setCur(next);
    setKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => {
    goTo((cur + 1) % SLIDES.length);
  }, [cur, goTo]);

  const goPrev = useCallback(() => {
    goTo((cur - 1 + SLIDES.length) % SLIDES.length);
  }, [cur, goTo]);

  // Auto-play
  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [playing, goNext]);

  // Keyboard arrows
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  const slide = SLIDES[cur];

  return (
    <>
      <style>{KF}</style>

      <section
        className="relative w-full overflow-hidden h-[76vh]"
        style={{ background: "#080478" }}
        aria-label="Hero slideshow"
      >
        {/* ── Background image ── */}
        <div key={`bg-${key}`} className="absolute inset-0 anim-bg">
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover bg-top anim-fade"
            aria-hidden="true"
            draggable="false"
          />
        </div>

        {/* ── Overlays (your exact values) ── */}
        <div className="absolute inset-0 bg-[#0a0850]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0850]/60 via-[#0a0850]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0850]/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#0e07dd]/10 mix-blend-multiply" />

        {/* ── Vertical side label (desktop) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-5">
          <div
            className="text-white/40 text-[11px] font-semibold uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            AMESCO · Kumasi · Ghana
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MAIN CONTENT — your 90% width, left-aligned, vertically centered
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center
          px-6 sm:px-12 md:px-16 lg:px-20"
        >
          {/* Inner wrapper — caps width so text doesn't run too wide on large screens */}
          <div className="w-full max-w-[90%] lg:max-w-[60%] flex flex-col gap-0">
  

            {/* Heading line 1 */}
            <h1
              key={`h1-${key}`}
              className="anim-line1 font-bold text-white text-5xl lg:text-6xl
                mb-0"
            >
              {slide.line1}
            </h1>

            {/* Heading line 2 */}
            <h1
              key={`h2-${key}`}
              className="anim-line2 font-bold text-white text-5xl lg:text-6xl
                 mb-4"
            >
              {slide.line2}
            </h1>

            {/* Sub-text */}
            <p
              key={`sub-${key}`}
              className="anim-sub text-white/80 text-base sm:text-sm
                  max-w-[500px]"
            >
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div
              key={`btn-${key}`}
              className="anim-btns mt-4 flex flex-wrap items-center gap-4"
            >
              {/* Primary */}
              <Link
                to={slide.cta.to}
                className="group inline-flex items-center gap-2.5 bg-[#E63946] text-white
                  font-bold text-[15px] px-4 py-3 rounded-full no-underline
                  transition-all duration-300 hover:bg-[#c1121f] hover:-translate-y-1
                  shadow-[0_6px_24px_rgba(230,57,70,.45)]
                  hover:shadow-[0_10px_32px_rgba(230,57,70,.55)]"
              >
                {slide.cta.label}
                <span className="arrow-bounce">
                  <IcoArrow />
                </span>
              </Link>

              {/* Secondary — ghost */}
              <Link
                to={slide.ctaSecondary.to}
                className="inline-flex items-center gap-2.5 text-white font-semibold
                  text-[15px] px-4 py-3 rounded-full no-underline border-2
                  border-white/25 transition-all duration-300
                  hover:border-white/70 hover:bg-white/10 hover:-translate-y-1"
              >
                {slide.ctaSecondary.label}
                <IcoArrow />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
          {playing && (
            <div
              key={`prog-${key}`}
              className="anim-progress h-full bg-[#E63946] origin-left"
            />
          )}
        </div>

        {/* ── Bottom controls ── */}
        <div
          className="absolute bottom-8 left-0 right-0 z-20
            px-6 sm:px-12 md:px-16 lg:px-20
            flex items-center justify-between"
        >
          {/* Dots + counter */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full border-none cursor-pointer
                    ${
                      i === cur
                        ? "w-8 h-[3px] bg-[#E63946]"
                        : "w-2 h-2 bg-white/35 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Arrows + play/pause */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white
                flex items-center justify-center transition-all duration-200 hover:bg-white/20"
            >
              {playing ? <IcoPause /> : <IcoPlay />}
            </button>

            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white
                flex items-center justify-center transition-all duration-200
                hover:bg-[#E63946] hover:border-[#E63946]"
            >
              <IcoChevLeft />
            </button>

            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-11 h-11 rounded-full bg-[#E63946] border border-[#E63946] text-white
                flex items-center justify-center transition-all duration-200
                hover:bg-[#c1121f] hover:border-[#c1121f]"
            >
              <IcoChevRight />
            </button>
          </div>
        </div>

        {/* ── Scroll hint (desktop) ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/35 text-[10px] tracking-[3px] uppercase font-semibold">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>
    </>
  );
};

export default Hero;
