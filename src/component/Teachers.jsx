// component/Teachers.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  royalBlue:      '#0e07dd',
  royalBlueDark:  '#261481',
  white:          '#FFFFFF',
  lightGray:      '#f8f9fa',
  mediumGray:     '#e9ecef',
  darkGray:       '#343a40',
  navy:           '#261481',
}

const TEACHERS = [
  { id:1, name:'Mr. Kwame Asante',    role:'Head of Science',      img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85',  socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
  { id:2, name:'Mrs. Abena Mensah',   role:'Senior Teacher',        img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85', socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
  { id:3, name:'Mr. Kofi Boateng',   role:'Technical Instructor',  img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85', socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
  { id:4, name:'Ms. Ama Owusu',      role:'Arts Coordinator',      img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=85',  socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
  { id:5, name:'Mr. Yaw Darko',      role:'Senior Lecturer',       img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85', socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
  { id:6, name:'Mrs. Efua Amponsah', role:'Home Economics Lead',   img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85', socials:{fb:'#',tw:'#',li:'#',ig:'#'} },
]

const DURATION = 4000
const SLIDE_MS = 600
const GAP      = 24

// ── Responsive visible count ──────────────────────────────────────────────────
const getVisible = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth < 640)  return 1   // mobile  → 1 card
  if (window.innerWidth < 1024) return 2   // tablet  → 2 cards
  return 3                                  // desktop → 3 cards
}

const KF = `
  @keyframes tf1 { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
  @keyframes tf2 { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-10px) rotate(-3deg)} }
  .tf1 { animation: tf1 4s ease-in-out infinite; }
  .tf2 { animation: tf2 5.5s ease-in-out infinite; }
`

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoShare = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
)
const IcoFB = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IcoTW = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const IcoLI = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const IcoIG = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
const IcoUsers = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none"
    stroke={C.accentRed} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcoDots3 = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
)

// ─── Watermark — top-left ─────────────────────────────────────────────────────
const Watermark = () => (
  <svg className="absolute top-0 left-0 w-28 h-28 pointer-events-none select-none"
    style={{ opacity:.07 }} viewBox="0 0 112 112" fill="none">
    {[0,1,2,3,4].map(i => (
      <line key={i} x1={-20+i*24} y1="0" x2={-20+i*24+112} y2="112"
        stroke="#1a1a2e" strokeWidth="18"/>
    ))}
  </svg>
)

// ─── Teacher Card ─────────────────────────────────────────────────────────────
const TeacherCard = ({ teacher, width }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const fn = e => { if (!e.target.closest(`#tcard-${teacher.id}`)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open, teacher.id])

  return (
    <div
      id={`tcard-${teacher.id}`}
      className="relative bg-white rounded-2xl overflow-hidden flex-shrink-0"
      style={{ width, boxShadow:'0 2px 16px rgba(0,0,0,.07)' }}
    >
      <Watermark/>
      <div className="flex flex-col items-center px-6 pt-8 pb-7 relative z-10">

        {/* Circle + share */}
        <div className="relative mb-5" style={{ width:220, height:220 }}>
          <div className="w-full h-full rounded-full overflow-hidden"
            style={{ border:`4px solid ${C.white}`, boxShadow:'0 8px 30px rgba(0,0,0,.15)' }}>
            <img src={teacher.img} alt={teacher.name}
              className="w-full h-full object-cover object-top" draggable="false"/>
          </div>

          {/* Share btn */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Share"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white
                border-[3px] border-white transition-all duration-200 hover:scale-110"
              style={{ background:C.accentRed, boxShadow:`0 4px 12px rgba(230,57,70,.45)` }}
            >
              <IcoShare/>
            </button>

            {/* Social fan */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 flex items-center gap-1.5"
              style={{
                opacity:       open ? 1 : 0,
                transform:     open ? 'translateY(0)' : 'translateY(10px)',
                transition:    'opacity .28s, transform .28s',
                pointerEvents: open ? 'all' : 'none',
              }}
            >
              {[
                { href:teacher.socials.fb, icon:<IcoFB/> },
                { href:teacher.socials.tw, icon:<IcoTW/> },
                { href:teacher.socials.li, icon:<IcoLI/> },
                { href:teacher.socials.ig, icon:<IcoIG/> },
              ].map(({ href, icon }, i) => (
                <a key={i} href={href}
                  onClick={e => e.stopPropagation()}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white
                    transition-all duration-200 hover:scale-110"
                  style={{
                    background:      C.royalBlueDark,
                    border:          `2px solid ${C.white}`,
                    boxShadow:       '0 3px 10px rgba(0,0,0,.2)',
                    transitionDelay: `${i*50}ms`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.accentRed}
                  onMouseLeave={e => e.currentTarget.style.background = C.royalBlueDark}
                  aria-label="Social"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Name + role */}
        <div className="text-center mt-5">
          <h4 className="font-['Playfair_Display'] text-[20px] font-black mb-1"
            style={{ color:C.navy }}>
            {teacher.name}
          </h4>
          <p className="text-[14px]" style={{ color:'#6b7280' }}>
            {teacher.role}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Teachers Section ─────────────────────────────────────────────────────────
const Teachers = () => {
  const [visible,  setVisible]  = useState(getVisible)
  const [idx,      setIdx]      = useState(0)
  const [sliding,  setSliding]  = useState(false)
  const [paused,   setPaused]   = useState(false)
  const [cardW,    setCardW]    = useState(340)
  const trackRef  = useRef(null)

  // Responsive: update visible count + reset index on resize
  useEffect(() => {
    const onResize = () => {
      const v = getVisible()
      setVisible(v)
      setIdx(0)  // reset to first slide when breakpoint changes
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Total slide positions recalculated from visible
  const totalSlides = Math.max(1, TEACHERS.length - visible + 1)

  // Measure card width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const total = trackRef.current.offsetWidth
      setCardW((total - GAP * (visible - 1)) / visible)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [visible])

  const goTo = useCallback((next) => {
    if (sliding) return
    setSliding(true)
    setIdx(next)
    setTimeout(() => setSliding(false), SLIDE_MS)
  }, [sliding])

  const goNext = useCallback(() => {
    goTo((idx + 1) % totalSlides)
  }, [idx, totalSlides, goTo])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setInterval(goNext, DURATION)
    return () => clearInterval(t)
  }, [goNext, paused])

  const translateX = idx * (cardW + GAP)

  return (
    <>
      <style>{KF}</style>

      <section className="bgStyle relative py-20 overflow-hidden">

        {/* Deco: graduation cap */}
        <div className="tf1 absolute top-4 right-6 pointer-events-none select-none"
          style={{ zIndex:1 }} aria-hidden="true">
          <div style={{ fontSize:80, lineHeight:1 }}>🎓</div>
        </div>

        {/* Deco: diploma */}
        <div className="tf2 absolute bottom-8 left-4 pointer-events-none select-none"
          style={{ zIndex:1, opacity:.5 }} aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 110 110" fill="none">
            <rect x="10" y="25" width="80" height="54" rx="4"
              stroke={C.darkGray} strokeWidth="3" fill="none" opacity=".5"/>
            <ellipse cx="10" cy="52" rx="8" ry="27"
              stroke={C.darkGray} strokeWidth="3" fill="none" opacity=".5"/>
            <ellipse cx="90" cy="52" rx="8" ry="27"
              stroke={C.darkGray} strokeWidth="3" fill="none" opacity=".5"/>
            <line x1="25" y1="40" x2="75" y2="40" stroke={C.darkGray} strokeWidth="2.5" strokeLinecap="round" opacity=".4"/>
            <line x1="25" y1="52" x2="75" y2="52" stroke={C.darkGray} strokeWidth="2.5" strokeLinecap="round" opacity=".4"/>
          </svg>
        </div>

        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex:2 }}>

          {/* Header */}
          <div className="flex items-start justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <IcoUsers/>
                <span className="text-[12px] font-bold tracking-[2px] uppercase"
                  style={{ color:C.accentRed }}>Our Teachers</span>
              </div>
              <h2 className="font-['Playfair_Display'] font-black leading-[1.05]"
                style={{ fontSize:'clamp(32px,4vw,46px)', color:C.navy }}>
                Honorable Teacher
              </h2>
            </div>

            <Link to="/teachers"
              className="self-start inline-flex items-center gap-2.5 text-white font-bold
                text-[14px] px-7 py-4 rounded-full no-underline
                transition-all duration-300 hover:-translate-y-0.5"
              style={{ background:C.accentRed, boxShadow:`0 6px 20px rgba(230,57,70,.35)` }}
              onMouseEnter={e => { e.currentTarget.style.background=C.accentRedDark; e.currentTarget.style.boxShadow=`0 10px 28px rgba(230,57,70,.45)` }}
              onMouseLeave={e => { e.currentTarget.style.background=C.accentRed;     e.currentTarget.style.boxShadow=`0 6px 20px rgba(230,57,70,.35)` }}
            >
              View All Teachers <IcoDots3/>
            </Link>
          </div>

          {/* Slider viewport */}
          <div
            ref={trackRef}
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex"
              style={{
                gap: GAP,
                transform: `translateX(-${translateX}px)`,
                transition: sliding
                  ? `transform ${SLIDE_MS}ms cubic-bezier(0.4,0,0.2,1)`
                  : 'none',
              }}
            >
              {TEACHERS.map(t => (
                <TeacherCard key={t.id} teacher={t} width={cardW}/>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width:      i === idx ? 26 : 10,
                  height:     10,
                  background: i === idx ? C.accentRed : '#c8bfb5',
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

export default Teachers