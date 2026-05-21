// component/SchoolLifeBanner.jsx
import React from 'react'

// ─── Your color tokens ────────────────────────────────────────────────────────
const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  accentRedLight: '#f28482',
  royalBlue:      '#0e07dd',
  royalBlueDark:  '#261481',
  royalBlueLight: '#5a7ae8',
  white:          '#FFFFFF',
}

// ─── Keyframes ────────────────────────────────────────────────────────────────
const KF = `
  @keyframes floatIcon {
    0%,100% { transform: translateY(0px) rotate(-5deg); }
    50%      { transform: translateY(-18px) rotate(5deg); }
  }
  @keyframes floatIconSlow {
    0%,100% { transform: translateY(0px) rotate(3deg) scale(1); }
    50%      { transform: translateY(-14px) rotate(-3deg) scale(1.04); }
  }
  @keyframes spinArc {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulseArc {
    0%,100% { opacity: .12; }
    50%      { opacity: .24; }
  }
  .banner-icon-float { animation: floatIcon     4s   ease-in-out infinite; }
  .banner-icon-slow  { animation: floatIconSlow 5.5s ease-in-out infinite; }
  .banner-arc-spin   { animation: spinArc       18s  linear     infinite; }
  .banner-arc-pulse  { animation: pulseArc      3s   ease-in-out infinite; }
`

// ─── Diploma SVG ─────────────────────────────────────────────────────────────
const DiplomaIcon = () => (
  <svg width="110" height="110" viewBox="0 0 110 110" fill="none"
    className="banner-icon-float" style={{ opacity: 0.2 }}>
    <rect x="15" y="28" width="80" height="54" rx="4"
      stroke="white" strokeWidth="3" fill="none"/>
    <ellipse cx="15" cy="55" rx="8" ry="27"
      stroke="white" strokeWidth="3" fill="none"/>
    <ellipse cx="95" cy="55" rx="8" ry="27"
      stroke="white" strokeWidth="3" fill="none"/>
    <line x1="30" y1="44" x2="80" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="30" y1="55" x2="80" y2="55" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="30" y1="66" x2="60" y2="66" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M44 82 Q55 74 66 82 Q55 90 44 82z" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="55" cy="82" r="3" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="68" cy="72" r="6" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="68" cy="72" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
)

// ─── Spinning arcs ────────────────────────────────────────────────────────────
const ArcDeco = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none"
    className="banner-arc-spin" style={{ opacity: 0.18 }}>
    <path d="M 80 10 A 70 70 0 0 1 150 80" stroke="white" strokeWidth="2"
      strokeLinecap="round" fill="none"/>
    <path d="M 80 25 A 55 55 0 0 1 135 80" stroke="white" strokeWidth="1.8"
      strokeLinecap="round" fill="none"/>
    <path d="M 80 40 A 40 40 0 0 1 120 80" stroke="white" strokeWidth="1.5"
      strokeLinecap="round" fill="none"/>
    <path d="M 80 55 A 25 25 0 0 1 105 80" stroke="white" strokeWidth="1.2"
      strokeLinecap="round" fill="none"/>
  </svg>
)

// ─── Star deco ────────────────────────────────────────────────────────────────
const StarDeco = () => (
  <svg width="56" height="56" viewBox="0 0 60 60" fill="none"
    className="banner-icon-slow" style={{ opacity: 0.15, animationDelay: '1.2s' }}>
    <polygon points="30,4 36,22 55,22 40,34 46,52 30,40 14,52 20,34 5,22 24,22"
      stroke="white" strokeWidth="2" fill="none"/>
  </svg>
)

// ─── Banner ───────────────────────────────────────────────────────────────────
const SchoolLifeBanner = () => (
  <>
    <style>{KF}</style>

    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${C.accentRedDark} 0%, ${C.accentRed} 55%, ${C.accentRedDark} 100%)`,
        minHeight:  140,
        padding:    '36px 24px',
      }}
    >
      {/* Diploma — bottom left, floating */}
      <div className="absolute bottom-0 left-8" style={{ bottom: '-8px' }}>
        <DiplomaIcon/>
      </div>

      {/* Star — upper left (md+) */}
      <div className="absolute top-4 left-32 hidden md:block">
        <StarDeco/>
      </div>

      {/* Spinning arcs — right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <ArcDeco/>
      </div>

      {/* Pulsing circles — far right corner */}
      <div className="absolute right-2 bottom-2 banner-arc-pulse" style={{ opacity: 0.12 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" fill="none"/>
          <circle cx="100" cy="100" r="44" stroke="white" strokeWidth="1.2" fill="none"/>
          <circle cx="100" cy="100" r="28" stroke="white" strokeWidth="1"   fill="none"/>
        </svg>
      </div>

      {/* Heading */}
      <h2
        className="relative z-10 text-center font-['Playfair_Display'] font-black text-white
          leading-tight tracking-wide"
        style={{ fontSize: 'clamp(26px, 4.5vw, 52px)' }}
      >
        Armed Forces Senior High Technical School
      </h2>
    </div>
  </>
)

export default SchoolLifeBanner