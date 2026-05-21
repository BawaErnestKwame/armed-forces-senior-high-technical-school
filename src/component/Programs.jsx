// component/Programs.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  royalBlueDark:  '#261481',
  white:          '#FFFFFF',
  lightGray:      '#f8f9fa',
  mediumGray:     '#e9ecef',
  darkGray:       '#343a40',
  navy:           '#261481',
  cardBg:         '#f5f0eb',
}

const PROGRAMS = [
  { id:1, name:'General Science',      to:'/academics/general-science',   img:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80', desc:'A rigorous science programme building strong foundations in biology, chemistry, physics and mathematics for future innovators.', icon:'science' },
  { id:2, name:'Technical',            to:'/academics/technical',         img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80', desc:'Hands-on technical education covering engineering drawing, woodwork, metalwork and applied technology skills.', icon:'tech' },
  { id:3, name:'Business',             to:'/academics/business',          img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80', desc:'Equips students with core business, accounting and economics knowledge to thrive in the modern commercial world.', icon:'business' },
  { id:4, name:'General Arts',         to:'/academics/general-arts',      img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80', desc:'A broad humanities programme covering literature, history, geography and social studies for well-rounded scholars.', icon:'arts' },
  { id:5, name:'Visual Arts',          to:'/academics/visual-arts',       img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=700&q=80', desc:'Nurtures creative expression through painting, sculpture, graphic design and photography for aspiring artists.', icon:'visual' },
  { id:6, name:'Home Economics',       to:'/academics/home-economics',    img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80', desc:'Develops practical life skills in food science, nutrition, textile management and family resource planning.', icon:'home' },
  { id:7, name:'Agricultural Science', to:'/academics/agricultural-science', img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80', desc:'Covers crop science, animal husbandry, soil science and agribusiness to prepare students for modern agriculture.', icon:'agric' },
]

const DURATION = 4500
const SLIDE_MS = 600
const GAP      = 24

// ── Responsive visible count ──────────────────────────────────────────────────
const getVisible = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth < 640)  return 1   // mobile  → 1 card
  if (window.innerWidth < 1024) return 2   // tablet  → 2 cards
  return 3                                  // desktop → 3 cards
}

// ─── Program icons ────────────────────────────────────────────────────────────
const ProgramIcon = ({ type }) => {
  const s = { width:44, height:44, fill:'none', stroke:C.accentRed, strokeWidth:1.6, strokeLinecap:'round', strokeLinejoin:'round' }
  const icons = {
    science:  <svg {...s} viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>,
    tech:     <svg {...s} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    business: <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    arts:     <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    visual:   <svg {...s} viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    home:     <svg {...s} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    agric:    <svg {...s} viewBox="0 0 24 24"><path d="M12 22V12"/><path d="M5 12C5 7 9 4 12 4s7 3 7 8"/><path d="M5 12c0 5 4 8 7 8"/><path d="M19 12c0 5-4 8-7 8"/></svg>,
  }
  return icons[type] || icons.arts
}

// ─── Shared icons ─────────────────────────────────────────────────────────────
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

// ─── Program Card ─────────────────────────────────────────────────────────────
const ProgramCard = ({ prog, width }) => (
  <div
    className="relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
    style={{ width, background:C.cardBg, boxShadow:'0 2px 16px rgba(0,0,0,.06)' }}
  >
    {/* Image */}
    <div className="overflow-hidden" style={{ borderRadius:'12px', margin:'12px 12px 0', height:240, flexShrink:0 }}>
      <img src={prog.img} alt={prog.name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        draggable="false"/>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-3">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0"><ProgramIcon type={prog.icon}/></div>
        <h3 className="font-['Playfair_Display'] text-[20px] font-black leading-tight"
          style={{ color:C.navy }}>{prog.name}</h3>
      </div>
      <p className="text-[13.5px] leading-relaxed flex-1" style={{ color:'#6b7280' }}>
        {prog.desc.length > 100 ? prog.desc.slice(0,97)+'...' : prog.desc}
      </p>
      <div>
        <Link to={prog.to}
          className="inline-flex items-center gap-2.5 text-white font-bold
            text-[13.5px] px-6 py-3 rounded-full no-underline
            transition-all duration-300 hover:-translate-y-0.5"
          style={{ background:C.accentRed, boxShadow:`0 4px 14px rgba(230,57,70,.35)` }}
          onMouseEnter={e => { e.currentTarget.style.background=C.accentRedDark; e.currentTarget.style.boxShadow=`0 8px 22px rgba(230,57,70,.45)` }}
          onMouseLeave={e => { e.currentTarget.style.background=C.accentRed;     e.currentTarget.style.boxShadow=`0 4px 14px rgba(230,57,70,.35)` }}
        >
          Apply Now <IcoDots3/>
        </Link>
      </div>
    </div>
  </div>
)

// ─── Programs Section ─────────────────────────────────────────────────────────
const Programs = () => {
  const [visible,  setVisible]  = useState(getVisible)
  const [idx,      setIdx]      = useState(0)
  const [sliding,  setSliding]  = useState(false)
  const [paused,   setPaused]   = useState(false)
  const [cardW,    setCardW]    = useState(360)
  const trackRef = useRef(null)

  // Update visible count + reset on resize
  useEffect(() => {
    const onResize = () => {
      const v = getVisible()
      setVisible(v)
      setIdx(0)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const totalSlides = Math.max(1, PROGRAMS.length - visible + 1)

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

  useEffect(() => {
    if (paused) return
    const t = setInterval(goNext, DURATION)
    return () => clearInterval(t)
  }, [goNext, paused])

  const translateX = idx * (cardW + GAP)

  return (
    <section className="py-20 overflow-hidden" style={{ background:C.white }}>
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IcoUsers/>
              <span className="text-[12px] font-bold tracking-[2px] uppercase"
                style={{ color:C.accentRed }}>Academic Program</span>
            </div>
            <h2 className="font-['Playfair_Display'] font-black leading-[1.05]"
              style={{ fontSize:'clamp(32px,4vw,48px)', color:C.navy }}>
              We Excel in New Ways
            </h2>
          </div>

          <Link to="/academics"
            className="self-start inline-flex items-center gap-2.5 text-white font-bold
              text-[14px] px-7 py-4 rounded-full no-underline
              transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:C.accentRed, boxShadow:`0 6px 20px rgba(230,57,70,.35)` }}
            onMouseEnter={e => { e.currentTarget.style.background=C.accentRedDark; e.currentTarget.style.boxShadow=`0 10px 28px rgba(230,57,70,.45)` }}
            onMouseLeave={e => { e.currentTarget.style.background=C.accentRed;     e.currentTarget.style.boxShadow=`0 6px 20px rgba(230,57,70,.35)` }}
          >
            Explore All section <IcoDots3/>
          </Link>
        </div>

        {/* Carousel viewport */}
        <div ref={trackRef} className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex"
            style={{
              gap: GAP,
              transform:  `translateX(-${translateX}px)`,
              transition: sliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none',
            }}
          >
            {PROGRAMS.map(prog => (
              <ProgramCard key={prog.id} prog={prog} width={cardW}/>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
              style={{
                width:      i === idx ? 26 : 10,
                height:     10,
                background: i === idx ? C.accentRed : C.mediumGray,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Programs