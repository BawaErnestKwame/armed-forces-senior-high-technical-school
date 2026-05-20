// component/About.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ─── Color tokens (matching your CSS variables) ───────────────────────────────
const C = {
  accentRed:     '#E63946',
  accentRedDark: '#c1121f',
  royalBlue:     '#0e07dd',
  royalBlueDark: '#261481',
  royalBlueLight:'#5a7ae8',
  navy:          '#261481',
  darkGray:      '#343a40',
  bodyText:      '#4b5563',
  lightGray:     '#f8f9fa',
  mediumGray:    '#e9ecef',
  border:        '#e5e7eb',
  bg:            '#f8f7f4',
}

// ─── Tab content ──────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'mission',
    label: 'Mission',
    text: 'Our mission is to provide a safe, inclusive, and engaging learning environment that empowers students to achieve academic excellence, develop critical thinking, and become responsible, compassionate members of society.',
  },
  {
    id: 'vision',
    label: 'Vision',
    text: 'Our vision is to be a leading centre of academic and technical excellence in Ghana — nurturing disciplined, innovative, and globally competitive graduates who contribute meaningfully to national development.',
  },
  {
    id: 'values',
    label: 'Values',
    text: 'We are guided by integrity, excellence, discipline, respect, and patriotism. These values shape every aspect of life at AMESCO and prepare students to be exemplary citizens and leaders of tomorrow.',
  },
]

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  'World-Class Education System',
  'Expert & Dedicated Faculty',
  'Modern Campus Facilities',
  'Inclusive Learning Environment',
]

// ─── useCountUp hook — counts from 0 to target when element enters viewport ──
const useCountUp = (target, duration = 2000) => {
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const startTime  = performance.now()
    const step = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased    = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { count, ref }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoGroup = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
    stroke={C.accentRed} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const IcoCheck = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke={C.accentRed} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

const IcoDots = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5"  cy="12" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
  </svg>
)

const IcoCap = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const IcoBuilding = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none"
    stroke={C.accentRed} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
    <line x1="12" y1="2" x2="12" y2="5"/>
    <circle cx="12" cy="8" r="2"/>
  </svg>
)

// Decorative book outline
const BookDeco = () => (
  <svg
    className="absolute right-0 top-1/2 -translate-y-1/2 w-36 h-36 pointer-events-none"
    style={{ opacity: 0.1 }}
    viewBox="0 0 100 80" fill="none"
    stroke={C.accentRed} strokeWidth="2"
  >
    <path d="M50 10 Q30 5 5 10 L5 70 Q30 65 50 70"/>
    <path d="M50 10 Q70 5 95 10 L95 70 Q70 65 50 70"/>
    <line x1="50" y1="10" x2="50" y2="70"/>
  </svg>
)

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const [activeTab, setActiveTab] = useState('mission')
  const active = TABS.find(t => t.id === activeTab)

  // Counter — starts when the element scrolls into view
  const { count, ref: counterRef } = useCountUp(40, 2000)

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: C.bg }}>

      <BookDeco/>

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ══ LEFT — Image collage ═══════════════════════════════════════ */}
          <div className="relative flex justify-center">

            {/* Main image */}
            <div
              className="relative z-10 w-[68%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.15)]"
              style={{ borderRadius: '28px', borderBottomRightRadius: '80px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80"
                alt="Students with globe"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>

            {/* Second image — overlapping bottom-right */}
            <div
              className="absolute bottom-0 right-0 w-[52%] overflow-hidden z-20"
              style={{
                borderRadius: '20px',
                borderTopLeftRadius: '60px',
                border: `4px solid ${C.bg}`,
                boxShadow: '0 16px 40px rgba(0,0,0,.18)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80"
                alt="Students in classroom"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>

            {/* Admission stat card */}
            <div
              className="absolute bottom-6 left-4 z-30 rounded-2xl px-5 py-4
                flex items-center gap-4"
              style={{
                background:  C.accentRed,
                boxShadow:   `0 10px 32px rgba(230,57,70,.4)`,
                minWidth:    200,
              }}
            >
              <IcoCap/>
              <div className="flex flex-col gap-1">
                <div className="flex -space-x-2">
                  {[11, 15, 22, 33].map(n => (
                    <img
                      key={n}
                      src={`https://i.pravatar.cc/40?img=${n}`}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                      style={{ border: `2px solid ${C.accentRed}` }}
                    />
                  ))}
                </div>
                <span className="text-white text-[13px] font-bold tracking-wide">
                  4558 + Admission
                </span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Content ════════════════════════════════════════════ */}
          <div>

            {/* Section tag */}
            <div className="flex items-center gap-2 mb-4">
              <IcoGroup/>
              <span
                className="text-[12px] font-bold tracking-[2px] uppercase"
                style={{ color: C.accentRed }}
              >
                About Our School
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-['Playfair_Display'] text-[38px] sm:text-[44px] font-black leading-[1.1] mb-8"
              style={{ color: C.royalBlueDark }}
            >
              An International Standard<br/>of Excellence School
            </h2>

            {/* ── Tabs ── */}
            <div
              className="rounded-xl overflow-hidden mb-6"
              style={{ border: `1px solid ${C.border}` }}
            >
              {/* Tab bar */}
              <div
                className="flex"
                style={{ borderBottom: `1px solid ${C.border}` }}
              >
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 py-3 text-[14px] font-semibold transition-colors duration-200 cursor-pointer bg-transparent"
                    style={{
                      border: 'none',
                      color:       activeTab === tab.id ? C.accentRed  : '#6b7280',
                      borderBottom: activeTab === tab.id
                        ? `2px solid ${C.accentRed}`
                        : '2px solid transparent',
                      marginBottom: '-1px',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab text */}
              <div className="p-5">
                <p
                  className="text-[14px] leading-[1.85]"
                  style={{ color: C.bodyText }}
                >
                  {active.text}
                </p>
              </div>
            </div>

            {/* ── Feature checklist — 2 columns ── */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {FEATURES.map(feat => (
                <div key={feat} className="flex items-center gap-2.5">
                  <IcoCheck/>
                  <span
                    className="text-[13.5px] font-semibold"
                    style={{ color: C.darkGray }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Bottom row — CTA + Counter ── */}
            <div className="flex items-center gap-8 flex-wrap">

              {/* More About Us */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 text-white font-bold text-[14px]
                  px-7 py-4 rounded-full no-underline transition-all duration-300
                  hover:-translate-y-0.5"
                style={{
                  background:  C.accentRed,
                  boxShadow:   `0 6px 20px rgba(230,57,70,.35)`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = C.accentRedDark
                  e.currentTarget.style.boxShadow   = `0 10px 28px rgba(230,57,70,.45)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = C.accentRed
                  e.currentTarget.style.boxShadow   = `0 6px 20px rgba(230,57,70,.35)`
                }}
              >
                More About Us
                <IcoDots/>
              </Link>

              {/* Years counter */}
              <div className="flex items-center gap-3" ref={counterRef}>
                <IcoBuilding/>
                <div className="leading-none">
                  <div
                    className="font-['Playfair_Display'] text-[42px] font-black leading-none"
                    style={{ color: C.royalBlueDark }}
                  >
                    {count}
                    <span style={{ color: C.accentRed }}>+</span>
                  </div>
                  <span
                    className="block text-[13px] font-semibold mt-1"
                    style={{ color: '#6b7280' }}
                  >
                    Years of Education
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About