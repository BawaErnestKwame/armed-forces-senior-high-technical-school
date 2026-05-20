import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

// ─── Slide data — AMESCO ──────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85',
    eyebrow: 'Welcome To AMESCO',
    line1: 'Excellence in',
    line2: 'Education',
    sub: 'Armed Forces Senior High Technical School, Kumasi — shaping disciplined, brilliant minds since 1991.',
    cta: { label: 'Join Our School', to: '/admissions/apply' },
    ctaSecondary: { label: 'Explore Programmes', to: '/academics' },
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=85',
    eyebrow: 'Academic Programmes',
    line1: 'Seven Pathways',
    line2: 'to Greatness',
    sub: 'From General Science to Technical programmes — find your calling and unlock your full potential.',
    cta: { label: 'View Academics', to: '/academics' },
    ctaSecondary: { label: 'Apply Now', to: '/admissions/apply' },
  },
  {
    id: 3,
    bg: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=85',
    eyebrow: 'Campus Life',
    line1: 'Discipline,',
    line2: 'Character & Growth',
    sub: 'A vibrant campus community that builds resilience, leadership, and a lifelong passion for learning.',
    cta: { label: 'Explore School Life', to: '/school-life' },
    ctaSecondary: { label: 'Gallery', to: '/school-life/gallery' },
  },
]

const AUTO_PLAY_MS = 6000  // 6 s per slide

// ─── Minimal keyframes Tailwind can't express ─────────────────────────────────
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
`

// ─── SVG icons ────────────────────────────────────────────────────────────────
const IcoArrow = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="8" x2="14" y2="8"/><polyline points="9,3 14,8 9,13"/>
  </svg>
)
const IcoChevLeft = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const IcoChevRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)
const IcoDots = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5"  cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
)
const IcoPlay = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
)
const IcoPause = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
)

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [cur,      setCur]      = useState(0)
  const [prev,     setPrev]     = useState(null)   // previous index for exit anim
  const [dir,      setDir]      = useState(1)      // 1 = forward, -1 = backward
  const [playing,  setPlaying]  = useState(true)
  const [key,      setKey]      = useState(0)      // forces re-mount for CSS anims
  const timerRef   = useRef(null)
  const progressRef= useRef(null)

  const goTo = useCallback((next, direction = 1) => {
    setPrev(cur)
    setDir(direction)
    setCur(next)
    setKey(k => k + 1)
  }, [cur])

  const goNext = useCallback(() => {
    goTo((cur + 1) % SLIDES.length, 1)
  }, [cur, goTo])

  const goPrev = useCallback(() => {
    goTo((cur - 1 + SLIDES.length) % SLIDES.length, -1)
  }, [cur, goTo])

  // Auto-play
  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(goNext, AUTO_PLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [playing, goNext])

  // Keyboard arrows
  useEffect(() => {
    const fn = e => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [goNext, goPrev])

  const slide = SLIDES[cur]

  return (
    <>
      <style>{KF}</style>

      <section
        className="relative w-full overflow-hidden bg-[#0a0850]"
        style={{ height: 'calc(100vh - 0px)', minHeight: 600, maxHeight: 900 }}
        aria-label="Hero slideshow"
      >

        {/* ══ BACKGROUND IMAGE ══════════════════════════════════════════════ */}
        <div key={`bg-${key}`} className="absolute inset-0 anim-bg">
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover anim-fade"
            aria-hidden="true"
            draggable="false"
          />
        </div>

        {/* ══ LAYERED OVERLAYS ══════════════════════════════════════════════ */}
        {/* Base dark */}
        <div className="absolute inset-0 bg-[#0a0850]/60"/>
        {/* Left gradient — darkens where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0850]/90 via-[#0a0850]/55 to-transparent"/>
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0850]/80 via-transparent to-transparent"/>
        {/* Royal-blue accent tint */}
        <div className="absolute inset-0 bg-[#0e07dd]/10 mix-blend-multiply"/>

        {/* ══ VERTICAL SIDE LABEL (right) ════════════════════════════════════ */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-5">
          <div
            className="text-white/40 text-[11px] font-semibold tracking-[4px] uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            AMESCO · Kumasi · Ghana
          </div>
          <div className="w-px h-16 bg-white/20"/>
          <div className="text-white/40 text-[11px] font-bold tracking-[3px]">
            {String(cur + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>

        {/* ══ MAIN CONTENT ══════════════════════════════════════════════════ */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-[900px]">

          {/* Eyebrow */}
          <p key={`ey-${key}`}
            className="anim-eyebrow text-[#f28482] text-sm sm:text-base font-semibold tracking-[3px] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#E63946]"/>
            {slide.eyebrow}
          </p>

          {/* Heading line 1 */}
          <h1 key={`h1-${key}`}
            className="anim-line1 font-['Playfair_Display'] font-black text-white leading-[1.05] mb-0"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
            {slide.line1}
          </h1>

          {/* Heading line 2 — with inline logo watermark */}
          <div key={`h2-${key}`}
            className="anim-line2 flex items-center gap-4 sm:gap-6 mb-6">
            {/* Logo mark — big watermark inline */}
            <div className="flex-shrink-0 opacity-80"
              style={{ width: 'clamp(52px, 7vw, 90px)', height: 'clamp(52px, 7vw, 90px)' }}>
              {logo
                ? <img src={logo} alt="" className="w-full h-full object-contain drop-shadow-2xl" aria-hidden="true"/>
                : (
                  <svg viewBox="0 0 52 56" fill="none" className="w-full h-full">
                    <path d="M26 2L4 11v20c0 14 11 23 22 25 11-2 22-11 22-25V11L26 2z"
                      fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                    <path d="M17 25l9-4 9 4-9 4-9-4z" fill="#fff" opacity=".9"/>
                    <path d="M20 27.5v5c2 2 6 2 8 0v-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
                  </svg>
                )
              }
            </div>
            <h1 className="font-['Playfair_Display'] font-black text-white leading-[1.05]"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
              {slide.line2}
            </h1>
          </div>

          {/* Sub-text */}
          <p key={`sub-${key}`}
            className="anim-sub text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-[540px]">
            {slide.sub}
          </p>

          {/* CTA Buttons */}
          <div key={`btn-${key}`} className="anim-btns flex flex-wrap items-center gap-4">

            {/* Primary — crimson pill */}
            <Link
              to={slide.cta.to}
              className="group inline-flex items-center gap-2.5 bg-[#E63946] text-white font-bold text-[15px] px-7 py-4 rounded-full no-underline transition-all duration-300 hover:bg-[#c1121f] hover:-translate-y-1 shadow-[0_6px_24px_rgba(230,57,70,.45)] hover:shadow-[0_10px_32px_rgba(230,57,70,.55)]"
            >
              {slide.cta.label}
              <span className="arrow-bounce"><IcoArrow/></span>
            </Link>

            {/* Secondary — ghost */}
            <Link
              to={slide.ctaSecondary.to}
              className="inline-flex items-center gap-2.5 text-white font-semibold text-[15px] px-7 py-4 rounded-full no-underline border-2 border-white/25 transition-all duration-300 hover:border-white/70 hover:bg-white/10 hover:-translate-y-1"
            >
              {slide.ctaSecondary.label}
              <IcoArrow/>
            </Link>
          </div>
        </div>

        {/* ══ PROGRESS BAR — top of section ══════════════════════════════════ */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
          {playing && (
            <div
              key={`prog-${key}`}
              className="anim-progress h-full bg-[#E63946] origin-left"
            />
          )}
        </div>

        {/* ══ BOTTOM CONTROLS ════════════════════════════════════════════════ */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 sm:px-12 md:px-16 lg:px-20 flex items-center justify-between">

          {/* Slide dots + counter */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > cur ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full border-none cursor-pointer
                    ${i === cur
                      ? 'w-8 h-[3px] bg-[#E63946]'
                      : 'w-2 h-2 bg-white/35 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
            <span className="text-white/50 text-xs font-semibold tracking-widest hidden sm:block">
              {String(cur + 1).padStart(2, '0')}&nbsp;
              <span className="text-white/25">/</span>&nbsp;
              {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Nav arrows + play/pause */}
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              onClick={() => setPlaying(v => !v)}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:bg-white/20"
            >
              {playing ? <IcoPause/> : <IcoPlay/>}
            </button>

            {/* Prev */}
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:bg-[#E63946] hover:border-[#E63946]"
            >
              <IcoChevLeft/>
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-11 h-11 rounded-full bg-[#E63946] border border-[#E63946] text-white flex items-center justify-center transition-all duration-200 hover:bg-[#c1121f] hover:border-[#c1121f]"
            >
              <IcoChevRight/>
            </button>
          </div>
        </div>

        {/* ══ SCROLL HINT ════════════════════════════════════════════════════ */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/35 text-[10px] tracking-[3px] uppercase font-semibold">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"/>
        </div>

        {/* ══ SLIDE COUNT STRIP (right side, mobile) ═════════════════════════ */}
        <div className="absolute bottom-8 right-6 z-20 lg:hidden">
          <span className="text-white/45 text-xs font-bold tracking-widest">
            {String(cur + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

      </section>
    </>
  )
}

export default Hero