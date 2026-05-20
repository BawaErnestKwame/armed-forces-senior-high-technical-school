// component/SchoolLife.jsx
import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed:     '#E63946',
  accentRedDark: '#c1121f',
  royalBlueDark: '#261481',
  darkGray:      '#343a40',
  bodyText:      '#4b5563',
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

// ─── SchoolLife ───────────────────────────────────────────────────────────────
const SchoolLife = () => {
  const videoRef = useRef(null)

  // Ensure video plays on mount (some browsers block autoplay)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>

      {/* ══ VIDEO BACKGROUND ════════════════════════════════════════════════ */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
      >
        {/*
          Replace src with your own school video file for production.
          Using a royalty-free stock video for development.
        */}
        <source
          src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        {/* Fallback: if video fails, the poster image shows */}
      </video>

      {/* ══ CRIMSON OVERLAY ═════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,26,47,.82) 0%, rgba(193,18,31,.72) 50%, rgba(100,10,20,.85) 100%)',
        }}
      />

      {/* ══ CONTENT ═════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8
          flex items-center justify-end"
        style={{ minHeight: 520, padding: '60px 24px' }}
      >

        {/* ── Notice card — floats on the right ── */}
        <div
          className="w-full max-w-[380px] bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}
        >
          {/* Card header */}
          <div className="px-7 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              {/* Pulsing red dot */}
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: C.accentRed,
                  boxShadow:  `0 0 0 3px rgba(230,57,70,.2)`,
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

          {/* Divider */}
          <div className="h-px mx-7" style={{ background: '#f0f0f0' }}/>

          {/* Notice list */}
          <div className="divide-y divide-[#f3f4f6]">
            {NOTICES.map(notice => (
              <div
                key={notice.id}
                className="px-7 py-4 flex items-start justify-between gap-4
                  group transition-colors duration-200 hover:bg-[#fdf0f0]"
              >
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13.5px] font-bold leading-snug mb-2 group-hover:text-[#E63946]
                      transition-colors duration-200"
                    style={{ color: C.darkGray }}
                  >
                    {notice.title}
                  </p>

                  {/* Date */}
                  <div
                    className="flex items-center gap-1.5 text-[12px] mb-1"
                    style={{ color: C.bodyText }}
                  >
                    <IcoCalendar/>
                    <span>{notice.date}</span>
                  </div>

                  {/* Reference */}
                  <p
                    className="text-[11.5px] font-medium truncate"
                    style={{ color: '#9ca3af' }}
                  >
                    {notice.ref}
                  </p>
                </div>

                {/* PDF download icon */}
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

          {/* Card footer — view all link */}
          <div className="px-7 py-4 border-t border-[#f3f4f6]">
            <Link
              to="/news/notices"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold no-underline
                transition-colors duration-200"
              style={{ color: C.accentRed }}
              onMouseEnter={e => e.currentTarget.style.color = C.accentRedDark}
              onMouseLeave={e => e.currentTarget.style.color = C.accentRed}
            >
              View All Notices
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="8" x2="14" y2="8"/>
                <polyline points="9,3 14,8 9,13"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SchoolLife