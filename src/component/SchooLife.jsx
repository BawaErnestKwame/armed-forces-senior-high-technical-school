// component/SchoolLife.jsx
import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Your color tokens ────────────────────────────────────────────────────────
const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  accentRedLight: '#f28482',
  royalBlue:      '#0e07dd',
  royalBlueDark:  '#261481',
  royalBlueLight: '#5a7ae8',
  white:          '#FFFFFF',
  lightGray:      '#f8f9fa',
  mediumGray:     '#e9ecef',
  darkGray:       '#343a40',
}

// ─── Notice data ──────────────────────────────────────────────────────────────
const NOTICES = [
  {
    id:    1,
    title: 'New digital resources now available',
    date:  'December 1, 2025',
    ref:   'UBD/REG/MED/0002/IKJFJ/03',
    pdf:   '#',
  },
  {
    id:    2,
    title: 'National Education Conference',
    date:  'December 1, 2025',
    ref:   'UBD/REG/MED/0002/IKJFJ/02',
    pdf:   '#',
  },
  {
    id:    3,
    title: 'Semester Examination Schedule',
    date:  'December 1, 2025',
    ref:   'UBD/REG/MED/0002/IKJFJ/01',
    pdf:   '#',
  },
  {
    id:    4,
    title: 'Inter-School Sports Competition 2026',
    date:  'January 15, 2026',
    ref:   'UBD/REG/MED/0002/IKJFJ/04',
    pdf:   '#',
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoCalendar = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
)

const IcoPdf = () => (
  <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9"  y1="15" x2="15" y2="15"/>
  </svg>
)

const IcoArrow = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="8" x2="14" y2="8"/>
    <polyline points="9,3 14,8 9,13"/>
  </svg>
)

// ─── SchoolLife ───────────────────────────────────────────────────────────────
const SchoolLife = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>

      {/* ── Video background — African/Ghana students in school ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
        poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85"
      >
        {/*
          ─── HOW TO USE YOUR OWN VIDEO ───────────────────────────────────────
          For a real Ghana/African school student video, download one of these
          free stock clips and place it in your /public/videos/ folder:

          1. Mixkit — African students in school uniform (free, no signup):
             https://mixkit.co/free-stock-video/kids-running-in-slow-motion-44/
             → Save as: /public/videos/school-life.mp4

          2. Pexels — African school video (free):
             https://www.pexels.com/search/videos/african%20school/
             → Download any clip → Save as: /public/videos/school-life.mp4

          Then replace the src below with:
             src="/videos/school-life.mp4"
          ─────────────────────────────────────────────────────────────────────
        */}
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-towards-a-school-building-4519-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-school-taking-notes-in-classroom-2893-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Light blue overlay — reduced opacity so video is clearly visible ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            rgba(38,20,129,.45) 0%,
            rgba(14,7,221,.30) 50%,
            rgba(38,20,129,.50) 100%)`,
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-[1220px] mx-auto flex items-center justify-end"
        style={{ minHeight: 520, padding: '60px 24px' }}
      >

        {/* Notice card */}
        <div
          className="w-full max-w-[380px] rounded-2xl overflow-hidden"
          style={{
            background:  C.white,
            boxShadow:   '0 24px 60px rgba(0,0,0,.25)',
          }}
        >
          {/* Header */}
          <div className="px-7 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: C.accentRed,
                  boxShadow:  `0 0 0 3px rgba(230,57,70,.18)`,
                }}
              />
              <h3
                className="font-['Playfair_Display'] text-[22px] font-black"
                style={{ color: C.darkGray }}
              >
                Notice
              </h3>
            </div>
          </div>

          <div className="h-px mx-7" style={{ background: C.mediumGray }}/>

          {/* Notice rows */}
          <div className="divide-y" style={{ borderColor: C.lightGray }}>
            {NOTICES.map(notice => (
              <div
                key={notice.id}
                className="px-7 py-4 flex items-start justify-between gap-4
                  group cursor-pointer transition-colors duration-200"
                style={{ '--hover-bg': `rgba(230,57,70,.04)` }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13.5px] font-bold leading-snug mb-2
                      transition-colors duration-200"
                    style={{ color: C.darkGray }}
                    onMouseEnter={e => e.currentTarget.style.color = C.accentRed}
                    onMouseLeave={e => e.currentTarget.style.color = C.darkGray}
                  >
                    {notice.title}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-[12px] mb-1"
                    style={{ color: '#6b7280' }}
                  >
                    <IcoCalendar/>
                    <span>{notice.date}</span>
                  </div>

                  <p
                    className="text-[11.5px] font-medium truncate"
                    style={{ color: '#9ca3af' }}
                  >
                    {notice.ref}
                  </p>
                </div>

                {/* PDF icon */}
                <a
                  href={notice.pdf}
                  aria-label={`Download ${notice.title}`}
                  className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                  style={{ color: '#9ca3af' }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accentRed}
                  onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                >
                  <IcoPdf/>
                </a>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-7 py-4 border-t"
            style={{ borderColor: C.mediumGray }}
          >
            <Link
              to="/news/notices"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold
                no-underline transition-colors duration-200"
              style={{ color: C.accentRed }}
              onMouseEnter={e => e.currentTarget.style.color = C.royalBlueDark}
              onMouseLeave={e => e.currentTarget.style.color = C.accentRed}
            >
              View All Notices <IcoArrow/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SchoolLife